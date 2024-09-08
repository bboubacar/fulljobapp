<?php

namespace App\Controllers;

require_once ROOT . 'Controllers/Jwt.php';

use App\Controllers\Controller;
use App\Models\CandidatsModel;
use App\Models\CompetencesModel;
use App\Models\ExperiencesModel;
use App\Models\FormationsModel;
use App\Models\RepresentantsModel;
use App\Models\UsersModel;
use Exception;

class UsersController extends Controller
{
    /**
     * Verifie le role de l'utilisateur et retourne les données envoyer dans le formulaire
     *@param object $data
     * @param string $role
     * @param array $champs
     * @return object
     */
    private function validateUser(object $data, array $champs, string $role = ''): ?object
    {
        if (empty($role) && $role !== USERS['1']  && $role !== USERS['2']) {
            $this->response(CODE['400']['code'], false, CODE['400']['text']);
        }

        if (!is_object($data) || !$this->formValidate($data, $champs) || !filter_var($data->{USERS['email']}, FILTER_VALIDATE_EMAIL))
            $this->response(CODE['422']['code'], false, CODE['422']['text']);

        return $data;
    }

    /**
     * Inscription des utilisateurs
     *@param array $role
     * @return void
     */
    public function register(array $role = [])
    {
        // Valider l'url et le formulaire
        $champs_obligatoires = [USERS['nom'], USERS['prenom'], USERS['email'], USERS['pwrd']];
        $current_role = array_shift($role);
        $data = json_decode(file_get_contents("php://input"));
        $data = $this->validateUser($data, $champs_obligatoires, $current_role);

        // Le formulaire et l'url sont valides
        // On n'ettoie les champs
        $champs_nettoyables = [USERS['nom'], USERS['prenom'], USERS['email']];
        $this->cleanFields($data, $champs_nettoyables);

        // On doit chiffrer le mot de passe
        $data->{USERS['pwrd']} = password_hash($data->{USERS['pwrd']}, PASSWORD_ARGON2I);

        // On hydrate l'objet
        $user = new UsersModel;
        $user->setNom($data->{USERS['nom']})
            ->setPrenom($data->{USERS['prenom']})
            ->setEmail($data->{USERS['email']})
            ->setPassword($data->{USERS['pwrd']});

        // On stock l'utilisateur en base données
        if ($user->create()) {
            // Si l'enregistrement aboutit alors on recupère sa clé primaire pour l'enregistrer dans candidats ou reprentants
            $last_id = $user->last_insert_id();
            $user_type = new CandidatsModel;

            if ($current_role === USERS['2'])
                $user_type = new RepresentantsModel;

            $user_type->setIdUsers($last_id);
            if ($user_type->create())
                $this->response(CODE['200']['code'], true, CODE['200']['text']);
            else throw new Exception();
        } else throw new Exception();
    }

    /**
     * Verifier si l'utilisateur existe et renvois un token
     *
     * @param array $role
     * @return void
     */
    public function connect(array $role = [])
    {
        // Valider l'url et le formulaire
        $champs_obligatoires = [USERS['email'], USERS['pwrd']];
        $current_role = array_shift($role);
        $data = json_decode(file_get_contents("php://input"));
        $data = $this->validateUser($data, $champs_obligatoires, $current_role);

        // On n'ettoie les champs
        $champs_nettoyables = [USERS['email']];
        $this->cleanFields($data, $champs_nettoyables);

        // On hydrate l'objet
        $user = new UsersModel;
        $user->setEmail($data->{USERS['email']});

        //  On récupère les données par email
        $userData = $user->connectUSer($current_role, $user->getEmail());

        $token = null;
        if ($userData && password_verify($data->{USERS['pwrd']}, $userData[USERS['pwrd']]))
            $token = $this->generateToken($userData[USERS["id"]], $current_role);

        $this->api_data($token, '404');
    }

    /**
     * Mise à jour des données utilisateur
     *
     * @param array $role
     * @return void
     */
    public function update(array $role)
    {
        $current_role = array_shift($role);
        $payload = $this->getToken($current_role);

        $update_attr = [USERS['nom'], USERS['prenom'], USERS['email']];
        $data = (object)$_POST;

        $data = $this->validateUser($data, $update_attr, $current_role);

        // On n'ettoie les champs
        $this->cleanFields($data);

        $user = new UsersModel;
        // Recuperer les données de l'utilisatuer 
        $userData = $user->readDetails($current_role, $payload->id);

        // Si c'est les 2 emails sont les mêmes alors on supprime l'email du formulaire de mise à jour
        if (is_array($userData) && count($userData) > 0 && $userData[USERS['email']] === $data->{USERS['email']})
            unset($data->{USERS['email']});

        // On ajoute l'image dans le repertoire d'images
        $imagePath = '';
        if (isset($_FILES[USERS['img']])) {
            $imagePath = $this->ValidResizeAndSaveImage($_FILES['avatar']);
            if (!empty($imagePath))
                $data->{USERS['img']} = $imagePath;
        }

        // check and delete exist image
        $this->deleteExistFile(USERS['img'], $imagePath, $userData, $user);

        // On ajoute le cv dans le repertoire
        $cvPath = '';
        if (isset($_FILES[USERS['cv']]))
            $cvPath = $this->validAndSavePdf($_FILES['cv']);

        // check and delete exist pdf
        $this->deleteExistFile(USERS['cv'], $cvPath, $userData, $user);

        // On hydrate
        $user->hydrate($data);

        // On verifie le type d'utilisateur et le champs approprié (profession || responsabilite)
        $join = [];
        if ($current_role === USERS['1'] && isset($data->{USERS['profession']}) && !empty($data->{USERS['profession']})) {
            $join = ['key' => USERS['profession'], 'value' => $data->{USERS['profession']}, 'table' => USERS['1']];
        }

        if ($current_role === USERS['2'] && isset($data->{USERS['responsabilite']}) && !empty($data->{USERS['responsabilite']})) {
            $join = ['key' => USERS['responsabilite'], 'value' => $data->{USERS['responsabilite']}, 'table' => USERS['2']];
        }

        if ($user->updateDetails($join, $payload->id, $cvPath))
            $this->response(CODE['200']['code'], true, CODE['200']['text']);
        else throw new Exception();
    }

    /**
     * Verify if email is already used
     *
     * @return void
     */
    public function verifyemail()
    {
        $data = json_decode(file_get_contents("php://input"));

        // On verifie si le formulaire n'est pas valide ou l'email n'est pas valide
        $champs_obligatoires = [USERS['email']];
        if (!$this->formValidate($data, $champs_obligatoires) || !filter_var($data->{USERS['email']}, FILTER_VALIDATE_EMAIL))
            $this->response(CODE['422']['code'], false, CODE['422']['text']);

        // On hydrate l'objet
        $user = new UsersModel;
        $user->setEmail($data->{USERS['email']});

        $userData = $user->findBy([USERS['email'] => $data->{USERS['email']}]);
        $this->reverse_api_data($userData);
    }

    /**
     * Check if a token is valide
     * @param array $role
     * @return object
     */
    public function verify(array $role)
    {
        $current_role = array_shift($role);

        $payload = $this->getToken($current_role);

        if ($payload)
            $this->response(CODE['200']['code'], true, CODE['200']['text']);
    }

    /**
     * Lit les informations concernant un utlisateur
     *
     * @param array $role
     * @return void
     */
    public function readone(array $role)
    {
        $current_role = array_shift($role);
        $payload = $this->getToken($current_role);

        // Si le token est valide alors on exécute la requête
        $userModel = new UsersModel;

        $userData = $userModel->readDetails($current_role, $payload->id);
        if (is_array($userData) && count($userData) > 0)
            unset($userData[USERS['pwrd']]);
        $this->api_data($userData, '404');
    }

    public function buildcv(array $role)
    {
        $current_role = array_shift($role);
        $payload = $this->getToken($current_role);
        // recuperer le id dans l'url
        $id = count($role) > 0 ? (int)array_shift($role) : null;
        // Lire tout de la table users, experiences, competences, formations
        $userData = [];

        if ($id && !empty($id)) {
            //User data
            $modelUser = new UsersModel();
            $data = $modelUser->readDetails(USERS['1'], $id);
            // S'il n y a pas de données personnel alors on arrête tout
            if (!$data)  $this->api_data($userData, CODE['404']['code']);

            unset($data[USERS['pwrd']]);
            $userData[] = ["user" => $data];
            // Experiences data
            $experience = new ExperiencesModel();
            $data = $experience->findBy([USERS['id'] => $id]);
            $data = $this->supprimeId($data);
            $userData[] = ["experiences" => $data];
            // Competences data
            $competence = new CompetencesModel();
            $data = $competence->findBy([USERS['id'] => $id]);
            $data = $this->supprimeId($data);
            $userData[] = ["competences" => $data];
            // Formations data
            $formation = new FormationsModel();
            $data = $formation->findBy([USERS['id'] => $id]);
            $data = $this->supprimeId($data);
            $userData[] = ["formations" => $data];
        }
        $this->api_data($userData, CODE['404']['code']);
    }

    /**
     * Recherche des candidats en fonction de la profession et de la ville
     *
     * @param array $role
     * @return void
     */
    public function search(array $role)
    {
        $current_role = array_shift($role);
        $payload = $this->getToken($current_role);

        $data = json_decode(file_get_contents("php://input"));
        if (!$this->formValidate($data, [USERS['profession']]))
            $this->response(CODE['422']['code'], false, CODE['422']['text']);

        // On n'ettoie les champs
        $this->cleanFields($data);

        // Si le token est valide alors on exécute la requête
        $userModel = new UsersModel;
        $result = $userModel->search($data);
        $this->response(200, true, 'Succes', $result);
    }
}

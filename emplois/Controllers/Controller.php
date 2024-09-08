<?php

namespace App\Controllers;

require_once ROOT . 'Controllers/Jwt.php';

use Exception;
use Jwt;

abstract class Controller
{
    /**
     * Pour récuperer les enregistrements sur une seule table
     *
     * @param array $role Venant de l'url après le paramètre 'action' et qui doit contenir comme 1er element soit representants ou candidats
     * @param object $model model sur le quel se trouve la requête
     * @param array $attributs liste des attributs à rechercher
     * @param boolean $is_where pour savoir s'il faut condition la requête sur l'utilisateur
     * @return void
     */
    public function getAllOnSingle(array $role, object $model, array $attributs = [], bool $is_where = false)
    {
        $current_role = array_shift($role);
        $payload = $this->getToken($current_role);
        $criteres = $is_where ? [USERS['id'] => $payload->id] : [];

        $data = $model->findAll($attributs, $criteres);
        $data = $this->supprimeId($data);
        $this->api_data($data, '404');
    }

    /**
     * Renvoie un message en json avec un tableau de données
     *
     * @param int $code code http
     * @param bool $statut si la requête à reussi ou non
     * @param string $message
     * @param array $data données à renvoyer ou tableau vide
     * @return void
     */
    public function response(int $code, bool $statut, $message = '', array $donnees = [])
    {
        // On extrait le contenu de $donnees qui va creer une variable qui est la clé du tableau qu'on à passé
        // extract($donnees);
        header('Content-Type: application/json');
        // On informe le code du header et on retoune du JSON
        http_response_code($code);
        echo json_encode(array(
            "data" => $donnees,
            "status" => $statut,
            "message" => $message
        ));
        die;
    }

    /**
     * Reponse de l'api
     *
     * @param array|null $data données à renvoyé ou null en cas d'echec
     * @param string $error_code code erreur
     * @return void
     */
    public function api_data(?array $data, string $error_code)
    {
        if (is_array($data)) {
            $this->response(CODE['200']['code'], true, CODE['200']['text'], $data);
        } else $this->response(CODE[$error_code]['code'], false, CODE[$error_code]['text']);
    }

    /**
     * Reponse de l'api mais avec une condition inversé
     *
     * @param array|null $data données à renvoyé ou null en cas d'echec
     * @return void
     */
    public function reverse_api_data(?array $data)
    {
        if (is_array($data) && count($data) > 0) {
            $this->response(CODE['409']['code'], false, CODE['409']['text'], $data);
        } else $this->response(CODE["200"]['code'], true, CODE["200"]['text']);
    }

    public function verifyDataExist(array $role, array $obligatoires, object $model)
    {
        // Verifi si c'est admin
        $this->isAdmin($role);

        $current_role = array_shift($role);
        $payload = $this->getToken($current_role);

        // On valide le formulaire
        $data = json_decode(file_get_contents("php://input"));

        if (!$this->formValidate($data, $obligatoires))
            $this->response(CODE['422']['code'], false, CODE['422']['text']);

        // $criteres;
        foreach ($obligatoires as $value) {
            $criteres[$value] = $data->$value;
        }

        // On n'ettoie les champs
        $this->cleanFields($data);
        $model->hydrate($data);
        $data = $model->findBy($criteres);
        // Si on a des données alors on retourne une erreur
        $this->reverse_api_data($data);
    }

    /**
     * Valide les données, ajoute celles optionel à l'instance en cours puis réalise l'action approprié (create, update, delete, search) sur une seule table
     * @param array $role Venant de l'url après le paramètre 'action' et qui doit contenir comme 1er element soit representants ou candidats
     * @param array $obligatoires liste des champs obligatoires envoyés par le user
     * @param object $model model sur le quel se trouve la requête
     * @param string $key Attibut de WHERE nom de l'attribut qui sera dans le WHERE de la requête
     * @param string $action (ADD, CHANGE, SUPPR, SEARCH)
     * * @param bool $isAdmin by defaut false do not add id user if is admin
     * @return object model aura tous les attributs neccessaires pour la requête
     */
    protected function validateAction(array $role, array $obligatoires, object $model, string $key, string $action, bool $isAdmin = false): object
    {
        $current_role = array_shift($role);
        $payload = null;
        if ($action !== SEARCH)
            $payload = $this->getToken($current_role);

        // On valide le formulaire
        $data = json_decode(file_get_contents("php://input"));

        if (!$this->formValidate($data, $obligatoires))
            $this->response(CODE['422']['code'], false, CODE['422']['text']);

        // On n'ettoie les champs
        $this->cleanFields($data);

        // On hydrate le model
        $model->hydrate($data);

        if ($action === ADD && !$isAdmin)
            $model->dynamicSetter(USERS['id'], $payload->id, $model);
        else if ($action !== SEARCH && $action !== ADD)
            $model->dynamicSetter($key, $data->$key, $model);

        $result = [];
        try {
            switch ($action) {
                case ADD:
                    $model->create();
                    break;
                case CHANGE:
                    $model->update($key, $payload->id, $isAdmin);
                    break;
                case SUPPR:
                    $model->delete($key, $data->$key);
                    break;
                case SEARCH:
                    $result = $model->search($data);
                    break;
            }
            $result = $this->supprimeId($result);
            $this->response(CODE['200']['code'], true, CODE['200']['text'], $result);
        } catch (Exception $e) {
            // $this->response(CODE['500']['code'], true, CODE['500']['text']);
            echo $e->getMessage();
        }
        return $model;
    }

    /**
     * Valide si tous les champs obligatoires sont remplis
     *
     * @param object | null $form Tableau issu d'un formulaire ($_GET, $_POST)
     * @param array $champs tableau listant les champs obligatoires
     * @return bool si le formulaire est conforme ou non
     */
    protected function formValidate(object $form, array $champs): bool
    {
        if (!$form) return false;

        // On parcourt les champs
        foreach ($champs as $champ) {
            // Si le champ est absent ou vide dans le formulaire
            if (!isset($form->$champ) || empty(trim($form->$champ))) {
                return false;
            }
        }

        return true;
    }

    private function filesValidation($file, array $types)
    {
        // Verify if there is no error
        if (!isset($file['error']) && $file['error'])
            $this->api_data([], CODE['422']['code']);

        // Verify the size
        if ($file['size'] > 500000)
            $this->response(CODE['422']['code'], false, CODE['422']['text']);

        // Verify the type
        if (!in_array($file['type'], $types))
            $this->response(CODE['422']['code'], false, CODE['422']['text']);
    }

    protected function validAndSavePdf($file)
    {
        $this->filesValidation($file, ['application/pdf']);
        $dest = 'cv/' . uniqid('', true) . '__' . $file['name'];
        if (move_uploaded_file($file['tmp_name'], $dest))
            return $dest;

        return '';
    }

    /**
     * Permet de valider (taille, format) de l'image, le redimentionne, le renomme puis l'enregistre dans le repertoire public/images
     *
     * @param MIME $file fichier venant du formulaire
     * @param string $folder where yo save the file by default image
     * @return string le chemin ou une chaine vide
     */
    protected function ValidResizeAndSaveImage($file, $folder = "images"): string
    {
        $this->filesValidation($file, ['image/png', 'image/jpeg', 'image/webp']);

        $tmp_file = $file['tmp_name'];
        // Get the original dimensions
        list($width, $height) = getimagesize($tmp_file);

        // Calculate the scaling ratio
        $ratio = min(200 / $width, 200 / $height);

        // Calculate the new dimensions
        $new_width = $width * $ratio;
        $new_height = $height * $ratio;

        // Create a new empty image with the new dimensions
        $new_image = imagecreatetruecolor($new_width, $new_height);

        // Load the original image
        $image_info = getimagesize($tmp_file);

        switch ($image_info['mime']) {
            case 'image/jpeg':
                $source_image = imagecreatefromjpeg($tmp_file);
                break;
            case 'image/png':
                $source_image = imagecreatefrompng($tmp_file);
                break;
            case 'image/webp':
                $source_image = imagecreatefromwebp($tmp_file);
                break;
            default:
                $this->response(CODE['422']['code'], false, CODE['422']['text']);
        }

        // Copy the original image into the new image with resampling
        imagecopyresampled($new_image, $source_image, 0, 0, 0, 0, $new_width, $new_height, $width, $height);

        // Save the new image to a file
        $output_file = "$folder/" . uniqid('', true) .  basename($file['name']);

        switch ($image_info['mime']) {
            case 'image/jpeg':
                imagejpeg($new_image, $output_file);
                break;
            case 'image/png':
                imagepng($new_image, $output_file);
                break;
            case 'image/webp':
                imagewebp($new_image, $output_file);
                break;
        }

        // Free up memory
        imagedestroy($new_image);
        imagedestroy($source_image);

        return $output_file;
    }

    /**
     * Delete a file (avatar, logo, pdf) from his folder
     *
     * @param string $key (avatar, logo, cv)
     * @param string $path temporary file path
     * @param array $data curent update row from DB
     * @param object $model current model instace
     * @return void
     */
    protected function deleteExistFile(string $key, string $path, array $data, object $model)
    {
        // Si le fichier est conforme et qu'il à dejà une image alors on supprime l'ancienne du repertoire et on le path au model
        if (!empty($path)) {
            if (is_array($data) && $data[$key] && file_exists($data[$key])) {
                unlink($data[$key]);
            }
        }
    }

    /**
     * Enlève toutes les balises html dans le champs pour se proteger des attaques XSS
     *
     * @param object $form Tableau issu d'un formulaire ($_GET, $_POST)
     * @param array $champs tableau listant les champs à nettoyer
     * @return void
     */
    protected function cleanFields(object $form, array $champs = [])
    {
        if (count($champs) > 0) {
            foreach ($champs as $champ) {
                if (!empty($form->$champ))
                    $form->$champ = strip_tags($form->$champ);
            }
        } else {
            foreach ($form as $key => $value) {
                if (!empty($form->$key))
                    $form->$key = strip_tags($value);
            }
        }
    }

    /**
     * Supprime l'id utilisateur dans la donnée
     *
     * @param array $data
     * @return array
     */
    public function supprimeId(array $data): array
    {
        $newData = [];
        foreach ($data as $value) {
            if (isset($value[USERS['id']]))
                unset($value[USERS['id']]);
            $newData[] = $value;
        }

        return $newData;
    }

    /**
     * genère un token en fonction de l'utilisateur (candidats | representants)
     * @param int $id user clé étrangère de l'utilisateur
     * @param string $role user role (candidats | representants)
     * @return array token value
     */
    protected function generateToken(int $id, string $role): array
    {
        $paylod = [
            'iat' => time(),
            'iss' => 'localhost',
            'exp' => time() + (15 * 60), //time() + (1 * 20), //
            'id' => $id,
            'role' => $role
        ];
        if ($role === USERS['1'])
            $token = Jwt::encode($paylod, SECRETE_KEY_C);
        else if ($role === USERS['2'])
            $token = Jwt::encode($paylod, SECRETE_KEY_R);
        else if ($role === USERS['3'])
            $token = Jwt::encode($paylod, SECRETE_KEY_A);
        else return null;

        return ['token' => $token];
    }

    /**
     * Verifi si on a bien reçu le terme 'Authorization' dans le header
     * @return string
     */
    protected function getAuthorizationHeader(): string
    {
        $headers = null;
        if (isset($_SERVER['Authorization'])) {
            $headers = trim($_SERVER["Authorization"]);
        } else if (isset($_SERVER['HTTP_AUTHORIZATION'])) { //Nginx or fast CGI
            $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
        } elseif (function_exists('apache_request_headers')) {
            $requestHeaders = apache_request_headers();
            // Server-side fix for bug in old Android versions (a nice side-effect of this fix means we don't care about capitalization for Authorization)
            $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
            if (isset($requestHeaders['Authorization'])) {
                $headers = trim($requestHeaders['Authorization']);
            }
        }
        return $headers;
    }

    /**
     * Recupère le token dans le header
     * @return string
     * */
    protected function getBearerToken(): string
    {
        $headers = $this->getAuthorizationHeader();

        // HEADER: Get the access token from the header
        if (!empty($headers)) {
            if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
                return $matches[1];
            }
        }
        $this->response(CODE['401']['code'], false, CODE['401']['text']);
    }

    /**
     * Decode le token et verifi s'il est conforme
     *
     * @param string $role Venant de l'url après le paramètre 'action' et qui doit contenir comme 1er element soit representants ou candidats
     * @return object
     */
    protected function getToken(?string $role): ?object
    {
        $token = $this->getBearerToken();

        if ($role === USERS['1'])
            return Jwt::decode($token, SECRETE_KEY_C, ['HS256']);
        else if ($role === USERS['2'])
            return Jwt::decode($token, SECRETE_KEY_R, ['HS256']);
        else if ($role === USERS['3'])
            return Jwt::decode($token, SECRETE_KEY_A, ['HS256']);

        $this->response(CODE['401']['code'], false, CODE['401']['text']);
    }

    /**
     * Verifi si l'utlisateur est un admin ou renvois un 401
     *
     * @param array $role
     * @return void
     */
    protected function isAdmin(array $role)
    {
        $isAdmin_role = $role;
        $current_role = array_shift($isAdmin_role);
        // Si ce n'est pas l'administrateur alors on ne continu pas
        if ($current_role !== USERS['3']) $this->api_data(null, '401');
    }
}

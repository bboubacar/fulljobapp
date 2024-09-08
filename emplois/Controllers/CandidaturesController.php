<?php

namespace App\Controllers;

use App\Controllers\Controller;
use App\Models\CandidaturesModel;
use Exception;

class CandidaturesController extends Controller
{
    /**
     * Ajouter une candidature
     *
     * @param array $role
     * @return void
     */
    public function add(array $role)
    {
        $obligatoires = [OFFRES['id']];
        $candidature = new CandidaturesModel;
        $candidature = $this->validateAction($role, $obligatoires, $candidature, '', ADD);
    }

    /**
     * Liste des candidatures pour une offre donnée publier par le representants en cours
     *
     * @return void
     */
    public function readall($role = [])
    {
        $current_role = array_shift($role);
        $payload = $this->getToken($current_role);
        $id = count($role) > 0 ? (int)array_shift($role) : null;
        $data = [];
        if ($id && !empty($id)) {
            $model = new CandidaturesModel();
            $data = $model->findByOffre($id);
        }

        $this->response(200, true, 'Succes', $data);
    }

    /**
     * Verifier si l'utilisateur à deja postuler
     *
     * @param array $role
     * @return void
     */
    public function verify($role = [])
    {
        $current_role = array_shift($role);
        $payload = $this->getToken($current_role);

        // On valide le formulaire
        $data = json_decode(file_get_contents("php://input"));

        $obligatoires = [OFFRES['id']];
        if (!$this->formValidate($data, $obligatoires))
            $this->response(CODE['422']['code'], false, CODE['422']['text']);

        // On n'ettoie les champs
        $this->cleanFields($data);

        $model = new CandidaturesModel();
        $criteres = [OFFRES['id'] => $data->{OFFRES['id']}, USERS['id'] => $payload->id, SITUATIONS['id'] => 1];

        $data = $model->findBy($criteres);
        // Si on a des données alors on retourne une erreur
        $this->reverse_api_data($data);
    }

    /**
     * Liste des candidatures d'un candidat qui ne sont pas annulés
     *
     * @return void
     */
    public function readallbyuser($role = [])
    {
        $current_role = array_shift($role);
        $payload = $this->getToken($current_role);

        $model = new CandidaturesModel();
        $data = $model->findByCandidat($payload->id);

        $this->response(200, true, 'Succes', $data);
    }

    /**
     * Pour rejeter une candidature
     *
     * @param array $role
     * @return void
     */
    public function update($role = [])
    {
        $current_role = array_shift($role);
        $payload = $this->getToken($current_role);

        $data = json_decode(file_get_contents("php://input"));

        if (!$this->formValidate($data, [CANDIDATURES['id']]))
            $this->response(CODE['422']['code'], false, CODE['422']['text']);

        $model = new CandidaturesModel();
        $model->dynamicSetter(CANDIDATURES['id'], $data->{CANDIDATURES['id']}, $model);

        // Si c'est un candidat alors c'est pour annuler
        if ($current_role === USERS['1'])
            $model->dynamicSetter(SITUATIONS['id'], CANCEL, $model);

        // Si c'est un representant alors c'est pour rejeter
        if ($current_role === USERS['2'])
            $model->dynamicSetter(SITUATIONS['id'], REJET, $model);

        if ($data = $model->update(CANDIDATURES['id']))
            $this->response(CODE['200']['code'], true, CODE['200']['text']);
        else throw new Exception();
    }
}

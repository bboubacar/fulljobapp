<?php

namespace App\Controllers;

use App\Controllers\Controller;
use App\Models\OffresModel;
use Exception;

class OffresController extends Controller
{
    /**
     * Lit les offres en attente de validation
     *
     * @param array $role
     * @return void
     */
    public function readall($role = [])
    {
        $current_role = array_shift($role);
        // Si ce n'est pas l'administrateur alors on ne continu pas
        if ($current_role !== USERS['3']) $this->api_data(null, '401');
        $payload = $this->getToken($current_role);

        // Valide data et retourne model
        $offres = new OffresModel;
        $offres = $offres->getPendingOffres();

        $this->api_data($offres, '404');
    }

    /**
     * Liste des offres pulbier par le representants en cours
     *
     * @return void
     */
    public function readallbyuser($role = [])
    {
        $current_role = array_shift($role);
        $payload = $this->getToken($current_role);

        $model = new OffresModel();
        $data = $model->getOffresByUser($payload->id);
        $data = $this->supprimeId($data);
        $this->api_data($data, '404');
    }

    /**
     * Recherche offres ne fonction des filtres
     *
     * @param array $role
     * @return void
     */
    public function search(array $role = [])
    {
        // Valide data et retourne model
        $obligatoires = [OFFRES['titre']];
        $offre = new OffresModel;
        $offre = $this->validateAction($role, $obligatoires, $offre, SKILLS['id'], SEARCH);
    }

    /**
     * Ajoute une offre
     *
     * @param array $role
     * @return void
     */
    public function add(array $role = [])
    {
        $obligatoires = [OFFRES['titre'], OFFRES['desc']];
        $offre = new OffresModel;
        $offre = $this->validateAction($role, $obligatoires, $offre, OFFRES['id'], ADD);
    }

    /**
     * Met à jour une offre
     *
     * @param array $role
     * @return void
     */
    public function update($role = [])
    {
        $obligatoires = [OFFRES['titre'], OFFRES['desc'], OFFRES['id']];
        $offre = new OffresModel;
        $offre = $this->validateAction($role, $obligatoires, $offre, OFFRES['id'], CHANGE);
    }

    public function valid($role = [])
    {
        $this->validInvalid($role, VALIDER);
    }

    public function invalid($role = [])
    {
        $this->validInvalid($role, INVALIDER);
    }

    /**
     * Permet de valider ou invaider une offre ne foncton du paramètre $value
     *
     * @param [type] $role
     * @param [type] $value
     * @return void
     */
    private function validInvalid($role, $value)
    {
        // Verifi si c'est admin
        $this->isAdmin($role);

        $current_role = array_shift($role);
        $payload = $this->getToken($current_role);

        $data = json_decode(file_get_contents("php://input"));

        if (!$this->formValidate($data, [OFFRES['id']]))
            $this->response(CODE['422']['code'], false, CODE['422']['text']);

        $model = new OffresModel();
        $model->hydrate($data);
        $model->dynamicSetter(STATUTS['id'], $value, $model);

        if ($data = $model->update(OFFRES['id']))
            $this->response(CODE['200']['code'], true, CODE['200']['text']);
        else throw new Exception();
    }

    /**
     * Supprime une offre
     *
     * @param array $role
     * @return void
     */
    public function delete($role = [])
    {
        $obligatoires = [OFFRES['id']];
        $offre = new OffresModel;
        $offre = $this->validateAction($role, $obligatoires, $offre, OFFRES['id'], SUPPR);
    }
}

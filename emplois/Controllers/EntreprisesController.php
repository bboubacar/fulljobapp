<?php

namespace App\Controllers;

use App\Controllers\Controller;
use App\Models\EntreprisesModel;
use Exception;

class EntreprisesController extends Controller
{
    /**
     * Lit le nom, domaine et id de toutes les entreprises 
     *
     * @return void
     */
    public function readall(array $role)
    {
        $current_role = array_shift($role);
        $payload = $this->getToken($current_role);

        $model = new EntreprisesModel();
        $data = $model->read_all();
        $this->api_data($data, '404');
    }

    /**
     * Verifier si le siret de l'ntreprise existe dejà
     *
     * @param array $role
     * @return void
     */
    public function verify(array $role)
    {
        $obligatoires = [ENTREPRISES['siret']];
        $entreprise = new EntreprisesModel;
        $this->verifyDataExist($role, $obligatoires, $entreprise);
    }

    public function action(array $role, string $action, array $obligatoires)
    {
        try {
            // Verifi si c'est admin
            $this->isAdmin($role);

            $current_role = array_shift($role);
            $payload = $this->getToken($current_role);

            $data = (object)$_POST;

            if (!$this->formValidate($data, $obligatoires))
                $this->response(CODE['422']['code'], false, CODE['422']['text']);

            // On n'ettoie les champs
            $this->cleanFields($data);

            // On ajoute l'image dans le repertoire d'images
            $logoPath = '';
            if (isset($_FILES[ENTREPRISES['logo']]))
                $logoPath = $this->ValidResizeAndSaveImage($_FILES['logo'], "logos");

            $model = new EntreprisesModel();

            if ($action === CHANGE) {
                // On recupère les données de celle qu'on veut modifiée
                $entreprise = $model->findById($data->{ENTREPRISES['id']}, ENTREPRISES['id']);
                // check and delete exist logo
                $this->deleteExistFile(ENTREPRISES['logo'], $logoPath, $entreprise, $model);
            }

            // On hydrate le model
            $model->hydrate($data);
            if (!empty($logoPath))
                $model->setLogo($logoPath);

            if ($action === ADD)
                $model->create();
            if ($action === CHANGE) {
                $model->update(ENTREPRISES['id'], $data->{ENTREPRISES['id']}, true);
            }

            $this->response(CODE['200']['code'], true, CODE['200']['text']);
        } catch (Exception $e) {
            // $this->response(CODE['500']['code'], true, CODE['500']['text']);
            echo $e->getMessage();
        }
    }

    /**
     * Ajoute une entreprise
     *
     * @param array $role
     * @return void
     */
    public function add(array $role)
    {
        $obligatoires = [ENTREPRISES['nom'], ENTREPRISES['siret']];
        $this->action($role, ADD, $obligatoires);
    }

    /**
     * Met à jour d'une entreprise
     *
     * @param array $role
     * @return void
     */
    public function update($role = [])
    {
        // Valide data et retourne model
        $obligatoires = [ENTREPRISES['id'], ENTREPRISES['nom'], ENTREPRISES['siret']];
        $this->action($role, CHANGE, $obligatoires);
    }

    /**
     * Supprime une entreprise
     *
     * @param array $role
     * @return void
     */
    public function delete($role = [])
    {
        try {
            // Verifi si c'est admin
            $this->isAdmin($role);

            $current_role = array_shift($role);
            $payload = $this->getToken($current_role);
            // On valide le formulaire
            $data = json_decode(file_get_contents("php://input"));

            $obligatoires = [ENTREPRISES['id']];
            if (!$this->formValidate($data, $obligatoires))
                $this->response(CODE['422']['code'], false, CODE['422']['text']);

            // On n'ettoie les champs
            $this->cleanFields($data);

            $model = new EntreprisesModel;
            // On recupère les données de celle qu'on veut supprimer
            $entreprise = $model->findById($data->{ENTREPRISES['id']}, ENTREPRISES['id']);

            // check and delete exist logo if it exist
            if (is_array($entreprise) && $entreprise[ENTREPRISES['logo']] && file_exists($entreprise[ENTREPRISES['logo']]))
                unlink($entreprise[ENTREPRISES['logo']]);

            $model->delete(ENTREPRISES['id'], $data->{ENTREPRISES['id']});
            $this->response(CODE['200']['code'], true, CODE['200']['text']);
        } catch (Exception $e) {
            // $this->response(CODE['500']['code'], true, CODE['500']['text']);
            echo $e->getMessage();
        }
    }
}

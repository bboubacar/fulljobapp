<?php

namespace App\Controllers;

use App\Models\RepresentantsModel;
use Exception;

class RepresentantsController extends Controller
{
    /**
     * Verifie si le répresentant est affilié à une entreprise
     *
     * @param array $role
     * @return void
     */
    public function validate(array $role = [])
    {
        $current_role = array_shift($role);
        $payload = $this->getToken($current_role);

        $model = new RepresentantsModel();
        $model->setIdUsers($payload->id);

        $data = $model->getvalidate();
        $this->api_data($data, '404');
    }

    /**
     * changement d'entreprise d'un representant
     *
     * @param array $role
     * @return void
     */
    public function change(array $role = [])
    {
        $current_role = array_shift($role);
        $payload = $this->getToken($current_role);

        $data = json_decode(file_get_contents("php://input"));
        if (!$this->formValidate($data, [ENTREPRISES['id']]))
            $this->response(CODE['422']['code'], false, CODE['422']['text']);

        $representant = new RepresentantsModel;
        $representant->setIdUsers($payload->id);
        $representant->setIdEntreprises($data->{ENTREPRISES['id']});
        $representant->setIdValidation(1);

        if ($representant->update(USERS['id']))
            $this->response(CODE['200']['code'], true, CODE['200']['text']);
        else throw new Exception();
    }

    /**
     * Get current user afiliate company
     *
     * @return void
     */
    public function entreprise(array $role = [])
    {
        $current_role = array_shift($role);
        $payload = $this->getToken($current_role);

        $model = new RepresentantsModel();
        $model->setIdUsers($payload->id);

        $data = $model->getEntreprise();
        $this->api_data($data, '404');
    }

    /**
     * Recupère tous les representants qui sont en attente d'affiliation
     *
     * @return void
     */
    public function readallpending(array $role = [])
    {
        // Verifi si c'est admin
        $this->isAdmin($role);

        $current_role = array_shift($role);
        $payload = $this->getToken($current_role);

        $offres = new RepresentantsModel;
        $offres = $offres->getPendingUsers();

        $this->api_data($offres, '404');
    }

    /**
     * valid une afiliation
     *
     * @param array $role
     * @return void
     */
    public function valid($role = [])
    {
        $this->validInvalid($role, VALIDER);
    }

    /**
     * Invilid une afiliation
     *
     * @param array $role
     * @return void
     */
    public function invalid($role = [])
    {
        $current_role = array_shift($role);
        $payload = $this->getToken($current_role);

        $data = json_decode(file_get_contents("php://input"));

        if (!$this->formValidate($data, [USERS['id']]))
            $this->response(CODE['422']['code'], false, CODE['422']['text']);

        $model = new RepresentantsModel();
        if ($data = $model->invalidAfiliation($data->{USERS['id']}))
            $this->response(CODE['200']['code'], true, CODE['200']['text']);
        else throw new Exception();
    }

    /**
     * Permet de valider ou invaider un en attente d'affiliation
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

        if (!$this->formValidate($data, [USERS['id']]))
            $this->response(CODE['422']['code'], false, CODE['422']['text']);

        $model = new RepresentantsModel();
        $model->setIdUsers($data->{USERS['id']})
            ->setIdValidation($value);

        if ($data = $model->update(USERS['id']))
            $this->response(CODE['200']['code'], true, CODE['200']['text']);
        else throw new Exception();
    }
}

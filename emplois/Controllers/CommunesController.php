<?php

namespace App\Controllers;

use App\Controllers\Controller;
use App\Models\CommunesModel;

class CommunesController extends Controller
{
    /**
     * Lit tout dans la table commune
     *@param array $role
     * @return void
     */
    public function readall(array $role)
    {
        $model = new CommunesModel();
        $this->getAllOnSingle($role, $model);
    }

    /**
     * Verifier si le code postale existe dejà
     *
     * @param array $role
     * @return void
     */
    public function verify(array $role)
    {
        $obligatoires = [COMMUNES['code']];
        $commune = new CommunesModel;
        $this->verifyDataExist($role, $obligatoires, $commune);
    }

    /**
     * Ajoute une commune
     *
     * @param array $role
     * @return void
     */
    public function add(array $role = [])
    {
        // Verifi si c'est admin
        $this->isAdmin($role);

        // Valide data et retourne model
        $obligatoires = [COMMUNES['code'], COMMUNES['nom']];
        $commune = new CommunesModel;
        $commune = $this->validateAction($role, $obligatoires, $commune, COMMUNES['id'], ADD, true);
    }

    /**
     * Met à jour une commune
     *
     * @param array $role
     * @return void
     */
    public function update($role = [])
    {
        // Verifi si c'est admin
        $this->isAdmin($role);

        $obligatoires = [COMMUNES['code'], COMMUNES['nom'], COMMUNES['id']];
        $commune = new CommunesModel;
        $commune = $this->validateAction($role, $obligatoires, $commune, COMMUNES['id'], CHANGE, true);
    }

    /**
     * Supprime une commune
     *
     * @param array $role
     * @return void
     */
    public function delete($role = [])
    {
        // Verifi si c'est admin
        $this->isAdmin($role);

        $obligatoires = [COMMUNES['id']];
        $commune = new CommunesModel;
        $commune = $this->validateAction($role, $obligatoires, $commune, COMMUNES['id'], SUPPR);
    }
}

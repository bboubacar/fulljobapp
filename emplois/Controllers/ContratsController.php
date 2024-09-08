<?php

namespace App\Controllers;

use App\Controllers\Controller;
use App\Models\ContratsModel;

class ContratsController extends Controller
{
    /**
     * Liste des contrats
     *
     * @return void
     */
    public function readall($role = [])
    {
        $model = new ContratsModel();
        $this->getAllOnSingle($role, $model);
    }

    /**
     * Verifier si le type de contrat existe dejà
     *
     * @param array $role
     * @return void
     */
    public function verify(array $role)
    {
        $obligatoires = [CONTRATS['type']];
        $contrat = new ContratsModel;
        $this->verifyDataExist($role, $obligatoires, $contrat);
    }

    /**
     * Ajoute une contrat
     *
     * @param array $role
     * @return void
     */
    public function add(array $role = [])
    {
        // Verifi si c'est admin
        $this->isAdmin($role);

        // Valide data et retourne model
        $obligatoires = [CONTRATS['type']];

        $contrat = new ContratsModel;
        $contrat = $this->validateAction($role, $obligatoires, $contrat, CONTRATS['id'], ADD, true);
    }

    /**
     * Met à jour une contrat
     *
     * @param array $role
     * @return void
     */
    public function update($role = [])
    {
        // Verifi si c'est admin
        $this->isAdmin($role);

        $obligatoires = [CONTRATS['type'], CONTRATS['id']];

        $contrat = new ContratsModel;
        $contrat = $this->validateAction($role, $obligatoires, $contrat, CONTRATS['id'], CHANGE, true);
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

        $obligatoires = [CONTRATS['id']];
        $contrat = new ContratsModel;
        $contrat = $this->validateAction($role, $obligatoires, $contrat, CONTRATS['id'], SUPPR);
    }
}

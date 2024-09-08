<?php

namespace App\Controllers;

use App\Controllers\Controller;
use App\Models\FormationsModel;

class FormationsController extends Controller
{
    /**
     * Liste des formations du candidat
     *
     * @return void
     */
    public function readall($role = [])
    {
        $model = new FormationsModel();
        $this->getAllOnSingle($role, $model, [], true);
    }

    /**
     * Ajoute une formation
     *
     * @param array $role
     * @return void
     */
    public function add(array $role = [])
    {
        // Valide data et retourne model
        $obligatoires = [FORMATIONS['titre'], FORMATIONS['institut'], FORMATIONS['date_deb'], FORMATIONS['date_fin'], FORMATIONS['details']];

        $formation = new FormationsModel;
        $formation = $this->validateAction($role, $obligatoires, $formation, SKILLS['id'], ADD);
    }

    /**
     * Met à jour d'une formation
     *
     * @param array $role
     * @return void
     */
    public function update($role = [])
    {
        // Valide data et retourne model
        $obligatoires = [FORMATIONS['id'], FORMATIONS['titre'], FORMATIONS['institut'], FORMATIONS['date_deb'], FORMATIONS['date_fin'], FORMATIONS['details']];
        $formation = new FormationsModel;
        $formation = $this->validateAction($role, $obligatoires, $formation, FORMATIONS['id'], CHANGE);
    }

    /**
     * Supprime une offre
     *
     * @param array $role
     * @return void
     */
    public function delete($role = [])
    {
        $obligatoires = [FORMATIONS['id']];
        $formation = new FormationsModel;
        $formation = $this->validateAction($role, $obligatoires, $formation, FORMATIONS['id'], SUPPR);
    }
}

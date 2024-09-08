<?php

namespace App\Controllers;

use App\Controllers\Controller;
use App\Models\ExperiencesModel;

class ExperiencesController extends Controller
{
    /**
     * Liste des Experiences du candidat en cours
     *
     * @return void
     */
    public function readall($role = [])
    {
        $model = new ExperiencesModel();
        $this->getAllOnSingle($role, $model, [], true);
    }

    /**
     * Ajoute une experience
     *
     * @param array $role
     * @return void
     */
    public function add(array $role = [])
    {
        // Valide data et retourne model
        $obligatoires = [SKILLS['titre'], SKILLS['entreprise'], SKILLS['date_deb'], SKILLS['date_fin'], SKILLS['details']];

        $experience = new ExperiencesModel;
        $experience = $this->validateAction($role, $obligatoires, $experience, SKILLS['id'], ADD);
    }

    /**
     * Met à jour une experience
     *
     * @param array $role
     * @return void
     */
    public function update($role = [])
    {
        // Valide data et retourne model
        $obligatoires = [SKILLS['id'], SKILLS['titre'], SKILLS['entreprise'], SKILLS['date_deb'], SKILLS['date_fin'], SKILLS['details']];

        $experience = new ExperiencesModel;
        $experience = $this->validateAction($role, $obligatoires, $experience, SKILLS['id'], CHANGE);
    }

    /**
     * Supprime une experience
     *
     * @param array $role
     * @return void
     */
    public function delete($role = [])
    {
        $obligatoires = [SKILLS['id']];
        $experience = new ExperiencesModel;
        $experience = $this->validateAction($role, $obligatoires, $experience, SKILLS['id'], SUPPR);
    }
}

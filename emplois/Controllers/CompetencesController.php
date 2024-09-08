<?php

namespace App\Controllers;

use App\Controllers\Controller;
use App\Models\CompetencesModel;

class CompetencesController extends Controller
{
    /**
     * Liste des competences du candidat en cours
     *
     * @return void
     */
    public function readall($role = [])
    {
        $model = new CompetencesModel();
        $this->getAllOnSingle($role, $model, [], true);
    }

    /**
     * Ajoute une Compétence
     *
     * @param array $role
     * @return void
     */
    public function add(array $role = [])
    {
        // Valide data et retourne model
        $obligatoires = [COMPETENCES['nom'], COMPETENCES['details']];

        $competence = new CompetencesModel;
        $competence = $this->validateAction($role, $obligatoires, $competence, SKILLS['id'], ADD);
    }

    /**
     * Met à jour une competences
     *
     * @param array $role
     * @return void
     */
    public function update($role = [])
    {
        // Valide data et retourne model
        $obligatoires = [COMPETENCES['id'], COMPETENCES['nom'], COMPETENCES['details']];

        $competence = new CompetencesModel;
        $experience = $this->validateAction($role, $obligatoires, $competence, COMPETENCES['id'], CHANGE);
    }

    /**
     * Supprime une competence
     *
     * @param array $role
     * @return void
     */
    public function delete($role = [])
    {
        $obligatoires = [COMPETENCES['id']];
        $experience = new CompetencesModel;
        $experience = $this->validateAction($role, $obligatoires, $experience, COMPETENCES['id'], SUPPR);
    }
}

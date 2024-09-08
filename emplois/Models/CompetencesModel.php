<?php

namespace App\Models;

class CompetencesModel extends Model
{
    protected $nom;
    protected $details;
    protected $id_competences;

    public function __construct()
    {
        $this->table = COMPETENCES['table'];
    }

    /**
     * Get the value of details
     * @return string
     */
    public function getDetails(): string
    {
        return $this->details;
    }

    /**
     * Set the value of details
     * @param string $details
     * @return self
     */
    public function setDetails(string $details): self
    {
        $this->details = $details;

        return $this;
    }

    /**
     * Get the value of nom
     * @return string
     */
    public function getNom(): string
    {
        return $this->nom;
    }

    /**
     * Set the value of nom
     * @param string $name
     * @return self
     */
    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    /**
     * Get the value of id_competences
     * @return int
     */
    public function getIdCompetences(): int
    {
        return $this->id_competences;
    }

    /**
     * Set the value of id_competences
     * @param int $id_competences
     * @return self
     */
    public function setIdCompetences(int $id_competences): self
    {
        $this->id_competences = $id_competences;

        return $this;
    }
}

<?php

namespace App\Models;

class ExperiencesModel extends Model
{
    protected $id_experiences;
    protected $date_deb;
    protected $date_fin;
    protected $entreprise;
    protected $titre;
    protected $details;

    public function __construct()
    {
        $this->table = SKILLS['table'];
    }

    /**
     * Get the value of date_fin
     */
    public function getDateFin()
    {
        return $this->date_fin;
    }

    /**
     * Set the value of date_fin
     * @return self
     */
    public function setDateFin($date_fin): self
    {
        $this->date_fin = $date_fin;

        return $this;
    }

    /**
     * Get the value of entreprise
     * @return string
     */
    public function getEntreprise(): string
    {
        return $this->entreprise;
    }

    /**
     * Set the value of entreprise
     * @param string $entreprise
     * @return self
     */
    public function setEntreprise(string $entreprise): self
    {
        $this->entreprise = $entreprise;

        return $this;
    }

    /**
     * Get the value of titre
     * @return string
     */
    public function getTitre(): string
    {
        return $this->titre;
    }

    /**
     * Set the value of titre
     * @param string $titre
     * @return self
     */
    public function setTitre(string $titre): self
    {
        $this->titre = $titre;

        return $this;
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
     * Get the value of date_deb
     */
    public function getDateDeb()
    {
        return $this->date_deb;
    }

    /**
     * Set the value of date_deb
     */
    public function setDateDeb($date_deb): self
    {
        $this->date_deb = $date_deb;

        return $this;
    }

    /**
     * Get the value of id_experiences
     * @return int
     */
    public function getIdExperiences(): int
    {
        return $this->id_experiences;
    }

    /**
     * Set the value of id_experiences
     * @param int $id_experiences
     * @return self
     */
    public function setIdExperiences(int $id_experiences): self
    {
        $this->id_experiences = $id_experiences;

        return $this;
    }
}

<?php

namespace App\Models;

class FormationsModel extends Model
{
    protected $date_deb;
    protected $date_fin;
    protected $institut;
    protected $titre;
    protected $details;
    protected $id_formations;

    public function __construct()
    {
        $this->table = FORMATIONS['table'];
    }

    /**
     * Get the value of id_formations
     * @return int
     */
    public function getIdFormations(): int
    {
        return $this->id_formations;
    }

    /**
     * Set the value of id_formations
     * @param int $id_formations
     * @return self
     */
    public function setIdFormations(int $id_formations): self
    {
        $this->id_formations = $id_formations;

        return $this;
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
     * Get the value of institut
     * @return string
     */
    public function getInstitut(): string
    {
        return $this->institut;
    }

    /**
     * Set the value of institut
     * @param string $institut
     * @return self
     */
    public function setInstitut(string $institut): self
    {
        $this->institut = $institut;

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
}

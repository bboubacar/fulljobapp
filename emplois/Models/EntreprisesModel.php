<?php

namespace App\Models;

class EntreprisesModel extends Model
{
    protected $id_entreprises;
    protected $nom;
    protected $domaine;
    protected $siret;
    protected $num_rue;
    protected $nom_rue;
    protected $complement;
    protected $id_communes;
    protected $logo;

    public function __construct()
    {
        $this->table = 'entreprises';
    }

    /**
     * Recupère toutes les entreprises avec l'adresse
     *
     * @return array
     */
    public function read_all()
    {
        $sql = 'SELECT t1.*, t2.' . COMMUNES['nom'] . ', t2.' . COMMUNES['code'] . ' FROM ' . $this->table . ' t1 LEFT JOIN ' . COMMUNES['table'] . ' t2 ON t1.' . COMMUNES['id'] . ' = t2.' . COMMUNES['id'];

        return $this->dbQuery($sql)->fetchAll();
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
     * @param string $nom
     * @return self
     */
    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    /**
     * Get the value of domaine
     * @return string
     */
    public function getDomaine(): string
    {
        return $this->domaine;
    }

    /**
     * Set the value of domaine
     * @param string $domaine
     * @return self
     */
    public function setDomaine(string $domaine): self
    {
        $this->domaine = $domaine;

        return $this;
    }

    /**
     * Get the value of siret
     * @return string
     */
    public function getSiret(): string
    {
        return $this->siret;
    }

    /**
     * Set the value of siret
     * @param string $siret
     * @return self
     */
    public function setSiret(string $siret): self
    {
        $this->siret = $siret;

        return $this;
    }

    /**
     * Get the value of num_rue
     * @return string
     */
    public function getNumRue(): string
    {
        return $this->num_rue;
    }

    /**
     * Set the value of num_rue
     * @param string $num_rue
     * @return self
     */
    public function setNumRue(string $num_rue): self
    {
        $this->num_rue = $num_rue;

        return $this;
    }

    /**
     * Get the value of nom_rue
     * @return string
     */
    public function getNomRue(): string
    {
        return $this->nom_rue;
    }

    /**
     * Set the value of nom_rue
     * @param string $nom_rue
     * @return self
     */
    public function setNomRue(string $nom_rue): self
    {
        $this->nom_rue = $nom_rue;

        return $this;
    }

    /**
     * Get the value of complement
     * @return string
     */
    public function getComplement(): string
    {
        return $this->complement;
    }

    /**
     * Set the value of complement
     * @param string $complement
     * @return self
     */
    public function setComplement(string $complement): self
    {
        $this->complement = $complement;

        return $this;
    }

    /**
     * Get the value of id_communes
     * @return int
     */
    public function getIdCommunes(): int
    {
        return $this->id_communes;
    }

    /**
     * Set the value of id_communes
     * @param int $id_communes
     * @return self
     */
    public function setIdCommunes(int $id_communes): self
    {
        $this->id_communes = $id_communes;

        return $this;
    }

    /**
     * Get the value of logo
     * @return string
     */
    public function getLogo(): string
    {
        return $this->logo;
    }

    /**
     * Set the value of logo
     * @param string $logo
     * @return self
     */
    public function setLogo(string $logo): self
    {
        $this->logo = $logo;

        return $this;
    }

    /**
     * Get the value of id_entreprises
     * @return int
     */
    public function getIdEntreprises(): int
    {
        return $this->id_entreprises;
    }

    /**
     * Set the value of id_entreprises
     * @param int $id_entreprises
     * @return self
     */
    public function setIdEntreprises(int $id_entreprises): self
    {
        $this->id_entreprises = $id_entreprises;

        return $this;
    }
}

<?php

namespace App\Models;

class CommunesModel extends Model
{
    protected $id_communes;
    protected $code_postale;
    protected $commune;

    public function __construct()
    {
        $this->table = COMMUNES['table'];
    }

    /**
     * Set the value of code_posate
     * @param string $code_postale
     * @return self
     */
    public function setCodePostale(string $code_posate): self
    {
        $this->code_postale = $code_posate;

        return $this;
    }

    /**
     * Get the value of code_postale
     * @return string
     */
    public function getCodePostale(): string
    {
        return $this->code_postale;
    }

    /**
     * Get the value of commune
     * @return string
     */
    public function getCommune(): string
    {
        return $this->commune;
    }

    /**
     * Set the value of commune
     * @param string commune
     * @return string
     */
    public function setCommune(string $commune): self
    {
        $this->commune = $commune;

        return $this;
    }

    /**
     * Get the value of id_communes
     * @param int $id_communes
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
}

<?php

namespace App\Models;

class ContratsModel extends Model
{
    protected $id_types_decontrat;
    protected $type;

    public function __construct()
    {
        $this->table = CONTRATS['table'];
    }

    /**
     * Get the value of type
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set the value of type
     * @param string $type
     * @return self
     */
    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get the value of id_types_decontrat
     * @return int
     */
    public function getIdTypesDecontrat(): int
    {
        return $this->id_types_decontrat;
    }

    /**
     * Set the value of id_types_decontrat
     * @param int $id_types_decontrat
     * @return self
     */
    public function setIdTypesDecontrat(int $id_types_decontrat): self
    {
        $this->id_types_decontrat = $id_types_decontrat;

        return $this;
    }
}

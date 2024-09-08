<?php

namespace App\Models;

class CandidatsModel extends Model
{
    protected $profession;
    protected $cv;

    public function __construct()
    {
        $this->table = USERS['1'];
    }

    /**
     * Get the value of profession
     * @return string
     */
    public function getProfession(): string
    {
        return $this->profession;
    }

    /**
     * Set the value of profession
     * @param string $profession
     * @return self
     */
    public function setProfession(string $profession): self
    {
        $this->profession = $profession;

        return $this;
    }

    /**
     * Get the value of cv
     * @return string
     */
    public function getCv(): string
    {
        return $this->cv;
    }

    /**
     * Set the value of cv
     * @param string $cv
     * @return self
     */
    public function setCv(string $cv): self
    {
        $this->cv = $cv;

        return $this;
    }
}

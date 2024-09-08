<?php

namespace App\Models;

use PDOStatement;

class RepresentantsModel extends Model
{
    protected $responsabilite;
    protected $id_entreprises;
    protected $id_validation;

    public function __construct()
    {
        $this->table = USERS['2'];
    }

    /**
     * Recupère le champ valid de la table du user courant
     *
     * @return array | bool
     */
    public function getvalidate(): array | bool
    {
        $sql = 'SELECT t2.' . VALIDATION['valid'] . ' FROM ' . $this->table . ' t1 INNER JOIN ' . VALIDATION['table'] . ' t2 ON t1.' . VALIDATION['id'] . ' = t2.' . VALIDATION['id'] . ' WHERE t1.' . USERS['id'] . ' = ?';

        return $this->dbQuery($sql, [$this->id_users])->fetch();
    }

    /**
     * Recupère tous les representants qui sont en attente d'affiliation
     *
     * @return array | bool
     */
    public function getPendingUsers(): array | bool
    {
        $sql = 'SELECT t1.*, t2.' . USERS['prenom'] . ', t2.' . USERS['nom'] . ', t3.' . ENTREPRISES['nom'] . ' as entreprise FROM ' . $this->table . ' t1 INNER JOIN ' . USERS['table'] . ' t2 ON t1.' . USERS['id'] . ' = t2.' . USERS['id'] . ' INNER JOIN ' . ENTREPRISES['table'] . ' t3 ON t1.' . ENTREPRISES['id'] . ' = ' . ' t3.' . ENTREPRISES['id'] . ' WHERE t1.' . ENTREPRISES['id'] . ' IS NOT NULL AND t1.' . VALIDATION['id'] . ' = ?';

        return $this->dbQuery($sql, [EN_ATTENTE])->fetchAll();
    }

    /**
     * Invalide une afiliation en mettant
     *
     * @param [type] $id
     * @return PDOStatement | bool
     */
    public function invalidAfiliation($id): PDOStatement | bool
    {
        $sql = 'UPDATE ' . $this->table . ' SET ' . ENTREPRISES['id'] . ' = ?, ' . VALIDATION['id'] . ' = ? WHERE ' . USERS['id'] . ' = ?';

        return $this->dbQuery($sql, [NULL, NULL, $id]);
    }

    /**
     * Recupère l'entreprise affilié au representant en cours
     *
     * @return array | bool
     */
    public function getEntreprise(): array | bool
    {
        $sql = 'SELECT t2.* FROM ' . $this->table . ' t1 INNER JOIN ' . ENTREPRISES['table'] . ' t2 ON t1.' . ENTREPRISES['id'] . ' = t2.' . ENTREPRISES['id'] . ' WHERE t1.' . USERS['id'] . ' = ?';

        return $this->dbQuery($sql, [$this->id_users])->fetch();
    }

    /**
     * Get the value of responsabilite
     * @return string
     */
    public function getResponsabilite(): string
    {
        return $this->responsabilite;
    }

    /**
     * Set the value of responsabilite
     * @param string $responsabilite
     * @return self
     */
    public function setResponsabilite(string $responsabilite): self
    {
        $this->responsabilite = $responsabilite;

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

    /**
     * Get the value of id_validation
     * @return int
     */
    public function getIdValidation(): int
    {
        return $this->id_validation;
    }

    /**
     * Set the value of id_validation
     * @param int $id_validation
     * @return self
     */
    public function setIdValidation(int $id_validation): self
    {
        $this->id_validation = $id_validation;

        return $this;
    }
}

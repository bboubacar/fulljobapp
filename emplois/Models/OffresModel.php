<?php

namespace App\Models;

class OffresModel extends Model
{
    protected $id_offres_demploi;
    protected $titre;
    protected $description;
    protected $date_exp;
    protected $salaire_min;
    protected $salaire_max;
    protected $id_types_decontrat;
    protected $id_statuts;

    public function __construct()
    {
        $this->table = OFFRES['table'];
    }

    /**
     * Recupère l'entreprise affilié au representant en cours
     *
     * @return array | bool
     */
    public function getOffresByUser(int $id = 0): array | bool
    {
        $sql = 'SELECT t1.*, t2.' . STATUTS['label'] . ', t3.' . TYPES['type'] . ', t5.' . ENTREPRISES['logo'] . ' FROM ' . $this->table . ' t1 LEFT JOIN ' . STATUTS['table'] . ' t2 ON t1.' . STATUTS['id'] . ' = t2.' . STATUTS['id'] . ' LEFT JOIN ' . TYPES['table'] . ' t3 ON t1.' . TYPES['id'] . ' = t3.' . TYPES['id'] . ' INNER JOIN ' . USERS['2'] . ' t4 ON t4.' . USERS['id'] . ' = t1.' . USERS['id'] . ' INNER JOIN ' . ENTREPRISES['table'] . ' t5 ON t5.' . ENTREPRISES['id'] . ' = t4.' .  ENTREPRISES['id'] . ' WHERE t1.' . USERS['id'] . ' = ?';

        return $this->dbQuery($sql, [$id])->fetchAll();
    }

    /**Recupère toutes les offres en attente
     *
     * @return array
     */
    public function getPendingOffres(): array
    {
        $sql = 'SELECT t1.*, t2.' . USERS['prenom'] . ', t2.' . USERS['nom'] . ', t3.' . ENTREPRISES['nom'] . ' as entreprise, t5.' . COMMUNES['nom'] . ' FROM ' . $this->table . ' t1 INNER JOIN ' . USERS['2'] . ' t4 ON t4.' . USERS['id'] . ' = t1.' . USERS['id'] . ' INNER JOIN ' . USERS['table'] . ' t2 ON t2.' . USERS['id'] . ' = t4.' . USERS['id'] . ' INNER JOIN ' . ENTREPRISES['table'] . ' t3 ON t3.' . ENTREPRISES['id'] . ' = t4.' . ENTREPRISES['id'] . ' LEFT JOIN ' . COMMUNES['table'] . ' t5 ON t5.' . COMMUNES['id'] . ' = ' . ' t2.' . COMMUNES['id'] .  ' WHERE t1.' . STATUTS['id'] . ' = ?';

        return $this->dbQuery($sql, [PENDING])->fetchAll();
    }

    /**
     * Recherche d'offres en fonction des filtres
     *@param object $data
     * @return void
     */
    public function search(object $data)
    {
        $sql = 'SELECT t1.*, t4.' . ENTREPRISES['nom'] . ', t4.' . ENTREPRISES['logo'] . ', t5.' . COMMUNES['nom'] . ', t5.' . COMMUNES['code'] . ', t6.' . TYPES['type'] . ' FROM ' . OFFRES['table'] . ' t1 INNER JOIN ' . USERS['table'] . ' t2 ON t1.' . USERS['id'] . ' = t2.' . USERS['id'] . ' INNER JOIN ' . USERS['2'] . ' t3 ON t1.' . USERS['id'] . ' = t3.' . USERS['id'] . ' INNER JOIN ' . ENTREPRISES['table'] . ' t4 ON t4.' . ENTREPRISES['id'] . ' = t3.' . ENTREPRISES['id'] . ' LEFT JOIN ' . COMMUNES['table'] . ' t5 ON t4.' . COMMUNES['id'] . ' = t5.' . COMMUNES['id'] . ' LEFT JOIN ' . TYPES['table'] . ' t6 ON t6.' . TYPES['id'] . ' = t1.' . TYPES['id'] . ' WHERE t1.' . OFFRES['titre'] . ' LIKE CONCAT(\'%\' , ?,  \'%\') AND t1.' . STATUTS['id'] . ' <> ' . PENDING;

        $valeurs = [$data->{OFFRES['titre']}];

        if (isset($data->{COMMUNES['nom']}) && !empty($data->{COMMUNES['nom']})) {
            $sql .= ' AND  t5.' . COMMUNES['nom'] . " LIKE CONCAT('%', ?, '%')";
            $valeurs[] = $data->{COMMUNES['nom']};
        }
        if (isset($data->{TYPES['type']}) && !empty($data->{TYPES['type']})) {
            $sql .= ' AND (t6.' . TYPES['type'] . " LIKE CONCAT('%', ?, '%') OR t6." . TYPES['type'] . ' IS NULL)';
            $valeurs[] = $data->{TYPES['type']};
        }
        if (isset($data->{OFFRES['min']}) && !empty($data->{OFFRES['min']})) {
            $sql .= ' AND (t1.' . OFFRES['min'] . ' >= ? OR t1.' . OFFRES['min'] . ' IS NULL)';
            $valeurs[] = $data->{OFFRES['min']};
        }

        return $this->dbQuery($sql, $valeurs)->fetchAll();
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
     * Get the value of description
     *  @return string
     */
    public function getDescription(): string
    {
        return $this->description;
    }

    /**
     * Set the value of description
     *  @param string $description
     * @return self
     */
    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get the value of id_offres_demploi
     * @return int
     */
    public function getIdOffresDemploi(): int
    {
        return $this->id_offres_demploi;
    }

    /**
     * Set the value of id_offres_demploi
     * @param int $id_offres_demploi
     * @return self
     */
    public function setIdOffresDemploi(int $id_offres_demploi): self
    {
        $this->id_offres_demploi = $id_offres_demploi;

        return $this;
    }

    /**
     * Get the value of date_exp
     */
    public function getDateExp()
    {
        return $this->date_exp;
    }

    /**
     * Set the value of date_exp
     */
    public function setDateExp($date_exp): self
    {
        $this->date_exp = $date_exp;

        return $this;
    }

    /**
     * Get the value of salaire_min
     * @return int
     */
    public function getSalaireMin(): int
    {
        return $this->salaire_min;
    }

    /**
     * Set the value of salaire_min
     * @param int $salaire_min
     * @return self
     */
    public function setSalaireMin(int $salaire_min): self
    {
        $this->salaire_min = $salaire_min;

        return $this;
    }

    /**
     * Get the value of salaire_max
     * @return int
     */
    public function getSalaireMax(): int
    {
        return $this->salaire_max;
    }

    /**
     * Set the value of salaire_max
     * @param int $salaire_max
     * @return self
     */
    public function setSalaireMax(int $salaire_max): self
    {
        $this->salaire_max = $salaire_max;

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

    /**
     * Get the value of id_statuts
     * @return int
     */
    public function getIdStatuts(): int
    {
        return $this->id_statuts;
    }

    /**
     * Set the value of id_statuts
     * @param int $id_statuts
     * @return self
     */
    public function setIdStatuts(int $id_statuts): self
    {
        $this->id_statuts = $id_statuts;

        return $this;
    }
}

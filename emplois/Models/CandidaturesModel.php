<?php

namespace App\Models;

class CandidaturesModel extends Model
{
    protected $id_offres_demploi;
    protected $id_situation;
    protected $id_candidature;

    public function __construct()
    {
        $this->table = CANDIDATURES['table'];
    }

    /**
     * Récupère les candidatures non encore rejeter pour une offre donnée
     * @param integer $id
     * @return void
     */
    public function findByOffre(int $id)
    {
        $sql = 'SELECT t1.*, t2.' . USERS['nom'] . ', t2.' . USERS['prenom'] . ', t3.' . USERS['profession'] . ', t3.' . USERS['cv'] . ' FROM ' . $this->table . ' t1 INNER JOIN ' . USERS['table'] . ' t2 ON t1.' . USERS['id'] . ' = t2.' . USERS['id'] . ' INNER JOIN ' . USERS['1'] . ' t3 ON t1.' . USERS['id'] . ' = t3.' . USERS['id'] . ' WHERE t1.' . OFFRES['id'] . ' = ? && t1.' . SITUATIONS['id'] . ' <> ? && t1.' . SITUATIONS['id'] . ' <> ?';

        // On exécute la requête
        return $this->dbQuery($sql, [$id, REJET, CANCEL])->fetchAll();
    }

    /**
     * Récupère les candidatures d'un candidat qui ne sont pas annuler
     * @param integer $id
     * @return array
     */
    public function findByCandidat(int $id): array
    {
        $sql = 'SELECT t2.' . OFFRES['titre'] . ', t2.' . OFFRES['desc'] . ', t2.' . OFFRES['id'] . ', t1.' . CANDIDATURES['id'] . ', t1.' . CANDIDATURES['date_denvoi'] . ', t4.' . ENTREPRISES['nom'] . ', t5.' . COMMUNES['nom'] . ', t6.' . SITUATIONS['label'] . ' FROM ' . CANDIDATURES['table'] . ' t1 INNER JOIN ' . OFFRES['table'] . ' t2 ON t1.' . OFFRES['id'] . ' = t2.' . OFFRES['id'] . ' INNER JOIN ' . USERS['2'] . ' t3 ON t3.' . USERS['id'] . ' = t2.' . USERS['id'] . ' INNER JOIN ' . ENTREPRISES['table'] . ' t4 ON t4.' . ENTREPRISES['id'] . ' = t3.' . ENTREPRISES['id'] . ' INNER JOIN ' . COMMUNES['table'] . ' t5 ON t4.' . COMMUNES['id'] . ' = t5.' . COMMUNES['id'] . ' INNER JOIN ' . SITUATIONS['table'] . ' t6 ON t6.' . SITUATIONS['id'] . ' = t1.' . SITUATIONS['id'] . ' WHERE t1.' . USERS['id'] . ' = ? AND t6.' . SITUATIONS['id'] . ' <> ?';

        // On exécute la requête
        return $this->dbQuery($sql, [$id, CANCEL])->fetchAll();
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
     * Get the value of id_situation
     * @return int
     */
    public function getIdSituation(): int
    {
        return $this->id_situation;
    }

    /**
     * Set the value of id_situation
     * @param int $id_situation
     * @return self
     */
    public function setIdSituation($id_situation): self
    {
        $this->id_situation = $id_situation;

        return $this;
    }

    /**
     * Get the value of id_candidature
     * @param int $id_candidature
     */
    public function getIdCandidature(): int
    {
        return $this->id_candidature;
    }

    /**
     * Set the value of id_candidature
     * @param int $id_candidature
     * @return self
     */
    public function setIdCandidature(int $id_candidature): self
    {
        $this->id_candidature = $id_candidature;

        return $this;
    }
}

<?php

namespace App\Models;

use App\Src\Db;
use PDOStatement;

class Model extends Db
{
    // Table de la base de données
    protected $table;
    protected $id_users;

    // Instance de Db
    protected $db;

    /**
     * Insertion d'un enregistrement suivant un tableau de données
     *
     * @return PDOStatement|bool
     */
    public function create(): PDOStatement|bool
    {
        $champs = [];
        $inter = [];
        $valeurs = [];

        // On va boucler pour éclater le tableau
        foreach ($this as $key => $value) {
            if ($value !== null && $key !== 'db' && $key !== 'table') {
                $champs[] = $key;
                $inter[] = "?";
                $valeurs[] = $value;
            }
        }

        // On transforme le tableau "champs" en une chaine de caractères
        $liste_champs = implode(', ', $champs);
        $liste_inter = implode(', ', $inter);

        // On exécute la requête
        return $this->dbQuery('INSERT INTO ' . $this->table . ' (' . $liste_champs . ') VALUES(' . $liste_inter . ')', $valeurs);
    }

    /**
     * Récupère la dernières clé inseré par l'utilisateur
     *
     * @return int
     */
    public function last_insert_id(): int
    {
        return $this->db->lastInsertId();
    }

    /**
     * Sélection de plusieurs enregistrements d'une même table suivant un tableau de critères
     * @param array $criteres Tableau de critères
     * @return array Tableau des enregistrements trouvés
     */
    public function findBy(array $criteres): array
    {
        $champs = [];
        $valeurs = [];

        // On va boucler pour éclater le tableau
        foreach ($criteres as $key => $value) {
            $champs[] = "$key = ?";
            $valeurs[] = $value;
        }

        // On transforme le tableau "champs" en une chaine de caractères
        $liste_champs = implode(' AND ', $champs);

        // On exécute la requête
        return $this->dbQuery('SELECT * FROM ' . $this->table . ' WHERE ' . $liste_champs, $valeurs)->fetchAll();
    }

    /**
     * Sélection certains attributs de tous les enregistrements
     * @param array $criteres Tableau de critères
     * @return array Tableau des enregistrements trouvés
     */
    public function findAll(array $attributs = [], array $criteres = []): array
    {
        $champs = [];
        $valeurs = [];

        // On va boucler pour éclater le tableau
        foreach ($criteres as $key => $value) {
            $champs[] = "$key = ?";
            $valeurs[] = $value;
        }

        // On transforme le tableau "champs" en une chaine de caractères
        $liste_champs = implode(' AND ', $champs);

        $liste = "";
        foreach ($attributs as $key => $value) {
            // On concatène avec une virgule si ce n'est pas le dernier attribut
            $liste .= $key < (count($attributs) - 1) ? " $value," : " $value";
        }

        // Si la liste est vide alors on selection tout
        $liste = empty($liste) ? "*" : $liste;
        $where = count($criteres) > 0 ? "WHERE $liste_champs" : "";
        // On exécute la requête
        return $this->dbQuery("SELECT $liste FROM $this->table $where", $valeurs)->fetchAll();
    }

    /**
     * Sélection d'un enregistrement suivant son id
     * @param int $id id de l'enregistrement
     * @param string id_attribut l'attribut correspondant à l'id
     * @return array Tableau contenant l'enregistrement trouvé
     */
    public function findById(int $id, string $id_attribut = USERS['id'])
    {
        return $this->dbQuery("SELECT * FROM {$this->table} WHERE $id_attribut = $id")->fetch();
    }

    /**
     * Mise à jour d'un enregistrement suivant un tableau de données
     * @param string $id_name
     * @param int $user_id
     * @param boolean $isAdmin
     * @return bool
     */
    public function update(string $id_name, int $user_id =  null, bool $isAdmin = false)
    {
        $champs = [];
        $valeurs = [];

        // On va boucler pour éclater le tableau
        foreach ($this as $key => $value) {
            // UPDATE annonces SET titre = ?, description = ?, actif = ? WHERE id= ?
            if ($value !== null && $value !== '' && $key !== 'db' && $key !== 'table') {
                $champs[] = "$key = ?";
                $valeurs[] = $value;
            }
        }
        $valeurs[] = $this->$id_name;

        // On transforme le tableau "champs" en une chaine de caractères
        $liste_champs = implode(', ', $champs);

        $sql = 'UPDATE ' . $this->table . ' SET ' . $liste_champs . ' WHERE ' . $id_name . ' = ?';
        if ($id_name !== USERS['id'] && $user_id && !$isAdmin) {
            $sql .= ' AND ' . USERS['id'] . ' = ?';
            $valeurs[] = $user_id;
        }

        // On exécute la requête
        return $this->dbQuery($sql, $valeurs);
    }

    /**
     * Suppression d'un enregistrement
     * @param string $id_name id de l'enregistrement à supprimer
     * @param int $id id de l'enregistrement à supprimer
     * @return void 
     */
    public function delete(string $id_name, int $id)
    {
        return $this->dbQuery("DELETE FROM {$this->table} WHERE $id_name = ? ", [$id]);
    }

    /**
     * Méthode qui exécutera les requêtes
     * @param string $sql Requête SQL à exécuter
     * @param array $valeurs valeurs à ajouter à la requête 
     * @return PDOStatement|false 
     */
    public function dbQuery(string $sql, array $valeurs = null): PDOStatement|false
    {
        // On recupère l'instance de Db
        $this->db = Db::getInstance();

        // On verifie si on a des valeurs
        if ($valeurs !== null) {
            // Requête préparée
            $query = $this->db->prepare($sql);
            $query->execute($valeurs);
            return $query;
        } else {
            //Requête simple
            return $this->db->query($sql);
        }
    }

    /**
     * Hydratation des données
     * @param mixed (array | object) $donnees Tableau associatif des données
     * @return self Retourne l'objet hydraté
     */
    public function hydrate($donnees): self
    {
        foreach ($donnees as $key => $value) {
            $this->dynamicSetter($key, $value, $this);
        }
        return $this;
    }

    /**
     * Recuperer verifier et executer un setter à partir d'une clé
     *
     * @param string $key clé de l'objet
     * @param mixed $value valeur à affecter
     * @param object $model model de l'objet
     * @return void
     */
    public function dynamicSetter(string $key, mixed $value, object $model): void
    {
        if (empty($value)) return;
        // On récupère le nom du setter correspondant à la clé (key)
        // Verifi si la clé n'est pas composer de plusieurs mots separés par "_"
        $capitalise = explode('_', $key);
        $setter = 'set';
        foreach ($capitalise as $set) {
            $setter .= ucfirst($set);
        }

        // On verifie si le setter existe
        if (method_exists($model, $setter)) {
            $model->$setter($value);
        }
    }

    /**
     * Get the value of id_users
     * @return int
     */
    public function getIdUsers(): int
    {
        return $this->id_users;
    }

    /**
     * Set the value of id_users
     * @param int $id_users
     * @return self
     */
    public function setIdUsers(int $id_users): self
    {
        $this->id_users = $id_users;

        return $this;
    }
}

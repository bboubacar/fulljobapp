<?php

namespace App\Models;

class UsersModel extends Model
{
    protected $nom;
    protected $prenom;
    protected $email;
    protected $password;
    protected $num_rue;
    protected $nom_rue;
    protected $complement;
    protected $num_tel;
    protected $id_communes;
    protected $site_web;
    protected $avatar;

    public function __construct()
    {
        $this->table = USERS['table'];
    }

    /**
     * Récupère le tuple d'un utilisateur voulant se connecter dans la BD en fonction de son role
     * @param $string $role
     * @param $string $email
     * @return array | bool
     */
    public function connectUSer(string $role, string $email): array | bool
    {
        $type = USERS['1'];
        if ($role === USERS['2'] || $role === USERS['3'])
            $type = $role;

        $sql = 'SELECT * FROM ' . $this->table . ' t1 INNER JOIN ' . $type . ' t2 ON t1.' . USERS['id'] . ' = ' . ' t2.' . USERS['id'] . ' WHERE t1.email = ?';

        return $this->dbQuery($sql, [$email])->fetch();
    }

    /**
     * Prends toutes les informations concernant un utilisateur
     *
     * @param string $current_role
     * @param int $id
     * @return array | false
     */
    public function readDetails(string $role, int $id): array | false
    {
        // On verifi le type d'utilisateur afin de determine l'attribut suivant
        $type = $role === USERS['1'] ? USERS['profession'] : USERS['responsabilite'];
        $cv = $role === USERS['1'] ? ', t3.' . USERS['cv'] : '';

        if ($role === USERS['1'] || $role === USERS['2'])
            $sql = 'SELECT t1.*, t2.' . COMMUNES['nom'] . ', t2.' . COMMUNES['code'] . ', t3.' . $type . $cv . ' FROM ' . $this->table . ' t1 LEFT JOIN ' . COMMUNES['table'] . ' t2 ON t1.' . COMMUNES['id'] . ' = t2.' . COMMUNES['id'] . ' LEFT JOIN ' . $role . ' t3 ON t1.' . USERS['id'] . ' = t3.' . USERS['id'] . ' WHERE t1.' . USERS['id'] . ' = ?';

        return $this->dbQuery($sql, [$id])->fetch();
    }

    public function updateDetails(array $join, int $id, string $cvPath)
    {
        $champs = [];
        $valeurs = [];

        // On va boucler pour éclater le tableau
        foreach ($this as $key => $value) {
            if ($value !== null && $key !== 'db' && $key !== 'table') {
                $champs[] = "t1.$key = ?";
                $valeurs[] = $value;
            }
        }

        $this->table .= " t1";
        $joinTable = '';
        if (count($join) > 0) {
            $champs[] = "t2." . $join['key'] . " = ?";
            $valeurs[] = $join['value'];
            $joinTable = " INNER JOIN " . $join['table'] . " t2 ON t1." . USERS['id'] . " = " . "t2." . USERS['id'];
        }

        // Ajouter le cv s'il existe
        if (!empty($cvPath)) {
            $champs[] = "t2." . USERS['cv'] . " = ?";
            $valeurs[] = $cvPath;

            if (count($join) <= 0) {
                $joinTable = " INNER JOIN " . USERS['1'] . " t2 ON t1." . USERS['id'] . " = " . "t2." . USERS['id'];
            }
        }

        $valeurs[] = $id;
        // On transforme le tableau "champs" en une chaine de caractères
        $liste_champs = implode(', ', $champs);

        // // On exécute la requête
        return $this->dbQuery('UPDATE ' . $this->table . $joinTable . ' SET ' . $liste_champs . ' WHERE t1.' . USERS['id'] . ' = ?', $valeurs);
    }

    public function search($data)
    {
        $sql = 'SELECT t1.' . USERS['id'] . ', t1.' . USERS['nom'] . ' , t1.' . USERS['prenom'] . ' , t2.' . COMMUNES['nom'] . ', t3.' . USERS['profession'] . ', t3.' . USERS['cv'] . ' FROM ' . USERS['table'] . ' t1 LEFT JOIN ' . COMMUNES['table'] . ' t2 ON t1.' . COMMUNES['id'] . ' = t2.' . COMMUNES['id'] . ' INNER JOIN ' . USERS['1'] . ' t3 ON t1.' . USERS['id'] . ' = t3.' . USERS['id'] . ' WHERE t3.' . USERS['profession'] . ' LIKE CONCAT(\'%\' , ?,  \'%\')';
        $valeurs = [$data->{USERS['profession']}];
        if (isset($data->{COMMUNES['nom']})) {
            $sql .= ' AND  t2.' . COMMUNES['nom'] . " LIKE CONCAT('%', ?, '%')";
            $valeurs[] = $data->{COMMUNES['nom']};
        }

        // // On exécute la requête
        return $this->dbQuery($sql, $valeurs)->fetchAll();
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
     * Get the value of prenom
     * @return string
     */
    public function getPrenom(): string
    {
        return $this->prenom;
    }

    /**
     * Set the value of prenom
     * @param string $prenom
     * @return self
     */
    public function setPrenom(string $prenom): self
    {
        $this->prenom = $prenom;

        return $this;
    }

    /**
     * Get the value of email
     * @return string
     */
    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * Set the value of email
     * @param string $email
     * @return self
     */
    public function setEmail($email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get the value of mot_de_passe
     * @return string
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    /**
     * Set the value of password
     * @param string $password
     * @return self
     */
    public function setPassword($password): self
    {
        $this->password = $password;

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
     * Get the value of num_tel
     * @return string
     */
    public function getNumTel(): string
    {
        return $this->num_tel;
    }

    /**
     * Set the value of num_tel
     * @param string $num_tel
     * @return self
     */
    public function setNumTel(string $num_tel): self
    {
        $this->num_tel = $num_tel;

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
     * Get the value of site_web
     * @return string
     */
    public function getSiteWeb(): string
    {
        return $this->site_web;
    }

    /**
     * Set the value of site_web
     * @param string $site_web
     * @return self
     */
    public function setSiteWeb(string $site_web): self
    {
        $this->site_web = $site_web;

        return $this;
    }

    /**
     * Get the value of avatar
     * @return string
     */
    public function getAvatar(): string
    {
        return $this->avatar;
    }

    /**
     * Set the value of avatar
     * @param string $avatar
     * @return self
     */
    public function setAvatar(string $avatar): self
    {
        $this->avatar = $avatar;

        return $this;
    }
}

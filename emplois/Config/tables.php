<?php

define('USERS', [
    'table' => 'users',
    '1' => 'candidats',
    '2' => 'representants',
    "3" => 'administrateurs',
    'id' => 'id_users',
    'nom' => 'nom',
    'prenom' => 'prenom',
    'email' => 'email',
    'pwrd' => 'password',
    'profession' => 'profession',
    'responsabilite' => 'responsabilite',
    'num_rue' => 'num_rue',
    'num_tel' => 'num_tel',
    'nom_rue' => 'nom_rue',
    'complement' => 'complement',
    'site_web' => 'site_web',
    'img' => 'avatar',
    'cv' => 'cv'
]);

define('ENTREPRISES', [
    'table' => 'entreprises',
    'id' => 'id_entreprises',
    'nom' => 'nom',
    'domaine' => 'domaine',
    'logo' => 'logo',
    'siret' => 'siret'
]);

define('VALIDATION', [
    'table' => 'validation',
    'id' => 'id_validation',
    'valid' => 'valid'
]);

define('COMMUNES', [
    'table' => 'communes',
    'id' => 'id_communes',
    'code' => 'code_postale',
    'nom' => 'commune'
]);

define('OFFRES', [
    'table' => 'offres_demploi',
    "id" => "id_offres_demploi",
    "titre" => "titre",
    "desc" => "description",
    "date_pup" => "date_pup",
    "date_exp" => "date_exp",
    "min" => "salaire_min",
    "max" => "salaire_max",
    "id_type" => "id_types_decontrat"
]);

define('STATUTS', [
    'table' => 'statuts',
    'id' => 'id_statuts',
    'label' => 'statut'
]);

define('CONTRATS', [
    'table' => 'types_decontrat',
    'id' => 'id_types_decontrat',
    'type' => 'type'
]);

define('CANDIDATURES', [
    'table' => 'candidature',
    'id' => 'id_candidature',
    'date_denvoi' => 'date_denvoi',
    'message' => 'message'
]);

define('SITUATIONS', [
    'table' => 'situation',
    'id' => 'id_situation',
    'label' => 'label'
]);

define("SKILLS", [
    "table" => "experiences",
    "id" => "id_experiences",
    "titre" => "titre",
    "entreprise" => "entreprise",
    "date_deb" => "date_deb",
    "date_fin" => "date_fin",
    "details" => "details"
]);

define('COMPETENCES', [
    'table' => 'competences',
    'id' => 'id_competences',
    'nom' => 'nom',
    'details' => 'details'
]);

define("FORMATIONS", [
    "table" => "formations",
    "id" => "id_formations",
    "titre" => "titre",
    "institut" => "institut",
    "date_deb" => "date_deb",
    "date_fin" => "date_fin",
    "details" => "details"
]);

define("TYPES", [
    'table' => 'types_decontrat',
    'id' => 'id_types_decontrat',
    'type' => 'type'
]);

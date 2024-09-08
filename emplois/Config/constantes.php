<?php
// Identifiant du rejet d'une candidature dans le db
define('REJET', 3); // Candidature
define('CANCEL', 4); // Annuler une candidature
define('PENDING', 1); // Offres en attente 
define('INVALIDER', 3); // Offres en attente
define('VALIDER', 2); // Offres en attente ou affiliation
define('EN_ATTENTE', 1);
define('ADD', 'add');
define('SEARCH', 'search');
define('CHANGE', 'update');
define('SUPPR', 'supprimer');
define('CONTROLLERS', ["candidatures", "communes", "competences", "contrats", "entreprises", "experiences", "formations", "offres", "representants", "users"]);

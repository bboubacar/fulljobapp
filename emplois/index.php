<?php


use App\Autoloader;
use App\Controllers\UsersController;
use App\Src\Main;

// On definit une constante contenat le dossier racine du projet
if ($_SERVER["SERVER_ADDR"] !== "127.0.0.1") {
    if (str_ends_with($_SERVER["DOCUMENT_ROOT"], '/'))
        define('ROOT', $_SERVER["DOCUMENT_ROOT"]);
    else
        define('ROOT', $_SERVER["DOCUMENT_ROOT"] . '/');
} else {
    define('ROOT', dirname(__DIR__) . '/');
}
// print_r($_SERVER);


// On import toutes les contantes
require_once ROOT . 'Config/constantes.php';
require_once ROOT . 'Config/tables.php';
require_once ROOT . 'Config/responses.php';
require_once ROOT . 'Config/db.php';

// On importe l'autoloader
require_once ROOT . 'Autoloader.php';
Autoloader::register();

// On instancie Main
$app = new Main();

// On demarre l'application
try {
    // Ajouter les headers pour les autorizations
    // Ajouter l'en-tête de politique de référence
    header("Referrer-Policy: no-referrer-when-downgrade");
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");
    header("Access-Control-Allow-Methods: PUT, POST, DELETE, GET");
    header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With");

    // Demarer l'application
    $app->start();
} catch (Exception $e) {
    // On renvoie une erreur serveur
    echo $e->getMessage();
    // $controller = new UsersController;
    // $controller->response(CODE['500']['code'], true, CODE['500']['text']);
}

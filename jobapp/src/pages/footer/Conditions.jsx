import React from "react";
import usePageTitle from "../../hooks/usePageTitle";

const Conditions = () => {
    usePageTitle("Conditions générales");
    return (
        <section className="conditions">
            <article className="content">
                <h1>Conditions Générales d'Utilisation</h1>
                <p>Dernière mise à jour : 29 juillet 2024</p>
            </article>
            <article className="content">
                <h2>Introduction</h2>
                <p>
                    Bienvenue sur notre site d'offre d'emploi. En accédant à
                    notre site, vous acceptez de vous conformer aux présentes
                    conditions générales d'utilisation. Si vous n'êtes pas
                    d'accord avec l'une de ces conditions, veuillez ne pas
                    utiliser notre site.
                </p>
            </article>

            <article className="content">
                <h2>Définitions</h2>
                <p>
                    Dans ces conditions générales d'utilisation, les termes
                    suivants ont les significations suivantes :
                </p>
                <ul>
                    <li>
                        <strong>Site</strong> : Le site web sur lequel vous
                        naviguez actuellement.
                    </li>
                    <li>
                        <strong>Utilisateur</strong> : Toute personne utilisant
                        le Site.
                    </li>
                    <li>
                        <strong>Contenu</strong> : Toute information, texte,
                        image, vidéo ou autre matériel publié sur le Site.
                    </li>
                </ul>
            </article>

            <article className="content">
                <h2>Utilisation du Site</h2>
                <p>
                    Vous vous engagez à utiliser le Site conformément aux lois
                    et règlements en vigueur. Vous acceptez de ne pas utiliser
                    le Site pour :
                </p>
                <ul>
                    <li>
                        Publier des offres d'emploi illégales ou trompeuses.
                    </li>
                    <li>
                        Collecter des informations personnelles sans
                        consentement.
                    </li>
                    <li>
                        Diffuser du contenu offensant, diffamatoire ou obscène.
                    </li>
                </ul>
            </article>

            <article className="content">
                <h2>Comptes Utilisateurs</h2>
                <p>
                    Pour accéder à certaines fonctionnalités du Site, vous devez
                    créer un compte utilisateur. Vous êtes responsable de la
                    confidentialité de vos informations de connexion et de
                    toutes les activités effectuées sous votre compte.
                </p>
            </article>

            <article className="content">
                <h2>Propriété Intellectuelle</h2>
                <p>
                    Tout le contenu du Site, y compris les textes, graphiques,
                    logos, icônes, images, clips audio, et logiciels, est la
                    propriété de "Emploi idéal" ou de ses fournisseurs de
                    contenu et est protégé par les lois sur la propriété
                    intellectuelle{" "}
                    <a
                        href="https://www.cnil.fr/fr/reglement-europeen-protection-donnees"
                        target="_blank"
                    >
                        RGPD
                    </a>
                    .
                </p>
            </article>

            <article className="content">
                <h2>Limitation de Responsabilité</h2>
                <p>
                    Nous ne serons pas responsables des dommages directs,
                    indirects, accessoires, spéciaux ou consécutifs résultant de
                    l'utilisation ou de l'incapacité à utiliser le Site, même si
                    nous avons été informés de la possibilité de tels dommages.
                </p>
            </article>

            <article className="content">
                <h2>Modifications des Conditions</h2>
                <p>
                    Nous nous réservons le droit de modifier ces conditions
                    générales d'utilisation à tout moment. Toute modification
                    sera publiée sur cette page. En continuant d'utiliser le
                    Site après la publication des modifications, vous acceptez
                    les nouvelles conditions.
                </p>
            </article>

            <article className="content">
                <h2>Contact</h2>
                <p>
                    Si vous avez des questions concernant ces conditions
                    générales d'utilisation, veuillez nous contacter à l'adresse
                    suivante : bboubcar@yahoo.fr.
                </p>
            </article>
            <p>Merci d'utiliser notre site d'offre d'emploi.</p>
        </section>
    );
};

export default Conditions;

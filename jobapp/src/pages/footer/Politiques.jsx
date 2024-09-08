import React from "react";
import usePageTitle from "../../hooks/usePageTitle";

const Politiques = () => {
    usePageTitle("Politique de Confidentialité");
    return (
        <section className="politiques">
            <article className="content">
                <h1>Politiques de Confidentialité</h1>
                <p>Dernière mise à jour : 29 juillet 2024</p>
            </article>

            <article className="content">
                <h2>Introduction</h2>
                <p>
                    Nous nous engageons à protéger votre vie privée. Cette
                    politique de confidentialité explique comment nous
                    collectons, utilisons, divulguons et protégeons vos
                    informations personnelles lorsque vous utilisez notre site
                    d'offre d'emploi.
                </p>
            </article>

            <article className="content">
                <h2>Informations que nous collectons</h2>
                <p>
                    Nous collectons différents types d'informations lorsque vous
                    utilisez notre site :
                </p>
                <ul>
                    <li>
                        <strong>Informations personnelles :</strong> Nom,
                        adresse e-mail, numéro de téléphone, informations de
                        connexion, etc.
                    </li>
                    <li>
                        <strong>Informations sur l'emploi :</strong> CV,
                        expériences professionnelles, compétences, préférences
                        d'emploi, etc.
                    </li>
                    <li>
                        <strong>Informations techniques :</strong> Adresse IP,
                        type de navigateur, pages visitées, temps passé sur le
                        site, etc.
                    </li>
                </ul>
            </article>

            <article className="content">
                <h2>Utilisation des informations</h2>
                <p>Nous utilisons vos informations pour :</p>
                <ul>
                    <li>Fournir et améliorer nos services.</li>
                    <li>Personnaliser votre expérience utilisateur.</li>
                    <li>
                        Communiquer avec vous concernant les offres d'emploi et
                        les mises à jour.
                    </li>
                    <li>
                        Analyser l'utilisation de notre site pour en améliorer
                        les fonctionnalités.
                    </li>
                </ul>
            </article>

            <article className="content">
                <h2>Partage des informations</h2>
                <p>
                    Nous ne partageons pas vos informations personnelles avec
                    des tiers, sauf dans les cas suivants :
                </p>
                <ul>
                    <li>Avec votre consentement explicite.</li>
                    <li>Pour se conformer à une obligation légale.</li>
                    <li>
                        Pour protéger nos droits, notre propriété ou notre
                        sécurité, ainsi que ceux de nos utilisateurs.
                    </li>
                    <li>
                        Avec des prestataires de services qui nous assistent
                        dans nos opérations commerciales.
                    </li>
                </ul>
            </article>

            <article className="content">
                <h2>Sécurité des informations</h2>
                <p>
                    Nous mettons en œuvre des mesures de sécurité appropriées
                    pour protéger vos informations contre tout accès non
                    autorisé, toute modification, divulgation ou destruction de
                    vos données personnelles.
                </p>
            </article>

            <article className="content">
                <h2>Vos droits</h2>
                <p>Vous avez le droit de :</p>
                <ul>
                    <li>
                        Accéder à vos informations personnelles que nous
                        détenons.
                    </li>
                    <li>
                        Demander la correction de toute information inexacte.
                    </li>
                    <li>
                        Demander la suppression de vos informations
                        personnelles.
                    </li>
                    <li>
                        Opposer au traitement de vos informations personnelles.
                    </li>
                </ul>
            </article>

            <article className="content">
                <h2>Cookies</h2>
                <p>
                    Nous utilisons des cookies pour améliorer votre expérience
                    sur notre site. Vous pouvez configurer votre navigateur pour
                    refuser les cookies ou pour vous avertir lorsqu'ils sont
                    utilisés.
                </p>
            </article>
            <article className="content">
                <h2>Modifications de cette politique</h2>
                <p>
                    Nous nous réservons le droit de modifier cette politique de
                    confidentialité à tout moment. Toute modification sera
                    publiée sur cette page. En continuant d'utiliser le site
                    après la publication des modifications, vous acceptez les
                    nouvelles conditions.
                </p>
            </article>
            <article className="content">
                <h2>Contact</h2>
                <p>
                    Si vous avez des questions concernant cette politique de
                    confidentialité, veuillez nous contacter à l'adresse
                    suivante : [adresse e-mail de contact].
                </p>
            </article>
            <p>Merci d'utiliser notre site d'offre d'emploi.</p>
        </section>
    );
};

export default Politiques;

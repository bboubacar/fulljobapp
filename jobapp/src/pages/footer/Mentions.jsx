import React from "react";
import { openNewWin } from "../../utilities/functions";
import { menuPaths } from "../../utilities/constantes";
import usePageTitle from "../../hooks/usePageTitle";

const Mentions = () => {
    usePageTitle("Mentions légales");
    return (
        <section className="mentions">
            <h1>Mentions Légales</h1>
            <article className="content">
                <h2>Informations légales</h2>
                <p>Le présent site est édité par :</p>
                <p>
                    <strong>Nom de l'entreprise :</strong> Emploi idéal
                    <strong>Forme juridique :</strong> SARL
                    <strong>Capital social :</strong> 0€47 BD AUVERGNE, 16000
                    Angoulême
                    <strong>RCS :</strong> Angoulême
                    <strong>Numéro de TVA intracommunautaire :</strong> 0000
                    <strong>Email :</strong> bboubacarfr@gmail.com
                    <strong>Téléphone :</strong> 07 44 17 51 19
                </p>
            </article>

            <article className="content">
                <h2>Directeur de publication</h2>
                <p>BALDE Boubacar</p>
            </article>

            <article className="content">
                <h2>Hébergeurs</h2>
                <p>
                    <strong>Nom des hébergeurs :</strong>
                    <a href="https://www.alwaysdata.com/en/">Alwaysdata</a>
                    {" et "}
                    <a href="https://www.netlify.com/">Netlify</a>
                </p>
            </article>

            <article className="content">
                <h2>Propriété intellectuelle</h2>
                <p>
                    Le contenu du site, incluant, de façon non limitative, les
                    textes, images, graphismes, logo, icônes, sons, logiciels,
                    etc., est la propriété de <strong>Emploi idéal</strong> ou
                    de ses partenaires et est protégé par les lois en vigueur au
                    titre de la propriété intellectuelle.
                </p>
                <p>
                    Toute reproduction, représentation, modification,
                    publication, adaptation de tout ou partie des éléments du
                    site, quel que soit le moyen ou le procédé utilisé, est
                    interdite, sauf autorisation écrite préalable de
                    <strong> Emploi idéal</strong>.
                </p>
            </article>

            <article className="content">
                <h2>Données personnelles</h2>
                <p>
                    Conformément à la loi "Informatique et Libertés" du 6
                    janvier 1978 modifiée, et au Règlement Général sur la
                    Protection des Données{" "}
                    <a
                        href="https://www.cnil.fr/fr/reglement-europeen-protection-donnees"
                        target="_blank"
                    >
                        RGPD
                    </a>
                    , vous disposez d’un droit d’accès, de rectification, de
                    portabilité et de suppression des données vous concernant.
                    Vous pouvez exercer ces droits en vous adressant à{" "}
                    <strong>Emploi idéal</strong>, à l'adresse suivante :
                    bboubacarfr@gmail.com.
                </p>
                <p>
                    Pour plus d'informations sur notre politique de
                    confidentialité, veuillez consulter notre page dédiée{" "}
                    <a
                        href=""
                        onClick={() => {
                            openNewWin(menuPaths.politiques);
                        }}
                    >
                        Politique de confidentialité
                    </a>
                </p>
            </article>
        </section>
    );
};

export default Mentions;

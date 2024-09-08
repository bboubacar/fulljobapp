import React from "react";
import { ImSpinner9 } from "react-icons/im";
import useOffreDetails from "../../hooks/useOffreDetails";
import { routes } from "../../utilities/db_infos";
import Image from "../../components/Image";
import { formatDate } from "../../utilities/functions";

const Details = () => {
    const { isLoading, already, postuler, handleChange, offre } =
        useOffreDetails();
    const convertDatePub = formatDate(offre?.date_pub);
    const convertDateExp = formatDate(offre?.date_exp);

    return (
        <div className="offre-details">
            {already && (
                <div className="already">
                    Vous avez dejà postuler à cette offre
                </div>
            )}
            <Image data={offre} resizedImg={null} attrImg="logo" />
            <div className="titre"> {offre?.titre}</div>
            <span>
                <strong>Entreprise : </strong> {offre?.nom}
            </span>
            <span>
                <strong>Lieu : </strong> {offre?.commune}
            </span>
            <span>
                <strong>Date publication: </strong> {convertDatePub}
            </span>
            <span>
                <strong>Date d'expiration: </strong> {convertDateExp}
            </span>
            <span>
                <strong>Type de contrat: </strong> {offre?.type}
            </span>
            <span>
                <strong>Salaire: </strong> {offre?.salaire_min}
                {offre?.salaire_max !== null ? " - " : ""}
                {offre?.salaire_max}
            </span>
            <div className="description">{offre?.description}</div>
            <form>
                <label htmlFor="message">Ecrire un message (Optionnel)</label>
                <textarea
                    onChange={handleChange}
                    name="message"
                    id="message"
                    cols="30"
                    rows="10"
                ></textarea>
            </form>
            <div
                className="postuler-btn"
                aria-label="Postuer"
                onClick={postuler}
            >
                <span>Postuler</span>
            </div>
            {isLoading ? (
                <div className="loading-container">
                    <ImSpinner9 />
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default Details;

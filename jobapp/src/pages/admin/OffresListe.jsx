import React from "react";
import { v4 as uuidv4 } from "uuid";
import Btns from "../../components/Btns";
import { routes } from "../../utilities/db_infos";
import { notifSms } from "../../utilities/constantes";

const OffresListe = ({ offres, validInvalid }) => {
    const valider = async (option) => {
        const data = { id_offres_demploi: option.id_offres_demploi };
        validInvalid(
            data,
            routes.offres,
            routes.valid,
            notifSms.valid,
            notifSms.validFail
        );
    };

    const invalider = (option) => {
        const data = { id_offres_demploi: option.id_offres_demploi };
        validInvalid(
            data,
            routes.offres,
            routes.invalid,
            notifSms.invalid,
            notifSms.invalidFail
        );
    };

    return (
        <div className="items">
            {offres?.map((offre) => (
                <div className="item" key={uuidv4()}>
                    <div className="titre">{offre?.titre}</div>
                    <div>
                        <strong>Publier par : </strong> {offre.prenom}{" "}
                        {offre?.nom}
                    </div>
                    <div>
                        <strong>Entreprise : </strong> {offre?.entreprise}
                    </div>
                    <div>
                        <strong>Lieu : </strong> {offre?.commune}
                    </div>
                    <div>
                        <strong>Publier le: </strong> {offre?.date_pub}
                    </div>
                    <div>
                        <strong>Expire le: </strong> {offre?.date_exp}
                    </div>
                    <Btns
                        data={offre}
                        validFunc={valider}
                        rejFunc={invalider}
                        validLabel="Valider"
                        rejLabel="Invalider"
                        popupText="L'invalidation de l'offre"
                    />
                </div>
            ))}
        </div>
    );
};

export default OffresListe;

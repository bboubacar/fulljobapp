import React from "react";
import { dashboardName, notifSms } from "../../utilities/constantes";
import { routes } from "../../utilities/db_infos";
import {
    formatDate,
    openOffreDetails,
    returnUpdateId,
} from "../../utilities/functions";
import Btns from "../../components/Btns";

const Candidatures = ({ content, validInvalid }) => {
    const convertDateEnv = formatDate(content?.date_denvoi);
    const annuler = async (data) => {
        const id = returnUpdateId(dashboardName.candidatures, data);
        validInvalid(
            id,
            routes.candidatures,
            routes.update,
            notifSms.cancel,
            notifSms.failCancel
        );
    };
    return (
        <div className="candidature item">
            <div className="details">
                <p className="titreGras">{content?.titre}</p>
                <p>
                    {content?.nom}
                    {content?.commune ? " - " + content?.commune : ""}
                </p>
                <p>Status: {content?.label}</p>
                <p>Date d'envoi: {convertDateEnv}</p>
            </div>
            <Btns
                data={content}
                validFunc={(ev) => openOffreDetails(content)}
                rejFunc={() => annuler(content)}
                validLabel="Details"
                rejLabel="Annulée"
                popupText="l'annulation la candidature"
            />
        </div>
    );
};

export default Candidatures;

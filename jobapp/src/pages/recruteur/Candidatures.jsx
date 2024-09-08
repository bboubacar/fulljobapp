import React from "react";
import { ImSpinner9 } from "react-icons/im";
import { v4 as uuidv4 } from "uuid";
import useCandidatures from "../../hooks/useCandidatures";
import { formatDate, openParcours } from "../../utilities/functions";
import Btns from "../../components/Btns";

const Candidatures = ({ offre, toggleOffres }) => {
    const { rejeter, toggleOff, rejLoading, offreLoading, candidatures } =
        useCandidatures(toggleOffres);
    return (
        <div className="candidatures">
            <label onClick={(ev) => toggleOff(offre)}>
                <input
                    value={offre.isOpen}
                    type="radio"
                    name="openOffre"
                    id="openOffre"
                />
                {offre.titre}
            </label>
            <div
                className={
                    offre?.isOpen
                        ? "candidature items open-candidature"
                        : "candidature items"
                }
            >
                {!offreLoading ? (
                    candidatures?.length > 0 ? (
                        candidatures?.map((cand) => (
                            <div className="item" key={uuidv4()}>
                                <h2>
                                    {cand?.prenom} {cand.nom}
                                </h2>
                                <div>{cand?.profession}</div>
                                <div className="date">
                                    Date d'envoi:{" "}
                                    {formatDate(cand?.date_denvoi)}
                                </div>
                                <div className="">
                                    <div
                                        onClick={(ev) => openParcours(cand)}
                                        className="parcours"
                                    >
                                        Parcours
                                    </div>
                                    <Btns
                                        data={cand}
                                        validFunc={() => {}}
                                        rejFunc={() => rejeter(cand)}
                                        validLabel="Contacter"
                                        rejLabel="Rejetée"
                                        popupText="le rejet de la candidature"
                                    />
                                </div>
                                {rejLoading ? (
                                    <div className="loading-container">
                                        <ImSpinner9 />
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="aucune-candidature">
                            Aucune candidature pour l'instant
                        </div>
                    )
                ) : (
                    <ImSpinner9 />
                )}
            </div>
        </div>
    );
};

export default Candidatures;

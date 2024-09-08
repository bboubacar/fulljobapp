import React from "react";
import EditDeleteItem from "../../components/EditDeleteItem";
import { formatDate } from "../../utilities/functions";

const Formations = ({ content, openEdit, onDelete }) => {
    const convertDateDeb = formatDate(content?.date_deb);
    const convertDateFin = formatDate(content?.date_fin);
    return (
        <div className="formation item">
            <EditDeleteItem
                openEdit={openEdit}
                onDelete={onDelete}
                content={content}
                text="La suppression de la formation"
            />
            <div className="details">
                <span>
                    <span className="titreGras">
                        {convertDateDeb} - {convertDateFin} :{" "}
                    </span>
                    <span className="institut">
                        A l'institut <strong>{content.institut}</strong>
                    </span>
                </span>
                <span className="infos">
                    {" "}
                    <strong>{content.titre}</strong>, {content.details}
                </span>
            </div>
        </div>
    );
};

export default Formations;

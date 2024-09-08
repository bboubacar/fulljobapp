import React from "react";
import EditDeleteItem from "../../components/EditDeleteItem";
import { formatDate } from "../../utilities/functions";

const Experiences = ({ content, openEdit, onDelete }) => {
    const convertDateDeb = formatDate(content?.date_deb);
    const convertDateFin = formatDate(content?.date_fin);
    return (
        <div className="experience item">
            <EditDeleteItem
                openEdit={openEdit}
                onDelete={onDelete}
                content={content}
                text="La suppression de l'experience"
            />
            <div className="details">
                <span>
                    <span className="titreGras">
                        {convertDateDeb} - {convertDateFin} :{" "}
                    </span>
                    <span className="company">
                        Chez <strong>{content.entreprise}</strong>
                    </span>
                </span>
                <span className="infos">
                    <strong>{content.titre}</strong>, {content.details}
                </span>
            </div>
        </div>
    );
};

export default Experiences;

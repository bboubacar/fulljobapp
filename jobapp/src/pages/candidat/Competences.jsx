import React from "react";
import EditDeleteItem from "../../components/EditDeleteItem";

const Competences = ({ content, openEdit, onDelete }) => {
    return (
        <div className="competence item">
            <EditDeleteItem
                openEdit={openEdit}
                onDelete={onDelete}
                content={content}
                text="La suppression de la compétence"
            />
            <div className="details">
                <span className="titreGras">{content.nom} : </span>
                <span>{content.details}</span>
            </div>
        </div>
    );
};

export default Competences;

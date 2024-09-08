import React from "react";
import { ImSpinner9 } from "react-icons/im";
import { FiEdit3 } from "react-icons/fi";
import useEntreprise from "../../hooks/useEntreprise";
import { userValide } from "../../utilities/constantes";
import { routes } from "../../utilities/db_infos";

const Entreprise = ({ userStatut, getUserStatuts }) => {
    const {
        closeEdit,
        openEdit,
        handleSubmit,
        entrepriseChange,
        selectEntreprise,
        isSelOpen,
        selected,
        entreprise,
        entreprises,
        isLoading,
        isOnEdit,
    } = useEntreprise(userStatut, getUserStatuts);
    return (
        <div className="entreprise">
            {!isOnEdit && userStatut?.valid === userValide.valid && (
                <>
                    <img
                        src={
                            entreprise?.logo
                                ? routes.based_url + entreprise?.logo
                                : "/images/logo-entreprise.png"
                        }
                        alt="logo entreprise"
                        height="50"
                        width="50"
                    />

                    <div className="apropos">
                        <div className="nom">{entreprise?.nom}</div>
                        <div className="domaine">{entreprise?.domaine}</div>
                    </div>
                </>
            )}

            {isOnEdit || !userStatut ? (
                <div className="add-entreprise">
                    <div className="title">
                        Choisissez votre entreprise pour acceder aux services
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="select-options">
                            <label htmlFor="select-options">
                                Nom de l'entrprise
                            </label>
                            <div
                                className="select"
                                onClick={selectEntreprise}
                                id="select-options"
                            >
                                {selected ? selected.nom : "selectionnez"}
                            </div>
                            <div
                                className={
                                    isSelOpen
                                        ? "select-container open-options"
                                        : "select-container"
                                }
                            >
                                {entreprises?.map((curr, idx) =>
                                    selected?.nom !== curr.nom ? (
                                        <span
                                            className="option"
                                            key={curr.nom + idx}
                                            onClick={(event) =>
                                                entrepriseChange(event, curr)
                                            }
                                        >
                                            {curr.nom}
                                        </span>
                                    ) : (
                                        ""
                                    )
                                )}
                            </div>
                        </div>
                        <div className="submit-btns">
                            <input type="submit" value="Soumettre" />
                            {isOnEdit && (
                                <div className="cancel" onClick={closeEdit}>
                                    Annuler
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            ) : (
                ""
            )}

            {!isOnEdit && userStatut?.valid === userValide.attente && (
                <Validation />
            )}

            {isLoading && (
                <div className="loading-container">
                    <ImSpinner9 />
                </div>
            )}

            {userStatut && !isOnEdit && (
                <div className="edit-btns">
                    <FiEdit3 onClick={openEdit} />
                </div>
            )}
        </div>
    );
};

function Validation() {
    return (
        <div className="enattente">
            Patientez pour la validation de votre compte
        </div>
    );
}

export default Entreprise;

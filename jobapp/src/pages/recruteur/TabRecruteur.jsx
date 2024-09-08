import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useHandleForm from "../../hooks/useHandleForm";
import { recruteurDashboardName } from "../../utilities/constantes";
import AddSaveBtn from "../../components/AddSaveBtn";
import useSelect from "../../hooks/useSelect";
import Offres from "./Offres";
import AddInput from "../../components/AddInput";
import { ImSpinner9 } from "react-icons/im";
import Candidatures from "./Candidatures";
import Rechercher from "./Rechercher";

const TabRecruteur = ({
    dashContent,
    updateState,
    pageLoading,
    activeTab,
    contrats,
    offres,
    toggleOffres,
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const {
        selected,
        isListOpen,
        toggleDropdown,
        selectedChange,
        setSelected,
    } = useSelect();

    // Ici on met à jour le contrat selectionnez si on est en mode modification de l'offre
    const updataSelect = (data) => {
        setSelected(null);
        if (data) {
            contrats?.map((contrat) => {
                if (contrat?.id_types_decontrat === data?.id_types_decontrat) {
                    setSelected(contrat);
                }
            });
        }
    };

    let requiredFields = ["titre", "description"];
    const {
        handleSub,
        handleChange,
        cancel,
        openEdit,
        openAdd,
        modifData,
        setModifData,
        isOnAdd,
        sms,
        onDelete,
    } = useHandleForm(
        requiredFields,
        setIsLoading,
        updateState,
        dashContent?.name,
        updataSelect
    );

    useEffect(() => {
        // A chaque fois que selected change de valeur alors on met à jour le state
        if (selected) {
            setModifData((prev) => ({
                ...prev,
                id_types_decontrat: selected?.id_types_decontrat,
            }));
        }
    }, [selected]);

    return (
        <div className="tabs-contents">
            {dashContent?.name === recruteurDashboardName.offres && (
                <AddSaveBtn
                    isOnAdd={isOnAdd}
                    cancel={cancel}
                    onSubmit={handleSub}
                    openAdd={openAdd}
                />
            )}
            <div className={"content-" + dashContent.name + " active-content"}>
                {pageLoading && activeTab === 0 ? (
                    "Loading..."
                ) : dashContent?.name === recruteurDashboardName.offres ? (
                    <>
                        <AddOffre
                            isOnOpen={isOnAdd}
                            handleChange={handleChange}
                            sms={sms}
                            data={modifData}
                            contratComp={
                                <EditContrat
                                    selectedCon={selected}
                                    contrats={contrats}
                                    contratChange={selectedChange}
                                    selectContrat={toggleDropdown}
                                    isSelOpen={isListOpen}
                                />
                            }
                        />
                        {dashContent?.contents.map((content, idx) => (
                            <Offres
                                key={uuidv4()}
                                content={content}
                                openEdit={openEdit}
                                onDelete={onDelete}
                            />
                        ))}
                    </>
                ) : dashContent?.name ===
                  recruteurDashboardName.candidatsOffre ? (
                    offres?.map((offre) => (
                        <Candidatures
                            key={uuidv4()}
                            offre={offre}
                            toggleOffres={toggleOffres}
                        />
                    ))
                ) : (
                    ""
                )}
                {dashContent?.name !== recruteurDashboardName.rechercher &&
                    dashContent?.contents?.length <= 0 &&
                    offres?.length <= 0 &&
                    !pageLoading &&
                    "Pas de contenu"}
                {dashContent?.name === recruteurDashboardName.rechercher &&
                activeTab != 0 ? (
                    <Rechercher />
                ) : (
                    ""
                )}
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

const AddOffre = ({ isOnOpen, handleChange, data, sms, contratComp }) => {
    return (
        <div className={isOnOpen ? "add-dash-form open-form" : "add-dash-form"}>
            <AddInput
                label="Titre"
                name="titre"
                value={data?.titre ? data?.titre : ""}
                sms={sms}
                onChange={handleChange}
            />
            {contratComp}
            <AddInput
                label="Salaire minimum"
                type="number"
                name="salaire_min"
                value={data?.salaire_min ? data?.salaire_min : ""}
                onChange={handleChange}
            />
            <AddInput
                label="Salaire maximum"
                type="number"
                name="salaire_max"
                value={data?.salaire_max ? data?.salaire_max : ""}
                onChange={handleChange}
            />
            <AddInput
                label="Date d'expiration"
                value={data?.date_exp ? data?.date_exp : ""}
                name="date_exp"
                type="date"
                onChange={handleChange}
            />
            <label htmlFor="description">
                Description
                <div>{sms["description"]}</div>
                <textarea
                    rows="5"
                    name="description"
                    value={data?.description ? data?.description : ""}
                    id="description"
                    onChange={handleChange}
                ></textarea>
            </label>
        </div>
    );
};

const EditContrat = ({
    selectedCon,
    contrats,
    contratChange,
    selectContrat,
    isSelOpen,
}) => {
    return (
        <div className="select-options">
            <label htmlFor="select-options">Type de contrat</label>
            <div className="select" onClick={selectContrat} id="select-options">
                {selectedCon ? selectedCon.type : "selectionnez"}
            </div>
            <div
                className={
                    isSelOpen
                        ? "select-container open-options"
                        : "select-container"
                }
            >
                {contrats?.map((cont, idx) =>
                    selectedCon?.type !== cont.type ? (
                        <span
                            className="option"
                            key={cont.type + idx}
                            onClick={(event) => contratChange(event, cont)}
                        >
                            {cont?.type}
                        </span>
                    ) : (
                        ""
                    )
                )}
            </div>
        </div>
    );
};

export default TabRecruteur;

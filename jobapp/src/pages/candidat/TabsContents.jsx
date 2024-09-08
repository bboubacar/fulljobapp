import React, { useState } from "react";
import { dashboardName } from "../../utilities/constantes";
import Experiences from "./Experiences";
import Competences from "./Competences";
import Formations from "./Formations";
import Candidatures from "./Candidatures";
import { ImSpinner9 } from "react-icons/im";
import { v4 as uuidv4 } from "uuid";
import AddInput from "../../components/AddInput";
import AddSaveBtn from "../../components/AddSaveBtn";
import useHandleForm from "../../hooks/useHandleForm";

const TabsContents = ({ dashContent, updateState, pageLoading }) => {
    const [isLoading, setIsLoading] = useState(false);

    let requiredFields = [];
    switch (dashContent?.name) {
        case dashboardName.formations:
            requiredFields = [
                "institut",
                "details",
                "titre",
                "date_deb",
                "date_fin",
            ];
            break;
        case dashboardName.experiences:
            requiredFields = [
                "titre",
                "details",
                "entreprise",
                "date_deb",
                "date_fin",
            ];
            break;
        case dashboardName.competences:
            requiredFields = ["nom", "details"];
            break;
    }

    const {
        handleSub,
        handleChange,
        cancel,
        openEdit,
        openAdd,
        modifData,
        isOnAdd,
        sms,
        onDelete,
        validInvalid,
    } = useHandleForm(
        requiredFields,
        setIsLoading,
        updateState,
        dashContent?.name
    );

    return (
        <div className="tabs-contents">
            {dashContent?.name !== dashboardName.candidatures && (
                <AddSaveBtn
                    isOnAdd={isOnAdd}
                    cancel={cancel}
                    onSubmit={handleSub}
                    openAdd={openAdd}
                />
            )}
            <div className={"content-" + dashContent?.name + " active-content"}>
                {pageLoading ? (
                    "Loading..."
                ) : dashContent?.name === dashboardName.experiences ? (
                    <>
                        <AddExperience
                            isOnOpen={isOnAdd}
                            handleChange={handleChange}
                            sms={sms}
                            data={modifData}
                        />
                        <div className="items">
                            {dashContent?.contents?.map((content) => (
                                <Experiences
                                    key={uuidv4()}
                                    content={content}
                                    openEdit={openEdit}
                                    onDelete={onDelete}
                                />
                            ))}
                        </div>
                    </>
                ) : dashContent?.name === dashboardName.competences ? (
                    <>
                        <AddCompetence
                            isOnOpen={isOnAdd}
                            handleChange={handleChange}
                            sms={sms}
                            data={modifData}
                        />
                        <div className="items">
                            {dashContent?.contents?.map((content) => (
                                <Competences
                                    key={uuidv4()}
                                    content={content}
                                    openEdit={openEdit}
                                    onDelete={onDelete}
                                />
                            ))}
                        </div>
                    </>
                ) : dashContent?.name === dashboardName.formations ? (
                    <>
                        <AddFormation
                            isOnOpen={isOnAdd}
                            handleChange={handleChange}
                            sms={sms}
                            data={modifData}
                        />
                        <div className="items">
                            {dashContent?.contents?.map((content) => (
                                <Formations
                                    key={uuidv4()}
                                    content={content}
                                    openEdit={openEdit}
                                    onDelete={onDelete}
                                />
                            ))}
                        </div>
                    </>
                ) : dashContent?.name === dashboardName.candidatures ? (
                    <div className="items">
                        {dashContent?.contents?.map((content) => (
                            <Candidatures
                                content={content}
                                validInvalid={validInvalid}
                                key={uuidv4()}
                            />
                        ))}
                    </div>
                ) : (
                    ""
                )}
                {dashContent?.contents?.length <= 0 &&
                    !pageLoading &&
                    "Pas de contenu"}
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

const AddExperience = ({ isOnOpen, handleChange, data, sms }) => {
    return (
        <div className={isOnOpen ? "add-dash-form open-form" : "add-dash-form"}>
            <AddInput
                label="Nom de l'entreprise"
                name="entreprise"
                value={data?.entreprise ? data?.entreprise : ""}
                sms={sms}
                onChange={handleChange}
            />
            <AddInput
                label="Titre du poste"
                sms={sms}
                name="titre"
                value={data?.titre ? data?.titre : ""}
                onChange={handleChange}
            />
            <AddInput
                label="Date de debut"
                sms={sms}
                name="date_deb"
                value={data?.date_deb ? data?.date_deb : ""}
                type="date"
                onChange={handleChange}
            />
            <AddInput
                label="Date de fin"
                sms={sms}
                value={data?.date_fin ? data?.date_fin : ""}
                name="date_fin"
                type="date"
                onChange={handleChange}
            />
            <label htmlFor="details">
                Detais
                <div>{sms["details"]}</div>
                <textarea
                    rows="5"
                    name="details"
                    value={data?.details ? data?.details : ""}
                    id="details"
                    onChange={handleChange}
                ></textarea>
            </label>
        </div>
    );
};

const AddCompetence = ({ isOnOpen, handleChange, data, sms }) => {
    return (
        <div className={isOnOpen ? "add-dash-form open-form" : "add-dash-form"}>
            <AddInput
                label="Nom de la compétence"
                name="nom"
                value={data?.nom ? data?.nom : ""}
                sms={sms}
                onChange={handleChange}
            />
            <label htmlFor="details">
                Detais
                <div>{sms["details"]}</div>
                <textarea
                    rows="5"
                    name="details"
                    value={data?.details ? data?.details : ""}
                    id="details"
                    onChange={handleChange}
                ></textarea>
            </label>
        </div>
    );
};

const AddFormation = ({ isOnOpen, handleChange, data, sms }) => {
    return (
        <div className={isOnOpen ? "add-dash-form open-form" : "add-dash-form"}>
            <AddInput
                label="Nom de l'institut"
                name="institut"
                value={data?.institut ? data?.institut : ""}
                sms={sms}
                onChange={handleChange}
            />
            <AddInput
                label="Titre de la formation"
                sms={sms}
                name="titre"
                value={data?.titre ? data?.titre : ""}
                onChange={handleChange}
            />
            <AddInput
                label="Date de debut"
                sms={sms}
                name="date_deb"
                value={data?.date_deb ? data?.date_deb : ""}
                type="date"
                onChange={handleChange}
            />
            <AddInput
                label="Date de fin"
                sms={sms}
                value={data?.date_fin ? data?.date_fin : ""}
                name="date_fin"
                type="date"
                onChange={handleChange}
            />
            <label htmlFor="details">
                Detais
                <div>{sms["details"]}</div>
                <textarea
                    rows="5"
                    name="details"
                    value={data?.details ? data?.details : ""}
                    id="details"
                    onChange={handleChange}
                ></textarea>
            </label>
        </div>
    );
};

export default TabsContents;

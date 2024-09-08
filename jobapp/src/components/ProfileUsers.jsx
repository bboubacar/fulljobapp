import React from "react";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { FiEdit3 } from "react-icons/fi";
import { CgWebsite } from "react-icons/cg";
import { FiSave } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import { routes, tables } from "../utilities/db_infos";
import { ImSpinner9 } from "react-icons/im";
import useProfile from "../hooks/useProfile";
import EditCommunes from "./EditCommunes";
import Avatar from "./Avatar";

const ProfileUsers = ({ userTable, path }) => {
    const {
        isOnEdit,
        onSave,
        sms,
        modifData,
        handleChange,
        cvNom,
        selectedCom,
        communes,
        communeChange,
        selectCommune,
        isSelOpen,
        isLoading,
        resizedImg,
        onCancel,
        handleFileUpload,
        uploadedCv,
    } = useProfile(userTable, path);
    return (
        <article className="profile">
            {!modifData ? (
                "Loading..."
            ) : (
                <>
                    <div className="edit-dots">
                        {!isOnEdit ? (
                            <FiEdit3 onClick={onSave} />
                        ) : (
                            <>
                                <GrClose onClick={onCancel} />
                                <FiSave onClick={onSave} />
                            </>
                        )}
                    </div>
                    <form>
                        {isOnEdit && (
                            <div className="taille">Taille max (500ko)</div>
                        )}
                        <Avatar
                            sms={sms}
                            userDetails={modifData}
                            resizedImg={resizedImg}
                            isOnEdit={isOnEdit}
                            handleFileUpload={handleFileUpload}
                        />
                        <div className="description">
                            <div className="name">
                                <EditInput
                                    name="prenom"
                                    value={modifData?.prenom}
                                    label="Prénom"
                                    sms={sms}
                                    handleChange={handleChange}
                                    isOnEdit={isOnEdit}
                                />
                                <EditInput
                                    name="nom"
                                    value={modifData?.nom}
                                    label="Nom"
                                    sms={sms}
                                    handleChange={handleChange}
                                    isOnEdit={isOnEdit}
                                />
                            </div>
                            {userTable === tables.representants ? (
                                <div className="responsabilite">
                                    <EditInput
                                        name="responsabilite"
                                        value={modifData?.responsabilite}
                                        label="Responsabilité"
                                        sms={sms}
                                        handleChange={handleChange}
                                        isOnEdit={isOnEdit}
                                    />
                                </div>
                            ) : (
                                <div className="profession">
                                    <EditInput
                                        name="profession"
                                        value={modifData?.profession}
                                        label="Profession"
                                        sms={sms}
                                        handleChange={handleChange}
                                        isOnEdit={isOnEdit}
                                    />
                                </div>
                            )}
                            {userTable === tables.candidats && (
                                <div className="cv">
                                    <div className="titre" htmlFor="cv">
                                        Curriculum vitae
                                        <div className="file-error">
                                            {sms?.cv}
                                        </div>
                                        {isOnEdit && (
                                            <div className="taille">
                                                Taille max (500ko)
                                            </div>
                                        )}
                                        {!isOnEdit ? (
                                            <div className="file">
                                                {cvNom ? (
                                                    <a
                                                        href={
                                                            routes.based_url +
                                                            modifData?.cv
                                                        }
                                                        target="_blank"
                                                        aria-label="Visualiser le cv"
                                                    >
                                                        {cvNom}
                                                    </a>
                                                ) : (
                                                    "Aucun"
                                                )}
                                            </div>
                                        ) : (
                                            <div className="choisir-pdf">
                                                <label
                                                    className="choix"
                                                    htmlFor="cv"
                                                >
                                                    Choisir un fichier pdf
                                                </label>
                                                <div>{uploadedCv?.name}</div>
                                                <input
                                                    type="file"
                                                    name="cv"
                                                    aria-label="cv"
                                                    id="cv"
                                                    accept="application/pdf"
                                                    onChange={handleFileUpload}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="adresse-container">
                            <div className="adresse">
                                {!isOnEdit ? <FiMapPin /> : ""}
                                <div className="content-text">
                                    <EditInput
                                        name="num_rue"
                                        value={modifData?.num_rue}
                                        label="Numéro de rue"
                                        sms={sms}
                                        handleChange={handleChange}
                                        isOnEdit={isOnEdit}
                                    />
                                    <EditInput
                                        name="nom_rue"
                                        value={modifData?.nom_rue}
                                        label="Nom de rue"
                                        sms={sms}
                                        handleChange={handleChange}
                                        isOnEdit={isOnEdit}
                                    />
                                    <EditInput
                                        name="complement"
                                        label="Complement"
                                        value={modifData?.complement}
                                        sms={sms}
                                        handleChange={handleChange}
                                        isOnEdit={isOnEdit}
                                    />
                                    <EditCommunes
                                        selectedCom={selectedCom}
                                        communes={communes}
                                        communeChange={communeChange}
                                        selectCommune={selectCommune}
                                        isOnEdit={isOnEdit}
                                        isSelOpen={isSelOpen}
                                    />
                                </div>
                            </div>
                            <EditInput
                                name="email"
                                value={modifData?.email}
                                label="Email"
                                sms={sms}
                                link={"mailto:" + modifData?.email}
                                handleChange={handleChange}
                                isOnEdit={isOnEdit}
                                icon={<FiMail />}
                            />
                            <EditInput
                                name="num_tel"
                                value={modifData?.num_tel}
                                label="Numéro de téléphone"
                                sms={sms}
                                link={"tel:" + modifData?.num_tel}
                                handleChange={handleChange}
                                isOnEdit={isOnEdit}
                                icon={<FiPhone />}
                            />
                            <EditInput
                                name="site_web"
                                value={modifData?.site_web}
                                label="Site web"
                                sms={sms}
                                link={modifData?.site_web}
                                handleChange={handleChange}
                                isOnEdit={isOnEdit}
                                icon={<CgWebsite />}
                                isTarget={true}
                            />
                        </div>
                    </form>
                    {isLoading ? (
                        <div className="loading-container">
                            <ImSpinner9 />
                        </div>
                    ) : (
                        ""
                    )}
                </>
            )}
        </article>
    );
};

const EditInput = ({
    name,
    value,
    label,
    sms,
    handleChange,
    isOnEdit,
    icon = "",
    link = "",
    isTarget = false,
}) => {
    return (
        <>
            {isOnEdit ? (
                <div>
                    <label htmlFor={name}>{label}</label>
                    <div className="error">{sms[name]}</div>
                    <input
                        type="text"
                        name={name}
                        onChange={handleChange}
                        value={value ? value : ""}
                        id={name}
                    />
                </div>
            ) : link.length > 0 ? (
                <a
                    href={link}
                    className="infos_link"
                    target={isTarget ? "_blank" : "_self"}
                >
                    {icon}

                    <span>{value && value !== "null" ? value : label}</span>
                </a>
            ) : (
                <div>
                    {icon}
                    <span>{value && value !== "null" ? value : label}</span>
                </div>
            )}
        </>
    );
};

export default ProfileUsers;

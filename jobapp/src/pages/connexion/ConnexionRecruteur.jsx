import React from "react";
import Connexion from "./Connexion";
import { menuPaths } from "../../utilities/constantes";
import userConnection from "../../hooks/userConnection";

const ConnexionRecruteur = ({ table }) => {
    const { sms, isLoading, handleChange, handleSubmit } =
        userConnection(table);
    return (
        <Connexion
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            incriptionPath={menuPaths.newRecruteur}
            sms={sms}
            isLoading={isLoading}
        />
    );
};

export default ConnexionRecruteur;

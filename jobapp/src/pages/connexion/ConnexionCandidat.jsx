import React, { useState } from "react";
import Connexion from "./Connexion";
import { menuPaths } from "../../utilities/constantes";
import userConnection from "../../hooks/userConnection";

const ConnexionCandidat = ({ table }) => {
    const { sms, isLoading, handleChange, handleSubmit } =
        userConnection(table);

    return (
        <Connexion
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            incriptionPath={menuPaths.newUser}
            sms={sms}
            isLoading={isLoading}
        />
    );
};

export default ConnexionCandidat;

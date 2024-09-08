import React from "react";
import Connexion from "./Connexion";
import userConnection from "../../hooks/userConnection";

const ConnexionAdmin = ({ table }) => {
    const { sms, isLoading, handleChange, handleSubmit } =
        userConnection(table);

    return (
        <Connexion
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            sms={sms}
            isLoading={isLoading}
        />
    );
};

export default ConnexionAdmin;

import React from "react";
import { Link } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";

const Congratulation = ({ connPath }) => {
    usePageTitle("Félicitations");
    return (
        <article className="creation-success">
            <h1>Félicitations, votre compte a été créé.</h1>
            <Link to={connPath} className="seconnecter-btn">
                Connectez vous
            </Link>
        </article>
    );
};

export default Congratulation;

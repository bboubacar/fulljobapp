import React from "react";
import Accroche from "./Accroche";
import Liste from "./Liste";
import Bulle from "./Bulle";
import usePageTitle from "../../hooks/usePageTitle";

const Home = () => {
    usePageTitle("Accueil");
    return (
        <div className="home">
            <Accroche />
            <Liste />
            <Bulle />
        </div>
    );
};

export default Home;

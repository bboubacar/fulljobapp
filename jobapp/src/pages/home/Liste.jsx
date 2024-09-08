import React from "react";
import { homeListe, menuPaths } from "../../utilities/constantes";
import { useNavigate } from "react-router-dom";

const Liste = () => {
    const navigate = useNavigate();

    const goOffres = () => {
        navigate(menuPaths.offres);
    };
    return (
        <section className="home-liste">
            <h2>Trouvez les options idéales</h2>
            <div className="liste-container">
                {homeListe.map((item) => (
                    <article className="liste-item" key={item.details}>
                        {item.icon}
                        <h3>{item.title}</h3>
                        <p>{item.details}</p>
                        <span onClick={goOffres}>Rechercher</span>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default Liste;

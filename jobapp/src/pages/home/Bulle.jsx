import React from "react";
import { BsInfoCircle } from "react-icons/bs";

const Categories = () => {
    return (
        <section className="home-bulles">
            <article className="bulles">
                <div className="bulle">
                    <BsInfoCircle />
                    <p>
                        En tant que chercheur d'emploi, vous pouvez facilement
                        trouver des offres correspondant à vos attentes,
                        postuler en toute simplicité, suivre l'évolution de
                        votre candidature, et être assuré de recevoir une
                        réponse rapide du recruteur.
                    </p>
                </div>
                <div className="bulle">
                    <BsInfoCircle />
                    <p>
                        En tant que recruteur, vous pouvez facilement publier
                        une offre, examiner les candidatures spécifiques à
                        chaque offre et trouver des candidats qui correspondent
                        à vos attentes.
                    </p>
                </div>
            </article>
        </section>
    );
};

export default Categories;

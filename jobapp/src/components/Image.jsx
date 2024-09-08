import React from "react";
import { routes } from "../utilities/db_infos";

const Image = ({ data, resizedImg, attrImg }) => {
    return (
        <>
            {data?.[attrImg] ? (
                <img
                    src={
                        resizedImg
                            ? resizedImg
                            : routes.based_url + data?.[attrImg]
                    }
                    alt="image"
                />
            ) : (
                <img src="/images/logo-entreprise.png" alt="profil anonyme" />
            )}
        </>
    );
};

export default Image;

import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { axiosRequest } from "../../utilities/functions";
import { methods, routes, tables } from "../../utilities/db_infos";
import { useParams } from "react-router-dom";

class BodyCv extends React.Component {
    render() {
        const userData = this.props?.userData;
        return (
            <div className="cv-builder">
                {userData.length > 0 ? (
                    <>
                        {userData.map((data) =>
                            data.user ? (
                                <User user={data.user} />
                            ) : data.experiences ? (
                                <Experiences experiences={data.experiences} />
                            ) : data.competences ? (
                                <Competences competences={data.competences} />
                            ) : data.formations ? (
                                <Formations formations={data.formations} />
                            ) : (
                                ""
                            )
                        )}
                        <Adresse user={userData[0].user} />
                    </>
                ) : (
                    <div>Pas de candidats correspondant</div>
                )}
            </div>
        );
    }
}

const Adresse = ({ user }) => {
    return (
        <div className="adresse">
            <h2>Adresse</h2>
            <span>
                {user?.num_rue} {user?.nom_rue}, {user?.code_postale}{" "}
                {user?.commune}
                <br />
                <a href={user?.site_web}>{user?.site_web}</a>
            </span>
        </div>
    );
};

const Formations = ({ formations }) => {
    return (
        <div className="formations">
            <h2>Formations</h2>
            {formations.length > 0
                ? formations.map((formation) => (
                      <div>
                          <b>
                              {formation?.date_deb} - {formation?.date_fin}:
                          </b>
                          <span> {formation?.titre} Chez </span>
                          <b>{formation?.institut}</b>
                          <div>{formation?.details}</div>
                      </div>
                  ))
                : "Information non disponible"}
        </div>
    );
};

const Competences = ({ competences }) => {
    return (
        <div className="competences">
            <h2>Compétences</h2>
            {competences.length > 0
                ? competences.map((competence) => (
                      <div>
                          <b>{competence?.nom}: </b>
                          <span>{competence?.details}</span>
                      </div>
                  ))
                : "Information non disponible"}
        </div>
    );
};

const Experiences = ({ experiences }) => {
    return (
        <div className="experiences">
            <h2>Expériences</h2>
            {experiences.length > 0
                ? experiences.map((experience) => (
                      <div>
                          <b>
                              {experience?.date_deb} - {experience?.date_fin}:
                          </b>
                          <span> {experience?.titre} Chez </span>
                          <b>{experience?.entreprise}</b>
                          <div>{experience?.details}</div>
                      </div>
                  ))
                : "Information non disponible"}
        </div>
    );
};

const User = ({ user }) => {
    return (
        <div className="personnal">
            <div className="avatar">
                <img
                    src={
                        user?.avatar
                            ? routes.based_url + user?.avatar
                            : "/images/logo-entreprise.png"
                    }
                    alt="Avatar du candidat"
                />
            </div>
            <div className="details">
                <div>
                    {user?.prenom} {user?.nom.toUpperCase()}
                </div>
                <div>{user?.profession}</div>
                <a href={`mailto:${user?.email}`}> {user?.email} </a>
                <div>{user?.email}</div>
                <a href={`tel:${user?.num_tel}`}>{user?.num_tel}</a>
            </div>
        </div>
    );
};

const Pdf = () => {
    const componentRef = useRef();
    const [userData, setUserData] = useState([]);
    let { id } = useParams();

    useEffect(() => {
        (async () => {
            const data = await axiosRequest(
                methods.get,
                `${routes.users}${routes.buildcv}/${tables.representants}/${id}`,
                {},
                true
            );
            if (data?.data) setUserData(data?.data?.data);
            else window.close();
        })();
    }, []);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className="pdf-builder">
            <BodyCv ref={componentRef} userData={userData} />
            <button onClick={handlePrint}>imprimer</button>
        </div>
    );
};

export default Pdf;

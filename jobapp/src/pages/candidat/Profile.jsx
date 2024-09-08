import React from "react";
import { menuPaths } from "../../utilities/constantes";
import { tables } from "../../utilities/db_infos";
import ProfileUsers from "../../components/ProfileUsers";

const Profile = () => {
    return (
        <ProfileUsers
            userTable={tables.candidats}
            path={menuPaths.connexionCandidat}
        />
    );
};

export default Profile;

import { v4 as uuidv4 } from "uuid";
import { routes } from "../../utilities/db_infos";
import { notifSms } from "../../utilities/constantes";
import Btns from "../../components/Btns";

const Affiliation = ({ users, validInvalid }) => {
    const valider = async (option) => {
        const data = { id_users: option.id_users };
        validInvalid(
            data,
            routes.representants,
            routes.valid,
            notifSms.afiliate,
            notifSms.afiliateFail
        );
    };

    const invalider = async (option) => {
        const data = { id_users: option.id_users };
        validInvalid(
            data,
            routes.representants,
            routes.invalid,
            notifSms.invalidAffiliation,
            notifSms.invalidAffiliationFail
        );
    };

    return (
        <div className="items">
            {users?.map((user) => (
                <div className="item" key={uuidv4()}>
                    <div className="titre">{user?.titre}</div>
                    <div>
                        {user.prenom} {user?.nom}
                    </div>
                    <div>
                        <strong>Entreprise : </strong> {user?.entreprise}
                    </div>
                    <Btns
                        data={user}
                        validFunc={valider}
                        rejFunc={invalider}
                        validLabel="Valider"
                        rejLabel="Invalider"
                        popupText="L'invalidation de l'offre"
                    />
                </div>
            ))}
        </div>
    );
};

export default Affiliation;

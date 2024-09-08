import { useCallback, useState } from "react";
import { methods, routes } from "../utilities/db_infos";
import { axiosRequest } from "../utilities/functions";

const useCommunes = (userTable) => {
    const [selectedCom, setSelectedCom] = useState(null);
    const [communes, setCommunes] = useState([]);
    const [isSelOpen, setIsSelOpen] = useState(false);

    // Recupère la liste des commune de la BD
    const getAllCommunes = useCallback(async () => {
        const data = await axiosRequest(
            methods.get,
            `${routes.communes}${routes.read_all}/${userTable}`,
            {},
            true
        );

        setCommunes(data?.data?.data);
        return data?.data?.data;
    }, []);

    const communeChange = (ev, option) => {
        try {
            setSelectedCom(option);
            setIsSelOpen(false);
        } catch (err) {
            console.log("erreur ", err);
        }
    };

    const selectCommune = () => {
        setIsSelOpen(!isSelOpen);
    };

    return {
        selectCommune,
        communeChange,
        getAllCommunes,
        selectedCom,
        setSelectedCom,
        communes,
        isSelOpen,
    };
};

export default useCommunes;

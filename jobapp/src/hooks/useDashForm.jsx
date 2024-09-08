import { useState } from "react";

export const useDashForm = () => {
    const [expData, setExpData] = useState({});
    const [sms, setSms] = useState({});

    const handleChange = (event) => {
        try {
            const name = event.target.name;
            const value = event.target.value;

            setExpData((prev) => ({
                ...prev,
                [name]: value,
            }));
            if (value === "") {
                setSms((prev) => ({
                    ...prev,
                    [name]: "Ce champ est obligatoire",
                }));
            } else {
                setSms((prev) => ({
                    ...prev,
                    [name]: "",
                }));
            }
        } catch (err) {
            console.log("erreur ", err);
        }
    };

    return { expData, sms, setExpData, setSms, handleChange };
};

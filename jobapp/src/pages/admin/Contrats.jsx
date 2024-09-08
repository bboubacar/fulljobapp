import React from "react";
import { v4 as uuidv4 } from "uuid";
import EditDeleteItem from "../../components/EditDeleteItem";
import AddInput from "../../components/AddInput";
import AddSaveBtn from "../../components/AddSaveBtn";
import useHandleForm from "../../hooks/useHandleForm";

const Contrats = ({ contrats, setIsLoading, updatePageContent, onContent }) => {
    const requiredFields = ["type"];
    const {
        handleSub,
        handleChange,
        cancel,
        openEdit,
        openAdd,
        modifData,
        isOnAdd,
        sms,
        setSms,
        onDelete,
    } = useHandleForm(
        requiredFields,
        setIsLoading,
        updatePageContent,
        onContent
    );
    if (sms?.already) {
        setSms({ type: "Ce type de contrat est déjà enregistré" });
    }
    return (
        <div className="type-contrats">
            <AddSaveBtn
                isOnAdd={isOnAdd}
                cancel={cancel}
                onSubmit={handleSub}
                openAdd={openAdd}
            />
            <AddContrat
                isOnAdd={isOnAdd}
                data={modifData}
                handleChange={handleChange}
                sms={sms}
            />
            <div className="items">
                {contrats?.map((contrat) => (
                    <div className="item" key={uuidv4()}>
                        <EditDeleteItem
                            openEdit={openEdit}
                            onDelete={onDelete}
                            content={contrat}
                            text="La suppression du type de contrat"
                        />
                        <div>
                            <strong>Type de contrat: </strong>
                            {contrat?.type}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const AddContrat = ({ isOnAdd, data, sms, handleChange }) => {
    return (
        <div className={isOnAdd ? "add-dash-form open-form" : "add-dash-form"}>
            <AddInput
                label="Type de contrat"
                name="type"
                value={data?.type ? data?.type : ""}
                sms={sms}
                onChange={handleChange}
            />
        </div>
    );
};

export default Contrats;

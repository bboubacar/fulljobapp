import React from "react";
import { CiWarning } from "react-icons/ci";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { cancelAction, confirmAction } from "../redux/confirmSlice";

const Confirmation = () => {
    const isShow = useSelector((state) => state.confirm?.show);
    const text = useSelector((state) => state.confirm?.text);
    const dispatch = useDispatch();

    if (!isShow) return null;
    return (
        <article className="confirmation">
            <div className="confirm-container">
                <div className="texte">
                    <CiWarning />
                    <h3>Confirmer</h3>
                    {`${text} selectionner`}
                </div>
                <div className="confirm-btns">
                    <div
                        className="confirm"
                        onClick={() => dispatch(confirmAction())}
                    >
                        Confirmer
                    </div>
                    <div
                        className="cancel"
                        onClick={() => dispatch(cancelAction())}
                    >
                        Annuler
                    </div>
                </div>
            </div>
        </article>
    );
};

export default Confirmation;

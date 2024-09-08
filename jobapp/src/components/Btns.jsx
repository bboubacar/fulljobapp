import { useDispatch } from "react-redux";
import { openModal } from "../redux/confirmSlice";

const Btns = ({
    data,
    validFunc,
    rejFunc,
    validLabel,
    rejLabel,
    popupText,
}) => {
    const dispatch = useDispatch();
    return (
        <div className="submit-btns">
            <div onClick={() => validFunc(data)} className="valider">
                {validLabel}
            </div>
            <div
                className="invalider"
                onClick={() =>
                    dispatch(
                        openModal({
                            text: popupText,
                            func: () => rejFunc(data),
                        })
                    )
                }
            >
                {rejLabel}
            </div>
        </div>
    );
};
export default Btns;

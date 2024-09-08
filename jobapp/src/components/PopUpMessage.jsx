import React, { useEffect, useRef, useState } from "react";

const PopUpMessage = () => {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const element = useRef(null);

    useEffect(() => {
        let myTime = null;
        function triggerNotif(e) {
            let detail = e.detail;
            detail = detail;
            setMessage(detail.message);
            setType(detail.type);
            if (myTime) {
                clearTimeout(myTime);
                setShow(false);
            }
            setShow(true);
            myTime = setTimeout(() => {
                setShow(false);
            }, 3000);
        }
        // Listen for the event.
        window.addEventListener("notification", triggerNotif, false);

        return () => {
            clearTimeout(myTime);
            window.removeEventListener("notification", triggerNotif, false);
        };
    }, []);
    return (
        <div
            ref={element}
            className={show ? `popup-sms show-popup ${type}` : `popup-sms`}
        >
            {message}
        </div>
    );
};

export default PopUpMessage;

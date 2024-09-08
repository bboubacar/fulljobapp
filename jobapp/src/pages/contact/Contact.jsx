import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FiMapPin } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { FiPhone } from "react-icons/fi";
import { dispatchNotification, stopLoader } from "../../utilities/functions";
import { notifSms, typeNotif } from "../../utilities/constantes";
import { ImSpinner9 } from "react-icons/im";
import usePageTitle from "../../hooks/usePageTitle";

const mailIdKey = import.meta.env.VITE_EMAILJS_ID_KEY;
const mailServiceKey = import.meta.env.VITE_EMAILJS_SERVICE_KEY;
const mailTemplateKey = import.meta.env.VITE_EMAILJS_TEMPLATE_KEY;
const Contact = () => {
    const form = useRef();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    usePageTitle("Contact");

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const sendEmail = (e) => {
        e.preventDefault();
        setIsLoading(true);
        emailjs
            .sendForm(mailServiceKey, mailTemplateKey, form.current, mailIdKey)
            .then(
                (result) => {
                    stopLoader(setIsLoading, null);
                    dispatchNotification({
                        message: notifSms.smsSend,
                        type: typeNotif.succes,
                    });
                    setName("");
                    setEmail("");
                    setMessage("");
                },
                (error) => {
                    stopLoader(setIsLoading, null);
                    dispatchNotification({
                        message: notifSms.smsFail,
                        type: typeNotif.fail,
                    });
                }
            );
        e.target.reset();
    };
    return (
        <section className="contact">
            <article className="informations">
                <h1>Contact</h1>
                <div className="adresse info">
                    <FiMapPin />
                    <span>
                        France, 16000 Angoulême, <br /> 47 Boulevard d’Auvergne
                    </span>
                </div>
                <a href="mailto:bboubcar@gmail.com" className="email info">
                    <FiMail />
                    <span>bboubcar@gmail.com</span>
                </a>
                <a href="tel:0744175119" className="tel info">
                    <FiPhone />
                    <span>+33 744 17 51 19</span>
                </a>
            </article>
            <form className="form" ref={form} onSubmit={sendEmail}>
                <h2>Envoyer un mail</h2>
                <div className="name input-container">
                    <input
                        value={name}
                        name="user_name"
                        type="text"
                        placeholder="nom"
                        aria-label="Votre nom"
                        onChange={handleNameChange}
                        required
                    />
                </div>
                <div className="email input-container">
                    <input
                        value={email}
                        name="user_email"
                        type="text"
                        placeholder="email"
                        aria-label="Votre adresse mail"
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div className="input-container">
                    <textarea
                        value={message}
                        name="message"
                        cols="30"
                        rows="10"
                        placeholder="message"
                        aria-label="Saisir votre message"
                        onChange={handleMessageChange}
                        required
                    ></textarea>
                </div>
                <input
                    type="submit"
                    value="Envoyer"
                    className="input-container send-btn"
                    aria-label="Envoyer votre mail"
                />
                {isLoading ? (
                    <div className="loading-container">
                        <ImSpinner9 />
                    </div>
                ) : (
                    ""
                )}
            </form>
        </section>
    );
};

export default Contact;

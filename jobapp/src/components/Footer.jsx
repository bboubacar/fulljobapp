import React from "react";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareYoutube } from "react-icons/fa6";
import { openNewWin } from "../utilities/functions";
import { menuPaths } from "../utilities/constantes";

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <div className="metions">
                    <span
                        onClick={() => {
                            openNewWin(menuPaths.conditions);
                        }}
                    >
                        Conditions générales
                    </span>
                    <div className="politique">
                        <span
                            onClick={() => {
                                openNewWin(menuPaths.politiques);
                            }}
                        >
                            Politique de confidentialité
                        </span>
                        <div className="social-media">
                            <FaSquareFacebook />
                            <FaLinkedin />
                            <FaSquareInstagram />
                            <FaSquareXTwitter />
                            <FaSquareYoutube />
                        </div>
                    </div>
                    <span
                        onClick={() => {
                            openNewWin(menuPaths.mentions);
                        }}
                    >
                        Mentions légales
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

import "../App.scss";
import PasswordInput from "./PasswordInput";
import { useUser } from "../context/UserContext";
import { createUser } from "../api";
import { getPasswordStrength } from "../utils";


const UserForm = () => {
    const { t } = useTranslation();
    const { setLoading, increaseStep } = useUser();

    const [passwordErr, setPasswordErr] = useState();

    const usernameRef = useRef();
    const passwordRef = useRef();
    const repeatedPasswordRef = useRef();
    const clueRef = useRef();

    const handleChange = () => {
        const password = passwordRef.current?.value;
        const repeatedPassword = repeatedPasswordRef.current?.value;
        if (!password || !repeatedPassword) {
            setPasswordErr(t("required"));
        } else if (repeatedPassword != password) {
            setPasswordErr(t("noMatch"));
        } else if (getPasswordStrength(password) !== 'strong') {
            setPasswordErr(t("passwordErr"));
        } else {
            setPasswordErr();
        }
    };

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        handleChange();
        if (!passwordErr) {
            const password = passwordRef.current?.value;
            const clue = clueRef.current?.value;
            const username = usernameRef.current.value;
            setLoading(true);
            createUser( { username, password, clue })
                .then((data) => {
                    setTimeout(() => { 
                        setLoading(false);
                        increaseStep();
                    }, 1000); // delay to be able to see the spinner
                    // setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }
    };


    return (
        <form id="userForm" onSubmit={handleSubmit} noValidate>
            <label>Crea tu usuario</label>
            <input ref={usernameRef} placeholder={t('username')} required />
            <span className="error">{t("required")}</span>

            <br/>
            <div className="row2">
                <div>
                    <PasswordInput reference={passwordRef} placeholder={t('password')} onChange={handleChange}/>
                    <span className="error">{passwordErr}</span>
                </div>
                <div>
                    <PasswordInput reference={repeatedPasswordRef} placeholder={t('repeat')} onChange={handleChange}/>
                    <span className="error">{passwordErr}</span>
                </div>
            </div>

            <br/>
            <span>{t('note')}</span>
            <br/>
            <label>{t('clueNote')}</label>
            <input ref={clueRef} placeholder={t('clue')} maxLength={60}/>
            <span className="error">{t('maxLength')}</span>
        </form>
    );

}

export default UserForm;
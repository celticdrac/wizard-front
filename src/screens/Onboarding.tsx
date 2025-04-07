import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

import { useUser } from "../context/UserContext";
import UserForm from "../components/UserForm";
import WheelHubLogo from "../assets/img/Logotipo-Vertical-Verde-Alta.png";
import success from "../assets/img/success.png";
import "../App.scss";

const Onboarding = () => {
    const { step, setAcceptedTerms } = useUser();
    const [checked, setChecked] = useState(false);
    const { t } = useTranslation();
    

    const handleChange = () => {
        const newValue = !checked;
        setChecked(newValue);
        setAcceptedTerms(newValue);
    };

    return (
        <div className='onboarding'>
            {step == 1 && (
                <div>
                    <img className="logo" height={150} src={WheelHubLogo} />
                    <h6>{t('header')}</h6>
                    <p>{t('line0')}</p>
                    <p>{t('line1')}</p>
                    <p>{t('line2')}</p>
                    <div className="terms">
                        <input type="checkbox" className='square-checkbox' onChange={handleChange} checked={checked} />
                        <span>{t('check')}</span>
                    </div>
                </div>
            )}
            {step == 2 && (
                <UserForm/>
            )}
            {step == 3 && (
                <div className="row">
                    <div>
                        <img width={50} src={success}/>
                    </div>
                    <div>
                        <h6>{t('success')}</h6>
                        <p>
                            {t('latin')}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
export default Onboarding;
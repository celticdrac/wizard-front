import React, { useEffect } from "react";
import { useTranslation } from 'react-i18next';

import { useUser } from "../context/UserContext";
import { stepsQty } from "../utils";


const Layout = ({children}) => {
    const { step, acceptedTerms, increaseStep, decreaseStep, loading, reset } = useUser();
    const { t } = useTranslation();

    
    useEffect(() => {
        const positions = ['-130px', '0px', '130px'];
        document.getElementById("arrow").style.setProperty('margin-left', positions[step-1]);
      }, [step]);

    const validateForm = () => {
        const form = document.getElementById('userForm');
        form.classList.add('submitted');
        form.requestSubmit(); //
    }

    const next = () => {
        if (step == 3) {
            reset();
        } else if (step == 2) {
            validateForm();
        } else {
            increaseStep();
        }
    }

    const renderSteps = () => {
        return new Array(stepsQty).fill(0).map((item, index) => {
            const showedNumber = index+1;
            const styleSize = step == showedNumber ? "step-reached" : ""
            const styleColor = step >= showedNumber ? "step-green" : ""
            return (
                <div className={[styleSize, styleColor].join(' ')} key={`step${index}`}>
                    {showedNumber < step ? '✓' : showedNumber}
                </div>
            );
        })
    }

    const percentage = ((step - 1) / (stepsQty - 1)) * 100;

    return (
        <>
            <header>
                <div>
                    <div className="steps-group">
                        {renderSteps()}
                    </div>
                    <div className="steps-progress" style={{width: `${percentage}%`}}></div>
                </div>
                <div className="triangle" id="arrow"></div>
            </header>
            <main>
                {step < 3 && (
                    <>
                        <div className="title">
                            {t("title")}
                        </div>
                        <hr className="header-line"/>
                    </>
                )}
                {children}
            </main>
            <footer>
                <hr/>
                <div>
                    <button onClick={decreaseStep} className={step == 1 ? 'hide' : 'white'}>{t("previous")}</button>
                    <button className={step == 3 ? 'white' : ''} disabled={!acceptedTerms || loading} onClick={next}>
                        {step == 3 ? t("reset") : t("next")}
                        {loading && <img className="loader"/>}
                    </button>
                </div>
            </footer>
        </>
    );

};

export default Layout;
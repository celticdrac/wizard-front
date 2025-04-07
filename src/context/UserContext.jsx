import React, { createContext, useContext, useState } from "react";
import { isValidInStepsRange } from "../utils";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const increaseStep = () => {
    setStep(p => {
      const newValue = p+1;
      if (isValidInStepsRange(newValue)) {
        return newValue
      } else {
        return p;
      }
    });
  }

  const decreaseStep = () => {
    setStep(p => {
      const newValue = p-1;
      if (isValidInStepsRange(newValue)) return newValue
      else return p;
    });
  }

  const reset = () => {
    setAcceptedTerms(false);
    setStep(1);
  }

  return (
    <UserContext.Provider 
        value={{ step, acceptedTerms, increaseStep, decreaseStep, setAcceptedTerms, loading, setLoading, reset }}>
      {children}
    </UserContext.Provider>
  );
};
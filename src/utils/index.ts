export const stepsQty = 3;
export const securePasswordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

export const isValidInStepsRange = (newValue: number) => {
    return !!(newValue > 0 && newValue <= stepsQty);
}

export const getPasswordStrength = (password: string) => {
    if (securePasswordRegex.test(password)) {
      return 'strong';
    } else if (password.length > 5) {
      return 'medium';
    }
    return 'weak';
  };
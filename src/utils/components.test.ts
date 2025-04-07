import { isValidInStepsRange, getPasswordStrength } from "./index";


describe('Steps manipulation range check', () => {
  test('Sending wrong value to isValidInStepsRange', () => {
    expect(isValidInStepsRange(0)).toBe(false);
  });

  test('Sending correct value to isValidInStepsRange', () => {
    expect(isValidInStepsRange(1)).toBe(true);
  });
});

describe('Password strength check fn getPasswordStrength', () => {
  test('Strong password should return "strong"', () => {
    expect(getPasswordStrength('asdWD213!as')).toBe('strong');
  });

  test('Medium password should return "medium"', () => {
    expect(getPasswordStrength('asdWDa')).toBe('medium');
  });

  test('Weak password should return "weak"', () => {
    expect(getPasswordStrength('aaa')).toBe('weak');
  });
});

const minLength = 8;
const lowercaseRegex = /[a-z]/;
const uppercaseRegex = /[A-Z]/;
const digitRegex = /\d/;
const commonPatterns = [
  "password",
  "123456",
  "qwerty",
  "123456789",
  "12345678",
  "12345",
  "1234567",
  "iloveyou",
  "111111",
];

const hasRequiredLength = (password: string): boolean =>
  password.length >= minLength;
const hasLowercaseLetter = (password: string): boolean =>
  lowercaseRegex.test(password);
const hasUppercaseLetter = (password: string): boolean =>
  uppercaseRegex.test(password);
const hasDigit = (password: string): boolean => digitRegex.test(password);

const hasNoCommonPatterns = (password: string): boolean =>
  !commonPatterns.includes(password.toLowerCase());

export const isStrongPassword = (password: string): boolean =>
  hasRequiredLength(password) &&
  hasLowercaseLetter(password) &&
  hasUppercaseLetter(password) &&
  hasDigit(password) &&
  hasNoCommonPatterns(password);

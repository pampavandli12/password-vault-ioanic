import CryptoJS from 'crypto-js';
const SECRETE_KEY = process.env.REACT_APP_SECRETE_KEY as string;
export const encryptPassword = (password: string) => {
  const encryptedPassword = CryptoJS.AES.encrypt(
    password,
    SECRETE_KEY
  ).toString();
  return encryptedPassword;
};
export const descryptPassword = (hashedPassword: string) => {
  // Decrypt
  const bytes = CryptoJS.AES.decrypt(hashedPassword, SECRETE_KEY);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

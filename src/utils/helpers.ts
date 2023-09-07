import CryptoJS from "crypto-js";
export const encrypted = (encrypt_value: string, password: string) => {
  const encrypted = CryptoJS.AES.encrypt(encrypt_value, password).toString();
  return encrypted;
};
export const decrypted = (decrypted_value: string, password: string) => {
  return CryptoJS.AES.decrypt(decrypted_value, password).toString(
    CryptoJS.enc.Utf8
  );
};

export const joinArray = (arr: any[], key?: string) => {
  if (!key) return arr.join(", ");
  return arr.map((obj) => obj[key]).join(", ");
};

export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: any[]): void => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

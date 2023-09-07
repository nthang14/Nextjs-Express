import cookie from "js-cookie";
import { IGenerateWallet } from "~/types/generateWallet";

// Json to string
export const jsonToString = (value: any) => {
  if (typeof value === "string") return value;
  return JSON.stringify(value);
};
//
export const stringToJson = (value: string = "") => {
  if (!value) return;
  return JSON.parse(value);
};

// ===== ACCESS_TOKEN =====
const ACCESS_TOKEN_KEY = "accessToken";

export const saveAccessToken = (accessToken: string) => {
  cookie.set(ACCESS_TOKEN_KEY, accessToken);
};

export const readAccessToken = () => {
  return cookie.get(ACCESS_TOKEN_KEY);
};

// ===== REFRESH ACCESS_TOKEN =====

const REFRESH_TOKEN_KEY = "refreshToken";

export const saveRefreshToken = (refreshToken: string) => {
  cookie.set(REFRESH_TOKEN_KEY, refreshToken);
};

export const readRefreshToken = () => {
  return cookie.get(REFRESH_TOKEN_KEY);
};
// MNEMONIC
const MNEMONIC = "mnemonic_encrypted";
export const saveMnemonic = (mnemonic_encrypted: string) => {
  cookie.set(MNEMONIC, mnemonic_encrypted);
};

export const readMnemonic = () => {
  return cookie.get(MNEMONIC);
};

// address wallet
const ADDRESS_WALLET = "address-wallet";

export const readAddressWallet = () => {
  return cookie.get(ADDRESS_WALLET) || "";
};

export const saveAddressWallet = (address: string) => {
  cookie.set(ADDRESS_WALLET, address);
};

// OTP
const OTP = "otp";
export const saveOTP = (otp: string) => {
  cookie.set(OTP, otp);
};
export const readOTP = () => {
  return cookie.get(OTP);
};

// password
const PASSWORD = "password";
export const savePassword = (password: string) => {
  cookie.set(PASSWORD, password);
};
export const readPassword = () => {
  return cookie.get(PASSWORD);
};

// nonce
const NONCE = "nonce";
export const saveNonce = (nonce: string) => {
  cookie.set(NONCE, nonce);
};
export const readNonce = () => {
  return cookie.get(NONCE);
};

// signature
const SIGNATURE = "signature";
export const saveSignature = (signature: string) => {
  cookie.set(SIGNATURE, signature);
};
export const readSignature = () => {
  return cookie.get(SIGNATURE);
};

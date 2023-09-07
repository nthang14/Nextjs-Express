"use client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
export const fallbackLng = "en";
export const languages = [fallbackLng];
export const defaultNS = "message";
import COMMON_EN from "~/i18n/locales/en/common.json";
import MESSAGE_EN from "~/i18n/locales/en/message.json";

const resources = {
  en: {
    common: COMMON_EN,
    message: MESSAGE_EN,
  },
};
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: resources,
    lng: "en",
    ns: ["common", "message"],
    fallbackLng: fallbackLng,
    defaultNS: "message",
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
    },
    // fallbackNS: "common",
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });
export default i18n;

import { initReactI18next } from "react-i18next";
import i18next from "i18next";
import en from "translations/en/translation.json";

declare module "i18next" {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

const resources = { en: { translation: en } };

// eslint-disable-next-line import/no-named-as-default-member
i18next.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  keySeparator: false,
  nsSeparator: false,
  returnNull: false,
});

export const i18n = i18next;

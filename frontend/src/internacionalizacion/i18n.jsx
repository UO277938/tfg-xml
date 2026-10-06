import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import es from "./idiomas/es";
import en from "./idiomas/en";

const savedLanguage = localStorage.getItem("language") || "en";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      es,
      en
    },
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
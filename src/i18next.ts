import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./translations/en/translation.json";
import pl from "./translations/pl/translation.json";

i18next
  .use(initReactI18next)
  // .use(Backend)
  // .init<FsBackendOptions>({
  .init({
    // backend: {
    //   loadPath: "./translations/{{lng}}/{{ns}}.json",
    //   addPath: "/locales/{{lng}}/{{ns}}.missing.json",
    // },
    debug: true,
    compatibilityJSON: "v3", // <--- add this line
    fallbackLng: "en",
    lng: "pl",
    resources: {
      en: {
        translation: en,
      },
      pl: {
        translation: pl,
      },
    },
  });

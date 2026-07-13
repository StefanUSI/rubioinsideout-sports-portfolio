/**
 * Lightweight i18n context — EN/DE locale switching.
 *
 * Design decisions:
 *  - We deliberately avoided a heavy i18n library (i18next) because the
 *    site only supports two locales and all translations fit in small JSON
 *    files (`src/i18n/en.json`, `src/i18n/de.json`).
 *  - Translation JSON is loaded lazily via dynamic `import()` so the
 *    inactive locale never ends up in the initial bundle.
 *  - The user’s language preference is persisted to localStorage and
 *    restored on subsequent visits.
 *  - The `t(key)` function supports dot-notation traversal (e.g.
 *    "skiing.headingA") and returns the raw key as a fallback when a
 *    translation is missing — making untranslated strings obvious in the UI.
 */
import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "EN" | "DE";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface TranslationObject {
  [key: string]: string | TranslationObject;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language") as Language;
    return saved || "EN";
  });
  const [messages, setMessages] = useState<TranslationObject>({});

  useEffect(() => {
    import(`../i18n/${language.toLowerCase()}.json`)
      .then((data) => setMessages(data.default));
  }, [language]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: string | TranslationObject = messages;
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    return typeof value === "string" ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

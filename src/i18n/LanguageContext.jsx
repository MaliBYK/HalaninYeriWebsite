import { useEffect, useState } from 'react';
import { LanguageContext } from './context';
import tr from './locales/tr.json';
import en from './locales/en.json';
import ru from './locales/ru.json';

const translations = { tr, en, ru };

function getInitialLanguage() {
  const stored = localStorage.getItem('language');
  return translations[stored] ? stored : 'tr';
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (path) => {
    const value = path
      .split('.')
      .reduce((acc, key) => (acc != null ? acc[key] : undefined), translations[language]);
    return value ?? path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

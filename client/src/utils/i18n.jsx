import { createContext, useContext, useState } from 'react';

const translations = {
    en: {
        welcome: 'Welcome to PravasiSetu',
        login: 'Login',
        register: 'Register',
        logout: 'Logout',
        worker: 'Worker',
        employer: 'Employer',
        officer: 'Officer',
    },
    hi: {
        welcome: 'प्रवासी सेतु में आपका स्वागत है',
        login: 'लॉग इन करें',
        register: 'पंजीकरण करें',
        logout: 'लॉग आउट',
        worker: 'श्रमिक',
        employer: 'नियोक्ता',
        officer: 'अधिकारी',
    },
    ta: {
        welcome: 'பிரவாசி சேதுக்கு வரவேற்கிறோம்',
        login: 'உள்நுழைய',
        register: 'பதிவு செய்',
        logout: 'வெளியேறு',
        worker: 'தொழிலாளி',
        employer: 'வேலை அளிப்பவர்',
        officer: 'அதிகாரி',
    }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);

import React, { useEffect, useState } from "react";
import { Trans, useTranslation } from 'react-i18next';
import "./Navbar.css";

const Navbar: React.FC = () => {
  const { i18n } = useTranslation();

  const [languages, setLanguages] = useState([
    { code: 'en', label: 'English', localLabel: 'English' },
  ]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;

    const loadLanguages = async () => {
      const langs = await i18n.services.backendConnector.backend.getLanguages();
      if (!langs?.length) return;
      setLoaded(true);
      setLanguages(langs);
    }

    loadLanguages();
  }, [loaded, i18n])

  const changeLanguage = (e: any) => {
    i18n.changeLanguage(e.target.value);
  }

  return (
    <nav>
      <img
        src="https://i.postimg.cc/gjzjBz1h/location-map.png"
        className="logo"
        alt="logo"
      />
      <h1><Trans i18nKey="landmarks">landmarks</Trans></h1>
      <select value={i18n.language} onChange={changeLanguage}>
        {languages.map(lang => (<option key={lang.code} value={lang.code}>{lang.localLabel || lang.label}</option>))}
      </select>
    </nav>
  );
};

export default Navbar;

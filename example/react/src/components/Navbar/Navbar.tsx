import React from "react";
import { Trans, useTranslation } from 'react-i18next';
import "./Navbar.css";

const Navbar: React.FC = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Spanish' },
    { code: 'uk', label: 'Ukrainian' },
    { code: 'ja', label: 'Japanese' },
  ]

  const changeLanguage = (e: any) => {
    i18n.changeLanguage(e.target.value);
  }

  return (
    <nav>
      <img
        src="https://cdn.icon-icons.com/icons2/2073/PNG/512/location_map_twitter_icon_127126.png"
        className="logo"
        alt="logo"
      />
      <h1><Trans i18nKey="landmarks">landmarks</Trans></h1>
      <select onChange={changeLanguage}>
        {languages.map(lang => (<option key={lang.code} value={lang.code}>{lang.label}</option>))}
      </select>
    </nav>
  );
};

export default Navbar;

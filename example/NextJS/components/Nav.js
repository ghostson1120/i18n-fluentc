import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import navStyles from '../styles/Nav.module.css'

const Nav = () => {
  const { t, i18n } = useTranslation()
  const [languages, setLanguages] = useState([
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Spanish' },
    { code: 'uk', label: 'Ukrainian' },
    { code: 'ja', label: 'Japanese' },
  ]);
  const [loaded, setLoaded] = useState(false);

  useEffect(async () => {
    if (loaded) return;
    let langs = [];
    const backend = i18n.services.backendConnector.backend;
    if (backend.getLanguages) {
      langs = await backend.getLanguages();
    } else if (backend.backends[1].getLanguages) {
      langs = await backend.backends[1].getLanguages();
    }
    setLanguages(langs);
    setLoaded(true);
  }, [i18n])

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  }

  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href='/'>{t('home')}</Link>
        </li>
        <li>
          <select onChange={changeLanguage}>
            {languages.map(lang => (<option key={lang.code} value={lang.code}>{lang.localLabel}</option>))}
          </select>
        </li>
      </ul>
    </nav>
  )
}

export default Nav

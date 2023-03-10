import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import navStyles from '../styles/Nav.module.css'

const Nav = () => {
  const { t, i18n } = useTranslation()
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Spanish' },
    { code: 'uk', label: 'Ukrainian' },
    { code: 'ja', label: 'Japanese' },
  ]

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
            {languages.map(lang => (<option key={lang.code} value={lang.code}>{lang.label}</option>))}
          </select>
        </li>
      </ul>
    </nav>
  )
}

export default Nav

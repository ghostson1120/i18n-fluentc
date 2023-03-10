import headerStyles from '../styles/Header.module.css'
import { useTranslation } from 'next-i18next'

const Header = () => {
  const { t } = useTranslation()

  return (
    <div>
      <h1 className={headerStyles.title}>
        <span>Fluentc</span>
      </h1>
      <p className={headerStyles.description}>
        {t('company-description')}
      </p>
    </div>
  )
}

export default Header

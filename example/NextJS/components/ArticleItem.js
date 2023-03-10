import Link from 'next/link'
import articleStyles from '../styles/Article.module.css'
import { useTranslation } from 'next-i18next'

const ArticleItem = ({ article }) => {
  const { t } = useTranslation()

  return (
    <Link href={`/article/${article.id}`}>
      <a className={articleStyles.card}>
        <h3>{t('article-title-' + article.id)} &rarr;</h3>
        <p>{t('article-body-' + article.id).substring(0, 100) + '...'}</p>
      </a>
    </Link>
  )
}

export default ArticleItem

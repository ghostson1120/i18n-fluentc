import { articles } from '../../../data'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Meta from '../../../components/Meta'
import { useTranslation } from 'next-i18next'

const article = ({ article }) => {
  const { t } = useTranslation();
  // const router = useRouter()
  // const { id } = router.query

  return (
    <div>
      <Meta title={t('article-title-' + article.id)} description={article.excerpt} />
      <h1>{t('article-title-' + article.id)}</h1>
      <p style={{whiteSpace: 'break-spaces'}}>{t('article-body-' + article.id)}</p>
      <br />
      <Link href='/'>{t('go-back')}</Link>
    </div>
  )
}

export const getStaticProps = async (context) => {
  const filtered = articles.filter(article => article.id === context.params.id);
  if (!filtered.length) return { props: { article: {} } };

  return {
    props: {
      article: filtered[0],
    },
  }
}

export const getStaticPaths = async () => {
  const ids = articles.map((article) => article.id)
  const paths = ids.map((id) => ({ params: { id: id.toString() } }))

  return {
    paths,
    fallback: false,
  }
}

// export const getStaticProps = async (context) => {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
//   )

//   const article = await res.json()

//   return {
//     props: {
//       article,
//     },
//   }
// }

// export const getStaticPaths = async () => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)

//   const articles = await res.json()

//   const ids = articles.map((article) => article.id)
//   const paths = ids.map((id) => ({ params: { id: id.toString() } }))

//   return {
//     paths,
//     fallback: false,
//   }
// }

export default article

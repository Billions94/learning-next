import Link from 'next/link'
import styles from '../styles/Article.module.scss'

export default function ArticleItem({ article }) {
  return (
    <Link href={`/article/${article.id}`}>
        <a className={styles.card}>
            <h3>{article.title} &rarr;</h3>
            <p>{article.body}</p>
        </a>
    </Link>
  )
}

import Link from 'next/link'
import { HomeProp } from '../pages'
import styles from '../styles/Article.module.scss'

export default function ArticleItem({ article }: HomeProp) {
  return (
    <Link href={`/article/${article.id}`}>
        <a className={styles.card}>
            <h3>{article.title} &rarr;</h3>
            <p>{article.description}</p>
        </a>
    </Link>
  )
}

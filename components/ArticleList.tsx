import { Articles } from '../pages'
import styles from '../styles/Article.module.scss'

export default function ArticleList({ articles }) {
  return (
    <div className={styles.article}>
        {articles.map((item: Articles) => (
            <h3 key={item.id}>{item.title}</h3>
        ))}
    </div>
  )
}

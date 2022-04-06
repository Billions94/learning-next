import { Articles } from '../pages'
import ArticleItem from './ArticleItem'
import styles from '../styles/Article.module.scss'

export default function ArticleList({ articles }) {
  return (
    <div className={styles.article}>
        {articles.map((item: Articles) => (
            <ArticleItem key={item.id} article={item} />
        ))}
    </div>
  )
}

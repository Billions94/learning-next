import { Article, HomeProp } from '../pages'
import ArticleItem from './ArticleItem'
import styles from '../styles/Article.module.scss'

export default function ArticleList({ articles }: HomeProp) {
  return (
    <div className={styles.article}>
        {articles.map((item: Article) => (
            <ArticleItem key={item.id} article={item} />
        ))}
    </div>
  )
}

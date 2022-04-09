import { Article, HomeProp } from '../pages'
import ArticleItem from './ArticleItem'
import { darkModeState } from '../atoms'
import { useRecoilValue } from 'recoil'
import styles from '../styles/Article.module.scss'

export default function ArticleList({ articles }: HomeProp) {

    const darkMode = useRecoilValue(darkModeState)
    const check: boolean = darkMode === false

  return (
    <div id={check ? styles.article : styles.articleDark}>
        {articles.map((item: Article) => (
            <ArticleItem key={item.id} article={item} />
        ))}
    </div>
  )
}

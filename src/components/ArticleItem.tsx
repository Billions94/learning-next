import Link from 'next/link'
import { useEffect, useState } from 'react'
import { HomeProp } from '../pages'
import { Storage } from 'aws-amplify'
import styles from '../styles/Article.module.scss'

export default function ArticleItem({ article }: HomeProp) {

  const [media, setMedia] = useState<string | undefined>('')

  useEffect(() => {
    async function getMedia() {
      try {
        const signedUrl = await Storage.get(article.media)
        setMedia(signedUrl)
      } catch (error) {
        console.error('Error downloading media', error)
      }
    }

    getMedia()
  }, [])

  return (
    <Link href={`/article/${article.id}`}>
        <a className={styles.card}>
        <h3>{article.title} &rarr;</h3>
        <img src={media} alt={article.title} width="100%" />
            <p>{article.description}</p>
        </a>
    </Link>
  )
}



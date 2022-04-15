import * as Icon from '../../lib'
import Link from 'next/link'
import { Button, Image } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { HomeProp } from '../pages'
import { Storage } from 'aws-amplify'
import { useRecoilValue } from 'recoil'
import styles from '../styles/Article.module.scss'
import { darkModeState } from '../atoms'

export default function ArticleItem({ article }: HomeProp) {

  const [media, setMedia] = useState<string | undefined>('')
  const darkMode = useRecoilValue(darkModeState)
  const check: boolean = darkMode === false 

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
          <Button className={styles.editBtn}>
            <Image src={check ? Icon.editIcon : Icon.createIconDark} alt='edit-button' width='100%' />
          </Button>
          <h3>{article.title} &rarr;</h3>
          <img src={media} alt={article.title} width="100%" className={styles.img} />
          <p>{article.description}</p>
      </a>
    </Link>
  )
}

 
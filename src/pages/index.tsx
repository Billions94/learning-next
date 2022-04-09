import React from 'react'
import { server } from '../../config'
import { GetStaticProps } from 'next'
import axios from 'axios'
import ArticleList from '../components/ArticleList'
import CreateArticle from '../components/CreateArticle'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../context/AuthContext'

export interface Article {
  userId?: number
  id?: number
  title: string
  body: string
}

export interface HomeProp {
  articles?: Article[]
  article?: Article
  key?: string | number
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data } = await axios.get(`${server}/api/articles`)
    const articles: Article = data

    return {
      props: {
        articles,
      }
    }
  } catch (error) {
    console.error('Error getting articles', error)
  }
}


export default function Home({ articles }: HomeProp) {
  const { user } = useUser()
  const router = useRouter()

  console.log('This is the user', user)

  useEffect(() => {
    if (user === null || undefined) {
      router.push('/signin')
    }
  }, [])
  return (
    <React.Fragment>
      <CreateArticle />
      <ArticleList articles={articles} />
    </React.Fragment>
  )
}

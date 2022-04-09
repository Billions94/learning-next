import React from 'react'
import { server } from '../../config'
import { GetStaticProps } from 'next'
import axios from 'axios'
import ArticleList from '../components/ArticleList'
import CreateArticle from '../components/CreateArticle'

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
  return (
    <React.Fragment>
      <CreateArticle />
      <ArticleList articles={articles} />
    </React.Fragment>
  )
}

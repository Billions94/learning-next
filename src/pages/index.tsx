import React, { useState } from 'react'
import { server } from '../../config'
import { GetStaticProps } from 'next'
import axios from 'axios'
import ArticleList from '../components/ArticleList'
import CreateArticle from '../components/CreateArticle'
import { useEffect } from 'react'
import { useUser } from '../context/AuthContext'
import { Article, ListArticlesQuery } from '../API'
import { API, graphqlOperation } from 'aws-amplify'
import { listArticles } from '../graphql/queries'


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


export default function Home() {

  const { user } = useUser()
  const [article, setArticle] = useState<Article[]>([])
  const [refresh, setRefresh] = useState<boolean>(false)

  console.log('This is the user', user)

  useEffect(() => {
    const fetchData = async (): Promise<Article[]> => {
      try {
        const { data } = (await API.graphql(graphqlOperation(listArticles))) as {
          data: ListArticlesQuery;
          errors: any[];
        }

        const { items } = data.listArticles
        if (items) {
          setArticle(items as Article[])
          return items as Article[]
        } else { throw new Error('Error fetching articles') }
      } catch (error) {
        console.error('Error fetching articles', error)
      }
    }

    fetchData()
  }, [refresh])

  console.log('This is the article', article)

  return (
    <React.Fragment>
      <CreateArticle setRefresh={setRefresh} />
      <ArticleList articles={article} />
    </React.Fragment>
  )
}

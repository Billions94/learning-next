import React, { useState } from 'react'
import ArticleList from '../components/ArticleList'
import { useEffect } from 'react'
// import { useUser } from '../context/AuthContext'
import { Article, ListArticlesQuery } from '../API'
import { API, graphqlOperation } from 'aws-amplify'
import { listArticles } from '../graphql/queries'
import { useRecoilValue } from 'recoil'
import { refreshState } from '../atoms'
import EditArticle from '../components/EditArticle'


export interface HomeProp {
  articles?: Article[]
  article?: Article
  key?: string | number
}



export default function Home() {

  // const { user } = useUser()
  const [article, setArticle] = useState<Article[]>([])
  const refresh = useRecoilValue(refreshState)


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



  return (
    <React.Fragment>
      {/* <CreateModal /> */}
      <EditArticle />
      <ArticleList articles={article} />
    </React.Fragment>
  )
}

import Head from 'next/head'
import { GetStaticProps } from 'next'
import axios from 'axios'
import ArticleList from '../components/ArticleList'

export interface Articles {
  userId?: number
  id?: number
  title: string
  body: string
}

export interface HomeProp {
  articles?: {}[]
  article?: {
    userId?: number
    id?: number
    title: string
    body: string
  }
  key?: string | number
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=10`)
    const articles: Articles = data

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
  console.log('The articles are: ', articles)
  return (
    <div>
      <Head>
        <title>App Next</title>
        <meta name='keyword' content='nextjs programming' />
      </Head>

      <ArticleList articles={articles} />
    </div>
  )
}

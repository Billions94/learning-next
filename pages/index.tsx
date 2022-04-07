import { server } from '../config'
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
    const { data } = await axios.get(`${server}/api/articles`)
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

// export const getStaticProps: GetStaticProps = async () => {
//   try {
//     const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=10`)
//     const articles: Articles = data

//     return {
//       props: {
//         articles,
//       }
//     }
//   } catch (error) {
//     console.error('Error getting articles', error)
//   }
// }

export default function Home({ articles }: HomeProp) {
  console.log('The articles are: ', articles)
  return (
    <div>

      <ArticleList articles={articles} />
    </div>
  )
}

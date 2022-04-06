import Head from 'next/head'
import axios from 'axios'

export const getStaticProps = async () => {
  try {
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=10`)
    const articles = data

    return {
      props: {
        articles,
      }
    }
  } catch (error) {
    console.error('Error getting articles', error)
  }
}

export default function Home({ articles }) {
  console.log('The articles are: ', articles)
  return (
    <div>
      <Head>
        <title>App Next</title>
        <meta name='keyword' content='nextjs programming' />
      </Head>
      <h1>Welcome to NextJs</h1>
    </div>
  )
}

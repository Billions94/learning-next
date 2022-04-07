import { useRouter } from "next/router"
import { GetServerSidePropsContext, PreviewData } from "next/types"
import { ParsedUrlQuery } from "querystring"
import Link from "next/link"
import { Articles, HomeProp } from "../.."
import axios from "axios"



export const getStaticProps = async (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
    try {
        const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${context.params.id}`)
        const article: Articles = data

        return {
            props: {
                article,
            }
        }
    } catch (error) {
        console.error(`Error getting article ${context.params.id}`, error)
    }
}

export const getStaticPaths = async () => {
    try {
        const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
        const articles: Articles[] = data

        const idArr = articles.map((item: Articles) => item.id)
        const paths = idArr.map((id) => ({ params: { id: id.toString()}}))

        return {
            paths,
            fallback: false 
        }

    } catch (error) {
        console.error(`Error getting static paths`, error)
    }
}

export default function article({ article }: HomeProp) {

    const router = useRouter()
    const { id } = router.query

  return (
    <>
        <h1>{article.title}</h1>
        <p>{article.body}</p>
        <br />
        <Link href="/">
            Go back
        </Link>
    </>
  )
}

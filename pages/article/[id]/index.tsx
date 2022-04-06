import { useRouter } from "next/router"
import { GetServerSidePropsContext, PreviewData } from "next/types"
import { ParsedUrlQuery } from "querystring"
import { Articles, HomeProp } from "../.."
import axios from "axios"



export const getServerSideProps = async (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
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

export default function article({ article }: HomeProp) {

    const router = useRouter()
    const { id } = router.query

  return (
    <div>
        This is  article {article.id}
    </div>
  )
}

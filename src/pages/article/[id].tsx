import Link from "next/link"
import Meta from "../../components/Meta"
import { useRouter } from "next/router"
import { GetStaticPaths, GetStaticProps } from "next/types"
import { HomeProp } from ".."
import { Article, GetArticleQuery, ListArticlesQuery } from "../../API"
import { graphqlOperation, withSSRContext } from "aws-amplify"
import { getArticle, listArticles } from "../../graphql/queries"
import { useUser } from "../../context/AuthContext"
// import axios from "axios"



export const getStaticPaths: GetStaticPaths = async () => {
    const SSR = withSSRContext()
    const { data } = (await SSR.API.graphql(graphqlOperation(listArticles))) as {
        data: ListArticlesQuery;
        errors: any[];
    }
    const { items } = data.listArticles
    const route = items.map((article: Article) => ({ params: { id: article.id } }))
    return {
        paths: route,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const SSR = withSSRContext()
    const { data } = await SSR.API.graphql(graphqlOperation(getArticle, { id: params.id })) as { data: GetArticleQuery }

    const article = data.getArticle
    return {
        props: {
            article,
        }
    }
}


// export const getStaticProps: GetStaticProps = async ({ params }) => {
//     try {
//         const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
//         const article: Article = data

//         return {
//             props: {
//                 article,
//             }
//         }
//     } catch (error) {
//         console.error(`Error getting article ${params.id}`, error)
//     }
// }

// export const getStaticPaths = async () => {
//     try {
//         const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
//         const articles: Articles[] = data

//         const idArr = articles.map((item: Articles) => item.id)
//         const paths = idArr.map((id) => ({ params: { id: id.toString()}}))

//         return {
//             paths,
//             fallback: false 
//         }

//     } catch (error) {
//         console.error(`Error getting static paths`, error)
//     }
// }


export default function ArticleView({ article }: HomeProp) {

    const router = useRouter()

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    const { user } = useUser()

    console.log(user)

    return (
        <>
            <Meta />
            <h1>{article.title}</h1>
            <p>{article.description}</p>
            <br />
            <Link href="/">
                Go back
            </Link>
        </>
    )
}



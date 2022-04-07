import { NextApiRequest, NextApiResponse } from "next";
import { articlesData } from "./data";

export default function handler({ query: { id } }: NextApiRequest, res: NextApiResponse) {
    try {
        const filteredArticles = articlesData.filter(article => article.id === id);

        if (filteredArticles.length > 0) {
            res.status(200).json(filteredArticles[0]);
        } else {
            res.status(404).json({
                message: `Article not found with id: ${id} not found`
            });
        }
    } catch (error) {
        console.error(`Error getting articles: ${id}`, error);
    }
}
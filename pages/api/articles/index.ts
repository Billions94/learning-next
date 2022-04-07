import { NextApiRequest, NextApiResponse } from "next";
import { articlesData } from "../data/data";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(articlesData);
}
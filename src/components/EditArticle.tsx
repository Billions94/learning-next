import { API, graphqlOperation } from 'aws-amplify'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { UpdateArticleMutation } from '../API'
import { articleState } from '../atoms'
import { updateArticle } from '../graphql/mutations'

export default function EditArticle() {

    const initialState = {
        title: '',
        description: '',
        media: ''

    }

    const [newArticle, setNewArticle] = useState(initialState)
    const [article, setArticle] = useRecoilState(articleState)
    const [selected, setSelected] = useState<number>(0)

    const index = article.findIndex((a, i) => i === selected)
    console.log('I am the index', index)

    async function update() {
        try {
            const editedArticle = { ...newArticle }
            const { data } = await API.graphql(graphqlOperation(updateArticle, { input: editedArticle })) as { data: UpdateArticleMutation }
        } catch (error) {
            console.error('Error updating article', error)
        }
    }


    return (
        <div>

        </div>
    )
}

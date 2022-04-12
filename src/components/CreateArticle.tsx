import * as B from 'react-bootstrap'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { articleState } from '../atoms'
import { API, graphqlOperation, Storage } from 'aws-amplify'
import { createArticle } from '../graphql/mutations'
import ImageDrop from './ImageDrop'
import { CreateArticleMutation } from '../API'



interface Props {
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateArticle({ setRefresh }: Props) {


    const initialState = {
        title: '',
        description: '',
        media: ''
    }

    const [newArticle, setNewArticle] = useState(initialState)
    const [article, setArticle] = useRecoilState(articleState)
    const [file, setFile] = useState<File>();
    const [closePreview, setClosePreview] = useState<boolean>(false);

    function updateInput(key: string, value: string) {
        setNewArticle({ ...newArticle, [key]: value })

    }


    console.log('This is the new article', article)
    console.log('This is the file from the parent', file)

    async function create() {
        try {
            if (file) {
                await Storage.put(file.name, file, {
                    contentType: "auto", // auto will automatically set the correct content type
                });
            }

            const newArticlePost = { ...newArticle }
            newArticlePost.media = file ? file.name : ''
            setArticle([...article, newArticlePost])
            setNewArticle(initialState)
            setClosePreview(true)
            const { data } = await API.graphql(graphqlOperation(createArticle, { input: newArticlePost })) as { data: CreateArticleMutation }
            console.log('Article created', data)
            setRefresh(true)
        } catch (error) {
            console.log("Error uploading file: ", error);
        }
    }



    return (
        <B.Container id='cac'>
            <B.Form id='createArticle'>
                <B.Form.Group controlId="formBasicEmail">
                    <B.Form.Control className='my-2'
                        type='text'
                        value={newArticle.title}
                        placeholder='Title'
                        onChange={(e) => updateInput('title', e.target.value)} />
                </B.Form.Group>
                <B.Form.Group controlId="formBasicEmail">
                    <B.Form.Control className='mb-2'
                        type='text'
                        as='textarea'
                        rows={3}
                        value={newArticle.description}
                        placeholder='Description'
                        onChange={(e) => updateInput('description', e.target.value)} />
                </B.Form.Group>
                <B.Form.Group controlId="formBasicEmail">
                    <ImageDrop file={file} setFile={setFile} closePreview={closePreview} />
                </B.Form.Group>
                <B.Button className='mt-3'
                    variant='primary' onClick={create}>
                    Create
                </B.Button>
            </B.Form>
        </B.Container>
    )
}

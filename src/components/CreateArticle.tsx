import React, { useState } from 'react'
import * as B from 'react-bootstrap'
import { useRecoilState } from 'recoil'
import { articleState } from '../atoms'
import { Storage, API, graphqlOperation } from 'aws-amplify'
import { createArticle } from '../graphql/mutations'
import awsExports from '../aws-exports'



export default function CreateArticle() {

    const initialState = {
        title: '',
        description: '',
        file: {
            bucket: '',
            region: '',
            key: ''
        }
    }

    const [newArticle, setNewArticle] = useState(initialState)
    const [article, setArticle] = useRecoilState(articleState)

    function updateInput(key: string, value: string) {
        setNewArticle({ ...newArticle, [key]: value })

    }

    function target(e: any) {
        if (e.target && e.target.files[0]) {
            const file = e.target.files[0]
            console.log('This is the file', file)

            Storage.put(file.name, file, {
                contentType: 'image/png|image/jpeg|image/jpg'
            }).then((response) => {
                const image = {
                    bucket: awsExports.aws_user_files_s3_bucket,
                    region: awsExports.aws_user_files_s3_bucket_region,
                    key: 'public/' + file.name
                }
                setNewArticle({ ...newArticle, file: image })
                console.log('Sucessfully uploaded', image)
            })
        }
    }

    console.log('This is the new article', article)

    async function create() {
        try {
            const item = { ...newArticle }
            setArticle([...article, item])
            const { data }: any = await API.graphql(graphqlOperation(createArticle, { input: article }))
            console.log('Article created', data)
        } catch (error) {
            console.error('Error creating article', error)
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
                    <B.Form.Control className='mb-2'
                        type='file'
                        value=''
                        onChange={(e) => target(e)} />
                </B.Form.Group>
                <B.Button variant='primary' onClick={create}>
                    Create
                </B.Button>
            </B.Form>
        </B.Container>
    )
}

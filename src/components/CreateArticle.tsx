import * as B from 'react-bootstrap'
import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { articleState, darkModeState, refreshState, showState } from '../atoms'
import { API, graphqlOperation, Storage } from 'aws-amplify'
import { createArticle } from '../graphql/mutations'
import ImageDrop from './ImageDrop'
import { CreateArticleMutation } from '../API'
import styles from '../styles/Modal.module.scss'


export default function CreateArticle() {


    const initialState = {
        title: '',
        description: '',
        media: ''
    }

    const [newArticle, setNewArticle] = useState(initialState)
    const [article, setArticle] = useRecoilState(articleState)
    const [file, setFile] = useState<File>();
    const [closePreview, setClosePreview] = useState<boolean>(false);
    // eslint-disable-next-line no-unused-vars
    const [_refresh, setRefresh] = useRecoilState(refreshState)
    // eslint-disable-next-line no-unused-vars
    const [show, setShow] = useRecoilState(showState)

    const darkMode = useRecoilValue(darkModeState)
    const check: boolean = darkMode === false

    function updateInput(key: string, value: string) {
        setNewArticle({ ...newArticle, [key]: value })

    }

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
            await API.graphql(graphqlOperation(createArticle, { input: newArticlePost })) as { data: CreateArticleMutation }
            setShow(false)
            setRefresh(true)
        } catch (error) {
            console.log("Error uploading file: ", error);
        }
    }



    return (
        <B.Container id={styles.cac}>
            <B.Form id={styles.form}>
                <FormGroup
                    check={check}
                    darkMode={darkMode}
                    newArticle={newArticle}
                    updateInput={updateInput}
                    file={file}
                    setFile={setFile}
                    closePreview={closePreview}
                    create={create}
                />
            </B.Form>
        </B.Container>
    )
}

interface FormGroupProps {
    check: boolean
    newArticle: {
        title: string
        description: string
        media: string
    }
    updateInput: (key: string, value: string) => void
    file: File
    setFile: React.Dispatch<React.SetStateAction<File>>
    closePreview: boolean
    create(): Promise<void>
    darkMode: boolean
}

const FormGroup = (props: FormGroupProps) => {

    const { check, newArticle, updateInput, file, setFile, closePreview, create } = props
    return (
        <>
            <B.Form.Group controlId="formBasicEmail">
                <B.Form.Control className={check ? styles.formcontrol : styles.formcontroldark}
                    type='text'
                    value={newArticle.title}
                    placeholder='Title'
                    onChange={(e) => updateInput('title', e.target.value)} />
            </B.Form.Group>
            <B.Form.Group controlId="formBasicEmail">
                <B.Form.Control className={check ? styles.formcontrol : styles.formcontroldark}
                    type='text'
                    as='textarea'
                    rows={2}
                    value={newArticle.description}
                    placeholder='Description'
                    onChange={(e) => updateInput('description', e.target.value)} />
            </B.Form.Group>
            <B.Form.Group className={check ? styles.formcontrol : styles.formcontroldark} controlId="formBasicEmail">
                <ImageDrop
                    file={file}
                    darkMode={props.darkMode}
                    setFile={setFile}
                    closePreview={closePreview} />
            </B.Form.Group>
            <div className="d-flex">
                <></>
                <B.Button className={check ? styles.createBtn : styles.createBtnDark}
                    variant='primary' onClick={create}>
                    <span className={styles.btnSpan}>Post</span>
                </B.Button>
            </div>
        </>
    )
}

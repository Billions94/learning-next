import React, { useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import Link from 'next/link'
import { Auth } from 'aws-amplify'
import { Button, Form, Col } from 'react-bootstrap'
import { useUser } from '../context/AuthContext'
import { CognitoUser } from '@aws-amplify/auth'
import { useRouter } from 'next/router'
import { darkModeState } from '../atoms'
import { useRecoilValue } from 'recoil'
import styles from '../styles/SignIn.module.scss'


export type FormikProps = {
    username?: string
    email: string
    password: string
    code: string
}

const schema = yup.object({
    username: yup.string().required("Please Enter a username"),
    email: yup.string().email().required("Please Enter your Email"),
    password: yup
        .string()
        .required("Please Enter your password")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
    code: yup.string().required("Please enter the code "),
})

export default function SignUp() {

    const router = useRouter()

    const { user } = useUser()
    const [showCode, setShowCode] = useState<boolean>(false)
    const darkMode = useRecoilValue(darkModeState)
    const check: boolean = darkMode === false

    async function onSubmit(data: FormikProps): Promise<void> {
        try {
            if (showCode) {
                confirmSignUp(data)
            } else {
                await signUp(data)
                setShowCode(true)
            }
        } catch (error) {
            console.log('Error logging in user', error)
        }
    }

    async function signUp(data: FormikProps): Promise<CognitoUser> {
        const { username, email, password } = data
        try {
            const { user } = await Auth.signUp({
                username,
                password,
                attributes: {
                    email,
                }
            });
            console.log('User signed up', user);
            return user
        } catch (error) {
            console.log('error signing up:', error);
        }
    }

    async function confirmSignUp(data: FormikProps) {
        const { username, password, code } = data
        try {
            await Auth.confirmSignUp(username, code);
            const amplifyUser = await Auth.signIn(username, password)
            console.log('Signed in a user', amplifyUser)
            if (amplifyUser) {
                router.push('/')
            } else {
                throw new Error('Error signing in user')
            }
        } catch (error) {
            console.log('error confirming sign up', error)
        }
    }

    console.log('This is the user', user)

    return (
        <Col sm={6} md={4} className={check ? styles.customMT : styles.customMTDark}>
            <Formik
                validationSchema={schema}
                onSubmit={signUp}
                initialValues={{
                    username: "",
                    email: "",
                    password: "",
                    code: ""
                }}>
                {({
                    handleChange,
                    values,
                    errors,
                }) => (
                    <React.Fragment>
                        <h4 className={styles.hTitle}>SIGN UP</h4>
                        <Form noValidate id={styles.signUp}>
                            <Form.Group className='format'
                                controlId="formBasicUserName">
                                <Form.Control
                                    size="lg"
                                    className={styles.username}
                                    autoComplete='off'
                                    type="text"
                                    name="username"
                                    value={values.username}
                                    onChange={handleChange}
                                    placeholder="Username"
                                    isInvalid={!!errors.username}
                                />
                                <Form.Control.Feedback className={styles.error} type="invalid">
                                    {errors.username}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className='mt-2'
                                controlId="formBasicEmail">
                                <Form.Control
                                    className={styles.email}
                                    autoComplete='off'
                                    type="email"
                                    placeholder="Email"
                                    value={values.email}
                                    onChange={handleChange}
                                    name="email"
                                    size="lg"
                                    isInvalid={!!errors.email}
                                />
                                <Form.Control.Feedback className={styles.error} type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className='mt-2'
                                controlId="formBasicPassword">
                                <Form.Control
                                    className={styles.password}
                                    autoComplete='off'
                                    size="lg"
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    isInvalid={!!errors.password}
                                />
                                <Form.Control.Feedback className={styles.error} type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>

                            {showCode &&
                                <Form.Group className='mt-2'
                                    controlId="formBasicPassword">
                                    <Form.Control
                                        className={styles.code}
                                        autoComplete='off'
                                        size="lg"
                                        type="text"
                                        name="code"
                                        value={values.code}
                                        onChange={handleChange}
                                        placeholder="Code"
                                        isInvalid={!!errors.code}
                                    />
                                    <Form.Control.Feedback className={styles.error} type="invalid">
                                        {errors.code}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            }

                            <div className="d-flex">
                                <React.Fragment></React.Fragment>
                                <Form.Text className={`${styles.formText} mt-3`}>
                                    Already a User ?{" "}
                                    <Link href='/signin'>
                                        Sign In
                                    </Link>
                                </Form.Text>
                                <div style={{ marginLeft: 'auto' }}>
                                    {values.password.length < 8 ?
                                        <Button variant="primary" disabled className={`${styles.signUpBtn} mt-3`} >
                                            Sign Up
                                        </Button> :
                                        <Button
                                            onClick={() => onSubmit(values)}
                                            variant="primary"
                                            className={`${styles.signUpBtn}`}>
                                            {showCode ? 'Confirm code' : 'Sign Up'}
                                        </Button>
                                    }
                                </div>
                            </div>
                        </Form>
                    </React.Fragment>
                )}
            </Formik>
        </Col>
    )
}
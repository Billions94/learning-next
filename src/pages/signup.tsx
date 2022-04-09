import React, { useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import Link from 'next/link'
import { Auth } from 'aws-amplify'
import { Button, Form, Col } from 'react-bootstrap'
import { useUser } from '../context/AuthContext'
import { CognitoUser } from '@aws-amplify/auth'
import { useRouter } from 'next/router'


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

    const router  = useRouter()

    const { user } = useUser()
    const [showCode, setShowCode] = useState<boolean>(false)

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
        <Col sm={6} md={4} className='customMT mx-auto'>
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
                    <div className="register">
                        <h4 className="SignInHeading register1 mt-4">SIGN UP</h4>
                        <Form noValidate className='register'>
                            <Form.Group className='format'
                                controlId="formBasicUserName">
                                <Form.Control
                                    size="lg"
                                    className="register"
                                    type="text"
                                    name="username"
                                    value={values.username}
                                    onChange={handleChange}
                                    placeholder="Username"
                                    isInvalid={!!errors.username}
                                />
                                <Form.Control.Feedback className="FeedBack" type="invalid">
                                    {errors.username}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className='format'
                                controlId="formBasicEmail">
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    value={values.email}
                                    onChange={handleChange}
                                    name="email"
                                    className="register"
                                    size="lg"
                                    isInvalid={!!errors.email}
                                />
                                <Form.Control.Feedback className="FeedBack" type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className='format'
                                controlId="formBasicPassword">
                                <Form.Control
                                    className="register"
                                    size="lg"
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    isInvalid={!!errors.password}
                                />
                                <Form.Control.Feedback className="FeedBack" type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>

                            {showCode &&
                                <Form.Group className='format'
                                    controlId="formBasicPassword">
                                    <Form.Control
                                        className="register"
                                        size="lg"
                                        type="text"
                                        name="code"
                                        value={values.code}
                                        onChange={handleChange}
                                        placeholder="Code"
                                        isInvalid={!!errors.code}
                                    />
                                    <Form.Control.Feedback className="FeedBack" type="invalid">
                                        {errors.code}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            }

                            {values.password.length < 8 ?
                                <Button variant="primary" disabled className='disabled1'>
                                    Sign Up
                                </Button> :
                                <Button
                                    onClick={() => onSubmit(values)}
                                    variant="primary"
                                    className='modal-btn'>
                                    {showCode ? 'Confirm code' : 'Sign Up'}
                                </Button>
                            }
                            <Form.Text>
                                Already a User?{" "}
                                <Link href='/signin'>
                                    Sign In
                                </Link>
                            </Form.Text>
                        </Form>
                    </div>
                )}
            </Formik>
        </Col>
    )
}
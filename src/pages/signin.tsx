import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import Link from 'next/link'
import { Auth } from 'aws-amplify'
import { Button, Form, Col } from 'react-bootstrap'
import { useUser } from '../context/AuthContext'
import { useRouter } from 'next/router'


export type FormikProps = {
    username?: string
    password: string
}

const schema = yup.object({
    username: yup.string().required("Please Enter a username"),
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

    async function signIn(data: FormikProps) {
        const { username, password } = data
        try {
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
                onSubmit={signIn}
                initialValues={{
                    username: "",
                    password: ""
                }}>
                {({
                    handleChange,
                    values,
                    errors,
                }) => (
                    <div className="register">
                        <h4 className="SignInHeading register1 mt-4">SIGN IN</h4>
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

                            {values.password.length < 8 ?
                                <Button variant="primary" disabled className='disabled1'>
                                    Sign In
                                </Button> :
                                <Button
                                    onClick={() => signIn(values)}
                                    variant="primary"
                                    className='modal-btn'>
                                    Sign In
                                </Button>
                            }
                            <Form.Text className="mr-2">
                                New User?
                                <Link href='/signup'>
                                    Sign Up
                                </Link>
                            </Form.Text>
                        </Form>
                    </div>
                )}
            </Formik>
        </Col>
    )
}
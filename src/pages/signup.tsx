import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import Link from 'next/link'
import { Auth } from 'aws-amplify'
import { Button, Form, Col } from 'react-bootstrap'


export type FormikProps = {
    username?: string
    email: string
    password: string
}

const schema = yup.object({
    userName: yup.string().required("Please Enter a username"),
    email: yup.string().email().required("Please Enter your Email"),
    password: yup
        .string()
        .required("Please Enter your password")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        )
})

export default function SignUp() {

    async function signUp(data: FormikProps) {
        const { username, email, password } = data
        try {
            const { user } = await Auth.signUp({
                username,
                password,
                attributes: {
                    email,
                }
            });
            console.log(user);
        } catch (error) {
            console.log('error signing up:', error);
        }
    }

    return (
        <Col sm={6} md={4} className='customMT mx-auto'>
            <Formik
                validationSchema={schema}
                onSubmit={signUp}
                initialValues={{
                    userName: "",
                    email: "",
                    password: "",
                }}
            >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isValid,
                    errors,
                }) => (
                    <div className="register">
                        <h4 className="SignInHeading register1 mt-4">SIGN UP</h4>
                        <Form noValidate className='register' onSubmit={handleSubmit}>
                            <Form.Group className='format'
                                controlId="formBasicUserName">
                                <Form.Control
                                    size="lg"
                                    className="register"
                                    type="text"
                                    name="userName"
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

                            {values.password.length < 8 ?
                                <Button variant="primary" disabled className='disabled1' type="submit">
                                    Sign Up
                                </Button> :
                                <Button variant="primary" className='modal-btn' type="submit">
                                    Sign Up
                                </Button>
                            }
                            <Form.Text>
                                Already a User?{" "}
                                <Link href="#signin" >
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
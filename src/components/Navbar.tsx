import React from 'react'
import { useRouter } from 'next/router'
import { Button, Image } from 'react-bootstrap'
import { useRecoilState } from 'recoil'
import { darkModeState, showState } from '../atoms'
import * as Icon from '../../lib'
import { Auth } from 'aws-amplify'
import styles from '../styles/Navbar.module.scss'


export default function Navbar() {

    const routes = [
        {
            name: 'Home',
            path: '/',
        },
        {
            name: 'Contact',
            path: '/contact',
        }
    ]

    const [darkMode, setDarkMode] = useRecoilState(darkModeState)
    // eslint-disable-next-line no-unused-vars
    const [show, setShow] = useRecoilState(showState)

    const toggle = () => {
        darkMode === false ? setDarkMode(true) : setDarkMode(false)
    }
    const check: boolean = darkMode === false

    const router = useRouter()
    const location = useRouter()

    async function signOut() {
        try {
            await Auth.signOut()
            router.push('/signin')
        } catch (error) {
            console.error('Error signing out user', error)
        }
    }

    const signin: string = '/signin'
    const signup: string = '/signup'



    return (
        <React.Fragment>
            {location.pathname !== `${signin}` && location.pathname !== `${signup}` &&
                <nav id={check ? styles.navbar : styles.navbarDark}>
                    <ul>
                        <React.Fragment>
                            {routes.map((item, idx) => (
                                <li key={idx}>
                                    <a href={item.path} className={styles.link}>
                                        {item.name}
                                        <span className={styles.slider}></span>
                                    </a>
                                </li>
                            ))}
                        </React.Fragment>
                    </ul>
                    <div className={styles.signOut}>
                        <Button onClick={() => setShow(true)}
                            className={styles.toggleMode}
                            style={{ marginRight: '55px' }}>
                            <CreateIcon
                                check={check}
                                x={check ? styles.light2 : styles.dark2}
                                y={styles.CreateIcon} />
                        </Button>

                        <Button onClick={toggle}
                            className={styles.toggleMode}>
                            <DarkModeIcon
                                check={check}
                                x={check ? styles.light : styles.dark}
                                y={styles.DarkModeIcon} />
                        </Button>

                        <Button onClick={() => signOut()}
                            className={styles.toggleMode}>
                            <SignOutIcon
                                check={check}
                                x={check ? styles.light1 : styles.dark1}
                                y={styles.SignOutIcon} />
                        </Button>
                    </div>
                </nav>
            }

            {location.pathname === `${signin}` &&
                <nav id={check ? styles.navbar : styles.navbarDark}>
                    <div className={styles.signOut}>
                        <Button onClick={() => toggle()}
                            className={styles.toggleMode}>
                            <DarkModeIcon
                                check={check}
                                x={check ? styles.light : styles.dark}
                                y={styles.DarkModeIcon} />
                        </Button>
                    </div>
                </nav>
            }

            {location.pathname === `${signup}` &&
                <nav id={check ? styles.navbar : styles.navbarDark}>
                    <div className={styles.signOut}>
                        <Button onClick={() => toggle()}
                            className={styles.toggleMode}>
                            <DarkModeIcon
                                check={check}
                                x={check ? styles.light : styles.dark}
                                y={styles.DarkModeIcon} />
                        </Button>
                    </div>
                </nav>
            }
        </React.Fragment>
    )
}

interface Props {
    check: boolean
    x?: string
    y?: string
}

const DarkModeIcon = ({ check, x, y }: Props) => {
    return (
        <div id={y}>
            <Image className={styles.img} src={check ? Icon.moonIcon : Icon.sunIconDark} alt='' />
            <div className={x}>
                {check ? 'Dark Mode' : 'Light Mode'}
            </div>
        </div>
    )
}

const SignOutIcon = ({ check, x, y }: Props) => {
    return (
        <div id={y}>
            <Image className={styles.img1} src={check ? Icon.signOutIcon : Icon.signOutIconDark} alt='' />
            <h6 className={x}>Sign Out</h6>
        </div>
    )
}

const CreateIcon = ({ check, x, y }: Props) => {
    return (
        <div id={y}>
            <Image className={styles.img1} src={check ? Icon.createIcon : Icon.createIconDark} alt='' />
            <h6 className={x}>New Article</h6>
        </div>
    )
}

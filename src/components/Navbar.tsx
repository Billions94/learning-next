import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, Image } from 'react-bootstrap'
import { useRecoilState } from 'recoil'
import { darkModeState } from '../atoms'
import * as Icon from '../../lib'
import { Auth } from 'aws-amplify'
import styles from '../styles/Navbar.module.scss'

export default function Navbar() {

    const route = [
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
                            {route.map((item, idx) => (
                                <li key={idx}>
                                    <Link href={item.path}>
                                        {item.name}
                                    </Link>
                                    <span className={styles.slider}></span>
                                </li>
                            ))}
                        </React.Fragment>
                    </ul>
                    <div className={styles.signOut}>
                        <Button onClick={() => toggle()}
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
            <Image className={styles.img} src={check ? Icon.sunIcon : Icon.moonIconDark} alt='' />
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


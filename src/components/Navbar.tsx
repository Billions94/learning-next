import Link from 'next/link'
import { Button, Image } from 'react-bootstrap'
import { useRecoilState } from 'recoil'
import { darkModeState } from '../atoms'
import * as Icon from '../../lib'
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



    return (
        <nav id={check ? styles.navbar : styles.navbarDark}>
            <ul>
                {route.map((item, idx) => (
                    <li key={idx}>
                        <Link href={item.path}>
                            {item.name}
                        </Link>
                    </li>
                ))}
                <Button onClick={() => toggle()}
                    className={styles.toggleMode}>
                    <DarkModeIcon check={check}/>
                </Button>
            </ul>
        </nav>
    )
}

interface Props {
    check: boolean
}

const DarkModeIcon = ({ check }: Props) => {
    return (
        <Image className={styles.img} src={check ? Icon.sunIcon : Icon.moonIconDark} alt='' />
    )
}


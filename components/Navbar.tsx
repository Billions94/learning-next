import Link from 'next/link'
import { Button, Image } from 'react-bootstrap'
import * as Icon from '../lib'
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

    

    return (
        <nav className={styles.navbar}>
            <ul>
                {route.map((item, idx) => (
                    <li key={idx}>
                        <Link href={item.path}>
                            {item.name}
                        </Link>
                    </li>
                ))}
                <Button className={styles.toggleMode}>
                    <Image className={styles.img} src={Icon.sunIconDark} alt='' />
                </Button>
            </ul>
        </nav>
    )
}


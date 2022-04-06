import Link from 'next/link'
import styles from '../styles/Navbar.module.scss'

export default function Navbar() {

    const route = [
        {
            name: 'Home',
            path: '/',
        },
        {
            name: 'About',
            path: '/about',
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
            </ul>
        </nav>
    )
}


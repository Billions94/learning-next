import Navbar from './Navbar'
import Header from './Header'
import styles from '../styles/Layout.module.scss'
import Meta from './Meta'

export default function Layout({ children }) {
    return (
        <>
            <Meta />
            <Navbar />
            <div className={styles.container}>
                <main className={styles.main}>
                    <Header />
                    {children}
                </main>
            </div>
        </>
    )
}

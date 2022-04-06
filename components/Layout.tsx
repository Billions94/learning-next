import Navbar from './Navbar'
import Header from './Header'
import styles from '../styles/Layout.module.scss'

export default function Layout({ children }) {
    return (
        <>
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

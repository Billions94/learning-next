import styles from '../styles/Header.module.scss'

export default function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>
                <span>Web Development</span> News
            </h1>
            <p className={styles.description}>Keep up to date with new Web Development news</p>
        </header>
    )
}

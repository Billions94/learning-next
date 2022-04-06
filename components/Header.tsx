import styles from '../styles/Header.module.scss'

export default function Header() {
  return (
    <header>
        <h1 className={styles.title}>
            <span>Web Development</span> News
        </h1>
    </header>
  )
}

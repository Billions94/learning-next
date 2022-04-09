import { useRecoilValue } from 'recoil'
import { darkModeState } from '../../atoms'
import styles from '../styles/Header.module.scss'

export default function Header() {

    const darkMode = useRecoilValue(darkModeState)
    const check: boolean = darkMode === false

    return (
        <header id={check ? styles.header : styles.headerDark}>
            <h1 className={styles.title}>
                <span>Web Development</span> News
            </h1>
            <p className={styles.description}>Keep up to date with new Web Development news</p>
        </header>
    )
}

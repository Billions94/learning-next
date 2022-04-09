import React from 'react'
import Navbar from './Navbar'
import Header from './Header'
import Meta from './Meta'
import { darkModeState } from '../atoms'
import { useRecoilValue } from 'recoil'
import styles from '../styles/Layout.module.scss'

interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {

    const darkMode = useRecoilValue(darkModeState)
    const check: boolean = darkMode === false

    return (
        <>
            <Meta />
            <Navbar />
            <div id={check ? styles.container : styles.containerDark}>
                <main className={styles.main}>
                    <Header />
                    {children}
                </main>
            </div>
        </>
    )
}

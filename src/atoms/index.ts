import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'


const localStorage = typeof window !== `undefined` ? window.localStorage : null

const { persistAtom } = recoilPersist({
    key: 'recoil-persist',
    storage: localStorage
})

export const darkModeState = atom<true | false >({
    key: 'darkMode',
    default: false,
    effects_UNSTABLE: [persistAtom]
})

interface Article {
    id?: string
    title: string
    description: string
    media?: string
}

export const articleState = atom<Article[]>({
    key: 'article',
    default: [],
    effects_UNSTABLE: [persistAtom]
})
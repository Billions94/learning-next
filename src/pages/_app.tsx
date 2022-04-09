import Layout from '../components/Layout'
import { RecoilRoot } from 'recoil'
import type { AppProps } from 'next/app'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  )
}

export default MyApp

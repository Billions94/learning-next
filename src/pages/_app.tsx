import Layout from '../components/Layout'
import { RecoilRoot } from 'recoil'
import type { AppProps } from 'next/app'
import Amplify from "aws-amplify"
import awsExports from "../aws-exports"
Amplify.configure(awsExports)
import '../styles/globals.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

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

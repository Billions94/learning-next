import Layout from '../components/Layout'
import { RecoilRoot } from 'recoil'
import type { AppProps } from 'next/app'
import '../styles/globals.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import Amplify from "aws-amplify"
import awsExports from "../aws-exports"
import AuthContext from '../context/AuthContext'
Amplify.configure({ ...awsExports, ssr: true })

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthContext>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContext>
    </RecoilRoot>
  )
}

export default MyApp

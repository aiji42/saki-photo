import '../styles/global.css'
import 'destyle.css/destyle.css'
import { AppProps } from 'next/app'
import { FC } from 'react'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default App
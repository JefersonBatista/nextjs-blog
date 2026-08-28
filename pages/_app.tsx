import { AppProps } from 'next/app'

import { useEffect } from 'react'
import { useRouter } from 'next/router'

import '@/styles/global.css'
import { languages } from '@/types'

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    if (router.asPath === '/') router.push(`/${languages[0]}`)
  }, [])

  return (
    <Component {...pageProps} />
  )
}

export default App

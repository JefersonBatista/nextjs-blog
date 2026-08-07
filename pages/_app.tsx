import { AppProps } from 'next/app'
import { useState } from 'react'

import { LanguageContext } from '../components/language-context'
import '../styles/global.css'

function App({ Component, pageProps }: AppProps) {
  const [language, setLanguage] = useState('en-US')

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <Component {...pageProps} />
    </LanguageContext.Provider>
  )
}

export default App

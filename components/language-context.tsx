import { createContext, Dispatch, SetStateAction } from 'react'

type LanguageContextType = {
  language: string
  setLanguage: Dispatch<SetStateAction<string>>
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en-US',
  setLanguage: () => undefined,
})

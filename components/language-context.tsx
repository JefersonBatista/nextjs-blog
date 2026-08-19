import { createContext, Dispatch, SetStateAction } from 'react'

type LanguageContextType = {
  language: Language
  setLanguage: Dispatch<SetStateAction<Language>>
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en-US',
  setLanguage: () => undefined,
})

import { parseISO, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Language } from '@/types'

export default function Date({ dateString, language }: { dateString: string, language: Language }) {
  const date = parseISO(dateString)
  switch (language) {
    case 'pt-BR':
      return <time dateTime={dateString}>{format(date, 'd LLLL, yyyy', { locale: ptBR })}</time>
    default:
      return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
  }
}

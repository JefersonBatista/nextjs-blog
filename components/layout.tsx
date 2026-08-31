import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from './layout.module.css'
import utilStyles from '@/styles/utils.module.css'
import { Language } from '@/types'

const name = 'Jeferson Batista'
export const siteTitle = "Jeferson Batista's Portfolio"

export default function Layout({
  children,
  home,
  language
  }: {
    children: React.ReactNode
    home?: boolean,
    language: Language
  }) {
  const router = useRouter()
  const homeRoute = `/${language}`
  const goHomeText = language === 'pt-BR' ? 'Voltar para a página inicial' : 'Back to home'

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta 
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        <div className={styles.languageSelector}>
          <select
            id="language-select"
            className={styles.languageSelect}
            value={language}
            onChange={(event) => {
              const selectedLanguage = event.target.value as Language
              // currentPath excludes the language prefix
              const currentPath = router.asPath.replace(/^\/[^/]+/, '')
              router.push(`/${selectedLanguage}${currentPath}`)
            }}
          >
            <option value="en-US">en-US</option>
            <option value="pt-BR">pt-BR</option>
          </select>
        </div>
        {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href={homeRoute}>
              <Image
                priority
                src="/images/profile.jpg"
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt={name}
              />
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link className={utilStyles.colorInhreit} href={homeRoute}>
                {name}
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href={homeRoute}>
            ← {goHomeText}
          </Link>
        </div>
      )}
    </div>
  )
}

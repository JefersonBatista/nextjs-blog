import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useContext } from 'react'

import Date from '@/components/date'
import Layout, { siteTitle } from '@/components/layout'
import { LanguageContext } from '@/components/language-context'
import utilStyles from '@/styles/utils.module.css'

import { getSortedData } from '@/lib/data'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const language = params.language as Language ?? 'en-US'
  const allPostsData = getSortedData('posts', language)
  const allProjectsData = getSortedData('projects', language)
  return {
    props: {
      allPostsData,
      allProjectsData
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const languages = ['pt-BR', 'en-US'] as const

  const paths = languages.map(language => `/${language}`)

  return {
    paths,
    fallback: false
  }
}

const Section = ({ title, path, data }: { title: string, path: string, data: any[] }) => (
  <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>{title}</h2>
        <ul className={utilStyles.list}>
          {data.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`${path}/${id}`}>
                {title}
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date}/>
              </small>
            </li>
          ))}
        </ul>
      </section>
)

export default function Home({
  allPostsData,
  allProjectsData,
}: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
  allProjectsData: {
    title: string
    id: string
  }[]
}) {
  const { language } = useContext(LanguageContext)

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
        <section className={utilStyles.headingMd}>
      {language === 'en-US' && (
        <>
          <p>Hello, I'm Jeff. I'm a computer scientist that loves football{' '}
            (not american) and frescobol (a brazilian sport). I like to{' '}
            read books or ride a bike in my free time.
          </p>
          <p>
          (You'll be builing a site like this on{' '}
          <a href="https://nextjs.org/learn">the Next.js tutorial</a>.)
        </p>
          </>)}
      </section>
      <section className={utilStyles.headingMd}>
          {language === 'pt-BR' && (<>
          <p>Olá, Jeff aqui. Sou um cientista da computação que ama futebol{' '}
            e frescobol. Gosto de ler livros e pedalar nas horas vagas.
          </p>
          <p>
            (Você estará construindo um site como este no{' '}
          <a href="https://nextjs.org/learn">tutorial Next.js</a>.)
        </p>
        </>)}
      </section>
      <Section title='Blog' path={`${language}/posts`} data={allPostsData} />
      <Section title='Projects' path={`${language}/projects`} data={allProjectsData} />
    </Layout>
  )
}

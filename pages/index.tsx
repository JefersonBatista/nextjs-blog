import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '/styles/utils.module.css'

import { getSortedData } from '../lib/data'

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedData('posts')
  const allProjectsData = getSortedData('projects')
  return {
    props: {
      allPostsData,
      allProjectsData
    }
  }
}

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
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello, I'm Jeff. I'm a computer scientist that loves football{' '}
          (not american) and frescobol (a brazilian sport). I like to{' '}
          read books or ride a bike in my free time.
        </p>
        <p>
          (This is a sample website - you'll be builing a site like this on{' '}
          <a href="https://nextjs.org/learn">the Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
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
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Projects</h2>
        <ul className={utilStyles.list}>
          {allProjectsData.map(({ id, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/projects/${id}`}>
                {title}
              </Link>
              <br />
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

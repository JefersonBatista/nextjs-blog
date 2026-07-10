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
      <Section title='Blog' path='/posts' data={allPostsData} />
      <Section title='Projects' path='/projects' data={allProjectsData} />
    </Layout>
  )
}

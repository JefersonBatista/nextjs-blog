import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'

import Date from '@/components/date'
import Layout from '@/components/layout'
import { getAllIds, getData } from '@/lib/data'
import utilStyles from '@/styles/utils.module.css'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const language = params.language as Language ?? 'en-US'
  const id = params.id as string

  const postData = await getData(id, 'posts', language)

  return {
    props: {
      postData,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const languages = ['pt-BR', 'en-US'] as const

  const paths = languages.flatMap(language =>
    getAllIds('posts', language as Language)
  )

  return {
    paths,
    fallback: false
  }
}

export default function Post({
  postData
}: {
  postData: {
    title: string
    date: string
    contentHtml: string
  }
}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

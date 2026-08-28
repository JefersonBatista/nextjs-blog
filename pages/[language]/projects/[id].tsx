import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'

import Layout from '@/components/layout'
import { getAllIds, getData } from '@/lib/data'
import utilStyles from '@/styles/utils.module.css'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const language = params.language as Language ?? 'en-US'
  const id = params.id as string
  
  const projectData = await getData(id, 'projects', language)

  return {
    props: {
      projectData,
      language
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const languages = ['pt-BR', 'en-US'] as const

  const paths = languages.flatMap(language =>
    getAllIds('projects', language as Language)
  )

  return {
    paths,
    fallback: false
  }
}

export default function Project({
  projectData,
  language
}: {
  projectData: {
    title: string
    contentHtml: string
  },
  language: Language
}) {
  return (
    <Layout language={language}>
      <Head>
        <title>{projectData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{projectData.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: projectData.contentHtml }} />
      </article>
    </Layout>
  )
}

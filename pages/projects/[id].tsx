import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'

import Layout from '../../components/layout'
import { getAllIds, getData } from '../../lib/data'
import utilStyles from '../../styles/utils.module.css'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const projectData = await getData(params.id as string, 'projects')

  return {
    props: {
      projectData
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllIds('projects')

  return {
    paths,
    fallback: false
  }
}

export default function Project({
  projectData
}: {
  projectData: {
    title: string
    contentHtml: string
  }
}) {
  return (
    <Layout>
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

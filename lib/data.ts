import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const getDirectory = (name: DirectoryName) => path.join(process.cwd(), name)

export function getSortedData(directory: DirectoryName) {
  // Get file names under /posts or /projects
  const fileNames = fs.readdirSync(getDirectory(directory))
  const allFilesData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(getDirectory(directory), fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf-8')

    // Use gray-matter to parse file metadata section
    const matterResult = matter(fileContents)

    return {
      id,
      ...(matterResult.data as { date: string, title: string })
    }
  })

  // Sort files by date
  return allFilesData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })
}

export function getAllIds(directory: DirectoryName) {
  const fileNames = fs.readdirSync(getDirectory(directory))

  return fileNames.map(fileName => (
    {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  ))
}

export async function getData(id: string, directory: DirectoryName) {
  const fullPath = path.join(getDirectory(directory), `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf-8')

  // Use gray-matter to parse file metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string, title: string })
  }
}

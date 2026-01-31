import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const documentsDirectory = path.join(process.cwd(), 'documents')

export interface DocumentMeta {
  title: string
  date: string
  type: 'concept' | 'daily' | 'project' | 'insight'
  tags: string[]
  slug: string
  folder: string
}

export interface Document extends DocumentMeta {
  content: string
}

export function getAllDocuments(): DocumentMeta[] {
  const documents: DocumentMeta[] = []
  
  const folders = ['concepts', 'daily', 'projects', 'insights']
  
  for (const folder of folders) {
    const folderPath = path.join(documentsDirectory, folder)
    if (!fs.existsSync(folderPath)) continue
    
    const files = fs.readdirSync(folderPath)
    
    for (const file of files) {
      if (!file.endsWith('.md')) continue
      
      const filePath = path.join(folderPath, file)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)
      
      documents.push({
        title: data.title || file.replace('.md', ''),
        date: data.date || '',
        type: data.type || folder.slice(0, -1) as DocumentMeta['type'],
        tags: data.tags || [],
        slug: file.replace('.md', ''),
        folder,
      })
    }
  }
  
  // Sort by date, newest first
  return documents.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getDocumentsByType(type: string): DocumentMeta[] {
  const folderMap: Record<string, string> = {
    concept: 'concepts',
    concepts: 'concepts',
    daily: 'daily',
    project: 'projects',
    projects: 'projects',
    insight: 'insights',
    insights: 'insights',
  }
  
  const folder = folderMap[type]
  if (!folder) return []
  
  return getAllDocuments().filter(doc => doc.folder === folder)
}

export function getDocumentBySlug(folder: string, slug: string): Document | null {
  const filePath = path.join(documentsDirectory, folder, `${slug}.md`)
  
  if (!fs.existsSync(filePath)) return null
  
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  
  return {
    title: data.title || slug,
    date: data.date || '',
    type: data.type || folder.slice(0, -1) as DocumentMeta['type'],
    tags: data.tags || [],
    slug,
    folder,
    content,
  }
}

export function getAllTags(): string[] {
  const documents = getAllDocuments()
  const tagSet = new Set<string>()
  
  for (const doc of documents) {
    for (const tag of doc.tags) {
      tagSet.add(tag)
    }
  }
  
  return Array.from(tagSet).sort()
}

export function searchDocuments(query: string): DocumentMeta[] {
  const documents = getAllDocuments()
  const lowerQuery = query.toLowerCase()
  
  return documents.filter(doc => 
    doc.title.toLowerCase().includes(lowerQuery) ||
    doc.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}

export function getDocumentsByTag(tag: string): DocumentMeta[] {
  return getAllDocuments().filter(doc => 
    doc.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}

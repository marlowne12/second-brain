import { getDocumentBySlug, getAllDocuments } from '@/lib/documents'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

interface PageProps {
  params: Promise<{
    folder: string
    slug: string
  }>
}

export async function generateStaticParams() {
  const documents = getAllDocuments()
  return documents.map((doc) => ({
    folder: doc.folder,
    slug: doc.slug,
  }))
}

export default async function DocumentPage({ params }: PageProps) {
  const { folder, slug } = await params
  const document = getDocumentBySlug(folder, slug)
  
  if (!document) {
    notFound()
  }
  
  const typeIcons: Record<string, string> = {
    concept: '💡',
    daily: '📅',
    project: '📁',
    insight: '✨',
  }
  
  const icon = typeIcons[document.type] || '📄'
  
  return (
    <div>
      {/* Header */}
      <header className="border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-text-secondary mb-2">
            <Link href={`/${folder}`} className="hover:text-accent">
              {folder.charAt(0).toUpperCase() + folder.slice(1)}
            </Link>
            <span>/</span>
            <span className="text-text-tertiary">{document.slug}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{icon}</span>
            <h1 className="text-xl font-semibold text-text-primary">
              {document.title}
            </h1>
          </div>
          <div className="flex items-center gap-4 mt-3">
            {document.date && (
              <span className="text-sm text-text-secondary">
                {formatDate(document.date)}
              </span>
            )}
            {document.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {document.tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/tags/${tag}`}
                    className="text-xs px-2 py-0.5 bg-surface-overlay rounded-full text-text-tertiary hover:text-accent transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 py-8">
        <div className="markdown-content">
          <ReactMarkdown>{document.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  )
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

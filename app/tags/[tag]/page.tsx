import { getDocumentsByTag, getAllTags } from '@/lib/documents'
import { PageHeader } from '@/components/PageHeader'
import { DocumentCard } from '@/components/DocumentCard'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{
    tag: string
  }>
}

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag),
  }))
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const documents = getDocumentsByTag(decodedTag)
  
  if (documents.length === 0) {
    notFound()
  }
  
  return (
    <div>
      <PageHeader 
        title={`#${decodedTag}`}
        description={`${documents.length} document${documents.length === 1 ? '' : 's'} tagged with "${decodedTag}"`}
      />
      
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid gap-3 md:grid-cols-2">
          {documents.map((doc) => (
            <DocumentCard key={`${doc.folder}/${doc.slug}`} document={doc} />
          ))}
        </div>
      </div>
    </div>
  )
}

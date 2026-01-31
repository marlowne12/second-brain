import { getDocumentsByType } from '@/lib/documents'
import { PageHeader } from '@/components/PageHeader'
import { DocumentCard } from '@/components/DocumentCard'

export default function InsightsPage() {
  const documents = getDocumentsByType('insights')
  
  return (
    <div>
      <PageHeader 
        title="Insights" 
        description="Key learnings and valuable discoveries"
      />
      
      <div className="max-w-5xl mx-auto px-6 py-8">
        {documents.length > 0 ? (
          <div className="grid gap-3 md:grid-cols-2">
            {documents.map((doc) => (
              <DocumentCard key={`${doc.folder}/${doc.slug}`} document={doc} />
            ))}
          </div>
        ) : (
          <EmptyState type="insights" />
        )}
      </div>
    </div>
  )
}

function EmptyState({ type }: { type: string }) {
  return (
    <div className="text-center py-12 px-6 rounded-lg border border-dashed border-border bg-surface-raised/50">
      <div className="text-4xl mb-3">✨</div>
      <h3 className="text-lg font-medium text-text-primary mb-1">No {type} yet</h3>
      <p className="text-text-secondary text-sm">
        Insights will be captured as we discover valuable learnings.
      </p>
    </div>
  )
}

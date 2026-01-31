import { getAllTags, getDocumentsByTag } from '@/lib/documents'
import { PageHeader } from '@/components/PageHeader'
import Link from 'next/link'

export default function TagsPage() {
  const tags = getAllTags()
  
  // Get count for each tag
  const tagCounts = tags.map(tag => ({
    tag,
    count: getDocumentsByTag(tag).length
  })).sort((a, b) => b.count - a.count)
  
  return (
    <div>
      <PageHeader 
        title="Tags" 
        description="Browse documents by topic"
      />
      
      <div className="max-w-5xl mx-auto px-6 py-8">
        {tagCounts.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {tagCounts.map(({ tag, count }) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="group flex items-center gap-2 px-4 py-2 bg-surface-raised border border-border-subtle rounded-lg hover:border-accent hover:bg-surface-overlay transition-colors"
              >
                <span className="text-text-primary group-hover:text-accent">#{tag}</span>
                <span className="text-xs px-1.5 py-0.5 bg-surface-overlay rounded text-text-tertiary">
                  {count}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 px-6 rounded-lg border border-dashed border-border bg-surface-raised/50">
            <div className="text-4xl mb-3">🏷️</div>
            <h3 className="text-lg font-medium text-text-primary mb-1">No tags yet</h3>
            <p className="text-text-secondary text-sm">
              Tags will appear as documents are created with topic labels.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

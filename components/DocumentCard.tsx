import Link from 'next/link'
import { DocumentMeta } from '@/lib/documents'

interface DocumentCardProps {
  document: DocumentMeta
}

const typeIcons: Record<string, string> = {
  concept: '💡',
  daily: '📅',
  project: '📁',
  insight: '✨',
}

const typeColors: Record<string, string> = {
  concept: 'bg-purple-500/10 text-purple-400',
  daily: 'bg-blue-500/10 text-blue-400',
  project: 'bg-green-500/10 text-green-400',
  insight: 'bg-amber-500/10 text-amber-400',
}

export function DocumentCard({ document }: DocumentCardProps) {
  const icon = typeIcons[document.type] || '📄'
  const colorClass = typeColors[document.type] || 'bg-gray-500/10 text-gray-400'
  
  return (
    <Link
      href={`/${document.folder}/${document.slug}`}
      className="block p-4 rounded-lg border border-border-subtle bg-surface-raised hover:bg-surface-overlay hover:border-border transition-all duration-150 group"
    >
      <div className="flex items-start gap-3">
        <span className="text-xl">{icon}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-text-primary group-hover:text-accent truncate">
            {document.title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-xs px-2 py-0.5 rounded-full ${colorClass}`}>
              {document.type}
            </span>
            {document.date && (
              <span className="text-xs text-text-tertiary">
                {formatDate(document.date)}
              </span>
            )}
          </div>
          {document.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {document.tags.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  className="text-xs px-1.5 py-0.5 bg-surface-overlay rounded text-text-tertiary"
                >
                  #{tag}
                </span>
              ))}
              {document.tags.length > 3 && (
                <span className="text-xs text-text-tertiary">
                  +{document.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

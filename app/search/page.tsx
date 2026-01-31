'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { DocumentCard } from '@/components/DocumentCard'
import type { DocumentMeta } from '@/lib/documents'

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState<DocumentMeta[]>([])
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    if (query) {
      setLoading(true)
      // In a real app, this would be an API call
      // For static export, we'll do client-side search
      fetch('/api/search?q=' + encodeURIComponent(query))
        .then(res => res.json())
        .then(data => {
          setResults(data.results || [])
          setLoading(false)
        })
        .catch(() => {
          setResults([])
          setLoading(false)
        })
    }
  }, [query])
  
  return (
    <div>
      <PageHeader 
        title={query ? `Search: "${query}"` : 'Search'}
        description={query ? `${results.length} result${results.length === 1 ? '' : 's'} found` : 'Search your knowledge base'}
      />
      
      <div className="max-w-5xl mx-auto px-6 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="text-text-secondary">Searching...</div>
          </div>
        ) : results.length > 0 ? (
          <div className="grid gap-3 md:grid-cols-2">
            {results.map((doc) => (
              <DocumentCard key={`${doc.folder}/${doc.slug}`} document={doc} />
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-12 px-6 rounded-lg border border-dashed border-border bg-surface-raised/50">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-medium text-text-primary mb-1">No results found</h3>
            <p className="text-text-secondary text-sm">
              Try a different search term or browse by category.
            </p>
          </div>
        ) : (
          <div className="text-center py-12 px-6 rounded-lg border border-dashed border-border bg-surface-raised/50">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-medium text-text-primary mb-1">Enter a search term</h3>
            <p className="text-text-secondary text-sm">
              Use the search bar above to find documents.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="text-center py-12">
        <div className="text-text-secondary">Loading...</div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}

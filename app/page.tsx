import { getAllDocuments, getAllTags } from '@/lib/documents'
import { PageHeader } from '@/components/PageHeader'
import { DocumentCard } from '@/components/DocumentCard'
import Link from 'next/link'

export default function HomePage() {
  const documents = getAllDocuments()
  const tags = getAllTags()
  const recentDocs = documents.slice(0, 6)
  
  const stats = {
    total: documents.length,
    concepts: documents.filter(d => d.type === 'concept').length,
    daily: documents.filter(d => d.type === 'daily').length,
    projects: documents.filter(d => d.type === 'project').length,
    insights: documents.filter(d => d.type === 'insight').length,
  }
  
  return (
    <div>
      <PageHeader 
        title="Overview" 
        description="Your personal knowledge base"
      />
      
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <StatCard label="Total" value={stats.total} icon="📚" />
          <StatCard label="Concepts" value={stats.concepts} icon="💡" href="/concepts" />
          <StatCard label="Daily" value={stats.daily} icon="📅" href="/daily" />
          <StatCard label="Projects" value={stats.projects} icon="📁" href="/projects" />
          <StatCard label="Insights" value={stats.insights} icon="✨" href="/insights" />
        </div>
        
        {/* Recent Documents */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-text-primary">Recent Documents</h2>
          </div>
          
          {recentDocs.length > 0 ? (
            <div className="grid gap-3 md:grid-cols-2">
              {recentDocs.map((doc) => (
                <DocumentCard key={`${doc.folder}/${doc.slug}`} document={doc} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </section>
        
        {/* Tags */}
        {tags.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-text-primary">Tags</h2>
              <Link href="/tags" className="text-sm text-text-secondary hover:text-accent">
                View all →
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 12).map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="px-3 py-1.5 text-sm bg-surface-raised border border-border-subtle rounded-full text-text-secondary hover:text-accent hover:border-accent transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

function StatCard({ label, value, icon, href }: { 
  label: string
  value: number
  icon: string
  href?: string 
}) {
  const content = (
    <div className={`
      p-4 rounded-lg border border-border-subtle bg-surface-raised
      ${href ? 'hover:bg-surface-overlay hover:border-border transition-colors cursor-pointer' : ''}
    `}>
      <div className="flex items-center gap-2 mb-1">
        <span>{icon}</span>
        <span className="text-2xl font-semibold text-text-primary">{value}</span>
      </div>
      <div className="text-sm text-text-secondary">{label}</div>
    </div>
  )
  
  return href ? <Link href={href}>{content}</Link> : content
}

function EmptyState() {
  return (
    <div className="text-center py-12 px-6 rounded-lg border border-dashed border-border bg-surface-raised/50">
      <div className="text-4xl mb-3">📝</div>
      <h3 className="text-lg font-medium text-text-primary mb-1">No documents yet</h3>
      <p className="text-text-secondary text-sm max-w-md mx-auto">
        Documents will appear here as Max creates them from your conversations.
        Check back soon!
      </p>
    </div>
  )
}

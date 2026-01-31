import { SearchBar } from './SearchBar'

interface PageHeaderProps {
  title: string
  description?: string
  showSearch?: boolean
}

export function PageHeader({ title, description, showSearch = true }: PageHeaderProps) {
  return (
    <header className="border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-text-primary">{title}</h1>
            {description && (
              <p className="text-sm text-text-secondary mt-0.5">{description}</p>
            )}
          </div>
          {showSearch && (
            <div className="w-64">
              <SearchBar />
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center px-6">
        <div className="text-6xl mb-4">🤔</div>
        <h1 className="text-2xl font-semibold text-text-primary mb-2">
          Page Not Found
        </h1>
        <p className="text-text-secondary mb-6">
          The document you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}

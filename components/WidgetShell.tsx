interface Props {
  title: string;
  onRefresh?: () => void;
  loading?: boolean;
  error?: string | null;
  empty?: boolean;
  children: React.ReactNode;
}

export default function WidgetShell({
  title,
  onRefresh,
  loading,
  error,
  empty,
  children,
}: Props) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white flex flex-col">
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          {title}
        </h2>
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Refresh"
          >
            ↻ Refresh
          </button>
        )}
      </header>

      <div className="flex-1 p-4 min-h-[120px]">
        {loading ? (
          <p className="text-sm text-gray-400 animate-pulse">Loading…</p>
        ) : error ? (
          <p className="text-sm text-red-500">Error: {error}</p>
        ) : empty ? (
          <p className="text-sm text-gray-400">No data available.</p>
        ) : (
          children
        )}
      </div>
    </section>
  );
}

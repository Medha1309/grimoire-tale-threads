import { Book } from "../../hooks/useArchiveStorage";

type Props = {
  books: Book[];
  onFilterChange: (filter: { tag?: string; author?: string; dateRange?: string }) => void;
};

function calculateStreak(books: Book[]): string {
  const now = new Date();
  const days = new Set<string>();
  for (const b of books) {
    if (!b.dateRead || b.deleted) continue;
    const d = new Date(b.dateRead);
    const diff = Math.floor((+now - +d) / (1000 * 60 * 60 * 24));
    if (diff < 14) days.add(d.toDateString());
  }
  return `${days.size} days in last 2 weeks`;
}

function getUniqueAuthors(books: Book[]): string[] {
  const authors = new Set<string>();
  books.forEach((b) => {
    if (b.author && !b.deleted) authors.add(b.author);
  });
  return Array.from(authors).sort();
}

function getUniqueTags(books: Book[]): string[] {
  const tags = new Set<string>();
  books.forEach((b) => {
    if (b.tags && !b.deleted) b.tags.forEach((t) => tags.add(t));
  });
  return Array.from(tags).sort();
}

export default function ArchiveSidebar({ books, onFilterChange }: Props) {
  const activeBooks = books.filter((b) => !b.deleted);
  const authors = getUniqueAuthors(books);
  const tags = getUniqueTags(books);

  return (
    <aside className="bg-white/90 dark:bg-slate-800/70 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
          Statistics
        </h3>
        <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <div className="flex justify-between">
            <span>Total Books:</span>
            <span className="font-semibold">{activeBooks.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Reading Streak:</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              {calculateStreak(books)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Authors:</span>
            <span className="font-semibold">{authors.length}</span>
          </div>
        </div>
      </div>

      {authors.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Filter by Author
          </h3>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {authors.slice(0, 10).map((author) => (
              <button
                key={author}
                onClick={() => onFilterChange({ author })}
                className="block w-full text-left text-xs px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
              >
                {author}
              </button>
            ))}
          </div>
        </div>
      )}

      {tags.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Filter by Tag
          </h3>
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 15).map((tag) => (
              <button
                key={tag}
                onClick={() => onFilterChange({ tag })}
                className="inline-block px-2 py-1 text-[10px] bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}

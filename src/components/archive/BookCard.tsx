// React import removed - using JSX transform
import { Book } from "../../hooks/useArchiveStorage";

type Props = {
  book: Book;
  onOpen: (id: string) => void;
  selected?: boolean;
  onSelect?: (id: string, checked: boolean) => void;
};

export default function BookCard({
  book,
  onOpen,
  selected = false,
  onSelect,
}: Props) {
  const truncatedNote = book.note
    ? book.note.length > 120
      ? book.note.slice(0, 120) + "…"
      : book.note
    : "";

  const stars = book.rating
    ? Array(book.rating)
        .fill("★")
        .join("")
    : "";

  return (
    <article
      role="article"
      aria-labelledby={`title-${book.id}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") onOpen(book.id);
      }}
      className={`group relative bg-white/90 dark:bg-slate-800/70 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transform transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
        selected ? "ring-2 ring-emerald-500" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        {onSelect && (
          <input
            aria-label={`Select ${book.title}`}
            type="checkbox"
            checked={selected}
            onChange={(e) => onSelect(book.id, e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          />
        )}
        <div className="flex-1 min-w-0">
          <h3
            id={`title-${book.id}`}
            className="font-semibold text-base text-slate-900 dark:text-slate-100 truncate"
          >
            {book.title}
          </h3>
          {book.author && (
            <p className="text-sm text-slate-600 dark:text-slate-300 truncate">
              {book.author}
            </p>
          )}
          {stars && (
            <div className="text-yellow-500 text-sm mt-1" aria-label={`Rating: ${book.rating} stars`}>
              {stars}
            </div>
          )}
          {truncatedNote && (
            <div className="mt-2 text-xs text-slate-700 dark:text-slate-200 line-clamp-3">
              {truncatedNote}
            </div>
          )}
          {book.tags && book.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {book.tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="inline-block px-2 py-0.5 text-[10px] bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="mt-3 flex items-center justify-between">
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              {book.dateRead
                ? new Date(book.dateRead).toLocaleDateString()
                : ""}
            </div>
            <button
              onClick={() => onOpen(book.id)}
              className="text-xs px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
              aria-label={`View details for ${book.title}`}
            >
              View
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

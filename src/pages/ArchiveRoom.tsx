import { useMemo, useState, useEffect } from "react";
import MatrixBackground from "../components/archive/MatrixBackground";
import BookCard from "../components/archive/BookCard";
import BookEditorModal from "../components/archive/BookEditorModal";
import ArchiveSidebar from "../components/archive/ArchiveSidebar";
import { useArchiveStorage } from "../hooks/useArchiveStorage";
import { ToastProvider, useToast } from "../components/archive/ToastProvider";

export default function ArchiveRoom() {
  return (
    <ToastProvider>
      <ArchiveRoomInner />
    </ToastProvider>
  );
}

type SortOption = "newest" | "oldest" | "title";
type ViewMode = "grid" | "list";

function ArchiveRoomInner() {
  const {
    books,
    addBook,
    updateBook,
    softDelete,
    restore,
    bulkSoftDelete,
    importJson,
    exportJson,
  } = useArchiveStorage();

  const [search, setSearch] = useState("");
  const [showMatrix, setShowMatrix] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [filterAuthor, setFilterAuthor] = useState<string | null>(null);

  const toast = useToast();

  // Filtered and sorted list
  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    let filtered = books.filter((b) => !b.deleted);

    // Apply search
    if (q) {
      filtered = filtered.filter((b) =>
        (
          b.title +
          b.author +
          (b.tags || []).join(" ") +
          (b.note || "")
        )
          .toLowerCase()
          .includes(q)
      );
    }

    // Apply tag filter
    if (filterTag) {
      filtered = filtered.filter((b) => b.tags?.includes(filterTag));
    }

    // Apply author filter
    if (filterAuthor) {
      filtered = filtered.filter((b) => b.author === filterAuthor);
    }

    // Sort
    if (sortBy === "newest") {
      filtered.sort((a, b) => (a.dateRead! > b.dateRead! ? -1 : 1));
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => (a.dateRead! < b.dateRead! ? -1 : 1));
    } else if (sortBy === "title") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [books, search, sortBy, filterTag, filterAuthor]);

  // Keyboard shortcuts
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // Ignore if typing in input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      if (e.key === "/") {
        e.preventDefault();
        const el = document.getElementById("archive-search") as HTMLInputElement | null;
        el?.focus();
      } else if (e.key.toLowerCase() === "n") {
        e.preventDefault();
        setModalOpen(true);
        setEditingId(null);
      } else if (e.key === "Delete") {
        const ids = Object.keys(selected).filter((k) => selected[k]);
        if (ids.length > 0) {
          bulkSoftDelete(ids);
          toast.push({
            message: `${ids.length} item(s) moved to bin.`,
            actionLabel: "Undo",
            action: () => ids.forEach((id) => restore(id)),
          });
          setSelected({});
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, bulkSoftDelete, restore, toast]);

  const onSaveNew = (payload: any) => {
    addBook(payload);
    toast.push({ message: "Book saved." });
  };

  const handleExport = () => {
    const json = exportJson();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `archive-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.push({ message: "Exported JSON." });
  };

  const handleImport = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (Array.isArray(parsed)) {
          importJson(parsed);
          toast.push({ message: `Imported ${parsed.length} books.` });
        } else {
          toast.push({ message: "Invalid file format." });
        }
      } catch {
        toast.push({ message: "Invalid JSON." });
      }
    };
    reader.readAsText(file);
  };

  const handleFilterChange = (filter: {
    tag?: string;
    author?: string;
    dateRange?: string;
  }) => {
    if (filter.tag) setFilterTag(filter.tag);
    if (filter.author) setFilterAuthor(filter.author);
  };

  const selectedCount = Object.values(selected).filter(Boolean).length;

  return (
    <main className="relative min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
      <MatrixBackground enabled={showMatrix} />

      <header className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Archive Room
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            All books you've read. Clean, searchable, and exportable.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={showMatrix}
              onChange={(e) => setShowMatrix(e.target.checked)}
              className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            Matrix BG
          </label>
          <button
            onClick={() => {
              setModalOpen(true);
              setEditingId(null);
            }}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            aria-label="Add new book"
          >
            + Add Book
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            Export
          </button>
          <label className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-slate-500">
            Import
            <input
              onChange={(e) => handleImport(e.target.files?.[0] ?? null)}
              type="file"
              accept="application/json"
              className="hidden"
            />
          </label>
        </div>
      </header>

      <section className="mb-4 flex flex-col md:flex-row gap-3">
        <input
          id="archive-search"
          placeholder="Search title, author, note, tags... (Press / to focus)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          aria-label="Sort by"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="title">Title A-Z</option>
        </select>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`px-3 py-2 rounded-lg border transition-colors ${
              viewMode === "grid"
                ? "bg-emerald-600 text-white border-emerald-600"
                : "border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
            aria-label="Grid view"
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`px-3 py-2 rounded-lg border transition-colors ${
              viewMode === "list"
                ? "bg-emerald-600 text-white border-emerald-600"
                : "border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
            aria-label="List view"
          >
            List
          </button>
        </div>
      </section>

      {(filterTag || filterAuthor) && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm text-slate-600 dark:text-slate-400">
            Filters:
          </span>
          {filterTag && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full text-sm">
              Tag: {filterTag}
              <button
                onClick={() => setFilterTag(null)}
                className="hover:text-emerald-900 dark:hover:text-emerald-100"
                aria-label="Clear tag filter"
              >
                ×
              </button>
            </span>
          )}
          {filterAuthor && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full text-sm">
              Author: {filterAuthor}
              <button
                onClick={() => setFilterAuthor(null)}
                className="hover:text-emerald-900 dark:hover:text-emerald-100"
                aria-label="Clear author filter"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}

      {selectedCount > 0 && (
        <div className="mb-4 p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-between">
          <span className="text-sm text-emerald-800 dark:text-emerald-300">
            {selectedCount} selected
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => {
                const ids = Object.keys(selected).filter((k) => selected[k]);
                bulkSoftDelete(ids);
                toast.push({
                  message: `${ids.length} item(s) deleted.`,
                  actionLabel: "Undo",
                  action: () => ids.forEach((id) => restore(id)),
                });
                setSelected({});
              }}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm transition-colors"
            >
              Delete Selected
            </button>
            <button
              onClick={() => setSelected({})}
              className="px-3 py-1 bg-slate-600 hover:bg-slate-700 text-white rounded-md text-sm transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <ArchiveSidebar books={books} onFilterChange={handleFilterChange} />
        </div>

        <div className="lg:col-span-3">
          {visible.length === 0 ? (
            <div className="text-center py-12 text-slate-600 dark:text-slate-400">
              <p className="text-lg">No books found</p>
              <p className="text-sm mt-2">
                {search || filterTag || filterAuthor
                  ? "Try adjusting your filters"
                  : "Add your first book to get started"}
              </p>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
                  : "space-y-3"
              }
            >
              {visible.map((b) => (
                <BookCard
                  key={b.id}
                  book={b}
                  onOpen={(id) => {
                    setEditingId(id);
                    setModalOpen(true);
                  }}
                  selected={!!selected[b.id]}
                  onSelect={(id, checked) =>
                    setSelected((s) => ({ ...s, [id]: checked }))
                  }
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {modalOpen && (
        <BookEditorModal
          initial={editingId ? books.find((x) => x.id === editingId) : undefined}
          onClose={() => {
            setModalOpen(false);
            setEditingId(null);
          }}
          onSave={(data) => {
            if (editingId) {
              updateBook(editingId, data);
              toast.push({ message: "Book updated." });
            } else {
              onSaveNew(data);
            }
            setModalOpen(false);
            setEditingId(null);
          }}
          onDelete={(id) => {
            softDelete(id);
            toast.push({
              message: "Book deleted.",
              actionLabel: "Undo",
              action: () => restore(id),
            });
          }}
        />
      )}
    </main>
  );
}

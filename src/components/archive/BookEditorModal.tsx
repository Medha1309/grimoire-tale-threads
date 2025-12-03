import React, { useState, useEffect } from "react";
import { Book } from "../../hooks/useArchiveStorage";

type Props = {
  initial?: Book;
  onClose: () => void;
  onSave: (data: Partial<Book>) => void;
  onDelete?: (id: string) => void;
};

export default function BookEditorModal({
  initial,
  onClose,
  onSave,
  onDelete,
}: Props) {
  const [title, setTitle] = useState(initial?.title || "");
  const [author, setAuthor] = useState(initial?.author || "");
  const [dateRead, setDateRead] = useState(
    initial?.dateRead ? initial.dateRead.split("T")[0] : ""
  );
  const [rating, setRating] = useState(initial?.rating || 0);
  const [note, setNote] = useState(initial?.note || "");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(initial?.tags || []);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  const handleSave = () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    onSave({
      title: title.trim(),
      author: author.trim(),
      dateRead: dateRead || new Date().toISOString(),
      rating,
      note: note.trim(),
      tags,
    });
    onClose();
  };

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
      >
        <div className="p-6">
          <h2
            id="modal-title"
            className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4"
          >
            {initial ? "Edit Book" : "Add Book"}
          </h2>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Title *
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Book title"
                autoFocus
              />
            </div>

            <div>
              <label
                htmlFor="author"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Author
              </label>
              <input
                id="author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Author name"
              />
            </div>

            <div>
              <label
                htmlFor="dateRead"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Date Read
              </label>
              <input
                id="dateRead"
                type="date"
                value={dateRead}
                onChange={(e) => setDateRead(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded ${
                      star <= rating ? "text-yellow-500" : "text-slate-300"
                    }`}
                    aria-label={`Rate ${star} stars`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="note"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Notes
              </label>
              <textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Your thoughts about this book..."
              />
            </div>

            <div>
              <label
                htmlFor="tagInput"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Tags
              </label>
              <div className="flex gap-2">
                <input
                  id="tagInput"
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Add a tag"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
                >
                  Add
                </button>
              </div>
              {tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-emerald-900 dark:hover:text-emerald-100"
                        aria-label={`Remove tag ${tag}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <div>
              {initial && onDelete && (
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("Delete this book?")) {
                      onDelete(initial.id);
                      onClose();
                    }
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              )}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

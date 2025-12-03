import React, { createContext, useContext, useState, useCallback } from "react";

type Toast = {
  id: string;
  message: string;
  actionLabel?: string;
  action?: () => void;
};

type ToastContextType = {
  push: (toast: Omit<Toast, "id">) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((toast: Omit<Toast, "id">) => {
    const id = `toast_${Date.now()}_${Math.random()}`;
    const newToast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 7000);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div
        className="fixed bottom-4 right-4 z-50 space-y-2"
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] animate-slide-in"
            role="alert"
          >
            <span className="flex-1 text-sm">{toast.message}</span>
            {toast.action && toast.actionLabel && (
              <button
                onClick={() => {
                  toast.action!();
                  dismiss(toast.id);
                }}
                className="text-emerald-400 dark:text-emerald-600 hover:text-emerald-300 dark:hover:text-emerald-700 font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded px-2 py-1"
              >
                {toast.actionLabel}
              </button>
            )}
            <button
              onClick={() => dismiss(toast.id)}
              className="text-slate-400 hover:text-white dark:hover:text-slate-900 transition-colors focus:outline-none"
              aria-label="Dismiss"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

"use client";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-center">
      <p className="mb-4 text-sm font-medium text-rose-800">
        Something went wrong loading the dashboard: {error.message}
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-rose-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-rose-700"
      >
        Try again
      </button>
    </div>
  );
}

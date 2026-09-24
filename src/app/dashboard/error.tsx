"use client";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="rounded border border-red-200 bg-red-50 p-6 text-center">
      <p className="mb-4 text-sm text-red-800">Something went wrong loading the dashboard: {error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  );
}

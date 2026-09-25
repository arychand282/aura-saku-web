export default function ExportButton({ userId }: { userId?: string }) {
  const href = (format: string) => {
    const params = new URLSearchParams({ format });
    if (userId) params.set("user_id", userId);
    return `/export?${params.toString()}`;
  };

  return (
    <div className="flex gap-2">
      <a
        href={href("csv")}
        className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-blue-300 hover:text-blue-600"
      >
        Export CSV
      </a>
      <a
        href={href("xlsx")}
        className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-blue-300 hover:text-blue-600"
      >
        Export XLSX
      </a>
    </div>
  );
}

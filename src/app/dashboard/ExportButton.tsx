export default function ExportButton({ userId }: { userId?: string }) {
  const href = (format: string) => {
    const params = new URLSearchParams({ format });
    if (userId) params.set("user_id", userId);
    return `/export?${params.toString()}`;
  };

  return (
    <div className="flex gap-2">
      <a href={href("csv")} className="rounded border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50">
        Export CSV
      </a>
      <a href={href("xlsx")} className="rounded border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50">
        Export XLSX
      </a>
    </div>
  );
}

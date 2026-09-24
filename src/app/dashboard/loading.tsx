export default function Loading() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-8 w-32 rounded bg-gray-200" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-20 rounded-lg bg-gray-200" />
        ))}
      </div>
      <div className="h-48 rounded-lg bg-gray-200" />
    </div>
  );
}

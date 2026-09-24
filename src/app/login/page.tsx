import LoginForm from "./LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow">
        <h1 className="mb-6 text-xl font-semibold text-gray-900">Aura-Saku Dashboard</h1>
        {error === "invalid_token" && (
          <p className="mb-4 text-sm text-red-600">
            That login link is invalid or has expired. Request a new one from the bot.
          </p>
        )}
        <LoginForm />
      </div>
    </main>
  );
}

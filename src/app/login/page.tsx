import LoginForm from "./LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-3xl border border-white/60 bg-white/80 p-8 shadow-2xl shadow-blue-200/50 backdrop-blur-xl">
        {/* eslint-disable-next-line @next/next/no-img-element -- static local asset, no next/image benefit */}
        <img src="/logo.png" alt="Aura-Saku" className="mx-auto mb-4 h-24 w-auto" />
        <p className="mb-6 text-center text-xs font-bold uppercase tracking-widest text-blue-500">Welcome back</p>
        {error === "invalid_token" && (
          <p className="mb-4 rounded-xl bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600">
            That login link is invalid or has expired. Request a new one from the bot.
          </p>
        )}
        <LoginForm />
      </div>
    </main>
  );
}

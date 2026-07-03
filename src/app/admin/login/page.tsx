import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { auth, signIn } from "@/auth";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await auth();
  if (session) redirect("/admin");

  const { error } = await searchParams;

  async function login(formData: FormData) {
    "use server";
    try {
      await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirectTo: "/admin",
      });
    } catch (err) {
      if (err instanceof AuthError) {
        redirect("/admin/login?error=1");
      }
      throw err;
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <form
        action={login}
        className="w-full max-w-sm rounded-2xl border border-border bg-white/[0.02] p-8"
      >
        <h1 className="font-display text-2xl font-semibold">Admin</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Connexion au panneau d&apos;administration.
        </p>

        {error && (
          <p className="mt-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
            Email ou mot de passe incorrect.
          </p>
        )}

        <div className="mt-6 flex flex-col gap-3">
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            className="w-full rounded-xl border border-border bg-white/[0.02] px-4 py-3 text-sm outline-none focus:border-lime/50"
          />
          <input
            type="password"
            name="password"
            required
            placeholder="Mot de passe"
            className="w-full rounded-xl border border-border bg-white/[0.02] px-4 py-3 text-sm outline-none focus:border-lime/50"
          />
          <button
            type="submit"
            className="mt-2 rounded-full bg-lime px-6 py-3 text-sm font-medium text-bg"
          >
            Se connecter
          </button>
        </div>
      </form>
    </div>
  );
}

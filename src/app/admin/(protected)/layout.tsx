import { redirect } from "next/navigation";
import { LogOut, ExternalLink } from "lucide-react";
import { auth, signOut } from "@/auth";
import AdminNav from "@/components/admin/AdminNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-bg text-ink">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-border p-6 sm:flex">
          <div className="font-display text-lg font-semibold">
            Admin<span className="text-lime">.</span>
          </div>

          <AdminNav />

          <div className="mt-auto flex flex-col gap-1 border-t border-border pt-4">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-ink-muted hover:bg-white/5 hover:text-ink"
            >
              <ExternalLink className="size-4" />
              Voir le site
            </a>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/admin/login" });
              }}
            >
              <button className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-ink-muted hover:bg-white/5 hover:text-ink">
                <LogOut className="size-4" />
                Déconnexion
              </button>
            </form>
          </div>
        </aside>

        <main className="flex-1 p-6 sm:p-10">
          <a
            href="/"
            className="mb-6 inline-block text-xs text-ink-muted hover:text-ink sm:hidden"
          >
            ← Voir le site
          </a>
          {children}
        </main>
      </div>
    </div>
  );
}

import { redirect } from "next/navigation";
import { LayoutDashboard, Image as ImageIcon, ListTodo, Video, FileText, LogOut } from "lucide-react";
import { auth, signOut } from "@/auth";

const navItems = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/admin/media", label: "Médiathèque", icon: ImageIcon },
  { href: "/admin/projects", label: "Boutiques", icon: ListTodo },
  { href: "/admin/videos", label: "Mur de vidéos", icon: Video },
  { href: "/admin/content", label: "Textes du site", icon: FileText },
];

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
        <aside className="hidden w-60 shrink-0 border-r border-border p-6 sm:block">
          <div className="font-display text-lg font-semibold">
            Admin<span className="text-lime">.</span>
          </div>
          <nav className="mt-8 flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-ink-muted hover:bg-white/5 hover:text-ink"
              >
                <item.icon className="size-4" />
                {item.label}
              </a>
            ))}
          </nav>

          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
            className="mt-8"
          >
            <button className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-ink-muted hover:bg-white/5 hover:text-ink">
              <LogOut className="size-4" />
              Déconnexion
            </button>
          </form>
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

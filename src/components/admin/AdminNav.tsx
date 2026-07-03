"use client";

import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Image as ImageIcon,
  ListTodo,
  Video,
  FileText,
  MessageSquareQuote,
  LayoutGrid,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/admin/media", label: "Médiathèque", icon: ImageIcon },
  { href: "/admin/projects", label: "Boutiques", icon: ListTodo },
  { href: "/admin/videos", label: "Mur de vidéos", icon: Video },
  { href: "/admin/testimonials", label: "Témoignages", icon: MessageSquareQuote },
  { href: "/admin/catalog", label: "Catalogue (univers)", icon: LayoutGrid },
  { href: "/admin/content", label: "Textes du site", icon: FileText },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="mt-8 flex flex-col gap-1">
      {navItems.map((item) => {
        const active =
          item.href === "/admin" ? pathname === "/admin" : pathname?.startsWith(item.href);

        return (
          <a
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-colors",
              active
                ? "bg-lime/10 text-lime"
                : "text-ink-muted hover:bg-white/5 hover:text-ink"
            )}
          >
            <item.icon className="size-4" />
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}

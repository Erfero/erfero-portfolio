import { Image as ImageIcon, ListTodo, Video, FileText, ArrowUpRight } from "lucide-react";

const cards = [
  {
    href: "/admin/media",
    title: "Médiathèque",
    description: "Upload et gère tes vidéos et images.",
    icon: ImageIcon,
  },
  {
    href: "/admin/projects",
    title: "Boutiques",
    description: "Ajoute, modifie ou retire une boutique du portfolio.",
    icon: ListTodo,
  },
  {
    href: "/admin/videos",
    title: "Mur de vidéos",
    description: "Gère toutes tes vidéos de réalisations, liées ou non à une boutique.",
    icon: Video,
  },
  {
    href: "/admin/content",
    title: "Textes du site",
    description: "Modifie les textes FR/EN sans toucher au code.",
    icon: FileText,
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">
        Bienvenue sur ton panneau admin
      </h1>
      <p className="mt-1 text-sm text-ink-muted">
        Gère le contenu de ton portfolio sans toucher au code.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <a
            key={card.href}
            href={card.href}
            className="group rounded-2xl border border-border bg-white/[0.02] p-6 transition-colors hover:border-lime/30"
          >
            <card.icon className="size-6 text-lime" />
            <h2 className="mt-4 flex items-center gap-1.5 font-medium">
              {card.title}
              <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
            </h2>
            <p className="mt-1 text-sm text-ink-muted">{card.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

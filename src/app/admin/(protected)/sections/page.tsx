import { getSectionsSettings } from "@/lib/content";
import SectionsManager from "@/components/admin/SectionsManager";

export default async function SectionsPage() {
  const settings = await getSectionsSettings();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Sections du site</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Active ou désactive certaines sections du site public.
      </p>

      <SectionsManager initial={settings} />
    </div>
  );
}

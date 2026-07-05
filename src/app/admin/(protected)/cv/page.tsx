import { getCvSettings } from "@/lib/content";
import CvManager from "@/components/admin/CvManager";

export default async function CvPage() {
  const settings = await getCvSettings();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">CV</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Gère le CV affiché sur le site public et décide s&apos;il est visible
        ou non.
      </p>

      <CvManager initial={settings} />
    </div>
  );
}

import { getCvSettings, getMessages } from "@/lib/content";
import CvManager from "@/components/admin/CvManager";
import type { JsonObject } from "@/components/admin/ContentEditor";

export default async function CvAdminPage() {
  const [settings, fr, en] = await Promise.all([
    getCvSettings(),
    getMessages("fr"),
    getMessages("en"),
  ]);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">CV</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Active ou désactive le lien CV, envoie un fichier de référence, et
        modifie le contenu réellement affiché sur la page CV du site.
      </p>

      <CvManager
        initialSettings={settings}
        initialCvPage={{
          fr: (fr as unknown as JsonObject).cvPage as JsonObject,
          en: (en as unknown as JsonObject).cvPage as JsonObject,
        }}
      />
    </div>
  );
}

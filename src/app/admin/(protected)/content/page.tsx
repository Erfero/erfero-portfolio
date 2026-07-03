import { getMessages } from "@/lib/content";
import ContentEditor, { type JsonObject } from "@/components/admin/ContentEditor";

export default async function ContentPage() {
  const [fr, en] = await Promise.all([getMessages("fr"), getMessages("en")]);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Textes du site</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Modifie n&apos;importe quel texte du site, en français et en anglais.
        Les changements sont visibles sur le site dans la minute qui suit
        l&apos;enregistrement.
      </p>

      <ContentEditor
        initial={{
          fr: fr as unknown as JsonObject,
          en: en as unknown as JsonObject,
        }}
      />
    </div>
  );
}

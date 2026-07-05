import { getFreelanceSettings } from "@/lib/content";
import FreelanceKit from "@/components/admin/FreelanceKit";

export default async function FreelancePage() {
  const settings = await getFreelanceSettings();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Kit freelance</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Tous les éléments prêts à copier pour postuler sur Malt, Comet, Upwork,
        Fiverr ou en direct : titre de profil, bio, lettre de motivation,
        réponses aux offres, compétences et chiffres clés.
      </p>

      <FreelanceKit initial={settings} />
    </div>
  );
}
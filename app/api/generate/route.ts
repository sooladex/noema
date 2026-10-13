import { NextResponse } from 'next/server';
import { genererCours, GeminiError, MODELE_DEFAUT } from '@/lib/gemini';
import { consume, clientKey, LIMITE } from '@/lib/ratelimit';
import type { GenerateResponse, Options } from '@/lib/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 120;

const MAX_CARACTERES = 24_000;
const MIN_CARACTERES = 40;

const NIVEAUX = [
  'Collège',
  'Lycée',
  'Licence / Cycle ingénieur',
  'Master / Expert',
  'Vulgarisation grand public',
];
const LANGUES = ['Français', 'English', 'العربية', 'Español'];
const PROFONDEURS = ['concis', 'standard', 'approfondi'] as const;

function echec(code: string, message: string, statut: number, astuce?: string) {
  return NextResponse.json<GenerateResponse>({ ok: false, code, message, astuce }, { status: statut });
}

export async function POST(req: Request) {
  let corps: any;
  try {
    corps = await req.json();
  } catch {
    return echec('CORPS_INVALIDE', 'Requête mal formée.', 400);
  }

  const texte = typeof corps?.texte === 'string' ? corps.texte.trim() : '';

  if (texte.length < MIN_CARACTERES) {
    return echec(
      'TEXTE_COURT',
      'Le texte est trop court pour en tirer un cours.',
      400,
      'Collez au moins quelques phrases décrivant les notions à enseigner.',
    );
  }
  if (texte.length > MAX_CARACTERES) {
    return echec(
      'TEXTE_LONG',
      `Le texte dépasse la limite de ${MAX_CARACTERES.toLocaleString('fr-FR')} caractères.`,
      413,
      'Découpez-le en parties et générez un cours par partie.',
    );
  }

  const options: Options = {
    niveau: NIVEAUX.includes(corps?.niveau) ? corps.niveau : NIVEAUX[2]!,
    langue: LANGUES.includes(corps?.langue) ? corps.langue : LANGUES[0]!,
    profondeur: PROFONDEURS.includes(corps?.profondeur) ? corps.profondeur : 'standard',
  };

  const cleServeur = process.env.GEMINI_API_KEY?.trim();
  const cleVisiteur = typeof corps?.cle === 'string' ? corps.cle.trim() : '';

  // Mode service : la clé du serveur est utilisée, le visiteur est soumis au quota.
  // Mode BYOK : aucune clé serveur configurée, le visiteur apporte la sienne, pas de quota.
  const mode: 'service' | 'byok' = cleServeur ? 'service' : 'byok';
  const cle = cleServeur || cleVisiteur;

  if (!cle) {
    return echec(
      'CLE_ABSENTE',
      'Ce service fonctionne actuellement avec votre propre clé Google Gemini.',
      400,
      'Créez une clé gratuite sur aistudio.google.com/apikey, puis collez-la dans le champ prévu.',
    );
  }

  let restant: number | undefined;
  if (mode === 'service') {
    const quota = consume(clientKey(req.headers));
    if (!quota.allowed) {
      const heures = Math.ceil(quota.resetIn / 3_600_000);
      return echec(
        'QUOTA_ATTEINT',
        `Vous avez utilisé vos ${LIMITE} générations gratuites.`,
        429,
        `Le compteur se remet à zéro dans environ ${heures} h. Vous pouvez aussi utiliser votre propre clé Gemini.`,
      );
    }
    restant = quota.remaining;
  }

  const modele = mode === 'service' ? MODELE_DEFAUT : (typeof corps?.modele === 'string' && corps.modele.trim()) || MODELE_DEFAUT;

  try {
    const cours = await genererCours(texte, options, cle, modele);
    return NextResponse.json<GenerateResponse>({ ok: true, cours, mode, restant });
  } catch (e) {
    if (e instanceof GeminiError) {
      const astuces: Record<string, string> = {
        CLE_REFUSEE: "Vérifiez la clé et que l'API Generative Language est activée sur le projet Google.",
        MODELE_INCONNU: 'Ce nom de modèle est indisponible. Essayez gemini-2.5-flash.',
        QUOTA_FOURNISSEUR: 'Quota Google atteint. Réessayez plus tard ou utilisez un modèle « flash ».',
        VIDE: 'Réduisez le texte source ou choisissez la profondeur « Concise ».',
        AUCUNE_NOTION: 'Le texte ne contient probablement pas de notion enseignable. Essayez un passage plus dense.',
      };
      // La clé serveur ne doit jamais fuiter dans un message d'erreur renvoyé au client.
      const message = mode === 'service' && e.code === 'CLE_REFUSEE'
        ? 'Le service de génération est momentanément indisponible.'
        : e.message;
      return echec(e.code, message, e.statut, astuces[e.code]);
    }
    return echec('INATTENDU', 'Une erreur inattendue est survenue.', 500);
  }
}

export async function GET() {
  return NextResponse.json(
    { ok: true, mode: process.env.GEMINI_API_KEY ? 'service' : 'byok', limite: LIMITE },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}

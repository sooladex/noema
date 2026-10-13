import type { Cours, Options } from './types';

export const MODELE_DEFAUT = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

export const SCHEMA = {
  type: 'OBJECT',
  properties: {
    titre: { type: 'STRING' },
    discipline: { type: 'STRING' },
    niveau: { type: 'STRING' },
    duree_lecture: { type: 'STRING' },
    accroche: { type: 'STRING' },
    prerequis: { type: 'ARRAY', items: { type: 'STRING' } },
    objectifs: { type: 'ARRAY', items: { type: 'STRING' } },
    notions: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          nom: { type: 'STRING' },
          definition: { type: 'STRING' },
          pourquoi: { type: 'STRING' },
          explication: { type: 'ARRAY', items: { type: 'STRING' } },
          analogie: { type: 'STRING' },
          exemple: {
            type: 'OBJECT',
            properties: {
              enonce: { type: 'STRING' },
              resolution: { type: 'ARRAY', items: { type: 'STRING' } },
            },
            required: ['enonce', 'resolution'],
          },
          formules: {
            type: 'ARRAY',
            items: {
              type: 'OBJECT',
              properties: { expression: { type: 'STRING' }, lecture: { type: 'STRING' } },
              required: ['expression', 'lecture'],
            },
          },
          erreurs: { type: 'ARRAY', items: { type: 'STRING' } },
          a_retenir: { type: 'ARRAY', items: { type: 'STRING' } },
          liens: { type: 'ARRAY', items: { type: 'STRING' } },
        },
        required: ['nom', 'definition', 'pourquoi', 'explication', 'analogie', 'exemple', 'erreurs', 'a_retenir'],
      },
    },
    fiches: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          notion: { type: 'STRING' },
          essentiel: { type: 'STRING' },
          points: { type: 'ARRAY', items: { type: 'STRING' } },
          vocabulaire: {
            type: 'ARRAY',
            items: {
              type: 'OBJECT',
              properties: { terme: { type: 'STRING' }, sens: { type: 'STRING' } },
              required: ['terme', 'sens'],
            },
          },
          astuce: { type: 'STRING' },
        },
        required: ['notion', 'essentiel', 'points'],
      },
    },
    resume: {
      type: 'OBJECT',
      properties: {
        en_une_phrase: { type: 'STRING' },
        synthese: { type: 'ARRAY', items: { type: 'STRING' } },
        plan: { type: 'ARRAY', items: { type: 'STRING' } },
        mots_cles: { type: 'ARRAY', items: { type: 'STRING' } },
      },
      required: ['en_une_phrase', 'synthese', 'plan', 'mots_cles'],
    },
    pour_aller_plus_loin: { type: 'ARRAY', items: { type: 'STRING' } },
  },
  required: ['titre', 'notions', 'fiches', 'resume'],
} as const;

const PROFONDEUR: Record<string, string> = {
  concis: "Sois efficace : 2 paragraphes d'explication par notion, l'essentiel sans remplissage.",
  standard: "Explique avec 3 à 4 paragraphes par notion, en construisant l'idée progressivement.",
  approfondi:
    'Explique en profondeur : 5 à 7 paragraphes par notion, avec nuances, cas limites et mise en perspective.',
};

export function construirePrompt(texte: string, o: Options): string {
  return `Tu es un professeur reconnu pour rendre limpide ce qui paraît obscur. Tu écris en ${o.langue}.

MISSION
À partir du TEXTE SOURCE ci-dessous, identifie **toutes les notions réellement citées** (concepts, définitions, mécanismes, théorèmes, méthodes, termes techniques) et rédige un COURS COMPLET qui les enseigne à quelqu'un qui les découvre.

RÈGLES
- Niveau visé : ${o.niveau}. Adapte le vocabulaire et la hauteur d'explication à ce niveau.
- ${PROFONDEUR[o.profondeur] ?? PROFONDEUR.standard}
- N'invente pas de notions absentes du texte. Si le texte est vague sur une notion, comble avec le savoir académique standard du domaine, mais reste sur les notions citées.
- Ordonne les notions de façon pédagogique : ce qui doit être compris d'abord vient d'abord.
- Chaque explication doit être auto-suffisante : le lecteur ne doit pas avoir besoin du texte source.
- Prose claire, phrases courtes, zéro jargon non défini. Chaque terme technique est expliqué à sa première apparition.
- Pour chaque notion : définition précise, raison d'être, explication progressive, analogie concrète du quotidien, exemple travaillé résolu étape par étape, erreurs fréquentes, 2 à 4 points « à retenir ».
- "formules" : uniquement si la notion en comporte. Sinon, tableau vide.
- "liens" : les autres notions du cours en relation avec celle-ci.
- Ensuite : une FICHE DE RÉVISION par notion (condensée, mémorisable) et un RÉSUMÉ général (une phrase, synthèse de 2-3 paragraphes, plan, mots-clés).
- Tu peux utiliser **gras** et *italique* dans les paragraphes. Pas de titres markdown ni de listes markdown : la structure passe par le JSON.
- Réponds UNIQUEMENT par le JSON conforme au schéma.

TEXTE SOURCE
"""
${texte}
"""`;
}

export class GeminiError extends Error {
  code: string;
  statut: number;
  constructor(code: string, message: string, statut = 502) {
    super(message);
    this.code = code;
    this.statut = statut;
  }
}

export async function genererCours(texte: string, o: Options, cle: string, modele = MODELE_DEFAUT): Promise<Cours> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modele)}:generateContent`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': cle },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: construirePrompt(texte, o) }] }],
        generationConfig: {
          temperature: 0.65,
          topP: 0.95,
          maxOutputTokens: o.profondeur === 'approfondi' ? 32768 : 16384,
          responseMimeType: 'application/json',
          responseSchema: SCHEMA,
        },
      }),
    });
  } catch {
    throw new GeminiError('RESEAU', "Le service de génération est injoignable pour le moment.", 502);
  }

  const brut = await res.text();

  if (!res.ok) {
    let message = `Erreur ${res.status}`;
    try {
      const j = JSON.parse(brut);
      message = j?.error?.message || message;
    } catch {
      /* corps non JSON : on garde le message générique */
    }
    if (res.status === 401 || res.status === 403) throw new GeminiError('CLE_REFUSEE', message, 401);
    if (res.status === 404) throw new GeminiError('MODELE_INCONNU', message, 400);
    if (res.status === 429) throw new GeminiError('QUOTA_FOURNISSEUR', message, 429);
    throw new GeminiError('FOURNISSEUR', message, 502);
  }

  let data: any;
  try {
    data = JSON.parse(brut);
  } catch {
    throw new GeminiError('REPONSE_ILLISIBLE', 'Réponse illisible du service de génération.');
  }

  const cand = data?.candidates?.[0];
  if (!cand) {
    const raison = data?.promptFeedback?.blockReason;
    throw new GeminiError(
      'BLOQUE',
      raison ? `Contenu refusé par le modèle (${raison}).` : "Le modèle n'a rien renvoyé.",
      raison ? 400 : 502,
    );
  }

  const txt: string = (cand.content?.parts || []).map((p: any) => p?.text || '').join('');
  if (!txt.trim()) {
    throw new GeminiError('VIDE', 'Réponse vide. Essayez un texte plus court ou la profondeur « Concise ».');
  }

  let obj: Cours;
  try {
    obj = JSON.parse(txt);
  } catch {
    const m = txt.match(/\{[\s\S]*\}/);
    if (!m) throw new GeminiError('JSON_INVALIDE', "Le modèle n'a pas renvoyé un JSON exploitable.");
    obj = JSON.parse(m[0]);
  }

  if (!obj || !Array.isArray(obj.notions) || obj.notions.length === 0) {
    throw new GeminiError('AUCUNE_NOTION', "Aucune notion exploitable n'a pu être extraite de ce texte.", 422);
  }

  return obj;
}

export type Formule = { expression: string; lecture: string };

export type Exemple = { enonce: string; resolution: string[] };

export type Notion = {
  nom: string;
  definition: string;
  pourquoi: string;
  explication: string[];
  analogie: string;
  exemple: Exemple;
  formules?: Formule[];
  erreurs: string[];
  a_retenir: string[];
  liens?: string[];
};

export type Fiche = {
  notion: string;
  essentiel: string;
  points: string[];
  vocabulaire?: { terme: string; sens: string }[];
  astuce?: string;
};

export type Resume = {
  en_une_phrase: string;
  synthese: string[];
  plan: string[];
  mots_cles: string[];
};

export type Cours = {
  titre: string;
  discipline?: string;
  niveau?: string;
  duree_lecture?: string;
  accroche?: string;
  prerequis?: string[];
  objectifs?: string[];
  notions: Notion[];
  fiches: Fiche[];
  resume: Resume;
  pour_aller_plus_loin?: string[];
};

export type Options = {
  niveau: string;
  profondeur: 'concis' | 'standard' | 'approfondi';
  langue: string;
};

export type GenerateResponse =
  | { ok: true; cours: Cours; mode: 'service' | 'byok'; restant?: number }
  | { ok: false; code: string; message: string; astuce?: string };

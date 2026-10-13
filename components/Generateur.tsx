'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Resultat from './Resultat';
import type { Cours, GenerateResponse } from '@/lib/types';

const EXEMPLES: Record<string, string> = {
  reseaux:
    "Le modèle OSI découpe la communication réseau en sept couches. La couche transport assure la fiabilité : TCP établit une connexion par un handshake en trois temps et retransmet les segments perdus, alors qu'UDP envoie sans garantie. L'adressage IP identifie les machines, et le masque de sous-réseau détermine quelle partie de l'adresse désigne le réseau. Le routage s'appuie sur des tables et des protocoles comme OSPF, qui calcule le plus court chemin, ou BGP entre systèmes autonomes. Le NAT permet à plusieurs machines privées de partager une adresse publique. Enfin, le DNS traduit les noms de domaine en adresses IP grâce à une hiérarchie de serveurs et un mécanisme de cache avec TTL.",
  poo:
    "La programmation orientée objet repose sur quatre piliers. L'encapsulation regroupe données et comportements dans une classe et masque l'état interne derrière une interface publique. L'héritage permet à une classe fille de réutiliser et spécialiser une classe mère, mais introduit un couplage fort, ce qui explique le principe « composition plutôt qu'héritage ». Le polymorphisme laisse un même appel produire des comportements différents selon le type réel de l'objet, via la liaison dynamique. L'abstraction expose ce qu'un objet fait sans dire comment. Autour de ces piliers gravitent les principes SOLID, notamment la responsabilité unique et l'inversion de dépendance, ainsi que des patrons comme Factory, Observer et Strategy.",
  bdd:
    "Une base de données relationnelle organise l'information en tables liées par des clés. La clé primaire identifie chaque ligne de manière unique ; la clé étrangère référence la clé primaire d'une autre table et garantit l'intégrité référentielle. La normalisation élimine la redondance : la première forme normale impose des valeurs atomiques, la deuxième supprime les dépendances partielles, la troisième les dépendances transitives. Les transactions respectent les propriétés ACID — atomicité, cohérence, isolation, durabilité — et les niveaux d'isolation arbitrent entre performance et anomalies comme les lectures fantômes. Les index, souvent des arbres B+, accélèrent les recherches au prix d'écritures plus lentes. Une jointure combine les lignes de plusieurs tables selon une condition.",
};

const ETAPES = [
  'lecture du texte…',
  'repérage des notions citées…',
  'construction du plan pédagogique…',
  'rédaction des explications…',
  'écriture des exemples et analogies…',
  'préparation des fiches de révision…',
  'synthèse finale…',
];

export default function Generateur({ mode, limite }: { mode: 'service' | 'byok'; limite: number }) {
  const [texte, setTexte] = useState('');
  const [niveau, setNiveau] = useState('Licence / Cycle ingénieur');
  const [profondeur, setProfondeur] = useState('standard');
  const [langue, setLangue] = useState('Français');
  const [cle, setCle] = useState('');
  const [enCours, setEnCours] = useState(false);
  const [etape, setEtape] = useState(ETAPES[0]!);
  const [erreur, setErreur] = useState<{ message: string; astuce?: string } | null>(null);
  const [statut, setStatut] = useState('');
  const [restant, setRestant] = useState<number | null>(null);
  const [cours, setCours] = useState<Cours | null>(null);
  const zone = useRef<HTMLTextAreaElement | null>(null);
  const resultatRef = useRef<HTMLDivElement | null>(null);

  const mots = texte.trim() ? texte.trim().split(/\s+/).length : 0;

  useEffect(() => {
    if (!enCours) return;
    let i = 0;
    setEtape(ETAPES[0]!);
    const id = window.setInterval(() => {
      i = Math.min(i + 1, ETAPES.length - 1);
      setEtape(ETAPES[i]!);
    }, 4200);
    return () => window.clearInterval(id);
  }, [enCours]);

  const generer = useCallback(async () => {
    setErreur(null);
    const t = texte.trim();
    if (t.length < 40) {
      setErreur({
        message: 'Le texte est trop court pour en tirer un cours.',
        astuce: 'Collez au moins quelques phrases, ou cliquez sur un exemple.',
      });
      zone.current?.focus();
      return;
    }
    if (mode === 'byok' && !cle.trim()) {
      setErreur({
        message: 'Ce service fonctionne actuellement avec votre propre clé Google Gemini.',
        astuce: 'Créez une clé gratuite sur aistudio.google.com/apikey, puis collez-la ci-dessus.',
      });
      return;
    }

    setEnCours(true);
    setStatut('');
    const t0 = performance.now();
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          texte: t,
          niveau,
          profondeur,
          langue,
          ...(mode === 'byok' ? { cle: cle.trim() } : {}),
        }),
      });
      const data: GenerateResponse = await res.json();
      if (!data.ok) {
        setErreur({ message: data.message, astuce: data.astuce });
        setCours(null);
      } else {
        setCours(data.cours);
        if (typeof data.restant === 'number') setRestant(data.restant);
        setStatut(
          `Cours généré en ${((performance.now() - t0) / 1000).toFixed(1)} s · ${data.cours.notions.length} notions`,
        );
        window.setTimeout(() => resultatRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
      }
    } catch {
      setErreur({
        message: 'La connexion au service a échoué.',
        astuce: 'Vérifiez votre connexion internet et réessayez.',
      });
    } finally {
      setEnCours(false);
    }
  }, [texte, niveau, profondeur, langue, cle, mode]);

  return (
    <>
      <section className="card composer" aria-label="Composer">
        <label className="lbl" htmlFor="src">
          Votre texte source
        </label>
        <textarea
          id="src"
          ref={zone}
          value={texte}
          onChange={(e) => setTexte(e.target.value)}
          onKeyDown={(e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') generer();
          }}
          placeholder="Collez ici un cours, un chapitre, un article, des notes de TD, un énoncé, un paragraphe technique… Noêma en extrait les notions et vous en fait un vrai cours."
        />

        <div className="meta-row">
          <span className="count">
            {texte.length.toLocaleString('fr-FR')} caractère{texte.length > 1 ? 's' : ''} ·{' '}
            {mots.toLocaleString('fr-FR')} mot{mots > 1 ? 's' : ''}
          </span>
          <div className="chips">
            <button className="chip" type="button" onClick={() => setTexte(EXEMPLES.reseaux!)}>
              Ex. Réseaux
            </button>
            <button className="chip" type="button" onClick={() => setTexte(EXEMPLES.poo!)}>
              Ex. POO
            </button>
            <button className="chip" type="button" onClick={() => setTexte(EXEMPLES.bdd!)}>
              Ex. Bases de données
            </button>
            <button className="chip" type="button" onClick={() => setTexte('')}>
              Vider
            </button>
          </div>
        </div>

        <div className="opts">
          <div className="field">
            <label htmlFor="niveau">Niveau</label>
            <select id="niveau" value={niveau} onChange={(e) => setNiveau(e.target.value)}>
              <option>Collège</option>
              <option>Lycée</option>
              <option>Licence / Cycle ingénieur</option>
              <option>Master / Expert</option>
              <option>Vulgarisation grand public</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="prof">Profondeur</label>
            <select id="prof" value={profondeur} onChange={(e) => setProfondeur(e.target.value)}>
              <option value="concis">Concise</option>
              <option value="standard">Standard</option>
              <option value="approfondi">Approfondie</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="langue">Langue</label>
            <select id="langue" value={langue} onChange={(e) => setLangue(e.target.value)}>
              <option>Français</option>
              <option>English</option>
              <option>العربية</option>
              <option>Español</option>
            </select>
          </div>
        </div>

        {mode === 'byok' && (
          <div className="keybar">
            <div className="field">
              <label htmlFor="cle">Clé API Google Gemini</label>
              <input
                id="cle"
                type="password"
                value={cle}
                onChange={(e) => setCle(e.target.value)}
                placeholder="AIza…"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            <p className="hint">
              Votre clé ne quitte votre navigateur que pour l’appel de génération, n’est jamais enregistrée et
              disparaît en fermant l’onglet. Créez-en une gratuitement sur{' '}
              <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer">
                aistudio.google.com/apikey
              </a>
              .
            </p>
          </div>
        )}

        <div className="actions">
          <button className="btn btn-main" onClick={generer} disabled={enCours} type="button">
            {enCours ? 'Génération…' : 'Générer le cours'}
          </button>
          <span className="status" role="status" aria-live="polite">
            {enCours && <span className="spin" aria-hidden="true" />}
            {enCours ? 'analyse des notions en cours…' : statut}
          </span>
        </div>

        {mode === 'service' && (
          <p className="quota">
            {restant === null
              ? `${limite} générations gratuites par jour, sans compte.`
              : `${restant} génération${restant > 1 ? 's' : ''} gratuite${restant > 1 ? 's' : ''} restante${restant > 1 ? 's' : ''} aujourd’hui.`}
          </p>
        )}

        {erreur && (
          <div className="err" role="alert">
            <b>{erreur.message}</b>
            {erreur.astuce && (
              <>
                <br />
                {erreur.astuce}
              </>
            )}
          </div>
        )}

        {enCours && (
          <div className="loader">
            <div className="orbit" aria-hidden="true">
              <b />
              <b />
              <b />
            </div>
            <div className="loadbar" aria-hidden="true">
              <i />
            </div>
            <p className="loadsteps">{etape}</p>
          </div>
        )}
      </section>

      <div ref={resultatRef}>
        {cours ? (
          <Resultat cours={cours} />
        ) : (
          !enCours && (
            <p className="note" style={{ marginTop: 34, textAlign: 'center' }}>
              Le cours s’affichera ici. Rien n’est enregistré : fermez l’onglet et il disparaît.
            </p>
          )
        )}
      </div>
    </>
  );
}

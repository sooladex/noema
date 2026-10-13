'use client';

import { useEffect, useState } from 'react';
import Riche from './Riche';
import type { Cours } from '@/lib/types';
import { versMarkdown, nomFichier } from '@/lib/markdown';

const arr = <T,>(v: T[] | undefined | null): T[] => (Array.isArray(v) ? v : []);

type Onglet = 'cours' | 'fiches' | 'resume';

export default function Resultat({ cours }: { cours: Cours }) {
  const [onglet, setOnglet] = useState<Onglet>('cours');
  const [actif, setActif] = useState<string>('');
  const [info, setInfo] = useState('');

  useEffect(() => {
    if (onglet !== 'cours') return;
    const sections = cours.notions.map((_, i) => document.getElementById(`n${i}`)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActif(e.target.id);
        });
      },
      { rootMargin: '-25% 0px -65% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [onglet, cours]);

  const copier = async () => {
    const md = versMarkdown(cours);
    try {
      await navigator.clipboard.writeText(md);
      setInfo('Markdown copié.');
    } catch {
      setInfo("La copie automatique a été refusée par le navigateur. Utilisez le téléchargement .md.");
    }
    window.setTimeout(() => setInfo(''), 4000);
  };

  const telecharger = () => {
    const blob = new Blob([versMarkdown(cours)], { type: 'text/markdown;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${nomFichier(cours.titre)}.md`;
    document.body.appendChild(a);
    a.click();
    window.setTimeout(() => {
      URL.revokeObjectURL(a.href);
      a.remove();
    }, 800);
  };

  const r = cours.resume;

  return (
    <section style={{ marginTop: 52 }} aria-label="Cours généré">
      <div className="res-head">
        <h2>{cours.titre}</h2>
        <div className="badges">
          {cours.discipline && <span className="badge a">{cours.discipline}</span>}
          {cours.niveau && <span className="badge b">{cours.niveau}</span>}
          <span className="badge">
            {cours.notions.length} notion{cours.notions.length > 1 ? 's' : ''}
          </span>
          {cours.duree_lecture && <span className="badge">{cours.duree_lecture}</span>}
        </div>
      </div>

      <div className="actions" style={{ marginTop: 18 }}>
        <button className="tbtn" onClick={copier} type="button">
          Copier en Markdown
        </button>
        <button className="tbtn" onClick={telecharger} type="button">
          Télécharger .md
        </button>
        <button className="tbtn" onClick={() => window.print()} type="button">
          Imprimer / PDF
        </button>
        {info && (
          <span className="note" role="status">
            {info}
          </span>
        )}
      </div>

      <div className="tabs" role="tablist" aria-label="Vues du cours">
        {([
          ['cours', 'Cours complet'],
          ['fiches', 'Fiches de révision'],
          ['resume', 'Résumé'],
        ] as [Onglet, string][]).map(([id, libelle]) => (
          <button
            key={id}
            className="tab"
            role="tab"
            type="button"
            id={`tab-${id}`}
            aria-selected={onglet === id}
            aria-controls={`pane-${id}`}
            onClick={() => setOnglet(id)}
          >
            {libelle}
          </button>
        ))}
      </div>

      {onglet === 'cours' && (
        <div className="pane" id="pane-cours" role="tabpanel" aria-labelledby="tab-cours">
          <div className="layout">
            <aside className="toc">
              <h4>Sommaire</h4>
              {cours.notions.map((n, i) => (
                <a key={i} href={`#n${i}`} style={actif === `n${i}` ? { color: '#fff', borderLeftColor: '#7c5cff' } : undefined}>
                  {i + 1}. {n.nom}
                </a>
              ))}
            </aside>

            <div>
              {(cours.accroche || arr(cours.objectifs).length > 0 || arr(cours.prerequis).length > 0) && (
                <div className="intro-block">
                  {cours.accroche && (
                    <p>
                      <Riche>{cours.accroche}</Riche>
                    </p>
                  )}
                  {arr(cours.prerequis).length > 0 && (
                    <>
                      <p className="sub" style={{ marginTop: 20 }}>
                        Prérequis
                      </p>
                      <div className="links">
                        {cours.prerequis!.map((p, i) => (
                          <span key={i}>{p}</span>
                        ))}
                      </div>
                    </>
                  )}
                  {arr(cours.objectifs).length > 0 && (
                    <>
                      <p className="sub">À la fin de ce cours, vous saurez</p>
                      <div className="goals">
                        {cours.objectifs!.map((o, i) => (
                          <div className="goal" key={i}>
                            <i aria-hidden="true">→</i>
                            <span>
                              <Riche>{o}</Riche>
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {cours.notions.map((n, i) => (
                <section className="notion" id={`n${i}`} key={i}>
                  <p className="n-num">NOTION {String(i + 1).padStart(2, '0')}</p>
                  <h3>{n.nom}</h3>

                  {n.definition && (
                    <p className="def">
                      <b>Définition —</b> <Riche>{n.definition}</Riche>
                    </p>
                  )}

                  {n.pourquoi && (
                    <>
                      <p className="sub">Pourquoi cette notion existe</p>
                      <p className="why">
                        <Riche>{n.pourquoi}</Riche>
                      </p>
                    </>
                  )}

                  {arr(n.explication).length > 0 && (
                    <>
                      <p className="sub">Explication</p>
                      {n.explication.map((p, k) => (
                        <p key={k}>
                          <Riche>{p}</Riche>
                        </p>
                      ))}
                    </>
                  )}

                  {arr(n.formules).length > 0 && (
                    <>
                      <p className="sub">Formulation</p>
                      {n.formules!.map((f, k) => (
                        <div className="formula" key={k}>
                          {f.expression}
                          <em>{f.lecture}</em>
                        </div>
                      ))}
                    </>
                  )}

                  {n.analogie && (
                    <>
                      <p className="sub">Analogie</p>
                      <p className="analogy">
                        <strong>Imaginez —</strong> <Riche>{n.analogie}</Riche>
                      </p>
                    </>
                  )}

                  {n.exemple?.enonce && (
                    <>
                      <p className="sub">Exemple travaillé</p>
                      <div className="example">
                        <p className="q">
                          <Riche>{n.exemple.enonce}</Riche>
                        </p>
                        {arr(n.exemple.resolution).length > 0 && (
                          <ol>
                            {n.exemple.resolution.map((s, k) => (
                              <li key={k}>
                                <Riche>{s}</Riche>
                              </li>
                            ))}
                          </ol>
                        )}
                      </div>
                    </>
                  )}

                  {arr(n.erreurs).length > 0 && (
                    <>
                      <p className="sub">Erreurs fréquentes</p>
                      <ul className="warn">
                        {n.erreurs.map((e, k) => (
                          <li key={k}>
                            <Riche>{e}</Riche>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {arr(n.a_retenir).length > 0 && (
                    <>
                      <p className="sub">À retenir</p>
                      <ul className="keep">
                        {n.a_retenir.map((e, k) => (
                          <li key={k}>
                            <Riche>{e}</Riche>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {arr(n.liens).length > 0 && (
                    <>
                      <p className="sub">En relation avec</p>
                      <div className="links">
                        {n.liens!.map((l, k) => (
                          <span key={k}>{l}</span>
                        ))}
                      </div>
                    </>
                  )}
                </section>
              ))}
            </div>
          </div>
        </div>
      )}

      {onglet === 'fiches' && (
        <div className="pane" id="pane-fiches" role="tabpanel" aria-labelledby="tab-fiches">
          <div className="fiches">
            {arr(cours.fiches).map((f, i) => (
              <article className="fiche" key={i}>
                <h4>{f.notion}</h4>
                {f.essentiel && (
                  <p className="ess">
                    <Riche>{f.essentiel}</Riche>
                  </p>
                )}
                {arr(f.points).length > 0 && (
                  <ul>
                    {f.points.map((p, k) => (
                      <li key={k}>
                        <Riche>{p}</Riche>
                      </li>
                    ))}
                  </ul>
                )}
                {arr(f.vocabulaire).length > 0 && (
                  <>
                    <p className="voc-t">Vocabulaire</p>
                    <div className="voc">
                      {f.vocabulaire!.map((v, k) => (
                        <div key={k}>
                          <b>{v.terme}</b> — <Riche>{v.sens}</Riche>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {f.astuce && (
                  <p className="astuce">
                    💡 <Riche>{f.astuce}</Riche>
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      )}

      {onglet === 'resume' && (
        <div className="pane" id="pane-resume" role="tabpanel" aria-labelledby="tab-resume">
          <div className="sum-grid">
            <div className="sum-body">
              {r?.en_une_phrase && (
                <p className="onephrase">
                  <Riche>{r.en_une_phrase}</Riche>
                </p>
              )}
              {arr(r?.synthese).map((p, k) => (
                <p key={k}>
                  <Riche>{p}</Riche>
                </p>
              ))}
              {arr(cours.pour_aller_plus_loin).length > 0 && (
                <div className="further">
                  <p className="sub" style={{ marginTop: 0 }}>
                    Pour aller plus loin
                  </p>
                  <ul>
                    {cours.pour_aller_plus_loin!.map((x, k) => (
                      <li key={k}>
                        <Riche>{x}</Riche>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="plan">
              <p className="sub" style={{ marginTop: 0 }}>
                Plan du cours
              </p>
              {arr(r?.plan).length > 0 ? (
                <ol>
                  {r.plan.map((p, k) => (
                    <li key={k}>{p}</li>
                  ))}
                </ol>
              ) : (
                <p className="note">—</p>
              )}
              {arr(r?.mots_cles).length > 0 && (
                <>
                  <p className="sub">Mots-clés</p>
                  <div className="kw">
                    {r.mots_cles.map((k, i) => (
                      <span key={i}>{k}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

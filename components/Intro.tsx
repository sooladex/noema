'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const MOT = 'Noêma';

export default function Intro() {
  const [parti, setParti] = useState(false);
  const fait = useRef(false);

  const entrer = useCallback(() => {
    if (fait.current) return;
    fait.current = true;
    window.dispatchEvent(new Event('noema:warp'));
    setParti(true);
    document.body.style.overflow = '';
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') entrer();
    };
    window.addEventListener('keydown', onKey);
    const t = window.setTimeout(entrer, 9000);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.clearTimeout(t);
      document.body.style.overflow = '';
    };
  }, [entrer]);

  const [cache, setCache] = useState(false);
  useEffect(() => {
    if (!parti) return;
    const t = window.setTimeout(() => setCache(true), 800);
    return () => window.clearTimeout(t);
  }, [parti]);

  if (cache) return null;

  return (
    <div id="intro" className={parti ? 'gone' : undefined} role="dialog" aria-label="Introduction">
      <div className="intro-inner">
        <p className="eyebrow">Générateur de cours</p>
        <p className="brand" aria-label={MOT}>
          {MOT.split('').map((c, i) => (
            <span key={i} aria-hidden="true" style={{ animationDelay: `${(0.32 + i * 0.085).toFixed(2)}s` }}>
              {c}
            </span>
          ))}
        </p>
        <div className="rule" aria-hidden="true" />
        <p className="tag">
          Collez un texte. Recevez un <b>cours complet</b>, des <b>fiches de révision</b> et un <b>résumé</b>.
        </p>
        <div className="intro-cta">
          <button className="enter" onClick={entrer} type="button">
            Commencer
          </button>
          <button className="skipbtn" onClick={entrer} type="button">
            passer
          </button>
        </div>
      </div>
    </div>
  );
}

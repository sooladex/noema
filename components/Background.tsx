'use client';

import { useEffect, useRef } from 'react';

type P3 = { x: number; y: number; z: number; p: number };

export default function Background() {
  const cvRef = useRef<HTMLCanvasElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cv = cvRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 0, H = 0, DPR = 1;
    const N = 170;
    const pts: P3[] = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const th = Math.PI * (3 - Math.sqrt(5)) * i;
      pts.push({ x: Math.cos(th) * r, y, z: Math.sin(th) * r, p: Math.random() * Math.PI * 2 });
    }
    const edges: [number, number, number][] = [];
    for (let i = 0; i < N; i++)
      for (let j = i + 1; j < N; j++) {
        const a = pts[i]!, b = pts[j]!;
        const d = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
        if (d < 0.4) edges.push([i, j, d]);
      }
    const dust = Array.from({ length: 220 }, () => ({
      x: (Math.random() - 0.5) * 7, y: (Math.random() - 0.5) * 5, z: (Math.random() - 0.5) * 7,
      s: Math.random() * 0.6 + 0.25, v: Math.random() * 0.0016 + 0.0004, p: 0,
    }));

    // Sur une page interne, le décor démarre directement en mode ambiant.
    const startAmbient = window.location.pathname !== '/';
    const S = {
      rot: 0, tilt: -0.28,
      camZ: startAmbient ? 7.6 : 3.35,
      glow: 1, alpha: startAmbient ? 0.38 : 1,
      mode: startAmbient ? 'ambient' : 'intro', warp: 0,
    };
    let mx = 0, my = 0, tmx = 0, tmy = 0;

    const resize = () => {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = cv.width = Math.floor(window.innerWidth * DPR);
      H = cv.height = Math.floor(window.innerHeight * DPR);
      cv.style.width = window.innerWidth + 'px';
      cv.style.height = window.innerHeight + 'px';
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const onMove = (e: MouseEvent) => {
      tmx = e.clientX / window.innerWidth - 0.5;
      tmy = e.clientY / window.innerHeight - 0.5;
      const g = glowRef.current;
      if (g) g.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const onScroll = () => {
      const bar = barRef.current;
      if (!bar) return;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = h > 0 ? `${(window.scrollY / h) * 100}%` : '0%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const proj = (p: { x: number; y: number; z: number }, rot: number, tilt: number, camZ: number, R: number) => {
      const ca = Math.cos(rot), sa = Math.sin(rot);
      const x = p.x * ca - p.z * sa;
      let z = p.x * sa + p.z * ca;
      const cb = Math.cos(tilt), sb = Math.sin(tilt);
      const y = p.y * cb - z * sb;
      z = p.y * sb + z * cb;
      const f = camZ / (camZ + z);
      return { sx: W / 2 + x * R * f + mx * 46 * DPR * f, sy: H / 2 + y * R * f + my * 30 * DPR * f, f };
    };

    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      mx += (tmx - mx) * 0.045;
      my += (tmy - my) * 0.045;

      ctx.clearRect(0, 0, W, H);
      const g = ctx.createRadialGradient(W * 0.5, H * 0.42, 0, W * 0.5, H * 0.42, Math.max(W, H) * 0.78);
      g.addColorStop(0, S.mode === 'intro' ? 'rgba(24,20,58,.55)' : 'rgba(16,16,42,.34)');
      g.addColorStop(0.55, 'rgba(8,9,20,.22)');
      g.addColorStop(1, 'rgba(4,5,10,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      if (!reduce) S.rot += (S.mode === 'intro' ? 0.00034 : 0.00013) * dt;
      const R = Math.min(W, H) * (S.mode === 'intro' ? 0.315 : 0.4);
      const A = S.alpha;

      for (const d of dust) {
        if (!reduce) d.z -= d.v * dt * (S.mode === 'intro' ? 1.6 : 0.6);
        if (d.z < -3.4) d.z = 3.4;
        const pr = proj(d, S.rot * 0.35, S.tilt * 0.5, S.camZ + 1.2, R * 1.5);
        if (pr.f <= 0) continue;
        ctx.fillStyle = `rgba(190,205,255,${Math.min(0.6, pr.f * 0.34) * A})`;
        ctx.beginPath();
        ctx.arc(pr.sx, pr.sy, d.s * pr.f * 1.5 * DPR, 0, 6.2832);
        ctx.fill();
      }

      const P = pts.map((p) => {
        p.p += 0.0012 * dt;
        return proj(p, S.rot, S.tilt, S.camZ, R);
      });

      ctx.lineWidth = (S.mode === 'intro' ? 1.05 : 0.75) * DPR * (1 + S.warp * 2.2);
      for (const [i, j, d] of edges) {
        const a = P[i]!, b = P[j]!;
        if (a.f <= 0 || b.f <= 0) continue;
        const depth = (a.f + b.f) / 2;
        const al = (0.4 - d * 0.62) * depth * A * (S.mode === 'intro' ? 1 : 0.5);
        if (al <= 0.004) continue;
        ctx.strokeStyle = `rgba(${depth > 1.05 ? '124,92,255' : '34,211,238'},${Math.min(0.62, al)})`;
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.stroke();
      }

      for (let i = 0; i < N; i++) {
        const p = P[i]!;
        if (p.f <= 0) continue;
        const tw = 0.62 + 0.38 * Math.sin(pts[i]!.p);
        const r = (1.05 + p.f * 1.15) * DPR * tw * (1 + S.warp);
        const al = Math.min(0.92, p.f * 0.55 * tw) * A;
        ctx.fillStyle = `rgba(226,232,255,${al})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, 6.2832);
        ctx.fill();
        if (p.f > 1.18 && S.glow > 0.05) {
          ctx.fillStyle = `rgba(124,92,255,${al * 0.3 * S.glow})`;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, r * 4.6, 0, 6.2832);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    // Traversée de caméra déclenchée par l'intro.
    const warp = () => {
      if (reduce) {
        S.mode = 'ambient'; S.camZ = 7.6; S.alpha = 0.38; S.glow = 0.2;
        return;
      }
      const t0 = performance.now(), z0 = S.camZ;
      const step = () => {
        const k = Math.min(1, (performance.now() - t0) / 820);
        const e = 1 - Math.pow(1 - k, 3);
        S.camZ = z0 + (1.12 - z0) * e;
        S.warp = Math.sin(k * Math.PI) * 0.9;
        S.glow = 1 + e * 1.6;
        if (k < 1) requestAnimationFrame(step);
        else {
          S.mode = 'ambient';
          S.warp = 0;
          const t1 = performance.now(), za = S.camZ;
          const step2 = () => {
            const k2 = Math.min(1, (performance.now() - t1) / 1400);
            const e2 = 1 - Math.pow(1 - k2, 3);
            S.camZ = za + (7.6 - za) * e2;
            S.alpha = 1 - 0.62 * e2;
            S.glow = 2.6 - 2.4 * e2;
            if (k2 < 1) requestAnimationFrame(step2);
          };
          step2();
        }
      };
      step();
    };
    window.addEventListener('noema:warp', warp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('noema:warp', warp);
    };
  }, []);

  return (
    <>
      <canvas id="fx" ref={cvRef} aria-hidden="true" />
      <div id="vignette" aria-hidden="true" />
      <div id="cursorGlow" ref={glowRef} aria-hidden="true" />
      <div id="progress" ref={barRef} aria-hidden="true" />
    </>
  );
}

/**
 * Limiteur de débit en mémoire, par instance serverless.
 *
 * Limite connue et assumée à ce stade : sur Vercel, chaque instance a son propre
 * compteur, donc la limite réelle est « MAX par instance active » et non globale.
 * C'est suffisant pour freiner l'abus au lancement. À remplacer par un compteur
 * partagé (Vercel KV / Upstash Redis) dès qu'il y a du trafic réel.
 */

type Bucket = { count: number; reset: number };

const buckets = new Map<string, Bucket>();
let lastSweep = Date.now();

const MAX = Number(process.env.RATE_LIMIT_MAX || 5);
const WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW || 86_400) * 1000;

function sweep(now: number) {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [k, b] of buckets) if (b.reset <= now) buckets.delete(k);
}

export function consume(key: string): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  sweep(now);

  const bucket = buckets.get(key);
  if (!bucket || bucket.reset <= now) {
    buckets.set(key, { count: 1, reset: now + WINDOW_MS });
    return { allowed: true, remaining: MAX - 1, resetIn: WINDOW_MS };
  }

  if (bucket.count >= MAX) {
    return { allowed: false, remaining: 0, resetIn: bucket.reset - now };
  }

  bucket.count += 1;
  return { allowed: true, remaining: MAX - bucket.count, resetIn: bucket.reset - now };
}

export function clientKey(headers: Headers): string {
  const fwd = headers.get('x-forwarded-for');
  const ip = fwd ? fwd.split(',')[0]!.trim() : headers.get('x-real-ip') || 'inconnu';
  return `ip:${ip}`;
}

export const LIMITE = MAX;

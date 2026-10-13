import type { Cours } from './types';

const arr = <T,>(v: T[] | undefined | null): T[] => (Array.isArray(v) ? v : []);

export function versMarkdown(d: Cours): string {
  const L: string[] = [];
  L.push(`# ${d.titre || 'Cours'}`);
  const meta = [d.discipline, d.niveau, d.duree_lecture].filter(Boolean).join(' · ');
  if (meta) L.push(`*${meta}*`);
  if (d.accroche) L.push(`\n> ${d.accroche}`);
  if (arr(d.prerequis).length) L.push(`\n**Prérequis :** ${d.prerequis!.join(' · ')}`);
  if (arr(d.objectifs).length) {
    L.push('\n## Objectifs');
    d.objectifs!.forEach((o) => L.push(`- ${o}`));
  }
  L.push('\n---\n');

  d.notions.forEach((n, i) => {
    L.push(`## ${i + 1}. ${n.nom}`);
    if (n.definition) L.push(`\n**Définition —** ${n.definition}`);
    if (n.pourquoi) L.push(`\n### Pourquoi cette notion existe\n${n.pourquoi}`);
    if (arr(n.explication).length) {
      L.push('\n### Explication');
      n.explication.forEach((p) => L.push(`\n${p}`));
    }
    if (arr(n.formules).length) {
      L.push('\n### Formulation');
      n.formules!.forEach((f) => L.push(`\n\`${f.expression}\`  \n${f.lecture}`));
    }
    if (n.analogie) L.push(`\n### Analogie\n${n.analogie}`);
    if (n.exemple?.enonce) {
      L.push(`\n### Exemple travaillé\n**${n.exemple.enonce}**`);
      arr(n.exemple.resolution).forEach((s, k) => L.push(`${k + 1}. ${s}`));
    }
    if (arr(n.erreurs).length) {
      L.push('\n### Erreurs fréquentes');
      n.erreurs.forEach((e) => L.push(`- ⚠ ${e}`));
    }
    if (arr(n.a_retenir).length) {
      L.push('\n### À retenir');
      n.a_retenir.forEach((e) => L.push(`- ✓ ${e}`));
    }
    if (arr(n.liens).length) L.push(`\n*En relation avec : ${n.liens!.join(', ')}*`);
    L.push('\n---\n');
  });

  if (arr(d.fiches).length) {
    L.push('# Fiches de révision');
    d.fiches.forEach((f) => {
      L.push(`\n## ${f.notion}`);
      if (f.essentiel) L.push(`*${f.essentiel}*`);
      arr(f.points).forEach((p) => L.push(`- ${p}`));
      if (arr(f.vocabulaire).length) {
        L.push('\n**Vocabulaire**');
        f.vocabulaire!.forEach((v) => L.push(`- **${v.terme}** — ${v.sens}`));
      }
      if (f.astuce) L.push(`\n💡 ${f.astuce}`);
    });
    L.push('\n---\n');
  }

  const r = d.resume;
  L.push('# Résumé');
  if (r?.en_une_phrase) L.push(`\n> ${r.en_une_phrase}`);
  arr(r?.synthese).forEach((p) => L.push(`\n${p}`));
  if (arr(r?.plan).length) {
    L.push('\n**Plan**');
    r.plan.forEach((p, i) => L.push(`${i + 1}. ${p}`));
  }
  if (arr(r?.mots_cles).length) L.push(`\n**Mots-clés :** ${r.mots_cles.join(' · ')}`);
  if (arr(d.pour_aller_plus_loin).length) {
    L.push('\n## Pour aller plus loin');
    d.pour_aller_plus_loin!.forEach((x) => L.push(`- ${x}`));
  }
  L.push('\n---\n*Généré avec Noêma.*');
  return L.join('\n');
}

export function nomFichier(titre: string): string {
  return (
    (titre || 'cours')
      .replace(/[^\p{L}\p{N} _-]/gu, '')
      .trim()
      .slice(0, 60)
      .replace(/\s+/g, '-')
      .toLowerCase() || 'cours'
  );
}

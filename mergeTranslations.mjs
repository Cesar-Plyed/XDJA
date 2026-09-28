// Uso (desde la raíz del frontend):
//   node mergeTranslations.mjs src/i18n/translations.json src/i18n/translations.additions.json
// Agrega SOLO las claves que faltan. Nunca sobrescribe textos que ya tienes.
import { readFileSync, writeFileSync } from 'node:fs';

const [, , targetPath, additionsPath] = process.argv;
if (!targetPath || !additionsPath) {
  console.error('Uso: node mergeTranslations.mjs <translations.json> <additions.json>');
  process.exit(1);
}

const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
let added = 0;

function merge(target, source) {
  for (const [key, value] of Object.entries(source)) {
    if (isObject(value)) {
      if (!isObject(target[key])) target[key] = {};
      merge(target[key], value);
    } else if (!(key in target)) {
      target[key] = value;
      added++;
    }
  }
}

const target = JSON.parse(readFileSync(targetPath, 'utf8'));
const additions = JSON.parse(readFileSync(additionsPath, 'utf8'));
merge(target, additions);
writeFileSync(targetPath, JSON.stringify(target, null, 2) + '\n');
console.log(`✔ ${added} claves nuevas agregadas a ${targetPath}`);

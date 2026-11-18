// Fails when es.yaml and en.yaml drift structurally (section/content counts, info keys).
// Titles are expected to differ (translated), everything else must mirror.
import { readFileSync } from 'node:fs';
import yaml from 'yaml';

const load = (file) =>
	yaml.parse(readFileSync(new URL(`./src/assets/${file}`, import.meta.url), 'utf8'));

const es = load('es.yaml');
const en = load('en.yaml');

const errors = [];

const esKeys = Object.keys(es.info).sort();
const enKeys = Object.keys(en.info).sort();
if (JSON.stringify(esKeys) !== JSON.stringify(enKeys)) {
	errors.push(`info keys differ: es=[${esKeys}] en=[${enKeys}]`);
}

if (es.sections.length !== en.sections.length) {
	errors.push(`section count differs: es=${es.sections.length} en=${en.sections.length}`);
}

const n = Math.min(es.sections.length, en.sections.length);
for (let i = 0; i < n; i++) {
	if (es.sections[i].content.length !== en.sections[i].content.length) {
		errors.push(
			`section ${i} ("${es.sections[i].title}" / "${en.sections[i].title}") content blocks differ: es=${es.sections[i].content.length} en=${en.sections[i].content.length}`,
		);
	}
}

if (errors.length > 0) {
	console.error(errors.join('\n'));
	process.exit(1);
}

console.log('i18n structure in sync');

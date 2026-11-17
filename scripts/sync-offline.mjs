import fs from 'node:fs';
import path from 'node:path';
import { ALL_STAGES } from '../src/data/stages.ts';
import {
  GUIDE_SECTIONS,
  HELP_MODAL_ITEMS,
  QUICK_START_LINES,
  VIEW_SWITCH_GUIDE,
} from '../src/data/guideData.ts';
import {
  MID1_MARKS_NOTE,
  QUESTION_BUILDS_ON,
  UNIT_METADATA,
  UNIT_ORDER,
} from '../src/utils/examView.ts';

const outDir = path.resolve(process.cwd(), 'offline-study', 'data');
fs.mkdirSync(outDir, { recursive: true });

for (const stage of ALL_STAGES) {
  const num = String(stage.id).padStart(2, '0');
  const filePath = path.join(outDir, `stage-${num}.js`);
  const payload =
    `window.QST_STAGES = window.QST_STAGES || [];\n` +
    `window.QST_STAGES.push(${JSON.stringify(stage, null, 2)});\n`;
  fs.writeFileSync(filePath, payload, 'utf8');
}

const guidePayload = `window.QST_GUIDE = ${JSON.stringify(
  {
    quickStartLines: QUICK_START_LINES,
    helpItems: HELP_MODAL_ITEMS,
    sections: GUIDE_SECTIONS,
    viewGuide: VIEW_SWITCH_GUIDE,
    examMeta: {
      unitOrder: UNIT_ORDER,
      unitMetadata: UNIT_METADATA,
      mid1Note: MID1_MARKS_NOTE,
      buildsOn: QUESTION_BUILDS_ON,
    },
  },
  null,
  2
)};\n`;
fs.writeFileSync(path.join(outDir, 'guide.js'), guidePayload, 'utf8');

console.log(`Synced ${ALL_STAGES.length} stage files + guide.js to offline-study/data/`);

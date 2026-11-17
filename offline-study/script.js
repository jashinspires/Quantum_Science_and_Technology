(function () {
  const DONE_KEY = 'qst_exam_done_v1';
  const STAR_KEY = 'qst_exam_starred_v1';
  const THEME_KEY = 'qst_theme_v1';

  const stages = (window.QST_STAGES || []).slice().sort((a, b) => a.id - b.id);
  const guide = window.QST_GUIDE || null;
  const examMeta = (guide && guide.examMeta) || {
    unitOrder: ['I', 'II', 'III', 'IV', 'V'],
    unitMetadata: {},
    buildsOn: {},
  };
  const UNIT_ORDER = examMeta.unitOrder || ['I', 'II', 'III', 'IV', 'V'];

  function parseIdToken(raw) {
    if (typeof raw === 'number') {
      return Number.isInteger(raw) && raw >= 1 ? raw : null;
    }
    if (typeof raw === 'string') {
      const trimmed = raw.trim();
      if (/^\d+$/.test(trimmed)) {
        const n = Number(trimmed);
        return Number.isInteger(n) && n >= 1 ? n : null;
      }
      if (/^\d+[a-z]+$/i.test(trimmed)) {
        const base = parseInt(trimmed, 10);
        return base >= 1 ? trimmed.toLowerCase() : null;
      }
    }
    return null;
  }

  function splitIdToken(id) {
    const m = String(id).match(/^(\d+)([a-z]*)$/i);
    if (!m) return [Number.MAX_SAFE_INTEGER, String(id)];
    return [Number(m[1]), m[2].toLowerCase()];
  }

  function compareIds(a, b) {
    const [an, as] = splitIdToken(a);
    const [bn, bs] = splitIdToken(b);
    if (an !== bn) return an - bn;
    return as.localeCompare(bs);
  }

  function loadIdList(key) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return [];
      const arr = JSON.parse(raw);
      if (!Array.isArray(arr)) return [];
      const valid = [];
      for (const entry of arr) {
        const id = parseIdToken(entry);
        if (id !== null) valid.push(id);
      }
      return Array.from(new Set(valid)).sort(compareIds);
    } catch {
      return [];
    }
  }

  function saveIdList(key, setObj) {
    try {
      localStorage.setItem(key, JSON.stringify(Array.from(setObj).sort(compareIds)));
    } catch {}
  }

  function getInitialTheme() {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored === 'dark' || stored === 'light') return stored;
    } catch {}
    return 'light';
  }

  let theme = getInitialTheme();
  let practiceMode = false;
  let revealedQuestions = new Set();
  let doneSet = new Set(loadIdList(DONE_KEY));
  let starredSet = new Set(loadIdList(STAR_KEY));
  let selectedPlanIdx = 0;
  let confirmingReset = false;

  // All/Search filter state
  let aqSearchInput = '';
  let aqMarksFilter = 'all';
  let aqOnlyPending = false;
  let aqOnlyStarred = false;

  function applyTheme(nextTheme) {
    theme = nextTheme;
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {}
    const modalBtn = document.getElementById('modal-theme-btn');
    if (modalBtn) {
      modalBtn.textContent = theme === 'dark' ? 'Light theme' : 'Dark theme';
    }
  }

  function stripHtml(str) {
    return String(str || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function escapeHtml(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function parseSourceTag(sourceTag) {
    const addedMatch = String(sourceTag || '').match(
      /^Added from attached PDF\s*·\s*Unit ([IVX]+)\s*·\s*Q(\d+)$/
    );
    if (addedMatch) {
      const unitCode = addedMatch[1];
      const bankNumber = Number(addedMatch[2]);
      return {
        examTerm: unitCode === 'I' || unitCode === 'II' ? 'Mid 1' : 'Mid 2',
        unitCode,
        kind: 'added',
        bankNumber,
        bankLabel: `PDF Short Q${bankNumber}`,
        bankDisplayPrefix: String(bankNumber),
        bankSortKey: 500 + bankNumber * 10,
      };
    }

    const match = String(sourceTag || '').match(/^(Mid [12])\s*·\s*Unit ([IVX]+)\s*·\s*(.+)$/);
    if (!match) {
      return {
        examTerm: 'Mid 1',
        unitCode: 'I',
        kind: 'mid1',
        bankNumber: 999,
        bankLabel: sourceTag || '',
        bankDisplayPrefix: String(sourceTag || ''),
        bankSortKey: 9999,
      };
    }
    const examTerm = match[1];
    const unitCode = match[2];
    const tail = match[3].trim();
    if (examTerm === 'Mid 1') {
      const qMatch = tail.match(/^Q(\d+)$/);
      const bankNumber = qMatch ? Number(qMatch[1]) : 999;
      return {
        examTerm,
        unitCode,
        kind: 'mid1',
        bankNumber,
        bankLabel: tail,
        bankDisplayPrefix: String(bankNumber),
        bankSortKey: bankNumber * 10,
      };
    }
    const shortMatch = tail.match(/^Short Q(\d+)$/);
    if (shortMatch) {
      const bankNumber = Number(shortMatch[1]);
      return {
        examTerm,
        unitCode,
        kind: 'short',
        bankNumber,
        bankLabel: tail,
        bankDisplayPrefix: String(bankNumber),
        bankSortKey: bankNumber * 10,
      };
    }
    const longMatch = tail.match(/^Long Q(\d+)\(([ab])\)$/);
    if (longMatch) {
      const bankNumber = Number(longMatch[1]);
      const subLetter = longMatch[2];
      return {
        examTerm,
        unitCode,
        kind: 'long',
        bankNumber,
        subLetter,
        bankLabel: tail,
        bankDisplayPrefix: `${bankNumber}(${subLetter})`,
        bankSortKey: 1000 + bankNumber * 10 + (subLetter === 'a' ? 1 : 2),
      };
    }
    return {
      examTerm,
      unitCode,
      kind: 'short',
      bankNumber: 999,
      bankLabel: tail,
      bankDisplayPrefix: tail,
      bankSortKey: 9999,
    };
  }

  function computeSectionPrefixMap() {
    const buckets = new Map();
    for (const stage of stages) {
      for (const q of stage.questions) {
        const parsed = parseSourceTag(q.sourceTag);
        const key = `${parsed.unitCode}-${q.marks}`;
        if (!buckets.has(key)) buckets.set(key, []);
        buckets.get(key).push({ qNum: q.number, parsed });
      }
    }
    const prefixMap = new Map();
    for (const list of buckets.values()) {
      list.sort((a, b) => a.parsed.bankSortKey - b.parsed.bankSortKey);
      const hasLong = list.some((item) => item.parsed.kind === 'long');
      if (hasLong) {
        const groupNums = Array.from(
          new Set(list.filter((i) => i.parsed.kind === 'long').map((i) => i.parsed.bankNumber))
        ).sort((a, b) => a - b);
        const groupSeq = new Map();
        groupNums.forEach((g, idx) => groupSeq.set(g, idx + 1));
        let nonLongIdx = 0;
        for (const item of list) {
          if (item.parsed.kind === 'long') {
            const seq = groupSeq.get(item.parsed.bankNumber) || item.parsed.bankNumber;
            prefixMap.set(item.qNum, `${seq}(${item.parsed.subLetter})`);
          } else {
            nonLongIdx += 1;
            prefixMap.set(item.qNum, String(nonLongIdx));
          }
        }
      } else {
        list.forEach((item, idx) => {
          prefixMap.set(item.qNum, String(idx + 1));
        });
      }
    }
    return prefixMap;
  }

  const sectionPrefixMap = computeSectionPrefixMap();
  const allQuestions = stages.flatMap((s) => s.questions);
  const totalQuestionCount = allQuestions.length;
  const twoMarkCount = allQuestions.filter((q) => q.marks === 2).length;
  const fiveMarkCount = allQuestions.filter((q) => q.marks === 5).length;

  const locationMap = new Map();
  for (const stage of stages) {
    for (const q of stage.questions) {
      const parsed = parseSourceTag(q.sourceTag);
      locationMap.set(q.number, {
        questionNumber: q.number,
        stageId: stage.id,
        stageTitle: stage.title,
        examTerm: parsed.examTerm,
        unitCode: parsed.unitCode,
        marks: q.marks,
        sectionTitle: q.marks === 2 ? '2-Mark Questions' : '5-Mark Questions',
        bankLabel: parsed.bankLabel,
        sectionNumberPrefix: sectionPrefixMap.get(q.number) || parsed.bankDisplayPrefix,
        parsed,
      });
    }
  }

  function matchesCriteria(q, query, mFilter, pendingOnly, starredOnly) {
    if (mFilter !== 'all' && q.marks !== Number(mFilter)) return false;
    if (pendingOnly && doneSet.has(q.number)) return false;
    if (starredOnly && !starredSet.has(q.number)) return false;
    const raw = String(query || '').trim().toLowerCase();
    if (!raw) return true;
    const haystack = [
      String(q.number),
      'q' + q.number,
      q.question,
      q.sourceTag,
      q.intuition,
      q.studySource || '',
      (q.rememberThese || []).join(' '),
      (q.sections || []).map((s) => (s.label || '') + ' ' + stripHtml(s.html)).join(' '),
    ]
      .join(' ')
      .toLowerCase();
    return raw.split(/\s+/).filter(Boolean).every((t) => haystack.includes(t));
  }

  function buildUnitGroups(query, mFilter, pendingOnly, starredOnly) {
    const byUnit = new Map();
    UNIT_ORDER.forEach((u) => byUnit.set(u, []));

    for (const stage of stages) {
      for (const q of stage.questions) {
        const loc = locationMap.get(q.number);
        if (!loc) continue;
        const depIds = (examMeta.buildsOn && examMeta.buildsOn[String(q.number)]) || [];
        const buildsOn = depIds.map((id) => locationMap.get(id)).filter(Boolean);
        byUnit.get(loc.unitCode).push({
          question: q,
          stageId: stage.id,
          stageTitle: stage.title,
          parsedTag: loc.parsed,
          sectionNumberPrefix: loc.sectionNumberPrefix,
          buildsOn,
        });
      }
    }

    const buildSection = (unitCode, marks, allItems, filteredItems) => {
      const shortTitle = marks === 2 ? '2-Mark Questions' : '5-Mark Questions';
      const sorted = filteredItems
        .slice()
        .sort((a, b) => a.parsedTag.bankSortKey - b.parsedTag.bankSortKey);
      const longGroupsMap = new Map();
      const ungroupedItems = [];
      for (const item of sorted) {
        if (item.parsedTag.kind === 'long') {
          const gNum = item.parsedTag.bankNumber;
          if (!longGroupsMap.has(gNum)) longGroupsMap.set(gNum, []);
          longGroupsMap.get(gNum).push(item);
        } else {
          ungroupedItems.push(item);
        }
      }
      const longGroups = Array.from(longGroupsMap.entries())
        .sort((a, b) => a[0] - b[0])
        .map(([groupNumber, questions], idx) => ({
          groupNumber,
          groupLabel: `Long Q${idx + 1}`,
          questions,
        }));

      return {
        id: `unit-${unitCode}-${marks}`,
        marks,
        title: `Unit ${unitCode} · ${shortTitle}`,
        shortTitle,
        totalInUnitForMarks: allItems.length,
        items: sorted,
        longGroups,
        ungroupedItems,
      };
    };

    const hasFilter =
      String(query || '').trim().length > 0 || mFilter !== 'all' || pendingOnly || starredOnly;

    return UNIT_ORDER.map((unitCode) => {
      const allInUnit = byUnit.get(unitCode) || [];
      const totalQuestions = allInUnit.length;
      const doneQuestions = allInUnit.filter((i) => doneSet.has(i.question.number)).length;
      const percentDone = totalQuestions ? Math.round((doneQuestions / totalQuestions) * 100) : 0;
      const matching = hasFilter
        ? allInUnit.filter((i) => matchesCriteria(i.question, query, mFilter, pendingOnly, starredOnly))
        : allInUnit;

      const meta = (examMeta.unitMetadata && examMeta.unitMetadata[unitCode]) || {
        examTerm: unitCode === 'I' || unitCode === 'II' ? 'Mid 1' : 'Mid 2',
        syllabusTitle: `Unit ${unitCode}`,
        title: `Unit ${unitCode}`,
        subtitle: '',
      };

      return {
        unitCode,
        examTerm: meta.examTerm,
        syllabusTitle: meta.syllabusTitle || meta.title,
        title: meta.title,
        subtitle: meta.subtitle,
        totalQuestions,
        doneQuestions,
        percentDone,
        twoMarkSection: buildSection(
          unitCode,
          2,
          allInUnit.filter((i) => i.question.marks === 2),
          matching.filter((i) => i.question.marks === 2)
        ),
        fiveMarkSection: buildSection(
          unitCode,
          5,
          allInUnit.filter((i) => i.question.marks === 5),
          matching.filter((i) => i.question.marks === 5)
        ),
      };
    });
  }

  function normalizeUnitCode(raw) {
    const u = String(raw || '').trim().toUpperCase();
    return UNIT_ORDER.includes(u) ? u : null;
  }

  function parseRoute(hash) {
    const raw = String(hash || '').trim();
    if (!raw || raw === '#' || raw === '#/') return { page: 'home' };
    const lower = raw.toLowerCase();
    if (lower === '#study') return { page: 'study-stages' };
    if (lower === '#units') return { page: 'units-list' };
    if (lower === '#questions') return { page: 'all', scope: 'both' };

    const withoutHash = raw.startsWith('#') ? raw.slice(1) : raw;
    const [pathPart, queryPart = ''] = withoutHash.split('?');
    const segments = pathPart.split('/').filter(Boolean);
    if (!segments.length) return { page: 'home' };

    const head = segments[0].toLowerCase();
    if (head === 'guide') return { page: 'guide' };
    if (head === 'sources') return { page: 'sources' };

    if (head === 'study') {
      if (segments.length === 1) return { page: 'study-stages' };
      const sm = segments[1].match(/^stage-(\d+)$/i);
      const stageId = sm ? Number(sm[1]) : NaN;
      if (!Number.isInteger(stageId) || stageId < 1) return { page: 'study-stages' };
      if (segments.length >= 4 && segments[2].toLowerCase() === 'q') {
        const qNum = parseIdToken(decodeURIComponent(segments[3]));
        if (qNum !== null) return { page: 'study-question', stageId, questionNumber: qNum };
      }
      return { page: 'study-stage', stageId };
    }

    if (head === 'units') {
      if (segments.length === 1) return { page: 'units-list' };
      const unitCode = normalizeUnitCode(segments[1]);
      if (!unitCode) return { page: 'units-list' };
      if (segments.length === 2) return { page: 'unit-marks', unitCode };
      const marks = segments[2] === '2' ? 2 : segments[2] === '5' ? 5 : null;
      if (!marks) return { page: 'unit-marks', unitCode };
      if (segments.length >= 5 && segments[3].toLowerCase() === 'q') {
        const qNum = parseIdToken(decodeURIComponent(segments[4]));
        if (qNum !== null) return { page: 'unit-question', unitCode, marks, questionNumber: qNum };
      }
      return { page: 'unit-questions', unitCode, marks };
    }

    if (head === 'all') {
      const params = new URLSearchParams(queryPart);
      const sp = params.get('scope');
      const scope = sp === 'study' || sp === 'units' ? sp : 'both';
      if (segments.length >= 3 && segments[1].toLowerCase() === 'q') {
        const qNum = parseIdToken(decodeURIComponent(segments[2]));
        if (qNum !== null) return { page: 'all-question', scope, questionNumber: qNum };
      }
      return { page: 'all', scope };
    }

    if (head === 'search') {
      const params = new URLSearchParams(queryPart);
      const query = params.get('q') || '';
      if (segments.length >= 3 && segments[1].toLowerCase() === 'q') {
        const qNum = parseIdToken(decodeURIComponent(segments[2]));
        if (qNum !== null) return { page: 'search-question', query, questionNumber: qNum };
      }
      return { page: 'search', query };
    }

    return { page: 'home' };
  }

  function formatRoute(r) {
    switch (r.page) {
      case 'home': return '#/';
      case 'study-stages': return '#/study';
      case 'study-stage': return `#/study/stage-${r.stageId}`;
      case 'study-question': return `#/study/stage-${r.stageId}/q/${encodeURIComponent(String(r.questionNumber))}`;
      case 'units-list': return '#/units';
      case 'unit-marks': return `#/units/${r.unitCode}`;
      case 'unit-questions': return `#/units/${r.unitCode}/${r.marks}`;
      case 'unit-question': return `#/units/${r.unitCode}/${r.marks}/q/${encodeURIComponent(String(r.questionNumber))}`;
      case 'all': return r.scope && r.scope !== 'both' ? `#/all?scope=${r.scope}` : '#/all';
      case 'all-question': {
        const b = `#/all/q/${encodeURIComponent(String(r.questionNumber))}`;
        return r.scope && r.scope !== 'both' ? `${b}?scope=${r.scope}` : b;
      }
      case 'search': return r.query && r.query.trim() ? `#/search?q=${encodeURIComponent(r.query.trim())}` : '#/search';
      case 'search-question': {
        const b = `#/search/q/${encodeURIComponent(String(r.questionNumber))}`;
        return r.query && r.query.trim() ? `${b}?q=${encodeURIComponent(r.query.trim())}` : b;
      }
      case 'guide': return '#/guide';
      case 'sources': return '#/sources';
    }
    return '#/';
  }

  function getBreadcrumbs(r) {
    const items = [{ label: 'Home', hash: '#/', current: r.page === 'home' }];
    if (r.page === 'home') return items;
    items[0].current = false;

    if (r.page === 'study-stages') {
      items.push({ label: 'Study Order', hash: '#/study', current: true });
    } else if (r.page === 'study-stage') {
      items.push({ label: 'Study Order', hash: '#/study', current: false });
      items.push({ label: `Stage ${r.stageId}`, hash: formatRoute(r), current: true });
    } else if (r.page === 'study-question') {
      items.push({ label: 'Study Order', hash: '#/study', current: false });
      items.push({ label: `Stage ${r.stageId}`, hash: `#/study/stage-${r.stageId}`, current: false });
      items.push({ label: `Q${r.questionNumber}`, hash: formatRoute(r), current: true });
    } else if (r.page === 'units-list') {
      items.push({ label: 'Unit-wise', hash: '#/units', current: true });
    } else if (r.page === 'unit-marks') {
      items.push({ label: 'Unit-wise', hash: '#/units', current: false });
      items.push({ label: `Unit ${r.unitCode}`, hash: formatRoute(r), current: true });
    } else if (r.page === 'unit-questions') {
      items.push({ label: 'Unit-wise', hash: '#/units', current: false });
      items.push({ label: `Unit ${r.unitCode}`, hash: `#/units/${r.unitCode}`, current: false });
      items.push({ label: `${r.marks} Marks`, hash: formatRoute(r), current: true });
    } else if (r.page === 'unit-question') {
      const loc = locationMap.get(r.questionNumber);
      const lbl = loc ? `#${loc.sectionNumberPrefix}` : `Q${r.questionNumber}`;
      items.push({ label: 'Unit-wise', hash: '#/units', current: false });
      items.push({ label: `Unit ${r.unitCode}`, hash: `#/units/${r.unitCode}`, current: false });
      items.push({ label: `${r.marks} Marks`, hash: `#/units/${r.unitCode}/${r.marks}`, current: false });
      items.push({ label: lbl, hash: formatRoute(r), current: true });
    } else if (r.page === 'all') {
      items.push({ label: 'All Questions', hash: formatRoute(r), current: true });
    } else if (r.page === 'all-question') {
      items.push({ label: 'All Questions', hash: formatRoute({ page: 'all', scope: r.scope }), current: false });
      items.push({ label: `Q${r.questionNumber}`, hash: formatRoute(r), current: true });
    } else if (r.page === 'search') {
      items.push({ label: 'Search', hash: formatRoute(r), current: true });
    } else if (r.page === 'search-question') {
      items.push({ label: 'Search', hash: formatRoute({ page: 'search', query: r.query }), current: false });
      items.push({ label: `Q${r.questionNumber}`, hash: formatRoute(r), current: true });
    } else if (r.page === 'guide') {
      items.push({ label: 'Start Here', hash: '#/guide', current: true });
    } else if (r.page === 'sources') {
      items.push({ label: 'Sources', hash: '#/sources', current: true });
    }
    return items;
  }

  function renderTopBar(r) {
    const bc = getBreadcrumbs(r);
    const nav = document.getElementById('topbar-breadcrumbs');
    if (nav) {
      if (bc.length <= 1) {
        nav.innerHTML = '';
      } else {
        nav.innerHTML = bc
          .slice(1)
          .map((c) => {
            const node = c.current
              ? `<span class="breadcrumb-current" aria-current="page">${escapeHtml(c.label)}</span>`
              : `<a href="${c.hash}">${escapeHtml(c.label)}</a>`;
            return `<span class="breadcrumb-sep" aria-hidden="true">›</span>${node}`;
          })
          .join('');
      }
    }

    const pracBtn = document.getElementById('practice-toggle-btn');
    if (pracBtn) {
      pracBtn.setAttribute('aria-pressed', String(practiceMode));
      pracBtn.textContent = practiceMode ? 'Practice: On' : 'Practice';
    }

    const searchEl = document.getElementById('topbar-search-input');
    if (searchEl && (r.page === 'search' || r.page === 'search-question')) {
      if (searchEl.value !== r.query) searchEl.value = r.query;
    }
  }

  function renderQuestionRowHtml(q, prefix, metaLabel, targetHash, showSourceTag) {
    const isDone = doneSet.has(q.number);
    const isStarred = starredSet.has(q.number);
    return `<div class="q-row ${isDone ? 'done' : ''}" data-question-number="${q.number}">
      <a href="${targetHash}" class="q-row-link">
        <span class="q-row-prefix">${escapeHtml(prefix)}</span>
        <div style="min-width:0;flex:1;">
          <div class="q-row-title">${escapeHtml(q.question)}</div>
          ${q.questionMathHtml || ''}
          ${(metaLabel || showSourceTag)
            ? `<div class="q-row-meta">${metaLabel ? escapeHtml(metaLabel) : ''}${metaLabel && showSourceTag ? ' · ' : ''}${showSourceTag ? escapeHtml(q.sourceTag) : ''}</div>`
            : ''}
        </div>
      </a>
      <div class="q-row-actions">
        <span class="marks-tag ${q.marks === 5 ? 'five' : ''}">${q.marks}M</span>
        <button type="button" class="btn btn-star" data-star="${q.number}" aria-pressed="${isStarred}" aria-label="Star question ${q.number}">${isStarred ? '★' : '☆'}</button>
        <button type="button" class="btn btn-done" data-done="${q.number}" aria-pressed="${isDone}" aria-label="Mark question ${q.number} as done">${isDone ? '✓ Done' : 'Done'}</button>
      </div>
    </div>`;
  }

  function renderHomeHtml() {
    const pct = totalQuestionCount ? Math.round((doneSet.size / totalQuestionCount) * 100) : 0;
    const resetBlock = !confirmingReset
      ? `<button type="button" id="home-reset-btn" class="btn btn-outline">Reset progress</button>`
      : `<span style="display:inline-flex;align-items:center;gap:8px;font-size:0.85rem;">
          <strong>Clear all ticks?</strong>
          <button type="button" id="home-reset-confirm" class="btn btn-outline" style="color:#b91c1c;">Yes, reset</button>
          <button type="button" id="home-reset-cancel" class="btn btn-outline">Cancel</button>
        </span>`;

    return `<div class="stack-lg">
      <section class="stack-sm">
        <div class="page-head" style="border-bottom:none;padding-bottom:0;">
          <h1>Quantum Science &amp; Technology</h1>
          <p>Complete exam study companion covering all ${totalQuestionCount} questions across ${stages.length} stages and ${UNIT_ORDER.length} syllabus units.</p>
        </div>
        <div class="progress-panel">
          <div class="progress-row">
            <strong>Overall progress: ${doneSet.size} / ${totalQuestionCount} done (${pct}%)</strong>
            <span style="font-size:0.88rem;color:var(--ink-muted);">${twoMarkCount} two-mark · ${fiveMarkCount} five-mark · ${starredSet.size} starred</span>
          </div>
          <div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}">
            <div class="progress-fill" style="width:${pct}%"></div>
          </div>
        </div>
      </section>

      <section class="choice-grid-2" aria-label="Choose how to browse">
        <a href="#/study" class="choice-card">
          <div class="stack-sm">
            <h2>Study Order</h2>
            <p>Learn step by step. Each topic prepares you for the next.</p>
          </div>
          <div class="choice-card-foot">
            <span>${stages.length} stages (Parts A–E) · ${totalQuestionCount} questions</span>
            <span>Open →</span>
          </div>
        </a>

        <a href="#/units" class="choice-card">
          <div class="stack-sm">
            <h2>Unit-wise</h2>
            <p>Exam view. Pick a unit, then 2-mark or 5-mark questions.</p>
          </div>
          <div class="choice-card-foot">
            <span>Units I–V (Mid 1 &amp; Mid 2) · ${totalQuestionCount} questions</span>
            <span>Open →</span>
          </div>
        </a>
      </section>

      <section class="home-secondary-row">
        <div class="home-secondary-links">
          <a href="#/all" class="text-link">Search all questions</a>
          <a href="#/guide" class="text-link" style="color:var(--ink-muted);">Start Here guide</a>
          <a href="#/sources" class="text-link" style="color:var(--ink-muted);">Sources</a>
        </div>
        <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;">
          <button type="button" id="home-theme-btn" class="btn btn-outline">${theme === 'dark' ? 'Light theme' : 'Dark theme'}</button>
          ${resetBlock}
        </div>
      </section>
    </div>`;
  }

  function renderStudyStagesHtml() {
    const parts = ['A', 'B', 'C', 'D', 'E'];
    const sectionsHtml = parts
      .map((part) => {
        const list = stages.filter((s) => s.part === part);
        if (!list.length) return '';
        const cards = list
          .map((s) => {
            const sDone = s.questions.filter((q) => doneSet.has(q.number)).length;
            const sTotal = s.questions.length;
            const pct = sTotal ? Math.round((sDone / sTotal) * 100) : 0;
            return `<a href="#/study/stage-${s.id}" class="choice-card" style="padding:20px;gap:14px;">
              <div class="stack-sm" style="gap:6px;">
                <div class="progress-row" style="font-size:0.78rem;">
                  <span style="color:var(--accent-ink);font-weight:700;">Stage ${s.id}</span>
                  <span style="color:var(--ink-subtle);">${sDone} / ${sTotal} done</span>
                </div>
                <h3 style="font-size:1.1rem;">${escapeHtml(s.title)}</h3>
                <p style="font-size:0.9rem;">${escapeHtml(s.subtitle)}</p>
              </div>
              <div class="stack-sm" style="gap:8px;">
                <div class="progress-track" style="height:6px;"><div class="progress-fill done-fill" style="width:${pct}%"></div></div>
                <div class="choice-card-foot" style="padding-top:0;border-top:none;">
                  <span style="color:var(--ink-subtle);">${sTotal} ${sTotal === 1 ? 'question' : 'questions'}</span>
                  <span>Open →</span>
                </div>
              </div>
            </a>`;
          })
          .join('');
        return `<section class="stack-sm">
          <div class="progress-row">
            <h2 style="margin:0;font-size:1.12rem;">Part ${part} · ${escapeHtml(list[0].partTitle)}</h2>
            <span style="font-size:0.8rem;color:var(--ink-subtle);">${list.length} ${list.length === 1 ? 'stage' : 'stages'}</span>
          </div>
          <div class="choice-grid-3">${cards}</div>
        </section>`;
      })
      .join('');

    return `<div class="stack-lg">
      <div class="page-head">
        <div class="progress-row">
          <div>
            <h1>Study Order</h1>
            <p>${stages.length} progressive stages under Parts A–E (${totalQuestionCount} questions total). Pick any stage to open its question list.</p>
          </div>
          <strong>${doneSet.size} / ${totalQuestionCount} done</strong>
        </div>
      </div>
      ${sectionsHtml}
    </div>`;
  }

  function renderStageQuestionsHtml(stageId) {
    const stage = stages.find((s) => s.id === stageId) || stages[0];
    const idx = stages.findIndex((s) => s.id === stage.id);
    const prevStage = idx > 0 ? stages[idx - 1] : null;
    const nextStage = idx >= 0 && idx < stages.length - 1 ? stages[idx + 1] : null;
    const sDone = stage.questions.filter((q) => doneSet.has(q.number)).length;
    const twoC = stage.questions.filter((q) => q.marks === 2).length;
    const fiveC = stage.questions.filter((q) => q.marks === 5).length;

    const rows = stage.questions
      .map((q) =>
        renderQuestionRowHtml(
          q,
          `Q${q.number}`,
          q.sourceTag,
          `#/study/stage-${stage.id}/q/${encodeURIComponent(String(q.number))}`,
          false
        )
      )
      .join('');

    return `<div class="stack-md">
      <div class="progress-row">
        <a href="#/study" class="text-link">← All stages</a>
        <div style="display:flex;gap:8px;">
          ${prevStage ? `<a href="#/study/stage-${prevStage.id}" class="btn btn-outline">← Stage ${prevStage.id}</a>` : ''}
          ${nextStage ? `<a href="#/study/stage-${nextStage.id}" class="btn btn-outline">Stage ${nextStage.id} →</a>` : ''}
        </div>
      </div>
      <div class="page-head">
        <div class="kicker">Part ${stage.part} · ${escapeHtml(stage.partTitle)} · Stage ${stage.id}</div>
        <h1>${escapeHtml(stage.title)}</h1>
        <p>${escapeHtml(stage.subtitle)}</p>
        <div style="font-size:0.82rem;color:var(--ink-subtle);margin-top:6px;">
          ${sDone} / ${stage.questions.length} done · ${twoC} two-mark · ${fiveC} five-mark
        </div>
      </div>
      <div class="list-panel">${rows}</div>
    </div>`;
  }

  function renderUnitsListHtml() {
    const unitGroups = buildUnitGroups('', 'all', false, false);
    const cards = unitGroups
      .map(
        (u) => `<a href="#/units/${u.unitCode}" class="choice-card">
          <div class="stack-sm" style="gap:8px;">
            <div class="progress-row" style="font-size:0.78rem;">
              <span style="color:var(--accent-ink);font-weight:700;">Unit ${u.unitCode} · ${escapeHtml(u.examTerm)}</span>
              <span style="color:var(--ink-subtle);">${u.doneQuestions} / ${u.totalQuestions} done</span>
            </div>
            <h2>${escapeHtml(u.syllabusTitle)}</h2>
            <p>${escapeHtml(u.subtitle)}</p>
          </div>
          <div class="stack-sm" style="gap:10px;">
            <div class="progress-track" style="height:6px;"><div class="progress-fill done-fill" style="width:${u.percentDone}%"></div></div>
            <div class="choice-card-foot" style="padding-top:10px;">
              <span style="color:var(--ink-muted);">${u.twoMarkSection.totalInUnitForMarks} × 2M · ${u.fiveMarkSection.totalInUnitForMarks} × 5M</span>
              <span>Open →</span>
            </div>
          </div>
        </a>`
      )
      .join('');

    return `<div class="stack-md">
      <div class="page-head">
        <div class="progress-row">
          <div>
            <h1>Unit-wise</h1>
            <p>Select a syllabus unit to open its 2-mark and 5-mark question sets (${totalQuestionCount} questions total).</p>
          </div>
          <strong>${doneSet.size} / ${totalQuestionCount} done</strong>
        </div>
      </div>
      <div class="choice-grid-3">${cards}</div>
    </div>`;
  }

  function renderUnitMarksPickerHtml(unitCode) {
    const unitGroups = buildUnitGroups('', 'all', false, false);
    const u = unitGroups.find((x) => x.unitCode === unitCode) || unitGroups[0];
    const twoCount = u.twoMarkSection.items.length;
    const twoDone = u.twoMarkSection.items.filter((i) => doneSet.has(i.question.number)).length;
    const fiveCount = u.fiveMarkSection.items.length;
    const fiveDone = u.fiveMarkSection.items.filter((i) => doneSet.has(i.question.number)).length;

    const twoCard = twoCount === 0
      ? `<div class="choice-card disabled" aria-disabled="true"><h2>2 Marks</h2><p>No 2-mark questions in this unit.</p></div>`
      : `<a href="#/units/${u.unitCode}/2" class="choice-card">
          <div class="stack-sm">
            <span style="font-size:0.8rem;color:var(--ink-subtle);">${twoDone} / ${twoCount} done</span>
            <h2>2 Marks</h2>
            <p>Short exam definitions, formulas, and concise 3–5 sentence answers.</p>
          </div>
          <div class="choice-card-foot"><span>${twoCount} questions</span><span>Open →</span></div>
        </a>`;

    const fiveCard = fiveCount === 0
      ? `<div class="choice-card disabled" aria-disabled="true"><h2>5 Marks</h2><p>No 5-mark questions in this unit.</p></div>`
      : `<a href="#/units/${u.unitCode}/5" class="choice-card">
          <div class="stack-sm">
            <span style="font-size:0.8rem;color:var(--ink-subtle);">${fiveDone} / ${fiveCount} done</span>
            <h2>5 Marks</h2>
            <p>Long derivations, step-by-step proofs, circuits, and worked numerical examples.</p>
          </div>
          <div class="choice-card-foot"><span>${fiveCount} questions</span><span>Open →</span></div>
        </a>`;

    return `<div class="stack-md">
      <div><a href="#/units" class="text-link">← All units</a></div>
      <div class="page-head">
        <div class="kicker">Unit ${u.unitCode} · ${escapeHtml(u.examTerm)}</div>
        <h1>${escapeHtml(u.syllabusTitle)}</h1>
        <p>${escapeHtml(u.subtitle)}</p>
        <div style="font-size:0.82rem;color:var(--ink-subtle);margin-top:6px;">${u.doneQuestions} / ${u.totalQuestions} done (${u.percentDone}%)</div>
      </div>
      <div class="choice-grid-2">${twoCard}${fiveCard}</div>
    </div>`;
  }

  function renderUnitQuestionsListHtml(unitCode, marks) {
    const unitGroups = buildUnitGroups('', 'all', false, false);
    const u = unitGroups.find((x) => x.unitCode === unitCode) || unitGroups[0];
    const sec = marks === 2 ? u.twoMarkSection : u.fiveMarkSection;
    const otherMarks = marks === 2 ? 5 : 2;
    const otherSec = otherMarks === 2 ? u.twoMarkSection : u.fiveMarkSection;
    const secDone = sec.items.filter((i) => doneSet.has(i.question.number)).length;
    const makeHash = (qNum) => `#/units/${u.unitCode}/${marks}/q/${encodeURIComponent(String(qNum))}`;

    let listHtml = '';
    if (sec.longGroups.length) {
      const ungrouped = sec.ungroupedItems.length
        ? `<div class="list-panel">${sec.ungroupedItems
            .map((i) => renderQuestionRowHtml(i.question, i.sectionNumberPrefix, `${i.parsedTag.bankLabel} · Study #${i.question.number}`, makeHash(i.question.number), false))
            .join('')}</div>`
        : '';
      const groups = sec.longGroups
        .map(
          (g) => `<section class="stack-sm" style="gap:8px;">
            <div style="font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:var(--ink-subtle);">${escapeHtml(g.groupLabel)} · Sub-questions (a) and (b)</div>
            <div class="list-panel">${g.questions
              .map((i) => renderQuestionRowHtml(i.question, i.sectionNumberPrefix, `${i.parsedTag.bankLabel} · Study #${i.question.number}`, makeHash(i.question.number), false))
              .join('')}</div>
          </section>`
        )
        .join('');
      listHtml = `<div class="stack-md">${ungrouped}${groups}</div>`;
    } else {
      listHtml = `<div class="list-panel">${sec.items
        .map((i) => renderQuestionRowHtml(i.question, i.sectionNumberPrefix, `${i.parsedTag.bankLabel} · Study #${i.question.number}`, makeHash(i.question.number), false))
        .join('')}</div>`;
    }

    return `<div class="stack-md">
      <div class="progress-row">
        <a href="#/units/${u.unitCode}" class="text-link">← Unit ${u.unitCode}</a>
        ${otherSec.items.length ? `<a href="#/units/${u.unitCode}/${otherMarks}" class="btn btn-outline">Switch to ${otherMarks} Marks (${otherSec.items.length})</a>` : ''}
      </div>
      <div class="page-head">
        <div class="kicker">Unit ${u.unitCode} · ${escapeHtml(u.examTerm)}</div>
        <h1>${escapeHtml(u.syllabusTitle)} — ${marks} Marks</h1>
        <p>${secDone} / ${sec.items.length} done · Sequentially numbered starting from 1</p>
      </div>
      ${listHtml}
    </div>`;
  }

  function resolveQuestionContext(r) {
    let list = [];
    let backToListHash = '#/';
    const unitGroupsAll = buildUnitGroups('', 'all', false, false);

    if (r.page === 'study-question') {
      const stage = stages.find((s) => s.id === r.stageId);
      if (stage) {
        list = stage.questions.map((q) => ({
          question: q,
          stageId: stage.id,
          displayPrefix: String(q.number),
          metaLabel: `Question ${q.number}`,
          targetHash: `#/study/stage-${stage.id}/q/${encodeURIComponent(String(q.number))}`,
        }));
        backToListHash = `#/study/stage-${stage.id}`;
      }
    } else if (r.page === 'unit-question') {
      const ug = unitGroupsAll.find((u) => u.unitCode === r.unitCode);
      if (ug) {
        const sec = r.marks === 2 ? ug.twoMarkSection : ug.fiveMarkSection;
        list = sec.items.map((item) => ({
          question: item.question,
          stageId: item.stageId,
          displayPrefix: item.sectionNumberPrefix,
          metaLabel: item.parsedTag.bankLabel,
          targetHash: `#/units/${ug.unitCode}/${r.marks}/q/${encodeURIComponent(String(item.question.number))}`,
        }));
        backToListHash = `#/units/${ug.unitCode}/${r.marks}`;
      }
    } else if (r.page === 'all-question') {
      backToListHash = formatRoute({ page: 'all', scope: r.scope });
      if (r.scope === 'units') {
        for (const u of unitGroupsAll) {
          for (const sec of [u.twoMarkSection, u.fiveMarkSection]) {
            for (const item of sec.items) {
              list.push({
                question: item.question,
                stageId: item.stageId,
                displayPrefix: String(item.question.number),
                metaLabel: item.parsedTag.bankLabel,
                targetHash: formatRoute({ page: 'all-question', scope: 'units', questionNumber: item.question.number }),
              });
            }
          }
        }
      } else {
        for (const s of stages) {
          for (const q of s.questions) {
            list.push({
              question: q,
              stageId: s.id,
              displayPrefix: String(q.number),
              metaLabel: `Stage ${s.id} · Question ${q.number}`,
              targetHash: formatRoute({ page: 'all-question', scope: r.scope, questionNumber: q.number }),
            });
          }
        }
      }
    } else if (r.page === 'search-question') {
      backToListHash = formatRoute({ page: 'search', query: r.query });
      for (const s of stages) {
        for (const q of s.questions) {
          if (matchesCriteria(q, r.query, 'all', false, false)) {
            list.push({
              question: q,
              stageId: s.id,
              displayPrefix: String(q.number),
              metaLabel: `Stage ${s.id} · Question ${q.number}`,
              targetHash: formatRoute({ page: 'search-question', query: r.query, questionNumber: q.number }),
            });
          }
        }
      }
    }

    let idx = list.findIndex((i) => i.question.number === r.questionNumber);
    if (idx === -1) {
      list = stages.flatMap((s) =>
        s.questions.map((q) => ({
          question: q,
          stageId: s.id,
          displayPrefix: String(q.number),
          metaLabel: `Stage ${s.id} · Question ${q.number}`,
          targetHash: `#/study/stage-${s.id}/q/${encodeURIComponent(String(q.number))}`,
        }))
      );
      idx = list.findIndex((i) => i.question.number === r.questionNumber);
    }
    if (idx === -1) return null;

    const current = list[idx];
    const depIds = (examMeta.buildsOn && examMeta.buildsOn[String(current.question.number)]) || [];
    const buildsOn = depIds.map((id) => locationMap.get(id)).filter(Boolean);

    return {
      question: current.question,
      stageId: current.stageId,
      displayPrefix: current.displayPrefix,
      metaLabel: current.metaLabel,
      backToListHash,
      prev: idx > 0 ? list[idx - 1] : null,
      next: idx < list.length - 1 ? list[idx + 1] : null,
      listIndex: idx,
      listTotal: list.length,
      buildsOn,
    };
  }

  function renderNavStripHtml(ctx, isBottom) {
    const prevEl = ctx.prev
      ? `<a href="${ctx.prev.targetHash}" class="btn btn-outline">← Previous</a>`
      : `<span class="btn btn-outline" aria-disabled="true" style="opacity:0.45;cursor:not-allowed;">← Previous</span>`;
    const nextEl = ctx.next
      ? `<a href="${ctx.next.targetHash}" class="btn btn-outline">Next →</a>`
      : `<span class="btn btn-outline" aria-disabled="true" style="opacity:0.45;cursor:not-allowed;">Next →</span>`;

    return `<div class="reader-nav-strip ${isBottom ? 'bottom' : ''}">
      <a href="${ctx.backToListHash}" class="text-link">← Back to list</a>
      <div class="reader-nav-controls">
        <span class="reader-pos">${ctx.listIndex + 1} / ${ctx.listTotal}</span>
        ${prevEl}
        ${nextEl}
      </div>
    </div>`;
  }

  function renderQuestionReaderHtml(r) {
    const ctx = resolveQuestionContext(r);
    if (!ctx) return renderHomeHtml();

    const q = ctx.question;
    const isDone = doneSet.has(q.number);
    const isStarred = starredSet.has(q.number);
    const showAns = !practiceMode || revealedQuestions.has(q.number);

    const images = [];
    const proseHtml = q.sections
      .map((sec) => {
        if (sec.image) images.push(sec.image);
        const label = sec.label ? `<h3 class="answer-section-title">${escapeHtml(sec.label)}</h3>` : '';
        return `<div>${label}${sec.html}</div>`;
      })
      .join('');

    const figuresHtml = images.length
      ? `<aside class="answer-figures-col" aria-label="Diagrams">${images
          .map(
            (img, idx) => `<figure class="figure-card">
              <button type="button" class="figure-btn" data-open-lightbox="${idx}" aria-label="Enlarge diagram: ${escapeHtml(img.caption)}">
                <img src="images/${escapeHtml(img.file)}" alt="${escapeHtml(img.caption)}" class="figure-img-capped" />
                <span class="figure-zoom-hint">Click to view full size</span>
              </button>
              <figcaption class="figure-caption"><strong>${escapeHtml(img.caption)}</strong></figcaption>
            </figure>`
          )
          .join('')}</aside>`
      : '';

    const remHtml = (q.rememberThese || []).map((item) => `<li>${item}</li>`).join('');

    const bodyHtml = !showAns
      ? `<div class="practice-panel">
          <span style="color:var(--ink-muted);">Practice mode active — try recalling this answer from memory first.</span>
          <button type="button" class="btn btn-primary" data-reveal="${q.number}">Show answer</button>
        </div>`
      : `<div class="stack-md">
          ${practiceMode ? `<div style="text-align:right;"><button type="button" class="text-link" style="background:none;border:none;cursor:pointer;" data-reveal="${q.number}">Hide answer</button></div>` : ''}
          <section class="understand-box">
            <h2 class="section-label">Understand it</h2>
            <p>${escapeHtml(q.intuition)}</p>
          </section>
          <section>
            <h2 class="answer-section-heading">Answer</h2>
            <div class="answer-split-layout ${images.length ? 'has-figures' : ''}">
              <div class="answer-prose">${proseHtml}</div>
              ${figuresHtml}
            </div>
          </section>
          <section class="remember-box">
            <h2 class="section-label">Remember</h2>
            <ul>${remHtml}</ul>
          </section>
        </div>`;

    const depsHtml = ctx.buildsOn.length
      ? `<div style="display:flex;flex-wrap:wrap;align-items:center;gap:6px;">
          <strong>Builds on:</strong>
          ${ctx.buildsOn
            .map(
              (dep, idx) =>
                `<a href="#/units/${dep.unitCode}/${dep.marks}/q/${encodeURIComponent(String(dep.questionNumber))}" class="text-link" style="font-size:0.86rem;">Unit ${dep.unitCode} · ${dep.marks === 2 ? '2M' : '5M'} #${escapeHtml(dep.sectionNumberPrefix)}</a>${idx < ctx.buildsOn.length - 1 ? '<span>·</span>' : ''}`
            )
            .join('')}
        </div>`
      : '';

    return {
      images,
      html: `<article class="stack-md" data-question-number="${q.number}">
        ${renderNavStripHtml(ctx, false)}
        <header class="reader-header">
          <div class="reader-header-top">
            <div class="reader-meta-line">
              <strong>${escapeHtml(ctx.metaLabel)}</strong>
              <span>·</span>
              <span>${escapeHtml(q.sourceTag)}</span>
              <span>·</span>
              <span class="marks-tag ${q.marks === 5 ? 'five' : ''}">${q.marks} marks</span>
            </div>
            <div style="display:flex;gap:8px;flex-shrink:0;">
              <button type="button" class="btn btn-star" data-star="${q.number}" aria-pressed="${isStarred}">${isStarred ? '★ Starred' : '☆ Star'}</button>
              <button type="button" class="btn btn-done" data-done="${q.number}" aria-pressed="${isDone}">${isDone ? '✓ Done' : 'Mark done'}</button>
            </div>
          </div>
          <h1 class="reader-question-h1">${escapeHtml(ctx.displayPrefix)}. ${escapeHtml(q.question)}</h1>
          ${q.questionMathHtml || ''}
          ${q.orderNote ? `<p class="q-order-note">${escapeHtml(q.orderNote)}</p>` : ''}
        </header>
        ${bodyHtml}
        <div class="reader-cross-links">
          <a href="#/study/stage-${ctx.stageId}/q/${encodeURIComponent(String(q.number))}" class="text-link">Study order: #${q.number} · Stage ${ctx.stageId} ↗</a>
          ${depsHtml}
        </div>
        ${renderNavStripHtml(ctx, true)}
      </article>`,
    };
  }

  function renderAllOrSearchHtml(r) {
    const isSearch = r.page === 'search';
    const query = isSearch ? r.query : aqSearchInput;
    const scope = r.scope || 'both';
    const makeTargetHash = (qNum) =>
      isSearch
        ? formatRoute({ page: 'search-question', query, questionNumber: qNum })
        : formatRoute({ page: 'all-question', scope, questionNumber: qNum });

    const scopeTabs = !isSearch
      ? `<div class="filter-tabs" role="group" aria-label="Choose list scope">
          <button type="button" class="tab-btn ${scope === 'both' ? 'active' : ''}" data-aq-scope="both">Study Order + Unit-wise</button>
          <button type="button" class="tab-btn ${scope === 'study' ? 'active' : ''}" data-aq-scope="study">Study Order (${totalQuestionCount})</button>
          <button type="button" class="tab-btn ${scope === 'units' ? 'active' : ''}" data-aq-scope="units">Unit-wise (${totalQuestionCount})</button>
        </div>`
      : '';

    const markTabs = `<div class="filter-tabs" role="group" aria-label="Filter by marks">
      ${['all', '2', '5']
        .map(
          (m) =>
            `<button type="button" class="tab-btn ${aqMarksFilter === m ? 'active' : ''}" data-aq-mark="${m}">${m === 'all' ? 'All marks' : `${m}-mark`}</button>`
        )
        .join('')}
    </div>`;

    let resultsHtml = '';
    if (isSearch) {
      const items = [];
      for (const s of stages) {
        for (const q of s.questions) {
          if (matchesCriteria(q, query, aqMarksFilter, aqOnlyPending, aqOnlyStarred)) {
            items.push({ q, stageId: s.id });
          }
        }
      }
      resultsHtml = items.length
        ? `<div class="list-panel">${items
            .map((i) => renderQuestionRowHtml(i.q, `Q${i.q.number}`, `Stage ${i.stageId} · Question ${i.q.number}`, makeTargetHash(i.q.number), true))
            .join('')}</div>`
        : `<div class="guide-card"><p>No questions matched your search.</p></div>`;
    } else {
      const studyBlocks =
        scope === 'both' || scope === 'study'
          ? `<section class="stack-md">
              <h2 style="margin:0;font-size:1.25rem;">Study Order</h2>
              ${stages
                .map((s) => {
                  const qs = s.questions.filter((q) =>
                    matchesCriteria(q, query, aqMarksFilter, aqOnlyPending, aqOnlyStarred)
                  );
                  if (!qs.length) return '';
                  return `<div class="stack-sm" style="gap:8px;">
                    <div style="font-size:0.9rem;font-weight:700;">Part ${s.part} · Stage ${s.id}. ${escapeHtml(s.title)}</div>
                    <div class="list-panel">${qs
                      .map((q) => renderQuestionRowHtml(q, `Q${q.number}`, '', makeTargetHash(q.number), true))
                      .join('')}</div>
                  </div>`;
                })
                .join('')}
            </section>`
          : '';

      const unitGroups = buildUnitGroups(query, aqMarksFilter, aqOnlyPending, aqOnlyStarred);
      const unitBlocks =
        scope === 'both' || scope === 'units'
          ? `<section class="stack-md">
              <h2 style="margin:0;font-size:1.25rem;">Unit-wise</h2>
              ${unitGroups
                .map((u) => {
                  const sections = [
                    aqMarksFilter !== '5' ? u.twoMarkSection : null,
                    aqMarksFilter !== '2' ? u.fiveMarkSection : null,
                  ].filter((sec) => sec && sec.items.length > 0);
                  if (!sections.length) return '';
                  return sections
                    .map(
                      (sec) => `<div class="stack-sm" style="gap:8px;">
                        <div style="font-size:0.9rem;font-weight:700;">${escapeHtml(sec.title)} (${sec.items.length})</div>
                        <div class="list-panel">${sec.items
                          .map((item) =>
                            renderQuestionRowHtml(
                              item.question,
                              item.sectionNumberPrefix,
                              item.parsedTag.bankLabel,
                              makeTargetHash(item.question.number),
                              true
                            )
                          )
                          .join('')}</div>
                      </div>`
                    )
                    .join('');
                })
                .join('')}
            </section>`
          : '';

      resultsHtml = `<div class="stack-lg">${studyBlocks}${unitBlocks}</div>`;
    }

    const heading = isSearch
      ? query.trim()
        ? `Search: “${escapeHtml(query.trim())}”`
        : 'Search Questions'
      : `All Questions (${totalQuestionCount})`;

    return `<div class="stack-md">
      <div class="progress-row">
        <a href="#/" class="text-link">← Home</a>
        ${scopeTabs}
      </div>
      <div class="page-head">
        <h1>${heading}</h1>
        <p>${isSearch ? 'Matching questions across prompts, answers, formulas, and tags. Click any row to open its full answer.' : 'Every question across the bank in exact wording—click any question to open its full answer.'}</p>
        <div class="filter-bar">
          ${!isSearch ? `<input type="search" id="aq-local-search" value="${escapeHtml(aqSearchInput)}" placeholder="Filter questions by keyword, Q#, or tag..." aria-label="Filter all questions" />` : ''}
          ${markTabs}
          <button type="button" id="aq-star-filter" class="btn btn-star" aria-pressed="${aqOnlyStarred}">★ Starred (${starredSet.size})</button>
          <button type="button" id="aq-pending-filter" class="btn btn-outline" aria-pressed="${aqOnlyPending}">Hide done</button>
        </div>
      </div>
      ${resultsHtml}
    </div>`;
  }

  function renderGuideHtml(mode) {
    if (!guide || !guide.sections) return '';
    const g = guide.sections;
    const isSourcesOnly = mode === 'sources';
    const plan = g.part2HowToStudy.studyPlans[selectedPlanIdx] || g.part2HowToStudy.studyPlans[0];
    const vg = guide.viewGuide;

    let html = `<div class="stack-md">
      <div class="progress-row">
        <a href="#/" class="text-link">← Home</a>
        <div class="filter-tabs">
          <a href="#/guide" class="tab-btn ${!isSourcesOnly ? 'active' : ''}">Start Here Guide</a>
          <a href="#/sources" class="tab-btn ${isSourcesOnly ? 'active' : ''}">Sources &amp; Coverage</a>
        </div>
      </div>
      <div class="page-head">
        <h1>${isSourcesOnly ? 'Sources, Note Coverage &amp; Diagram Map' : 'Start Here — Complete Study Guide'}</h1>
        <p>${isSourcesOnly
          ? 'Exact mapping from your 5 unit folders, the attached Unit I–V answer booklet, textbook supplements, note differences, and uncovered syllabus topics.'
          : 'Everything you need to know about how this site works, how to study for tomorrow’s QST exam, time plans, sources, and exam-writing rules.'}</p>
        ${!isSourcesOnly ? `<div class="guide-anchors">
          <a class="guide-anchor-pill" href="#off-part-views">Two Views Guide</a>
          <a class="guide-anchor-pill" href="#off-part-1">1. What this site is</a>
          <a class="guide-anchor-pill" href="#off-part-2">2. How to study</a>
          <a class="guide-anchor-pill" href="#off-part-3">3. App controls</a>
          <a class="guide-anchor-pill" href="#off-part-4">4. Sources</a>
          <a class="guide-anchor-pill" href="#off-part-5">5. Not covered</a>
          <a class="guide-anchor-pill" href="#off-part-6">6. Writing answers</a>
        </div>` : ''}
      </div>`;

    if (!isSourcesOnly && vg) {
      html += `<section class="guide-card" id="off-part-views" style="background:var(--accent-soft);border-color:var(--accent-border);">
        <h2>${escapeHtml(vg.heading)}</h2>
        <ul>${(vg.lines || []).map((l) => `<li>${escapeHtml(l)}</li>`).join('')}</ul>
      </section>`;
    }

    if (!isSourcesOnly) {
      html += `<section class="guide-card" id="off-part-1">
        <h2>${escapeHtml(g.part1WhatThisIs.heading)}</h2>
        <ul>${g.part1WhatThisIs.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('')}</ul>
      </section>`;

      html += `<section class="guide-card" id="off-part-2">
        <h2>${escapeHtml(g.part2HowToStudy.heading)}</h2>
        <strong>5-Step Routine Per Question</strong>
        <ol>${g.part2HowToStudy.routineSteps.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}</ol>
        <div class="guide-grid">
          <div class="guide-subbox">
            <h3>2-Mark vs. 5-Mark Practice</h3>
            <p>${escapeHtml(g.part2HowToStudy.shortVsLong)}</p>
          </div>
          <div class="guide-subbox" style="background:var(--accent-soft);">
            <h3>Twin Questions Shortcut</h3>
            <p>${escapeHtml(g.part2HowToStudy.twinQuestionsNote)}</p>
          </div>
        </div>
        <div class="guide-subbox">
          <h3>What to Memorize by Heart (Understand WHY First)</h3>
          <p style="margin-bottom:8px;"><strong>Core Principle:</strong> ${escapeHtml(g.part2HowToStudy.memorizeMustKnow.understandWhyRule)}</p>
          <strong style="font-size:0.8rem;">Key Formulas &amp; Numbers</strong>
          <ul>${g.part2HowToStudy.memorizeMustKnow.formulas.map((f) => `<li style="font-family:var(--font-mono);font-size:0.82rem;">${escapeHtml(f)}</li>`).join('')}</ul>
          <strong style="font-size:0.8rem;display:block;margin-top:8px;">Circuits &amp; Diagrams to Sketch on Paper</strong>
          <ul>${g.part2HowToStudy.memorizeMustKnow.circuitsAndDiagrams.map((c) => `<li>${escapeHtml(c)}</li>`).join('')}</ul>
        </div>
        <div>
          <div class="progress-row" style="margin-bottom:8px;">
            <strong>Realistic Study Time Plans</strong>
            <div class="filter-tabs">
              ${['12-Hour Plan', '10-Hour Plan', '5-Hour Crash']
                .map((lbl, idx) => `<button type="button" class="tab-btn ${selectedPlanIdx === idx ? 'active' : ''}" data-plan-idx="${idx}">${lbl}</button>`)
                .join('')}
            </div>
          </div>
          <div class="guide-subbox">
            <h3>${escapeHtml(plan.name)}</h3>
            <p style="margin-bottom:6px;">${escapeHtml(plan.summary)}</p>
            <ul>${plan.blocks.map((blk) => `<li>${escapeHtml(blk)}</li>`).join('')}</ul>
          </div>
        </div>
      </section>`;

      html += `<section class="guide-card" id="off-part-3">
        <h2>${escapeHtml(g.part3HowToUseApp.heading)}</h2>
        <div class="guide-grid">
          ${g.part3HowToUseApp.features
            .map((f) => `<div class="guide-subbox"><h3>${escapeHtml(f.name)}</h3><p>${escapeHtml(f.detail)}</p></div>`)
            .join('')}
        </div>
      </section>`;
    }

    html += `<section class="guide-card" id="off-part-4">
      <h2>${escapeHtml(g.part4Sources.heading)}</h2>
      <p>${escapeHtml(g.part4Sources.overview)}</p>
      <div class="amber-box"><strong>Textbook Supplements:</strong> ${escapeHtml(g.part4Sources.textbookQuestionNumbers)}</div>
      <div style="overflow-x:auto;">
        <table class="q-table">
          <thead><tr><th>Stage</th><th>Qs</th><th>Class Note Files Used</th><th>Notes &amp; Supplements</th></tr></thead>
          <tbody>
            ${g.part4Sources.stageSources
              .map(
                (row) => `<tr>
                  <td><a href="#/study/stage-${row.stageId}" class="text-link" style="font-size:0.86rem;">Stage ${row.stageId}: ${escapeHtml(row.title)}</a></td>
                  <td style="white-space:nowrap;font-family:var(--font-mono);font-size:0.8rem;">${escapeHtml(row.questionRange)}</td>
                  <td style="font-size:0.8rem;">${escapeHtml(row.primaryFiles)}</td>
                  <td style="font-size:0.8rem;color:var(--ink-muted);">${escapeHtml(row.supplementalNotes)}</td>
                </tr>`
              )
              .join('')}
          </tbody>
        </table>
      </div>
      <strong>Verified Differences Across Class Note Files</strong>
      ${g.part4Sources.disagreements
        .map(
          (d) => `<div class="guide-subbox">
            <h3>${escapeHtml(d.topic)}</h3>
            <p>${escapeHtml(d.difference)}</p>
            <p style="margin-top:4px;color:var(--accent-ink);"><strong>Handled here:</strong> ${escapeHtml(d.howHandled)}</p>
          </div>`
        )
        .join('')}
      <strong>Why Some Questions Have No Diagram Image</strong>
      <p>${escapeHtml(g.part4Sources.missingDiagramsSummary)}</p>
      <div class="guide-grid">
        ${g.part4Sources.missingDiagramGroups
          .map(
            (mg) => `<div class="guide-subbox">
              <h3>${escapeHtml(mg.category)}</h3>
              <div style="font-family:var(--font-mono);font-size:0.78rem;color:var(--accent-ink);margin-bottom:4px;">${escapeHtml(mg.questions)}</div>
              <p>${escapeHtml(mg.reason)}</p>
            </div>`
          )
          .join('')}
      </div>
    </section>`;

    html += `<section class="guide-card" id="off-part-5">
      <h2>${escapeHtml(g.part5Uncovered.heading)}</h2>
      <p>${escapeHtml(g.part5Uncovered.intro)}</p>
      ${g.part5Uncovered.units
        .map(
          (u) => `<div class="guide-subbox"><h3>${escapeHtml(u.unit)}</h3><ul>${u.topicsNotInQuestions.map((t) => `<li>${escapeHtml(t)}</li>`).join('')}</ul></div>`
        )
        .join('')}
    </section>`;

    if (!isSourcesOnly) {
      html += `<section class="guide-card" id="off-part-6">
        <h2>${escapeHtml(g.part6ExamWriting.heading)}</h2>
        <ul>${g.part6ExamWriting.tips.map((t) => `<li>${escapeHtml(t)}</li>`).join('')}</ul>
        <div><a href="#/study/stage-1" class="btn btn-primary">Start Studying Stage 1 Now</a></div>
      </section>`;
    }

    html += `</div>`;
    return html;
  }

  function openLightbox(img) {
    const modal = document.getElementById('lightbox-modal');
    const cap = document.getElementById('lightbox-caption');
    const el = document.getElementById('lightbox-img');
    if (!modal || !cap || !el || !img) return;
    cap.textContent = img.caption || '';
    el.setAttribute('src', `images/${img.file}`);
    el.setAttribute('alt', img.caption || '');
    modal.hidden = false;
  }

  function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    if (modal) modal.hidden = true;
  }

  function bindDynamicEvents(rootEl, currentRoute, readerImages) {
    rootEl.querySelectorAll('[data-done]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const num = parseIdToken(btn.getAttribute('data-done'));
        if (num === null) return;
        if (doneSet.has(num)) doneSet.delete(num);
        else doneSet.add(num);
        saveIdList(DONE_KEY, doneSet);
        renderCurrentRoute();
      });
    });

    rootEl.querySelectorAll('[data-star]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const num = parseIdToken(btn.getAttribute('data-star'));
        if (num === null) return;
        if (starredSet.has(num)) starredSet.delete(num);
        else starredSet.add(num);
        saveIdList(STAR_KEY, starredSet);
        renderCurrentRoute();
      });
    });

    rootEl.querySelectorAll('[data-reveal]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const num = parseIdToken(btn.getAttribute('data-reveal'));
        if (num === null) return;
        if (revealedQuestions.has(num)) revealedQuestions.delete(num);
        else revealedQuestions.add(num);
        renderCurrentRoute();
      });
    });

    rootEl.querySelectorAll('[data-open-lightbox]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.getAttribute('data-open-lightbox'));
        if (readerImages && readerImages[idx]) openLightbox(readerImages[idx]);
      });
    });

    document.getElementById('home-theme-btn')?.addEventListener('click', () => {
      applyTheme(theme === 'dark' ? 'light' : 'dark');
      renderCurrentRoute();
    });

    document.getElementById('home-reset-btn')?.addEventListener('click', () => {
      confirmingReset = true;
      renderCurrentRoute();
    });

    document.getElementById('home-reset-confirm')?.addEventListener('click', () => {
      doneSet = new Set();
      saveIdList(DONE_KEY, doneSet);
      confirmingReset = false;
      renderCurrentRoute();
    });

    document.getElementById('home-reset-cancel')?.addEventListener('click', () => {
      confirmingReset = false;
      renderCurrentRoute();
    });

    rootEl.querySelectorAll('[data-aq-scope]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const s = btn.getAttribute('data-aq-scope');
        window.location.hash = formatRoute({ page: 'all', scope: s });
      });
    });

    rootEl.querySelectorAll('[data-aq-mark]').forEach((btn) => {
      btn.addEventListener('click', () => {
        aqMarksFilter = btn.getAttribute('data-aq-mark');
        renderCurrentRoute();
      });
    });

    document.getElementById('aq-star-filter')?.addEventListener('click', () => {
      aqOnlyStarred = !aqOnlyStarred;
      renderCurrentRoute();
    });

    document.getElementById('aq-pending-filter')?.addEventListener('click', () => {
      aqOnlyPending = !aqOnlyPending;
      renderCurrentRoute();
    });

    const localSearchEl = document.getElementById('aq-local-search');
    if (localSearchEl) {
      localSearchEl.addEventListener('input', (e) => {
        aqSearchInput = e.target.value;
        const pos = localSearchEl.selectionStart;
        renderCurrentRoute();
        const el2 = document.getElementById('aq-local-search');
        if (el2) {
          el2.focus();
          if (typeof pos === 'number') el2.setSelectionRange(pos, pos);
        }
      });
    }

    rootEl.querySelectorAll('[data-plan-idx]').forEach((btn) => {
      btn.addEventListener('click', () => {
        selectedPlanIdx = Number(btn.getAttribute('data-plan-idx'));
        renderCurrentRoute();
      });
    });

    rootEl.querySelectorAll('.guide-anchor-pill').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const id = a.getAttribute('href').slice(1);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  function renderCurrentRoute() {
    const r = parseRoute(window.location.hash);
    renderTopBar(r);
    const root = document.getElementById('app-root');
    if (!root) return;

    let readerImages = null;
    if (r.page === 'home') {
      root.innerHTML = renderHomeHtml();
    } else if (r.page === 'study-stages') {
      root.innerHTML = renderStudyStagesHtml();
    } else if (r.page === 'study-stage') {
      root.innerHTML = renderStageQuestionsHtml(r.stageId);
    } else if (r.page === 'units-list') {
      root.innerHTML = renderUnitsListHtml();
    } else if (r.page === 'unit-marks') {
      root.innerHTML = renderUnitMarksPickerHtml(r.unitCode);
    } else if (r.page === 'unit-questions') {
      root.innerHTML = renderUnitQuestionsListHtml(r.unitCode, r.marks);
    } else if (
      r.page === 'study-question' ||
      r.page === 'unit-question' ||
      r.page === 'all-question' ||
      r.page === 'search-question'
    ) {
      const rendered = renderQuestionReaderHtml(r);
      if (typeof rendered === 'string') {
        root.innerHTML = rendered;
      } else {
        root.innerHTML = rendered.html;
        readerImages = rendered.images;
      }
    } else if (r.page === 'all' || r.page === 'search') {
      root.innerHTML = renderAllOrSearchHtml(r);
    } else if (r.page === 'guide' || r.page === 'sources') {
      root.innerHTML = renderGuideHtml(r.page);
    } else {
      root.innerHTML = renderHomeHtml();
    }

    bindDynamicEvents(root, r, readerImages);
  }

  function initStaticListeners() {
    const helpBody = document.getElementById('help-modal-body');
    if (helpBody && guide && guide.helpItems) {
      helpBody.innerHTML = guide.helpItems
        .map(
          (item) => `<div class="modal-item"><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.body)}</span></div>`
        )
        .join('');
    }

    document.getElementById('practice-toggle-btn')?.addEventListener('click', () => {
      practiceMode = !practiceMode;
      revealedQuestions = new Set();
      renderCurrentRoute();
    });

    const searchForm = document.getElementById('topbar-search-form');
    const searchInput = document.getElementById('topbar-search-input');
    if (searchForm && searchInput) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const trimmed = searchInput.value.trim();
        window.location.hash = trimmed ? formatRoute({ page: 'search', query: trimmed }) : '#/all';
      });
      searchInput.addEventListener('input', () => {
        const cur = parseRoute(window.location.hash);
        if (cur.page === 'search') {
          const target = formatRoute({ page: 'search', query: searchInput.value });
          try {
            window.history.replaceState(null, '', target);
          } catch {
            window.location.hash = target;
          }
          renderCurrentRoute();
        }
      });
    }

    const helpModal = document.getElementById('help-modal');
    const closeHelp = () => { if (helpModal) helpModal.hidden = true; };
    document.getElementById('help-btn')?.addEventListener('click', () => { if (helpModal) helpModal.hidden = false; });
    document.getElementById('close-help-btn')?.addEventListener('click', closeHelp);
    document.getElementById('modal-close-footer-btn')?.addEventListener('click', closeHelp);
    document.getElementById('modal-open-guide-link')?.addEventListener('click', closeHelp);
    document.getElementById('modal-open-sources-link')?.addEventListener('click', closeHelp);
    helpModal?.addEventListener('click', (e) => { if (e.target === helpModal) closeHelp(); });
    document.getElementById('modal-theme-btn')?.addEventListener('click', () => {
      applyTheme(theme === 'dark' ? 'light' : 'dark');
      renderCurrentRoute();
    });

    const lightboxModal = document.getElementById('lightbox-modal');
    document.getElementById('lightbox-close-btn')?.addEventListener('click', closeLightbox);
    lightboxModal?.addEventListener('click', (e) => { if (e.target === lightboxModal) closeLightbox(); });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeHelp();
        closeLightbox();
      }
    });

    window.addEventListener('hashchange', () => {
      closeHelp();
      closeLightbox();
      renderCurrentRoute();
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  }

  applyTheme(theme);
  if (!window.location.hash) {
    try {
      window.history.replaceState(null, '', '#/');
    } catch {
      window.location.hash = '#/';
    }
  }
  initStaticListeners();
  renderCurrentRoute();
})();

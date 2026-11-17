(function () {
  const DONE_KEY = 'qst_exam_done_v1';
  const STAR_KEY = 'qst_exam_starred_v1';
  const VIEW_KEY = 'qst_view_mode_v1';
  const THEME_KEY = 'qst_theme_v1';
  const SIDEBAR_KEY = 'qst_sidebar_open_v1';

  const stages = (window.QST_STAGES || []).slice().sort((a, b) => a.id - b.id);
  const guide = window.QST_GUIDE || null;
  const examMeta = (guide && guide.examMeta) || {
    unitOrder: ['I', 'II', 'III', 'IV', 'V'],
    unitMetadata: {},
    mid1Note: "The Mid 1 question bank doesn't print marks. These were decided from the wording of each question.",
    buildsOn: {},
  };
  const UNIT_ORDER = examMeta.unitOrder || ['I', 'II', 'III', 'IV', 'V'];
  const ALL_UNIT_SECTION_IDS = UNIT_ORDER.flatMap((u) => [`unit-${u}-2`, `unit-${u}-5`]);

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

  function parseViewHash(hash) {
    const clean = String(hash || '').trim().toLowerCase();
    if (clean === '#units' || clean.startsWith('#units/')) return 'units';
    if (clean === '#study' || clean.startsWith('#study/')) return 'study';
    return null;
  }

  function getInitialViewMode() {
    const fromHash = parseViewHash(window.location.hash);
    if (fromHash) return fromHash;
    try {
      const stored = localStorage.getItem(VIEW_KEY);
      if (stored === 'units' || stored === 'study') return stored;
    } catch {}
    return 'study';
  }

  function getInitialTheme() {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored === 'dark' || stored === 'light') return stored;
    } catch {}
    return 'light';
  }

  function getInitialSidebarOpen() {
    try {
      const stored = localStorage.getItem(SIDEBAR_KEY);
      if (stored === 'false') return false;
    } catch {}
    return true;
  }

  function getInitialActiveView() {
    try {
      if (window.location.hash.trim().toLowerCase() === '#questions') return 'questions';
    } catch {}
    return 'stages';
  }

  let viewMode = getInitialViewMode(); // 'study' | 'units'
  let theme = getInitialTheme(); // 'light' | 'dark'
  let desktopSidebarOpen = getInitialSidebarOpen();
  let activeView = getInitialActiveView(); // 'stages' | 'guide' | 'sources' | 'questions'
  let selectedStageId = 'all';
  let selectedUnitCode = 'all';
  let marksFilter = 'all';
  let searchQuery = '';
  let onlyPending = false;
  let onlyStarred = false;
  let aqScope = 'both'; // 'both' | 'study' | 'units'
  let aqSearch = '';
  let aqMarks = 'all'; // 'all' | '2' | '5'
  let aqOnlyPending = false;
  let aqOnlyStarred = false;
  let aqShellBuilt = false;
  let practiceMode = false;
  let selectedPlanIdx = 0;
  let expandedStages = new Set([1]);
  let expandedSectionIds = new Set(ALL_UNIT_SECTION_IDS);
  let collapsedExamCards = new Set();
  let revealedQuestions = new Set();
  let doneSet = new Set(loadIdList(DONE_KEY));
  let starredSet = new Set(loadIdList(STAR_KEY));

  function applyDesktopSidebar(open) {
    desktopSidebarOpen = Boolean(open);
    const layout = document.getElementById('top');
    const toggleBtn = document.getElementById('desktop-sidebar-toggle-btn');
    if (layout) layout.classList.toggle('sidebar-collapsed', !desktopSidebarOpen);
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-expanded', String(desktopSidebarOpen));
      toggleBtn.setAttribute('aria-label', desktopSidebarOpen ? 'Hide left sidebar' : 'Show left sidebar');
      toggleBtn.textContent = desktopSidebarOpen ? '☰ Hide menu' : '☰ Show menu';
      toggleBtn.classList.toggle('btn-primary', !desktopSidebarOpen);
      toggleBtn.classList.toggle('btn-outline', desktopSidebarOpen);
    }
    try {
      localStorage.setItem(SIDEBAR_KEY, String(desktopSidebarOpen));
    } catch {}
  }

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
    const btn = document.getElementById('theme-toggle-btn');
    const icon = document.getElementById('theme-toggle-icon');
    const lbl = document.getElementById('theme-toggle-label');
    if (btn) {
      btn.setAttribute('aria-pressed', String(theme === 'dark'));
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
    if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    if (lbl) lbl.textContent = theme === 'dark' ? 'Light' : 'Dark';
  }

  function syncViewModeUrlAndStorage() {
    try {
      localStorage.setItem(VIEW_KEY, viewMode);
    } catch {}
    const targetHash = activeView === 'questions' ? '#questions' : (viewMode === 'units' ? '#units' : '#study');
    if (window.location.hash.trim().toLowerCase() !== targetHash) {
      try {
        window.history.replaceState(null, '', targetHash);
      } catch {
        window.location.hash = targetHash;
      }
    }
  }

  function stripHtml(str) {
    return String(str || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function escapeHtml(s) {
    return String(s || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
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
      return { examTerm, unitCode, kind: 'mid1', bankNumber, bankLabel: tail, bankDisplayPrefix: String(bankNumber), bankSortKey: bankNumber * 10 };
    }
    const shortMatch = tail.match(/^Short Q(\d+)$/);
    if (shortMatch) {
      const bankNumber = Number(shortMatch[1]);
      return { examTerm, unitCode, kind: 'short', bankNumber, bankLabel: tail, bankDisplayPrefix: String(bankNumber), bankSortKey: bankNumber * 10 };
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
    return { examTerm, unitCode, kind: 'short', bankNumber: 999, bankLabel: tail, bankDisplayPrefix: tail, bankSortKey: 9999 };
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
        const groupNums = Array.from(new Set(list.filter((i) => i.parsed.kind === 'long').map((i) => i.parsed.bankNumber))).sort((a, b) => a - b);
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
  const totalQuestionCount = stages.reduce((acc, s) => acc + s.questions.length, 0);

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

  function matchesQuestion(q) {
    if (marksFilter !== 'all' && q.marks !== Number(marksFilter)) return false;
    if (onlyPending && doneSet.has(q.number)) return false;
    if (onlyStarred && !starredSet.has(q.number)) return false;
    const raw = searchQuery.trim().toLowerCase();
    if (!raw) return true;
    const haystack = [
      String(q.number), 'q' + q.number, q.question, q.sourceTag, q.intuition, q.studySource || '',
      (q.rememberThese || []).join(' '),
      (q.sections || []).map((s) => (s.label || '') + ' ' + stripHtml(s.html)).join(' '),
    ].join(' ').toLowerCase();
    return raw.split(/\s+/).filter(Boolean).every((t) => haystack.includes(t));
  }

  function buildUnitGroups(ignoreFilters) {
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
      const sorted = filteredItems.slice().sort((a, b) => a.parsedTag.bankSortKey - b.parsedTag.bankSortKey);
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

    const hasActiveFilter = !ignoreFilters && (
      searchQuery.trim().length > 0 || marksFilter !== 'all' || onlyPending || onlyStarred
    );

    const buildUnitObj = (unitCode) => {
      if (!ignoreFilters && selectedUnitCode !== 'all' && selectedUnitCode !== unitCode) return null;
      const allInUnit = byUnit.get(unitCode) || [];
      const totalQuestions = allInUnit.length;
      const doneQuestions = allInUnit.filter((i) => doneSet.has(i.question.number)).length;
      const percentDone = totalQuestions ? Math.round((doneQuestions / totalQuestions) * 100) : 0;
      const matching = ignoreFilters ? allInUnit : allInUnit.filter((i) => matchesQuestion(i.question));
      if (hasActiveFilter && !matching.length) return null;

      const meta = (examMeta.unitMetadata && examMeta.unitMetadata[unitCode]) || {
        examTerm: unitCode === 'I' || unitCode === 'II' ? 'Mid 1' : 'Mid 2',
        title: `Unit ${unitCode}`,
        subtitle: '',
      };
      return {
        unitCode,
        examTerm: meta.examTerm,
        title: meta.title,
        subtitle: meta.subtitle,
        totalQuestions,
        doneQuestions,
        percentDone,
        twoMarkSection: buildSection(unitCode, 2, allInUnit.filter((i) => i.question.marks === 2), matching.filter((i) => i.question.marks === 2)),
        fiveMarkSection: buildSection(unitCode, 5, allInUnit.filter((i) => i.question.marks === 5), matching.filter((i) => i.question.marks === 5)),
      };
    };

    const mid1Units = ['I', 'II'].map(buildUnitObj).filter(Boolean);
    const mid2Units = ['III', 'IV', 'V'].map(buildUnitObj).filter(Boolean);
    const terms = [];
    if (mid1Units.length) {
      terms.push({
        examTerm: 'Mid 1',
        title: 'Mid 1 (Units I & II)',
        note: examMeta.mid1Note,
        units: mid1Units,
      });
    }
    if (mid2Units.length) {
      terms.push({
        examTerm: 'Mid 2',
        title: 'Mid 2 (Units III, IV & V)',
        units: mid2Units,
      });
    }
    return terms;
  }

  function findCurrentReadingQuestionNumber() {
    const cards = Array.from(document.querySelectorAll('[data-question-number]'));
    if (!cards.length) return null;
    const anchorY = 140;
    let bestCard = null;
    let bestScore = Infinity;
    for (const el of cards) {
      const rect = el.getBoundingClientRect();
      if (rect.height === 0) continue;
      if (rect.top <= anchorY && rect.bottom >= anchorY) {
        return parseIdToken(el.getAttribute('data-question-number'));
      }
      const dist = Math.abs(rect.top - anchorY);
      if (rect.bottom > 60 && dist < bestScore) {
        bestScore = dist;
        bestCard = el;
      }
    }
    if (!bestCard) return null;
    return parseIdToken(bestCard.getAttribute('data-question-number'));
  }

  function ensureQuestionVisibleInView(qNum, targetMode) {
    const loc = locationMap.get(qNum);
    if (!loc) return;
    if (targetMode === 'study') {
      if (selectedStageId !== 'all' && selectedStageId !== loc.stageId) selectedStageId = 'all';
      expandedStages.add(loc.stageId);
    } else {
      if (selectedUnitCode !== 'all' && selectedUnitCode !== loc.unitCode) selectedUnitCode = 'all';
      expandedSectionIds.add(`unit-${loc.unitCode}-${loc.marks}`);
      collapsedExamCards.delete(qNum);
    }
  }

  function scrollToQuestionElement(qNum) {
    setTimeout(() => {
      const el = document.getElementById(`q-${qNum}`);
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    }, 60);
  }

  function renderQuickStartAndHelp() {
    if (!guide) return;
    const qsList = document.getElementById('quick-start-list');
    if (qsList) {
      qsList.innerHTML = (guide.quickStartLines || []).map((line) => `<li>${escapeHtml(line)}</li>`).join('');
    }
    const helpBody = document.getElementById('help-modal-body');
    if (helpBody) {
      helpBody.innerHTML = (guide.helpItems || [])
        .map((item) => `<div class="modal-item"><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.body)}</span></div>`)
        .join('');
    }
  }

  function renderHeaderAndViewSwitch() {
    const studyBtn = document.getElementById('switch-study-btn');
    const unitsBtn = document.getElementById('switch-units-btn');
    const allQBtn = document.getElementById('open-all-questions-btn');
    const isStudyActive = viewMode === 'study' && activeView === 'stages';
    const isUnitsActive = viewMode === 'units' && activeView === 'stages';
    const isQuestionsActive = activeView === 'questions';
    if (studyBtn) {
      studyBtn.classList.toggle('active', isStudyActive);
      studyBtn.setAttribute('aria-pressed', String(isStudyActive));
    }
    if (unitsBtn) {
      unitsBtn.classList.toggle('active', isUnitsActive);
      unitsBtn.setAttribute('aria-pressed', String(isUnitsActive));
    }
    if (allQBtn) {
      allQBtn.textContent = `All Questions (${totalQuestionCount})`;
      allQBtn.setAttribute('aria-pressed', String(isQuestionsActive));
      allQBtn.classList.toggle('btn-primary', isQuestionsActive);
      allQBtn.classList.toggle('btn-outline', !isQuestionsActive);
    }

    const nav = document.getElementById('header-quick-nav');
    if (nav) {
      if (viewMode === 'units') {
        nav.innerHTML = UNIT_ORDER.map((u) => `<a href="#unit-${u}" data-jump-unit="${u}">Unit ${u}</a>`).join('');
        nav.querySelectorAll('[data-jump-unit]').forEach((a) => {
          a.addEventListener('click', (e) => {
            e.preventDefault();
            const unitCode = a.getAttribute('data-jump-unit');
            activeView = 'stages';
            viewMode = 'units';
            selectedUnitCode = 'all';
            expandedSectionIds.add(`unit-${unitCode}-2`);
            expandedSectionIds.add(`unit-${unitCode}-5`);
            syncViewModeUrlAndStorage();
            renderAll();
            setTimeout(() => document.getElementById(`unit-${unitCode}`)?.scrollIntoView({ behavior: 'smooth' }), 40);
          });
        });
      } else {
        const parts = [
          { label: 'Part A', stageId: 1 },
          { label: 'Part B', stageId: 4 },
          { label: 'Part C', stageId: 7 },
          { label: 'Part D', stageId: 13 },
          { label: 'Part E', stageId: 15 },
        ];
        nav.innerHTML = parts.map((p) => `<a href="#stage-${p.stageId}" data-jump-stage="${p.stageId}">${p.label}</a>`).join('');
        nav.querySelectorAll('[data-jump-stage]').forEach((a) => {
          a.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = Number(a.getAttribute('data-jump-stage'));
            activeView = 'stages';
            viewMode = 'study';
            selectedStageId = 'all';
            expandedStages.add(targetId);
            syncViewModeUrlAndStorage();
            renderAll();
            setTimeout(() => document.getElementById(`stage-${targetId}`)?.scrollIntoView({ behavior: 'smooth' }), 40);
          });
        });
      }
    }

    const hintEl = document.getElementById('view-switcher-hint');
    if (hintEl) {
      hintEl.textContent = `Same ${totalQuestionCount} questions & answers · shared ticks & stars`;
    }

    const introSub = document.getElementById('intro-subtitle');
    if (introSub) {
      introSub.textContent = viewMode === 'units'
        ? `Unit-wise Exam View organized by Mid 1 (Units I–II) and Mid 2 (Units III–V), split into 2-mark and 5-mark sections with independent sequential numbering (1, 2, 3...) across all ${totalQuestionCount} questions.`
        : `Study Order View covering all ${totalQuestionCount} exam-ready answers across ${stages.length} progressive stages (Parts A–E), with intuition, clean answer sheets, key formulas, and transparent study sources.`;
    }

    const sidebarTitle = document.getElementById('sidebar-mobile-title');
    if (sidebarTitle) {
      sidebarTitle.textContent = viewMode === 'units' ? 'Menu & Exam Units' : 'Menu & Study Stages';
    }
  }

  function renderSidebar() {
    const container = document.getElementById('sidebar-content');
    if (!container) return;

    let html = `<div class="sidebar-top-group">
      <button type="button" class="sidebar-btn ${activeView === 'guide' ? 'solid-active' : 'guide-btn'}" data-view="guide">
        <span>Start Here</span>
      </button>
      <button type="button" class="sidebar-btn ${activeView === 'sources' ? 'solid-active' : ''}" data-view="sources">
        <span>Sources &amp; Coverage</span>
      </button>
      <button type="button" class="sidebar-btn ${activeView === 'questions' ? 'solid-active' : ''}" data-view="questions">
        <span>All Questions</span>
        <span class="sidebar-count">${totalQuestionCount}</span>
      </button>
    </div>`;

    if (viewMode === 'units') {
      const allUnitTerms = buildUnitGroups(true);
      html += `<button type="button" class="sidebar-btn ${activeView === 'stages' && selectedUnitCode === 'all' ? 'solid-active' : ''}" data-unit="all">
        <span>All ${UNIT_ORDER.length} Units</span><span class="sidebar-count">${totalQuestionCount} Qs</span></button>`;

      for (const term of allUnitTerms) {
        html += `<div class="sidebar-part-label">${escapeHtml(term.examTerm)}</div>`;
        for (const u of term.units) {
          const isActive = activeView === 'stages' && selectedUnitCode === u.unitCode;
          html += `<button type="button" class="sidebar-btn ${isActive ? 'active' : ''}" data-unit="${u.unitCode}">
            <span>${escapeHtml(u.title)}</span>
            <span class="sidebar-count">${u.doneQuestions}/${u.totalQuestions}</span>
          </button>`;
        }
      }
    } else {
      const parts = ['A', 'B', 'C', 'D', 'E'];
      html += `<button type="button" class="sidebar-btn ${activeView === 'stages' && selectedStageId === 'all' ? 'solid-active' : ''}" data-stage="all">
        <span>All ${stages.length} Stages</span><span class="sidebar-count">${totalQuestionCount} Qs</span></button>`;

      for (const part of parts) {
        const list = stages.filter((s) => s.part === part);
        if (!list.length) continue;
        html += `<div class="sidebar-part-label">Part ${part} · ${escapeHtml(list[0].partTitle)}</div>`;
        for (const s of list) {
          const doneCount = s.questions.filter((q) => doneSet.has(q.number)).length;
          const isActive = activeView === 'stages' && selectedStageId === s.id;
          html += `<button type="button" class="sidebar-btn ${isActive ? 'active' : ''}" data-stage="${s.id}">
            <span>${s.id}. ${escapeHtml(s.title)}</span>
            <span class="sidebar-count">${doneCount}/${s.questions.length}</span>
          </button>`;
        }
      }
    }

    container.innerHTML = html;

    container.querySelectorAll('[data-view]').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeView = btn.getAttribute('data-view');
        syncViewModeUrlAndStorage();
        closeSidebar();
        renderAll();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    container.querySelectorAll('[data-stage]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-stage');
        activeView = 'stages';
        viewMode = 'study';
        selectedStageId = val === 'all' ? 'all' : Number(val);
        if (selectedStageId !== 'all') expandedStages.add(selectedStageId);
        syncViewModeUrlAndStorage();
        closeSidebar();
        renderAll();
      });
    });

    container.querySelectorAll('[data-unit]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-unit');
        activeView = 'stages';
        viewMode = 'units';
        selectedUnitCode = val;
        if (val !== 'all') {
          expandedSectionIds.add(`unit-${val}-2`);
          expandedSectionIds.add(`unit-${val}-5`);
        }
        syncViewModeUrlAndStorage();
        closeSidebar();
        renderAll();
      });
    });
  }

  function renderGuideView() {
    const container = document.getElementById('guide-container');
    if (!container || !guide || !guide.sections) return;
    const g = guide.sections;
    const isSourcesOnly = activeView === 'sources';
    const plan = g.part2HowToStudy.studyPlans[selectedPlanIdx] || g.part2HowToStudy.studyPlans[0];
    const vg = guide.viewGuide;

    let html = `<div class="guide-stack">
      <section class="guide-card">
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;">
          <button type="button" class="btn btn-outline" id="guide-back-btn">← Back to ${totalQuestionCount} Questions</button>
          <div class="filter-tabs">
            <button type="button" class="tab-btn ${!isSourcesOnly ? 'active' : ''}" data-switch-guide="guide">Start Here Guide</button>
            <button type="button" class="tab-btn ${isSourcesOnly ? 'active' : ''}" data-switch-guide="sources">Sources &amp; Coverage</button>
          </div>
        </div>
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
      </section>`;

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
          <div class="guide-subbox" style="background:var(--accent-soft);border-color:var(--accent-border);">
            <h3>Twin Questions Shortcut</h3>
            <p>${escapeHtml(g.part2HowToStudy.twinQuestionsNote)}</p>
          </div>
        </div>
        <div class="guide-subbox">
          <h3>What to Memorize by Heart (Understand WHY First)</h3>
          <p style="margin-bottom:8px;"><strong>Core Principle:</strong> ${escapeHtml(g.part2HowToStudy.memorizeMustKnow.understandWhyRule)}</p>
          <strong style="font-size:0.78rem;">Key Formulas &amp; Numbers</strong>
          <ul>${g.part2HowToStudy.memorizeMustKnow.formulas.map((f) => `<li style="font-family:var(--font-mono);font-size:0.8rem;">${escapeHtml(f)}</li>`).join('')}</ul>
          <strong style="font-size:0.78rem;display:block;margin-top:8px;">Circuits &amp; Diagrams to Sketch on Paper</strong>
          <ul>${g.part2HowToStudy.memorizeMustKnow.circuitsAndDiagrams.map((c) => `<li>${escapeHtml(c)}</li>`).join('')}</ul>
        </div>
        <div>
          <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px;margin-bottom:8px;">
            <strong>Realistic Study Time Plans</strong>
            <div class="filter-tabs">
              ${['12-Hour Plan', '10-Hour Plan', '5-Hour Crash'].map((lbl, idx) =>
                `<button type="button" class="tab-btn ${selectedPlanIdx === idx ? 'active' : ''}" data-plan-idx="${idx}">${lbl}</button>`
              ).join('')}
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
          ${g.part3HowToUseApp.features.map((f) => `<div class="guide-subbox">
            <h3>${escapeHtml(f.name)}</h3>
            <p>${escapeHtml(f.detail)}</p>
          </div>`).join('')}
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
            ${g.part4Sources.stageSources.map((row) => `<tr>
              <td><button type="button" class="btn-icon" style="color:var(--accent-ink);text-align:left;padding:0;font-size:0.84rem;" data-open-stage="${row.stageId}">Stage ${row.stageId}: ${escapeHtml(row.title)}</button></td>
              <td style="white-space:nowrap;font-family:var(--font-mono);font-size:0.78rem;">${escapeHtml(row.questionRange)}</td>
              <td style="font-size:0.78rem;">${escapeHtml(row.primaryFiles)}</td>
              <td style="font-size:0.78rem;color:var(--ink-muted);">${escapeHtml(row.supplementalNotes)}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
      <strong>Verified Differences Across Class Note Files</strong>
      ${g.part4Sources.disagreements.map((d) => `<div class="guide-subbox">
        <h3>${escapeHtml(d.topic)}</h3>
        <p>${escapeHtml(d.difference)}</p>
        <p style="margin-top:4px;color:var(--accent-ink);"><strong>Handled here:</strong> ${escapeHtml(d.howHandled)}</p>
      </div>`).join('')}
      <strong>Why Some Questions Have No Diagram Image</strong>
      <p>${escapeHtml(g.part4Sources.missingDiagramsSummary)}</p>
      <div class="guide-grid">
        ${g.part4Sources.missingDiagramGroups.map((mg) => `<div class="guide-subbox">
          <h3>${escapeHtml(mg.category)}</h3>
          <div style="font-family:var(--font-mono);font-size:0.78rem;color:var(--accent-ink);margin-bottom:4px;">${escapeHtml(mg.questions)}</div>
          <p>${escapeHtml(mg.reason)}</p>
        </div>`).join('')}
      </div>
    </section>`;

    html += `<section class="guide-card" id="off-part-5">
      <h2>${escapeHtml(g.part5Uncovered.heading)}</h2>
      <p>${escapeHtml(g.part5Uncovered.intro)}</p>
      ${g.part5Uncovered.units.map((u) => `<div class="guide-subbox">
        <h3>${escapeHtml(u.unit)}</h3>
        <ul>${u.topicsNotInQuestions.map((t) => `<li>${escapeHtml(t)}</li>`).join('')}</ul>
      </div>`).join('')}
    </section>`;

    if (!isSourcesOnly) {
      html += `<section class="guide-card" id="off-part-6">
        <h2>${escapeHtml(g.part6ExamWriting.heading)}</h2>
        <ul>${g.part6ExamWriting.tips.map((t) => `<li>${escapeHtml(t)}</li>`).join('')}</ul>
        <div>
          <button type="button" class="btn btn-primary" data-open-stage="1">Start Studying Stage 1 Now</button>
        </div>
      </section>`;
    }

    html += '</div>';
    container.innerHTML = html;

    document.getElementById('guide-back-btn')?.addEventListener('click', () => {
      activeView = 'stages';
      renderAll();
    });
    container.querySelectorAll('[data-switch-guide]').forEach((b) => {
      b.addEventListener('click', () => {
        activeView = b.getAttribute('data-switch-guide');
        renderAll();
      });
    });
    container.querySelectorAll('[data-plan-idx]').forEach((b) => {
      b.addEventListener('click', () => {
        selectedPlanIdx = Number(b.getAttribute('data-plan-idx'));
        renderGuideView();
      });
    });
    container.querySelectorAll('[data-open-stage]').forEach((b) => {
      b.addEventListener('click', () => {
        const sid = Number(b.getAttribute('data-open-stage'));
        activeView = 'stages';
        viewMode = 'study';
        selectedStageId = sid;
        expandedStages.add(sid);
        syncViewModeUrlAndStorage();
        renderAll();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  function renderQuestion(q, options = {}) {
    const isDone = doneSet.has(q.number);
    const isStarred = starredSet.has(q.number);
    const isCollapsed = Boolean(options.isCollapsed);
    const showAns = !practiceMode || revealedQuestions.has(q.number);
    const loc = locationMap.get(q.number);
    const isSearching = searchQuery.trim().length > 0;
    const searchContextLine = isSearching && loc
      ? `In Exam View: ${loc.examTerm} · Unit ${loc.unitCode} · ${loc.sectionTitle} · #${loc.sectionNumberPrefix} (${loc.bankLabel}) · In Study Order: Stage ${loc.stageId} (#${q.number})`
      : '';

    let bodyHtml = '';
    if (!isCollapsed) {
      if (!showAns) {
        bodyHtml = `<div class="practice-prompt">
          <span>Practice mode active — try recalling this answer from memory first.</span>
          <button type="button" class="btn btn-primary" data-reveal="${q.number}">Show answer</button>
        </div>`;
      } else {
        const hideBtn = practiceMode ? `<div style="text-align:right;margin-top:8px;"><button type="button" class="btn btn-outline" data-reveal="${q.number}">Hide answer</button></div>` : '';
        const images = [];
        const sectionsHtml = q.sections.map((sec) => {
          const label = sec.label ? `<h4 class="answer-section-title">${escapeHtml(sec.label)}</h4>` : '';
          if (sec.image) images.push(sec.image);
          const img = sec.image ? `<figure class="diagram-figure">
            <div class="diagram-frame"><img src="images/${escapeHtml(sec.image.file)}" alt="${escapeHtml(sec.image.caption)}" /></div>
            <figcaption class="diagram-caption"><strong>${escapeHtml(sec.image.caption)}</strong></figcaption>
          </figure>` : '';
          return `${label}<div>${sec.html}</div>${img}`;
        }).join('');

        const rem = (q.rememberThese || []).map((r) => `<li>${r}</li>`).join('');
        const supBadge = q.usesTextbookSupplement ? '<span class="source-pill">Includes textbook supplement</span>' : '';
        const imgList = images.length
          ? `<ul>${images.map((im) => `<li><strong>${escapeHtml(im.caption)}</strong>${im.kindLabel ? ` (${escapeHtml(im.kindLabel)})` : ''} — <code>${escapeHtml(im.source)}</code></li>`).join('')}</ul>`
          : '';
        const noDiag = q.noDiagramNote ? `<p><strong>Diagram note:</strong> ${escapeHtml(q.noDiagramNote)}</p>` : '';

        bodyHtml = `${hideBtn}
          <div class="intuition-box"><div class="box-label">Understand it</div><div>${escapeHtml(q.intuition)}</div></div>
          <div class="exam-answer-box">
            <div class="box-label">Write this in the exam</div>
            <div class="answer-body">${sectionsHtml}</div>
          </div>
          <div class="remember-box"><div class="box-label">Remember these</div><ul>${rem}</ul></div>
          <div class="source-box">
            <div class="box-label">Source (for study, not for the exam)</div>
            <p><strong>Notes used:</strong> <code>${escapeHtml(q.studySource || '')}</code>${supBadge}</p>
            ${imgList}
            ${noDiag}
          </div>`;
      }
    }

    let examLinksHtml = '';
    if (options.examItem) {
      const item = options.examItem;
      const depsHtml = item.buildsOn.length
        ? `<div class="builds-on-row"><span><strong>Builds on:</strong></span>${item.buildsOn.map((dep, idx) =>
            `<button type="button" class="link-inline-btn" data-jump-dep="${dep.questionNumber}" title="Study order #${dep.questionNumber} · Stage ${dep.stageId}">Unit ${dep.unitCode} · ${dep.marks === 2 ? '2M' : '5M'} #${escapeHtml(dep.sectionNumberPrefix)}</button>${idx < item.buildsOn.length - 1 ? '<span>·</span>' : ''}`
          ).join('')}</div>`
        : '';
      examLinksHtml = `<div class="q-exam-links">
        <button type="button" class="link-inline-btn" data-open-study="${q.number}" data-open-stage="${item.stageId}">
          Study order: #${q.number} · Stage ${item.stageId} ↗
        </button>
        ${depsHtml}
      </div>`;
    }

    const collapseBtn = options.examItem
      ? `<button type="button" class="btn btn-outline" data-collapse-card="${q.number}" aria-expanded="${!isCollapsed}">${isCollapsed ? '▶ Expand' : '▼ Hide'}</button>`
      : '';

    const metaLead = options.examItem
      ? `<span><strong>${escapeHtml(options.examItem.parsedTag.bankLabel)}</strong></span> ·`
      : `<span><strong>Question ${q.number}</strong></span> ·`;
    const headingPrefix = options.examItem
      ? options.examItem.sectionNumberPrefix
      : String(q.number);

    return `<article class="q-card ${isDone ? 'done' : ''}" id="q-${q.number}" data-question-number="${q.number}">
      <div class="q-head ${isCollapsed ? 'collapsed' : ''}">
        <div style="flex:1 1 320px;">
          <div class="q-meta">
            ${metaLead}
            <span>${escapeHtml(q.sourceTag)}</span> ·
            <span class="marks-tag ${q.marks === 5 ? 'five' : ''}">${q.marks} marks</span>
          </div>
          <h3 class="q-title">${escapeHtml(headingPrefix)}. ${escapeHtml(q.question)}</h3>
          ${q.questionMathHtml || ''}
          ${q.orderNote ? `<p class="q-order-note">${escapeHtml(q.orderNote)}</p>` : ''}
          ${searchContextLine ? `<p class="q-search-context">${escapeHtml(searchContextLine)}</p>` : ''}
          ${examLinksHtml}
        </div>
        <div class="q-card-actions">
          <button type="button" class="btn btn-star" data-star="${q.number}" aria-pressed="${isStarred}">
            ${isStarred ? '★ Starred' : '☆ Star'}
          </button>
          <button type="button" class="btn btn-done" data-done="${q.number}" aria-pressed="${isDone}">
            ${isDone ? '✓ Done' : 'Mark done'}
          </button>
          ${collapseBtn}
        </div>
      </div>
      ${bodyHtml}
    </article>`;
  }

  function updateToolbarSummary(visibleCount) {
    const allQs = stages.flatMap((s) => s.questions);
    const totalQuestions = allQs.length;
    const twoMark = allQs.filter((q) => q.marks === 2).length;
    const fiveMark = allQs.filter((q) => q.marks === 5).length;
    const pct = totalQuestions ? Math.round((doneSet.size / totalQuestions) * 100) : 0;

    document.getElementById('progress-text').textContent = `${doneSet.size} of ${totalQuestions} questions marked done (${pct}%)`;
    document.getElementById('visible-sub').textContent = `Showing ${visibleCount} matching · ${twoMark} two-mark · ${fiveMark} five-mark · ${starredSet.size} starred`;
    document.getElementById('progress-fill').style.width = `${pct}%`;
    document.getElementById('progress-bar').setAttribute('aria-valuenow', String(pct));

    const starBtn = document.getElementById('starred-only-btn');
    if (starBtn) {
      starBtn.textContent = `★ Starred (${starredSet.size})`;
      starBtn.setAttribute('aria-pressed', String(onlyStarred));
    }

    const expandAllBtn = document.getElementById('expand-all-btn');
    if (expandAllBtn) {
      if (viewMode === 'units') {
        expandAllBtn.textContent = expandedSectionIds.size === ALL_UNIT_SECTION_IDS.length ? 'Collapse all sections' : 'Expand all sections';
      } else {
        expandAllBtn.textContent = expandedStages.size === stages.length ? 'Collapse all stages' : 'Expand all stages';
      }
    }
  }

  function bindCardActionListeners(container) {
    container.querySelectorAll('[data-done]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const num = parseIdToken(btn.getAttribute('data-done'));
        if (num === null) return;
        if (doneSet.has(num)) doneSet.delete(num); else doneSet.add(num);
        saveIdList(DONE_KEY, doneSet);
        renderAll();
      });
    });

    container.querySelectorAll('[data-star]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const num = parseIdToken(btn.getAttribute('data-star'));
        if (num === null) return;
        if (starredSet.has(num)) starredSet.delete(num); else starredSet.add(num);
        saveIdList(STAR_KEY, starredSet);
        renderAll();
      });
    });

    container.querySelectorAll('[data-reveal]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const num = parseIdToken(btn.getAttribute('data-reveal'));
        if (num === null) return;
        if (revealedQuestions.has(num)) revealedQuestions.delete(num); else revealedQuestions.add(num);
        renderMainQuestionArea();
      });
    });

    container.querySelectorAll('[data-collapse-card]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const num = parseIdToken(btn.getAttribute('data-collapse-card'));
        if (num === null) return;
        if (collapsedExamCards.has(num)) collapsedExamCards.delete(num); else collapsedExamCards.add(num);
        renderExamView();
      });
    });

    container.querySelectorAll('[data-open-study]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const qNum = parseIdToken(btn.getAttribute('data-open-study'));
        const sid = Number(btn.getAttribute('data-open-stage'));
        if (qNum === null) return;
        activeView = 'stages';
        viewMode = 'study';
        if (selectedStageId !== 'all' && selectedStageId !== sid) selectedStageId = 'all';
        expandedStages.add(sid);
        syncViewModeUrlAndStorage();
        renderAll();
        scrollToQuestionElement(qNum);
      });
    });

    container.querySelectorAll('[data-jump-dep]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const depNum = parseIdToken(btn.getAttribute('data-jump-dep'));
        const loc = depNum !== null ? locationMap.get(depNum) : null;
        if (!loc) return;
        activeView = 'stages';
        viewMode = 'units';
        if (selectedUnitCode !== 'all' && selectedUnitCode !== loc.unitCode) selectedUnitCode = 'all';
        expandedSectionIds.add(`unit-${loc.unitCode}-${loc.marks}`);
        collapsedExamCards.delete(depNum);
        syncViewModeUrlAndStorage();
        renderAll();
        scrollToQuestionElement(depNum);
      });
    });
  }

  function renderStages() {
    const container = document.getElementById('stages-container');
    if (!container) return;
    const filtered = [];
    let visibleCount = 0;

    for (const stage of stages) {
      if (selectedStageId !== 'all' && stage.id !== selectedStageId) continue;
      const qs = stage.questions.filter(matchesQuestion);
      if (qs.length) {
        visibleCount += qs.length;
        filtered.push({ stage, qs });
      }
    }

    updateToolbarSummary(visibleCount);

    const autoExpand = Boolean(searchQuery.trim() || marksFilter !== 'all' || onlyPending || onlyStarred || selectedStageId !== 'all');
    if (!filtered.length) {
      container.innerHTML = `<div class="q-card"><p>No questions match your current filters. Clear search or reset filters.</p></div>`;
      return;
    }

    container.innerHTML = filtered.map(({ stage, qs }) => {
      const isExpanded = autoExpand || expandedStages.has(stage.id);
      const doneInStage = qs.filter((q) => doneSet.has(q.number)).length;
      const qRange = qs.length === 1 ? `Q${qs[0].number}` : `Q${qs[0].number}–Q${qs[qs.length - 1].number}`;
      return `<section class="stage-card" id="stage-${stage.id}">
        <button type="button" class="stage-toggle" data-toggle-stage="${stage.id}" aria-expanded="${isExpanded}">
          <div>
            <div class="stage-meta">
              <span class="stage-part-text">Part ${stage.part} · ${escapeHtml(stage.partTitle)}</span> · ${qRange} · ${doneInStage}/${qs.length} done
            </div>
            <h2 class="stage-title">Stage ${stage.id}. ${escapeHtml(stage.title)}</h2>
            <p class="stage-subtitle">${escapeHtml(stage.subtitle)}</p>
          </div>
          <span>${isExpanded ? '▼' : '▶'}</span>
        </button>
        ${isExpanded ? `<div class="stage-questions">${qs.map((q) => renderQuestion(q)).join('')}</div>` : ''}
      </section>`;
    }).join('');

    container.querySelectorAll('[data-toggle-stage]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = Number(btn.getAttribute('data-toggle-stage'));
        if (expandedStages.has(id)) expandedStages.delete(id); else expandedStages.add(id);
        renderStages();
      });
    });

    bindCardActionListeners(container);
  }

  function renderExamSection(sec, isSearching) {
    const isExpanded = isSearching || expandedSectionIds.has(sec.id);
    const qNums = sec.items.map((i) => i.question.number);
    const hasItems = sec.items.length > 0;

    let bodyHtml = '';
    if (isExpanded) {
      if (!hasItems) {
        bodyHtml = `<div class="exam-section-body"><p style="margin:0;color:var(--ink-subtle);font-style:italic;font-size:0.86rem;">No ${sec.marks}-mark questions in this unit (0 questions).</p></div>`;
      } else {
        const ungroupedHtml = sec.ungroupedItems.map((item) =>
          renderQuestion(item.question, { examItem: item, isCollapsed: collapsedExamCards.has(item.question.number) })
        ).join('');
        const longHtml = sec.longGroups.map((g) => `<div class="long-group">
          <div class="long-group-label">${escapeHtml(g.groupLabel)} · Sub-questions (a) and (b)</div>
          ${g.questions.map((item) =>
            renderQuestion(item.question, { examItem: item, isCollapsed: collapsedExamCards.has(item.question.number) })
          ).join('')}
        </div>`).join('');
        bodyHtml = `<div class="exam-section-body">${ungroupedHtml}${longHtml}</div>`;
      }
    }

    return `<div class="exam-section" id="${sec.id}">
      <div class="exam-section-head">
        <button type="button" class="exam-section-toggle" data-toggle-section="${sec.id}" aria-expanded="${isExpanded}">
          <span>${isExpanded ? '▼' : '▶'}</span>
          <span>${escapeHtml(sec.title)} (${sec.items.length})</span>
        </button>
        ${hasItems ? `<div class="exam-section-actions">
          <button type="button" class="btn btn-outline" data-sec-expand="${sec.id}" data-sec-qs="${qNums.join(',')}">Expand all</button>
          <button type="button" class="btn btn-outline" data-sec-collapse="${sec.id}" data-sec-qs="${qNums.join(',')}">Collapse all</button>
        </div>` : ''}
      </div>
      ${bodyHtml}
    </div>`;
  }

  function renderExamView() {
    const container = document.getElementById('exam-container');
    if (!container) return;
    const termGroups = buildUnitGroups(false);
    const visibleCount = termGroups.reduce((acc, t) => acc + t.units.reduce((ua, u) => ua + u.twoMarkSection.items.length + u.fiveMarkSection.items.length, 0), 0);
    updateToolbarSummary(visibleCount);

    if (!termGroups.length) {
      container.innerHTML = `<div class="q-card"><p>No questions match your current filters. Clear search or reset filters.</p></div>`;
      return;
    }

    const isSearching = searchQuery.trim().length > 0;
    container.innerHTML = termGroups.map((term) => `<section class="exam-term-block">
      <div>
        <h2 class="exam-term-title">${escapeHtml(term.title)}</h2>
        ${term.note ? `<div class="mid1-note" style="margin-top:8px;"><strong>Note:</strong> ${escapeHtml(term.note)}</div>` : ''}
      </div>
      ${term.units.map((u) => `<section class="unit-card" id="unit-${u.unitCode}">
        <div>
          <div class="unit-head">
            <div>
              <div class="unit-kicker">${escapeHtml(u.examTerm)} · ${u.totalQuestions} Questions</div>
              <h3 class="unit-title">${escapeHtml(u.title)}</h3>
              <p class="unit-subtitle">${escapeHtml(u.subtitle)}</p>
            </div>
            <div class="unit-progress-label">${u.doneQuestions}/${u.totalQuestions} done (${u.percentDone}%)</div>
          </div>
          <div class="progress-track" style="margin-top:8px;" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${u.percentDone}">
            <div class="progress-fill unit-done-fill" style="width:${u.percentDone}%"></div>
          </div>
        </div>
        ${marksFilter !== '5' ? renderExamSection(u.twoMarkSection, isSearching) : ''}
        ${marksFilter !== '2' ? renderExamSection(u.fiveMarkSection, isSearching) : ''}
      </section>`).join('')}
    </section>`).join('');

    container.querySelectorAll('[data-toggle-section]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const sid = btn.getAttribute('data-toggle-section');
        if (expandedSectionIds.has(sid)) expandedSectionIds.delete(sid); else expandedSectionIds.add(sid);
        renderExamView();
      });
    });

    container.querySelectorAll('[data-sec-expand]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const sid = btn.getAttribute('data-sec-expand');
        const qList = (btn.getAttribute('data-sec-qs') || '').split(',').map(parseIdToken).filter((v) => v !== null);
        expandedSectionIds.add(sid);
        qList.forEach((n) => collapsedExamCards.delete(n));
        renderExamView();
      });
    });

    container.querySelectorAll('[data-sec-collapse]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const sid = btn.getAttribute('data-sec-collapse');
        const qList = (btn.getAttribute('data-sec-qs') || '').split(',').map(parseIdToken).filter((v) => v !== null);
        expandedSectionIds.add(sid);
        qList.forEach((n) => collapsedExamCards.add(n));
        renderExamView();
      });
    });

    bindCardActionListeners(container);
  }

  function matchesAllQuestionsFilter(q) {
    if (aqMarks !== 'all' && q.marks !== Number(aqMarks)) return false;
    if (aqOnlyPending && doneSet.has(q.number)) return false;
    if (aqOnlyStarred && !starredSet.has(q.number)) return false;
    const raw = aqSearch.trim().toLowerCase();
    if (!raw) return true;
    const haystack = [
      String(q.number), 'q' + q.number, q.question, q.sourceTag, q.intuition, q.studySource || '',
      (q.rememberThese || []).join(' '),
      (q.sections || []).map((s) => (s.label || '') + ' ' + stripHtml(s.html)).join(' '),
    ].join(' ').toLowerCase();
    return raw.split(/\s+/).filter(Boolean).every((t) => haystack.includes(t));
  }

  function renderQuestionOnlyCard(q, opts) {
    const isDone = doneSet.has(q.number);
    const isStarred = starredSet.has(q.number);
    const openAttr = opts.mode === 'study'
      ? `data-aq-open-study="${q.number}" data-aq-stage="${opts.stageId}"`
      : `data-aq-open-unit="${q.number}" data-aq-unit="${opts.unitCode}" data-aq-sec="${opts.sectionId}"`;

    return `<article class="q-card ${isDone ? 'done' : ''}" id="${opts.idAttr}">
      <div class="q-head collapsed">
        <div style="flex:1 1 320px;">
          <div class="q-meta">
            <span><strong>${escapeHtml(opts.metaLead)}</strong></span> ·
            <span>${escapeHtml(q.sourceTag)}</span> ·
            <span class="marks-tag ${q.marks === 5 ? 'five' : ''}">${q.marks} marks</span>
          </div>
          <h3 class="q-title">${escapeHtml(opts.prefixLabel)}. ${escapeHtml(q.question)}</h3>
          ${q.questionMathHtml || ''}
          ${q.orderNote ? `<p class="q-order-note">${escapeHtml(q.orderNote)}</p>` : ''}
        </div>
        <div class="q-card-actions">
          <button type="button" class="btn btn-star" data-aq-star="${q.number}" aria-pressed="${isStarred}">
            ${isStarred ? '★ Starred' : '☆ Star'}
          </button>
          <button type="button" class="btn btn-done" data-aq-done="${q.number}" aria-pressed="${isDone}">
            ${isDone ? '✓ Done' : 'Mark done'}
          </button>
          <button type="button" class="btn btn-view-answer" ${openAttr}>
            View answer ↗
          </button>
        </div>
      </div>
    </article>`;
  }

  function renderAllQuestionsListAndState() {
    const bodyEl = document.getElementById('aq-sections-body');
    if (!bodyEl) return;

    const filteredStudy = [];
    let visibleStudyCount = 0;
    for (const stage of stages) {
      const qs = stage.questions.filter(matchesAllQuestionsFilter);
      if (qs.length) {
        visibleStudyCount += qs.length;
        filteredStudy.push({ stage, qs });
      }
    }

    const baseTerms = buildUnitGroups(true);
    const filteredTerms = [];
    let visibleUnitCount = 0;
    for (const term of baseTerms) {
      const units = [];
      for (const u of term.units) {
        const twoItems = u.twoMarkSection.items.filter((item) => matchesAllQuestionsFilter(item.question));
        const fiveItems = u.fiveMarkSection.items.filter((item) => matchesAllQuestionsFilter(item.question));
        if (!twoItems.length && !fiveItems.length) continue;
        visibleUnitCount += twoItems.length + fiveItems.length;

        const twoLongGroupsMap = new Map();
        const twoUngrouped = [];
        for (const item of twoItems) twoUngrouped.push(item);

        const fiveLongGroupsMap = new Map();
        const fiveUngrouped = [];
        for (const item of fiveItems) {
          if (item.parsedTag.kind === 'long') {
            const gNum = item.parsedTag.bankNumber;
            if (!fiveLongGroupsMap.has(gNum)) fiveLongGroupsMap.set(gNum, []);
            fiveLongGroupsMap.get(gNum).push(item);
          } else {
            fiveUngrouped.push(item);
          }
        }
        const fiveLongGroups = Array.from(fiveLongGroupsMap.entries())
          .sort((a, b) => a[0] - b[0])
          .map(([groupNumber, questions], idx) => ({
            groupNumber,
            groupLabel: `Long Q${idx + 1}`,
            questions,
          }));

        units.push({
          ...u,
          twoSection: { ...u.twoMarkSection, items: twoItems, ungroupedItems: twoUngrouped, longGroups: [] },
          fiveSection: { ...u.fiveMarkSection, items: fiveItems, ungroupedItems: fiveUngrouped, longGroups: fiveLongGroups },
        });
      }
      if (units.length) filteredTerms.push({ ...term, units });
    }

    document.querySelectorAll('[data-aq-scope]').forEach((btn) => {
      const val = btn.getAttribute('data-aq-scope');
      const isAct = val === aqScope;
      btn.classList.toggle('active', isAct);
      btn.setAttribute('aria-pressed', String(isAct));
    });
    document.querySelectorAll('[data-aq-mark]').forEach((btn) => {
      const val = btn.getAttribute('data-aq-mark');
      const isAct = val === aqMarks;
      btn.classList.toggle('active', isAct);
      btn.setAttribute('aria-pressed', String(isAct));
    });
    const starBtn = document.getElementById('aq-starred-btn');
    if (starBtn) {
      starBtn.textContent = `★ Starred (${starredSet.size})`;
      starBtn.setAttribute('aria-pressed', String(aqOnlyStarred));
    }
    const hideDoneBtn = document.getElementById('aq-hide-done-btn');
    if (hideDoneBtn) hideDoneBtn.setAttribute('aria-pressed', String(aqOnlyPending));
    const resetBtn = document.getElementById('aq-reset-filters-btn');
    if (resetBtn) {
      const hasF = Boolean(aqSearch.trim() || aqMarks !== 'all' || aqOnlyPending || aqOnlyStarred);
      resetBtn.hidden = !hasF;
    }

    const jumpRow = document.getElementById('aq-jump-row');
    if (jumpRow) {
      jumpRow.hidden = aqScope !== 'both';
      if (aqScope === 'both') {
        jumpRow.innerHTML = `<a class="guide-anchor-pill" href="#all-questions-study-section">1. Study Order Questions (${visibleStudyCount})</a>
          <a class="guide-anchor-pill" href="#all-questions-unit-section">2. Unit-wise Questions (${visibleUnitCount})</a>`;
      }
    }

    let html = '';
    if (aqScope === 'both' || aqScope === 'study') {
      html += `<section id="all-questions-study-section" class="aq-stack" aria-labelledby="all-questions-study-heading">
        <div class="aq-section-head">
          <div>
            <h2 id="all-questions-study-heading">Study Order Questions (${visibleStudyCount})</h2>
            <p>All ${stages.length} learning stages (Parts A–E) expanded in sequence.</p>
          </div>
          ${aqScope === 'both' ? '<a class="btn-text-link" href="#all-questions-unit-section">Jump to Unit-wise Questions ↓</a>' : ''}
        </div>
        ${!filteredStudy.length
          ? '<div class="q-card"><p>No Study Order questions match your filters.</p></div>'
          : filteredStudy.map(({ stage, qs }) => {
              const doneInStage = qs.filter((q) => doneSet.has(q.number)).length;
              const qRange = qs.length === 1 ? `Q${qs[0].number}` : `Q${qs[0].number}–Q${qs[qs.length - 1].number}`;
              return `<div class="aq-stage-card">
                <div class="aq-stage-head">
                  <div class="stage-meta">
                    <span class="stage-part-text">Part ${stage.part} · ${escapeHtml(stage.partTitle)}</span> · ${qRange} · ${doneInStage}/${qs.length} done
                  </div>
                  <h3 class="aq-stage-title">Stage ${stage.id}. ${escapeHtml(stage.title)}</h3>
                </div>
                <div class="aq-list">
                  ${qs.map((q) => renderQuestionOnlyCard(q, {
                    mode: 'study',
                    stageId: stage.id,
                    idAttr: `aq-study-${q.number}`,
                    prefixLabel: String(q.number),
                    metaLead: `Question ${q.number}`,
                  })).join('')}
                </div>
              </div>`;
            }).join('')}
      </section>`;
    }

    if (aqScope === 'both' || aqScope === 'units') {
      const renderSectionBox = (sec, unitCode) => {
        if (!sec.items.length) {
          return `<div class="exam-section" style="padding:14px;">
            <strong style="font-size:0.94rem;">${escapeHtml(sec.title)} (0)</strong>
            <p style="margin:4px 0 0;color:var(--ink-subtle);font-style:italic;font-size:0.84rem;">No matching ${sec.marks}-mark questions in this unit.</p>
          </div>`;
        }
        const ungroupedHtml = sec.ungroupedItems.map((item) =>
          renderQuestionOnlyCard(item.question, {
            mode: 'units',
            unitCode,
            sectionId: sec.id,
            idAttr: `aq-unit-${item.question.number}`,
            prefixLabel: item.sectionNumberPrefix,
            metaLead: item.parsedTag.bankLabel,
          })
        ).join('');
        const longHtml = sec.longGroups.map((g) => `<div class="long-group">
          <div class="long-group-label">${escapeHtml(g.groupLabel)} · Sub-questions (a) and (b)</div>
          ${g.questions.map((item) =>
            renderQuestionOnlyCard(item.question, {
              mode: 'units',
              unitCode,
              sectionId: sec.id,
              idAttr: `aq-unit-${item.question.number}`,
              prefixLabel: item.sectionNumberPrefix,
              metaLead: item.parsedTag.bankLabel,
            })
          ).join('')}
        </div>`).join('');

        return `<div class="exam-section">
          <div class="exam-section-head">
            <strong style="font-size:0.95rem;">${escapeHtml(sec.title)} (${sec.items.length})</strong>
          </div>
          <div class="exam-section-body">${ungroupedHtml}${longHtml}</div>
        </div>`;
      };

      html += `<section id="all-questions-unit-section" class="aq-stack" aria-labelledby="all-questions-unit-heading">
        <div class="aq-section-head">
          <div>
            <h2 id="all-questions-unit-heading">Unit-wise Questions (${visibleUnitCount})</h2>
            <p>Mid 1 (Units I–II) and Mid 2 (Units III–V), separated into 2-Mark and 5-Mark sections with sequential numbering from 1.</p>
          </div>
          ${aqScope === 'both' ? '<a class="btn-text-link" href="#all-questions-study-section">Back to Study Order Questions ↑</a>' : ''}
        </div>
        ${!filteredTerms.length
          ? '<div class="q-card"><p>No Unit-wise questions match your filters.</p></div>'
          : filteredTerms.map((term) => `<div class="exam-term-block">
              <h3 class="exam-term-title" style="font-size:1.18rem;">${escapeHtml(term.title)}</h3>
              ${term.units.map((u) => `<div class="unit-card">
                <div class="unit-head">
                  <div>
                    <div class="unit-kicker">${escapeHtml(u.examTerm)} · ${u.totalQuestions} Questions</div>
                    <h4 class="unit-title">${escapeHtml(u.title)}</h4>
                  </div>
                  <div class="unit-progress-label">${u.doneQuestions}/${u.totalQuestions} done</div>
                </div>
                ${aqMarks !== '5' ? renderSectionBox(u.twoSection, u.unitCode) : ''}
                ${aqMarks !== '2' ? renderSectionBox(u.fiveSection, u.unitCode) : ''}
              </div>`).join('')}
            </div>`).join('')}
      </section>`;
    }

    bodyEl.innerHTML = html;

    bodyEl.querySelectorAll('[data-aq-done]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const num = parseIdToken(btn.getAttribute('data-aq-done'));
        if (num === null) return;
        if (doneSet.has(num)) doneSet.delete(num); else doneSet.add(num);
        saveIdList(DONE_KEY, doneSet);
        renderSidebar();
        renderAllQuestionsListAndState();
      });
    });

    bodyEl.querySelectorAll('[data-aq-star]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const num = parseIdToken(btn.getAttribute('data-aq-star'));
        if (num === null) return;
        if (starredSet.has(num)) starredSet.delete(num); else starredSet.add(num);
        saveIdList(STAR_KEY, starredSet);
        renderAllQuestionsListAndState();
      });
    });

    bodyEl.querySelectorAll('[data-aq-open-study]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const qNum = parseIdToken(btn.getAttribute('data-aq-open-study'));
        const sid = Number(btn.getAttribute('data-aq-stage'));
        if (qNum === null) return;
        activeView = 'stages';
        viewMode = 'study';
        if (selectedStageId !== 'all' && selectedStageId !== sid) selectedStageId = 'all';
        expandedStages.add(sid);
        syncViewModeUrlAndStorage();
        renderAll();
        scrollToQuestionElement(qNum);
      });
    });

    bodyEl.querySelectorAll('[data-aq-open-unit]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const qNum = parseIdToken(btn.getAttribute('data-aq-open-unit'));
        const unitCode = btn.getAttribute('data-aq-unit');
        const sectionId = btn.getAttribute('data-aq-sec');
        if (qNum === null) return;
        activeView = 'stages';
        viewMode = 'units';
        if (selectedUnitCode !== 'all' && selectedUnitCode !== unitCode) selectedUnitCode = 'all';
        if (sectionId) expandedSectionIds.add(sectionId);
        collapsedExamCards.delete(qNum);
        syncViewModeUrlAndStorage();
        renderAll();
        scrollToQuestionElement(qNum);
      });
    });
  }

  function renderAllQuestionsView() {
    const container = document.getElementById('all-questions-container');
    if (!container) return;

    if (!aqShellBuilt) {
      container.innerHTML = `<div class="aq-stack">
        <section class="guide-card">
          <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;">
            <button type="button" class="btn btn-outline" id="aq-back-btn">← Back to Questions with Answers</button>
            <div class="filter-tabs" role="group" aria-label="Choose question list section">
              <button type="button" class="tab-btn active" data-aq-scope="both" aria-pressed="true">Study Order + Unit-wise</button>
              <button type="button" class="tab-btn" data-aq-scope="study" aria-pressed="false">Study Order (${totalQuestionCount})</button>
              <button type="button" class="tab-btn" data-aq-scope="units" aria-pressed="false">Unit-wise (${totalQuestionCount})</button>
            </div>
          </div>
          <div>
            <div class="unit-kicker" style="text-transform:uppercase;letter-spacing:0.04em;">Complete Question Bank (${totalQuestionCount} Questions)</div>
            <h1 style="margin-top:2px;">All Questions (Study Order &amp; Unit-wise)</h1>
            <p style="margin-top:4px;">Every question from the course bank in exact wording and layout—arranged both in Study Order and Unit-wise Exam Order without answers, so you can scan or test yourself across all ${totalQuestionCount} questions.</p>
          </div>
          <div class="guide-anchors" id="aq-jump-row"></div>
          <div class="toolbar-filters">
            <div class="search-wrap">
              <label for="aq-search-input" class="sr-only">Filter all questions</label>
              <input type="search" id="aq-search-input" placeholder="Filter all questions by keyword, Q#, or tag..." />
            </div>
            <div class="filter-tabs" role="group" aria-label="Filter all questions by marks">
              <button type="button" class="tab-btn active" data-aq-mark="all" aria-pressed="true">All marks</button>
              <button type="button" class="tab-btn" data-aq-mark="2" aria-pressed="false">2-mark</button>
              <button type="button" class="tab-btn" data-aq-mark="5" aria-pressed="false">5-mark</button>
            </div>
            <button type="button" id="aq-starred-btn" class="btn btn-star-filter" aria-pressed="false">★ Starred (0)</button>
            <button type="button" id="aq-hide-done-btn" class="btn btn-outline" aria-pressed="false">Hide done</button>
            <button type="button" id="aq-reset-filters-btn" class="btn-text-link" hidden>Reset filters</button>
          </div>
        </section>
        <div id="aq-sections-body" class="aq-stack"></div>
      </div>`;

      document.getElementById('aq-back-btn')?.addEventListener('click', () => {
        activeView = 'stages';
        syncViewModeUrlAndStorage();
        renderAll();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      container.querySelectorAll('[data-aq-scope]').forEach((btn) => {
        btn.addEventListener('click', () => {
          aqScope = btn.getAttribute('data-aq-scope');
          renderAllQuestionsListAndState();
        });
      });
      container.querySelectorAll('[data-aq-mark]').forEach((btn) => {
        btn.addEventListener('click', () => {
          aqMarks = btn.getAttribute('data-aq-mark');
          renderAllQuestionsListAndState();
        });
      });
      document.getElementById('aq-search-input')?.addEventListener('input', (e) => {
        aqSearch = e.target.value;
        renderAllQuestionsListAndState();
      });
      document.getElementById('aq-starred-btn')?.addEventListener('click', () => {
        aqOnlyStarred = !aqOnlyStarred;
        renderAllQuestionsListAndState();
      });
      document.getElementById('aq-hide-done-btn')?.addEventListener('click', () => {
        aqOnlyPending = !aqOnlyPending;
        renderAllQuestionsListAndState();
      });
      document.getElementById('aq-reset-filters-btn')?.addEventListener('click', () => {
        aqSearch = '';
        aqMarks = 'all';
        aqOnlyPending = false;
        aqOnlyStarred = false;
        const inp = document.getElementById('aq-search-input');
        if (inp) inp.value = '';
        renderAllQuestionsListAndState();
      });
      aqShellBuilt = true;
    }

    renderAllQuestionsListAndState();
  }

  function renderMainQuestionArea() {
    const stagesCont = document.getElementById('stages-container');
    const examCont = document.getElementById('exam-container');
    if (viewMode === 'units') {
      if (stagesCont) stagesCont.hidden = true;
      if (examCont) examCont.hidden = false;
      renderExamView();
    } else {
      if (stagesCont) stagesCont.hidden = false;
      if (examCont) examCont.hidden = true;
      renderStages();
    }
  }

  function renderAll() {
    const stagesView = document.getElementById('stages-view');
    const guideView = document.getElementById('guide-container');
    const allQView = document.getElementById('all-questions-container');
    renderHeaderAndViewSwitch();
    renderSidebar();
    if (activeView === 'questions') {
      stagesView.hidden = true;
      guideView.hidden = true;
      if (allQView) allQView.hidden = false;
      renderAllQuestionsView();
    } else if (activeView === 'stages') {
      stagesView.hidden = false;
      guideView.hidden = true;
      if (allQView) allQView.hidden = true;
      renderMainQuestionArea();
    } else {
      stagesView.hidden = true;
      guideView.hidden = false;
      if (allQView) allQView.hidden = true;
      renderGuideView();
    }
  }

  function handleSwitchView(targetMode) {
    const currentQ = activeView === 'stages' ? findCurrentReadingQuestionNumber() : null;
    activeView = 'stages';
    viewMode = targetMode;
    syncViewModeUrlAndStorage();
    if (currentQ !== null) {
      ensureQuestionVisibleInView(currentQ, targetMode);
    }
    renderAll();
    if (currentQ !== null) {
      scrollToQuestionElement(currentQ);
    }
  }

  function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebar-backdrop').hidden = true;
  }

  function openHelpModal() {
    document.getElementById('help-modal').hidden = false;
  }

  function closeHelpModal() {
    document.getElementById('help-modal').hidden = true;
  }

  document.getElementById('switch-study-btn')?.addEventListener('click', () => handleSwitchView('study'));
  document.getElementById('switch-units-btn')?.addEventListener('click', () => handleSwitchView('units'));
  document.getElementById('open-all-questions-btn')?.addEventListener('click', () => {
    activeView = 'questions';
    syncViewModeUrlAndStorage();
    renderAll();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.getElementById('theme-toggle-btn')?.addEventListener('click', () => {
    applyTheme(theme === 'dark' ? 'light' : 'dark');
  });

  window.addEventListener('hashchange', () => {
    const rawHash = window.location.hash.trim().toLowerCase();
    if (rawHash === '#questions') {
      activeView = 'questions';
      syncViewModeUrlAndStorage();
      renderAll();
      return;
    }
    const parsed = parseViewHash(window.location.hash);
    if (parsed && (parsed !== viewMode || activeView === 'questions')) {
      viewMode = parsed;
      activeView = 'stages';
      syncViewModeUrlAndStorage();
      renderAll();
    }
  });

  document.getElementById('search-input').addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderMainQuestionArea();
  });

  document.querySelectorAll('.tab-btn[data-mark]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn[data-mark]').forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      marksFilter = btn.getAttribute('data-mark');
      renderMainQuestionArea();
    });
  });

  document.getElementById('starred-only-btn')?.addEventListener('click', (e) => {
    onlyStarred = !onlyStarred;
    e.currentTarget.setAttribute('aria-pressed', String(onlyStarred));
    renderMainQuestionArea();
  });

  document.getElementById('hide-done-btn').addEventListener('click', (e) => {
    onlyPending = !onlyPending;
    e.currentTarget.setAttribute('aria-pressed', String(onlyPending));
    renderMainQuestionArea();
  });

  document.getElementById('practice-toggle-btn').addEventListener('click', (e) => {
    practiceMode = !practiceMode;
    revealedQuestions.clear();
    e.currentTarget.setAttribute('aria-pressed', String(practiceMode));
    e.currentTarget.textContent = `Practice mode: ${practiceMode ? 'On' : 'Off'}`;
    renderMainQuestionArea();
  });

  document.getElementById('expand-all-btn').addEventListener('click', () => {
    if (viewMode === 'units') {
      if (expandedSectionIds.size === ALL_UNIT_SECTION_IDS.length) {
        expandedSectionIds = new Set();
      } else {
        expandedSectionIds = new Set(ALL_UNIT_SECTION_IDS);
        collapsedExamCards.clear();
      }
      renderExamView();
      return;
    }
    if (expandedStages.size === stages.length) {
      expandedStages = new Set([1]);
    } else {
      expandedStages = new Set(stages.map((s) => s.id));
    }
    renderStages();
  });

  document.getElementById('reset-progress-btn').addEventListener('click', () => {
    doneSet.clear();
    saveIdList(DONE_KEY, doneSet);
    renderAll();
  });

  document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.add('open');
    document.getElementById('sidebar-backdrop').hidden = false;
  });
  document.getElementById('close-sidebar-btn').addEventListener('click', closeSidebar);
  document.getElementById('sidebar-backdrop').addEventListener('click', closeSidebar);

  document.getElementById('dismiss-quick-start-btn')?.addEventListener('click', () => {
    document.getElementById('quick-start-box').hidden = true;
  });
  document.getElementById('qs-open-guide-btn')?.addEventListener('click', () => {
    activeView = 'guide';
    renderAll();
  });
  document.getElementById('qs-open-sources-btn')?.addEventListener('click', () => {
    activeView = 'sources';
    renderAll();
  });

  document.getElementById('help-btn')?.addEventListener('click', openHelpModal);
  document.getElementById('close-help-btn')?.addEventListener('click', closeHelpModal);
  document.getElementById('modal-close-footer-btn')?.addEventListener('click', closeHelpModal);
  document.getElementById('modal-open-guide-btn')?.addEventListener('click', () => {
    closeHelpModal();
    activeView = 'guide';
    renderAll();
  });
  document.getElementById('modal-open-sources-btn')?.addEventListener('click', () => {
    closeHelpModal();
    activeView = 'sources';
    renderAll();
  });
  document.getElementById('help-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'help-modal') closeHelpModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeHelpModal();
  });

  document.getElementById('desktop-sidebar-toggle-btn')?.addEventListener('click', () => {
    applyDesktopSidebar(!desktopSidebarOpen);
  });
  document.getElementById('desktop-sidebar-collapse-btn')?.addEventListener('click', () => {
    applyDesktopSidebar(false);
  });

  document.getElementById('brand-reset-stage').addEventListener('click', (e) => {
    e.preventDefault();
    activeView = 'stages';
    selectedStageId = 'all';
    selectedUnitCode = 'all';
    syncViewModeUrlAndStorage();
    renderAll();
  });

  applyTheme(theme);
  applyDesktopSidebar(desktopSidebarOpen);
  syncViewModeUrlAndStorage();
  renderQuickStartAndHelp();
  renderAll();
})();

const STORAGE_KEY = "cww.docs.v4";
const LAST_DOC_KEY = "cww.lastDoc.v4";
const TRANSLATION_KEY = "cww.translation.v1";
const CUSTOM_TEMPLATES_KEY = "cww.customTemplates.v1";
const FLOW_STEP_KEY = "cww.flowStep.v1";
const FLOW_STEPS = ["read", "reflect", "write", "encourage"];
const AUTOSAVE_DELAY_MS = 1800;

const LABEL_COLORS = [
  "linear-gradient(90deg, #8a7e5e, #a09676)",
  "linear-gradient(90deg, #7d8a6a, #97a084)",
  "linear-gradient(90deg, #7a8265, #949d82)",
  "linear-gradient(90deg, #8a8060, #a49a7a)",
  "linear-gradient(90deg, #6b7a6a, #8a9a84)",
  "linear-gradient(90deg, #8a7060, #a09080)"
];

const NEXT_LABELS = {
  read: "Next: Reflect \u2192",
  reflect: "Next: Write \u2192",
  write: "Next: Encourage \u2192",
  encourage: "Next: Read \u2192"
};

const TRANSLATIONS = {
  kjv: { label: "KJV", file: "data/kjv.json" },
  asv: { label: "ASV", file: "data/asv.json" },
  engwebp: { label: "WEB", file: "data/engwebp.json" },
  net: { label: "NET", file: "data/net.json" }
};

const canonicalBooks = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth",
  "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra",
  "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon",
  "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos",
  "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah",
  "Malachi", "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians",
  "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians",
  "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon",
  "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"
];

const templates = {
  devotional: {
    label: "Devotional",
    body: `# Devotional\n\n## Scripture\n\n\n## Observation\n\n\n## Reflection\n\n\n## Application\n\n\n## Prayer\n\n`,
    prompts: [
      "What truth stands out in this passage?",
      "What does this reveal about God's character?",
      "Where does this challenge my current habits?",
      "How should this shape my response this week?"
    ]
  },
  prayer: {
    label: "Prayer",
    body: `# Prayer\n\n## Address to God\nFather,\n\n## Thanksgiving\n\n\n## Confession\n\n\n## Petition / Requests\n\n\n## Submission\nYour will be done.\n\n## Closing\nAmen.\n`,
    prompts: [
      "What specific grace from today can I thank God for?",
      "What sin or attitude needs honest confession?",
      "What request needs trust, not control?"
    ]
  },
  study: {
    label: "Study Reflection",
    body: `# Study Reflection\n\n## Passage\n\n\n## Observations\n\n\n## Key Words / Themes\n\n\n## Cross References\n\n\n## Insights\n\n\n## Questions\n\n\n## Application\n\n`,
    prompts: [
      "Which repeated words or ideas are central?",
      "What does the context clarify?",
      "How does this connect with the broader gospel story?"
    ]
  },
  encouragement: {
    label: "Encouragement Letter",
    body: `# Encouragement Letter\n\n## Greeting\n\n\n## Scripture\n\n\n## Encouragement\n\n\n## Personal Message\n\n\n## Prayer\n\n`,
    prompts: [
      "Which person is this for, and what burden are they carrying?",
      "Which promise of Scripture directly strengthens them?",
      "How can this be both truthful and tender?"
    ]
  },
  testimony: {
    label: "Testimony",
    body: `# My Testimony\n\n## Life Before Christ\n\n\n## How I Encountered Christ\n\n\n## What Changed\n\n\n## What Christ Means to Me Now\n\n`,
    prompts: [
      "What was my heart anchored to before Christ?",
      "What moment or process marked real surrender?",
      "What fruit has God grown since then?"
    ]
  },
  gratitude: {
    label: "Gratitude Journal",
    body: `# Gratitude Journal\n\n## Today's Blessings\n\n\n## Where I Saw God At Work\n\n\n## Scripture That Encouraged Me\n\n\n## Prayer of Gratitude\n\n`,
    prompts: [
      "What ordinary gift did I overlook today?",
      "Where did I see God's provision in weakness?",
      "How can gratitude move me into obedience?"
    ]
  },
  sermon: {
    label: "Teaching / Sermon Outline",
    body: `# Teaching / Sermon Outline\n\n## Passage\n\n\n## Big Idea\n\n\n## Key Points\n1. \n2. \n3. \n\n## Supporting Scripture\n\n\n## Illustrations\n\n\n## Application\n\n\n## Closing Challenge\n\n`,
    prompts: [
      "Is the big idea faithful to the text's main thrust?",
      "What clear response should listeners make?",
      "What might be misunderstood without clarification?"
    ]
  }
};

const verseBank = {
  Hope: ["Jeremiah 29:11", "Romans 15:13", "Isaiah 40:31"],
  Faith: ["Hebrews 11:1", "2 Corinthians 5:7", "Proverbs 3:5-6"],
  Anxiety: ["Philippians 4:6-7", "1 Peter 5:7", "Matthew 6:34"],
  Perseverance: ["James 1:2-4", "Galatians 6:9", "Romans 5:3-5"],
  Encouragement: ["Joshua 1:9", "Psalm 46:1", "Romans 8:38-39"],
  Gratitude: ["James 1:17", "Psalm 100:4", "1 Thessalonians 5:18"]
};

const fallbackVerses = {
  "John 15:5": "I am the vine, ye are the branches... without me ye can do nothing.",
  "James 1:17": "Every good gift and every perfect gift is from above...",
  "Philippians 4:6": "Be careful for nothing; but in every thing by prayer..."
};

const state = {
  currentId: null,
  currentTemplate: "",
  isDirty: false,
  currentLookupRef: "",
  bibleByRef: new Map(),
  translationCaches: {},
  activeTranslation: "kjv",
  crossRefs: {},
  bibleLoaded: false,
  currentStep: "write",
  lastFocusedBlock: null,
  autoSaveTimer: null,
  lastSavedAt: ""
};

let resolveTimer = null;
let verseLookupTimer = null;

const $ = (id) => document.getElementById(id);

const els = {
  docTitle: $("doc-title"),
  translationSelect: $("translation-select"),
  templateSelect: $("template-select"),
  applyTemplateBtn: $("apply-template-btn"),
  templateApplySecondary: $("template-apply-secondary"),
  templateStudioModal: $("template-studio-modal"),
  templateModalBackdrop: $("template-modal-backdrop"),
  closeTemplateStudioBtn: $("close-template-studio-btn"),
  verseQuery: $("verse-query"),
  verseResult: $("verse-result"),
  categorySelect: $("category-select"),
  verseBankList: $("verse-bank-list"),
  promptsList: $("prompts-list"),
  crossRefsTitle: $("crossrefs-title"),
  crossRefsList: $("crossrefs-list"),
  templateList: $("template-list"),
  templatePreview: $("template-preview"),
  templatePromptPreview: $("template-prompt-preview"),
  editor: $("editor"),
  notes: $("notes"),
  savedList: $("saved-list"),
  saveBtn: $("save-btn"),
  exportBtn: $("export-btn"),
  printBtn: $("print-btn"),
  newDocBtn: $("new-doc-btn"),
  resolveBtn: $("resolve-btn"),
  status: $("status"),
  writingStats: $("writing-stats"),
  saveMeta: $("save-meta"),
  importFileInput: $("import-file-input"),
  savedItemTemplate: $("saved-item-template")
};

let aliasMap = {};
try {
  aliasMap = buildAliasMap();
} catch (err) {
  console.error("Alias map init error:", err);
}
bootstrap();

/* ============================================================
   INIT
   ============================================================ */

async function init() {
  const steps = [
    ["fillTranslations", () => fillTranslations()],
    ["fillTemplates", () => fillTemplates()],
    ["renderTemplateStudio", () => renderTemplateStudio()],
    ["fillCategories", () => fillCategories()],
    ["renderVerseBank", () => renderVerseBank()],
    ["bindEvents", () => bindEvents()],
    ["bindVerseLibraryToggle", () => bindVerseLibraryToggle()],
    ["bindOverflowMenu", () => bindOverflowMenu()],
    ["bindRightSidebarTabs", () => bindRightSidebarTabs()],
    ["bindFlowNavigation", () => bindFlowNavigation()],
    ["bindVerseButtons", () => bindVerseButtons()],
    ["bindNextStepBtn", () => bindNextStepBtn()],
    ["bindAddTemplateBtn", () => bindAddTemplateBtn()],
    ["bindEncourageButtons", () => bindEncourageButtons()],
    ["bindDocSelector", () => bindDocSelector()],
    ["loadBibleAssets", () => loadBibleAssets()],
    ["loadLastOrStartFresh", () => loadLastOrStartFresh()],
    ["renderRightVerseBank", () => renderRightVerseBank()]
  ];

  for (const [name, fn] of steps) {
    try {
      await fn();
    } catch (err) {
      console.error("Init step failed:", name, err);
    }
  }

  updateWritingStats();
  updateSaveMeta();
  showToast(state.bibleLoaded ? "Ready" : "Ready (fallback verse set)");
}

function bootstrap() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      init().catch((err) => {
        console.error("Init error:", err);
        showToast("Error: " + (err?.message || "initialization failed"));
      });
    }, { once: true });
    return;
  }

  init().catch((err) => {
    console.error("Init error:", err);
    showToast("Error: " + (err?.message || "initialization failed"));
  });
}

/* ============================================================
   TOAST NOTIFICATIONS (visible feedback)
   ============================================================ */

function showToast(message) {
  let toast = document.getElementById("cww-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "cww-toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = "toast show";
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.className = "toast";
  }, 2500);
}

/* ============================================================
   FEATURE 1: STRUCTURED EDITOR BLOCKS
   ============================================================ */

function getCustomTemplates() {
  try {
    return JSON.parse(localStorage.getItem(CUSTOM_TEMPLATES_KEY) || "{}");
  } catch {
    return {};
  }
}

function getAllTemplates() {
  return { ...templates, ...getCustomTemplates() };
}

function getTemplateSections(templateKey) {
  const allTemplates = getAllTemplates();
  const tmpl = allTemplates[templateKey];
  if (!tmpl) return [{ name: "Writing" }];

  const sections = [];
  const lines = tmpl.body.split("\n");
  for (const line of lines) {
    if (line.startsWith("## ")) {
      sections.push({ name: line.slice(3).trim() });
    }
  }
  return sections.length ? sections : [{ name: "Writing" }];
}

function buildStructuredBlocks(templateKey) {
  const editorEl = $("structured-editor");
  if (!editorEl) return;
  editorEl.innerHTML = "";

  const sections = getTemplateSections(templateKey);
  sections.forEach((section, index) => {
    const block = createBlock(section.name, "", "Write your " + section.name.toLowerCase() + "...", index);
    editorEl.appendChild(block);
  });
}

function createBlock(sectionName, content, placeholder, colorIndex) {
  const block = document.createElement("div");
  block.className = "editor-block";

  const label = document.createElement("div");
  label.className = "block-label";
  label.textContent = sectionName;
  label.style.background = LABEL_COLORS[(colorIndex || 0) % LABEL_COLORS.length];

  const contentEl = document.createElement("div");
  contentEl.className = "block-content";
  contentEl.setAttribute("contenteditable", "true");
  contentEl.setAttribute("data-placeholder", placeholder);
  if (content) contentEl.innerText = content;

  contentEl.addEventListener("input", () => {
    syncBlocksToTextarea();
    markDirty("Unsaved changes");
    debounceAutoResolve();
  });

  contentEl.addEventListener("focus", () => {
    state.lastFocusedBlock = contentEl;
  });

  block.appendChild(label);
  block.appendChild(contentEl);
  return block;
}

function syncBlocksToTextarea() {
  const blocks = document.querySelectorAll("#structured-editor .editor-block");
  let text = "";
  blocks.forEach((block) => {
    const label = block.querySelector(".block-label");
    const content = block.querySelector(".block-content");
    if (label && content) {
      text += "## " + label.textContent + "\n" + content.innerText + "\n\n";
    }
  });
  els.editor.value = text.trim();
  updateWritingStats();
}

function syncTextareaToBlocks() {
  const text = els.editor.value;
  if (!text.trim()) return;

  const blocks = document.querySelectorAll("#structured-editor .editor-block");

  // Parse saved text into sections
  const sections = [];
  const lines = text.split("\n");
  let currentSection = null;
  let freeText = "";

  for (const line of lines) {
    if (line.startsWith("## ")) {
      if (currentSection) sections.push(currentSection);
      currentSection = { name: line.slice(3).trim(), content: "" };
    } else if (line.startsWith("# ") && !currentSection) {
      // Skip top-level header
    } else if (currentSection) {
      currentSection.content += line + "\n";
    } else {
      freeText += line + "\n";
    }
  }
  if (currentSection) sections.push(currentSection);
  sections.forEach((s) => (s.content = s.content.trim()));

  // If no sections parsed, put text in first block
  if (sections.length === 0 && freeText.trim()) {
    const firstContent = blocks[0]?.querySelector(".block-content");
    if (firstContent) firstContent.innerText = freeText.trim();
    return;
  }

  // Match sections to blocks by label name
  blocks.forEach((block) => {
    const label = block.querySelector(".block-label");
    const content = block.querySelector(".block-content");
    if (!label || !content) return;

    const match = sections.find(
      (s) => s.name.toLowerCase() === label.textContent.toLowerCase()
    );
    if (match && match.content) {
      content.innerText = match.content;
    }
  });
}

/* ============================================================
   FEATURE 2: OVERFLOW MENU
   ============================================================ */

function bindOverflowMenu() {
  const btn = $("overflow-menu-btn");
  const dropdown = $("overflow-dropdown");
  if (!btn || !dropdown) return;

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("hidden");
  });

  document.addEventListener("click", () => {
    dropdown.classList.add("hidden");
  });

  dropdown.addEventListener("click", (e) => {
    const action = e.target.closest("button")?.dataset.action;
    if (!action) return;
    dropdown.classList.add("hidden");
    switch (action) {
      case "save": saveCurrent(); break;
      case "new": newDocument(); break;
      case "duplicate": duplicateCurrentDocument(); break;
      case "delete": deleteCurrentDocument(); break;
      case "copy": copyWritingAndNotes(); break;
      case "import": promptImportTxt(); break;
      case "export": exportTxt(); break;
      case "print": printView(); break;
      case "resolve": resolveReferencesInEditor(); break;
    }
  });
}

/* ============================================================
   FEATURE 3: DOCUMENT SELECTOR DROPDOWN
   ============================================================ */

function renderDocSelector() {
  const select = $("doc-title-select");
  if (!select) return;
  const docs = getDocs();

  select.innerHTML = "";

  // If current doc is unsaved, show placeholder
  if (!state.currentId || !docs.find((d) => d.id === state.currentId)) {
    const opt = document.createElement("option");
    opt.value = "__current__";
    opt.textContent = (els.docTitle.value.trim() || "Untitled Devotional") + (state.isDirty ? " *" : "");
    opt.selected = true;
    select.appendChild(opt);
  }

  docs.forEach((doc) => {
    const opt = document.createElement("option");
    opt.value = doc.id;
    const dirtyMarker = doc.id === state.currentId && state.isDirty ? " *" : "";
    opt.textContent = (doc.title || "Untitled") + dirtyMarker;
    if (doc.id === state.currentId) opt.selected = true;
    select.appendChild(opt);
  });

  // Separator
  const sep = document.createElement("option");
  sep.disabled = true;
  sep.textContent = "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500";
  select.appendChild(sep);

  // New Document option
  const newOpt = document.createElement("option");
  newOpt.value = "__new__";
  newOpt.textContent = "+ New Document";
  select.appendChild(newOpt);
}

function bindDocSelector() {
  const select = $("doc-title-select");
  if (!select) return;
  select.addEventListener("change", (e) => {
    const val = e.target.value;
    if (val === "__new__") {
      newDocument();
    } else if (val && val !== "__current__") {
      loadDocument(val);
    }
  });
}

/* ============================================================
   FEATURE 4: RIGHT SIDEBAR TABS
   ============================================================ */

function bindRightSidebarTabs() {
  const tabs = document.querySelectorAll(".right-tabs span[data-tab]");
  const notesPanel = $("notes-panel");
  const versebankPanel = $("versebank-panel");
  if (!tabs.length || !notesPanel || !versebankPanel) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const target = tab.dataset.tab;
      if (target === "notes") {
        notesPanel.classList.remove("hidden");
        versebankPanel.classList.add("hidden");
      } else {
        notesPanel.classList.add("hidden");
        versebankPanel.classList.remove("hidden");
      }
    });
  });
}

function renderRightVerseBank() {
  const list = $("right-verse-bank-list");
  if (!list) return;
  list.innerHTML = "";

  Object.entries(verseBank).forEach(([category, refs]) => {
    const headerLi = document.createElement("li");
    headerLi.style.cssText = "font-size:11px;padding:5px 6px 2px;font-weight:700;color:var(--muted)";
    headerLi.textContent = category;
    list.appendChild(headerLi);

    refs.forEach((ref) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = ref;
      btn.addEventListener("click", () => {
        els.verseQuery.value = ref;
        lookupVerse();
      });
      li.appendChild(btn);
      list.appendChild(li);
    });
  });
}

/* ============================================================
   FEATURE 5: WIRE "+ VERSE" BUTTONS
   ============================================================ */

function bindVerseButtons() {
  const notesBtn = $("add-verse-notes-btn");
  const editorBtn = $("add-verse-editor-btn");

  if (notesBtn) {
    notesBtn.addEventListener("click", () => {
      if (!state.currentLookupRef) {
        setStatus("Search for a verse first");
        return;
      }
      const passage = resolvePassage(normalizeReference(state.currentLookupRef));
      if (!passage) {
        setStatus("Could not resolve verse");
        return;
      }
      els.notes.value = (els.notes.value.trimEnd() + "\n" + passage.displayRef + " - " + passage.text + "\n").trimStart();
      markDirty("Added " + passage.displayRef + " to notes");
    });
  }

  if (editorBtn) {
    editorBtn.addEventListener("click", () => {
      if (!state.currentLookupRef) {
        setStatus("Search for a verse first");
        return;
      }
      const token = "[[" + state.currentLookupRef + "]]";
      const target = state.lastFocusedBlock || document.querySelector("#structured-editor .block-content");
      if (target) {
        const text = target.innerText;
        target.innerText = text ? text + " " + token : token;
        syncBlocksToTextarea();
        debounceAutoResolve();
      } else {
        insertTextIntoEditor(token);
      }
      markDirty("Inserted " + token);
    });
  }
}

/* ============================================================
   FEATURE 7: FLOW NAVIGATION
   ============================================================ */

function switchFlowStep(step) {
  state.currentStep = step;
  localStorage.setItem(FLOW_STEP_KEY, step);

  // Update flow nav active state
  document.querySelectorAll(".flow-step[data-step]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.step === step);
  });

  // Toggle panels
  document.querySelectorAll(".flow-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === "panel-" + step);
  });

  // Update titles
  const titles = {
    read: "Read Scripture",
    reflect: "Reflect on the Word",
    write: "Write Your Devotional",
    encourage: "Encourage & Share"
  };
  const subheads = {
    read: "1 READ",
    reflect: "2 REFLECT",
    write: "1 READ \u2014 2 REFLECT \u2014 3 WRITE",
    encourage: "4 ENCOURAGE"
  };

  const canvasTitle = $("canvas-title");
  const subheadFlow = $("subhead-flow");
  if (canvasTitle) canvasTitle.textContent = titles[step] || titles.write;
  if (subheadFlow) subheadFlow.textContent = subheads[step] || subheads.write;

  // Update next button
  const nextBtn = $("next-step-btn");
  if (nextBtn) nextBtn.textContent = NEXT_LABELS[step] || NEXT_LABELS.write;

  // Update panel content
  if (step === "reflect") updateReflectPanel();
  if (step === "read") updateReadPanel();
}

function bindFlowNavigation() {
  document.querySelectorAll(".flow-step[data-step]").forEach((btn) => {
    btn.addEventListener("click", () => {
      switchFlowStep(btn.dataset.step);
    });
  });
}

function updateReadPanel() {
  const display = $("read-scripture-display");
  if (!display) return;

  if (!state.currentLookupRef) {
    display.innerHTML = '<p class="muted">Search for a verse in the left sidebar to read and meditate on it here.</p>';
    return;
  }

  const passage = resolvePassage(normalizeReference(state.currentLookupRef));
  if (!passage) return;

  display.innerHTML =
    '<div class="block-verse-card">' +
    '<p class="verse-ref"><strong>' + escapeHtml(passage.displayRef) + '</strong> <span class="muted">(' + escapeHtml(TRANSLATIONS[state.activeTranslation]?.label || "KJV") + ')</span></p>' +
    '<p class="verse-text">' + escapeHtml(passage.text) + '</p>' +
    '</div>';
}

function updateReflectPanel() {
  const list = $("reflect-prompts-list");
  if (!list) return;
  list.innerHTML = "";

  const allTemplates = getAllTemplates();
  const active = allTemplates[state.currentTemplate];
  const prompts = active ? active.prompts : [
    "What truth from Scripture do I need to articulate clearly?",
    "How can this writing encourage someone else in Christ?",
    "What faithful next step should follow this reflection?"
  ];

  prompts.forEach((prompt) => {
    const li = document.createElement("li");
    li.textContent = prompt;
    list.appendChild(li);
  });
}

/* ============================================================
   FEATURE 8: NEXT STEP BUTTON
   ============================================================ */

function bindNextStepBtn() {
  const btn = $("next-step-btn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const idx = FLOW_STEPS.indexOf(state.currentStep);
    const next = FLOW_STEPS[(idx + 1) % FLOW_STEPS.length];
    switchFlowStep(next);
  });
}

/* ============================================================
   FEATURE 9: + ADD TEMPLATE
   ============================================================ */

function bindAddTemplateBtn() {
  const btn = $("add-template-btn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const name = window.prompt("Enter a name for your new template:");
    if (!name || !name.trim()) return;

    const key = safeFilename(name.trim());
    const custom = getCustomTemplates();
    custom[key] = {
      label: name.trim(),
      body: "# " + name.trim() + "\n\n## Scripture\n\n\n## Thoughts\n\n\n## Application\n\n\n## Prayer\n\n",
      prompts: [
        "What stands out in this passage?",
        "How does this apply to my life?",
        "What prayer does this lead to?"
      ]
    };
    localStorage.setItem(CUSTOM_TEMPLATES_KEY, JSON.stringify(custom));
    fillTemplates();
    renderTemplateStudio();
    setStatus("Template \"" + name.trim() + "\" created");
  });
}

/* ============================================================
   FEATURE 10: AUTO-RESOLVE [[VERSE]] TOKENS
   ============================================================ */

function autoResolveVerseTokens() {
  const blocks = document.querySelectorAll("#structured-editor .block-content");
  let anyResolved = false;

  blocks.forEach((block) => {
    const text = block.innerText;
    const newText = text.replace(/\[\[([^\]]+)\]\]/g, (full, rawRef) => {
      const parsed = resolvePassage(normalizeReference(rawRef.trim()));
      if (parsed) {
        anyResolved = true;
        return parsed.displayRef + ': "' + parsed.text + '"';
      }
      return full;
    });
    if (newText !== text) {
      block.innerText = newText;
    }
  });

  if (anyResolved) {
    syncBlocksToTextarea();
    markDirty("Verse tokens resolved");
  }
}

function debounceAutoResolve() {
  clearTimeout(resolveTimer);
  resolveTimer = setTimeout(autoResolveVerseTokens, 800);
}

/* ============================================================
   ENCOURAGE PANEL BUTTONS
   ============================================================ */

function bindEncourageButtons() {
  const saveBtn = $("encourage-save-btn");
  const exportBtn = $("encourage-export-btn");
  const printBtn = $("encourage-print-btn");

  if (saveBtn) saveBtn.addEventListener("click", saveCurrent);
  if (exportBtn) exportBtn.addEventListener("click", exportTxt);
  if (printBtn) printBtn.addEventListener("click", printView);
}

/* ============================================================
   VERSE LIBRARY TOGGLE
   ============================================================ */

function bindVerseLibraryToggle() {
  const toggle = $("verse-library-toggle");
  const body = $("verse-library-body");
  if (!toggle || !body) return;
  toggle.addEventListener("click", () => {
    toggle.classList.toggle("expanded");
    body.classList.toggle("expanded");
  });
}

/* ============================================================
   BIBLE / TRANSLATION HELPERS
   ============================================================ */

function buildAliasMap() {
  const aliases = {};
  const extra = {
    "songofsongs": "Song of Solomon",
    "songofsolomon": "Song of Solomon",
    "psalm": "Psalms",
    "ps": "Psalms",
    "jn": "John",
    "jhn": "John",
    "mt": "Matthew",
    "mk": "Mark",
    "lk": "Luke",
    "rom": "Romans",
    "1cor": "1 Corinthians",
    "2cor": "2 Corinthians",
    "1thess": "1 Thessalonians",
    "2thess": "2 Thessalonians",
    "1tim": "1 Timothy",
    "2tim": "2 Timothy",
    "phlm": "Philemon",
    "rev": "Revelation"
  };

  canonicalBooks.forEach((book) => {
    aliases[normalizeBookToken(book)] = book;
  });
  Object.entries(extra).forEach(([k, v]) => {
    aliases[k] = v;
  });
  return aliases;
}

function fillTemplates() {
  const allTemplates = getAllTemplates();
  els.templateSelect.innerHTML = '<option value="">No Template</option>';
  Object.entries(allTemplates).forEach(([key, template]) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = template.label;
    els.templateSelect.appendChild(option);
  });
}

function fillTranslations() {
  const saved = localStorage.getItem(TRANSLATION_KEY);
  if (saved && TRANSLATIONS[saved]) state.activeTranslation = saved;

  els.translationSelect.innerHTML = "";
  Object.entries(TRANSLATIONS).forEach(([id, config]) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = config.label;
    if (id === state.activeTranslation) option.selected = true;
    els.translationSelect.appendChild(option);
  });
}

function fillCategories() {
  els.categorySelect.innerHTML = "";
  Object.keys(verseBank).forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    els.categorySelect.appendChild(option);
  });
}

function bindEvents() {
  if (els.templateSelect) {
    els.templateSelect.addEventListener("change", () => {
      state.currentTemplate = els.templateSelect.value;
      renderPrompts();
      renderTemplateStudio();
    });
  }
  if (els.applyTemplateBtn) {
    els.applyTemplateBtn.addEventListener("click", () => applyTemplateSelection(els.templateSelect?.value));
  }
  if (els.templateApplySecondary) {
    els.templateApplySecondary.addEventListener("click", () => applyTemplateSelection(state.currentTemplate || els.templateSelect?.value));
  }
  if (els.closeTemplateStudioBtn) {
    els.closeTemplateStudioBtn.addEventListener("click", closeTemplateStudio);
  }
  if (els.templateModalBackdrop) {
    els.templateModalBackdrop.addEventListener("click", closeTemplateStudio);
  }
  if (els.verseQuery) {
    els.verseQuery.addEventListener("keydown", (event) => {
      if (event.key === "Enter") lookupVerse();
    });
    els.verseQuery.addEventListener("input", () => {
      clearTimeout(verseLookupTimer);
      verseLookupTimer = setTimeout(() => {
        const query = els.verseQuery.value.trim();
        if (isVerseReferenceQuery(query)) lookupVerse();
      }, 350);
    });
  }
  if (els.categorySelect) {
    els.categorySelect.addEventListener("change", renderVerseBank);
  }
  if (els.editor) {
    els.editor.addEventListener("input", () => markDirty("Unsaved changes"));
  }
  if (els.notes) {
    els.notes.addEventListener("input", () => markDirty("Unsaved notes"));
  }
  if (els.docTitle) {
    els.docTitle.addEventListener("input", () => markDirty("Unsaved title"));
  }
  if (els.saveBtn) {
    els.saveBtn.addEventListener("click", saveCurrent);
  }
  if (els.newDocBtn) {
    els.newDocBtn.addEventListener("click", newDocument);
  }
  if (els.exportBtn) {
    els.exportBtn.addEventListener("click", exportTxt);
  }
  if (els.printBtn) {
    els.printBtn.addEventListener("click", printView);
  }
  if (els.resolveBtn) {
    els.resolveBtn.addEventListener("click", resolveReferencesInEditor);
  }
  if (els.translationSelect) {
    els.translationSelect.addEventListener("change", async () => {
      const id = els.translationSelect.value;
      await switchTranslation(id);
    });
  }
  if (els.importFileInput) {
    els.importFileInput.addEventListener("change", async (event) => {
      const file = event.target.files?.[0];
      if (!file) return;
      await importTxtFile(file);
      event.target.value = "";
    });
  }
  window.addEventListener("beforeunload", (event) => {
    if (!state.isDirty) return;
    event.preventDefault();
    event.returnValue = "";
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeTemplateStudio();
    if ((event.ctrlKey || event.metaKey) && event.key === "s") {
      event.preventDefault();
      saveCurrent();
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "n") {
      event.preventDefault();
      newDocument();
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "e") {
      event.preventDefault();
      exportTxt();
    }
    if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === "d") {
      event.preventDefault();
      duplicateCurrentDocument();
    }
    if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === "r") {
      event.preventDefault();
      resolveReferencesInEditor();
    }
    if (!event.ctrlKey && !event.metaKey && !event.altKey && event.key === "/") {
      const targetTag = event.target?.tagName?.toLowerCase();
      const isTypingTarget = targetTag === "input" || targetTag === "textarea" || event.target?.isContentEditable;
      if (isTypingTarget) return;
      event.preventDefault();
      els.verseQuery?.focus();
      els.verseQuery?.select();
    }
  });
}

async function loadBibleAssets() {
  try {
    const [bibleResp, crossResp] = await Promise.all([
      fetch(TRANSLATIONS.kjv.file),
      fetch("data/crossrefs.min.json")
    ]);

    if (!bibleResp.ok) throw new Error("Could not load kjv.json");
    const bibleData = await bibleResp.json();
    state.translationCaches.kjv = buildBibleIndex(bibleData);
    state.bibleByRef = state.translationCaches.kjv;

    if (crossResp.ok) {
      state.crossRefs = await crossResp.json();
    }
    state.bibleLoaded = true;
  } catch {
    state.bibleByRef = new Map();
    Object.entries(fallbackVerses).forEach(([k, v]) => state.bibleByRef.set(k, v));
    state.translationCaches.kjv = state.bibleByRef;
    state.bibleLoaded = false;
  }
}

function buildBibleIndex(data) {
  const map = new Map();
  data.forEach((bookObj, bookIdx) => {
    const book = canonicalBooks[bookIdx];
    if (!book || !Array.isArray(bookObj.chapters)) return;
    bookObj.chapters.forEach((chapter, cIdx) => {
      chapter.forEach((verseText, vIdx) => {
        const key = book + " " + (cIdx + 1) + ":" + (vIdx + 1);
        map.set(key, String(verseText || "").trim());
      });
    });
  });
  return map;
}

async function switchTranslation(id) {
  if (!TRANSLATIONS[id]) return;
  state.activeTranslation = id;
  localStorage.setItem(TRANSLATION_KEY, id);

  if (!state.translationCaches[id]) {
    try {
      const resp = await fetch(TRANSLATIONS[id].file);
      if (!resp.ok) throw new Error("translation fetch failed");
      const data = await resp.json();
      state.translationCaches[id] = buildBibleIndex(data);
    } catch {
      setStatus("Failed to load " + TRANSLATIONS[id].label);
      return;
    }
  }

  state.bibleByRef = state.translationCaches[id];
  setStatus(TRANSLATIONS[id].label + " loaded");
  if (els.verseQuery.value.trim()) lookupVerse();
}

/* ============================================================
   VERSE LOOKUP
   ============================================================ */

function lookupVerse() {
  const query = normalizeReference(els.verseQuery.value.trim());
  if (!query) return;
  const passage = resolvePassage(query);

  els.verseResult.classList.remove("hidden");

  if (!passage) {
    els.verseResult.innerHTML = '<p><strong>' + escapeHtml(query) + '</strong> was not found.</p><p class="muted">Try full format like John 15:5.</p>';
    els.crossRefsTitle.textContent = "No cross references available";
    els.crossRefsList.innerHTML = "";
    return;
  }

  state.currentLookupRef = passage.anchorRef;
  renderCrossRefs();
  updateReadPanel();

  els.verseResult.innerHTML =
    '<p class="ref">' + escapeHtml(passage.displayRef) + ' <span class="muted">(' + escapeHtml(TRANSLATIONS[state.activeTranslation]?.label || "KJV") + ')</span></p>' +
    '<p>' + escapeHtml(passage.text) + '</p>' +
    '<div class="row">' +
    '<button class="btn primary" id="insert-verse-btn">Insert in Writing</button>' +
    '<button class="btn" id="insert-note-verse-btn">Send to Notes</button>' +
    '</div>';

  $("insert-verse-btn").addEventListener("click", () => {
    const verseText = "\n> " + passage.displayRef + "\n> " + passage.text + "\n";
    const target = state.lastFocusedBlock || document.querySelector("#structured-editor .block-content");
    if (target) {
      target.innerText = (target.innerText ? target.innerText + "\n" : "") + passage.displayRef + ": " + passage.text;
      syncBlocksToTextarea();
    } else {
      insertTextIntoEditor(verseText);
    }
    markDirty("Inserted " + passage.displayRef);
  });
  $("insert-note-verse-btn").addEventListener("click", () => {
    els.notes.value = (els.notes.value.trimEnd() + "\n" + passage.displayRef + " - " + passage.text + "\n").trimStart();
    markDirty("Added " + passage.displayRef + " to notes");
  });
}

function resolvePassage(inputRef) {
  const rangeMatch = inputRef.match(/^(.+?)\s+(\d+):(\d+)-(?:(\d+):)?(\d+)$/i);
  if (rangeMatch) {
    const book = resolveBook(rangeMatch[1]);
    if (!book) return null;
    const startChapter = Number(rangeMatch[2]);
    const startVerse = Number(rangeMatch[3]);
    const endChapter = rangeMatch[4] ? Number(rangeMatch[4]) : startChapter;
    const endVerse = Number(rangeMatch[5]);
    const texts = [];
    for (let c = startChapter; c <= endChapter; c += 1) {
      const first = c === startChapter ? startVerse : 1;
      const last = c === endChapter ? endVerse : first + 30;
      for (let v = first; v <= last; v += 1) {
        const key = book + " " + c + ":" + v;
        const t = state.bibleByRef.get(key);
        if (!t) break;
        texts.push(c + ":" + v + " " + t);
        if (texts.length >= 12) break;
      }
      if (texts.length >= 12) break;
    }
    if (!texts.length) return null;
    const displayRef = book + " " + startChapter + ":" + startVerse + "-" + endChapter + ":" + endVerse;
    return {
      anchorRef: book + " " + startChapter + ":" + startVerse,
      displayRef,
      text: texts.join(" ")
    };
  }

  const single = inputRef.match(/^(.+?)\s+(\d+):(\d+)$/i);
  if (!single) return null;
  const book = resolveBook(single[1]);
  if (!book) return null;
  const chapter = Number(single[2]);
  const verse = Number(single[3]);
  const key = book + " " + chapter + ":" + verse;
  const text = state.bibleByRef.get(key);
  if (!text) return null;
  return { anchorRef: key, displayRef: key, text };
}

function resolveBook(token) {
  const normalized = normalizeBookToken(token);
  return aliasMap[normalized] || null;
}

function normalizeBookToken(value) {
  return String(value).toLowerCase().replace(/[.\s]/g, "");
}

/* ============================================================
   CROSS REFERENCES (Feature 6 — dynamic items)
   ============================================================ */

function renderCrossRefs() {
  els.crossRefsList.innerHTML = "";
  if (!state.currentLookupRef) {
    els.crossRefsTitle.textContent = "Look up a verse to see related passages.";
    return;
  }
  const refs = state.crossRefs[state.currentLookupRef] || [];
  els.crossRefsTitle.textContent = refs.length
    ? "Related to " + state.currentLookupRef
    : "No indexed cross references for " + state.currentLookupRef;

  refs.forEach((entry) => {
    const li = document.createElement("li");
    li.className = "crossref-item";
    const icon = document.createElement("span");
    icon.className = "crossref-icon";
    icon.textContent = "\u2713";
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = entry.ref + " (votes: " + entry.votes + ")";
    button.addEventListener("click", () => {
      const startRef = entry.ref.split("-")[0];
      els.verseQuery.value = startRef;
      lookupVerse();
    });
    li.appendChild(icon);
    li.appendChild(button);
    els.crossRefsList.appendChild(li);
  });
}

/* ============================================================
   TEMPLATE STUDIO / PROMPTS
   ============================================================ */

function applyTemplateSelection(selectedKey) {
  const key = selectedKey || els.templateSelect.value;
  state.currentTemplate = key;
  renderPrompts();
  renderTemplateStudio();
  if (!key) {
    buildStructuredBlocks("");
    markDirty("Template cleared");
    return;
  }
  const allTemplates = getAllTemplates();
  const templateText = allTemplates[key]?.body || "";
  els.editor.value = templateText;
  els.templateSelect.value = key;
  buildStructuredBlocks(key);
  syncTextareaToBlocks();
  closeTemplateStudio();
  // Switch to WRITE step so user sees the blocks
  switchFlowStep("write");
  markDirty("Template applied: " + (allTemplates[key]?.label || key));
}

const templateIcons = {
  devotional: "\u{1F4D5}",
  prayer: "\u{1F4D9}",
  gratitude: "\u{1F4CC}",
  study: "\u{1F4CC}",
  testimony: "\u{1F4CC}",
  encouragement: "\u{1F4CC}",
  sermon: "\u{1F4CC}"
};

function renderTemplateStudio() {
  if (!els.templateList) return;
  els.templateList.innerHTML = "";
  const allTemplates = getAllTemplates();
  Object.entries(allTemplates).forEach(([key, template]) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    const icon = templateIcons[key] || "\u{1F4CC}";
    btn.innerHTML = '<span class="tmpl-icon">' + icon + '</span> ' + template.label;
    if (key === state.currentTemplate) btn.classList.add("active-template");
    btn.addEventListener("click", () => {
      applyTemplateSelection(key);
    });
    li.appendChild(btn);
    els.templateList.appendChild(li);
  });

  if (els.templatePreview) {
    const allTmpls = getAllTemplates();
    const active = allTmpls[state.currentTemplate];
    els.templatePreview.textContent = active
      ? active.body
      : "Select a template to preview structure here.";
  }

  if (els.templatePromptPreview) {
    els.templatePromptPreview.innerHTML = "";
    const allTmpls = getAllTemplates();
    const active = allTmpls[state.currentTemplate];
    (active?.prompts || []).forEach((prompt) => {
      const li = document.createElement("li");
      li.textContent = prompt;
      els.templatePromptPreview.appendChild(li);
    });
  }
}

function openTemplateStudio() {
  if (!state.currentTemplate && els.templateSelect.value) {
    state.currentTemplate = els.templateSelect.value;
  }
  renderTemplateStudio();
  els.templateStudioModal.classList.remove("hidden");
  els.templateStudioModal.setAttribute("aria-hidden", "false");
}

function closeTemplateStudio() {
  if (els.templateStudioModal.classList.contains("hidden")) return;
  els.templateStudioModal.classList.add("hidden");
  els.templateStudioModal.setAttribute("aria-hidden", "true");
}

function renderPrompts() {
  els.promptsList.innerHTML = "";
  const allTemplates = getAllTemplates();
  const active = allTemplates[state.currentTemplate];
  const prompts = active ? active.prompts : [
    "What truth from Scripture do I need to articulate clearly?",
    "How can this writing encourage someone else in Christ?",
    "What faithful next step should follow this reflection?"
  ];
  prompts.slice(0, 6).forEach((prompt) => {
    const item = document.createElement("li");
    item.textContent = prompt;
    els.promptsList.appendChild(item);
  });
}

const categoryIcons = {
  Hope: "\u{1F516}",
  Faith: "\u{1F516}",
  Anxiety: "\u2764",
  Perseverance: "\u2B50",
  Encouragement: "\u2666",
  Gratitude: "\u2666"
};

function renderVerseBank() {
  els.verseBankList.innerHTML = "";
  Object.keys(verseBank).forEach((category) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    const icon = categoryIcons[category] || "\u{1F516}";
    button.innerHTML = '<span class="cat-icon">' + icon + '</span> ' + category;
    button.addEventListener("click", () => {
      els.categorySelect.value = category;
      const refs = verseBank[category] || [];
      if (refs.length) {
        insertTextIntoEditor("[[" + refs[0] + "]]");
        markDirty("Inserted [[" + refs[0] + "]] token");
      }
    });
    item.appendChild(button);
    els.verseBankList.appendChild(item);
  });
}

/* ============================================================
   RESOLVE REFERENCES IN EDITOR (Feature 10 update)
   ============================================================ */

function resolveReferencesInEditor() {
  // Resolve in hidden textarea
  const before = els.editor.value;
  const resolved = before.replace(/\[\[([^\]]+)\]\]/g, (_, rawRef) => {
    const parsed = resolvePassage(normalizeReference(rawRef.trim()));
    return parsed ? "\n" + parsed.displayRef + '\n"' + parsed.text + '"\n' : "[[" + rawRef + "]]";
  });
  if (before !== resolved) {
    els.editor.value = resolved;
  }

  // Resolve in visible blocks
  const blocks = document.querySelectorAll("#structured-editor .block-content");
  let anyBlockResolved = false;
  blocks.forEach((block) => {
    const text = block.innerText;
    const newText = text.replace(/\[\[([^\]]+)\]\]/g, (full, rawRef) => {
      const parsed = resolvePassage(normalizeReference(rawRef.trim()));
      if (parsed) {
        anyBlockResolved = true;
        return parsed.displayRef + ': "' + parsed.text + '"';
      }
      return full;
    });
    if (newText !== text) {
      block.innerText = newText;
    }
  });

  if (before === resolved && !anyBlockResolved) {
    setStatus("No references resolved");
    return;
  }

  if (anyBlockResolved) syncBlocksToTextarea();
  markDirty("Scripture references resolved");
}

/* ============================================================
   SAVE / LOAD / NEW / EXPORT / PRINT
   ============================================================ */

function saveCurrent(options = {}) {
  const { silent = false, source = "manual" } = options;
  syncBlocksToTextarea();
  const docs = getDocs();
  const now = new Date();
  const doc = {
    id: state.currentId || crypto.randomUUID(),
    title: els.docTitle.value.trim() || "Untitled Reflection",
    template: state.currentTemplate,
    step: state.currentStep,
    editor: els.editor.value,
    notes: els.notes.value,
    updatedAt: now.toISOString()
  };
  const existingIndex = docs.findIndex((d) => d.id === doc.id);
  if (existingIndex >= 0) docs[existingIndex] = doc;
  else docs.unshift(doc);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(docs.slice(0, 30)));
  localStorage.setItem(LAST_DOC_KEY, doc.id);
  localStorage.setItem(FLOW_STEP_KEY, state.currentStep);
  state.currentId = doc.id;
  state.lastSavedAt = doc.updatedAt;
  state.isDirty = false;
  clearTimeout(state.autoSaveTimer);
  state.autoSaveTimer = null;
  if (silent) {
    els.status.textContent = source === "autosave"
      ? "Autosaved " + formatDate(now)
      : "Saved " + formatDate(now);
  } else {
    setStatus("Saved " + formatDate(now));
  }
  renderSavedList();
  renderDocSelector();
  updateSaveMeta();
}

function newDocument() {
  if (state.isDirty) {
    const proceed = window.confirm("Discard unsaved changes and start a new document?");
    if (!proceed) return;
  }
  state.currentId = null;
  state.currentTemplate = "";
  state.lastFocusedBlock = null;
  state.lastSavedAt = "";
  els.docTitle.value = "";
  els.editor.value = "";
  els.notes.value = "";
  els.templateSelect.value = "";
  buildStructuredBlocks("");
  switchFlowStep("write");
  renderPrompts();
  renderTemplateStudio();
  renderDocSelector();
  updateWritingStats();
  updateSaveMeta();
  setStatus("New document");
}

function loadLastOrStartFresh() {
  renderPrompts();
  renderSavedList();
  renderDocSelector();
  const docs = getDocs();
  const lastId = localStorage.getItem(LAST_DOC_KEY);
  const target = docs.find((d) => d.id === lastId) || docs[0];
  if (!target) {
    // Default to Devotional template on first load so blocks are visible
    state.currentTemplate = "devotional";
    els.templateSelect.value = "devotional";
    els.editor.value = templates.devotional.body;
    buildStructuredBlocks("devotional");
    syncTextareaToBlocks();
    const savedStep = localStorage.getItem(FLOW_STEP_KEY);
    if (FLOW_STEPS.includes(savedStep)) switchFlowStep(savedStep);
    renderPrompts();
    renderTemplateStudio();
    updateWritingStats();
    updateSaveMeta();
    return;
  }
  loadDocument(target.id);
}

function renderSavedList() {
  els.savedList.innerHTML = "";
  const allTemplates = getAllTemplates();
  getDocs().slice(0, 8).forEach((doc) => {
    const node = els.savedItemTemplate.content.firstElementChild.cloneNode(true);
    const openButton = node.querySelector(".open-doc-btn");
    const savedMeta = node.querySelector(".saved-meta");
    openButton.textContent = doc.title;
    openButton.addEventListener("click", () => loadDocument(doc.id));
    savedMeta.textContent = (doc.template ? allTemplates[doc.template]?.label || doc.template : "No template") + " \u00B7 " + formatDate(new Date(doc.updatedAt));
    els.savedList.appendChild(node);
  });
}

function loadDocument(id) {
  const doc = getDocs().find((entry) => entry.id === id);
  if (!doc) return;
  state.currentId = doc.id;
  state.currentTemplate = doc.template || "";
  state.currentStep = doc.step || localStorage.getItem(FLOW_STEP_KEY) || "write";
  state.lastSavedAt = doc.updatedAt || "";
  state.isDirty = false;
  state.lastFocusedBlock = null;
  els.docTitle.value = doc.title || "";
  els.editor.value = doc.editor || "";
  els.notes.value = doc.notes || "";
  els.templateSelect.value = state.currentTemplate;
  buildStructuredBlocks(state.currentTemplate);
  syncTextareaToBlocks();
  switchFlowStep(state.currentStep);
  renderPrompts();
  renderTemplateStudio();
  renderDocSelector();
  updateWritingStats();
  updateSaveMeta();
  localStorage.setItem(LAST_DOC_KEY, doc.id);
  setStatus("Loaded " + doc.title);
}

function duplicateCurrentDocument() {
  syncBlocksToTextarea();
  const copyTitleBase = (els.docTitle.value.trim() || "Untitled Reflection") + " (Copy)";
  const docs = getDocs();
  const now = new Date();
  const duplicate = {
    id: crypto.randomUUID(),
    title: copyTitleBase,
    template: state.currentTemplate,
    step: state.currentStep,
    editor: els.editor.value,
    notes: els.notes.value,
    updatedAt: now.toISOString()
  };
  docs.unshift(duplicate);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(docs.slice(0, 30)));
  state.currentId = duplicate.id;
  state.lastSavedAt = duplicate.updatedAt;
  state.isDirty = false;
  els.docTitle.value = duplicate.title;
  localStorage.setItem(LAST_DOC_KEY, duplicate.id);
  localStorage.setItem(FLOW_STEP_KEY, state.currentStep);
  renderSavedList();
  renderDocSelector();
  updateSaveMeta();
  setStatus("Duplicated document");
}

function deleteCurrentDocument() {
  if (!state.currentId) {
    setStatus("No saved document to delete");
    return;
  }
  const docs = getDocs();
  const target = docs.find((d) => d.id === state.currentId);
  if (!target) {
    setStatus("Document not found");
    return;
  }
  const proceed = window.confirm('Delete "' + (target.title || "Untitled") + '"? This cannot be undone.');
  if (!proceed) return;

  const remaining = docs.filter((d) => d.id !== state.currentId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(remaining));
  if (remaining.length) {
    loadDocument(remaining[0].id);
  } else {
    newDocument();
  }
  setStatus("Document deleted");
}

async function copyWritingAndNotes() {
  syncBlocksToTextarea();
  const combined = [
    els.docTitle.value.trim() || "Untitled Reflection",
    "",
    els.editor.value.trim(),
    "",
    "--- Notes ---",
    els.notes.value.trim()
  ].join("\n");
  try {
    await navigator.clipboard.writeText(combined);
    setStatus("Copied writing and notes");
  } catch {
    setStatus("Clipboard blocked by browser");
  }
}

function promptImportTxt() {
  els.importFileInput?.click();
}

async function importTxtFile(file) {
  const text = await file.text();
  const [bodyPart, notesPart] = text.split(/\n---\s*Notes\s*---\s*\n/i);

  if (state.isDirty) {
    const proceed = window.confirm("Replace current content with imported text?");
    if (!proceed) return;
  }

  state.currentId = null;
  state.lastSavedAt = "";
  const bodyLines = (bodyPart || "").split(/\r?\n/);
  const firstContentLine = bodyLines.find((line) => line.trim().length > 0) || "";
  const fallbackTitle = file.name.replace(/\.txt$/i, "");
  const inferredTitle = (firstContentLine || fallbackTitle).trim();
  els.docTitle.value = inferredTitle;

  let editorText = (bodyPart || "").trim();
  const titlePattern = new RegExp("^" + inferredTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\s*\\n\\s*\\n?");
  editorText = editorText.replace(titlePattern, "");
  els.editor.value = editorText.trim();
  els.notes.value = (notesPart || "").trim();
  buildStructuredBlocks(state.currentTemplate);
  syncTextareaToBlocks();
  renderDocSelector();
  updateWritingStats();
  updateSaveMeta();
  markDirty("Imported " + file.name);
}

function exportTxt() {
  syncBlocksToTextarea();
  const text = [
    els.docTitle.value.trim() || "Untitled Reflection",
    "",
    els.editor.value.trim(),
    "",
    "--- Notes ---",
    els.notes.value.trim()
  ].join("\n");
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = safeFilename(els.docTitle.value || "reflection") + ".txt";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  setStatus("Exported .txt");
}

function printView() {
  syncBlocksToTextarea();
  const title = escapeHtml(els.docTitle.value.trim() || "Untitled Reflection");
  const writing = escapeHtml(els.editor.value).replace(/\n/g, "<br>");
  const notes = escapeHtml(els.notes.value).replace(/\n/g, "<br>");
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    setStatus("Popup blocked. Could not open print view.");
    return;
  }
  printWindow.document.write(
    '<html><head><title>' + title + '</title>' +
    '<style>body{font-family:Georgia,serif;max-width:800px;margin:32px auto;line-height:1.6;color:#1f1f1f}' +
    'h1,h2{font-family:"Palatino Linotype",serif}' +
    '.notes{margin-top:30px;border-top:1px solid #bbb;padding-top:14px;color:#444}</style>' +
    '</head><body>' +
    '<h1>' + title + '</h1>' +
    '<div>' + writing + '</div>' +
    '<div class="notes"><h2>Notes</h2><div>' + notes + '</div></div>' +
    '</body></html>'
  );
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

/* ============================================================
   UTILITY
   ============================================================ */

function markDirty(message) {
  state.isDirty = true;
  els.status.textContent = message;
  scheduleAutoSave();
  renderDocSelector();
  updateWritingStats();
  updateSaveMeta();
  // Only show toast for significant actions, not every keystroke
  if (message !== "Unsaved changes" && message !== "Unsaved notes" && message !== "Unsaved title") {
    showToast(message);
  }
}

function setStatus(message, toast = true) {
  els.status.textContent = message;
  if (toast) showToast(message);
}

function getDocs() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function insertTextIntoEditor(text) {
  const textarea = els.editor;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const current = textarea.value;
  textarea.value = current.slice(0, start) + text + current.slice(end);
  textarea.focus();
  const nextPos = start + text.length;
  textarea.setSelectionRange(nextPos, nextPos);
}

function normalizeReference(ref) {
  return ref.replace(/\s+/g, " ").replace(/\.(\d)/g, ":$1").trim();
}

function isVerseReferenceQuery(query) {
  return /^([1-3]\s*)?[a-zA-Z. ]+\s+\d+:\d+(?:-\d+(?::\d+)?)?$/.test(query.trim());
}

function scheduleAutoSave() {
  clearTimeout(state.autoSaveTimer);
  state.autoSaveTimer = setTimeout(() => {
    if (!state.isDirty) return;
    saveCurrent({ silent: true, source: "autosave" });
  }, AUTOSAVE_DELAY_MS);
}

function updateWritingStats() {
  if (!els.writingStats) return;
  const text = [els.editor?.value || "", els.notes?.value || ""].join("\n").trim();
  if (!text) {
    els.writingStats.textContent = "0 words - 0 chars";
    return;
  }
  const words = text.split(/\s+/).filter(Boolean).length;
  const chars = text.length;
  els.writingStats.textContent = words + " words - " + chars + " chars";
}

function updateSaveMeta() {
  if (!els.saveMeta) return;
  if (state.isDirty) {
    els.saveMeta.textContent = "Unsaved changes";
    return;
  }
  if (!state.lastSavedAt) {
    els.saveMeta.textContent = "Not saved yet";
    return;
  }
  els.saveMeta.textContent = "Last saved " + formatDate(new Date(state.lastSavedAt));
}

function formatDate(date) {
  return date.toLocaleString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function safeFilename(value) {
  return value.replace(/[^a-z0-9_-]+/gi, "_").toLowerCase();
}

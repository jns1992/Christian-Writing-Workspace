const STORAGE_KEY = "cww.docs.v4";
const THEME_KEY = "cww.theme.v1";
const TRASH_KEY = "cww.trash.v1";
const PINNED_DOCS_KEY = "cww.pinnedDocs.v1";
const LAST_DOC_KEY = "cww.lastDoc.v4";
const TRANSLATION_KEY = "cww.translation.v1";
const CUSTOM_TEMPLATES_KEY = "cww.customTemplates.v1";
const FLOW_STEP_KEY = "cww.flowStep.v1";
const RECENT_VERSES_KEY = "cww.recentVerses.v1";
const ANALYTICS_KEY = "cww.analytics.v1";
const SESSIONS_KEY = "cww-sessions-v1";
const ACTIVE_SESSION_KEY = "cww-active-session";
const FLOW_STEPS = ["read", "reflect", "write", "encourage"];
const AUTOSAVE_DELAY_MS = 1800;

const THEME_PRESETS = {
  light: {
    vars: {
      "--bg": "#eef2f3",
      "--card": "#ffffff",
      "--card-2": "#fbfbfb",
      "--line": "#e4e6e7",
      "--line-soft": "#eceff0",
      "--ink": "#2b2b2b",
      "--muted": "#6b6b6b",
      "--olive": "#5e7263",
      "--olive-dark": "#4f6255",
      "--gold": "#a88f63",
      "--warm-brown": "#7a5a46",
      "--sage": "#728a79"
    },
    bodyBg: "#eef2f3",
    sectionLabels: [
      "linear-gradient(to right, #e7ece8 0%, #f2f5f2 100%)",
      "linear-gradient(to right, #e7efe9 0%, #f2f6f3 100%)",
      "linear-gradient(to right, #e4ece6 0%, #f1f5f2 100%)",
      "linear-gradient(to right, #efe8db 0%, #f6f2e9 100%)",
      "linear-gradient(to right, #dde7e1 0%, #edf2ef 100%)",
      "linear-gradient(to right, #e7ece8 0%, #f2f5f2 100%)"
    ]
  },
  dark: {
    vars: {
      "--bg": "#17191d",
      "--card": "#252a30",
      "--card-2": "#f3f4f6",
      "--line": "#3a424d",
      "--line-soft": "#4a5562",
      "--ink": "#101112",
      "--muted": "#4d5763",
      "--olive": "#6f8a7a",
      "--olive-dark": "#5c7567",
      "--gold": "#b9a06b",
      "--warm-brown": "#87644f",
      "--sage": "#6f8776"
    },
    bodyBg: "linear-gradient(180deg, #1c2026 0%, #12161b 100%)",
    sectionLabels: [
      "linear-gradient(to right, #87644f 0%, #ccb7ab 58%, #f2f3f5 100%)",
      "linear-gradient(to right, #6f8776 0%, #c9d5ce 58%, #f2f3f5 100%)",
      "linear-gradient(to right, #6f8a7a 0%, #c8d6ce 58%, #f2f3f5 100%)",
      "linear-gradient(to right, #b9a06b 0%, #e3d8bf 58%, #f2f3f5 100%)",
      "linear-gradient(to right, #5c7567 0%, #c1cfc7 58%, #f2f3f5 100%)",
      "linear-gradient(to right, #87644f 0%, #ccb7ab 58%, #f2f3f5 100%)"
    ]
  },
  sepia: {
    vars: {
      "--bg": "#f6f1e8",
      "--card": "#fffdf8",
      "--card-2": "#fffefb",
      "--line": "#e1d7c7",
      "--line-soft": "#ece3d6",
      "--ink": "#322b24",
      "--muted": "#6f6559",
      "--olive": "#657763",
      "--olive-dark": "#536250",
      "--gold": "#ab9061",
      "--warm-brown": "#7c5f48",
      "--sage": "#7b8d76"
    },
    bodyBg: "#f6f1e8",
    sectionLabels: [
      "linear-gradient(to right, #ede2d3 0%, #f8f2e9 100%)",
      "linear-gradient(to right, #e4ece2 0%, #f0f5ef 100%)",
      "linear-gradient(to right, #e2ebe0 0%, #eff4ee 100%)",
      "linear-gradient(to right, #eee1c8 0%, #f7f0e2 100%)",
      "linear-gradient(to right, #dde6df 0%, #edf2ee 100%)",
      "linear-gradient(to right, #ede2d3 0%, #f8f2e9 100%)"
    ]
  },
  slate: {
    vars: {
      "--bg": "#dfe4ea",
      "--card": "#43515e",
      "--card-2": "#f6f8fa",
      "--line": "#607080",
      "--line-soft": "#788897",
      "--ink": "#14181d",
      "--muted": "#495869",
      "--olive": "#5e7383",
      "--olive-dark": "#4d6271",
      "--gold": "#b39a64",
      "--warm-brown": "#7b5d4e",
      "--sage": "#688177"
    },
    bodyBg: "linear-gradient(180deg, #e4e8ed 0%, #d6dde5 100%)",
    sectionLabels: [
      "linear-gradient(to right, #7b5d4e 0%, #cfbeb4 58%, #f6f8fa 100%)",
      "linear-gradient(to right, #688177 0%, #ccd8d2 58%, #f6f8fa 100%)",
      "linear-gradient(to right, #5e7383 0%, #cad4de 58%, #f6f8fa 100%)",
      "linear-gradient(to right, #b39a64 0%, #e2d6ba 58%, #f6f8fa 100%)",
      "linear-gradient(to right, #4d6271 0%, #c1ced8 58%, #f6f8fa 100%)",
      "linear-gradient(to right, #7b5d4e 0%, #cfbeb4 58%, #f6f8fa 100%)"
    ]
  },
  greenwhite: {
    vars: {
      "--bg": "#edf3ed",
      "--card": "#4d644e",
      "--card-2": "#ffffff",
      "--line": "#6b876c",
      "--line-soft": "#84a086",
      "--ink": "#111611",
      "--muted": "#3f5140",
      "--olive": "#5f7a60",
      "--olive-dark": "#4f6a50",
      "--gold": "#b79d64",
      "--warm-brown": "#7a5f4b",
      "--sage": "#6f8a71"
    },
    bodyBg: "linear-gradient(180deg, #edf3ed 0%, #e4ece4 100%)",
    sectionLabels: [
      "linear-gradient(to right, #7a5f4b 0%, #cfbeb2 58%, #ffffff 100%)",
      "linear-gradient(to right, #6f8a71 0%, #d0ddd1 58%, #ffffff 100%)",
      "linear-gradient(to right, #5f7a60 0%, #c9d8cb 58%, #ffffff 100%)",
      "linear-gradient(to right, #b79d64 0%, #e3d7bc 58%, #ffffff 100%)",
      "linear-gradient(to right, #4f6a50 0%, #c3d2c4 58%, #ffffff 100%)",
      "linear-gradient(to right, #7a5f4b 0%, #cfbeb2 58%, #ffffff 100%)"
    ]
  },
  bluegreen: {
    vars: {
      "--bg": "#e7f0f1",
      "--card": "#3f5f67",
      "--card-2": "#f9fcfc",
      "--line": "#5d8087",
      "--line-soft": "#789aa0",
      "--ink": "#0f1517",
      "--muted": "#3f5960",
      "--olive": "#5f7f76",
      "--olive-dark": "#4f6c64",
      "--gold": "#b59b65",
      "--warm-brown": "#786052",
      "--sage": "#6f8c83"
    },
    bodyBg: "linear-gradient(180deg, #e7f0f1 0%, #dde8ea 100%)",
    sectionLabels: [
      "linear-gradient(to right, #786052 0%, #cabfb8 58%, #f9fcfc 100%)",
      "linear-gradient(to right, #6f8c83 0%, #cedad6 58%, #f9fcfc 100%)",
      "linear-gradient(to right, #5f7f76 0%, #cadad4 58%, #f9fcfc 100%)",
      "linear-gradient(to right, #b59b65 0%, #e2d6bc 58%, #f9fcfc 100%)",
      "linear-gradient(to right, #4f6c64 0%, #c2d2cd 58%, #f9fcfc 100%)",
      "linear-gradient(to right, #786052 0%, #cabfb8 58%, #f9fcfc 100%)"
    ]
  },
  skyblue: {
    vars: {
      "--bg": "#dff1ff",
      "--card": "#4f78a3",
      "--card-2": "#f8fcff",
      "--line": "#79a2c9",
      "--line-soft": "#9cc0de",
      "--ink": "#0f1a24",
      "--muted": "#39546b",
      "--olive": "#6b8fb0",
      "--olive-dark": "#56789a",
      "--gold": "#bca86b",
      "--warm-brown": "#7f6652",
      "--sage": "#7a96aa"
    },
    bodyBg: "#dff1ff",
    sectionLabels: [
      "linear-gradient(to right, #7f6652 0%, #d1c5bc 58%, #f8fcff 100%)",
      "linear-gradient(to right, #7a96aa 0%, #cedbe5 58%, #f8fcff 100%)",
      "linear-gradient(to right, #6b8fb0 0%, #c8d9e8 58%, #f8fcff 100%)",
      "linear-gradient(to right, #bca86b 0%, #e5dcc2 58%, #f8fcff 100%)",
      "linear-gradient(to right, #56789a 0%, #c2d3e3 58%, #f8fcff 100%)",
      "linear-gradient(to right, #7f6652 0%, #d1c5bc 58%, #f8fcff 100%)"
    ]
  }
};

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
  lastSavedAt: "",
  docFilter: "",
  recentVerses: [],
  sessionStartWords: 0
};

let resolveTimer = null;
let verseLookupTimer = null;
let activeLabelColors = THEME_PRESETS.light.sectionLabels.slice();

const $ = (id) => document.getElementById(id);

const els = {
  docTitle: $("doc-title"),
  translationSelect: $("translation-select"),
  templateSelect: $("template-select"),
  docSearch: $("doc-search"),
  applyTemplateBtn: $("apply-template-btn"),
  templateApplySecondary: $("template-apply-secondary"),
  templateStudioModal: $("template-studio-modal"),
  templateModalBackdrop: $("template-modal-backdrop"),
  closeTemplateStudioBtn: $("close-template-studio-btn"),
  verseQuery: $("verse-query"),
  verseResult: $("verse-result"),
  recentVersesList: $("recent-verses-list"),
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
  sessionMeta: $("session-meta"),
  importFileInput: $("import-file-input"),
  shortcutsModal: $("shortcuts-modal"),
  shortcutsBackdrop: $("shortcuts-backdrop"),
  closeShortcutsBtn: $("close-shortcuts-btn"),
  settingsBtn: $("settings-btn"),
  settingsPanel: $("settings-panel"),
  settingsBackdrop: $("settings-backdrop"),
  closeSettingsBtn: $("close-settings-btn"),
  themeOptions: $("theme-options"),
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

/* ============================================================
   DEEP LINK URL PARAMETER HANDLING
   ============================================================ */

function handleDeepLinkOnStartup() {
  try {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");

    // Handle session continuity from cross-app deep links
    const sessionParam = params.get("session");
    if (sessionParam) {
      localStorage.setItem("cww-active-session", sessionParam);
      // Re-render session indicator if available
      if (typeof renderSessionIndicator === "function") renderSessionIndicator();
    }

    if (!ref) {
      // Only session param — clean URL and return
      if (sessionParam) {
        window.history.replaceState({}, document.title, window.location.pathname);
      }
      return;
    }

    // Clear URL params so they don't persist on reload
    window.history.replaceState({}, document.title, window.location.pathname);

    // Pre-populate the verse search input and trigger lookup
    if (els.verseQuery) {
      els.verseQuery.value = ref;
      lookupVerse();
      showToast("Opened verse: " + ref);
    }
  } catch (err) {
    console.error("Deep link handling error:", err);
  }
}

async function init() {
  loadPersistedUiState();
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
    ["renderRightVerseBank", () => renderRightVerseBank()],
    ["renderRecentVerses", () => renderRecentVerses()]
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
  updateSessionMeta();
  renderSessionIndicator();
  handleDeepLinkOnStartup();
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
   TOAST NOTIFICATIONS (Ecosystem-standard)
   ============================================================ */

let _cwwToastContainer = null;

function _ensureCwwToastContainer() {
  if (_cwwToastContainer && document.body.contains(_cwwToastContainer)) return _cwwToastContainer;
  _cwwToastContainer = document.createElement("div");
  _cwwToastContainer.className = "cww-toast-container";
  document.body.appendChild(_cwwToastContainer);
  return _cwwToastContainer;
}

function _dismissCwwToast(toast) {
  if (!toast || toast.classList.contains("cww-toast-exit")) return;
  toast.classList.remove("cww-toast-visible");
  toast.classList.add("cww-toast-exit");
  setTimeout(() => toast.remove(), 300);
}

function showToast(message, type, duration) {
  if (typeof type === "undefined") type = "info";
  if (typeof duration === "undefined") duration = 3000;
  const container = _ensureCwwToastContainer();
  const toast = document.createElement("div");
  toast.className = "cww-toast cww-toast-" + type;
  const icons = { success: "\u2713", info: "\u2139", error: "\u2717" };
  const isError = type === "error";
  let html = '<span class="cww-toast-icon">' + (icons[type] || icons.info) + '</span>';
  html += '<span class="cww-toast-msg">' + message + '</span>';
  if (isError) {
    html += '<button class="cww-toast-dismiss" aria-label="Dismiss">\u2715</button>';
  }
  toast.innerHTML = html;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("cww-toast-visible"));
  if (isError) {
    const dismissBtn = toast.querySelector(".cww-toast-dismiss");
    if (dismissBtn) {
      dismissBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        _dismissCwwToast(toast);
      });
    }
  } else {
    const effectiveDuration = duration;
    setTimeout(() => _dismissCwwToast(toast), effectiveDuration);
    toast.addEventListener("click", function() { _dismissCwwToast(toast); });
  }
}

window.CWWToast = {
  show: function(message, options) {
    const opts = options || {};
    showToast(message, opts.type || "info", opts.duration || 3000);
  }
};

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
  block.setAttribute("draggable", "true");

  const label = document.createElement("div");
  label.className = "block-label";
  label.textContent = sectionName;
  const paletteIndex = (colorIndex || 0) % activeLabelColors.length;
  label.style.background = activeLabelColors[paletteIndex];
  block.dataset.colorIndex = String(paletteIndex);

  const header = document.createElement("div");
  header.className = "block-header";

  const dragHandle = document.createElement("button");
  dragHandle.type = "button";
  dragHandle.className = "block-drag-handle";
  dragHandle.title = "Drag to reorder";
  dragHandle.textContent = "≡";

  const collapseBtn = document.createElement("button");
  collapseBtn.type = "button";
  collapseBtn.className = "block-collapse-btn";
  collapseBtn.title = "Collapse/expand section";
  collapseBtn.textContent = "−";

  const contentEl = document.createElement("div");
  contentEl.className = "block-content";
  contentEl.setAttribute("contenteditable", "true");
  contentEl.setAttribute("data-placeholder", placeholder);
  if (content) contentEl.innerText = content;

  contentEl.addEventListener("input", () => {
    syncBlocksToTextarea();
    markDirty("Unsaved changes");
    debounceAutoResolve();
    debounceInsightsRefresh();
  });

  contentEl.addEventListener("focus", () => {
    state.lastFocusedBlock = contentEl;
  });

  collapseBtn.addEventListener("click", () => {
    const collapsed = block.classList.toggle("collapsed");
    collapseBtn.textContent = collapsed ? "+" : "−";
  });

  block.addEventListener("dragstart", (event) => {
    block.classList.add("dragging");
    event.dataTransfer?.setData("text/plain", sectionName);
  });
  block.addEventListener("dragend", () => {
    block.classList.remove("dragging");
    syncBlocksToTextarea();
    markDirty("Sections reordered");
  });
  block.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
  block.addEventListener("drop", (event) => {
    event.preventDefault();
    const container = $("structured-editor");
    if (!container) return;
    const dragging = container.querySelector(".editor-block.dragging");
    if (!dragging || dragging === block) return;
    const rect = block.getBoundingClientRect();
    const insertAfter = (event.clientY - rect.top) > rect.height / 2;
    if (insertAfter) container.insertBefore(dragging, block.nextSibling);
    else container.insertBefore(dragging, block);
  });

  header.appendChild(dragHandle);
  header.appendChild(label);
  header.appendChild(collapseBtn);
  block.appendChild(header);
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
      case "pin": togglePinCurrentDocument(); break;
      case "copy": copyWritingAndNotes(); break;
      case "import": promptImportTxt(); break;
      case "export": exportTxt(); break;
      case "bulk-export": bulkExportDocuments(); break;
      case "print": printView(); break;
      case "resolve": resolveReferencesInEditor(); break;
      case "restore-trash": restoreFromTrash(); break;
      case "clear-trash": clearTrash(); break;
      case "shortcuts": openShortcutsModal(); break;
    }
  });
}

/* ============================================================
   FEATURE 3: DOCUMENT SELECTOR DROPDOWN
   ============================================================ */

function renderDocSelector() {
  const select = $("doc-title-select");
  if (!select) return;
  const docs = getSortedDocs();
  const filter = state.docFilter.trim().toLowerCase();

  select.innerHTML = "";

  // If current doc is unsaved, show placeholder
  if (!state.currentId || !docs.find((d) => d.id === state.currentId)) {
    const opt = document.createElement("option");
    opt.value = "__current__";
    opt.textContent = (els.docTitle.value.trim() || "Untitled Devotional") + (state.isDirty ? " *" : "");
    opt.selected = true;
    select.appendChild(opt);
  }

  docs.filter((doc) => {
    if (!filter) return true;
    const text = [doc.title || "", doc.template || "", doc.editor || "", doc.notes || ""].join(" ").toLowerCase();
    return text.includes(filter);
  }).forEach((doc) => {
    const opt = document.createElement("option");
    opt.value = doc.id;
    const dirtyMarker = doc.id === state.currentId && state.isDirty ? " *" : "";
    const pinMarker = isPinnedDoc(doc.id) ? "★ " : "";
    opt.textContent = pinMarker + (doc.title || "Untitled") + dirtyMarker;
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
  const insightsPanel = $("insights-panel");
  if (!tabs.length || !notesPanel || !versebankPanel) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const target = tab.dataset.tab;
      notesPanel.classList.add("hidden");
      versebankPanel.classList.add("hidden");
      if (insightsPanel) insightsPanel.classList.add("hidden");

      if (target === "notes") {
        notesPanel.classList.remove("hidden");
      } else if (target === "versebank") {
        versebankPanel.classList.remove("hidden");
      } else if (target === "insights" && insightsPanel) {
        insightsPanel.classList.remove("hidden");
        renderInsightsPanel();
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
    els.notes.addEventListener("input", () => { markDirty("Unsaved notes"); debounceInsightsRefresh(); });
  }
  if (els.docTitle) {
    els.docTitle.addEventListener("input", () => markDirty("Unsaved title"));
  }
  if (els.docSearch) {
    els.docSearch.addEventListener("input", () => {
      state.docFilter = els.docSearch.value;
      renderDocSelector();
    });
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
  if (els.closeShortcutsBtn) {
    els.closeShortcutsBtn.addEventListener("click", closeShortcutsModal);
  }
  if (els.shortcutsBackdrop) {
    els.shortcutsBackdrop.addEventListener("click", closeShortcutsModal);
  }
  if (els.settingsBtn) {
    els.settingsBtn.addEventListener("click", openSettingsPanel);
  }
  if (els.closeSettingsBtn) {
    els.closeSettingsBtn.addEventListener("click", closeSettingsPanel);
  }
  if (els.settingsBackdrop) {
    els.settingsBackdrop.addEventListener("click", closeSettingsPanel);
  }
  if (els.themeOptions) {
    els.themeOptions.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-theme]");
      if (!button) return;
      applyThemePreset(button.dataset.theme);
    });
  }
  window.addEventListener("beforeunload", (event) => {
    if (!state.isDirty) return;
    event.preventDefault();
    event.returnValue = "";
  });
  document.addEventListener("keydown", (event) => {
    const ctrl = event.ctrlKey || event.metaKey;
    const shift = event.shiftKey;
    const alt = event.altKey;
    const key = event.key;

    if (key === "Escape") closeTemplateStudio();
    if (key === "Escape") closeShortcutsModal();
    if (key === "Escape") closeSettingsPanel();

    // --- Ecosystem shortcuts ---

    // Ctrl+Shift+S — Ecosystem Sync
    if (ctrl && shift && key.toLowerCase() === "s") {
      event.preventDefault();
      if (window.BibleEcosystem && typeof window.BibleEcosystem.sync === "function") {
        showToast("Syncing ecosystem...");
        window.BibleEcosystem.sync().then(function (result) {
          if (result && result.synced) {
            showToast("Ecosystem synced successfully.");
          } else {
            showToast("Sync unavailable.");
          }
        }).catch(function () {
          showToast("Ecosystem sync failed.");
        });
      } else {
        showToast("Ecosystem sync not available.");
      }
      return;
    }

    // Ctrl+/ — Show keyboard shortcuts help
    if (ctrl && !shift && !alt && key === "/") {
      event.preventDefault();
      toggleShortcutsModal();
      return;
    }

    // Alt+S — Toggle study session
    if (alt && !ctrl && !shift && (key === "s" || key === "S")) {
      event.preventDefault();
      const activeSession = getActiveSession();
      if (activeSession) {
        endStudySession();
      } else {
        startStudySession();
      }
      return;
    }

    // --- Existing app shortcuts ---
    if (ctrl && !shift && key === "s") {
      event.preventDefault();
      saveCurrent();
    }
    if (ctrl && !shift && key.toLowerCase() === "n") {
      event.preventDefault();
      newDocument();
    }
    if (ctrl && !shift && key.toLowerCase() === "e") {
      event.preventDefault();
      exportTxt();
    }
    if (ctrl && shift && key.toLowerCase() === "d") {
      event.preventDefault();
      duplicateCurrentDocument();
    }
    if (ctrl && shift && key.toLowerCase() === "r") {
      event.preventDefault();
      resolveReferencesInEditor();
    }
    if (!ctrl && !alt && key === "/") {
      const targetTag = event.target?.tagName?.toLowerCase();
      const isTypingTarget = targetTag === "input" || targetTag === "textarea" || event.target?.isContentEditable;
      if (isTypingTarget) return;
      event.preventDefault();
      els.verseQuery?.focus();
      els.verseQuery?.select();
    }
    if (!ctrl && !alt && key === "?") {
      const targetTag = event.target?.tagName?.toLowerCase();
      const isTypingTarget = targetTag === "input" || targetTag === "textarea" || event.target?.isContentEditable;
      if (isTypingTarget) return;
      event.preventDefault();
      toggleShortcutsModal();
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
  pushRecentVerse(passage.anchorRef);
  addTrailEntry(passage.anchorRef);
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
  applyAutoTitleSuggestion();
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
  recordAnalytics(doc);
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
  const docs = getSortedDocs();
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
  getSortedDocs().slice(0, 8).forEach((doc) => {
    const node = els.savedItemTemplate.content.firstElementChild.cloneNode(true);
    const openButton = node.querySelector(".open-doc-btn");
    const savedMeta = node.querySelector(".saved-meta");
    openButton.textContent = (isPinnedDoc(doc.id) ? "★ " : "") + doc.title;
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
  const proceed = window.confirm('Move "' + (target.title || "Untitled") + '" to trash?');
  if (!proceed) return;

  const trash = getTrashDocs();
  trash.unshift({ ...target, trashedAt: new Date().toISOString() });
  localStorage.setItem(TRASH_KEY, JSON.stringify(trash.slice(0, 100)));

  const remaining = docs.filter((d) => d.id !== state.currentId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(remaining));
  if (remaining.length) {
    loadDocument(remaining[0].id);
  } else {
    newDocument();
  }
  removePinnedDoc(target.id);
  setStatus("Moved to trash");
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

function togglePinCurrentDocument() {
  if (!state.currentId) {
    setStatus("Save document before pinning");
    return;
  }
  const pinned = getPinnedDocIds();
  if (pinned.includes(state.currentId)) {
    removePinnedDoc(state.currentId);
    setStatus("Document unpinned");
  } else {
    pinned.unshift(state.currentId);
    localStorage.setItem(PINNED_DOCS_KEY, JSON.stringify([...new Set(pinned)]));
    setStatus("Document pinned");
  }
  renderDocSelector();
  renderSavedList();
}

function bulkExportDocuments() {
  const docs = getSortedDocs();
  if (!docs.length) {
    setStatus("No documents to export");
    return;
  }
  const selection = window.prompt("Bulk export: enter document numbers (e.g. 1,2,4) or ALL\n" +
    docs.map((doc, idx) => (idx + 1) + ". " + (doc.title || "Untitled")).join("\n"), "ALL");
  if (!selection) return;

  const selectedDocs = selection.trim().toUpperCase() === "ALL"
    ? docs
    : selection.split(",").map((v) => Number(v.trim()) - 1).filter((idx) => idx >= 0 && idx < docs.length).map((idx) => docs[idx]);

  if (!selectedDocs.length) {
    setStatus("No valid documents selected");
    return;
  }

  const payload = selectedDocs.map((doc) => {
    return [
      "# " + (doc.title || "Untitled Reflection"),
      "Updated: " + formatDate(new Date(doc.updatedAt || Date.now())),
      "",
      doc.editor || "",
      "",
      "--- Notes ---",
      doc.notes || "",
      "",
      "==================================================",
      ""
    ].join("\n");
  }).join("\n");

  const blob = new Blob([payload], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "cww-bulk-export-" + new Date().toISOString().slice(0, 10) + ".txt";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  setStatus("Bulk export complete (" + selectedDocs.length + ")");
}

function restoreFromTrash() {
  const trash = getTrashDocs();
  if (!trash.length) {
    setStatus("Trash is empty");
    return;
  }
  const selection = window.prompt("Restore from trash: enter item number\n" +
    trash.slice(0, 15).map((doc, idx) => (idx + 1) + ". " + (doc.title || "Untitled")).join("\n"), "1");
  if (!selection) return;
  const idx = Number(selection) - 1;
  if (Number.isNaN(idx) || idx < 0 || idx >= trash.length) {
    setStatus("Invalid trash selection");
    return;
  }
  const selected = trash[idx];
  const docs = getDocs();
  const restoredId = docs.some((d) => d.id === selected.id) ? crypto.randomUUID() : selected.id;
  docs.unshift({
    id: restoredId || crypto.randomUUID(),
    title: selected.title || "Untitled Reflection",
    template: selected.template || "",
    step: selected.step || "write",
    editor: selected.editor || "",
    notes: selected.notes || "",
    updatedAt: new Date().toISOString()
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(docs.slice(0, 30)));
  trash.splice(idx, 1);
  localStorage.setItem(TRASH_KEY, JSON.stringify(trash));
  renderDocSelector();
  renderSavedList();
  setStatus("Restored from trash");
}

function clearTrash() {
  const trash = getTrashDocs();
  if (!trash.length) {
    setStatus("Trash is already empty");
    return;
  }
  const proceed = window.confirm("Empty trash (" + trash.length + " item(s))?");
  if (!proceed) return;
  localStorage.setItem(TRASH_KEY, "[]");
  setStatus("Trash emptied");
}

function pushRecentVerse(ref) {
  if (!ref) return;
  const normalized = normalizeReference(ref);
  state.recentVerses = [normalized, ...state.recentVerses.filter((r) => r !== normalized)].slice(0, 12);
  localStorage.setItem(RECENT_VERSES_KEY, JSON.stringify(state.recentVerses));
  renderRecentVerses();
}

function renderRecentVerses() {
  if (!els.recentVersesList) return;
  els.recentVersesList.innerHTML = "";
  if (!state.recentVerses.length) {
    const li = document.createElement("li");
    li.innerHTML = '<span class="muted">No recent lookups yet.</span>';
    els.recentVersesList.appendChild(li);
    return;
  }
  state.recentVerses.forEach((ref) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = ref;
    btn.addEventListener("click", () => {
      els.verseQuery.value = ref;
      lookupVerse();
      const token = "[[" + ref + "]]";
      const target = state.lastFocusedBlock || document.querySelector("#structured-editor .block-content");
      if (target) {
        target.innerText = target.innerText ? target.innerText + " " + token : token;
        syncBlocksToTextarea();
      } else {
        insertTextIntoEditor(token);
      }
      markDirty("Inserted [[" + ref + "]] token");
    });
    li.appendChild(btn);
    els.recentVersesList.appendChild(li);
  });
}

function openShortcutsModal() {
  if (!els.shortcutsModal || !els.shortcutsBackdrop) return;
  els.shortcutsModal.classList.remove("hidden");
  els.shortcutsBackdrop.classList.remove("hidden");
  els.shortcutsModal.setAttribute("aria-hidden", "false");
}

function closeShortcutsModal() {
  if (!els.shortcutsModal || !els.shortcutsBackdrop) return;
  els.shortcutsModal.classList.add("hidden");
  els.shortcutsBackdrop.classList.add("hidden");
  els.shortcutsModal.setAttribute("aria-hidden", "true");
}

function toggleShortcutsModal() {
  if (els.shortcutsModal?.classList.contains("hidden")) openShortcutsModal();
  else closeShortcutsModal();
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
  applyAutoTitleSuggestion();
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

function applyThemePreset(themeId, options = {}) {
  const { silent = false } = options;
  const id = THEME_PRESETS[themeId] ? themeId : "light";
  const preset = THEME_PRESETS[id];
  Object.entries(preset.vars).forEach(([name, value]) => {
    document.documentElement.style.setProperty(name, value);
  });
  document.body.style.background = preset.vars["--bg"] || preset.bodyBg || "#f7f7f5";
  activeLabelColors = preset.sectionLabels.slice();
  localStorage.setItem(THEME_KEY, id);
  refreshThemeOptionButtons(id);
  refreshBlockLabelGradients();
  if (!silent) setStatus("Theme applied: " + id);
}

function refreshBlockLabelGradients() {
  document.querySelectorAll("#structured-editor .editor-block").forEach((block, idx) => {
    const label = block.querySelector(".block-label");
    if (!label) return;
    const paletteIndex = Number(block.dataset.colorIndex || idx) % activeLabelColors.length;
    label.style.background = activeLabelColors[paletteIndex];
  });
}

function refreshThemeOptionButtons(activeThemeId) {
  if (!els.themeOptions) return;
  els.themeOptions.querySelectorAll("button[data-theme]").forEach((btn) => {
    btn.classList.toggle("active-theme", btn.dataset.theme === activeThemeId);
  });
}

function openSettingsPanel() {
  if (!els.settingsPanel || !els.settingsBackdrop) return;
  els.settingsPanel.classList.remove("hidden");
  els.settingsBackdrop.classList.remove("hidden");
  els.settingsPanel.setAttribute("aria-hidden", "false");
}

function closeSettingsPanel() {
  if (!els.settingsPanel || !els.settingsBackdrop) return;
  els.settingsPanel.classList.add("hidden");
  els.settingsBackdrop.classList.add("hidden");
  els.settingsPanel.setAttribute("aria-hidden", "true");
}

function loadPersistedUiState() {
  const savedTheme = localStorage.getItem(THEME_KEY) || "light";
  applyThemePreset(savedTheme, { silent: true });
  state.recentVerses = getRecentVerses();
  state.sessionStartWords = getDocs().reduce((sum, doc) => sum + countWords((doc.editor || "") + " " + (doc.notes || "")), 0);
}

function getDocs() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function getTrashDocs() {
  try {
    return JSON.parse(localStorage.getItem(TRASH_KEY) || "[]");
  } catch {
    return [];
  }
}

function getPinnedDocIds() {
  try {
    return JSON.parse(localStorage.getItem(PINNED_DOCS_KEY) || "[]");
  } catch {
    return [];
  }
}

function isPinnedDoc(docId) {
  return getPinnedDocIds().includes(docId);
}

function removePinnedDoc(docId) {
  const pinned = getPinnedDocIds().filter((id) => id !== docId);
  localStorage.setItem(PINNED_DOCS_KEY, JSON.stringify(pinned));
}

function getSortedDocs() {
  const pinned = getPinnedDocIds();
  const docs = getDocs().slice();
  docs.sort((a, b) => {
    const aPinned = pinned.includes(a.id) ? 1 : 0;
    const bPinned = pinned.includes(b.id) ? 1 : 0;
    if (aPinned !== bPinned) return bPinned - aPinned;
    return new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime();
  });
  return docs;
}

function getRecentVerses() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_VERSES_KEY) || "[]");
  } catch {
    return [];
  }
}

function applyAutoTitleSuggestion() {
  const currentTitle = els.docTitle.value.trim();
  if (currentTitle && currentTitle.toLowerCase() !== "untitled reflection") return;
  const blocks = document.querySelectorAll("#structured-editor .block-content");
  for (const block of blocks) {
    const text = (block.innerText || "").trim();
    if (!text) continue;
    const suggestion = text.split(/\r?\n/)[0].replace(/[^\w\s:'"-]/g, "").trim();
    if (suggestion.length >= 6) {
      els.docTitle.value = suggestion.slice(0, 70);
      break;
    }
  }
}

function getAnalytics() {
  try {
    return JSON.parse(localStorage.getItem(ANALYTICS_KEY) || "{}");
  } catch {
    return {};
  }
}

function recordAnalytics(doc) {
  const analytics = getAnalytics();
  const today = new Date().toISOString().slice(0, 10);
  const writtenWords = countWords((doc.editor || "") + " " + (doc.notes || ""));
  analytics.docWords = analytics.docWords || {};
  const previousWords = Number(analytics.docWords[doc.id] || 0);
  const delta = Math.max(0, writtenWords - previousWords);
  analytics.days = analytics.days || {};
  analytics.days[today] = (analytics.days[today] || 0) + delta;
  analytics.docWords[doc.id] = writtenWords;
  localStorage.setItem(ANALYTICS_KEY, JSON.stringify(analytics));
  updateSessionMeta();
}

function countWords(text) {
  return String(text || "").trim().split(/\s+/).filter(Boolean).length;
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
  const words = countWords(text);
  const chars = text.length;
  if (!text) {
    els.writingStats.textContent = "0 words - 0 chars";
    updateSessionMeta(0);
    return;
  }
  els.writingStats.textContent = words + " words - " + chars + " chars";
  updateSessionMeta(words);
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

function updateSessionMeta(currentDocWords = null) {
  if (!els.sessionMeta) return;
  const docsWords = getDocs().reduce((sum, doc) => sum + countWords((doc.editor || "") + " " + (doc.notes || "")), 0);
  const sessionDelta = Math.max(0, docsWords - state.sessionStartWords);
  const analytics = getAnalytics();
  const days = Object.keys(analytics.days || {}).sort();
  let streak = 0;
  for (let i = days.length - 1; i >= 0; i -= 1) {
    const day = days[i];
    const expected = new Date();
    expected.setDate(expected.getDate() - streak);
    const expectedStr = expected.toISOString().slice(0, 10);
    if (day === expectedStr) streak += 1;
    else break;
  }
  const liveWords = typeof currentDocWords === "number" ? currentDocWords : countWords((els.editor?.value || "") + " " + (els.notes?.value || ""));
  els.sessionMeta.textContent = "Session: +" + sessionDelta + " words | Live: " + liveWords + " | Streak: " + streak + "d";
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

/* ============================================================
   STUDY SESSIONS - Lightweight session tracking
   ============================================================ */

function getStudySessions() {
  try {
    return JSON.parse(localStorage.getItem(SESSIONS_KEY) || "[]");
  } catch (e) {
    return [];
  }
}

function saveStudySessions(sessions) {
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}

function getActiveSessionId() {
  return localStorage.getItem(ACTIVE_SESSION_KEY) || null;
}

function getActiveSession() {
  const id = getActiveSessionId();
  if (!id) return null;
  return getStudySessions().find(function (s) { return s.id === id; }) || null;
}

function startStudySession() {
  const docTitle = (els.docTitle.value.trim() || "Untitled").slice(0, 60);
  const dateStr = new Date().toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
  const sessionTitle = "Writing: " + docTitle + " \u2014 " + dateStr;
  const id = "cww-sess-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
  const now = new Date().toISOString();

  // Extract verse refs from the current document
  const docRefs = getDocumentVerseRefs();
  const verses = docRefs.map(function (refStr) {
    const m = refStr.match(/^(.+?)\s+(\d+):(\d+)/);
    if (!m) return null;
    return { bookName: m[1].trim(), chapter: parseInt(m[2], 10), verse: parseInt(m[3], 10) };
  }).filter(function (v) { return v !== null; });

  const session = {
    id: id,
    title: sessionTitle,
    description: "",
    verses: verses,
    insightIds: [],
    noteIds: [],
    trail: [],
    createdAt: now,
    updatedAt: now
  };

  var sessions = getStudySessions();
  sessions.unshift(session);
  saveStudySessions(sessions.slice(0, 50));
  localStorage.setItem(ACTIVE_SESSION_KEY, id);
  renderSessionIndicator();
  showToast("Session started");
}

function endStudySession() {
  var session = getActiveSession();
  if (session) {
    session.updatedAt = new Date().toISOString();
    var sessions = getStudySessions();
    var idx = sessions.findIndex(function (s) { return s.id === session.id; });
    if (idx >= 0) sessions[idx] = session;
    saveStudySessions(sessions);
  }
  localStorage.removeItem(ACTIVE_SESSION_KEY);
  renderSessionIndicator();
  showToast("Session ended");
}

function addTrailEntry(verseRef) {
  var session = getActiveSession();
  if (!session) return;
  var m = verseRef.match(/^(.+?)\s+(\d+):(\d+)/);
  if (!m) return;
  var entry = {
    ref: { bookName: m[1].trim(), chapter: parseInt(m[2], 10), verse: parseInt(m[3], 10) },
    timestamp: new Date().toISOString(),
    source: "cww",
    action: "lookup"
  };
  session.trail.push(entry);
  session.updatedAt = new Date().toISOString();
  var sessions = getStudySessions();
  var idx = sessions.findIndex(function (s) { return s.id === session.id; });
  if (idx >= 0) sessions[idx] = session;
  saveStudySessions(sessions);
}

function renderSessionIndicator() {
  var bar = document.getElementById("session-indicator");
  if (!bar) return;
  var session = getActiveSession();
  if (session) {
    bar.innerHTML =
      '<span class="session-indicator-dot"></span>' +
      '<span class="session-indicator-title">' + escapeHtml(session.title) + '</span>' +
      '<button class="session-end-btn" id="session-end-btn" type="button">End</button>';
    bar.classList.add("active");
    bar.classList.remove("inactive");
    document.getElementById("session-end-btn").addEventListener("click", endStudySession);
  } else {
    bar.innerHTML = '<a class="session-start-link" id="session-start-link" href="#">Start Writing Session</a>';
    bar.classList.remove("active");
    bar.classList.add("inactive");
    document.getElementById("session-start-link").addEventListener("click", function (e) {
      e.preventDefault();
      startStudySession();
    });
  }
}

/* ============================================================
   INSIGHTS PANEL - Ecosystem insights matching
   ============================================================ */

let insightsRefreshTimer = null;

function getDocumentVerseRefs() {
  const refs = [];
  const blocks = document.querySelectorAll("#structured-editor .block-content");
  const notesText = els.notes ? els.notes.value : "";
  let allText = notesText;

  blocks.forEach((block) => {
    allText += " " + (block.innerText || "");
  });

  // Extract [[Book Ch:V]] tokens
  const tokenRe = /\[\[(.+?)\]\]/g;
  let match;
  while ((match = tokenRe.exec(allText)) !== null) {
    const ref = match[1].trim();
    if (/^([1-3]\s*)?[a-zA-Z. ]+\s+\d+:\d+/.test(ref)) {
      refs.push(ref);
    }
  }

  // Extract bare "Book Ch:V" patterns
  const inlineRe = /\b([1-3]?\s?[A-Z][a-z]+(?:\s+of\s+[A-Z][a-z]+)?)\s+(\d+):(\d+)\b/g;
  while ((match = inlineRe.exec(allText)) !== null) {
    const ref = match[0].trim();
    if (refs.indexOf(ref) === -1) refs.push(ref);
  }

  return refs;
}

function getDocumentThemeWords() {
  const blocks = document.querySelectorAll("#structured-editor .block-content");
  const notesText = els.notes ? els.notes.value : "";
  let allText = notesText;

  blocks.forEach((block) => {
    allText += " " + (block.innerText || "");
  });

  // Extract meaningful words (4+ chars, lowercase)
  const words = allText
    .toLowerCase()
    .replace(/[^a-z\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length >= 4);

  return [...new Set(words)];
}

function normalizeVerseForMatch(ref) {
  return String(ref || "").toLowerCase().replace(/\s+/g, " ").trim();
}

function scoreInsight(insight, docVerseRefs, docWords) {
  let score = 0;

  // Normalize document verse refs for comparison
  const normalizedDocRefs = docVerseRefs.map(normalizeVerseForMatch);

  // Check verse overlap
  if (Array.isArray(insight.verses)) {
    insight.verses.forEach((v) => {
      const insightRef = normalizeVerseForMatch(
        (v.bookName || "") + " " + v.chapter + ":" + v.verse
      );
      if (normalizedDocRefs.some((dr) => dr === insightRef)) {
        score += 10;
      }
    });
  }

  // Check theme overlap
  if (Array.isArray(insight.themes)) {
    insight.themes.forEach((theme) => {
      const themeLower = theme.toLowerCase();
      if (docWords.some((w) => themeLower.includes(w) || w.includes(themeLower))) {
        score += 3;
      }
    });
  }

  // Check title/description word overlap
  const titleWords = (insight.title || "").toLowerCase().split(/\s+/).filter((w) => w.length >= 4);
  titleWords.forEach((tw) => {
    if (docWords.includes(tw)) score += 1;
  });

  return score;
}

function renderInsightsPanel() {
  const listEl = $("insights-list");
  const emptyEl = $("insights-empty");
  if (!listEl) return;

  const allInsights = window.BibleEcosystem ? window.BibleEcosystem.readEcoInsights() : [];

  if (allInsights.length === 0) {
    listEl.innerHTML = "";
    if (emptyEl) emptyEl.classList.remove("hidden");
    return;
  }

  const docVerseRefs = getDocumentVerseRefs();
  const docWords = getDocumentThemeWords();

  // Score and sort insights by relevance
  const scored = allInsights.map((ins) => ({
    insight: ins,
    score: scoreInsight(ins, docVerseRefs, docWords)
  }));

  // Show all with score > 0 first, then up to 5 others
  scored.sort((a, b) => b.score - a.score);

  const relevant = scored.filter((s) => s.score > 0);
  const others = scored.filter((s) => s.score === 0).slice(0, 5);
  const toShow = relevant.concat(others).slice(0, 15);

  if (toShow.length === 0) {
    listEl.innerHTML = "";
    if (emptyEl) emptyEl.classList.remove("hidden");
    return;
  }

  if (emptyEl) emptyEl.classList.add("hidden");
  listEl.innerHTML = "";

  toShow.forEach(({ insight, score }) => {
    const card = document.createElement("div");
    card.className = "insight-card" + (score > 0 ? " insight-relevant" : "");

    const confidenceLabel = {
      personal: "Personal",
      supported: "Supported",
      established: "Established"
    }[insight.confidence] || "Personal";

    const sourceLabel = {
      bte: "Thought Engine",
      bd: "Bible Desk",
      sd: "Study Desk",
      cww: "CWW"
    }[insight.source] || insight.source || "";

    const verseCount = Array.isArray(insight.verses) ? insight.verses.length : 0;
    const themeList = Array.isArray(insight.themes) ? insight.themes.slice(0, 3).join(", ") : "";
    const descSnippet = (insight.description || "").length > 100
      ? insight.description.slice(0, 100) + "..."
      : (insight.description || "");

    card.innerHTML =
      '<div class="insight-card-header">' +
        '<span class="insight-title">' + escapeHtml(insight.title || "Untitled") + '</span>' +
        '<span class="insight-confidence insight-conf-' + (insight.confidence || "personal") + '">' + confidenceLabel + '</span>' +
      '</div>' +
      '<p class="insight-desc">' + escapeHtml(descSnippet) + '</p>' +
      '<div class="insight-meta">' +
        (verseCount > 0 ? '<span class="insight-verses-count">' + verseCount + ' verse' + (verseCount !== 1 ? 's' : '') + '</span>' : '') +
        (themeList ? '<span class="insight-themes">' + escapeHtml(themeList) + '</span>' : '') +
        (sourceLabel ? '<span class="insight-source">' + escapeHtml(sourceLabel) + '</span>' : '') +
      '</div>' +
      (verseCount > 0 ? '<button class="insight-insert-btn" title="Insert verse references as [[tokens]]">Insert Verses</button>' : '');

    // Bind insert button
    const insertBtn = card.querySelector(".insight-insert-btn");
    if (insertBtn && Array.isArray(insight.verses)) {
      insertBtn.addEventListener("click", () => {
        const tokens = insight.verses.map((v) => {
          const bookName = v.bookName || "";
          return "[[" + bookName + " " + v.chapter + ":" + v.verse + "]]";
        });
        const tokenStr = tokens.join(" ");
        const target = state.lastFocusedBlock || document.querySelector("#structured-editor .block-content");
        if (target) {
          const text = target.innerText;
          target.innerText = text ? text + " " + tokenStr : tokenStr;
          syncBlocksToTextarea();
          debounceAutoResolve();
        } else {
          insertTextIntoEditor(tokenStr);
        }
        markDirty("Inserted verses from insight: " + (insight.title || ""));
      });
    }

    listEl.appendChild(card);
  });
}

function debounceInsightsRefresh() {
  clearTimeout(insightsRefreshTimer);
  insightsRefreshTimer = setTimeout(() => {
    const insightsPanel = $("insights-panel");
    if (insightsPanel && !insightsPanel.classList.contains("hidden")) {
      renderInsightsPanel();
    }
  }, 1200);
}

/* ============================================================
   COMMAND PALETTE (Ctrl+K)
   ============================================================ */

(function initCommandPalette() {
  let cmdActiveIndex = 0;
  let cmdFiltered = [];

  function getCommandList() {
    return [
      // --- App commands ---
      { label: "New Document", desc: "Create a new document", group: "Document", run: newDocument },
      { label: "Save Document", desc: "Save current document", group: "Document", run: () => saveCurrent() },
      { label: "Duplicate Document", desc: "Clone current document", group: "Document", run: duplicateCurrentDocument },
      { label: "Export .txt", desc: "Export document as text file", group: "Document", run: exportTxt },
      { label: "Print", desc: "Print current document", group: "Document", run: () => window.print() },
      { label: "Insert Verse", desc: "Focus verse search to insert a verse", group: "Writing", run: () => {
        const q = document.getElementById("verse-query");
        if (q) { q.focus(); q.select(); }
      }},
      { label: "Resolve [[Verses]]", desc: "Resolve verse references in editor", group: "Writing", run: resolveReferencesInEditor },
      // --- Ecosystem commands ---
      { label: "Sync Ecosystem", desc: "Sync data across Bible Ecosystem apps", group: "Ecosystem", run: () => {
        if (window.BibleEcosystem && typeof window.BibleEcosystem.sync === "function") {
          showToast("Syncing ecosystem...");
          window.BibleEcosystem.sync().then(function (r) {
            if (r && r.synced) showToast("Ecosystem synced.");
            else showToast("Sync unavailable.");
          }).catch(function () { showToast("Ecosystem sync failed."); });
        } else { showToast("Ecosystem sync not available."); }
      }},
      { label: "Open in Bible Desk", desc: "Open verse in Bible Desk", group: "Ecosystem", run: () => {
        if (window.BibleEcosystem && window.BibleEcosystem.openInBibleDesk) {
          window.BibleEcosystem.openInBibleDesk("");
        } else { showToast("Ecosystem not available."); }
      }},
      { label: "Open in Study Desk", desc: "Open verse in Study Desk", group: "Ecosystem", run: () => {
        if (window.BibleEcosystem && window.BibleEcosystem.openInStudyDesk) {
          window.BibleEcosystem.openInStudyDesk("");
        } else { showToast("Ecosystem not available."); }
      }},
      { label: "Open in Bible Engine", desc: "Open verse in Bible Thought Engine", group: "Ecosystem", run: () => {
        try {
          const url = "bible-study-engine://open";
          window.open(url, "_blank");
        } catch { showToast("Could not open Bible Engine."); }
      }},
      { label: "Open in Writing Workspace", desc: "You are already here", group: "Ecosystem", run: () => { showToast("You are already in the Writing Workspace."); }},
      // --- Session ---
      { label: "Start Session", desc: "Start a new study session", group: "Session", run: () => {
        const active = getActiveSession();
        if (active) { showToast("A session is already active."); }
        else { startStudySession(); }
      }},
      { label: "End Session", desc: "End the current study session", group: "Session", run: () => {
        const active = getActiveSession();
        if (active) { endStudySession(); }
        else { showToast("No active session."); }
      }},
      // --- App settings ---
      { label: "Show Keyboard Shortcuts", desc: "View all keyboard shortcuts", group: "App", run: toggleShortcutsModal },
      { label: "Open Settings", desc: "Open theme and settings panel", group: "App", run: () => {
        const panel = document.getElementById("settings-panel");
        const backdrop = document.getElementById("settings-backdrop");
        if (panel) panel.classList.remove("hidden");
        if (backdrop) backdrop.classList.remove("hidden");
      }},
    ];
  }

  function fuzzyMatch(query, text) {
    if (!query) return true;
    return text.toLowerCase().includes(query.toLowerCase());
  }

  function renderCmdList() {
    const paletteList = document.getElementById("cmd-palette-list");
    const input = document.getElementById("cmd-palette-input");
    if (!paletteList || !input) return;
    const q = input.value.trim();
    const all = getCommandList();
    cmdFiltered = all.filter(function (c) {
      return fuzzyMatch(q, c.label) || fuzzyMatch(q, c.desc || "") || fuzzyMatch(q, c.group || "");
    });
    // Add verse-like results
    if (q.length >= 2) {
      const refMatch = q.match(/^(\d?\s*[a-zA-Z]+(?:\s+[a-zA-Z]+)*)\s*(\d+)?(?::(\d+))?$/);
      if (refMatch) {
        cmdFiltered.push({
          label: "Search Bible: " + q,
          desc: "Look up " + q + " in verse search",
          group: "Verse",
          run: function () {
            const vq = document.getElementById("verse-query");
            if (vq) { vq.value = q; vq.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true })); }
          }
        });
      }
    }
    cmdFiltered = cmdFiltered.slice(0, 12);
    cmdActiveIndex = 0;
    paletteList.innerHTML = "";
    if (!cmdFiltered.length) {
      paletteList.innerHTML = '<div class="cmd-palette-empty">No matching commands</div>';
      return;
    }
    let lastGroup = "";
    cmdFiltered.forEach(function (entry, idx) {
      if (entry.group !== lastGroup) {
        lastGroup = entry.group;
        const header = document.createElement("div");
        header.className = "cmd-palette-group";
        header.textContent = entry.group;
        paletteList.appendChild(header);
      }
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "cmd-palette-item" + (idx === 0 ? " active" : "");
      btn.dataset.idx = String(idx);
      btn.innerHTML = '<span class="cmd-palette-item-label">' + escapeHtml(entry.label) + '</span>' +
        (entry.desc ? '<span class="cmd-palette-item-desc">' + escapeHtml(entry.desc) + '</span>' : '');
      btn.addEventListener("click", function () {
        closeCmdPalette();
        entry.run();
      });
      btn.addEventListener("mouseenter", function () {
        cmdActiveIndex = idx;
        updateCmdActive();
      });
      paletteList.appendChild(btn);
    });
    // Footer
    const footer = document.createElement("div");
    footer.className = "cmd-palette-footer";
    footer.innerHTML = '<span><kbd>&uarr;&darr;</kbd> navigate</span><span><kbd>&crarr;</kbd> select</span><span><kbd>esc</kbd> close</span>';
    paletteList.appendChild(footer);
  }

  function escapeHtml(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function updateCmdActive() {
    const paletteList = document.getElementById("cmd-palette-list");
    if (!paletteList) return;
    const items = paletteList.querySelectorAll(".cmd-palette-item");
    items.forEach(function (item, i) {
      item.classList.toggle("active", i === cmdActiveIndex);
    });
    const active = items[cmdActiveIndex];
    if (active) active.scrollIntoView({ block: "nearest" });
  }

  function openCmdPalette() {
    const palette = document.getElementById("command-palette");
    const backdrop = document.getElementById("command-palette-backdrop");
    const input = document.getElementById("cmd-palette-input");
    if (!palette) return;
    palette.classList.remove("hidden");
    if (backdrop) backdrop.classList.remove("hidden");
    if (input) { input.value = ""; input.focus(); }
    renderCmdList();
  }

  function closeCmdPalette() {
    const palette = document.getElementById("command-palette");
    const backdrop = document.getElementById("command-palette-backdrop");
    if (palette) palette.classList.add("hidden");
    if (backdrop) backdrop.classList.add("hidden");
  }

  function isCmdPaletteOpen() {
    const palette = document.getElementById("command-palette");
    return palette && !palette.classList.contains("hidden");
  }

  // Wire up events
  document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("cmd-palette-input");
    const backdrop = document.getElementById("command-palette-backdrop");
    if (input) {
      input.addEventListener("input", renderCmdList);
      input.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          event.preventDefault();
          closeCmdPalette();
          return;
        }
        if (event.key === "ArrowDown") {
          event.preventDefault();
          cmdActiveIndex = Math.min(cmdActiveIndex + 1, cmdFiltered.length - 1);
          updateCmdActive();
          return;
        }
        if (event.key === "ArrowUp") {
          event.preventDefault();
          cmdActiveIndex = Math.max(cmdActiveIndex - 1, 0);
          updateCmdActive();
          return;
        }
        if (event.key === "Enter") {
          event.preventDefault();
          if (cmdFiltered[cmdActiveIndex]) {
            closeCmdPalette();
            cmdFiltered[cmdActiveIndex].run();
          }
        }
      });
    }
    if (backdrop) {
      backdrop.addEventListener("click", closeCmdPalette);
    }
  });

  // Global Ctrl+K handler
  document.addEventListener("keydown", function (event) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      if (isCmdPaletteOpen()) closeCmdPalette();
      else openCmdPalette();
      return;
    }
    // Escape closes the palette if open
    if (event.key === "Escape" && isCmdPaletteOpen()) {
      closeCmdPalette();
    }
  });

  // Expose for external use
  window.openCommandPalette = openCmdPalette;
  window.closeCommandPalette = closeCmdPalette;
})();

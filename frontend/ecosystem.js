/**
 * Bible Ecosystem Adapter for Christian Writing Workspace
 *
 * Bridges CWW data (localStorage) with the shared ecosystem format
 * used by Bible Thought Engine and Bible-Desk.
 *
 * Usage: window.BibleEcosystem.sync() / .exportData() / .importData(json)
 */
(function () {
  'use strict';

  var RECENT_VERSES_KEY = 'cww.recentVerses.v1';
  var DOCS_KEY = 'cww.docs.v4';
  var ECO_INSIGHTS_KEY = 'cww-ecosystem-insights-v1';
  var SESSIONS_KEY = 'cww-sessions-v1';
  var ACTIVE_SESSION_KEY = 'cww-active-session';

  // ─── Canonical book mapping (matches BTE's src/ecosystem/books.ts) ────

  var BOOKS = [
    { id: 1, name: 'Genesis' }, { id: 2, name: 'Exodus' },
    { id: 3, name: 'Leviticus' }, { id: 4, name: 'Numbers' },
    { id: 5, name: 'Deuteronomy' }, { id: 6, name: 'Joshua' },
    { id: 7, name: 'Judges' }, { id: 8, name: 'Ruth' },
    { id: 9, name: '1 Samuel' }, { id: 10, name: '2 Samuel' },
    { id: 11, name: '1 Kings' }, { id: 12, name: '2 Kings' },
    { id: 13, name: '1 Chronicles' }, { id: 14, name: '2 Chronicles' },
    { id: 15, name: 'Ezra' }, { id: 16, name: 'Nehemiah' },
    { id: 17, name: 'Esther' }, { id: 18, name: 'Job' },
    { id: 19, name: 'Psalms' }, { id: 20, name: 'Proverbs' },
    { id: 21, name: 'Ecclesiastes' }, { id: 22, name: 'Song of Solomon' },
    { id: 23, name: 'Isaiah' }, { id: 24, name: 'Jeremiah' },
    { id: 25, name: 'Lamentations' }, { id: 26, name: 'Ezekiel' },
    { id: 27, name: 'Daniel' }, { id: 28, name: 'Hosea' },
    { id: 29, name: 'Joel' }, { id: 30, name: 'Amos' },
    { id: 31, name: 'Obadiah' }, { id: 32, name: 'Jonah' },
    { id: 33, name: 'Micah' }, { id: 34, name: 'Nahum' },
    { id: 35, name: 'Habakkuk' }, { id: 36, name: 'Zephaniah' },
    { id: 37, name: 'Haggai' }, { id: 38, name: 'Zechariah' },
    { id: 39, name: 'Malachi' }, { id: 40, name: 'Matthew' },
    { id: 41, name: 'Mark' }, { id: 42, name: 'Luke' },
    { id: 43, name: 'John' }, { id: 44, name: 'Acts' },
    { id: 45, name: 'Romans' }, { id: 46, name: '1 Corinthians' },
    { id: 47, name: '2 Corinthians' }, { id: 48, name: 'Galatians' },
    { id: 49, name: 'Ephesians' }, { id: 50, name: 'Philippians' },
    { id: 51, name: 'Colossians' }, { id: 52, name: '1 Thessalonians' },
    { id: 53, name: '2 Thessalonians' }, { id: 54, name: '1 Timothy' },
    { id: 55, name: '2 Timothy' }, { id: 56, name: 'Titus' },
    { id: 57, name: 'Philemon' }, { id: 58, name: 'Hebrews' },
    { id: 59, name: 'James' }, { id: 60, name: '1 Peter' },
    { id: 61, name: '2 Peter' }, { id: 62, name: '1 John' },
    { id: 63, name: '2 John' }, { id: 64, name: '3 John' },
    { id: 65, name: 'Jude' }, { id: 66, name: 'Revelation' },
  ];

  var bookByNameMap = {};
  BOOKS.forEach(function (b) {
    bookByNameMap[b.name.toLowerCase()] = b;
  });

  function bookByName(name) {
    return bookByNameMap[(name || '').toLowerCase()] || null;
  }

  function bookById(id) {
    return BOOKS[id - 1] || null;
  }

  // ─── Parse CWW verse ref: "John 3:16" ────────────────

  var VERSE_RE = /^(.+?)\s+(\d+):(\d+)$/;

  function parseVerseRef(ref) {
    var m = String(ref || '').trim().match(VERSE_RE);
    if (!m) return null;
    var book = bookByName(m[1].trim());
    if (!book) return null;
    return { bookId: book.id, chapter: parseInt(m[2], 10), verse: parseInt(m[3], 10), bookName: book.name };
  }

  function toVerseString(ecoRef) {
    var book = bookById(ecoRef.bookId);
    if (!book) return null;
    return book.name + ' ' + ecoRef.chapter + ':' + ecoRef.verse;
  }

  // ─── Read CWW data ──────────────────────────────────

  function readRecentVerses() {
    try {
      var raw = JSON.parse(localStorage.getItem(RECENT_VERSES_KEY) || '[]');
      return raw
        .map(function (ref) { return parseVerseRef(ref); })
        .filter(function (r) { return r !== null; });
    } catch (e) {
      console.warn('[Ecosystem] Failed to read recent verses:', e);
      return [];
    }
  }

  function readNotes() {
    var results = [];
    try {
      var docs = JSON.parse(localStorage.getItem(DOCS_KEY) || '[]');
      docs.forEach(function (doc) {
        var refs = [];
        // Extract [[verse]] tokens from editor content
        var tokenRe = /\[\[(.+?)\]\]/g;
        var content = (doc.editor || '') + '\n' + (doc.notes || '');
        var match;
        while ((match = tokenRe.exec(content)) !== null) {
          var ref = parseVerseRef(match[1]);
          if (ref) refs.push(ref);
        }
        // Also extract "Book Ch:V" patterns from notes
        var inlineRe = /\b([1-3]?\s?[A-Z][a-z]+(?:\s+of\s+[A-Z][a-z]+)?)\s+(\d+):(\d+)\b/g;
        while ((match = inlineRe.exec(content)) !== null) {
          var ref2 = parseVerseRef(match[0]);
          if (ref2) {
            var isDup = refs.some(function (r) {
              return r.bookId === ref2.bookId && r.chapter === ref2.chapter && r.verse === ref2.verse;
            });
            if (!isDup) refs.push(ref2);
          }
        }

        if (doc.title || doc.editor || doc.notes) {
          results.push({
            title: doc.title || 'Untitled',
            content: (doc.editor || '') + (doc.notes ? '\n---\n' + doc.notes : ''),
            refs: refs,
            source: 'cww',
            updatedAt: doc.updatedAt || new Date().toISOString(),
          });
        }
      });
    } catch (e) {
      console.warn('[Ecosystem] Failed to read notes:', e);
    }
    return results;
  }

  // ─── Read / Write ecosystem insights ───────────────────

  function readEcoInsights() {
    try {
      return JSON.parse(localStorage.getItem(ECO_INSIGHTS_KEY) || '[]');
    } catch (e) {
      console.warn('[Ecosystem] Failed to read insights:', e);
      return [];
    }
  }

  function writeEcoInsights(insights) {
    if (!Array.isArray(insights) || insights.length === 0) return 0;
    var existing = readEcoInsights();
    var existingIds = {};
    existing.forEach(function (ins) { existingIds[ins.id] = true; });

    var added = 0;
    insights.forEach(function (ins) {
      if (!ins || !ins.id) return;
      if (existingIds[ins.id]) {
        // Update if newer
        for (var i = 0; i < existing.length; i++) {
          if (existing[i].id === ins.id) {
            if ((ins.updatedAt || '') > (existing[i].updatedAt || '')) {
              existing[i] = ins;
            }
            break;
          }
        }
      } else {
        existing.push(ins);
        existingIds[ins.id] = true;
        added++;
      }
    });

    localStorage.setItem(ECO_INSIGHTS_KEY, JSON.stringify(existing));
    return added;
  }

  // ─── Read / Write study sessions ────────────────────

  function readSessions() {
    try {
      return JSON.parse(localStorage.getItem(SESSIONS_KEY) || '[]');
    } catch (e) {
      console.warn('[Ecosystem] Failed to read sessions:', e);
      return [];
    }
  }

  function writeSessions(sessions) {
    if (!Array.isArray(sessions) || sessions.length === 0) return 0;
    var existing = readSessions();
    var existingMap = {};
    existing.forEach(function (s) { existingMap[s.id] = s; });

    var added = 0;
    sessions.forEach(function (s) {
      if (!s || !s.id) return;
      if (existingMap[s.id]) {
        // Update if newer
        if ((s.updatedAt || '') > (existingMap[s.id].updatedAt || '')) {
          existingMap[s.id] = s;
        }
      } else {
        existingMap[s.id] = s;
        added++;
      }
    });

    localStorage.setItem(SESSIONS_KEY, JSON.stringify(Object.values(existingMap).slice(0, 50)));
    return added;
  }

  // ─── Write imported data into CWW ────────────────────

  function writeRecentVerses(ecoBookmarks, ecoRecentVerses) {
    var existing = [];
    try {
      existing = JSON.parse(localStorage.getItem(RECENT_VERSES_KEY) || '[]');
    } catch (e) { /* empty */ }

    var added = 0;

    // Add bookmarks from other apps as recent verses
    ecoBookmarks.forEach(function (bm) {
      if (bm.source === 'cww') return;
      var str = toVerseString(bm.ref);
      if (str && existing.indexOf(str) === -1) {
        existing.unshift(str);
        added++;
      }
    });

    // Add recent verses from other apps
    ecoRecentVerses.forEach(function (rv) {
      var str = toVerseString(rv);
      if (str && existing.indexOf(str) === -1) {
        existing.unshift(str);
        added++;
      }
    });

    existing = existing.slice(0, 12);
    localStorage.setItem(RECENT_VERSES_KEY, JSON.stringify(existing));
    return added;
  }

  // ─── Extract verse references from all documents ─────

  function extractDocumentVerses() {
    var allRefs = [];
    try {
      var docs = JSON.parse(localStorage.getItem(DOCS_KEY) || '[]');
      docs.forEach(function (doc) {
        var content = (doc.editor || '') + '\n' + (doc.notes || '');
        // Extract [[Book Ch:V]] tokens
        var tokenRe = /\[\[(.+?)\]\]/g;
        var match;
        while ((match = tokenRe.exec(content)) !== null) {
          var ref = parseVerseRef(match[1]);
          if (ref) allRefs.push(ref);
        }
        // Extract inline Book Ch:V patterns
        var inlineRe = /\b([1-3]?\s?[A-Z][a-z]+(?:\s+of\s+[A-Z][a-z]+)?)\s+(\d+):(\d+)\b/g;
        while ((match = inlineRe.exec(content)) !== null) {
          var ref2 = parseVerseRef(match[0]);
          if (ref2) allRefs.push(ref2);
        }
      });
    } catch (e) { /* ignore */ }
    // Dedup by bookId:chapter:verse
    var seen = {};
    return allRefs.filter(function (r) {
      var k = r.bookId + ':' + r.chapter + ':' + r.verse;
      if (seen[k]) return false;
      seen[k] = true;
      return true;
    });
  }

  // ─── Export / Import / Sync ──────────────────────────

  function exportData() {
    var extractedVerses = extractDocumentVerses();
    var now = new Date().toISOString();

    // Generate highlights for each verse referenced in writing
    var highlights = extractedVerses.map(function (ref) {
      return { ref: ref, color: '#7c6f9e', source: 'cww', updatedAt: now };
    });

    // Local dedup helper
    function dedup(items, keyFn, pickFn) {
      var map = {};
      items.forEach(function (item) {
        var k = keyFn(item);
        if (!map[k] || pickFn(map[k], item) === item) map[k] = item;
      });
      return Object.values(map);
    }

    return {
      version: 1,
      lastSync: now,
      highlights: highlights,
      bookmarks: [],
      notes: readNotes(),
      insights: [],
      sessions: readSessions(),
      activeSessionId: localStorage.getItem(ACTIVE_SESSION_KEY) || undefined,
      recentVerses: dedup(
        extractedVerses.concat(readRecentVerses()),
        function (r) { return r.bookId + ':' + r.chapter + ':' + r.verse; },
        function (x) { return x; }
      ).slice(0, 50),
      sources: { cww: { lastSync: now } },
      // CWW does not own translation/theme settings, so no settings field is exported.
      // Existing settings from other apps are preserved via mergeData().
    };
  }

  function importData(ecoData) {
    if (!ecoData || ecoData.version !== 1) {
      console.error('[Ecosystem] Invalid data format');
      return null;
    }
    var validBookmarks = safeImport(ecoData.bookmarks || [], ['ref', 'source']);
    var validInsights = safeImport(ecoData.insights || [], ['id']);
    var validSessions = safeImport(ecoData.sessions || [], ['id']);
    var vCount = writeRecentVerses(validBookmarks, ecoData.recentVerses || []);
    var iCount = writeEcoInsights(validInsights);
    var sCount = writeSessions(validSessions);
    console.log('[Ecosystem] Imported: ' + vCount + ' recent verses, ' + iCount + ' insights, ' + sCount + ' sessions');
    return { recentVerses: vCount, insights: iCount, sessions: sCount };
  }

  function validateSharedData(data) {
    if (!data || typeof data !== 'object') return false;
    return (
      data.version === 1 &&
      typeof data.lastSync === 'string' &&
      Array.isArray(data.highlights) &&
      Array.isArray(data.bookmarks) &&
      Array.isArray(data.notes) &&
      Array.isArray(data.recentVerses) &&
      (data.insights === undefined || Array.isArray(data.insights))
    );
  }

  function safeImport(items, requiredFields) {
    if (!Array.isArray(items)) return [];
    return items.filter(function (item) {
      if (!item || typeof item !== 'object') return false;
      var valid = requiredFields.every(function (field) {
        return Object.prototype.hasOwnProperty.call(item, field);
      });
      if (!valid) {
        console.warn('[Ecosystem] Skipping malformed item, missing fields:', requiredFields, item);
      }
      return valid;
    });
  }

  async function sync() {
    try {
      var { appDataDir, join } = await import('@tauri-apps/api/path');
      var { mkdir, readTextFile, writeTextFile } = await import('@tauri-apps/plugin-fs');

      var appData = await appDataDir();
      var ecoDir = await join(appData, '..', 'Bible-Ecosystem');
      var filePath = await join(ecoDir, 'shared.json');
      var backupFile = await join(ecoDir, 'shared.backup.json');

      try { await mkdir(ecoDir, { recursive: true }); } catch (e) { /* exists */ }

      // Read existing shared data
      var existing = { version: 1, lastSync: '', highlights: [], bookmarks: [], notes: [], insights: [], sessions: [], recentVerses: [] };
      try {
        var raw = await readTextFile(filePath);
        var parsed = JSON.parse(raw);
        if (validateSharedData(parsed)) {
          existing = parsed;
        } else {
          console.warn('[Ecosystem] shared.json failed validation, trying backup...');
          throw new Error('Validation failed');
        }
      } catch (e) {
        // Try backup file recovery
        if (e.message === 'Validation failed' || (e instanceof SyntaxError)) {
          try {
            var bakRaw = await readTextFile(backupFile);
            var bakParsed = JSON.parse(bakRaw);
            if (validateSharedData(bakParsed)) {
              existing = bakParsed;
              console.warn('[Ecosystem] Recovered from backup file');
            }
          } catch (bakErr) {
            console.warn('[Ecosystem] Backup recovery failed, starting fresh');
          }
        }
        /* else first run — use default empty existing */
      }

      var ours = exportData();

      // Validate both sides before merge
      if (!validateSharedData(existing)) {
        console.warn('[Ecosystem] Existing data invalid, resetting to empty');
        existing = { version: 1, lastSync: '', highlights: [], bookmarks: [], notes: [], insights: [], sessions: [], recentVerses: [] };
      }

      var merged = mergeData(existing, ours);

      // Validate imported items before passing to importData
      merged.highlights = safeImport(merged.highlights, ['ref', 'color', 'source']);
      merged.bookmarks = safeImport(merged.bookmarks, ['ref', 'source']);
      merged.notes = safeImport(merged.notes, ['title', 'source']);

      var result = importData(merged);

      // Pre-write backup: save current file as backup before overwriting
      try {
        var currentRaw = await readTextFile(filePath);
        await writeTextFile(backupFile, currentRaw);
      } catch (e) { /* no existing file to backup */ }

      // Write merged data back
      try {
        await writeTextFile(filePath, JSON.stringify(merged, null, 2));
      } catch (writeErr) {
        console.error('[Ecosystem] Failed to write shared.json:', writeErr);
        return null;
      }

      console.log('[Ecosystem] Sync complete', result);
      return result;
    } catch (e) {
      console.warn('[Ecosystem] Sync failed (Tauri FS not available?):', e);
      return null;
    }
  }

  function mergeData(a, b) {
    function refKey(ref, source) {
      return ref.bookId + ':' + ref.chapter + ':' + ref.verse + ':' + source;
    }
    function dedup(items, keyFn, pickFn) {
      var map = {};
      items.forEach(function (item) {
        var k = keyFn(item);
        if (!map[k] || pickFn(map[k], item) === item) map[k] = item;
      });
      return Object.values(map);
    }
    function newer(x, y) { return (x.updatedAt || x.createdAt) >= (y.updatedAt || y.createdAt) ? x : y; }

    function mergeSessions(items) {
      var sMap = {};
      items.forEach(function (s) {
        if (!s || !s.id) return;
        var existing = sMap[s.id];
        if (!existing) { sMap[s.id] = s; return; }
        var base = (existing.updatedAt || '') >= (s.updatedAt || '') ? existing : s;
        var other = base === existing ? s : existing;
        var trailMap = {};
        (base.trail || []).concat(other.trail || []).forEach(function (t) {
          var k = t.ref.bookId + ':' + t.ref.chapter + ':' + t.ref.verse + ':' + t.timestamp;
          if (!trailMap[k]) trailMap[k] = t;
        });
        sMap[s.id] = Object.assign({}, base, {
          trail: Object.values(trailMap).sort(function (x, y) { return (x.timestamp || '').localeCompare(y.timestamp || ''); })
        });
      });
      return Object.values(sMap);
    }

    return {
      version: 1,
      lastSync: new Date().toISOString(),
      highlights: dedup(
        (a.highlights || []).concat(b.highlights || []),
        function (h) { return refKey(h.ref, h.source); },
        newer
      ).slice(0, 500),
      bookmarks: dedup(
        (a.bookmarks || []).concat(b.bookmarks || []),
        function (bm) { return refKey(bm.ref, bm.source); },
        newer
      ).slice(0, 200),
      notes: dedup(
        (a.notes || []).concat(b.notes || []),
        function (n) { return n.title + ':' + n.source; },
        newer
      ).slice(0, 100),
      insights: dedup(
        (a.insights || []).concat(b.insights || []),
        function (i) { return i.id; },
        newer
      ).slice(0, 200),
      sessions: mergeSessions(
        (a.sessions || []).concat(b.sessions || [])
      ).slice(0, 50),
      activeSessionId: b.activeSessionId || a.activeSessionId || undefined,
      recentVerses: dedup(
        (b.recentVerses || []).concat(a.recentVerses || []),
        function (r) { return r.bookId + ':' + r.chapter + ':' + r.verse; },
        function (x) { return x; }
      ).slice(0, 50),
      graph: b.graph || a.graph || undefined,
      sources: Object.assign({}, a.sources || {}, b.sources || {}),
      // Merge settings — incoming values take priority (shared defaults)
      settings: Object.assign({}, a.settings || {}, b.settings || {}),
    };
  }

  function _getActiveSessionParam() {
    var activeSession = localStorage.getItem(ACTIVE_SESSION_KEY);
    if (activeSession) return '&session=' + encodeURIComponent(activeSession);
    return '';
  }

  function openInThoughtEngine(verseRef) {
    var ref = typeof verseRef === 'string' ? verseRef : toVerseString(verseRef);
    if (!ref) return;
    var url = 'http://localhost:5173/?ref=' + encodeURIComponent(ref);
    url += _getActiveSessionParam();

    import('@tauri-apps/plugin-shell')
      .then(function (mod) { return mod.open(url); })
      .catch(function () { window.open(url, '_blank'); });
  }

  function openInStudyDesk(verseRef) {
    var ref = typeof verseRef === 'string' ? verseRef : toVerseString(verseRef);
    if (!ref) return;
    var url = 'http://localhost:3000/?ref=' + encodeURIComponent(ref);
    url += _getActiveSessionParam();
    import('@tauri-apps/plugin-shell')
      .then(function (mod) { return mod.open(url); })
      .catch(function () { window.open(url, '_blank'); });
  }

  function openInBibleDesk(verseRef) {
    var ref = typeof verseRef === 'string' ? verseRef : toVerseString(verseRef);
    if (!ref) return;
    var url = 'http://localhost:1420/?ref=' + encodeURIComponent(ref);
    url += _getActiveSessionParam();
    import('@tauri-apps/plugin-shell')
      .then(function (mod) { return mod.open(url); })
      .catch(function () { window.open(url, '_blank'); });
  }

  // ─── Wire up UI buttons ───────────────────────────────

  function init() {
    var openBtn = document.getElementById('eco-open-btn');
    if (openBtn) {
      openBtn.addEventListener('click', function () {
        // Use the current verse lookup or first recent verse
        var queryEl = document.getElementById('verse-query');
        var ref = queryEl ? queryEl.value.trim() : '';
        if (!ref) {
          try {
            var recent = JSON.parse(localStorage.getItem(RECENT_VERSES_KEY) || '[]');
            ref = recent[0] || '';
          } catch (e) { /* empty */ }
        }
        if (ref) openInThoughtEngine(ref);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ─── Cached sync (skip if last result is < 5 min old) ──

  var SYNC_CACHE_KEY = 'eco-sync-cache-cww';
  var SYNC_CACHE_TTL = 300000; // 5 minutes

  async function cachedSync() {
    try {
      var cached = JSON.parse(localStorage.getItem(SYNC_CACHE_KEY) || 'null');
      if (cached && cached.timestamp && (Date.now() - cached.timestamp < SYNC_CACHE_TTL)) {
        console.log('[Ecosystem] Using cached sync result (< 5min old)');
        return cached.result;
      }
    } catch(e) { /* ignore parse errors */ }

    var result = await sync();
    try {
      localStorage.setItem(SYNC_CACHE_KEY, JSON.stringify({ timestamp: Date.now(), result: result }));
    } catch(e) { /* ignore storage errors */ }
    return result;
  }

  // ─── Deferred startup sync ─────────────────────────────
  // Run ecosystem sync in the background after the page has fully loaded,
  // so it does not block the initial render or writing experience.

  function deferredStartupSync() {
    setTimeout(function() {
      cachedSync().then(function(result) {
        if (result) {
          console.log('[Ecosystem] Deferred startup sync complete', result);
        }
      }).catch(function(e) {
        console.warn('[Ecosystem] Deferred startup sync failed:', e);
      });
    }, 1500); // Delay to let the writing content render first
  }

  // Trigger deferred startup sync after window.load
  if (document.readyState === 'complete') {
    deferredStartupSync();
  } else {
    window.addEventListener('load', deferredStartupSync, { once: true });
  }

  // ─── Expose API ──────────────────────────────────────

  window.BibleEcosystem = {
    sync: sync,
    cachedSync: cachedSync,
    exportData: exportData,
    importData: importData,
    readEcoInsights: readEcoInsights,
    readSessions: readSessions,
    writeSessions: writeSessions,
    openInThoughtEngine: openInThoughtEngine,
    openInStudyDesk: openInStudyDesk,
    openInBibleDesk: openInBibleDesk,
  };

  console.log('[Ecosystem] CWW adapter loaded');
})();

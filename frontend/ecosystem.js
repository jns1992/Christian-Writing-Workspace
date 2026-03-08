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

  // ─── Export / Import / Sync ──────────────────────────

  function exportData() {
    return {
      version: 1,
      lastSync: new Date().toISOString(),
      highlights: [],
      bookmarks: [],
      notes: readNotes(),
      recentVerses: readRecentVerses(),
    };
  }

  function importData(ecoData) {
    if (!ecoData || ecoData.version !== 1) {
      console.error('[Ecosystem] Invalid data format');
      return null;
    }
    var vCount = writeRecentVerses(ecoData.bookmarks || [], ecoData.recentVerses || []);
    console.log('[Ecosystem] Imported: ' + vCount + ' recent verses');
    return { recentVerses: vCount };
  }

  async function sync() {
    try {
      var { appDataDir, join } = await import('@tauri-apps/api/path');
      var { mkdir, readTextFile, writeTextFile } = await import('@tauri-apps/plugin-fs');

      var appData = await appDataDir();
      var ecoDir = await join(appData, '..', 'Bible-Ecosystem');
      var filePath = await join(ecoDir, 'shared.json');

      try { await mkdir(ecoDir, { recursive: true }); } catch (e) { /* exists */ }

      var existing = { version: 1, lastSync: '', highlights: [], bookmarks: [], notes: [], recentVerses: [] };
      try {
        var raw = await readTextFile(filePath);
        existing = JSON.parse(raw);
      } catch (e) { /* first run */ }

      var ours = exportData();
      var merged = mergeData(existing, ours);
      var result = importData(merged);

      await writeTextFile(filePath, JSON.stringify(merged, null, 2));
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
      recentVerses: dedup(
        (b.recentVerses || []).concat(a.recentVerses || []),
        function (r) { return r.bookId + ':' + r.chapter + ':' + r.verse; },
        function (x) { return x; }
      ).slice(0, 50),
    };
  }

  function openInThoughtEngine(verseRef) {
    var ref = typeof verseRef === 'string' ? verseRef : toVerseString(verseRef);
    if (!ref) return;
    var url = 'http://localhost:5173/?ref=' + encodeURIComponent(ref);

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

  // ─── Expose API ──────────────────────────────────────

  window.BibleEcosystem = {
    sync: sync,
    exportData: exportData,
    importData: importData,
    openInThoughtEngine: openInThoughtEngine,
  };

  console.log('[Ecosystem] CWW adapter loaded');
})();

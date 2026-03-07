use rusqlite::Connection;
use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use tauri::State;

struct DbState(Mutex<Connection>);

#[derive(Serialize, Deserialize, Clone)]
struct Document {
    id: Option<i64>,
    title: String,
    template: String,
    content: String,
    notes: String,
    created_at: String,
    updated_at: String,
}

fn init_schema(conn: &Connection) {
    conn.execute_batch(
        "CREATE TABLE IF NOT EXISTS documents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL DEFAULT 'Untitled',
            template TEXT NOT NULL DEFAULT '',
            content TEXT NOT NULL DEFAULT '',
            notes TEXT NOT NULL DEFAULT '',
            created_at TEXT NOT NULL DEFAULT (datetime('now')),
            updated_at TEXT NOT NULL DEFAULT (datetime('now'))
        );
        CREATE TABLE IF NOT EXISTS verse_library (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT NOT NULL,
            reference TEXT NOT NULL,
            text TEXT NOT NULL
        );"
    ).expect("Failed to initialize database schema");
}

#[tauri::command]
fn save_document(
    state: State<'_, DbState>,
    id: Option<i64>,
    title: String,
    template: String,
    content: String,
    notes: String,
) -> Result<i64, String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;
    if let Some(doc_id) = id {
        conn.execute(
            "UPDATE documents SET title=?1, template=?2, content=?3, notes=?4, updated_at=datetime('now') WHERE id=?5",
            rusqlite::params![title, template, content, notes, doc_id],
        ).map_err(|e| e.to_string())?;
        Ok(doc_id)
    } else {
        conn.execute(
            "INSERT INTO documents (title, template, content, notes) VALUES (?1, ?2, ?3, ?4)",
            rusqlite::params![title, template, content, notes],
        ).map_err(|e| e.to_string())?;
        Ok(conn.last_insert_rowid())
    }
}

#[tauri::command]
fn list_documents(state: State<'_, DbState>) -> Result<Vec<Document>, String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;
    let mut stmt = conn
        .prepare("SELECT id, title, template, content, notes, created_at, updated_at FROM documents ORDER BY updated_at DESC")
        .map_err(|e| e.to_string())?;
    let docs = stmt
        .query_map([], |row| {
            Ok(Document {
                id: row.get(0)?,
                title: row.get(1)?,
                template: row.get(2)?,
                content: row.get(3)?,
                notes: row.get(4)?,
                created_at: row.get(5)?,
                updated_at: row.get(6)?,
            })
        })
        .map_err(|e| e.to_string())?
        .collect::<Result<Vec<_>, _>>()
        .map_err(|e| e.to_string())?;
    Ok(docs)
}

#[tauri::command]
fn load_document(state: State<'_, DbState>, id: i64) -> Result<Document, String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;
    conn.query_row(
        "SELECT id, title, template, content, notes, created_at, updated_at FROM documents WHERE id=?1",
        rusqlite::params![id],
        |row| {
            Ok(Document {
                id: row.get(0)?,
                title: row.get(1)?,
                template: row.get(2)?,
                content: row.get(3)?,
                notes: row.get(4)?,
                created_at: row.get(5)?,
                updated_at: row.get(6)?,
            })
        },
    ).map_err(|e| e.to_string())
}

#[tauri::command]
fn delete_document(state: State<'_, DbState>, id: i64) -> Result<(), String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;
    conn.execute("DELETE FROM documents WHERE id=?1", rusqlite::params![id])
        .map_err(|e| e.to_string())?;
    Ok(())
}

pub fn run() {
    let app_data = dirs_next::data_dir()
        .unwrap_or_else(|| std::path::PathBuf::from("."))
        .join("christian-writing-workspace");
    std::fs::create_dir_all(&app_data).ok();
    let db_path = app_data.join("cww.db");
    let conn = Connection::open(&db_path).expect("Failed to open database");
    init_schema(&conn);

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_fs::init())
        .manage(DbState(Mutex::new(conn)))
        .invoke_handler(tauri::generate_handler![
            save_document,
            list_documents,
            load_document,
            delete_document,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

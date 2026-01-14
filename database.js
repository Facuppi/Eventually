import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Database(join(__dirname, 'scheduler.db'));

// Initialize base tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    email TEXT PRIMARY KEY,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS events (
    id TEXT PRIMARY KEY,
    admin_id TEXT NOT NULL,
    name TEXT NOT NULL,
    expected_participants INTEGER NOT NULL,
    view_mode TEXT NOT NULL DEFAULT 'days',
    selected_dates TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'open',
    winner_date TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS responses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id TEXT NOT NULL,
    participant_name TEXT NOT NULL,
    availability TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id)
  );

  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id TEXT NOT NULL,
    author_name TEXT NOT NULL,
    author_email TEXT,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id)
  );
`);

// Migration: Add new columns if they don't exist
const migrations = [
  // Events table migrations
  { table: 'events', column: 'admin_email', sql: `ALTER TABLE events ADD COLUMN admin_email TEXT DEFAULT ''` },
  { table: 'events', column: 'description', sql: `ALTER TABLE events ADD COLUMN description TEXT DEFAULT ''` },
  { table: 'events', column: 'location', sql: `ALTER TABLE events ADD COLUMN location TEXT DEFAULT ''` },
  { table: 'events', column: 'custom_slug', sql: `ALTER TABLE events ADD COLUMN custom_slug TEXT` },
  { table: 'events', column: 'theme_color', sql: `ALTER TABLE events ADD COLUMN theme_color TEXT DEFAULT '#0071e3'` },
  { table: 'events', column: 'logo_url', sql: `ALTER TABLE events ADD COLUMN logo_url TEXT` },
  { table: 'events', column: 'readonly_id', sql: `ALTER TABLE events ADD COLUMN readonly_id TEXT` },
  { table: 'events', column: 'deadline', sql: `ALTER TABLE events ADD COLUMN deadline DATETIME` },
  { table: 'events', column: 'updated_at', sql: `ALTER TABLE events ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP` },
  // Responses table migrations
  { table: 'responses', column: 'participant_email', sql: `ALTER TABLE responses ADD COLUMN participant_email TEXT DEFAULT ''` },
];

// Check if column exists before adding
const tableInfo = (table) => {
  try {
    return db.prepare(`PRAGMA table_info(${table})`).all();
  } catch {
    return [];
  }
};

migrations.forEach(({ table, column, sql }) => {
  const columns = tableInfo(table).map(c => c.name);
  if (!columns.includes(column)) {
    try {
      db.exec(sql);
    } catch (e) {
      // Column might already exist or other error
    }
  }
});

// Add unique constraint if not exists (for responses)
try {
  db.exec(`CREATE UNIQUE INDEX IF NOT EXISTS idx_responses_unique ON responses(event_id, participant_email)`);
} catch (e) {
  // Index might already exist
}

// Create indexes after columns exist
try {
  db.exec(`CREATE INDEX IF NOT EXISTS idx_events_admin_id ON events(admin_id)`);
  db.exec(`CREATE INDEX IF NOT EXISTS idx_responses_event_id ON responses(event_id)`);
  db.exec(`CREATE INDEX IF NOT EXISTS idx_comments_event_id ON comments(event_id)`);
} catch (e) {
  // Indexes might already exist
}

// User functions
export const getOrCreateUser = (email) => {
  const existing = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (existing) return existing;
  
  db.prepare('INSERT INTO users (email) VALUES (?)').run(email);
  return { email };
};

// Event functions
export const createEvent = (event) => {
  const stmt = db.prepare(`
    INSERT INTO events (id, admin_id, admin_email, name, description, location, expected_participants, view_mode, selected_dates, theme_color, readonly_id, deadline)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(
    event.id,
    event.adminId,
    event.adminEmail || '',
    event.name,
    event.description || '',
    event.location || '',
    event.expectedParticipants,
    event.viewMode,
    JSON.stringify(event.selectedDates),
    event.themeColor || '#0071e3',
    event.readonlyId || null,
    event.deadline || null
  );
  return event;
};

export const getEvent = (id) => {
  const stmt = db.prepare('SELECT * FROM events WHERE id = ?');
  const event = stmt.get(id);
  if (event) {
    event.selected_dates = JSON.parse(event.selected_dates);
  }
  return event;
};

export const getEventByAdminId = (adminId) => {
  const stmt = db.prepare('SELECT * FROM events WHERE admin_id = ?');
  const event = stmt.get(adminId);
  if (event) {
    event.selected_dates = JSON.parse(event.selected_dates);
  }
  return event;
};

export const getEventByReadonlyId = (readonlyId) => {
  const stmt = db.prepare('SELECT * FROM events WHERE readonly_id = ?');
  const event = stmt.get(readonlyId);
  if (event) {
    event.selected_dates = JSON.parse(event.selected_dates);
  }
  return event;
};

export const getEventsByUserEmail = (email) => {
  const created = db.prepare(`
    SELECT *, 'created' as role FROM events WHERE admin_email = ?
  `).all(email);
  
  const participated = db.prepare(`
    SELECT e.*, 'participant' as role 
    FROM events e 
    INNER JOIN responses r ON e.id = r.event_id 
    WHERE r.participant_email = ?
  `).all(email);
  
  const all = [...created, ...participated];
  
  const seen = new Set();
  return all.filter(e => {
    if (seen.has(e.id)) return false;
    seen.add(e.id);
    e.selected_dates = JSON.parse(e.selected_dates);
    return true;
  }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
};

export const updateEvent = (adminId, updates) => {
  const event = getEventByAdminId(adminId);
  if (!event) return null;

  const allowedUpdates = ['name', 'description', 'location', 'expected_participants', 'selected_dates', 'theme_color', 'deadline'];
  const setClauses = [];
  const values = [];

  for (const [key, value] of Object.entries(updates)) {
    const dbKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
    if (allowedUpdates.includes(dbKey)) {
      setClauses.push(`${dbKey} = ?`);
      values.push(dbKey === 'selected_dates' ? JSON.stringify(value) : value);
    }
  }

  if (setClauses.length === 0) return event;

  setClauses.push('updated_at = CURRENT_TIMESTAMP');
  values.push(adminId);

  const stmt = db.prepare(`UPDATE events SET ${setClauses.join(', ')} WHERE admin_id = ?`);
  stmt.run(...values);

  return getEventByAdminId(adminId);
};

export const closeEvent = (adminId, winnerDate) => {
  const stmt = db.prepare(`
    UPDATE events SET status = 'closed', winner_date = ?, updated_at = CURRENT_TIMESTAMP WHERE admin_id = ?
  `);
  return stmt.run(winnerDate, adminId);
};

export const reopenEvent = (adminId) => {
  const stmt = db.prepare(`
    UPDATE events SET status = 'open', winner_date = NULL, updated_at = CURRENT_TIMESTAMP WHERE admin_id = ?
  `);
  return stmt.run(adminId);
};

export const deleteEvent = (adminId) => {
  const event = getEventByAdminId(adminId);
  if (!event) return false;

  db.prepare('DELETE FROM comments WHERE event_id = ?').run(event.id);
  db.prepare('DELETE FROM responses WHERE event_id = ?').run(event.id);
  db.prepare('DELETE FROM events WHERE admin_id = ?').run(adminId);
  return true;
};

export const duplicateEvent = (adminId, newId, newAdminId, newReadonlyId) => {
  const event = getEventByAdminId(adminId);
  if (!event) return null;

  const newEvent = {
    id: newId,
    adminId: newAdminId,
    adminEmail: event.admin_email,
    name: `${event.name} (copia)`,
    description: event.description || '',
    location: event.location || '',
    expectedParticipants: event.expected_participants,
    viewMode: event.view_mode,
    selectedDates: event.selected_dates,
    themeColor: event.theme_color,
    readonlyId: newReadonlyId,
    deadline: null
  };

  return createEvent(newEvent);
};

// Response functions
export const saveResponse = (eventId, participantEmail, participantName, availability) => {
  // First check if response exists
  const existing = db.prepare('SELECT id FROM responses WHERE event_id = ? AND participant_email = ?').get(eventId, participantEmail);
  
  if (existing) {
    // Update existing
    const stmt = db.prepare(`
      UPDATE responses SET participant_name = ?, availability = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE event_id = ? AND participant_email = ?
    `);
    stmt.run(participantName, JSON.stringify(availability), eventId, participantEmail);
  } else {
    // Insert new
    const stmt = db.prepare(`
      INSERT INTO responses (event_id, participant_email, participant_name, availability)
      VALUES (?, ?, ?, ?)
    `);
    stmt.run(eventId, participantEmail, participantName, JSON.stringify(availability));
  }
};

export const getResponses = (eventId) => {
  const stmt = db.prepare('SELECT * FROM responses WHERE event_id = ? ORDER BY created_at ASC');
  const responses = stmt.all(eventId);
  return responses.map(r => ({
    ...r,
    availability: JSON.parse(r.availability)
  }));
};

export const getResponseByEmail = (eventId, email) => {
  const stmt = db.prepare('SELECT * FROM responses WHERE event_id = ? AND participant_email = ?');
  const response = stmt.get(eventId, email);
  if (response) {
    response.availability = JSON.parse(response.availability);
  }
  return response;
};

export const deleteResponse = (eventId, participantEmail) => {
  const stmt = db.prepare('DELETE FROM responses WHERE event_id = ? AND participant_email = ?');
  return stmt.run(eventId, participantEmail);
};

// Comment functions
export const addComment = (eventId, authorName, authorEmail, content) => {
  const stmt = db.prepare(`
    INSERT INTO comments (event_id, author_name, author_email, content)
    VALUES (?, ?, ?, ?)
  `);
  const result = stmt.run(eventId, authorName, authorEmail || null, content);
  return {
    id: result.lastInsertRowid,
    event_id: eventId,
    author_name: authorName,
    author_email: authorEmail,
    content,
    created_at: new Date().toISOString()
  };
};

export const getComments = (eventId) => {
  const stmt = db.prepare('SELECT * FROM comments WHERE event_id = ? ORDER BY created_at ASC');
  return stmt.all(eventId);
};

export const deleteComment = (commentId, adminId = null) => {
  if (adminId) {
    // If adminId provided, verify ownership
    const comment = db.prepare('SELECT c.*, e.admin_id FROM comments c JOIN events e ON c.event_id = e.id WHERE c.id = ?').get(commentId);
    if (!comment || comment.admin_id !== adminId) return false;
  }
  
  db.prepare('DELETE FROM comments WHERE id = ?').run(commentId);
  return true;
};

export default db;

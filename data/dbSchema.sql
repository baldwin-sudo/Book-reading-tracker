CREATE TABLE IF NOT EXISTS books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  genre TEXT,
  cover_url TEXT,
  book_url TEXT,
  status TEXT,
  total_pages INTEGER,
  current_page INTEGER,
  start_date TEXT,
  finish_date TEXT
);

CREATE TABLE IF NOT EXISTS notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  book_id INTEGER,
  page INTEGER,
  content TEXT,
  FOREIGN KEY (book_id) REFERENCES books(id)
);

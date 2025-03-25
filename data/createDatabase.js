import sqlite3 from "sqlite3";
// Open (or create) the database
const db = new sqlite3.Database("./books.db", (err) => {
  if (err) {
    console.error("Error opening database", err);
  } else {
    console.log("Database opened successfully");
  }
});

// Create tables
const createBooksTable = `
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    genre TEXT NOT NULL,
    content TEXT NOT NULL,
    cover TEXT,
    book_url TEXT NOT NULL,
    status TEXT NOT NULL,
    total_pages INTEGER NOT NULL,
    current_page INTEGER NOT NULL,
    start_date TEXT,
    finish_date TEXT
  );
`;

const createNotesTable = `
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    book_id INTEGER,
    page INTEGER NOT NULL,
    content TEXT NOT NULL,
    FOREIGN KEY(book_id) REFERENCES books(id)
  );
`;

// Execute the schema creation queries
db.serialize(() => {
  db.run(createBooksTable, (err) => {
    if (err) {
      console.error("Error creating books table:", err);
    } else {
      console.log("Books table created (or already exists)");
    }
  });

  db.run(createNotesTable, (err) => {
    if (err) {
      console.error("Error creating notes table:", err);
    } else {
      console.log("Notes table created (or already exists)");
    }
  });
});

// Close the database connection
db.close((err) => {
  if (err) {
    console.error("Error closing database:", err);
  } else {
    console.log("Database connection closed");
  }
});

import sqlite3 from "sqlite3";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { mkdir } from "fs";

// Initialize SQLite database
const db = new sqlite3.Database("./data/books.db");

// Ensure the "uploads" folder exists
const uploadsDir = join(process.cwd(), "public", "uploads");
mkdir(uploadsDir, { recursive: true }, (err) => {
  if (err) console.error("Error creating uploads directory:", err);
});

// Function to sanitize book title for valid file name
function sanitizeTitle(title) {
  return title
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "_")
    .toLowerCase();
}

// Function to handle GET request (fetch all books)
export async function GET() {
  try {
    const rows = await new Promise((resolve, reject) => {
      db.all("SELECT * FROM books", [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching books" },
      { status: 500 }
    );
  }
}

// Function to handle POST request (add a new book with image upload)
export async function POST(request) {
  try {
    const formData = await request.formData();

    // Get book details
    const title = formData.get("title");
    const genre = formData.get("genre");
    const content = formData.get("content");
    const status = formData.get("status") || "reading";
    const total_pages = formData.get("total_pages");
    const current_page = formData.get("current_page") || 0;
    const start_date =
      formData.get("start_date") || new Date().toISOString().split("T")[0];
    const finish_date = formData.get("finish_date") || null;

    // Handle file upload
    const file = formData.get("cover"); // Image file
    let book_url = null;

    if (file && file.name) {
      const sanitizedTitle = sanitizeTitle(title); // Sanitize the title to be a valid filename
      const ext = file.name.split(".").pop();
      const fileName = `${sanitizedTitle}.${ext}`;
      const filePath = join(uploadsDir, fileName);
      const fileBuffer = Buffer.from(await file.arrayBuffer());

      // Save the file
      await writeFile(filePath, fileBuffer);
      book_url = `/uploads/${fileName}`;
    }

    // Insert into database
    const query = `INSERT INTO books (title, genre,content, book_url, status, total_pages, current_page, start_date, finish_date) 
                   VALUES (?, ?,?, ?, ?, ?, ?, ?, ?)`;

    const result = await new Promise((resolve, reject) => {
      db.run(
        query,
        [
          title,
          genre,
          content,
          book_url,
          status,
          total_pages,
          current_page,
          start_date,
          finish_date,
        ],
        function (err) {
          if (err) return reject(err);
          resolve(this.lastID);
        }
      );
    });

    return NextResponse.json({ id: result, book_url });
  } catch (error) {
    return NextResponse.json({ error: "Error adding book" }, { status: 500 });
  }
}

// Function to handle PUT request (update book details including cover)
export async function PUT(request) {
  try {
    const formData = await request.formData();

    // Get book details
    const id = formData.get("id");
    const status = formData.get("status");
    const current_page = formData.get("current_page");

    // Update database
    const query = `UPDATE books SET  status = ?,  current_page = ? WHERE id = ?`;

    await new Promise((resolve, reject) => {
      db.run(query, [status, current_page, id], function (err) {
        if (err) return reject(err);
        resolve();
      });
    });

    return NextResponse.json({ message: "Book updated", book_url });
  } catch (error) {
    return NextResponse.json({ error: "Error updating book" }, { status: 500 });
  }
}

// Function to handle DELETE request (delete a book)
export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const query = "DELETE FROM books WHERE id = ?";

    await new Promise((resolve, reject) => {
      db.run(query, [id], function (err) {
        if (err) return reject(err);
        resolve();
      });
    });

    return NextResponse.json({ message: "Book deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting book" }, { status: 500 });
  }
}

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// This function opens the connection to our database file
async function initDB(){
    const db = await open({
        filename: './blog.db', // This creates a file called blog.db in your folder
        driver: sqlite3.Database
    })


// We must CREATE A TABLE. Think of a table like an Excel spreadsheet.
// We are telling SQL exactly what columns exist and what type of data they hold.

await db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        category TEXT,
        tags TEXT,
        createdAt TEXT,
        updatedAt TEXT
    )
`);

    return db;
}

export default initDB;


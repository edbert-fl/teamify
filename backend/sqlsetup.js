var express = require("express");
var axios = require("axios");
var cors = require("cors");

var app = express();
var { Pool } = require("pg");

app.use(cors());

require('dotenv').config();

var pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

const setupDatabase = async () => {
  console.log("Creating tables...")
  const client = await pool.connect();

  try {
    await client.query(`
        CREATE TABLE IF NOT EXISTS organization (
            organization_code VARCHAR(6) UNIQUE PRIMARY KEY,
            organization_name VARCHAR(50) UNIQUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

    await client.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50),
            email VARCHAR(100) UNIQUE,
            hashed_password VARCHAR(256),
            salt VARCHAR(256),
            organization_code VARCHAR(6) REFERENCES organization(organization_code),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `);

    await client.query(`
        CREATE TABLE IF NOT EXISTS roles (
            id SERIAL PRIMARY KEY,
            role VARCHAR(50) UNIQUE
        );
        `);

    await client.query(`
        CREATE TABLE IF NOT EXISTS organization_roles (
            user_id INTEGER REFERENCES users(id),
            organisation_id VARCHAR(6) REFERENCES organization(organization_code),
            role_id INTEGER REFERENCES roles(id)
            );
        `);
  } catch (error) {
    console.error("Error creating tables", error);
    console.error("Failed SQL statement:", error.query);
    console.error("Error message:", error.message);
  } finally {
    client.release();
  }
};

const dropTables = async () => {
  const client = await pool.connect();

  try {
    // Drop tables in the reverse order of their creation to avoid foreign key constraints
    await client.query("DROP TABLE IF EXISTS users CASCADE;");
    await client.query("DROP TABLE IF EXISTS organisation_roles CASCADE;");
    await client.query("DROP TABLE IF EXISTS roles CASCADE;");
    await client.query("DROP TABLE IF EXISTS organization CASCADE;");
  } catch (error) {
    console.error("Error dropping tables", error);
    console.error("Failed SQL statement:", error.query);
    console.error("Error message:", error.message);
  } finally {
    client.release();
    process.exit(0); // Terminate the script after dropping tables
  }
};

const checkTablesExist = async () => {
  const client = await pool.connect();

  try {
    const result = await client.query(`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public';
      `);

    const existingTables = result.rows.map((row) => row.table_name);
    const tables = ["organization", "users", "roles", "organization_roles"];

    tables.forEach((table) => {
      if (existingTables.includes(table)) {
        console.log(`Table exists: ${table}`);
      } else {
        console.log(`Table is missing: ${table}`);
      }
    });
  } catch (error) {
    console.error("Error checking tables existence", error);
  } finally {
    client.release();
  }
};

const showFirst5Rows = async () => {
    const client = await pool.connect();
  
    try {
      const tables = ["organization", "users", "roles", "organization_roles"];
      for (const table of tables) {
        const result = await client.query(`SELECT * FROM ${table} LIMIT 5;`);
        console.log(`First 5 rows of ${table}:`);
        console.table(result.rows);
      }
    } catch (error) {
      console.error("Error showing first 5 rows", error);
    } finally {
      client.release();
    }
  };
  
  if (process.argv.includes("-d")) {
    dropTables();
  } else if (process.argv.includes("-c")) {
    checkTablesExist();
  } else if (process.argv.includes("-s")) {
    showFirst5Rows();
  } else {
    setupDatabase();
  }
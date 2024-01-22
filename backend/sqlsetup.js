var express = require("express");
var axios = require("axios");
var cors = require("cors");

var app = express();
var { Pool } = require("pg");

app.use(cors());

var pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://qltagrwv:Va6J5vc8d9VkQKypRAEG4jTr1O4Bg77a@rosie.db.elephantsql.com/qltagrwv",
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

const setupDatabase = async () => {
  const client = await pool.connect();

  try {
    await client.query(`
        CREATE TABLE IF NOT EXISTS organization (
            organization_code VARCHAR(12) UNIQUE PRIMARY KEY,
            organization_name VARCHAR(50) UNIQUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

    await client.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE,
            email VARCHAR(100) UNIQUE,
            hashed_password VARCHAR(256),
            salt VARCHAR(16),
            organization_id INTEGER REFERENCES organization(id),
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
        CREATE TABLE IF NOT EXISTS organisation_roles (
            user_id INTEGER REFERENCES users(id),
            organisation_id INTEGER REFERENCES organization(id),
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

const checkTablesExist = async () => {
  const client = await pool.connect();

  try {
    const result = await client.query(`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public';
      `);

    const existingTables = result.rows.map((row) => row.table_name);

    if (
      existingTables.includes("organization") &&
      existingTables.includes("users") &&
      existingTables.includes("roles") &&
      existingTables.includes("organisation_roles")
    ) {
      console.log(
        "Tables exist: organization, users, roles, organisation_roles"
      );
    } else {
      console.log("Some tables are missing");
    }
  } catch (error) {
    console.error("Error checking tables existence", error);
  } finally {
    client.release();
  }
};

setupDatabase();
checkTablesExist();

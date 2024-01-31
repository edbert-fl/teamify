var express = require("express");
var axios = require("axios");
var cors = require("cors");

var app = express();
var { Pool } = require("pg");

app.use(cors());

require("dotenv").config();

var pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

const setupDatabase = async () => {
  console.log("Creating tables...");
  const client = await pool.connect();

  try {
    await client.query(`
        CREATE TABLE IF NOT EXISTS organization (
            organization_code VARCHAR(6) UNIQUE PRIMARY KEY,
            organization_name VARCHAR(50) UNIQUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
        `);

    console.log("organization table created successfully");

    await client.query(`
        CREATE TABLE IF NOT EXISTS roles (
            id SERIAL PRIMARY KEY,
            role VARCHAR(50),
            role_level INTEGER
          );
      `);

    console.log("roles table created successfully");

    // Include role_id here and remove organization_roles table
    await client.query(`
        CREATE TABLE IF NOT EXISTS users (
            user_id SERIAL PRIMARY KEY,
            username VARCHAR(50),
            email VARCHAR(100) UNIQUE,
            hashed_password VARCHAR(256),
            salt VARCHAR(256),
            organization_code VARCHAR(6) REFERENCES organization(organization_code),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            role_id INTEGER REFERENCES roles(id)
          );
        `);

    console.log("users table created successfully");

    const insertStatements = [
      "INSERT INTO roles (role, role_level) VALUES ('Admin', 1);",
      "INSERT INTO roles (role, role_level) VALUES ('Manager', 2);",
      "INSERT INTO roles (role, role_level) VALUES ('User', 3);",
    ];

    for (const statement of insertStatements) {
      await client.query(statement);
    }

    console.log("Default roles inserted successfully");

    await client.query(`
      CREATE TABLE IF NOT EXISTS shifts (
          shift_id SERIAL PRIMARY KEY,
          start_time INTEGER,
          end_time INTEGER,
          day INTEGER,
          active BOOLEAN
        );
    `);

    console.log("shifts table created successfully");

    await client.query(`
      CREATE TABLE IF NOT EXISTS user_shift (
          user_id INTEGER REFERENCES users(user_id),
          shift_id INTEGER REFERENCES shifts(shift_id)
        );
    `);

    console.log("user_shift table created successfully");
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
    console.log('users table dropped successfully');

    await client.query("DROP TABLE IF EXISTS organization_roles CASCADE;");
    console.log('organization_roles table dropped successfully');

    await client.query("DROP TABLE IF EXISTS roles CASCADE;");
    console.log('roles table dropped successfully');

    await client.query("DROP TABLE IF EXISTS organization CASCADE;");
    console.log('organization table dropped successfully');

    await client.query("DROP TABLE IF EXISTS shifts CASCADE;");
    console.log('shifts table dropped successfully');

    await client.query("DROP TABLE IF EXISTS user_shifts CASCADE;");
    console.log('user_shifts table dropped successfully');
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

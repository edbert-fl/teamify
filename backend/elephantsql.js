var express = require("express");
var bcrypt = require("bcryptjs");
var axios = require("axios");
var cors = require("cors");
var http = require("http");
var fs = require("fs");

var app = express();
var { Pool } = require("pg");

app.use(cors());
app.use(express.json());

var pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://qltagrwv:Va6J5vc8d9VkQKypRAEG4jTr1O4Bg77a@rosie.db.elephantsql.com/qltagrwv",
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

let client = null;
app.get("/api", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

/* 
For testing if the API is running.
*/
app.get("/api/time", async function (req, res) {
  try {
    client = await pool.connect();
    const result = await client.query('SELECT NOW() AS "theTime"');
    res.json({ currentTime: result.rows[0].theTime });
  } catch (error) {
    console.error("Error running query", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  } finally {
    if (client) {
      client.release();
    }
  }
});

/* 
Add a new organization to the database
*/
app.post("/organization/add", async function (req, res) {
  const { code, name } = req.body; // Extract organization name and code from the request body

  try {
    client = await pool.connect();

    const result = await client.query(
      "INSERT INTO organization (organization_code, organization_name) VALUES ($1, $2) RETURNING *",
      [code, name]
    );

    res.json({
      organization: result.rows[0],
      message: "Organization added successfully!",
    });
  } catch (error) {
    console.error("Error adding organization", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  } finally {
    if (client) {
      client.release();
    }
  }
});

/* 
Log into existing organization
*/
app.post("/organization/login", async function (req, res) {
  const { organizationCode } = req.body;

  try {
    client = await pool.connect();

    const result = await client.query(
      "SELECT * FROM organization WHERE code = $1",
      [organizationCode]
    );

    res.json({
      organization: result.rows[0],
      message: "Logged into organization successfully!",
    });
  } catch (error) {
    console.error("Error logging into organization", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  } finally {
    if (client) {
      client.release();
    }
  }
});

/* 
Register a new user
*/
app.post("/user/register", async function (req, res) {
  const { displayName, email, password, currOrganization } = req.body;

  try {
    client = await pool.connect();

    const generatedSalt = await bcrypt.genSalt(16);
    const hashedPassword = await bcrypt.hash(password, generatedSalt);

    console.log("displayName:", displayName);
    console.log("email:", email);
    console.log("password:", password);
    console.log("currOrganization:", currOrganization);

    const result = await client.query(
      "INSERT INTO users (username, email, hashed_password, salt, organization_code) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [displayName, email, hashedPassword, generatedSalt, currOrganization.code]
    );

    console.log("Resulting Data:", result.data);

    res.json({
      organization: result.rows[0],
      message: "Organization added successfully!",
    });
  } catch (error) {
    console.error("Error adding organization", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  } finally {
    if (client) {
      client.release();
    }
  }
});

const PORT = 3000;

http.createServer(app).listen(PORT, function () {
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});

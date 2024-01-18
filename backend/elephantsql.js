var express = require("express");
var axios = require("axios");
var cors = require("cors");
var http = require("http");
var fs = require("fs");

var app = express();
var { Pool } = require("pg");

app.use(cors());

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

const PORT = 3000;

http.createServer(app).listen(PORT, function () {
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});

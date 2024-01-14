const express = require("express");
const axios = require("axios");
const cors = require('cors');
const app = express();
const pg = require("pg");

const conString =
  "postgres://qltagrwv:Va6J5vc8d9VkQKypRAEG4jTr1O4Bg77a@rosie.db.elephantsql.com/qltagrwv";
const client = new pg.Client(conString);

app.use(cors());

app.get("/api/time", function (req, res) {
  client.connect(function (err) {
    if (err) {
      return res
        .status(500)
        .json({ error: "could not connect to postgres", details: err });
    }
    client.query('SELECT NOW() AS "theTime"', function (err, result) {
      if (err) {
        client.end();
        return res
          .status(500)
          .json({ error: "error running query", details: err });
      }
      res.json({ currentTime: result.rows[0].theTime });
      client.end();
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Server is running on port 3000");
});

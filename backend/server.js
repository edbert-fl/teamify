const { analyzeImage } = require("./vision");

const express = require("express");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const http = require("http");
const sharp = require("sharp");

const app = express();
const { Pool } = require("pg");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const ROLES = {
  ADMIN: 1,
  MANAGER: 2,
  USER: 3,
};

app.use(cors());
app.use(express.json());

require("dotenv").config();

var pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

let client = null;
app.get("/api", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

/* 
Add a new organization to the database
*/
app.post("/organization/add", async function (req, res) {
  const { code, name } = req.body;

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
    const client = await pool.connect();

    const result = await client.query(
      "SELECT * FROM organization WHERE organization_code = $1 LIMIT 1",
      [organizationCode]
    );

    if (result.rows.length > 0) {
      // Return the first (and only) row as JSON response
      console.log(result.rows[0]);

      res.json({
        organization: result.rows[0],
      });
    } else {
      res.status(404).json({
        error: "Organization Not Found",
        message: "No organization found with the specified code.",
      });
    }
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

    // Generates a salt, adds it to the password and hashes the password for storage
    const generatedSalt = await bcrypt.genSalt(16);
    const hashedPassword = await bcrypt.hash(password, generatedSalt);

    const result = await client.query(
      "INSERT INTO users (username, email, hashed_password, salt, organization_code, role_id) VALUES ($1, $2, $3, $4, $5, 3) RETURNING *",
      [displayName, email, hashedPassword, generatedSalt, currOrganization.code]
    );

    console.log("Resulting Data:", result.rows[0]);

    res.json({
      user: result.rows[0],
      message: "User added successfully!",
    });
  } catch (error) {
    console.error("Error adding user", error);
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
app.post("/user/register/admin", async function (req, res) {
  const { displayName, email, password, currOrganization } = req.body;

  try {
    client = await pool.connect();

    // Generates a salt, adds it to the password and hashes the password for storage
    const generatedSalt = await bcrypt.genSalt(16);
    const hashedPassword = await bcrypt.hash(password, generatedSalt);

    const createUserResult = await client.query(
      "INSERT INTO users (username, email, hashed_password, salt, organization_code, role_id) VALUES ($1, $2, $3, $4, $5, 1) RETURNING *",
      [displayName, email, hashedPassword, generatedSalt, currOrganization.code]
    );

    console.log(createuserResultData);

    res.json({
      user: createuserResultData,
      message: "User added successfully!",
    });
  } catch (error) {
    console.error("Error adding user", error);
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
Log into a user account
*/
app.post("/user/login", async function (req, res) {
  const { email, password } = req.body;

  try {
    const client = await pool.connect();

    // Retrieve hashed password and salt from the database for the specified email
    const userResult = await client.query(
      "SELECT organization_code, hashed_password, salt FROM users WHERE email = $1",
      [email]
    );

    const userResultData = userResult.rows[0];

    if (userResult.rows.length === 1) {
      const storedHashedPassword = userResultData.hashed_password;
      const salt = userResultData.salt;

      // Use the retrieved salt to hash the user's typed password
      const hashedInputPassword = await bcrypt.hash(password, salt);

      console.log(userResultData)

      // Compare the typed password and the stored hash password from the database
      if (hashedInputPassword === storedHashedPassword) {
        const organizationResult = await client.query(
          "SELECT * FROM organization WHERE organization_code = $1",
          [userResultData.organization_code]
        );

        console.log(organizationResult.rows[0]);

        res.json({
          user: userResultData,
          organization: organizationResult.rows[0],
          message: "Authentication successful!",
        });
      } else {
        res.status(401).json({ error: "Authentication failed" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error during login", error);
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
  const { code, name } = req.body;

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
  Endpoint to verify if an image contains a person.
  Expects a POST request with a single 'image' file.
*/
app.post("/verify/person", upload.single("image"), async (req, res) => {
  // Extract the file from the request
  const file = req.file;

  try {
    if (file) {
      // Convert the file to a uint8Array for analysis
      const imageBuffer = await sharp(file.buffer).toBuffer();
      const uint8Array = new Uint8Array(imageBuffer);

      // Analyze the image to check if a person is present
      const isPersonPresent = await analyzeImage(uint8Array);

      console.log("personPresent:", isPersonPresent);

      // Respond with the analysis result
      res.json({
        isPersonPresent: isPersonPresent,
      });
    } else {
      console.log("Error: No file found");
    }
  } catch (error) {
    // Handle errors during image verification
    console.error("Error verifying person", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

/* 
Add a new shift
*/
app.post("/shift/add", async function (req, res) {
  const { newShift, currOrganization, currUser } = req.body;

  console.log(currOrganization);
  console.log(currUser);

  // Data validation
  if (newShift.selectedDate === null && repeating === false) {
    const errorMessage = "Selected date is null when shift is not repeating!";
    console.error("Error creating shift", errorMessage);
    res.status(500).json({
      error: "Internal Server Error",
      details: errorMessage,
    });
  } else if (newShift.selectedDays === null && repeating === true) {
    const errorMessage = "Selected days is null when shift is repeating!";
    console.error("Error creating shift", errorMessage);
    res.status(500).json({
      error: "Internal Server Error",
      details: errorMessage,
    });
  } else if (
    newShift.selectedUsers === null ||
    newShift.selectedUsers.length === 0
  ) {
    const errorMessage = "Shift is not assigned to anyone!";
    console.error("Error creating shift", errorMessage);
    res.status(500).json({
      error: "Internal Server Error",
      details: errorMessage,
    });
  }

  console.log(newShift);

  try {
    client = await pool.connect();
    // Creating the shift instance
    const startTimeString = new Date(newShift.startTime)
      .toISOString()
      .split("T")[1]
      .substring(0, 8);
    const endTimeString = new Date(newShift.endTime)
      .toISOString()
      .split("T")[1]
      .substring(0, 8);

    let dateString = null;
    if (!newShift.repeating) {
      dateString = new Date(newShift.selectedDate).toISOString().split("T")[0];
    }

    const shiftInputResult = await client.query(
      "INSERT INTO shifts (organization_code, creator_id, start_time, end_time, repeating_shift, shift_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        currOrganization.organizationCode,
        currUser.id,
        startTimeString,
        endTimeString,
        newShift.repeating,
        dateString,
      ]
    );

    const shiftInputResultData = shiftInputResult.rows[0];
    console.log("Shift Input Data:", shiftInputResultData);

    // Add the days that are repeating whenever there is a repeating shift
    console.log(newShift.selectedDays);
    if (newShift.repeating) {
      const daysOfWeek = Object.keys(newShift.selectedDays);

      for (day of daysOfWeek) {
        if (newShift.selectedDays[day] === true) {
          const shiftDaysInput = await client.query(
            "INSERT INTO shift_days (shift_id, day_of_week) VALUES ($1, $2) RETURNING *",
            [shiftInputResultData.shift_id, day]
          );

          const shiftDaysInputData = shiftDaysInput.rows[0];
          console.log("Shift Days Input Data:", shiftDaysInputData);
        }
      }
    }

    // Assign the shift to the assignees
    for (user of newShift.selectedUsers) {
      const assignShiftInput = await client.query(
        "INSERT INTO assigned_shifts (user_id, shift_id) VALUES ($1, $2) RETURNING *",
        [user.id, shiftInputResultData.shift_id]
      );

      const assignShiftInputData = assignShiftInput.rows[0];
      console.log("Assign Shift Input Data:", assignShiftInputData);
    }

    res.json({
      shift: shiftInputResultData,
      message: "Shift added successfully!",
    });
  } catch (error) {
    console.error("Error adding shift", error);
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

// Create an HTTP server using Express app
http.createServer(app).listen(PORT, function () {
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});

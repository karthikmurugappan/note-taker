const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Setup express.js server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

// Define routes
const sendIndexHtml = (res) => res.sendFile(path.join(__dirname, "/public/index.html"));


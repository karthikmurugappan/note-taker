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

app.get("/index", sendIndexHtml);
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "/public/notes.html")));
app.get("/", sendIndexHtml);

// API ROUTES

//GET Route
app.get("/api/notes", (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (error, file) => {
        if (error) throw error;
        const parsedFile = JSON.parse(file);
        return res.send(parsedFile);
    });
});


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

// POST Route
app.post("/api/notes", (req, res) => {
    const { title, text } = req.body;
    const note = {
        id: uuidv4(),
        title,
        text
    };

    fs.readFile('./db/db.json', 'utf8', (error, file) => {
        if (error) throw error;

        const parsedFile = JSON.parse(file);
        parsedFile.push(note);

        const newStringifiedFile = JSON.stringify(parsedFile);
    
        fs.writeFile('./db/db.json', newStringifiedFile, 'utf8', (err) => {
            if (err) throw err;
            console.log("The new note was appended to the file!");
        });

        return res.send(parsedFile);
    });    
});

// If no matching route is found, default to index
app.get("*", sendIndexHtml);
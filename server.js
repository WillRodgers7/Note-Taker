// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var db = require("./db/db.json");
var shortid = require("shortid");
const fs = require("fs");
const { json } = require("body-parser");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
	res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Displays all Notes
app.get("/api/notes", function (req, res) {
	return res.json(db);
});



// Create New Notes - takes in JSON input
app.post("/api/notes", function (req, res) {
	// req.body hosts is equal to the JSON post sent from the user
	// This works because of our body parsing middleware
	var newNote  = {
    id: shortid.generate (),
    title: req.body.title,
    text: req.body.text,
  };


	console.log(newNote);

	db.push(newNote);

  fs.writeFileSync (path.join (__dirname, "./db/db.json"), JSON.stringify  (db) )

	res.json(db);
});


// Delete Saved Notes
app.delete ("/api/notes/:id", function (req, res){

var filteredNotes = db.filter ( (note) => 
  note.id != req.params.id
  
);
console.log(filteredNotes)
fs.writeFileSync (path.join (__dirname, "./db/db.json"), JSON.stringify  (filteredNotes) )
return res.json(db);

});





// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
	console.log("App listening on PORT " + PORT);
});

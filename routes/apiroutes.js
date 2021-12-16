const fs = require('fs');

const notesArray = [];

module.exports = function (app) {
  // GET request for notes
  app.get("/api/notes", (req, res) => {
    const notes = fs.readFileSync('./db/db.json', "utf8");
    // Send a message to the client
    res.json(JSON.parse(notes));
    // Log our request to the terminal
    console.info(`${req.method} request received to get notes`);
  });
};
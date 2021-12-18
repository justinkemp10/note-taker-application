const fs = require("fs");

const notesArray = [];

function writeToFile(destination, content) {
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
}
function readAndAppend(content, file) {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
}

module.exports = function (app) {
  // GET request for notes
  app.get("/api/notes", (req, res) => {
    const notes = fs.readFileSync("./db/db.json", "utf8");
    // Send a message to the client
    res.json(JSON.parse(notes));
    // Log our request to the terminal
    console.info(`${req.method} request received to get notes`);
  });
  // POST Route for a new UX/UI tip
  app.post("/api/notes", (req, res) => {
    console.info(`${req.method} request received to add a note`);

    const { title, text } = req.body;

    if (req.body) {
      const newNote = {
        title,
        text,
      };

      readAndAppend(newNote, "./db/db.json");
      res.json(`Note added successfully 🚀`);
    } else {
      res.error("Error in adding note");
    }
  });
};

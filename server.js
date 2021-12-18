const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
require("./routes/apiroutes")(app);
require("./routes/htmlroutes")(app);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

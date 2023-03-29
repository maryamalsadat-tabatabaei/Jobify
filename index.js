const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("welconme");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT);

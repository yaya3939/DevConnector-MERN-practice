const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("API running.");
});

const PORT = process.env.PORT || 5000; // former means find enviroment variable called PORT, to use in heroku deployment

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

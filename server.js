const express = require("express");
const connectDB = require("./config/db");
const app = express();

//connect db
connectDB();

//init middleware
app.use(express.json({ extended: false })); // same as body parser

app.get("/", (req, res) => {
  res.send("API running.");
});

//define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

const PORT = process.env.PORT || 5000; // former means find enviroment variable called PORT, to use in heroku deployment

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

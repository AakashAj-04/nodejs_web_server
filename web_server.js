const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;
const { logger } = require("./middleware/logEvents");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
app.use(logger);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false })); //Middleware
app.use(express.json()); //Middleware
app.use("/", express.static(path.join(__dirname, "./public"))); //Middleware
app.use("/subdir", express.static(path.join(__dirname, "./public"))); //Middleware

app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
app.use("/employees", require("./routes/api/employees"));

app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("Hello"), next();
  },
  (req, res) => {
    res.send("Vannakam");
  }
);

app.all("/*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

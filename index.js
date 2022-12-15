const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const flash = require("req-flash");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route
const adminRoute = require("./routes/admin");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

// Setting folder views
app.set("views", path.join(__dirname, "./views"));

// File CSS dan JS
app.use(express.static(path.join(__dirname, "static")));
app.use(express.static(path.join(__dirname, "node_modules")));

// Configurasi library session
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "g4duhh@rt4w@n",
    name: "secretName",
    cookie: {
      sameSite: true,
    },
  })
);

app.use(flash());
app.set("view engine", "ejs");

app.use(adminRoute);
app.use(authRoute);
app.use(userRoute);

const PORT = 5050;

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});

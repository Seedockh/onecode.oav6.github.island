const express = require("express");
const app = express();
const sqlite = require("sqlite3");
const db = new sqlite.Database("database");
const session = require('express-session');

const users = require('./models/users.js');

app.use(express.static(__dirname + '/public'));
app.use(session({
  secret : 'efrei is lit',
  is_logged : false,
  username : "visitor",
  msg : '',
  cookie : {
    maxAge : 300000,
  }
}));
app.set('view engine', 'ejs');

require("./routes/users.js")(app);

app.listen(1337, () => {
  console.log("Listening on port 1337");
});

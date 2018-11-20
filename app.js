const express = require("express");
const app = express();
const sqlite = require("sqlite3");
const db = new sqlite.Database("database");
const users = require('./models/users.js');

const sample = {
  nickname: 'John',
  email: 'john@john.john',
  password: 'john',
  fullname: 'John John'
};

require("./routes/users.js")(app);

users.create(sample);
users.getAll();

app.listen(1337, () => {
  console.log("Listening on port 1337");
});

const userModel = require("../models/users.js");

function signup(router) {

  router.get("/",(req,res)=>{
    userModel.welcome(req,res);
  });
/*
  router.get("/users", async function(req, res) {
    userModel.getAll(res);
  });

  router.get("/users/:id", function(req, res) {
    const idSelected = req.params.id;

    userModel.getUser(idSelected, res);
  });

  router.delete("/users/:id", function(req, res) {
    const idSelected = req.params.id;
    userModel.delete(idSelected, res);
  });

  router.post("/users", function(req, res) {
    const data = {
      nickname: req.body.nickname,
      email: req.body.email,
      password: req.body.password
    };
    userModel.create(data, res);
  });

  router.put("/users", function(req, res) {
    const data = {
      id: req.body.id,
      nickname: req.body.nickname,
      email: req.body.email,
      password: req.body.password
    };

    userModel.update(data, res);
  });

  router.post("/users/login", (req, res) => {
    const data = {
      username: req.body.nickname,
      password: req.body.password,
    };

    userModel.login(data,req,res);
  });

  router.post("/users/register", (req, res) => {
    const data = {
      username: req.body.nickname,
      password: req.body.password,
    };

    userModel.register(data,req,res);
  });*/

  router.get("/signin", (req, res) => {
    userModel.signinPage(req, res)
  })

  router.get("/signup", (req, res) => {
    userModel.signupPage(req, res)
  })
}

module.exports = signup;

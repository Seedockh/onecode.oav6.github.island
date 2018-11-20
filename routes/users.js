const userModel = require("../models/users.js");
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

function signup(router) {

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/*** WELCOME PAGE ***/
  router.get("/",(req,res)=>{
    userModel.welcome(req,res);
  });

/*** LOGGING IN ***/
  router.get("/signin", (req, res) => {
    userModel.signinPage(req, res)
  })

  router.post("/search",(req,res)=>{
    const data = {
      nickname: req.body.nickname,
      password: req.body.password
    }
    userModel.getHubInfo(data,req,res);
  })

  router.get('/dashboard',(req,res)=>{
    let userinfos = JSON.stringify(req.session.userinfos,null,2);
    let msg = req.session.msg;
    //console.log(userinfos);
    //console.log(msg);
    res.render('dashboard.ejs',{ infos: userinfos, message : msg})
  })



/*** REGISTERING ***/
  router.get("/signup", (req, res) => {
    userModel.signupPage(req, res)
  })

  router.post("/users/create",(req,res)=>{
    const data = {
      fullname: req.body.fullname,
      nickname: req.body.nickname,
      email: req.body.email,
      password: req.body.password
    };

    userModel.setUser(data,req,res);
  })

  router.get('/newaccount',(req,res)=>{
    let msg = req.session.msg;
    res.render('signin.ejs',{ message : msg})
  });

  router.get("/users", async function(req, res) {
    userModel.getAll(res);
  });


  /*** LOGOUT ***/
  router.get('/signout',(req,res) => {
    userModel.signOut(req,res);
  })

/*
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


}

module.exports = signup;

const ejs = require('ejs');
const sqlite = require("sqlite3");
const db = new sqlite.Database("database");
const request = require('request');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('database','','',{
  host:'localhost',dialect:'sqlite',operatorAliases:false,pool:{
    max:5, min:0, acquire:30000, idle: 10000}, storage: 'database'});

const Users = sequelize.define('users',{
      nickname : { type: Sequelize.STRING },
      email : { type: Sequelize.STRING },
      password : { type: Sequelize.STRING },
      fullname : { type: Sequelize.STRING }
    });


class userModel{

/*** WELCOME PAGE ***/
  static welcome(req,res) {
    res.render('../views/index.ejs');
  }

/*** LOGGING IN ***/
  static signinPage(req,res) {
    res.render('../views/signin.ejs')
  }

  static getHubInfo(user,req,res) {
    let userinfos = '';
    const options = {
      uri: `https://api.github.com/users/${user.nickname}`,
      qs: { access_token: '60e85279f49d4813df03dc70a23e93d51e9145b6' },
      headers: {'User-Agent': 'Request-Promise'},
      json: true
    };
    request(options, (error,response,body)=> {
      req.session.userinfos = body;
      let userSession = req.session;

      Users.sync({force: false}).then(()=>{
        Users.findOne({
          where: {
            nickname: user.nickname,
            password: user.password
          }
        }).then(authUser => {
          req.session.msg = ''
          if(userSession.username){
            userSession.msg = ("You're already logged");
            res.redirect('/');
          } else {
            if (authUser) {
              req.session.username = user.nickname;
              //req.session.userinfos = userinfos;
              req.session.msg = `Welcome, ${userSession.username} :)`;

              res.redirect('/dashboard');
            } else {
              req.session.msg = ('Wrong nickname/password. Try it again !');
              res.redirect('/signin');
            }
          }
        });
      });
    });
  };


/*** REGISTERING ***/
  static signupPage(req,res) {
    res.render('../views/signup.ejs')
  }

  static setUser(user,req,res) {
    Users.sync({force: true}).then(()=>{
      Users.create(user);
    });
    req.session.msg = 'Account created.';
    res.redirect('/newaccount');
  }


/*** READING ***/
  static getAll(res) {
    Users.findAll().then(users => {
      res.send(users)
    });
  }


/*** LOGOUT ***/
  static signOut(req,res) {
    req.session.destroy();
    res.redirect('/');
  }


}

module.exports = userModel;

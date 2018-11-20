const sqlite = require("sqlite3");
const db = new sqlite.Database("database");
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
  static welcome(req,res) {
    res.render('../view/index.ejs');
  }

  static create(user,res) {
    Users.sync({force: true}).then(()=>{
      console.log( Users.create(user) );
    });
  }

  static getAll(response) {
    Users.findAll().then(users => { console.log(users) } );
  }

  static signinPage(req,res) {
    res.render('../view/signin.ejs')
  }

  static signupPage(req,res) {
    res.render('../view/signup.ejs')
  }

}

module.exports = userModel;

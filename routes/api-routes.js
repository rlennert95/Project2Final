var db = require("../models");
var passport = require("../config/passport");
var connection = require("../config/connection.js");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/members");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function () {
      res.redirect(307, "/api/login");
    }).catch(function (err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });



  app.get("/api/users", function (req, res) {
    db.User.findAll({})
        .then(function (dbUser) {
            res.json(dbUser);
        })
  });

 



  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    //NEED TO MAKE A CONNECTON QUERRY TO POST MYSQL DATA TO API ROUTE, ONLY POST THAT USER THAT IS SIGNED IN BELOW

    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        correct: req.user.correct,
        incorrect: req.user.incorrect,
        id: req.user.id
      });
    }

  });

  //Route for getting questions from the database
  app.get("/api/questions", function (req, res) {
    db.Questions.findAll({})
        .then(function (dbQuestion) {
            res.json(dbQuestion);
        })
  });

  // PUT route for updating user scores
  app.put("/api/user_data", function(req, res) {
    console.log(req.body);
    db.User.update(req.body, 
      { 
        where: {
          id: req.user.id
        }
      })
  });
};

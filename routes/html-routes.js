// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/game.html"));
  });

  app.get("/signup", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  app.get("/leaderboard", function(req, res) {
    // If the user already has an account send them to the members page
    res.sendFile(path.join(__dirname, "../public/leaderboard.html"));
  });

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/game.html"))
  });

  app.get("/quiz1", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/quiz.html"))
  });

  app.get("/quiz2", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/quiz2.html"))
  });

  app.get("/quiz3", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/quiz3.html"))
  });

  app.get("/quiz4", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/quiz4.html"))
  });

  app.get("/quiz5", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/quiz5.html"))
  });

  app.get("/quiz6", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/quiz6.html"))
  });

  app.get("/score", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/score.html"))
  });



};

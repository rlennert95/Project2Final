$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/users").then(function (data) {

    for (var i = 0; i < data.length; i++) {
      var rank  = ("under construction");
    }
    
    for (var x = 0; x < data.length; x++) {
      var score = "PLACEHOLDER";
      
      var rowHTML = 
      "<tr>" +
      "<td scope='row'>" + rank + "</th>" +
      "<td>" + data[x].email +"</td>" +
      "<td>" + score + "</td>" +
      "</tr>";

      console.log(data[x].email);
      $(".table").append(rowHTML);
    }
  });
});


$(document).ready(function () {

  $.get("/api/users").then(function (data) {

    for (var i = 0; i < data.length; i++) {
      var rank = ("under construction");
    }

    for (var x = 0; x < data.length; x++) {


      var rowHTML =
        "<tr>" +
        "<td scope='row'>" + rank + "</th>" +
        "<td>" + data[x].email + "</td>" +
        "<td>" + data[x].correct + "</td>" +
        "<td>" + data[x].incorrect + "</td>" +
        "</tr>";

      console.log(data[x].email);
      $(".table").append(rowHTML);
    }
  });
});


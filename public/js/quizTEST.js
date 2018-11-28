$(function () {

   
    $("#submit").on("click", function () {
        $.get("/api/user_data", function (data) {
            console.log(data.email);
            console.log(data.correct);
            console.log(data.incorrect);
            function postScore() {
                $.ajax({
                    method: "PUT",
                    url: "/api/user_data",
                    data:{
                        correct:correct,
                        incorrect:incorrect
                    }
                })
            }
            postScore();
        });


    });



});
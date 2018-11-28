$(function () {

    var correct = 0;
    var incorrect = 0;

    $("#correct").on("click", function () {
        correct += 1;
        console.log("Correct:" + correct);
    });
    $("#incorrect").on("click", function () {
        incorrect += 1;
        console.log("Incorrect:" + incorrect);
    });



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
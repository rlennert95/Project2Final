$(function () {
    $("#qGen").on("click", function (event) {
        event.preventDefault();
        console.log("working");
        // $("#well-section#").empty()
        $("#submit-section").append("<button type='button' class='btn btn-secondary btn-lg' id='submit-button'>Submit Answers");
        $.get("/api/questions", function (data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                var wellSection = $("<div>");
                wellSection.addClass("well");
                wellSection.attr("id", "question-well-" + i);
                $("#well-section").append(wellSection);
                $("#question-well-" + i).append("<h2>" + data[i].question_text + "</h2>");
                wellSection.attr("data-correct", data[i].answer_key.toString());
                $("#question-well-" + i).append("<input type='radio' id='true' value='true' name='question-" + i + "'>True" + 
                "<input type='radio' id='false' value='false' name='question-" + i + "'>False");
            }
        });
    });

    var correct = 0;
    var incorrect = 0;

    $("#submit-section").on("click", "#submit-button", function (event) {
        $(".well").each(function(answer) {
            var checked = $(this).find("input[type='radio']:checked").val();
            var correctAnswer = $(this).attr("data-correct");
            if (checked === correctAnswer) {
                console.log("Correct!");
                correct += 1;
                console.log(correct);
            } else if (checked !== correctAnswer) {
                console.log("Incorrect!");
                incorrect += 1;
                console.log(incorrect);
            }
        });
        $.get("/api/users", function(data) {
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].user_id);
            console.log(data[i].username);
            console.log(data[i].hatch);
            console.log(data[i].correct);
            console.log(data[i].incorrect);
        }
    });
        // trackRightAnswers();
        // trackWrongAnswers();
    });

    function trackRightAnswers(data) {
        console.log("first function called");
        $.ajax({
            method: "PUT",
            url: "/api/user_data",
            data: correct
        });
    }

    function trackWrongAnswers(data) {
        console.log("second function called");
        $.ajax({
            method: "PUT",
            url: "/api/incorrect",
            data: incorrect
        });
    }
});
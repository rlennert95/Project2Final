$(function () {

    $('#start').on('click', function () {
        $('#start').remove();
        game.loadQuestion();
    })
    
    $('#submit').on('click', function () {
        game.postScore();
        console.log("Correct score:" + game.correct);
    })
    
    $(document).on('click', '.answer-button', function (e) {
        game.clicked(e);
    })
    
    $(document).on('click', '#reset', function () {
        game.reset();
    })
    
    var questions = [{
        question: "When Did the Dinosaurs Die Out?",
        answers: ["65 Million Years Ago", "Yesterday", "43 Million Years Ago", "Still Alive"],
        correctAnswer: "65 Million Years Ago",
        image: "assets/images/hedwig.jpg"
    }, {
        question: "You Can Breath Underwater:",
        answers: ["True", "False",],
        correctAnswer: "False",
        image: "assets/images/ronald.jpg"
    
    }, {
        question: "Shaq is the Tallest Man Alive",
        answers: ["True", "False",],
        correctAnswer: "False",
        image: "assets/images/voldemort.jpg"
    }, {
        question: "The Human Body Can Survive in Space",
        answers: ["True", "False",],
        correctAnswer: "False",
        image: "assets/images.riddle.jpg"
    }];
    
    var game = {
        questions: questions,
        currentQuestion: 0,
        counter: 30,
        correct: 0,
        incorrect: 0,
        unanswered: 0,
    
        
        postScore: function() {
            $.ajax({
                method: "PUT",
                url: "/api/user_data",
                data:{
                    correct:game.correct,
                    incorrect:game.incorrect
                }
            })
        },
    
        countdown: function () {
            game.counter--;
            $('#counter').html(game.counter);
            if (game.counter <= 0) {
                console.log("Times Up!");
                game.timeUp();
            }
    
        },
        loadQuestion: function () {
            timer = setInterval(game.countdown, 1000);
            $('#subwrapper').html("<h2> TIME REMAINING: <span id='counter'>30</span> Seconds</h2>");
            $('#subwrapper').append('<h2>' + questions[game.currentQuestion].question + '</h2>');
            for (var i = 0; i < questions[game.currentQuestion].answers.length; i++) {
                $('#subwrapper').append('<button class="answer-button" id="button- ' +i+ '" data-name="' + questions[game.currentQuestion].answers[i]+ '">' + questions[game.currentQuestion].answers[i] + '</button>');
                
    
            }
    
    
        },
        nextQuestion: function () {
            game.counter = 30;
            $('#counter').html(game.counter);
            game.currentQuestion++;
            game.loadQuestion();
        },
        timeUp: function () {
            clearInterval(timer);
            game.unanswered++;
            $('#subwrapper').html('<h2> SORRY OUT OF TIME! </H2>');
            $('#subwrapper').append('<h3> The Correct Answer Was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
            if (game.currentQuestion == questions.length - 1) {
                setTimeout(game.results, 3 * 1000);
    
            }
            else {
                setTimeout(game.nextQuestion, 3 * 1000);
    
            }
    
        },
        results: function () {
            clearInterval(timer);
            $('#subwrapper').html('<h2>YOU ARE FINISHED!</h2>');
            $('#subwrapper').append('<h3>Correct: ' + game.correct + "</h3>");
            $('#subwrapper').append('<h3>Incorrect: ' + game.incorrect + "</h3>");
            $('#subwrapper').append('<h3>Unanswered: ' + game.unanswered + "</h3>");
            $('#subwrapper').append("<button id='reset'>RESET</button");
    
    
        },
        clicked: function (e) {
            clearInterval(timer);
            if ($(e.target).data("name") == questions[game.currentQuestion].correctAnswer) {
                game.answeredCorrectly();
            } else {
                game.answeredIncorrectly();
            }
    
    
        },
        answeredCorrectly: function () {
            console.log("Right");
            clearInterval(timer);
            game.correct++;
            $('#subwrapper').html('<h2> YOU ARE CORRECT! </h2>');
            if (game.currentQuestion == questions.length - 1) {
                setTimeout(game.results, 3 * 1000);
    
            }
            else {
                setTimeout(game.nextQuestion, 3 * 1000);
    
            }
    
        },
        answeredIncorrectly: function () {
            console.log("wrong");
            clearInterval(timer);
            game.incorrect++;
            $('#subwrapper').html('<h2> YOU ARE INCORRECT! </h2>');
            $('#subwrapper').append('<h3> The Correct Answer Was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
            if (game.currentQuestion == questions.length - 1) {
                setTimeout(game.results, 3 * 1000);
    
            }
            else {
                setTimeout(game.nextQuestion, 3 * 1000);
    
            }
    
        },
        reset: function () {
            game.currentQuestion = 0;
            game.counter = 30;
            game.correct = 0;
            game.incorrect = 0;
            game.unanswered = 0;
            game.loadQuestion();
    
        },
    
    
    }
    
    
    });
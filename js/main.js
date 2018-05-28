var totalTime=120; //----------------------------------------------------------------------<globals>
var totalQuestions;
var remainingQuestions;
var countdownTime = totalTime
var correctAnswers = 0;
var incorrectAnswers = 0;
var nonAnswers = 0;
var randomQuestion = [];
var countdownTime=totalTime;
var barWidth= 0;
var running = false; // whether or not timer is running
var qCount;
var index;
var newArray = [];
var holder = [];

resetGame(false); // --------------------------------------------------------------------<init game>


$("#play").on("click", function () { // --------------------------------------<play button listener>
    resetGame(false);
    startGame();
})

$("#playAgain").on("click", function () { // ---------------------------<play again button listener>
    resetGame(true);
    startGame();
})  

function startGame() { // --------------------------------------------------------------<start game>
    for(var i = 0; i < questions.length; i++) {
        holder.push(questions[i]);
    }
    timerStart();
    displayQuestion();
}

function timerStart(){ // -------------------------------------------------------------<timer start>
    if (!running) {
    intervalId = setInterval(timerDec, 1000); 
    running = true;
    }
}

function timerDec() { // ----------------------------------------------------------------<timer dec>
    $('.status').html(`<p id="yellow">Seconds Remaining: ${countdownTime}</p>`);
    countdownTime --;
	barWidth = countdownTime * 100 / totalTime; // countdown bar
	var timerDiv = document.getElementById("timer-bar-active"); 
	timerDiv.style.width = barWidth + '%';    
    if (countdownTime === 0) {
        nonAnswers++;
        timerStop();
        $("#answerblock").empty();
        $(".status").html(`<p id="red">Time's up!</p>`);
        $('.col.m-2.pb-2.rounded.sub-article.text-left').append(`<p>The correct answer is:</p><h2>${randomQuestion.answers[randomQuestion.correct]}</h2><p id="hint">${randomQuestion.hint}<p>`);
        nextQuestion();
    }	
}

function timerStop() { // --------------------------------------------------------------<timer stop>
    running = false;
    clearInterval(intervalId);
}

function displayQuestion() { // --------------------------------------------------<display question>
    index = Math.floor(Math.random()*questions.length); // get a random question
    randomQuestion = questions[index];
    $('.col.m-2.pb-2.rounded.sub-article.text-left').html(`<p id="white">${randomQuestion.question}</p>`);
    eraseBlackboard();
    $("#play").hide();
    randomQuestion.blackboard();
    for(var i = 0; i < randomQuestion.answers.length; i++) {
        var userChoice = $("<div>");
        userChoice.addClass("btn btn-success addSpace ox-shadow--8dp");
        userChoice.attr('id', 'answerLabel');
        userChoice.html(randomQuestion.answers[i]);
        userChoice.attr("data-guessvalue", i);
        $("#answerblock").append(userChoice);
    }
    $(".btn.btn-success.addSpace.ox-shadow--8dp").on("click", function () { //--------<check answer>
        userGuess = parseInt($(this).attr("data-guessvalue"));
        if (userGuess === randomQuestion.correct) {
            stop();
            correctAnswers++;
            userGuess="";
            timerStop();
            rightAnswer();
        } else {
            stop();
            incorrectAnswers++;
            userGuess="";
            timerStop();
            wrongAnswer();
        }
    })    
}

function nextQuestion() { // --------------------------------------------------------<next question>
    newArray.push(randomQuestion);
    questions.splice(index,1);
    var nextQ = setTimeout(function() {
        $("#answerblock").empty();
        countdownTime = totalTime;

    //run the score screen if all questions answered
    if ((incorrectAnswers + correctAnswers + nonAnswers) === qCount) {
        $("#answerblock").empty();
        $('.col.m-2.pb-2.rounded.sub-article.text-left').empty();
        eraseBlackboard();
        $(".status").hide();
        $(".timer-bar").hide();
        $("#answerblock").html(`<h2 id="blue">Game Over!</h2>`);
        $("#answerblock").append(`<h3 id="green"> Correct: ${correctAnswers}</h3>`);
        $("#answerblock").append(`<h3 id="red"> Incorrect: ${incorrectAnswers}</h3>`);
        $("#answerblock").append(`<h3 id="yellow"> Unanswered: ${nonAnswers}</h3>`);
        $("#playAgain").show();
        correctAnswers = 0;
        incorrectAnswers = 0;
        nonAnswers = 0;
        timerStop();      
    } else {
        timerStart();
        $(".status").html(`<p id="yellow">Next Question...</p>`);
        displayQuestion();
    }
    }, 3000);
}

function wrongAnswer() { // ----------------------------------------------------------<wrong answer>
    $("#answerblock").empty();
    $('.col.m-2.pb-2.rounded.sub-article.text-left').append(`<br><p id="red"Incorrect!</p><p>The correct answer is:</p><h2>${randomQuestion.answers[randomQuestion.correct]}</h2><p id="hint">${randomQuestion.hint}<p>`);
    nextQuestion();
}

function rightAnswer() { // ----------------------------------------------------------<right answer>
    $("#answerblock").empty();
    $('.col.m-2.pb-2.rounded.sub-article.text-left').append(`<br><p id="green">Correct!  Keep it up!</p>`);
    nextQuestion();    
}

function eraseBlackboard() { // --------------------------------------------------<erase blackboard>
    $('.number-parent').empty();
}

function resetGame(again){ // ----------------------------------------------------------<reset game>
    $("#play").hide();
    $('#playAgain').hide();
    $("#answerblock").empty();
    resetQuestions();
    remainingQuestions = totalQuestions;
    countdownTime = totalTime;
    correctAnswers = 0;
    incorrectAnswers = 0;
    nonAnswers = 0;
    barWidth= 0;
    running = false;
    qCount = questions.length;
    newArray = [];
    holder = [];
    $(".status").show();
    $(".timer-bar").show();
    if (again === false) {
        $('.status').html(`<p id="yellow">Press "Play" to begin!</p>`);
        $('.col.m-2.pb-2.rounded.sub-article.text-left').html(`
            <h2>Welcome to Math Trivia Quiz!</h2>
            <p>The object of this game is to answer each of ${totalQuestions} questions correctly before time runs out.</p>
            <p>You will have ${totalTime} seconds to answer each question.</p>`);
            $("#play").show();
    }
}

function displayNumbers(first, last, interval, prime) { // ------------------------<display numbers>
    if (prime == true) {
        childClass = 'prime-child'
    } else {
        childClass = 'number-child'
    }
    for(let i=first; i <= last; i += parseInt(interval)){
        $('.number-parent').append(`<div class ="${childClass} text-right pull-right float-right">${i}</div>`);
    }
}

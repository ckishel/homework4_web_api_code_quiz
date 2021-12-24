

// DOM
var timerElement = document.querySelector("#time");
var choicesElement = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var questionsElement = document.querySelector("#questions");
var startBtn = document.querySelector("#start");
var feedbackElement = document.querySelector("#feedback");
var initialsElement = document.querySelector("#initials");

// quiz variables
var timerId;
var currentQuestionIndex = 0;
var time = questions.length * 15;

function startQuiz() {
    // hide start
    var startScreenElement = document.getElementById("start-screen");
    startScreenElement.setAttribute("class", "hide");

    // reveal questions
    questionsElement.removeAttribute("class");

    // begin timer
    timerId = setInterval(clockTick, 1000);

    // reveal start time
    timerElement.textContent = time;

    getQuestion();
}

function getQuestion() {
    // get current question object from the array
    var currentQuestion = questions[currentQuestionIndex];

    // update question title with current question
    var titleElement = document.getElementById("question-title");
    titleElement.textContent = currentQuestion.title;

    // clear old choices
    choicesElement.innerHTML = "";

    // loop choices
    currentQuestion.choices.forEach(function(choice, i) {
        // new button for each choice
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);

        choiceNode.textContent = i + 1 + ". " + choice;

        // click event listener attached to each possible choice
        choiceNode.onclick = questionClick;

        // display on page
        choicesElement.appendChild(choiceNode);
    });
}

function questionClick() {
    // check for wrong answer
    if (this.value !== questions[currentQuestionIndex].answer) {
        // time penalty
        time -= 15;

        if (time < 0) {
            time = 0;
        }
        // time display update
        timerElement.textContent = time;
        feedbackElement.textContent = "Wrong Answer!";
        feedbackElement.style.color = "red";
        feedbackElement.style.fontSize = "400%";
    } else {
        feedbackElement.textContent = "Correct Answer!";
        feedbackElement.style.color = "green";
        feedbackElement.style.fontSize = "400%";            
    }

    // flash right or wrong feedback
    feedbackElement.setAttribute("class", "feedback");
    setTimeout(function() {
        feedbackElement.setAttribute("class", "feedback hide");
    }, 1000);

    // next Q
    currentQuestionIndex++;

    // check time
    if (currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}

function quizEnd() {
    // stop time
    clearInterval(timerId);

    // reveal end screen
    var endScreenElement = document.getElementById("end-screen");
    endScreenElement.removeAttribute("class");

    // reveal final score
    var finalScoreElement = document.getElementById("final-score");
    finalScoreElement.textContent = time;
    
    // hide questions
    questionsElement.setAttribute("class", "hide");
}

function clockTick() {
    // time update
    time--;
    timerElement.textContent = time;

    // check time remaining
    if (time <= 0) {
        quizEnd();
    }
}

function saveHighscore() {
    // get input box value
    var initials = initialsElement.value.trim();

    if (initials !== "") {
        // get saved scores from local storage or set to empty
        var highscores = 
            JSON.parse(window.localStorage.getItem("highscores")) || [];
        
        // format score object for user
        var newScore = {
            score: time,
            initials: initials
        };

        // save to local storage
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

        // redirect next page
        window.location.href = "score.html";
    }
}

function checkForEnter(event) {
    // 13 = error key
    if (event.key === "Enter") {
        saveHighscore();
    }
}

// enter initials
submitBtn.onclick = saveHighscore;

// start quiz
startBtn.onclick = startQuiz;

initialsElement.onkeyup = checkForEnter;

// refresh to this
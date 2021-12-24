

// DOM
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

// quiz variables
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function startQuiz() {
    // hide start
    var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide");

    // reveal questions
    questionsEl.removeAttribute("class");

    // begin timer
    timerId = setInterval(clockTick, 1000);

    // reveal start time
    timerEl.textContent = time;

    getQuestion();
}

function getQuestion() {
    // get current question object from the array
    var currentQuestion = questions[currentQuestionIndex];

    // update question title with current question
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;

    // clear old choices
    choicesEl.innerHTML = "";

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
        choicesEl.appendChild(choiceNode);
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
        timerEl.textContent = time;
        feedbackEl.textContent = "Wrong Answer!";
        feedbackEl.style.color = "red";
        feedbackEl.style.fontSize = "400%";
    } else {
        feedbackEl.textContent = "Correct Answer!";
        feedbackEl.style.color = "green";
        feedbackEl.style.fontSize = "400%";            
    }

    // flash right or wrong feedback
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
        feedbackEl.setAttribute("class", "feedback hide");
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
    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");

    // reveal final score
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;
    
    // hide questions
    questionsEl.setAttribute("class", "hide");
}

function clockTick() {
    // time update
    time--;
    timerEl.textContent = time;

    // check time remaining
    if (time <= 0) {
        quizEnd();
    }
}

function saveHighscore() {
    // get input box value
    var initials = initialsEl.value.trim();

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

initialsEl.onkeyup = checkForEnter;

// refresh to this
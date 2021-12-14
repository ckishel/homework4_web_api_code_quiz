// Count, Save and Clear High Scores

// retrieve scores from local storage or set array to empty
function printHighscores(){
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    // set high scores from highest to lowest
    highscores.sort(function(a, b){
        return b.score - a.score;
    });

    // create li tag for high score and then display on the page
    highscores.forEach(function(score){
        var liTag = document.createElement("li");
        liTag.textContent = score.initials + " - " + score.score;

        var olEl = document.getElementById("highscores");
        olEl.appendChild(liTag);
    });
}

// clear high score
function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.localStorage.reload();
}

document.getElementById("clear").onclick = clearHighscores;

// run on reload
printHighscores();
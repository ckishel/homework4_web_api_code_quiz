// setting a "constant" var to select my start button from html index. This is the question container
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionnElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

// shuffle answers
let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () =>{
currentQuestionIndex++
setNextQuestion()
})

// function to start the game.
function startGame(){
    console.log('Started')
    // Function to hide the start button and unhide the questions container and shuffle questions and answers
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() -.5)
    //start questions at beginning, set array = 0
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    // Function to set the next question
    setNextQuestion()
}
// function to start the next question and click on the next button
function setNextQuestion(){
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
    questionnElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState(){
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

//function to select the correct answer from list 
function selectAnswer(e){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button =>{
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex +1){
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    } 
}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if (correct) {
        element.classlist.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element){
    element.classlist.remove('correct')
    element.classlist.remove('wrong')
} 

// create list of questions in an array. First object in array is first question. Second array is the answers
const questions = [
{
    question: 'Commonly used data types DO NOT include:',
    answers: [
        {text: 'alerts', correct: true},
        {text: 'strings', correct: false},
        {text: 'booleans', correct: false},
        {text: 'numbers', correct: false}
    ]
},
{
    question: 'The condition in an if / else statement is enclosed within ____:',
    answers: [
        {text: 'parentheses', correct: true},
        {text: 'quotes', correct: false},
        {text: 'curly brackets', correct: false},
        {text: 'square brackets', correct: false}
    ]
},
{
    question: 'Arrays in JavaScript can be used to store ____:',
    answers: [
        {text: 'all of the above', correct: true},
        {text: 'numbers and strings', correct: false},
        {text: 'other arrays', correct: false},
        {text: 'booleans', correct: false}
    ]
},
{
    question: 'String values must be enclosed within ____ when being assigned to variables:',
    answers: [
        {text: 'quotes', correct: true},
        {text: 'commas', correct: false},
        {text: 'curly brackets', correct: false},
        {text: 'parentheses', correct: false}
    ]
},
{
    question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
    answers: [
        {text: 'console.log', correct: true},
        {text: 'JavaScript', correct: false},
        {text: 'terminal', correct: false},
        {text: 'bash for loops', correct: false}
    ]
}

]
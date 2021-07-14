// TIMER VARIABLES 🌻
var timeRem = 180;
var timeInt;
var quizTimer = document.getElementById("tmrBB"); //

// VARIABLES - QUIZ ELs 🌷
var startQuizzz = document.getElementById("startQuizzz"); //
var quizBB = document.getElementById("quizBB"); //
var qstnsEl = document.getElementById("qstns"); //
var answrEl = document.getElementById("answr"); //

var endScore = document.getElementById("endScore"); //
var endQ = document.getElementById("endQ"); //

var hsDIBI = document.getElementById("hsDIBI"); //
var ntials = document.getElementById("ntials"); //
var hsIs = document.getElementById("hsIs"); //
var hsResults = document.getElementById("hsResults"); //
var okay = document.getElementById("okay"); //

// VARIABLES - BUTTONS 🌼
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");

var btnBegin = document.getElementById("btnBegin"); //
var submitBtn = document.getElementById("submit"); //

// QUIZ:
var quizQs = [{
    question: "ECMA stands for -",
    answer1: "A. European Croissant Mastication Association",
    answer2: "B. English Computer Manufacturer's Association",
    answer3: "C. European Computer Manufacturer's Association",
    answer4: "D. Every Compiler Manufactures Anguish",
    win: "C"},
  {
    question: "What is an API?",
    answer1: "A. Appropriate Programming Interface",
    answer2: "B. Application Programming Interface",
    answer3: "C. Apple's Programming Interface",
    answer4: "D. Association of Programmer Introverts",
    win: "B"},
   {
    question: "DOM means -",
    answer1: "A. Document Object Model",
    answer2: "B. It's the name of the best ACNH Jock, obviously",
    answer3: "C. Document Orientation Model",
    answer4: "D. Digital Object Model",
    win: "A"},     
];

// VARIABLES - QUESTIONS, ANSWERS 🌾
var lastQ = quizQs.length;
var currentQInd = 0;
var winning;
var score = 0;

// START QUIZ 🍓
function startQuiz(){
  endQ.style.display = "none";
  startQuizzz.style.display = "none";
  generateQuizQuestion();

  // TIMER 
  timeInt = setInterval(function() {
      timeRem--;
      quizTimer.textContent = "Remaining Time: " + timeRem;
  
      if(timeRem === 0) {
        clearInterval(timeInt);
        showScore();
      }
    }, 1000);
  quizBB.style.display = "block";
}

// PULLS QUESTIONS 🍍
function generateQuizQuestion(){
    endQ.style.display = "none";
    if (currentQInd === lastQ){
        return showScore();
    } 
    var currentQuestion = quizQs[currentQInd];
    qstnsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    btn1.innerHTML = currentQuestion.answer1;
    btn2.innerHTML = currentQuestion.answer2;
    btn3.innerHTML = currentQuestion.answer3;
    btn4.innerHTML = currentQuestion.answer4;
};

// CHECK ANSWERS 😬
function checkAnswer(answer){
  winning = quizQs[currentQInd].win;

  if (answer === winning && currentQInd !== lastQ){
      score++;
      alert("Yes 😎");
      currentQInd++;
      generateQuizQuestion();
  }else if (answer !== winning && currentQInd !== lastQ){
      alert("Nope 😓")
      currentQInd++;
      generateQuizQuestion();
  }else{
      showScore();
  }
}

// STRINGIFY THE SCORE AND STUFF 🌿
submitBtn.addEventListener("click", function highscore(){     
    if(ntials.value === "") {
      alert("Please enter your initials!");
      return false;
    
    }else{
      var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
      var currentUser = ntials.value.trim();
      var currentHighscore = {
          name : currentUser,
          score : score
        };
    
      endQ.style.display = "none";
      hsDIBI.style.display = "flex";
      hsResults.style.display = "block";
      playclearBtns.style.display = "flex";
        
      savedHighscores.push(currentHighscore);
      localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
      generateHighscores();
    }    
});

// HIGH SCORE DID I BREAK IT 🍉
function generateHighscores(){
    hsIs.innerHTML = "";
    hsResults.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        hsIs.appendChild(newNameSpan);
        hsResults.appendChild(newScoreSpan);
    }
}

// DISPLAY HIGH SCORES / HIDE QUIZ 🍊
function showHighscore(){
    startQuizzz.style.display = "none"
    endQ.style.display = "none";
    hsDIBI.style.display = "flex";
    hsResults.style.display = "block";
    playclearBtns.style.display = "flex";

    generateHighscores();
}

// DISPLAY SCORES @ END QUIZ 🍌
function showScore(){
  quizBB.style.display = "none"
  endQ.style.display = "flex";
  clearInterval(timeInt);
  ntials.value = "";
  endScore.innerHTML = "Your score: " + score + "Total questions: " + quizQs.length;
}

// CLEAR HIGH SCORES 🌟
function clearScore(){
    window.localStorage.clear();
    hsIs.textContent = "";
    hsResults.textContent = "";
}

// BUTTON BEGINS QUIZ 🍃
btnBegin.addEventListener("click",startQuiz);
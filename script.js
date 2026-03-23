//

let questions = [];
let timeLeft = 10;
let timer;

fetch("questions.json")
  .then(response => response.json())
  .then(data => {
    questions = data;
    console.log(questions);
    starQuis();
    
  });

const questionElement = document.getElementById("question");
const answersButtons = document.getElementById("answer-buttons");
const nextBotton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function starQuis() {
  currentQuestionIndex = 0;
  score = 0;
  nextBotton.innerHTML = "Lanjut";
  showQustion();
}

function showQustion() {
  resetState();
  clearInterval(timer); // ✅ stop timer lama
  startTimer();         // ✅ mulai timer baru
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answersButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
function resetState() {
  nextBotton.style.display = "none";
  while (answersButtons.firstChild) {
    answersButtons.removeChild(answersButtons.firstChild);
  }
}
function selectAnswer(e) {
  clearInterval(timer); // ✅ HENTIKAN TIMER DI SINI
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answersButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBotton.style.display = "block";
}
function showScore() {
  resetState();
  questionElement.innerHTML = ` You Scored ${score} out of ${questions.length}!`;
  nextBotton.innerHTML = " Play Again";
  nextBotton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQustion();
  } else {
    showScore();
  }
}

nextBotton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    starQuis();
  }
});

function startTimer() {
  timeLeft = 10;
  document.getElementById("timer").innerHTML = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerHTML = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timer);
      handleNextButton(); // otomatis lanjut
    }
  }, 1000);
}
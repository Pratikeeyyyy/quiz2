
let questions = [];
let currentIndex = 0;
let score = 0;

const startBtn = document.getElementById("startBtn");
const questionBox = document.querySelector(".question-box");
const quizFooter = document.querySelector(".quiz-footer");
const startBox = document.querySelector(".start-box");
const nextBtn = document.getElementById("nextBtn");
const result = document.getElementById("result");
// fetch quiz from API

async function loadQuiz() {
  try {
    const quizquestion = await fetch("https://opentdb.com/api.php?amount=3");
    const data = await quizquestion.json();

    questions = data.results;
    console.log(questions);
  } catch (error) {
    console.error(error);
  }
}

loadQuiz();

// option from html
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");
// start quiz
startBtn.addEventListener("click", function () {
  questionBox.style.display = "block";
  quizFooter.style.display = "block";
  startBox.style.display = "none";

  showQuestion();
});

// show question of quiz
function showQuestion() {
  const currentQuestion = questions[currentIndex];

  document.getElementById("question").innerHTML = currentQuestion.question;
  console.log(currentIndex);

  const options = [
    currentQuestion.correct_answer,
    ...currentQuestion.incorrect_answers,
  ];

  option1.innerHTML = options[0];
  option2.innerHTML = options[1];
  option3.innerHTML = options[2];
  option4.innerHTML = options[3];
}

// next button
nextBtn.addEventListener("click", function () {
  const selected = document.querySelector('input[name="answer"]:checked');
  console.log(selected);
  const answerIndex = selected.value;

  const options = [
    questions[currentIndex].correct_answer,
    ...questions[currentIndex].incorrect_answers,
  ];

  if (options[answerIndex] === questions[currentIndex].correct_answer) {
    score++;
  }
  // while ((question[currentIndex].correct_answer = options[answerIndex])) {
  //   console.log("this is right");
  // }

  currentIndex++;

  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    resultofquiz();
    // console.log(myquiz);
    selected.checked = false;
  }

  //  forshowing result
  /*const myquiz =*/ function resultofquiz() {
    questionBox.style.display = "none";
    quizFooter.style.display = "none";
    result.innerHTML = "Your Score: " + score + " / " + questions.length;
    setTimeout(function () {
      location.reload();
    }, 5000);
  }
  // console.log();
});

const questionEl = document.getElementById("question-el");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const pointBox = document.getElementById("quiz-top");

const quizData = [
  {
    question: "What is the food Naruto Uzumaki loves most",
    answers: [
      { text: "Udon", correct: false },
      { text: "Ramen", correct: true },
      { text: "Somen", correct: false },
      { text: "Mochi", correct: false },
    ],
  },
  {
    question:
      "What is the name of the iconic transformation in Dragon Ball Z that has blonde hair and immense power",
    answers: [
      { text: "Saiyan", correct: true },
      { text: "Majin", correct: false },
      { text: "Shinigami", correct: false },
      { text: "Jinchuriki", correct: false },
    ],
  },
  {
    question:
      "In My Hero Academia, what is the name of the school where aspiring heroes train",
    answers: [
      { text: "Tokyo Jujutsu High", correct: false },
      { text: "U.A High school", correct: true },
      { text: "Totsuki Culinary Academy", correct: false },
      { text: "Duel Academy", correct: false },
    ],
  },
  {
    question:
      "What is the name of the legendary pirate king that Luffy, the main character of One Piece, aspires to become",
    answers: [
      { text: "Portgas D. Ace", correct: false },
      { text: "Gol D. Roger", correct: true },
      { text: "Edward Newgate", correct: false },
      { text: "Don Quixote Doflamingo", correct: false },
    ],
  },
  {
    question:
      "What is the name of the notebook Light Yagami uses to kill people",
    answers: [
      { text: "Death Book", correct: false },
      { text: "Book of secrets", correct: false },
      { text: "Death note", correct: true },
      { text: "The empty box", correct: false },
    ],
  },
  {
    question:
      "Which of the following walls is the outermost wall protecting humanity from Titans",
    answers: [
      { text: "Wall Sina", correct: false },
      { text: "Wall Rose", correct: false },
      { text: "Wall Mary", correct: false },
      { text: "Wall Maria", correct: true },
    ],
  },
  {
    question:
      "What is the special command used to release a Zanpakuto's true power",
    answers: [
      { text: "Getsuga Tensho", correct: false },
      { text: "Shikai", correct: false },
      { text: "Resei", correct: false },
      { text: "Bankai", correct: true },
    ],
  },
  {
    question:
      "What is the source of the Philosopher's Stone, the ultimate goal many alchemists seek in the Full metal Alchemist series",
    answers: [
      { text: "A rare mineral", correct: false },
      { text: "Sacrificed human souls", correct: true },
      { text: "Mythincal spring", correct: false },
      { text: "gold", correct: true },
    ],
  },
  {
    question:
      "What is the name of the notorious group of thieves Gon from HunterXHunter encounters in Yorknew City",
    answers: [
      { text: "The Zodiacs", correct: false },
      { text: "The Phantom troupe", correct: true },
      { text: "The greed Players", correct: false },
      { text: "Alchemists", correct: false },
    ],
  },
  {
    question:
      "What is the highest rank achievable within the Demon Slayers Corps",
    answers: [
      { text: "Kinoe", correct: false },
      { text: "Slayer", correct: false },
      { text: "Hashira", correct: true },
      { text: "Gorosei", correct: false },
    ],
  },
];

let currentQuizIndex = 0;
let score = 0;
let maxScore = quizData.length;

// FUNCTIONS AND EVENTLISTENERS
const startQuiz = () => {
  currentQuizIndex = 0;
  score = 0;
  nextBtn.innerText = "Next";
  answersEl.style.display = "flex";
  displayData();
};

const displayData = () => {
  reset();

  let currentQuestion = quizData[currentQuizIndex];

  pointBox.innerHTML = `${currentQuizIndex + 1} out of ${quizData.length}`;

  questionEl.innerHTML = `${currentQuestion.question} ?`;

  currentQuestion.answers.forEach((opt) => {
    const option = document.createElement("button");
    option.innerHTML = opt.text;
    option.setAttribute("class", "option-btn");

    answersEl.appendChild(option);

    if (opt.correct) {
      option.dataset.correct = opt.correct;
    }
    option.addEventListener("click", selectOption);
  });
};

const reset = () => {
  nextBtn.style.display = "none";
  while (answersEl.firstChild) {
    answersEl.removeChild(answersEl.firstChild);
  }
};

const selectOption = (e) => {
  const selectedOpt = e.target;
  const isCorrect = selectedOpt.dataset.correct === "true";

  if (isCorrect) {
    selectedOpt.classList.add("correct");
    score++;
  } else {
    selectedOpt.classList.add("incorrect");
  }

  Array.from(answersEl.children).forEach((item) => {
    if (item.dataset.correct === "true") {
      selectedOpt.classList.add("correct");
    }
    item.disabled = "true";
  });
  nextBtn.style.display = "block";
};

const showScore = () => {
  if (score < maxScore) {
    questionEl.innerHTML = `You scored ${score} out of ${maxScore}
     Gambare! You can train harder to become a true master!👍`;
  } else {
    questionEl.innerHTML = `**Sugoi!** You got a perfect score! 🎉:･ﾟ✧: ${score} out of ${maxScore}`;
  }

  answersEl.style.display = "none";
  nextBtn.innerHTML = "Play another Game!";
  pointBox.style.display = "none";
};

const handleNextBtn = () => {
  currentQuizIndex++;
  if (currentQuizIndex < quizData.length) {
    displayData();
  } else {
    showScore();
  }
};

nextBtn.addEventListener("click", () => {
  if (currentQuizIndex < quizData.length) {
    handleNextBtn();
  } else {
    startQuiz();
  }
});

startQuiz();

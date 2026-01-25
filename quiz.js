class Quiz {
  constructor() {
    this.initializeState();
    this.getElements();
    this.populateNavBar();
    this.initializeDisplay();
    this.setupEventListeners();
  }

  initializeState() {
    this.currentQuestion = 0;
    this.totalQuestions = QUESTIONS.length;
    this.answers = Array(this.totalQuestions).fill(null); // maybe move to local storage later
    this.score = 0;
  }

  getElements() {
    this.mainContent = document.getElementById("main-content");
    this.splashScreen = document.getElementById("splash-screen");

    this.finalScoreSection = document.getElementById("final-score-section");
    this.finalScoreValue = document.getElementById("final-score-value");
    this.finalScoreMax = document.getElementById("final-score-max");
    this.restartButton = document.getElementById("restart-btn");

    this.codeDisplay = document.getElementById("code-display");
    this.prefaceText = document.getElementById("preface-text");
    this.scoreDigit = document.getElementById("score-digit");
    this.nextButton = document.getElementById("next-btn");
    this.startQuizButton = document.getElementById("start-quiz-btn");
    this.answerButtons = [
      document.getElementById("answer-0"),
      document.getElementById("answer-1"),
      document.getElementById("answer-2"),
    ];
    this.answerButtonTexts = [
      document.getElementById("answer-0-text"),
      document.getElementById("answer-1-text"),
      document.getElementById("answer-2-text"),
    ];
    this.explanationSection = document.getElementById("explanation-section");
    this.explanationText = document.getElementById("explanation-text");
    this.finishButton = document.getElementById("finish-btn");
    this.navBar = document.getElementById("nav-bar");
  }

  populateNavBar() {
    for (let i = 0; i < this.totalQuestions; i++) {
      const button = document.createElement("button");
      button.textContent = i + 1;
      this.navBar.appendChild(button);
    }
    this.navButtons = [...this.navBar.children];
  }

  initializeDisplay() {
    this.mainContent.hidden = true;
    this.finalScoreSection.hidden = true;
    this.finishButton.style.display = "none";
    for (let i = 0; i <= this.currentQuestion; i++) {
      this.navButtons[i].disabled = false;
    }
    for (let i = this.currentQuestion + 1; i < this.totalQuestions; i++) {
      this.navButtons[i].disabled = true;
    }
    this.splashScreen.hidden = false;
  }

  setupEventListeners() {
    this.startQuizButton.addEventListener("click", () => this.startQuiz());
    // Also allow Enter or Space to start quiz from splash screen
    document.addEventListener("keydown", (event) => {
      if (
        (event.key === "Enter" || event.key === " ") &&
        !this.splashScreen.hidden
      ) {
        event.preventDefault();
        this.startQuiz();
      }
    });
    this.answerButtons.forEach((button, index) => {
      button.addEventListener("click", () => this.selectAnswer(index));
    });
    this.navButtons.forEach((button, index) =>
      button.addEventListener("click", () => this.loadQuestion(index)),
    );
    this.nextButton.addEventListener("click", () => this.nextQuestion());
    this.finishButton.addEventListener("click", () => this.finishQuiz());
    this.restartButton.addEventListener("click", () => this.restart());
  }

  restart() {
    this.initializeState();
    this.initializeDisplay();
  }

  startQuiz() {
    this.hideSplashScreen();
    this.loadQuestion(this.currentQuestion);
  }

  hideSplashScreen() {
    this.splashScreen.hidden = true;
    this.mainContent.hidden = false;
  }

  hasAnsweredCurrentQuestion() {
    return this.answers[this.currentQuestion] !== null;
  }

  loadQuestion(index) {
    const question = QUESTIONS[index];
    this.codeDisplay.textContent = question.code;
    this.codeDisplay.removeAttribute("data-highlighted"); // else highlightjs skips re-highlighting
    hljs.highlightElement(this.codeDisplay);
    this.prefaceText.innerHTML = question.preface;
    this.answerButtonTexts.forEach((samp, index) => {
      samp.textContent = question.answers[index];
    });

    if (index < this.currentQuestion) {
      // reviewing a previous question
      this.answerButtons.forEach((button) => {
        button.disabled = true;
      });
      this.explanationText.innerHTML = question.explanation;
      this.nextButton.style.display = "none";
    } else if (
      index === this.currentQuestion &&
      !this.hasAnsweredCurrentQuestion()
    ) {
      // answering the current question
      this.answerButtons.forEach((button) => {
        button.disabled = false;
      });
      this.explanationText.innerHTML = "";
      this.nextButton.style.display = "none";
    } else if (
      index === this.currentQuestion &&
      this.hasAnsweredCurrentQuestion()
    ) {
      // reviewing the current question
      this.answerButtons.forEach((button) => {
        button.disabled = true;
      });
      this.explanationText.innerHTML = question.explanation;
      this.nextButton.style.display = "block";
    }
  }

  nextQuestion() {
    this.currentQuestion++;
    this.navButtons[this.currentQuestion].disabled = false;
    this.loadQuestion(this.currentQuestion);
  }

  finishQuiz() {
    this.mainContent.hidden = true;
    this.finalScoreSection.hidden = false;
    this.finalScoreValue.textContent = this.score;
    this.finalScoreMax.textContent = this.totalQuestions;
  }

  selectAnswer(selectedIndex) {
    this.answers[this.currentQuestion] = selectedIndex;
    this.answerButtons.forEach((button) => {
      button.disabled = true;
    });
    const question = QUESTIONS[this.currentQuestion];
    const correctIndex = question.correct;
    if (selectedIndex === correctIndex) {
      this.score++;
      this.scoreDigit.textContent = this.score;
    }
    if (this.currentQuestion === this.totalQuestions - 1) {
      this.nextButton.style.display = "none";
      this.finishButton.style.display = "block";
    } else {
      this.nextButton.style.display = "block";
      this.finishButton.style.display = "none";
    }
    this.explanationText.innerHTML = question.explanation;
    this.explanationSection.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Quiz();
});

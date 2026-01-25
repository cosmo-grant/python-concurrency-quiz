class Quiz {
  constructor() {
    this.getElements();
    this.populateNavBar();
    this.setupEventListeners();

    const savedState = this.loadState();
    if (savedState) {
      // offer user choice to continue or resume
      this.showContinueDialog();
      this.savedQuestionDialog.textContent = savedState.currentQuestion + 1;
      this.savedScoreDialog = savedState.answers.filter(Boolean).length;
      this.totalQuestionsDialog.textContent = QUESTIONS.length;

      this.continueFromSavedButton.addEventListener("click", () => {
        this.currentQuestion = savedState.currentQuestion;
        this.answers = savedState.answers;
        this.startQuiz();
      });

      this.restartFromSavedButton.addEventListener("click", () => {
        this.restart();
      });
    } else {
      // no saved state; fresh start
      this.restart();
    }
  }

  getElements() {
    this.mainContent = document.getElementById("main-content");
    this.splashScreen = document.getElementById("splash-screen");

    this.finalScoreSection = document.getElementById("final-score-section");
    this.finalScoreValue = document.getElementById("final-score-value");
    this.finalScoreMax = document.getElementById("final-score-max");
    this.finalScoreMessage = document.getElementById("final-score-message");
    this.restartButton = document.getElementById("restart-button");

    this.codeDisplay = document.getElementById("code-display");
    this.prefaceText = document.getElementById("preface-text");
    this.scoreDigit = document.getElementById("score-digit");
    this.nextButton = document.getElementById("next-button");
    this.startQuizButton = document.getElementById("start-quiz-button");
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
    this.finishButton = document.getElementById("finish-button");
    this.navBar = document.getElementById("nav-bar");

    this.continueDialog = document.getElementById("continue-dialog");
    this.savedQuestionDialog = document.getElementById("saved-question-dialog");
    this.savedScoreDialog = document.getElementById("saved-score-dialog");
    this.totalQuestionsDialog = document.getElementById(
      "total-questions-dialog",
    );
    this.continueFromSavedButton = document.getElementById(
      "continue-from-saved-button",
    );
    this.restartFromSavedButton = document.getElementById(
      "restart-from-saved-button",
    );
  }

  populateNavBar() {
    for (let i = 0; i < QUESTIONS.length; i++) {
      const button = document.createElement("button");
      button.textContent = i + 1;
      this.navBar.appendChild(button);
    }
    this.navButtons = [...this.navBar.children];
  }

  showContinueDialog() {
    this.splashScreen.hidden = true;
    this.continueDialog.hidden = false;
    this.mainContent.hidden = true;
    this.finalScoreSection.hidden = true;
  }

  showSplashScreen() {
    this.splashScreen.hidden = false;
    this.continueDialog.hidden = true;
    this.mainContent.hidden = true;
    this.finalScoreSection.hidden = true;
  }

  showMainContent() {
    this.splashScreen.hidden = true;
    this.continueDialog.hidden = true;
    this.mainContent.hidden = false;
    this.finalScoreSection.hidden = true;
  }

  showFinalScoreSection() {
    this.splashScreen.hidden = true;
    this.continueDialog.hidden = true;
    this.mainContent.hidden = true;
    this.finalScoreSection.hidden = false;
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

  startQuiz() {
    this.showMainContent();
    this.finishButton.style.display = "none";
    for (let i = 0; i <= this.currentQuestion; i++) {
      this.navButtons[i].disabled = false;
    }
    for (let i = this.currentQuestion + 1; i < QUESTIONS.length; i++) {
      this.navButtons[i].disabled = true;
    }
    this.loadQuestion(this.currentQuestion);
  }

  computeScore() {
    return this.answers.filter(Boolean).length;
  }

  updateScore() {
    this.scoreDigit.textContent = this.computeScore();
  }

  restart() {
    this.clearState();
    this.currentQuestion = 0;
    this.answers = Array(QUESTIONS.length).fill(null);
    this.showSplashScreen();
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

  selectAnswer(selectedIndex) {
    this.answerButtons.forEach((button) => {
      button.disabled = true;
    });

    const question = QUESTIONS[this.currentQuestion];
    const correctIndex = question.correct;
    this.answers[this.currentQuestion] = correctIndex === selectedIndex;
    this.saveState();
    this.updateScore();

    if (this.currentQuestion === QUESTIONS.length - 1) {
      this.nextButton.style.display = "none";
      this.finishButton.style.display = "block";
    } else {
      this.nextButton.style.display = "block";
      this.finishButton.style.display = "none";
    }
    this.explanationText.innerHTML = question.explanation;
    this.explanationSection.style.display = "block";
  }

  nextQuestion() {
    this.currentQuestion++;
    this.saveState();
    this.navButtons[this.currentQuestion].disabled = false;
    this.loadQuestion(this.currentQuestion);
  }

  finishQuiz() {
    this.clearState();
    this.showFinalScoreSection();
    this.finalScoreValue.textContent = this.computeScore();
    this.finalScoreMax.textContent = QUESTIONS.length;

    let message = "";
    const percentage = (this.score / QUESTIONS.length) * 100; // use % in case question count changes

    if (percentage === 100) {
      message = "A";
    } else if (percentage >= 80) {
      message = "B";
    } else if (percentage >= 60) {
      message = "C";
    } else if (percentage >= 40) {
      message = "D";
    } else {
      message = "F";
    }

    this.finalScoreMessage.textContent = message;
  }

  // should be called after any state-changing action
  saveState() {
    const state = {
      currentQuestion: this.currentQuestion,
      answers: this.answers,
    };
    localStorage.setItem(
      "python-concurrency-quiz-state",
      JSON.stringify(state),
    );
  }

  // TODO: what if questions updated since last session?
  loadState() {
    try {
      const savedState = localStorage.getItem("python-concurrency-quiz-state");
      if (savedState) {
        return JSON.parse(savedState);
      }
    } catch (e) {
      console.warn("Failed to load saved quiz state:", e);
    }
    return null;
  }

  clearState() {
    localStorage.removeItem("python-concurrency-quiz-state");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Quiz();
});

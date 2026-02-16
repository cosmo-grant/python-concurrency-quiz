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
      this.savedScoreDialog.textContent = savedState.answers.filter(
        (selectedAnswer, questionIndex) =>
          selectedAnswer === QUESTIONS[questionIndex].correct,
      ).length;
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
    this.navBar.hidden = true;
  }

  showSplashScreen() {
    this.splashScreen.hidden = false;
    this.continueDialog.hidden = true;
    this.mainContent.hidden = true;
    this.finalScoreSection.hidden = true;
    this.navBar.hidden = true;
  }

  showMainContent() {
    this.splashScreen.hidden = true;
    this.continueDialog.hidden = true;
    this.mainContent.hidden = false;
    this.finalScoreSection.hidden = true;
    this.navBar.hidden = false;
  }

  showFinalScoreSection() {
    this.splashScreen.hidden = true;
    this.continueDialog.hidden = true;
    this.mainContent.hidden = true;
    this.finalScoreSection.hidden = false;
    this.navBar.hidden = true;
  }

  setupEventListeners() {
    // Handle some keyboard interaction.
    // The approach is to translate keyboard events into click events.
    // So the direct cause of behaviour is always clicks.
    // We need guards though, e.g. to prevent clicking disabled or hidden buttons.
    document.addEventListener("keydown", (event) => {
      // Enter or Space to start, finish, restart, or move to next question
      // Use `else if` even when the conditions are statically incompatible to prevent races.
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (!this.splashScreen.hidden) {
          this.startQuizButton.dispatchEvent(new Event("click"));
        } else if (this.nextButton.style.display === "block") {
          this.nextButton.dispatchEvent(new Event("click"));
        } else if (
          this.finishButton.style.display === "block" &&
          this.finalScoreSection.hidden
        ) {
          this.finishButton.dispatchEvent(new Event("click"));
        } else if (!this.finalScoreSection.hidden) {
          this.restartButton.dispatchEvent(new Event("click"));
        }
      }

      // Arrow keys to move between viewable questions.
      if (
        event.key === "ArrowLeft" &&
        !this.mainContent.hidden &&
        this.viewedQuestion - 1 >= 0
      ) {
        event.preventDefault();
        const navButton = this.navButtons[this.viewedQuestion - 1];
        navButton.dispatchEvent(new Event("click"));
      }

      if (
        event.key === "ArrowRight" &&
        !this.mainContent.hidden &&
        this.viewedQuestion + 1 <= this.currentQuestion
      ) {
        event.preventDefault();
        const navButton = this.navButtons[this.viewedQuestion + 1];
        navButton.dispatchEvent(new Event("click"));
      }
      // Number keys to select answers.
      if (
        event.key >= "1" &&
        event.key <= this.answerButtons.length.toString() &&
        !this.answerButtons[0].disabled
      ) {
        event.preventDefault();
        const answerIndex = parseInt(event.key) - 1;
        this.answerButtons[answerIndex].dispatchEvent(new Event("click"));
      }
    });

    this.startQuizButton.addEventListener("click", () => this.startQuiz());

    this.answerButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        this.selectAnswer(index);
      });
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
    // Restore nav button classes for previously answered questions
    for (let i = 0; i < this.answers.length; i++) {
      const navBtn = this.navButtons[i];
      navBtn.classList.remove("viewing", "correct");
      if (
        this.answers[i] !== null &&
        this.answers[i] === QUESTIONS[i].correct
      ) {
        navBtn.classList.add("correct");
      }
    }
    this.loadQuestion(this.currentQuestion);
  }

  computeScore() {
    return this.answers.filter(
      (selectedAnswer, questionIndex) =>
        selectedAnswer === QUESTIONS[questionIndex].correct,
    ).length;
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
    this.viewedQuestion = index;
    this.codeDisplay.textContent = question.code;
    this.codeDisplay.removeAttribute("data-highlighted"); // else highlightjs skips re-highlighting
    hljs.highlightElement(this.codeDisplay);
    this.prefaceText.innerHTML = question.preface;
    this.answerButtonTexts.forEach((samp, index) => {
      samp.textContent = question.answers[index];
    });

    // Clear answer button classes
    this.answerButtons.forEach((button) => {
      button.classList.remove("selected", "correct");
    });

    // Update nav bar: mark which question is being viewed
    this.navButtons.forEach((btn) => btn.classList.remove("viewing"));
    this.navButtons[index].classList.add("viewing");

    if (index < this.currentQuestion) {
      // reviewing a previous question
      this.answerButtons.forEach((button) => {
        button.disabled = true;
      });
      const selectedIndex = this.answers[index];
      this.answerButtons[selectedIndex].classList.add("selected");
      this.answerButtons[question.correct].classList.add("correct");
      this.explanationText.innerHTML = question.explanation;
      this.explanationSection.style.display = "block";
      this.nextButton.style.display = "none";
    } else if (
      index === this.currentQuestion &&
      !this.hasAnsweredCurrentQuestion()
    ) {
      // answering the current question
      this.answerButtons.forEach((button) => {
        button.disabled = false;
      });
      this.explanationSection.style.display = "none";
      this.nextButton.style.display = "none";
    } else if (
      index === this.currentQuestion &&
      this.hasAnsweredCurrentQuestion()
    ) {
      // reviewing the current question
      this.answerButtons.forEach((button) => {
        button.disabled = true;
      });
      const selectedIndex = this.answers[index];
      this.answerButtons[selectedIndex].classList.add("selected");
      this.answerButtons[question.correct].classList.add("correct");
      this.explanationText.innerHTML = question.explanation;
      this.explanationSection.style.display = "block";
      if (this.currentQuestion === QUESTIONS.length - 1) {
        this.nextButton.style.display = "none";
        this.finishButton.style.display = "block";
      } else {
        this.nextButton.style.display = "block";
        this.finishButton.style.display = "none";
      }
    }
  }

  selectAnswer(selectedIndex) {
    this.answerButtons.forEach((button) => {
      button.disabled = true;
    });

    const question = QUESTIONS[this.currentQuestion];
    const correctIndex = question.correct;
    const isCorrect = correctIndex === selectedIndex;
    this.answers[this.currentQuestion] = selectedIndex;
    this.saveState();

    // Update answer buttons: show selected and correct
    this.answerButtons[selectedIndex].classList.add("selected");
    this.answerButtons[correctIndex].classList.add("correct");

    // Update nav bar: mark this question as correct
    if (isCorrect) {
      const navBtn = this.navButtons[this.currentQuestion];
      navBtn.classList.add("correct");
    }

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
    const percentage = (this.computeScore() / QUESTIONS.length) * 100; // use % in case question count changes

    if (percentage === 100) {
      message = "&#x1f92f;";
    } else if (percentage >= 80) {
      message = "&#x1f60e;";
    } else if (percentage >= 60) {
      message = "&#x1f642;";
    } else if (percentage >= 40) {
      message = "&#x1f62c;";
    } else {
      message = "&#x1f648;";
    }

    this.finalScoreMessage.innerHTML = message;
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

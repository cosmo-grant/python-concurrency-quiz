class Quiz {
  constructor() {
    this.currentQuestion = 0;
    this.totalQuestions = QUESTIONS.length;
    this.answers = Array(this.totalQuestions).fill(null); // maybe move to local storage later
    this.score = 0;
    this.initializeElements();
    this.setupEventListeners();
    this.loadQuestion(this.currentQuestion);
  }

  initializeElements() {
    this.codeDisplay = document.getElementById("code-display");
    this.prefaceText = document.getElementById("preface-text");
    this.scoreDigit = document.getElementById("score-digit");
    this.nextButton = document.getElementById("next-btn");
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
    for (let i = 0; i < this.totalQuestions; i++) {
      const button = document.createElement("button");
      button.textContent = i + 1;
      this.navBar.appendChild(button);
      button.disabled = true;
    }
    this.navButtons = [...this.navBar.children];
    this.navButtons[0].disabled = false;
    this.finishButton.style.display = "none";
  }

  setupEventListeners() {
    this.answerButtons.forEach((button, index) => {
      button.addEventListener("click", () => this.selectAnswer(index));
    });
    this.navButtons.forEach((button, index) =>
      button.addEventListener("click", () => this.loadQuestion(index)),
    );
    this.nextButton.addEventListener("click", () => this.nextQuestion());
    this.finishButton.addEventListener("click", () => this.finishQuiz());
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
    if (this.currentQuestion === this.totalQuestions - 1) {
      this.nextButton.style.display = "none";
      this.finishButton.style.display = "block";
    }
    this.navButtons[this.currentQuestion].disabled = false;
    this.loadQuestion(this.currentQuestion);
  }

  finishQuiz() {
    alert(`You got ${this.score} out of ${this.totalQuestions}`);
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
    this.explanationText.innerHTML = question.explanation;
    this.explanationSection.style.display = "block";
    this.nextButton.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Quiz();
});

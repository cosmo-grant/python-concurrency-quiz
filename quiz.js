class Quiz {
  constructor() {
    this.currentQuestion = 0;
    this.totalQuestions = QUESTIONS.length;
    this.isAnswered = false;
    this.initializeElements();
    this.setupEventListeners();
    this.loadQuestion();
    this.score = 0;
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
    this.explanationSection = document.getElementById("explanation-section");
    this.explanationText = document.getElementById("explanation-text");
    this.finishButton = document.getElementById("finish-btn");
    this.finishButton.style.display = "none";
  }

  setupEventListeners() {
    this.answerButtons.forEach((button, index) => {
      button.addEventListener("click", () => this.selectAnswer(index));
    });
    this.nextButton.addEventListener("click", () => this.nextQuestion());
    this.finishButton.addEventListener("click", () => this.finishQuiz());
  }

  loadQuestion() {
    const question = QUESTIONS[this.currentQuestion];
    this.isAnswered = false;

    this.codeDisplay.textContent = question.code;
    this.codeDisplay.removeAttribute("data-highlighted"); // else highlightjs skips re-highlighting
    hljs.highlightElement(this.codeDisplay);
    this.prefaceText.innerHTML = question.preface;
    this.answerButtons.forEach((button, index) => {
      button.textContent = question.answers[index];
    });
  }

  nextQuestion() {
    this.currentQuestion++;
    if (this.currentQuestion === this.totalQuestions - 1) {
      this.nextButton.style.display = "none";
      this.finishButton.style.display = "block";
    }
    this.loadQuestion();
    this.explanationSection.style.display = "none";
  }

  finishQuiz() {
    alert(`You got ${this.score} out of ${this.totalQuestions}`);
  }

  selectAnswer(selectedIndex) {
    if (this.isAnswered) return;
    const question = QUESTIONS[this.currentQuestion];
    const correctIndex = question.correct;
    this.isAnswered = true;
    if (selectedIndex === correctIndex) {
      this.score++;
      this.scoreDigit.textContent = this.score;
    }
    this.explanationText.innerHTML = question.explanation;
    this.explanationSection.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Quiz();
});

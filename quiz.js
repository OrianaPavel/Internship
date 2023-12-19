let questions;
let userScore = 0;
let questionAnswered = 0;
let currentQuestion;

// Fetch questions from JSON file
fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data.questions;
    startQuiz();
  })
  .catch(error => console.error('Error fetching questions:', error));

function startQuiz() {
  getRandomQuestion();
}

function getRandomQuestion() {
  if (questions.length === 0) {
    endQuiz();
  } else {
    let randomIndex = Math.floor(Math.random() * questions.length);
    currentQuestion = questions[randomIndex];

    questions.splice(randomIndex, 1);

    displayQuestion(currentQuestion);
  }
}

function displayQuestion(question) {
  const questionTextElement = document.getElementById('question-text');
  const optionsForm = document.getElementById('options-form');
  const scoreElement = document.getElementById('user-score');

  questionTextElement.textContent = question.questionText;
  optionsForm.innerHTML = '';

  question.choices.forEach((choice, index) => {
    const optionLabel = document.createElement('label');
    optionLabel.innerHTML = `
      <input type="radio" name="options" value="${index}">
      ${choice}
    `;
    optionsForm.appendChild(optionLabel);
  });

  scoreElement.textContent = userScore + " out of " + questionAnswered + " questions answered";
}

function submitAnswer() {
  const optionsForm = document.getElementById('options-form');
  const selectedOption = optionsForm.querySelector('input[name="options"]:checked');

  if (selectedOption !== null) {
    const selectedOptionIndex = parseInt(selectedOption.value, 10);
    const correctAnswerIndex = currentQuestion.correctAnswer;

    if (selectedOptionIndex === correctAnswerIndex) {
      userScore++;
    }
    questionAnswered++;
    getRandomQuestion();
  } else {
    alert('Please select an option before submitting.');
  }
}

function endQuiz() {
  const quizContainer = document.getElementById('quiz-container');
  quizContainer.innerHTML = `<h2>Quiz Completed!</h2><p>Your final score is: ${userScore}</p>`;
}

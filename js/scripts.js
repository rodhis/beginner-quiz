const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

// Perguntas
const questions = [
  {
    question: "PHP foi desenvolvido para qual fim?",
    answers: [
      {
        answer: "back-end",
        correct: true,
      },
      {
        answer: "front-end",
        correct: false,
      },
      {
        answer: "Sistema operacional",
        correct: false,
      },
      {
        answer: "Banco de dados",
        correct: false,
      },
    ],
  },
  {
    question: "Uma forma de declarar variável em JavaScript:",
    answers: [
      {
        answer: "$var",
        correct: false,
      },
      {
        answer: "var",
        correct: true,
      },
      {
        answer: "@var",
        correct: false,
      },
      {
        answer: "!var",
        correct: false,
      },
    ],
  },
  {
    question: "Qual o seletor de id no CSS?",
    answers: [
      {
        answer: "#",
        correct: true,
      },
      {
        answer: ".",
        correct: false,
      },
      {
        answer: "@",
        correct: false,
      },
      {
        answer: "/",
        correct: false,
      },
    ],
  },
  {
    question: "Qual uma característica bem marcante em Java?",
    answers: [
      {
        answer: "Flexibilidade de variáveis",
        correct: false,
      },
      {
        answer: "Fortemente tipado",
        correct: true,
      },
      {
        answer: "Similaridade com JavaScript",
        correct: false,
      },
      {
        answer: "Fácil para usar com front-end",
        correct: false,
      },
    ],
  },
  {
    question: "O que é API?",
    answers: [
      {
        answer: "A aplicação final após desenvolvimento",
        correct: false,
      },
      {
        answer: "Acesso ao Programa Inteligente",
        correct: false,
      },
      {
        answer:
          "Funcionalidades que geram a comunicação entre o front e o back-end",
        correct: true,
      },
      {
        answer: "Protocolo padrão para frameworks",
        correct: false,
      },
    ],
  },
  {
    question: "Quais os principais usos da linguagem Python?",
    answers: [
      {
        answer: "Front-End, Cloud",
        correct: false,
      },
      {
        answer: "Back-End, Desenvolvimento de Software",
        correct: false,
      },
      {
        answer: "Automação, Banco de Dados",
        correct: false,
      },
      {
        answer: "Ciência de Dados, Automação",
        correct: true,
      },
    ],
  },
  {
    question: "Em HTML, o que faz a tag <div>?",
    answers: [
      {
        answer: "Introduz uma linha divisória entre partes de sua página",
        correct: false,
      },
      {
        answer:
          "Introduz um contêiner genérico com uma divisão exata na página",
        correct: true,
      },
      {
        answer: "Inicia uma caixa de texto grande",
        correct: false,
      },
      {
        answer: "Seletor de identificação para estilos no CSS",
        correct: false,
      },
    ],
  },
  {
    question:
      "HTML, CSS e JavaScript são responsáveis em uma página web, respectivamente, por:",
    answers: [
      {
        answer: "Conteúdo, estilo, interação",
        correct: true,
      },
      {
        answer: "Interação, estilo, conteúdo",
        correct: false,
      },
      {
        answer: "Estilo, conteúdo, interação",
        correct: false,
      },
      {
        answer: "Interação, estilo, conteúdo",
        correct: false,
      },
    ],
  },
  {
    question: "Para quê serve um banco de dados?",
    answers: [
      {
        answer: "Para que os dados possam descansar",
        correct: false,
      },
      {
        answer: "Para guardar os objetos usados no jogo da sua aplicação",
        correct: false,
      },
      {
        answer: "Para guardar informações diversas do seu sistema/site",
        correct: true,
      },
      {
        answer: "Para realizar comunicação servidor - servidor",
        correct: false,
      },
    ],
  },
  {
    question:
      "O que significa a expressão 'imprimir', usada em todas as linguagens de programação?",
    answers: [
      {
        answer:
          "Enviar comando para a impressora imprimir seu código numa folha",
        correct: false,
      },
      {
        answer: "Salvar o código numa pasta do seu computador",
        correct: false,
      },
      {
        answer: "Realizar um teste para verificar a validade do código",
        correct: false,
      },
      {
        answer:
          "Mostrar no console o especificado no comando de impressão da linguagem",
        correct: true,
      },
    ],
  },
];

function init() {
  createQuestion();
}

// Create a question
function createQuestion() {
  const oldButtons = answersBox.querySelectorAll("button");

  oldButtons.forEach(function (btn) {
    btn.remove();
  });

  // Altera texto da pergunta
  const questionText = question.querySelector("#question-text");
  const questionNumber = question.querySelector("#question-number");

  const i = Math.floor(Math.random() * questions.length);

  questionText.textContent = questions[i].question;
  questionNumber.textContent++;

  // Insere alternativas
  questions[i].answers.forEach(function (answer, i) {
    const answerTemplate = document
      .querySelector(".answer-template")
      .cloneNode(true);

    const letterBtn = answerTemplate.querySelector(".btn-letter");
    const answerText = answerTemplate.querySelector(".question-answer");

    letterBtn.textContent = letters[i];
    answerText.textContent = answer["answer"];

    answerTemplate.setAttribute("correct-answer", answer["correct"]);

    answerTemplate.classList.remove("hide");
    answerTemplate.classList.remove("answer-template");

    answersBox.appendChild(answerTemplate);
  });

  // Cria evento em todos os botões
  const buttons = answersBox.querySelectorAll("button");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      checkAnswer(this, buttons);
    });
  });

  // Incrementa o número atual de questões
  actualQuestion++;
}

// Verificando se resposta está correta
function checkAnswer(btn, buttons) {
  // Exibir respostas erradas e a certa
  buttons.forEach(function (button) {
    if (button.getAttribute("correct-answer") === "true") {
      button.classList.add("correct-answer");
      if (btn === button) {
        points++;
      }
    } else {
      button.classList.add("wrong-answer");
    }
  });

  nextQuestion();
}

// Exibe a próxima pergunta
function nextQuestion() {
  // Timer para ver se acertou ou errou
  setTimeout(function () {
    if (actualQuestion >= questions.length) {
      showSuccessMessage();
      return;
    }

    createQuestion(actualQuestion);
  }, 1000);
}

// Tela final
function showSuccessMessage() {
  hideOrShowQuizz();

  // calc score
  const score = ((points / questions.length) * 100).toFixed(2);
  const scoreDisplay = document.querySelector("#display-score span");

  scoreDisplay.textContent = score.toString();

  const correctAnswers = document.querySelector("#correct-answers");
  correctAnswers.textContent = points;

  const totalQuestions = document.querySelector("#questions-qty");
  totalQuestions.textContent = questions.length;
}

// Reiniciar Quizz
const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", function () {
  actualQuestion = 0;
  points = 0;
  hideOrShowQuizz();
  init();
});

function hideOrShowQuizz() {
  quizzContainer.classList.toggle("hide");
  scoreContainer.classList.toggle("hide");
}

// Inicialização
init();

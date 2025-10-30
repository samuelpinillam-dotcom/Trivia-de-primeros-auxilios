function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const questions = [
  {
    q: "¿Cuál es la secuencia correcta al atender a una persona inconsciente?",
    c: [
      "Verificar seguridad, comprobar respuesta, pedir ayuda, evaluar respiración",
      "Moverlo y darle agua",
      "Tomar una foto y esperar ayuda",
      "Cubrirlo con una manta y no tocarlo"
    ],
    a: "Verificar seguridad, comprobar respuesta, pedir ayuda, evaluar respiración"
  },
  {
    q: "Si una persona está sangrando mucho por una herida en el brazo, ¿qué debes hacer primero?",
    c: [
      "Aplicar presión directa sobre la herida con un paño limpio",
      "Lavar con alcohol o agua oxigenada",
      "Quitar cualquier objeto dentro de la herida",
      "Colocar hielo sobre la herida"
    ],
    a: "Aplicar presión directa sobre la herida con un paño limpio"
  },
  {
    q: "En caso de quemadura por agua caliente, ¿qué acción es la más adecuada?",
    c: [
      "Enfriar con agua a temperatura ambiente durante 10-20 minutos",
      "Aplicar crema dental o mantequilla",
      "Romper las ampollas",
      "Cubrir con un plástico ajustado"
    ],
    a: "Enfriar con agua a temperatura ambiente durante 10-20 minutos"
  },
  {
    q: "Si una persona se atraganta y no puede hablar ni respirar, ¿qué maniobra se debe realizar?",
    c: [
      "Maniobra de Heimlich",
      "Reanimación cardiopulmonar (RCP)",
      "Golpes en la cabeza",
      "Colocar hielo en el pecho"
    ],
    a: "Maniobra de Heimlich"
  },
  {
    q: "¿Cuál es la posición correcta para una persona inconsciente pero que respira?",
    c: [
      "Posición lateral de seguridad",
      "Boca arriba con las piernas levantadas",
      "De pie apoyado en una pared",
      "Boca abajo con los brazos extendidos"
    ],
    a: "Posición lateral de seguridad"
  }
];

let randomizedQuestions = [];
let current = 0;
let score = 0;
let answered = false;
let timer, timeLeft = 15;

const startBtn = document.getElementById("start-btn");
const trivia = document.getElementById("trivia");
const intro = document.getElementById("intro");
const questionEl = document.getElementById("question");
const choices = document.getElementById("choices");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const points = document.getElementById("points");
const resultSection = document.getElementById("result");
const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");

const timerDisplay = document.createElement("div");
timerDisplay.id = "timer";
timerDisplay.style.fontWeight = "bold";
timerDisplay.style.color = "#2563eb";
timerDisplay.style.marginTop = "10px";
document.querySelector(".container").appendChild(timerDisplay);

startBtn.onclick = startTrivia;
nextBtn.onclick = nextQuestion;
restartBtn.onclick = startTrivia;

function startTrivia() {
  randomizedQuestions = shuffle([...questions]);
  current = 0;
  score = 0;
  answered = false;
  points.textContent = score;
  intro.classList.add("hidden");
  trivia.classList.remove("hidden");
  resultSection.classList.add("hidden");
  showQuestion();
}

function showQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  updateTimer();
  timer = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(timer);
      markTimeout();
    }
  }, 1000);

  answered = false;
  nextBtn.classList.add("hidden");
  restartBtn.classList.add("hidden");

  const q = randomizedQuestions[current];
  questionEl.textContent = q.q;
  choices.innerHTML = "";

  const shuffledChoices = shuffle([...q.c]); // 👈 baraja las respuestas
  shuffledChoices.forEach(choiceText => {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.textContent = choiceText;
    btn.onclick = () => selectAnswer(btn, q.a);
    choices.appendChild(btn);
  });
}

function updateTimer() {
  timerDisplay.textContent = `⏱️ Tiempo: ${timeLeft}s`;
}

function markTimeout() {
  answered = true;
  document.querySelectorAll(".choice").forEach(b => {
    b.classList.add("wrong");
    b.disabled = true;
  });
  nextBtn.classList.remove("hidden");
}

function selectAnswer(btn, correctText) {
  if (answered) return;
  answered = true;
  clearInterval(timer);

  const btns = choices.querySelectorAll(".choice");
  btns.forEach(b => {
    if (b.textContent === correctText) b.classList.add("correct");
    else if (b === btn) b.classList.add("wrong");
    b.disabled = true;
  });

  if (btn.textContent === correctText) {
    score++;
    points.textContent = score;
  }

  if (current < randomizedQuestions.length - 1) nextBtn.classList.remove("hidden");
  else setTimeout(showFinal, 800);
}

function nextQuestion() {
  current++;
  showQuestion();
}

function showFinal() {
  trivia.classList.add("hidden");
  resultSection.classList.remove("hidden");
  clearInterval(timer);
  timerDisplay.textContent = "";
  const total = randomizedQuestions.length;
  const percent = Math.round((score / total) * 100);
  if (percent >= 75) {
    resultTitle.textContent = "¡Ganaste la trivia! 🏆";
    resultMessage.textContent = `Tu puntaje fue de ${score}/${total} (${percent}%)`;
  } else {
    resultTitle.textContent = "¡Sigue practicando! 💪";
    resultMessage.textContent = `Tu puntaje fue de ${score}/${total} (${percent}%)`;
  }
}

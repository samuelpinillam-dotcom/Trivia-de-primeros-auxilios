// Trivia 2: Seguridad y Prevención
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const questions = [
  {
    q: "¿Qué debes hacer si ves cables eléctricos rotos en la calle?",
    c: ["No tocarlos y avisar a un adulto o autoridad","Cogerlos para apartarlos","Pasar por encima","Ignorarlos"],
    a: "No tocarlos y avisar a un adulto o autoridad"
  },
  {
    q: "Si hay humo o fuego en el colegio, ¿qué debes hacer?",
    c: ["Salir en orden hacia la salida de emergencia","Gritar y correr","Regresar a buscar tus cosas","Esconderte en el baño"],
    a: "Salir en orden hacia la salida de emergencia"
  },
  {
    q: "¿Cuál es el número de emergencias en Colombia?",
    c: ["123","911","101","999"],
    a: "123"
  },
  {
    q: "¿Qué debes usar al andar en bicicleta?",
    c: ["Casco y elementos reflectivos","Gorra","Lentes de sol","Reloj deportivo"],
    a: "Casco y elementos reflectivos"
  },
  {
    q: "Si alguien te ofrece ir a un lugar sin tus padres, ¿qué haces?",
    c: ["Dices que no y avisas a un adulto de confianza","Aceptas si parece amable","Solo vas un momento","Lo ignoras y te vas sin decir nada"],
    a: "Dices que no y avisas a un adulto de confianza"
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
timerDisplay.style.color = "#15803d";
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

  const shuffledChoices = shuffle([...q.c]); // 👈 baraja opciones
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
    resultTitle.textContent = "¡Ganaste la trivia! 🛡️";
    resultMessage.textContent = `Puntaje: ${score}/${total} (${percent}%)`;
  } else {
    resultTitle.textContent = "¡Sigue aprendiendo sobre seguridad! 💪";
    resultMessage.textContent = `Puntaje: ${score}/${total} (${percent}%)`;
  }
}

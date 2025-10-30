// Trivia 3: Auxiliares y Trabajo en Equipo
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const questions = [
  { q: "¿Qué significa ser un buen auxiliar o compañero?", c: ["Ayudar y apoyar a los demás cuando lo necesitan","Reírse si alguien se equivoca","Hacer todo solo sin escuchar","Ignorar a los demás"], a: "Ayudar y apoyar a los demás cuando lo necesitan" },
  { q: "Si ves que un amigo se siente triste, ¿qué deberías hacer?", c: ["Escucharlo y ofrecer apoyo","Burlarte para animarlo","Ignorarlo","Contarle a todos lo que le pasa"], a: "Escucharlo y ofrecer apoyo" },
  { q: "Cuando trabajas en grupo, ¿qué es importante?", c: ["Cooperar y respetar las ideas de todos","Querer ser el jefe siempre","No dejar hablar a los demás","Trabajar solo"], a: "Cooperar y respetar las ideas de todos" },
  { q: "Si alguien nuevo llega a clase, ¿qué sería correcto hacer?", c: ["Darle la bienvenida y presentarle a los demás","Ignorarlo","Reírte de él","No dejarlo participar"], a: "Darle la bienvenida y presentarle a los demás" },
  { q: "¿Por qué es importante ayudar en casa o en la comunidad?", c: ["Porque todos debemos colaborar y aprender a ser solidarios","Porque quiero un premio","Porque lo dice un amigo","Porque no tengo nada más que hacer"], a: "Porque todos debemos colaborar y aprender a ser solidarios" }
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
timerDisplay.style.color = "#ea580c";
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

  const shuffledChoices = shuffle([...q.c]); // 👈 baraja respuestas
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
    resultTitle.textContent = "¡Excelente ayudante! 🤝";
    resultMessage.textContent = `Puntaje: ${score}/${total} (${percent}%)`;
  } else {
    resultTitle.textContent = "¡Sigue practicando la cooperación! 💪";
    resultMessage.textContent = `Puntaje: ${score}/${total} (${percent}%)`;
  }
}

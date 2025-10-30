
document.getElementById("contact-form").addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const feedback = document.getElementById("feedback");

  if (!name || !email || !message) {
    feedback.textContent = "Por favor completa todos los campos.";
    feedback.style.color = "red";
    feedback.classList.remove("hidden");
    return;
  }

  feedback.textContent = "¡Mensaje enviado correctamente!";
  feedback.style.color = "green";
  feedback.classList.remove("hidden");

  setTimeout(() => feedback.classList.add("hidden"), 4000);
  e.target.reset();
});

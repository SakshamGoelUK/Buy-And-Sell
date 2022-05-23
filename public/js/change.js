console.log(performance.getEntriesByType("navigation")[0].type);
if (performance.getEntriesByType("navigation")[0].type === "back_forward") {
  location.reload(true);
}
const feedback = document.querySelector(".invalid-feedback");
const feedback1 = document.querySelector(".valid-feedback");
const password = document.querySelector("#new");
const confirmed = document.querySelector("#confirmed");
const submission = document.querySelector("#submission");
const button1 = document.querySelector("#submit");

const match = () => {
  if (password.value.length == 0 || confirmed.value.length == 0) {
    feedback.style.display = "block";
    feedback1.style.display = "none";
    feedback.innerText = "One or more fields empty.";
  } else if (password.value != confirmed.value) {
    feedback.style.display = "block";
    feedback1.style.display = "none";
    feedback.innerText = "Passwords do not Match";
  } else if (password.value === confirmed.value) {
    feedback1.style.display = "block";
    feedback.style.display = "none";
  }
};
const validate = () => {
  if (password.value === confirmed.value && password.value.length != 0) {
    submission.submit();
  }
};
window.addEventListener("keyup", match);

button1.addEventListener("click", validate);

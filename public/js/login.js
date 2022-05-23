console.log(performance.getEntriesByType("navigation")[0].type);
if (performance.getEntriesByType("navigation")[0].type === "back_forward") {
  location.reload(true);
}
const stage = document.querySelector(".stage");
const password = document.querySelector("#password");
const check = document.querySelector("#check");
check.addEventListener("click", () => {
  if (check.checked == true) {
    password.setAttribute("type", "text");
  } else {
    password.setAttribute("type", "password");
  }
});

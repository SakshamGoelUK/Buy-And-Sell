console.log(performance.getEntriesByType("navigation")[0].type);
if (performance.getEntriesByType("navigation")[0].type === "back_forward") {
  location.reload(true);
}
let code = document.querySelector("#code");
const email = document.querySelector(".email");
const email_submit = document.querySelector("#email_submit");
let email_status = document.querySelector(".helper").innerText;
const timer = document.querySelector(".timer");
let emailtime = document.querySelector(".emailtimer").innerText;
email_submit.addEventListener("click", () => {
  email.submit();
});
let time = parseInt(emailtime);
const timer1 = () => {
  if (email_status == "true" && time == 60) {
    email_submit.setAttribute("class", "btn btn-primary");
    timer.innerText = `💡Didnt get the code? Get a new one.`;
  } else if (time > 0 && email_status == "false") {
    email_submit.setAttribute("class", "btn btn-primary disabled");
    time = time - 1;
    timer.innerText = `Next email can be sent in ${time} seconds.`;
  } else if (time == 0) {
    email_status = "true";
    time = 60;
  }
};
const time_interval1 = setInterval(timer1, 1000);
new PincodeInput(".pincode-input-container", {
  count: 4,
  secure: false,
  previewDuration: 200,
  numeric: true,
  secure: true,
  onInput: (value1) => {
    code.value = value1;
  },
});

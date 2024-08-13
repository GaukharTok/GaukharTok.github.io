// let sum = 0;
// for (let i = 1; i <= 9; i++) {
//   sum += i;
// }
// console.log(sum);

const button = document.createElement("button");
const div = document.getElementById("main");
button.textContent = "View my Works";
button.className = "button-style";

button.addEventListener("click", () => {
  window.location.href = "https://www.google.com";
});

div.getElementById("aboutMe").appendChild(button);

const tasks = [];
const ul = document.querySelector("ul");
const input = document.querySelector("input");
const addBtn = document.querySelector("button");
const h2 = document.querySelector("h2");

function checkTasks() {
  if (tasks.length === 0) {
    h2.style.visibility = "visible";
  } else {
    h2.style.visibility = "hidden";
  }
}
function renderTasks() {
  checkTasks();
  ul.innerHTML = "";
  tasks.forEach(({ id, status, title }) => {
    const li = `<li>
            <span>#${id}</span>
            <span>${title}</span>
            <span>${status}</span>
            <button id = ${id}>Delete</button>
        </li>`;
    ul.insertAdjacentHTML("beforeend", li);
  });
  document.querySelectorAll("li button").forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      tasks.splice(index, 1);
      renderTasks();
    });
  });
}

renderTasks();
addBtn.addEventListener("click", () => {
  const newTask = {
    id: tasks.length + 1,
    title: input.value,
    status: "done",
  };
  tasks.push(newTask);
  renderTasks();
  input.value = "";
});

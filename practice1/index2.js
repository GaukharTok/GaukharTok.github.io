const url = "https://solar-poised-salad.glitch.me/todos";

const myInput = document.querySelector("input");
const myBtn = document.querySelector("button");
const notification = document.querySelector(".alert");
const ul = document.querySelector("ul");

const render = (todos) => {
  ul.innerHTML = "";
  todos.forEach((element) => {
    const li = `<li>${element.title} <input type="checkbox" ${
      element.completed ? "checked" : ""
    } /> <button class="edit-btn" data-index="${
      element.id
    }">Edit</button></li>`;
    ul.insertAdjacentHTML("beforeend", li);
  });

  const editBtns = document.querySelectorAll(".edit-btn");

  editBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {});
  });
};
// render todos function
const getTodos = () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => render(data))
    .catch((error) => console.log(error));
};

getTodos();

//
const addTodo = () => {
  // logic for adding todo to database
  const todo = {
    title: myInput.value,
    completed: false,
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  })
    .then((res) => res.json())
    .then(() => {
      myInput.value = "";
      const p = document.createElement("p");
      p.textContent = "Todo successfully added";
      notification.prepend(p);
      notification.style.display = "flex";

      setTimeout(() => {
        notification.style.display = "none";
      }, 3000);

      getTodos();
    })
    .catch((error) => console.log(error));
};

myBtn.addEventListener("click", addTodo);

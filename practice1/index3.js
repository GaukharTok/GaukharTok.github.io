// document.addEventListener("DOMContentLoaded", function () {
//   const apiUrl =
//     "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/rub.json";
//   let rates = {};

//   // Fetch currency rates from API
//   fetch(apiUrl)
//     .then((response) => response.json())
//     .then((data) => {
//       rates = data;
//     })
//     .catch((error) => console.error("Error fetching currency rates:", error));

//   const calculateButton = document.getElementById("calculate");
//   const clearButton = document.getElementById("clear");
//   const resultDiv = document.getElementById("result");

//   calculateButton.addEventListener("click", function () {
//     const amount = parseFloat(document.getElementById("amount").value);
//     const fromCurrency = document.getElementById("from").value;
//     const toCurrency = document.getElementById("to").value;

//     if (isNaN(amount) || !rates[fromCurrency] || !rates[toCurrency]) {
//       resultDiv.textContent =
//         "Please enter a valid amount and select currencies.";
//       return;
//     }

//     const fromRate = rates[fromCurrency];
//     const toRate = rates[toCurrency];
//     const convertedAmount = (amount / fromRate) * toRate;

//     resultDiv.textContent = `Converted Amount: ${convertedAmount.toFixed(
//       2
//     )} ${toCurrency.toUpperCase()}`;
//   });

//   clearButton.addEventListener("click", function () {
//     document.getElementById("amount").value = "";
//     document.getElementById("from").value = "usd";
//     document.getElementById("to").value = "usd";
//     resultDiv.textContent = "";
//   });
// });

const url = "https://solar-poised-salad.glitch.me/todos";

const myBtn = document.querySelector("button");
const myInput = document.querySelector("input");
const notification = document.querySelector(".alert ");
const ul = document.querySelector("ul");
const saveBtn = document.querySelector("#save");
const changingTodo = null;

const render = (todos) => {
  ul.innerHTML = "";
  todos.forEach((element) => {
    const li = `<li>${element.title} <input type = "checkbox" ${
      element.completed ? "checked" : ""
    }/><button class = "edit-btn" data-index ="${
      element.id
    }">Edit</button></li>`;
    ul.insertAdjacentHTML("beforeend", li);
  });
  const editBtn = document.querySelectorAll(".edit-btn");

  editBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // console.log(e.target.id);
      const changingTodo = todos.find(
        (todo) => todo.id === parseInt(e.target.dataset.index)
      );
      console.log(changingTodo);

      myInput.value = changingTodo.title;
    });
  });
};

// render toDos function

const getTodos = () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => render(data))
    .catch((error) => console.log(error));
};
getTodos();

const addTodo = () => {
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
      p.textContent = "ToDo succefully added";
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

const updateTodo = () => {
  if (changingTodo !== null) {
    const updatedTodo = {
      title: myInput.value,
      completed: false,
    };
    fetch(url + "/" + changingTodo.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    })
      .then((res) => res.json())
      .then((data) => getTodos())
      .catch((error) => console.log(error));
  }
};
saveBtn.addEventListener("click", updateTodo);

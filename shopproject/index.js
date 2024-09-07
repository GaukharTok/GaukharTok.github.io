const inputImage = document.querySelector("#image");
const inputTitle = document.querySelector("#titleProduct");
const inputDescription = document.querySelector("#description");
const inputPrice = document.querySelector("#priceInput");

const inputCategory = document.querySelector("#categoryInput");

const addBtn = document.querySelector("#add");

const url = "https://solar-poised-salad.glitch.me/gaukhar";

addBtn.addEventListener("click", () => {
  const product = {
    imageUrl: inputImage.value,
    title: inputTitle.value,
    description: inputDescription.value,
    category: inputCategory.value,
    price: inputPrice.value,
  };

  addTovar(product);
});
// console.log("Sending product:", product);
// console.log("Title:", inputTitle.value);
// console.log("Description:", inputDescription.value);

const addTovar = async (product) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    await response.json();
  } catch (error) {
    console.log(error);
  }
};

// const getData = async () => {
//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     render(data);
//   } catch (error) {
//     console.log(error);
//   }
// };

// const myInput = document.querySelector("input");
// const myBtn = document.querySelector("button");
// const notification = document.querySelector(".alert");
// const ul = document.querySelector("ul");
// const modal = document.getElementById("myModal");
// const titleInput = document.querySelector(".title");
// const statusInput = document.querySelector(".status");
// const saveBtn = document.querySelector(".save");
// let currentTodoId = null;

// // Function to render the list of todos
// const render = (todos) => {
//   ul.innerHTML = "";
//   todos.forEach((element) => {
//     const li = `
//       <li>
//         ${element.title}
//         <input type="checkbox" ${element.completed ? "checked" : ""} />
//         <button class="edit-btn" data-id="${element.id}">Edit</button>
//       </li>`;
//     ul.insertAdjacentHTML("beforeend", li);
//   });

//   // Attach event listeners to edit buttons
//   const editBtns = document.querySelectorAll(".edit-btn");
//   editBtns.forEach((btn) => {
//     btn.addEventListener("click", (e) => {
//       currentTodoId = e.target.getAttribute("data-id");
//       openModal(currentTodoId);
//     });
//   });
// };

// // Function to open the modal and populate it with the selected todo data
// const openModal = (id) => {
//   fetch(`${url}/${id}`)
//     .then((response) => response.json())
//     .then((todo) => {
//       titleInput.value = todo.title;
//       statusInput.checked = todo.completed;
//       modal.style.display = "block";
//     })
//     .catch((error) => console.log("Error fetching todo:", error));
// };

// // Function to update the selected todo
// const updateTodo = () => {
//   const updatedTodo = {
//     title: titleInput.value,
//     completed: statusInput.checked,
//   };

//   fetch(`${url}/${currentTodoId}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(updatedTodo),
//   })
//     .then((res) => res.json())
//     .then(() => {
//       modal.style.display = "none";
//       getTodos();
//     })
//     .catch((error) => console.log("Error updating todo:", error));
// };

// // Fetch and render the list of todos
// const getTodos = () => {
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => render(data))
//     .catch((error) => console.log("Error fetching todos:", error));
// };

// // Function to add a new todo
// const addTodo = () => {
//   const todo = {
//     title: myInput.value,
//     completed: false,
//   };

//   fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(todo),
//   })
//     .then((res) => res.json())
//     .then(() => {
//       myInput.value = "";
//       displayNotification("Todo successfully added");
//       getTodos();
//     })
//     .catch((error) => console.log("Error adding todo:", error));
// };

// // Function to display notifications
// const displayNotification = (message) => {
//   const p = document.createElement("p");
//   p.textContent = message;
//   notification.prepend(p);
//   notification.style.display = "flex";
//   setTimeout(() => {
//     notification.style.display = "none";
//   }, 3000);
// };

// // Attach event listeners
// myBtn.addEventListener("click", addTodo);
// saveBtn.addEventListener("click", updateTodo);

// // Close modal when user clicks on the close button
// const span = document.getElementsByClassName("close")[0];
// span.onclick = function () {
//   modal.style.display = "none";
// };

// // Close modal when user clicks outside of it
// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// };

// // Initialize by fetching todos
// getTodos();

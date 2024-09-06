const url = "https://solar-poised-salad.glitch.me/products/";
const divForCarts = document.querySelector(".div");

const addBtn = document.querySelector("#addBtn");
const urlImg = document.querySelector("#inputImage");
const title = document.querySelector("#inputTitle");
const description = document.querySelector("#inputDescription");
const urlPrice = document.querySelector("#inputPrice");
// const deleteBtn = document.querySelector("#addBtn");
// const editBtn = document.querySelector("#addBtn");

// fetch(url)
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// const body = document.querySelector("body");
async function myProducts() {
  try {
    const res = await fetch(url); // словили промис
    const data = await res.json(); // сконвертировали промис, ответ с сервера в читаемый вид
    console.log(data);
    showProducts(data); // функция снизу распечатать данные
  } catch (error) {
    console.log(error);
  }
}

myProducts();

function showProducts(products) {
  // f не содержит данных
  products.forEach((el) => {
    const element = document.createElement("div");
    element.classList.add("mainDiv");
    const tovar = `
    <div class = "container">
    <img class = "image" src="${el.imageUrl}" alt="" />
    <p class ="title">${el.title}</p>
    <p class = "description">${el.description}</p>
    <p class = "price">${el.price}</p>
  </div>

    `;
    element.insertAdjacentHTML("beforeend", tovar);
    divForCarts.appendChild(element);
  });
}

addBtn.addEventListener("click", () => {
  //   console.log("log blabla");
  const newObj = {
    imageUrl: urlImg.value,
    title: title.value,
    description: description.value,
    price: urlPrice.value,
  };
  newProduct(newObj);
});

function newProduct(obj) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}

// const url = "https://solar-poised-salad.glitch.me/products/";
// const divForCarts = document.querySelector(".div");

// const inputImg = document.querySelector("#inpitImage");
// const inputTitle = document.querySelector("#inputTitle");
// const inputTitle = document.querySelector("#inputTitle");
// const inputDes = document.querySelector("#inpitDescription");
// const inputPrice = document.querySelector("#inputPrice");
// const addBtn = document.querySelector("#addBtn");

// async function myProducts() {
//   try {
//     const responce = await fetch(url);
//     const data = await responce.json();
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// }

// myProducts();

// function showProducts(products) {
//   myProducts.forEach((el) => {
//     const element = document.createElement("div");
//     element.classList.add("mainDiv");
//     const items = `
//     <div class ="mainDiv"
//     <img class = "image" src="${el.imageUrl}" alt="" />
//     //     <p class ="title">${el.title}</p>
//     //     <p class = "description">${el.description}</p>
//     //     <p class = "price">${el.price}</p>
//     </div>
//     `;
//   });
// }

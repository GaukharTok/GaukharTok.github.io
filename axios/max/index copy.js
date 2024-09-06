const url = "https://solar-poised-salad.glitch.me/products/";

const divForCarts = document.createElement("div");
document.body.appendChild(divForCarts);
const inputImg = document.querySelector("#inputImage");
const inputTitle = document.querySelector("#inputTitle");
const inputDes = document.querySelector("#inputDescription");
const inputPrice = document.querySelector("#inputPrice");
const addBtn = document.querySelector("#addBtn");

const getData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    render(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

getData();

// function render(products) {
//   divForCarts.innerHTML = "";
//   products.forEach((el) => {
//     const element = document.createElement("div");
//     element.classList.add("mainDiv");
//     const tovar = `
//   <div class = "container">
//       <img class = "image" src = "${el.imageUrl}" alt = ""/>
//       <p class = "title" ${el.title}></p>
//       <p class = "description" ${el.description}></p>
//       <p class = "price" ${el.price}></p>
//       <button>Edit</button>
//       <button>Delete</button>
//       </div>
// `;
//     element.insertAdjacentHTML("beforeend", tovar);
//     divForCarts.appendChild(element);
//     document.body.appendChild(divForCarts);
//   });
// }

function render(products) {
  divForCarts.innerHTML = "";
  products.forEach((product) => {
    const element = document.createElement("div");
    element.classList.add("mainDiv");
    const tovar = `
    <div class = "container">
 <img class ="image" src = "${product.imageUrl}"/>
 <p class = "title">${product.title}</p>
 <p class = "description">${product.description}</p>
 <p class = "price">${product.price}</p>
 <button>Edit</button>
 <button>Delete</button>
 </div>
 `;

    element.insertAdjacentHTML("beforeend", tovar);
    divForCarts.appendChild(element);
  });
}

addBtn.addEventListener("click", () => {
  const newObj = {
    imageUrl: inputImg.value,
    title: inputTitle.value,
    description: inputDes.value,
    price: inputPrice.value,
  };
  newProduct(newObj);
});

function newProduct(obj) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}

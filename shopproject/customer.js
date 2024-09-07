const url = "https://solar-poised-salad.glitch.me/gaukhar/";
const productList = document.querySelector(".productList");
const modal = document.querySelector(".modal");
const modalCloseButton = document.querySelector(".modal .close");
const modalSaveButton = document.querySelector(".modal .save");
const imageUrlInput = document.querySelector("#image-url-modal");
const titleInput = document.querySelector("#product-title-modal");
const descriptionInput = document.querySelector("#description-modal");
const priceInput = document.querySelector("#price-modal");
let currentProductId = null;

// get data
async function fetchProducts() {
  try {
    const response = await fetch(url);
    const products = await response.json();
    renderProduct(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

fetchProducts();

// render function
function renderProduct(products) {
  productList.innerHTML = "";
  products.forEach((product) => {
    const displayProduct = `
      <div class="item">
        <div class="img">
          <img src="${product.imageUrl}" alt="">
        </div>
        <div class="price">
          <p class="titleProduct">${product.title}</p>
          <p class = "titleDescription">${product.description}</p>
          <span class = "categoryProduct">${product.category}</span>
          <p class = "priceCategory"><span>${product.price}</span></p>
          <div class="priceBtn">
            <button class='addToCart' data-id='${product.id}'></i>Add to Cart</button>
           
          </div>
        </div>
      </div>
    `;
    productList.insertAdjacentHTML("beforeend", displayProduct);
  });
  attachEventListeners();
}

// search function

function search() {
  const query = document.getElementById("search").value.toLowerCase();
  const items = document.querySelectorAll(".productList .item");

  items.forEach((item) => {
    const title = item.querySelector(".titleProduct").textContent.toLowerCase();
    const description = item
      .querySelector(".titleDescription")
      .textContent.toLowerCase();

    if (title.includes(query) || description.includes(query)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

document.getElementById("search").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    search();
  }
});

//
document.querySelector(".poisk").addEventListener("click", function () {
  search();
});

function attachEventListeners() {
  document.querySelectorAll(".addToCart").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.getAttribute("data-id");
      addToCart(productId);
    });
  });
}

function addToCart(productId) {
  fetch(`${url}${productId}`)
    .then((response) => response.json())
    .then((product) => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingProductIndex = cart.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
      } else {
        product.quantity = 1;
        cart.push(product);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Product added to cart!");
    })
    .catch((error) => console.error("Error adding to cart:", error));
}

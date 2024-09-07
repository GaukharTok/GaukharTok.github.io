const cartItemsContainer = document.getElementById("cartItems");
const url = "https://solar-poised-salad.glitch.me/gaukhar/";

async function fetchProducts() {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function renderCart(products) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItems = cart
    .map((cartItem) => {
      const product = products.find((product) => product.id === cartItem.id);
      return `
      <div class="cart-item">
        <img src="${product.imageUrl}" alt="${product.title}">
        <div>
          <p>${product.title}</p>
          <p>${product.price}</p>
          <p>Quantity: ${cartItem.quantity}</p>
        </div>
        <button class="remove-button" onclick="removeFromCart(${product.id})">Remove from Cart</button>
      </div>
    `;
    })
    .join("");
  cartItemsContainer.innerHTML = cartItems;
}

async function updateCart() {
  const products = await fetchProducts();
  renderCart(products);
}

async function removeFromCart(productId) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const updatedCart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  updateCart();
}

updateCart();

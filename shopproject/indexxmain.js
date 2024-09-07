document.addEventListener("DOMContentLoaded", function () {
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

  // Fetch products from the server
  async function fetchProducts() {
    try {
      const response = await fetch(url);
      const products = await response.json();
      renderProduct(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  // Render products to the DOM
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
            <p class="titleDescription">${product.description}</p>
            <span class="categoryProduct">${product.category}</span>
            <p class="priceCategory"><span>${product.price}</span></p>
            <div class="priceBtn">
              <button class='edit' data-id='${product.id}'><i class="fa-solid fa-pen"></i>Edit</button>
              <button class="delete" data-id='${product.id}'><i class="fa-solid fa-trash"></i>Delete</button>
            </div>
          </div>
        </div>
      `;
      productList.insertAdjacentHTML("beforeend", displayProduct);
    });
    attachEventListeners();
  }

  // Search functionality
  function search() {
    const query = document.getElementById("search").value.toLowerCase();
    const items = document.querySelectorAll(".productList .item");

    items.forEach((item) => {
      const title = item
        .querySelector(".titleProduct")
        .textContent.toLowerCase();
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

  // Event listeners for search
  document
    .getElementById("search")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        search();
      }
    });

  document.querySelector(".poisk").addEventListener("click", function () {
    search();
  });

  // Delete a product
  async function deleteProduct(id) {
    try {
      await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      fetchProducts(); // Update data
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  // Edit a product
  async function editProduct(id, productData) {
    try {
      await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      fetchProducts(); // Update data
    } catch (error) {
      console.error("Error editing product:", error);
    }
  }

  // Attach event listeners to edit and delete buttons
  function attachEventListeners() {
    const editButtons = document.querySelectorAll(".edit");
    const deleteButtons = document.querySelectorAll(".delete");

    editButtons.forEach((button) => {
      button.addEventListener("click", async (e) => {
        currentProductId = e.target.closest(".edit").dataset.id;
        const product = await fetchProductById(currentProductId);
        fillModalWithProductData(product);
        openModal();
      });
    });

    deleteButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = e.target.closest(".delete").dataset.id;
        deleteProduct(id);
      });
    });
  }

  // Fetch a product by its ID
  async function fetchProductById(id) {
    try {
      const response = await fetch(`${url}/${id}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching product by id:", error);
    }
  }

  // Fill modal with product data
  function fillModalWithProductData(product) {
    imageUrlInput.value = product.imageUrl;
    titleInput.value = product.title;
    descriptionInput.value = product.description;
    priceInput.value = product.price;
    document.querySelector("#category-modal").value = product.category;
  }

  // Open modal
  function openModal() {
    modal.style.display = "block";
  }

  // Close modal
  function closeModal() {
    modal.style.display = "none";
  }

  // Event listeners for modal
  modalSaveButton.addEventListener("click", () => {
    const updatedProduct = {
      imageUrl: imageUrlInput.value,
      title: titleInput.value,
      description: descriptionInput.value,
      price: priceInput.value,
      category: document.querySelector("#category-modal").value,
    };
    if (currentProductId) {
      editProduct(currentProductId, updatedProduct);
      closeModal();
    }
  });

  modalCloseButton.addEventListener("click", closeModal);

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Initial fetch
  fetchProducts();
});

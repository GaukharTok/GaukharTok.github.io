const productList = document.getElementById("product-list");

const url = "https://solar-poised-salad.glitch.me/products/";
const modal = document.querySelector(".modal");
const modalText = document.querySelector(".text");

let currentItemId = null;

const deleteMessage = `
<div>
<h3>You are going to delete this item</h3>
<div>
<button class = "cancel">Cancel</button>
<button class = "confirm">Confirm</button>
</div>
</div>
`;

function render(products) {
  productList.innerHTML = "";
  products.forEach((product) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");
    productItem.innerHTML = `
        <img src = "${product.imageUrl}" alt = "${product.title}">
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <div class = "price"> $${product.price}  </div>
        <div class = "pushButtons">
        <button class = "edit" data-index = "${product.id}">Edit</button>
        <button class ="delete" id = "${product.id}">Delete</button>
        </div>

        `;

    productList.appendChild(productItem);
  });

  //edit funcrion
  let itemId2 = null;
  document.querySelectorAll(".edit").forEach((editBtn) => {
    editBtn.addEventListener("click", function (e) {
      itemId2 = e.target.dataset.index;
      console.log(itemId2);
      showEditForm(products, itemId2);
    });
  });

  //   delete function

  //
  document.querySelectorAll(".delete").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      modalText.innerHTML = deleteMessage;
      modal.style.display = "flex";
      currentItemId = btn.id;

      document.querySelector(".cancel").addEventListener("click", (e) => {
        modal.style.display = "none";
      });

      document.querySelector(".confirm").addEventListener("click", (e) => {
        deleteProduct();
        modal.style.display = "none";
        getData();
      });
    });
  });
}

//

async function getData() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    render(data);
  } catch (error) {
    console.log(error);
  }
}

getData();

async function deleteProduct() {
  try {
    const res = await fetch(url + "/" + currentItemId, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log("Product removed");
    getData();
  } catch (error) {
    console.log(error);
  }
}

// edit function
//
const editProduct = async () => {
  try {
    const response = await fetch(`${url}/${itemId2}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (response.ok) {
      const data = await response.json();
      render(data);
    } else {
      console.error(
        `Failed to update product. Status: ${response.status}, Text: ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Error updating product:", error);
  }
};

//
//
function showEditForm(products, itemId2) {
  fetch(`${url}/${itemId2}`)
    .then((response) => response.json())
    .then((product) => {
      document.querySelector("#editFormImageUrl").value = product.image;
      document.querySelector("#editFormTitle").value = product.title;
      document.querySelector("#editFormDescription").value =
        product.description;
      document.querySelector("#editFormPrice").value = product.price;
      document.querySelector("#editFormId").value = product.productId;

      editForm.style.display = "flex";
    })
    .catch((error) => console.error("Error fetching product:", error));

  document.querySelector("#saveChanges").addEventListener("click", async () => {
    const changeProduct = {
      image: document.querySelector("#editFormImageUrl").value,
      title: document.querySelector("#editFormTitle").value,
      description: document.querySelector("#editFormDescription").value,
      price: parseFloat(document.querySelector("#editFormPrice").value),
    };

    await editProduct(changeProduct, itemId2);
    editForm.style.display = "none";
    await getData();
  });

  document.querySelector("#cancelEdit").addEventListener("click", () => {
    editForm.style.display = "none";
  });
}

getData();

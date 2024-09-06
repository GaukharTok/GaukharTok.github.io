const image = document.querySelector("#product-image");
const title = document.querySelector("#product-title");
const description = document.querySelector("#product-description");
const price = document.querySelector("#product-price");
const formBtn = document.querySelector("form");
const url = "https://solar-poised-salad.glitch.me/products/";

formBtn.addEventListener("submit", (e) => {
  e.preventDefault();
  const product = {
    imageUrl: image.value,
    title: title.value,
    description: description.value,
    price: price.value,
  };
  console.log(product);
  addProduct(product);
});

const addProduct = async (tovar) => {
  try {
    const responce = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tovar),
    });
    const data = await responce.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

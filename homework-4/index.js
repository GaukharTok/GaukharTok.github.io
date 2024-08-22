let rates = {};
let url =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
let endPoint = "usd";
const resultBtn = document.querySelector("button");
// Fetch the exchange rates from the API
function fetchRates() {
  fetch(url + "/" + endPoint + ".json")
    .then((response) => response.json())
    .then((data) => {
      rates = data.usd;
    })
    .catch((error) => {
      console.error("Wrong exchange rates:", error);
    });
}

// Convert currency
function convertCurrency() {
  const amount = parseFloat(document.getElementById("amount").value);
  const fromCurrency = document.getElementById("from-currency").value;
  const toCurrency = document.getElementById("to-currency").value;

  // if (isNaN(amount) || !rates[fromCurrency] || !rates[toCurrency]) {
  //   document.getElementById("result").innerText =
  //     "Invalid input or currency not available.";
  //   return;
  // }

  // Convert the amount to USD first, then to the target currency
  const amountInUSD = amount / rates[fromCurrency];
  const convertedAmount = amountInUSD * rates[toCurrency];

  document.getElementById(
    "result"
  ).innerText = `${amount} ${fromCurrency.toUpperCase()} = ${convertedAmount.toFixed(
    2
  )} ${toCurrency.toUpperCase()}`;
}
resultBtn.addEventListener("click", convertCurrency);

// Initialize rates on page load
fetchRates();

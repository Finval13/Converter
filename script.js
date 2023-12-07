async function convertCurrency(event) {
  event.preventDefault();

  const amount = document.getElementById("amount").value;
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;

  try {
    const response = await fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json`);
    const data = await response.json();

    const fromCurrencyData =
      fromCurrency === "UAH" ? { rate: 1 } : data.find((currency) => currency.cc === fromCurrency);
    const toCurrencyData = toCurrency === "UAH" ? { rate: 1 } : data.find((currency) => currency.cc === toCurrency);

    if (fromCurrencyData && toCurrencyData) {
      const fromExchangeRate = fromCurrencyData.rate;
      const toExchangeRate = toCurrencyData.rate;

      const result = ((amount / fromExchangeRate) * toExchangeRate).toFixed(2);
      document.getElementById("result").innerText = ` ${result} `;
    } else {
      console.error("Currency not found in data");
    }
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
  }
}

function updateCurrentDate() {
  const currentDateElement = document.getElementById("currentDate");
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`;
  currentDateElement.innerText = ` ${formattedDate}`;
}

function swapCurrencies() {
  const fromCurrencySelect = document.getElementById("fromCurrency");
  const toCurrencySelect = document.getElementById("toCurrency");

  const tempValue = fromCurrencySelect.value;
  fromCurrencySelect.value = toCurrencySelect.value;
  toCurrencySelect.value = tempValue;
}

document.getElementById("arrow").addEventListener("click", swapCurrencies);

updateCurrentDate();

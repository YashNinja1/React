import { use, useState } from "react";

import "./App.css";

import useCurrencyConverter from "./hooks/useCurrencyInfo.js";

import InputBox from "./component/inputBox";
function App() {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("usd");
  const [toCurrency, setToCurrency] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const { rates, loading } = useCurrencyConverter(fromCurrency);
  const options = Object.keys(rates);

  const convert = () => {
    const formatted = (amount * rates[toCurrency]).toFixed(2);
    setConvertedAmount(formatted);
  };

  const swap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat "
      style={{
        backgroundImage: `url(https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg)`,
      }}
    >
      <div className="w-full">
        <div
          className="w-full max-w-md mx-auto border border-gray-60
        rounded-lg p-5 backdrop-blur-sm bg-white/30"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="from"
                amount={amount}
                currencies={options}
                onCurrencyChange={(e) => setFromCurrency(e)}
                onAmountChange={(e) => setAmount(e)}
                selectedCurrency={fromCurrency}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2  -translate-y-1/2 bg-blue-600 border-2 border-white rounded-md text-white px-2 py-0.5"
                onClick={swap}
              >
                Swap
              </button>
            </div>
            <div className="w-full mb-1">
              <InputBox
                label="to"
                amount={convertedAmount}
                currencies={options}
                onCurrencyChange={(e) => setToCurrency(e)}
                selectedCurrency={toCurrency}
                amountDisabled
              />
            </div>
            <button
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
              type="submit"
            >
              Convert {fromCurrency.toUpperCase()} to {toCurrency.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";

function useCurrencyInfo(baseCurrency) {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${baseCurrency}.json`
        );
        const data = await response.json();
        setRates(data[baseCurrency]); // ✅ this gives you { inr: 83.2, eur: 0.91, ... }
      } catch (error) {
        console.error("Error fetching currency data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [baseCurrency]);

  return { rates, loading };
}

export default useCurrencyInfo;

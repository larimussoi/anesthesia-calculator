import { useState } from "react";
import { calculateDosage } from "../utils/dosageFormulas";

export const useCalculator = () => {
  const [results, setResults] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const calculate = async (medication, patient, indication) => {
    setLoading(true);
    setError(null);

    try {
      const result = calculateDosage(medication, patient, indication);

      const calculation = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        medication,
        patient,
        indication,
        result,
      };

      setResults(result);
      setHistory((prev) => [calculation, ...prev.slice(0, 9)]); // Manter últimos 10
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setResults(null);
    setError(null);
  };

  return {
    results,
    history,
    loading,
    error,
    calculate,
    clearResults,
  };
};

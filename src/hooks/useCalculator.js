import { useState, useEffect } from "react";
import { calculateDosage } from "../utils/dosageFormulas";

export const useCalculator = () => {
  const [results, setResults] = useState(null);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("calcHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const calculate = (medication, patient, indication) => {
    if (!medication || !patient?.weight || !indication) {
      setError("Dados insuficientes para cálculo.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = calculateDosage(medication, patient, indication);

      const calculation = {
        id: Date.now(),
        timestamp: new Date().toLocaleString("pt-BR"),
        medication,
        patient,
        indication,
        result,
      };

      setResults(result);
      setHistory((prev) => [calculation, ...prev.slice(0, 9)]);
    } catch (err) {
      setError(err.message || "Erro ao calcular dosagem.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("calcHistory", JSON.stringify(history));
  }, [history]);

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

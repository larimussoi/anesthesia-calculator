import React, { useState } from "react";
import styled from "styled-components";
import PatientForm from "./components/PatientForm/PatientForm";
import DosageResult from "./components/DosageResult/DosageResult";
import Disclaimer from "./components/Disclaimer/Disclaimer";
import { useCalculator } from "./hooks/useCalculator";

function App() {
  const { results, history, loading, error, calculate, clearResults } =
    useCalculator();
  const [lastCalculation, setLastCalculation] = useState(null);

  const handleCalculate = (medication, patient, indication) => {
    calculate(medication, patient, indication);
    setLastCalculation({ medication, indication });
  };

  return (
    <AppContainer>
      <Header>
        <Title>🏥 Calculadora de Dosagem Anestésica</Title>
        <Subtitle>
          Ferramenta auxiliar para cálculos anestésicos básicos
        </Subtitle>
      </Header>

      <MainContent>
        <Disclaimer />

        <PatientForm
          onCalculate={handleCalculate}
          loading={loading}
          error={error}
        />

        {results && lastCalculation && (
          <DosageResult
            results={results}
            medication={lastCalculation.medication}
            indication={lastCalculation.indication}
            onClear={clearResults}
          />
        )}

        {history.length > 0 && (
          <HistorySection>
            <HistoryTitle>📋 Últimos Cálculos ({history.length})</HistoryTitle>
            <HistoryList>
              {history.slice(0, 3).map((calc) => (
                <HistoryItem key={calc.id}>
                  <HistoryTime>{calc.timestamp}</HistoryTime>
                  <HistoryDetails>
                    {calc.medication} - {calc.indication} | Peso:{" "}
                    {calc.patient.weight}kg | Dose: {calc.result.dose}mg
                  </HistoryDetails>
                </HistoryItem>
              ))}
            </HistoryList>
          </HistorySection>
        )}
      </MainContent>

      <Footer>
        <FooterText>
          Desenvolvido para fins educacionais | Sempre consulte protocolos
          médicos oficiais
        </FooterText>
      </Footer>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.header`
  text-align: center;
  padding: 40px 20px;
  color: white;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  margin: 0;
`;

const MainContent = styled.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px 40px;
`;

const HistorySection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const HistoryTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 16px;
`;

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const HistoryItem = styled.div`
  background: #f8f9fa;
  padding: 12px;
  border-radius: 8px;
  border-left: 4px solid #3498db;
`;

const HistoryTime = styled.div`
  font-size: 12px;
  color: #7f8c8d;
  margin-bottom: 4px;
`;

const HistoryDetails = styled.div`
  font-size: 14px;
  color: #2c3e50;
  font-weight: 500;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.1);
`;

const FooterText = styled.p`
  color: white;
  margin: 0;
  font-size: 14px;
  opacity: 0.8;
`;

export default App;

import { useState } from "react";
import styled from "styled-components";
import PatientForm from "../PatientForm/PatientForm";
import DosageResult from "../DosageResult/DosageResult";
import History from "../History/History";
import Disclaimer from "../Disclaimer/Disclaimer";
import { useCalculator } from "../../hooks/useCalculator";

const Calculator = () => {
  const [activeTab, setActiveTab] = useState("calculator");
  const { results, history, loading, error, calculate, clearResults } =
    useCalculator();

  return (
    <Container>
      <Header>
        <Title>Calculadora de Dosagem Anestésica</Title>
        <Subtitle>Ferramenta auxiliar para cálculos anestésicos</Subtitle>
      </Header>

      <Disclaimer />

      <TabContainer>
        <Tab
          active={activeTab === "calculator"}
          onClick={() => setActiveTab("calculator")}
        >
          Calculadora
        </Tab>
        <Tab
          active={activeTab === "history"}
          onClick={() => setActiveTab("history")}
        >
          Histórico ({history.length})
        </Tab>
      </TabContainer>

      <Content>
        {activeTab === "calculator" ? (
          <CalculatorTab>
            <PatientForm
              onCalculate={calculate}
              loading={loading}
              error={error}
            />
            {results && (
              <DosageResult results={results} onClear={clearResults} />
            )}
          </CalculatorTab>
        ) : (
          <History calculations={history} />
        )}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: #7f8c8d;
  font-size: 16px;
`;

export default Calculator;

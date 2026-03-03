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

const TabContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  background-color: ${(props) => (props.active ? "#2c3e50" : "#ecf0f1")};
  color: ${(props) => (props.active ? "#fff" : "#2c3e50")};
  border-radius: 5px;
  transition: 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const Content = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const CalculatorTab = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default Calculator;

import styled from "styled-components";
import { medications } from "../../data/medications";

const DosageResult = ({ results, medication, indication, onClear }) => {
  const { dose, volume, infusionRate, adjustments } = results;
  const medInfo = medications[medication];

  return (
    <ResultContainer>
      <ResultHeader>
        <ResultTitle>Resultado do Cálculo</ResultTitle>
        <ClearButton onClick={onClear}>🗑️ Limpar</ClearButton>
      </ResultHeader>

      <MedicationInfo>
        <MedicationName>{medInfo?.name}</MedicationName>
        <IndicationType>
          {indication.charAt(0).toUpperCase() + indication.slice(1)}
        </IndicationType>
      </MedicationInfo>

      <ResultGrid>
        <ResultCard>
          <CardIcon>💊</CardIcon>
          <CardTitle>Dose</CardTitle>
          <CardValue>
            {dose} {infusionRate ? "mg/h" : "mg"}
          </CardValue>
        </ResultCard>

        <ResultCard>
          <CardIcon>💉</CardIcon>
          <CardTitle>Volume</CardTitle>
          <CardValue>
            {volume} ml{infusionRate ? "/h" : ""}
          </CardValue>
        </ResultCard>

        <ResultCard>
          <CardIcon>🧪</CardIcon>
          <CardTitle>Concentração</CardTitle>
          <CardValue>
            {medInfo?.concentration}{" "}
            {medication === "fentanil" ? "mcg/ml" : "mg/ml"}
          </CardValue>
        </ResultCard>
      </ResultGrid>

      {adjustments && adjustments.length > 0 && (
        <AdjustmentsSection>
          <AdjustmentsTitle>Considerações Clínicas</AdjustmentsTitle>
          {adjustments.map((adjustment, index) => (
            <AdjustmentItem key={index}>• {adjustment}</AdjustmentItem>
          ))}
        </AdjustmentsSection>
      )}

      <SafetyNote>
        <SafetyText>
          <strong>Lembre-se:</strong> Este cálculo é uma referência inicial.
          Sempre considere o contexto clínico completo, comorbidades e
          protocolos institucionais.
        </SafetyText>
      </SafetyNote>
    </ResultContainer>
  );
};

const ResultContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #27ae60;
`;

const ResultHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ResultTitle = styled.h3`
  color: #27ae60;
  margin: 0;
  font-size: 20px;
`;

const ClearButton = styled.button`
  background: #e85848;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;

  &:hover {
    background: #ef8276;
  }
`;

const MedicationInfo = styled.div`
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
`;

const MedicationName = styled.h4`
  color: #2c3e50;
  margin: 0 0 8px 0;
  font-size: 18px;
`;

const IndicationType = styled.span`
  background: #3498db;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`;

const ResultGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
`;

const ResultCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #9b67d0 100%);
  color: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
`;

const CardIcon = styled.div`
  font-size: 24px;
  margin-bottom: 8px;
`;

const CardTitle = styled.div`
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 8px;
`;

const CardValue = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const AdjustmentsSection = styled.div`
  background: #fff3e0;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  border-left: 4px solid #ff9800;
`;

const AdjustmentsTitle = styled.h4`
  color: #ef6c00;
  margin: 0 0 12px 0;
  font-size: 16px;
`;

const AdjustmentItem = styled.div`
  color: #bf360c;
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 1.4;
`;

const SafetyNote = styled.div`
  background: #e8f5e8;
  border: 1px solid #c8e6c9;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const SafetyText = styled.p`
  margin: 0;
  color: #2e7d32;
  font-size: 14px;
  line-height: 1.5;
`;

export default DosageResult;

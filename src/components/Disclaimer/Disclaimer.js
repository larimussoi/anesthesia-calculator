import React from "react";
import styled from "styled-components";

const Disclaimer = () => {
  return (
    <DisclaimerContainer>
      <DisclaimerIcon>⚠️</DisclaimerIcon>
      <DisclaimerText>
        <strong>AVISO IMPORTANTE:</strong> Esta calculadora é uma ferramenta
        auxiliar educacional. Os cálculos não substituem o julgamento clínico
        profissional. Sempre consulte protocolos institucionais e considere as
        condições específicas do paciente.
      </DisclaimerText>
    </DisclaimerContainer>
  );
};

const DisclaimerContainer = styled.div`
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DisclaimerIcon = styled.span`
  font-size: 24px;
  flex-shrink: 0;
`;

const DisclaimerText = styled.p`
  margin: 0;
  color: #856404;
  font-size: 14px;
  line-height: 1.4;
`;

export default Disclaimer;

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "styled-components";
import { medications } from "../../data/medications";

const schema = yup.object({
  weight: yup
    .number()
    .typeError("Digite um peso válido (apenas números)")
    .required("Peso é obrigatório")
    .min(1, "Peso mínimo: 1kg")
    .max(200, "Peso máximo: 200kg"),
  age: yup
    .number()
    .typeError("Digite uma idade válida (apenas números)")
    .required("Idade é obrigatória")
    .min(0, "Idade mínima: 0 anos")
    .max(120, "Idade máxima: 120 anos"),
  height: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(30, "Altura mínima: 30cm")
    .max(250, "Altura máxima: 250cm"),
  medication: yup.string().required("Selecione um medicamento"),
  indication: yup.string().when("medication", {
    is: (val) => !!val,
    then: (schema) => schema.required("Selecione uma indicação"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const PatientForm = ({ onCalculate, loading, error }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const selectedMedication = watch("medication");

  const onSubmit = (data) => {
    onCalculate(
      data.medication,
      {
        weight: data.weight,
        age: data.age,
        height: data.height,
      },
      data.indication
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Section>
        <SectionTitle>📋 Dados do Paciente</SectionTitle>

        <InputRow>
          <InputGroup>
            <Label>Peso (kg) *</Label>
            <Input
              type="number"
              step="0.1"
              placeholder="Ex: 70"
              {...register("weight", { valueAsNumber: true })}
              $error={errors.weight}
            />
            {errors.weight && <ErrorText>{errors.weight.message}</ErrorText>}
          </InputGroup>

          <InputGroup>
            <Label>Idade (anos) *</Label>
            <Input
              type="number"
              placeholder="Ex: 45"
              {...register("age", { valueAsNumber: true })}
              $error={errors.age}
            />
            {errors.age && <ErrorText>{errors.age.message}</ErrorText>}
          </InputGroup>

          <InputGroup>
            <Label>Altura (cm)</Label>
            <Input
              type="number"
              placeholder="Ex: 170"
              {...register("height", { valueAsNumber: true })}
              $error={errors.height}
            />
            {errors.height && <ErrorText>{errors.height.message}</ErrorText>}
          </InputGroup>
        </InputRow>
      </Section>

      <Section>
        <SectionTitle>💊 Medicamento</SectionTitle>

        <InputRow>
          <InputGroup>
            <Label>Medicamento *</Label>
            <Select {...register("medication")} $error={errors.medication}>
              <option value="">Selecione um medicamento...</option>
              {Object.entries(medications).map(([key, med]) => (
                <option key={key} value={key}>
                  {med.name}
                </option>
              ))}
            </Select>
            {errors.medication && (
              <ErrorText>{errors.medication.message}</ErrorText>
            )}
          </InputGroup>

          {selectedMedication &&
            medications[selectedMedication]?.indications && (
              <InputGroup>
                <Label>Indicação *</Label>
                <Select {...register("indication")} $error={errors.indication}>
                  <option value="">Selecione uma indicação...</option>
                  {medications[selectedMedication].indications.map(
                    (indication) => (
                      <option key={indication} value={indication}>
                        {indication.charAt(0).toUpperCase() +
                          indication.slice(1)}
                      </option>
                    )
                  )}
                </Select>
                {errors.indication && (
                  <ErrorText>{errors.indication.message}</ErrorText>
                )}
              </InputGroup>
            )}
        </InputRow>
      </Section>

      {error && <ErrorMessage>❌ {error}</ErrorMessage>}

      <SubmitButton type="submit" disabled={loading}>
        {loading ? "🔄 Calculando..." : "🧮 Calcular Dosagem"}
      </SubmitButton>
    </Form>
  );
};

const Form = styled.form`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 16px;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  color: #34495e;
  margin-bottom: 6px;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 12px;
  border: 2px solid ${(props) => (props.$error ? "#e74c3c" : "#ddd")};
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.$error ? "#e74c3c" : "#3498db")};
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 2px solid ${(props) => (props.$error ? "#e74c3c" : "#ddd")};
  border-radius: 8px;
  font-size: 16px;
  background: white;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.$error ? "#e74c3c" : "#3498db")};
  }
`;

const ErrorText = styled.span`
  color: #e74c3c;
  font-size: 12px;
  margin-top: 4px;
`;

const ErrorMessage = styled.div`
  background: #ffebee;
  color: #c62828;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
  border-left: 4px solid #e74c3c;
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #2980b9, #21618c);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

export default PatientForm;

import { medications } from "../data/medications";

export const calculateDosage = (medication, patient, indication) => {
  const { weight, age, height } = patient;
  const med = medications[medication];

  // Validações básicas
  if (!weight || weight < 1 || weight > 200) {
    throw new Error("Peso deve estar entre 1 e 200 kg");
  }

  if (!age || age < 0 || age > 120) {
    throw new Error("Idade deve estar entre 0 e 120 anos");
  }

  let dose, volume, infusionRate;

  switch (medication) {
    case "propofol":
      if (indication === "indução") {
        dose = med.dosage.induction.default * weight;
        volume = dose / med.concentration;

        // Ajuste para idosos
        if (age > 65) {
          dose *= 0.8;
          volume = dose / med.concentration;
        }
      } else if (indication === "manutenção") {
        infusionRate = med.dosage.maintenance.default * weight;
        volume = infusionRate / med.concentration; // ml/h
      }
      break;

    case "fentanil":
      dose = med.dosage.bolus.default * weight;
      volume = dose / med.concentration;

      // Ajuste para idosos
      if (age > 70) {
        dose *= 0.7;
        volume = dose / med.concentration;
      }
      break;

    default:
      throw new Error("Medicamento não encontrado");
  }

  return {
    dose: Math.round(dose * 100) / 100,
    volume: Math.round(volume * 100) / 100,
    infusionRate: infusionRate ? Math.round(infusionRate * 100) / 100 : null,
    adjustments: getAdjustments(patient),
  };
};

const getAdjustments = (patient) => {
  const adjustments = [];

  if (patient.age > 65) {
    adjustments.push("Dose reduzida para paciente idoso");
  }

  if (patient.weight < 50) {
    adjustments.push("Monitorar resposta em paciente de baixo peso");
  }

  return adjustments;
};

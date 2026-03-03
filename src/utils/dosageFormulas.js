import { medications } from "../data/medications";

export const calculateDosage = (medication, patient, indication) => {
  const { weight, age } = patient;

  const med = medications[medication];

  if (!med) {
    throw new Error("Medicamento não encontrado");
  }

  if (!weight || weight < 1 || weight > 200) {
    throw new Error("Peso deve estar entre 1 e 200 kg");
  }

  if (age == null || age < 0 || age > 120) {
    throw new Error("Idade deve estar entre 0 e 120 anos");
  }

  if (!med.dosage[indication]) {
    throw new Error("Indicação inválida para este medicamento");
  }

  let dose = null;
  let volume = null;
  let infusionRate = null;

  switch (medication) {
    case "propofol":
      if (indication === "indução") {
        dose = med.dosage[indication].default * weight;
        if (age > 65) dose *= 0.8;
      } else if (indication === "manutenção") {
        infusionRate = med.dosage[indication].default * weight;
        dose = infusionRate;
      }

      volume = dose / med.concentration;
      break;

    case "fentanil":
      if (indication === "bolus") {
        dose = med.dosage[indication].default * weight;
      } else if (indication === "infusão") {
        infusionRate = med.dosage[indication].default * weight;
        dose = infusionRate;
      }

      if (age > 70) dose *= 0.7;

      volume = dose / med.concentration;
      break;

    case "midazolam":
      dose = med.dosage[indication].default * weight;

      if (age > 65) {
        dose *= 0.5;
      } else if (age > 55) {
        dose *= 0.7;
      }

      volume = dose / med.concentration;
      break;

    case "atropina":
      dose = med.dosage[indication].default * weight;

      // Dose mínima 100mcg
      if (dose < 100) dose = 100;

      // Dose máxima 3000mcg
      if (dose > 3000) dose = 3000;

      volume = dose / med.concentration;
      break;

    case "precedex":
      infusionRate = med.dosage[indication].default * weight;
      dose = infusionRate;

      if (age > 65) {
        dose *= 0.8;
        infusionRate *= 0.8;
      }

      // Usa concentração diluída definida no objeto
      const dilutedConcentration = med.dilutedConcentration || 4;
      volume = dose / dilutedConcentration;
      break;

    default:
      throw new Error("Medicamento não suportado");
  }

  if (dose == null || isNaN(dose)) {
    throw new Error("Erro ao calcular dose");
  }

  if (volume == null || isNaN(volume)) {
    throw new Error("Erro ao calcular volume");
  }

  return {
    dose: round(dose),
    volume: round(volume),
    infusionRate: infusionRate != null ? round(infusionRate) : null,
    adjustments: getAdjustments(patient, age, medication),
  };
};

const round = (value) => Math.round(value * 100) / 100;

const getAdjustments = (patient, age, medication) => {
  const adjustments = [];

  if (age > 65) {
    adjustments.push("Dose reduzida para paciente idoso");
  }

  if (patient.weight < 50) {
    adjustments.push("Monitorar resposta em paciente de baixo peso");
  }

  if (patient.weight > 100) {
    adjustments.push("Considerar ajuste para paciente obeso");
  }

  switch (medication) {
    case "midazolam":
      adjustments.push("Flumazenil disponível como antídoto");
      if (age > 65) {
        adjustments.push("Risco aumentado de amnésia prolongada em idosos");
      }
      break;

    case "atropina":
      adjustments.push("Monitorar frequência cardíaca continuamente");
      if (patient.weight < 20) {
        adjustments.push("Dose mínima aplicada (100mcg)");
      }
      break;

    case "precedex":
      adjustments.push("Monitorar PA e FC durante infusão");
      adjustments.push("Concentração de uso: 4mcg/ml (diluída)");
      if (age > 65) {
        adjustments.push("Maior risco de bradicardia e hipotensão");
      }
      break;

    case "fentanil":
      adjustments.push("Naloxone disponível como antídoto");
      adjustments.push("Monitorar função respiratória");
      break;

    case "propofol":
      adjustments.push("Monitorar PA durante indução");
      if (age > 65) {
        adjustments.push("Maior risco de hipotensão em idosos");
      }
      break;
  }

  return adjustments;
};

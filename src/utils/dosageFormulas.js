import { medications } from "../data/medications";

export const calculateDosage = (medication, patient, indication) => {
  const { weight, age, height } = patient;
  const med = medications[medication];

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
        if (age > 65) dose *= 0.8;
      } else if (indication === "manutenção") {
        infusionRate = med.dosage.maintenance.default * weight;
        dose = infusionRate;
      }
      volume = dose / med.concentration;
      break;

    case "fentanil":
      if (indication === "bolus") {
        dose = med.dosage.bolus.default * weight;
      } else if (indication === "infusão") {
        infusionRate = med.dosage.infusion.default * weight;
        dose = infusionRate;
      }
      if (age > 70) dose *= 0.7;
      volume = dose / med.concentration;
      break;

    case "midazolam":
      if (indication === "sedação") {
        dose = med.dosage.sedation.default * weight;
      } else if (indication === "indução") {
        dose = med.dosage.induction.default * weight;
      } else if (indication === "ansiolise") {
        dose = med.dosage.anxiolysis.default * weight;
      }

      // Ajustes para idade
      if (age > 65) {
        dose *= 0.5; // Redução de 50% em idosos
      } else if (age > 55) {
        dose *= 0.7; // Redução de 30% em pacientes > 55 anos
      }

      volume = dose / med.concentration;
      break;

    case "atropina":
      if (indication === "bradicardia") {
        dose = med.dosage.bradicardia.default * weight;
      } else if (indication === "pré-medicação") {
        dose = med.dosage.premedication.default * weight;
      } else if (indication === "antídoto") {
        dose = med.dosage.antidote.default * weight;
      }

      // Dose mínima de 100mcg (0.1mg)
      if (dose < 100) dose = 100;
      // Dose máxima de 3000mcg (3mg)
      if (dose > 3000) dose = 3000;

      volume = dose / med.concentration;
      break;

    case "precedex":
      if (indication === "sedação") {
        infusionRate = med.dosage.sedation.default * weight;
        dose = infusionRate;
      } else if (indication === "infusão contínua") {
        infusionRate = med.dosage.infusion.default * weight;
        dose = infusionRate;
      }

      // Ajuste para idosos
      if (age > 65) {
        dose *= 0.8;
        if (infusionRate) infusionRate *= 0.8;
      }

      // Usar concentração diluída padrão (4mcg/ml)
      volume = dose / 4; // 4mcg/ml após diluição padrão
      break;

    default:
      throw new Error("Medicamento não encontrado");
  }

  return {
    dose: Math.round(dose * 100) / 100,
    volume: Math.round(volume * 100) / 100,
    infusionRate: infusionRate ? Math.round(infusionRate * 100) / 100 : null,
    adjustments: getAdjustments(patient, age, medication),
  };
};

const getAdjustments = (patient, age, medication) => {
  const adjustments = [];

  // Ajustes gerais por idade
  if (age > 65) {
    adjustments.push("Dose reduzida para paciente idoso");
  }

  if (patient.weight < 50) {
    adjustments.push("Monitorar resposta em paciente de baixo peso");
  }

  if (patient.weight > 100) {
    adjustments.push("Considerar ajuste para paciente obeso");
  }

  // Ajustes específicos por medicamento
  switch (medication) {
    case "midazolam":
      adjustments.push("Flumazenil disponível como antídoto");
      if (age > 65) {
        adjustments.push("Risco aumentado de amnesia prolongada em idosos");
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

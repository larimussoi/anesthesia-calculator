export const medications = {
  propofol: {
    name: "Propofol",
    doseUnit: "mg",
    concentrationUnit: "mg",
    indications: ["indução", "manutenção"],
    dosage: {
      indução: {
        min: 1.5,
        max: 2.5,
        default: 2.0,
      },
      manutenção: {
        min: 4,
        max: 12,
        default: 8,
      },
    },
    concentration: 10, // mg/ml
    contraindications: ["alergia ao propofol", "idade < 3 anos"],
  },
  fentanil: {
    name: "Fentanil",
    doseUnit: "mcg",
    concentrationUnit: "mcg",
    indications: ["bolus", "infusão"],
    dosage: {
      bolus: {
        min: 1,
        max: 5,
        default: 2,
      },
      infusão: {
        min: 0.5,
        max: 3,
        default: 1,
      },
    },
    concentration: 50,
    contraindications: ["depressão respiratória", "íleo paralítico"],
  },
  atropina: {
    name: "Sulfato de Atropina",
    doseUnit: "mcg",
    concentrationUnit: "mcg",
    indications: ["bradicardia", "pré-medicação", "antídoto"],
    dosage: {
      bradicardia: {
        min: 10,
        max: 20,
        default: 15,
      },
      "pré-medicação": {
        min: 10,
        max: 20,
        default: 15,
      },
      antídoto: {
        min: 20,
        max: 50,
        default: 30,
      },
    },
    concentration: 250, // mcg/ml (0,25mg/ml)
    contraindications: [
      "glaucoma de ângulo fechado",
      "estenose pilórica",
      "íleo paralítico",
      "colite ulcerativa grave",
      "megacólon tóxico",
      "hipertermia maligna",
    ],
    clinicalNotes: [
      "Dose mínima: 0,1mg (100mcg)",
      "Dose máxima: 3mg por dose",
      "Pode causar taquicardia reflexa",
      "Atravessa barreira hematoencefálica",
    ],
  },
  precedex: {
    name: "Precedex (Dexmedetomidina)",
    doseUnit: "mcg",
    concentrationUnit: "mcg",
    dilutedConcentration: 4, // mcg/ml após diluição
    indications: ["sedação", "infusão contínua"],
    dosage: {
      sedação: {
        min: 0.2,
        max: 1.4,
        default: 0.7,
      },
      "infusão contínua": {
        min: 0.2,
        max: 0.7,
        default: 0.4,
      },
    },
    concentration: 100, // mcg/ml (4mcg/ml após diluição)
    contraindications: [
      "bloqueio AV avançado",
      "bradicardia sintomática",
      "hipotensão severa não tratada",
      "insuficiência cardíaca descompensada",
      "choque cardiogênico",
    ],
    clinicalNotes: [
      "Sempre diluir antes do uso",
      "Diluição padrão: 200mcg em 50ml (4mcg/ml)",
      "Monitorar FC e PA continuamente",
      "Reduzir dose em idosos",
      "Pode causar bradicardia e hipotensão",
    ],
  },
  midazolam: {
    name: "Midazolam",
    doseUnit: "mcg",
    concentrationUnit: "mcg",
    indications: ["sedação", "indução", "ansiolise"],
    dosage: {
      sedação: {
        min: 20,
        max: 100,
        default: 50,
      },
      indução: {
        min: 150,
        max: 350,
        default: 250,
      },
      ansiolise: {
        min: 20,
        max: 50,
        default: 30,
      },
    },
    concentration: 5000, // mcg/ml (5mg/ml)
    contraindications: [
      "glaucoma de ângulo fechado",
      "miastenia gravis",
      "insuficiência respiratória grave",
      "apneia do sono grave",
      "intoxicação alcoólica aguda",
    ],
    clinicalNotes: [
      "Antagonista: Flumazenil",
      "Reduzir dose em idosos (30-50%)",
      "Pode causar amnesia anterógrada",
      "Evitar injeção arterial",
      "Compatível com fentanil",
    ],
  },
};

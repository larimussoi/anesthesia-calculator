export const medications = {
  propofol: {
    name: "Propofol",
    indications: ["indução", "manutenção"],
    dosage: {
      induction: {
        min: 1.5, // mg/kg
        max: 2.5,
        default: 2.0,
      },
      maintenance: {
        min: 4, // mg/kg/h
        max: 12,
        default: 8,
      },
    },
    concentration: 10, // mg/ml
    contraindications: ["alergia ao propofol", "idade < 3 anos"],
  },
  fentanil: {
    name: "Fentanil",
    dosage: {
      bolus: {
        min: 1, // mcg/kg
        max: 5,
        default: 2,
      },
      infusion: {
        min: 0.5, // mcg/kg/h
        max: 3,
        default: 1,
      },
    },
    concentration: 50, // mcg/ml
    contraindications: ["depressão respiratória", "íleo paralítico"],
  },
  atropina: {
    name: "Sulfato de Atropina",
    indications: ["bradicardia", "pré-medicação", "antídoto"],
    dosage: {
      bradicardia: {
        min: 10, // mcg/kg
        max: 20,
        default: 15,
      },
      premedication: {
        min: 10, // mcg/kg
        max: 20,
        default: 15,
      },
      antidote: {
        min: 20, // mcg/kg
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
    indications: ["sedação", "infusão contínua"],
    dosage: {
      loading: {
        min: 0.5, // mcg/kg
        max: 1.0,
        default: 1.0,
      },
      infusion: {
        min: 0.2, // mcg/kg/h
        max: 0.7,
        default: 0.4,
      },
      sedation: {
        min: 0.2, // mcg/kg/h
        max: 1.4,
        default: 0.7,
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
    // Correção: era "midazolan"
    name: "Midazolam",
    indications: ["sedação", "indução", "ansiolise"],
    dosage: {
      sedation: {
        min: 20, // mcg/kg
        max: 100,
        default: 50,
      },
      induction: {
        min: 150, // mcg/kg
        max: 350,
        default: 250,
      },
      anxiolysis: {
        min: 20, // mcg/kg
        max: 50,
        default: 30,
      },
      infusion: {
        min: 25, // mcg/kg/h
        max: 200,
        default: 50,
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

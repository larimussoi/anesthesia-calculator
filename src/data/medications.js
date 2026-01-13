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
};

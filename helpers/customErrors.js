export const errorTypes = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "tooShort",
  "tooLong",
  "customError",
  "rangeUnderflow",
  "stepMismatch"
];

export const messages = {
  name: {
    valueMissing: "Debe ingresar un nombre",
    tooShort: "El nombre es demasiado corto",
    totooLong: "El nombre es demasiado largo",
    customError: "Nombre inválido. Max. 50 Caract."
  },
  price: {
    valueMissing: "Debes ingresar un precio",
    typeMismatch: "Ingrese un precio válido",
    rangeUnderflow: "El precio es demasiado bajo",
    stepMismatch: "Ingrese valor de hasta 2 decimales",
    customError: "Ingrese un precio válido. JS"
  },
  image: {
    typeMismatch: "La ruta debe ser un texto",
    patternMismatch: "Ingrese URL válida, o deje vácío.",
    customError: "Ingrese URL válida, o deje vácío. JS"
  }
};

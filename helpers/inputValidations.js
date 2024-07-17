export const nameValidation = (input, value) => {
  if (value.trim().length < 2 || value.trim().length > 50) {
    input.setCustomValidity('error')
  };
};


export const priceValidation = (input, value) => {
  if (value.trim() < 1) {
    input.setCustomValidity('error');
  };
};

export const urlValidation = (input, value) => {
  const pattern = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  const url = value.trim();

  if (url === '' || !pattern.test(url)) {
    input.setCustomValidity('error');
  };
};



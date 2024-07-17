import { errorTypes, messages } from "../../helpers/customErrors.js";
import { nameValidation, priceValidation, urlValidation } from "../../helpers/inputValidations.js";
import { numberFormat } from "../../helpers/numberFormat.js";
import { servicesProducts } from "../services/product-services.js";

document.addEventListener('DOMContentLoaded', load);

function load() {
  render();
  document.querySelector('#form-data').addEventListener('submit', createProduct);
  document.querySelector('#product-grid').addEventListener('click', removeProduct);
  document.querySelectorAll('.input-container input').forEach(input => {
    input.addEventListener('blur', (e) => { validateInput(e), enableFormButton() });
    input.addEventListener('invalid', (e) => { e.preventDefault(); validateInput(e); });
  });
};


const createCard = (id, name, price, image) => {
  const productGrid = document.querySelector('#product-grid');

  const cardTemplate = `<div class="card">
                          <div class="img-container">
                            <img src="${image}" alt="" />
                          </div>
                          <p>${name}</p>
                          <div class="card-footer">
                            <p>$${numberFormat(price)}</p>
                            <button>
                              <img src="assets/images/trash-icon.svg" alt="" data-id="${id}" />
                            </button>
                          </div>
                        </div>`;
  
  productGrid.insertAdjacentHTML('beforeend', cardTemplate);
};

const render = async () => {
  try {
    const productList = await servicesProducts.getProducts();

    if(productList && productList.length > 0) {
      document.querySelector('.no-products').style.display = 'none';
    }

    productList.forEach(product => {
      const { id, name, price, image } = product;
      createCard(id, name, price, image);
    });
    
  } catch (error) {
    console.log(error);
  }
};


const createProduct = async (e) => {
  try {
    e.preventDefault()
    let validatedForm = true;

    document.querySelectorAll('.input-container input').forEach(input => {
      validateInput(input);
      if (!input.validity.valid) {
        validatedForm = false;
      };
    });
    
    if(validatedForm) {
      const nameValue = e.target.elements["name"].value;
      const priceValue = e.target.elements["price"].value;
      const imageValue = e.target.elements["image"].value || 'assets/images/default-image.png';

      const { id, name, price, image } = await servicesProducts.postProduct(nameValue, priceValue, imageValue); 

      createCard(id, name, price, image)

      e.target.reset();

    }else {
      const button = document.querySelector('#form-data button[type="submit"]');
      button.classList.add('btn-disabled');
      button.disabled = true;
    };
    
  } catch (error) {
    console.log(error);
  }
};


const removeProduct = async (e) => {
  if(e.target.dataset.id) {
    try {
    await servicesProducts.deleteProduct(e.target.dataset.id);
    e.target.parentNode.parentNode.parentNode.remove();

  } catch (error) {
    console.log(error);
  }; 
  };
}


const validateInput = (e) => { 
  const input = e.target || e; 
  const errorMessageNode = input.nextElementSibling;
  let mensaje;

  input.classList.remove('input-error');
  errorMessageNode.classList.remove('active-error');
  errorMessageNode.textContent = '';

  
  if(!input.validity.valid && !input.validity.customError) {
    errorTypes.forEach((error) => {
      if (input.validity[error]) {
        mensaje = messages[input.name][error];
      }
    });

    input.classList.add('input-error');
    errorMessageNode.classList.add('active-error');
    errorMessageNode.textContent = mensaje;
    return;
  };

  input.setCustomValidity('');

  const value = input.value;

  if(input.name == "name") {
    nameValidation(input, value);
  };

  if(input.name === 'price') {
    priceValidation(input, value);
  };

  if(input.name === 'image') {
    urlValidation(input, value);
  };

  
  if(input.validity.customError) {
    mensaje = messages[input.name].customError;
  
    input.classList.add('input-error');
    errorMessageNode.classList.add('active-error');
    errorMessageNode.textContent = mensaje;
  };
};


const enableFormButton = () => {
  const button = document.querySelector('#form-data button[type="submit"]');
  let enable = true;
  
  document.querySelectorAll('.input-container input').forEach(input => {
    if (!input.validity.valid) {
      enable = false;
    };
  });

  if(enable) {
    button.classList.remove('btn-disabled');
    button.disabled = false;
  }else {
    button.classList.add('btn-disabled');
    button.disabled = true;
  };
};

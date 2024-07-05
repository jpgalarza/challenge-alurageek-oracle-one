import { numberFormat } from "../../helpers/numberFormat.js";
import { servicesProducts } from "../services/product-services.js";

document.addEventListener('DOMContentLoaded', load);

function load() {
  render();
  document.querySelector('#form-data').addEventListener('submit', createProduct);
  document.querySelector('#product-grid').addEventListener('click', removeProduct);
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
                            <button data-id="${id}">
                              <img src="assets/images/trash-icon.svg" alt="" data-id="${id}" />
                            </button>
                          </div>
                        </div>`;
  
  productGrid.insertAdjacentHTML('beforeend', cardTemplate);
};

const render = async () => {
  try {
    const productList = await servicesProducts.getProducts();

    productList.forEach(product => {
      const { id, name, price, image } = product;
      createCard(id, name, price, image);
    });
    
  } catch (error) {
    console.log(error);
  }
};


const createProduct = async (e) => {
  e.preventDefault()

  const name = e.target.elements["name"].value;
  const price = e.target.elements["price"].value;
  const image = e.target.elements["image"].value || 'assets/images/default-image.png';

  try {
    await servicesProducts.postProduct(name, price, image);
  } catch (error) {
    console.log(error);
  }; 
}


const removeProduct = async (e) => {
  if(e.target.dataset.id) {
    try {
    await servicesProducts.deleteProduct(e.target.dataset.id);
  } catch (error) {
    console.log(error);
  }; 
  };
}

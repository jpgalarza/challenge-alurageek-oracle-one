import { servicesProducts } from "../services/product-services.js";

document.addEventListener('DOMContentLoaded', load);

function load() {
  render();
};


const createCard = (id, name, price, image) => {
  const productGrid = document.querySelector('#product-grid');

  const cardTemplate = `<div class="card">
                          <div class="img-container">
                            <img src="${image}" alt="" />
                          </div>
                          <p>${name}</p>
                          <div class="card-footer">
                            <p>${price}</p>
                            <button data-id="${id}">
                              <img src="assets/images/trash-icon.svg" alt="" />
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

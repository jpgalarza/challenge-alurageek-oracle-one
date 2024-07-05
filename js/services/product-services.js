const getProducts = async () => {
  try {
    const response = await fetch('http://localhost:3000/products');
    return await response.json();

  } catch (error) {
    console.log(error);
  }
}

const postProduct = async (name, price, image) => {
  try {
    const response = await fetch('http://localhost:3000/products', {
      method: "POST",
      headers: {
        "Content-Type": "aplication/json"
      },
      body: JSON.stringify({
        name,
        price,
        image
      })
    });

    return await response.json();

  } catch (error) {
    console.log(error);
  }
}

const deleteProduct = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "aplication/json"
      },
    });

    return await response.json();

  } catch (error) {
    console.log(error);
  }
}


export const servicesProducts = {
  getProducts,
  postProduct,
  deleteProduct
}
const getProducts = async () => {
  try {
    const response = await fetch('https://api-json-server-qame.onrender.com/products');
    return await response.json();

  } catch (error) {
    console.log(error);
  }
}

const postProduct = async (name, price, image) => {
  try {
    const response = await fetch('https://api-json-server-qame.onrender.com/products', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
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
    const response = await fetch(`https://api-json-server-qame.onrender.com/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
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
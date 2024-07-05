const getProducts = async () => {
  try {
    const response = await fetch('http://localhost:3000/products');
    return await response.json();

  } catch (error) {
    console.log(error);
  }
}


export const servicesProducts = {
  getProducts
}
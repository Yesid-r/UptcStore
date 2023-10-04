export const API_URL = "http://localhost:4000"
export const API_PAYMENT = "http://localhost:3000"
export async function fetchDataFromAPI() {
    const response = await fetch("http://localhost:4000/products");
    
    if (!response.ok) {
      throw new Error("No se pudo obtener la data de productos");
    }
    
    const data = await response.json();
    const productsData = data.dataProducts;
  
    return productsData;
  }

  
const BATCHSIZE = 10;
export async function getProducts(skip = 0) {
  try {
    const response = await fetch(
      `https://dummyjson.com/products?limit=${BATCHSIZE}&skip=${skip}`
    );
    const data = await response.json();
    return { total: data.total, products: data.products };
  } catch (error) {
    return { total: 0, products: [] };
  }
}

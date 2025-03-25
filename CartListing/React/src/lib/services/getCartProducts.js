export default async function getCartProducts() {
    try {
        const response=await fetch("https://fakestoreapi.com/carts/2");
        if (!response.ok) {
          throw new Error(response.statusText,{cause:response.status});
        }
        const data=await response.json();
        return data.products
    } catch (error) {
        throw new Error(error.message);
    }
}
export async function getProducts(sort="asc") {
    try {
        const response=await fetch(`https://fakestoreapi.com/products?sort=${sort}`);
        if (!response.ok) {
            throw new Error(response.status,{cause:response.statusText});
        }
        const data=await response.json();
        return data
    } catch (error) {
        throw new Error(error.message);
        
    }
}
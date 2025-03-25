export default async function getProductDetails(id) {
    try {
        const response=await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error(response.statusText,{cause:response.status});
        }
        const data=await response.json();
        return {title:data.title,price:data.price,image:data.image,id:data.id}
    } catch (error) {
        throw new Error(error.message);
    }
}
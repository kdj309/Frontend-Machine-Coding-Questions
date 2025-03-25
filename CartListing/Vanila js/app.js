const productsContainerRef=document.querySelector(".cart-products-container");
let productsdetails=[];
const productpromises=[]
async function getProducts() {
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
async function getProductDetails(id) {
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
function createProductCard(product) {
    const {id,title,image,price}=product;
    const productDiv=document.createElement("div");
    productDiv.classList.add("product-card");
    productDiv.id=id
    productDiv.innerHTML+=`
            <figure class="product-card--image">
        <img src=${image} alt=${title}>
        <figcaption>${title}</figcaption>
    </figure>
        <div class="product-card--info">
        <p>$${price}</p>
        </div>
    `
   return productDiv;
}
(async()=>{
    const productsFragment=document.createDocumentFragment()
    const products=await getProducts();
    products.forEach(product => {
        productpromises.push(getProductDetails(product.productId))
    });
    productsdetails=await Promise.all(productpromises);
    productsdetails.forEach((product)=>{
        productsFragment.appendChild(createProductCard(product))
    })
    productsContainerRef.appendChild(productsFragment)
})()
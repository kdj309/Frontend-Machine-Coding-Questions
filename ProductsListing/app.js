const productscontainerRef=document.querySelector(".products-container")
const sortselectInput=document.querySelector("#sort-selectinput")
function createProductCard(product) {
    const {id,category,title,description,image,price}=product;
    const productDiv=document.createElement("div");
    productDiv.classList.add("product-card");
    productDiv.id=id
    productDiv.innerHTML+=`
            <figure class="product-card--image">
        <img src=${image} alt=${title}>
        <figcaption>${title}</figcaption>
    </figure>
        <div class="product-card--description">
            <p>${description}</p>
        </div>
        <div class="product-card--info">
            <p>${category}</p><p>$${price}</p>
        </div>
    `
   return productDiv;
}
async function getProducts(sort="asc") {
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
async function addProductsToDom(sort="asc") {
    const productContainerFrgament=document.createDocumentFragment()
    try {
        const products=await getProducts(sort);
        products.forEach((product)=>{
            productContainerFrgament.appendChild(createProductCard(product))
        })
        productscontainerRef.replaceChildren(productContainerFrgament)
    } catch (error) {
        console.error(error)
    }
}
(async()=>{
    await addProductsToDom()
})()
sortselectInput.addEventListener("change",(e)=>{
    addProductsToDom(e.target.value)
})
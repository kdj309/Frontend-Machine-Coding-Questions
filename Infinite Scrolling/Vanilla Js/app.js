//! url=https://dummyjson.com/products?skip=5
const batchsize = 10;
let total = null;
let loadedproducts = 0;
let isLoading = false;
const productscontainer = document.querySelector(".products_container");
async function getProducts(skip = 0) {
    const response = await fetch(
        `https://dummyjson.com/products?limit=${batchsize}&skip=${skip}`
    );
    const data = await response.json();
    return { total: data.total, products: data.products };
}
function createProductItemDiv(product, isLast) {
    const productdiv = document.createElement("div");
    productdiv.className = "products_container_item";
    if (isLast) {
        productdiv.id = "lastproduct";
    }
    productdiv.innerHTML = `
        <img
          src="${product.thumbnail}"
          alt="image-thumbnail"
        />
        <div class="products_container_item-details">
          <h3>${product.title}</h3>
          <p>${product.description}</p>
        </div>
        <div class="products_container_item-info">
          <div>${product.price} Rs</div>
          <div>${product.rating} ⭐</div>
        </div>
        <div class="products_container_item-actions">
          <button>Buy</button>
        </div>
    `;
    return productdiv;
}
async function addProductsToDom() {
    if (isLoading || (total !== null && loadedproducts >= total)) {
        return;
    }
    isLoading = true;
    const { products, total: productstotal } = await getProducts(loadedproducts);
    isLoading = false;
    if (total === null) total = productstotal;
    loadedproducts += products.length;
    const fragment = document.createDocumentFragment();
    for (let index = 0; index < products.length; index++) {
        const product = products[index];
        const islast = index === products.length - 1;
        fragment.appendChild(createProductItemDiv(product, islast));
    }
    productscontainer.appendChild(fragment);
    if (loadedproducts < total) {
        observeLastElement();
    } else {
        disconnectObserver()
    }
}
const observer = new IntersectionObserver(
    (entries) => {
        const lastelement = entries[0];
        if (
            lastelement.isIntersecting &&
            (total === null || loadedproducts < total)
        ) {
            lastelement.target.removeAttribute("id");
            addProductsToDom();
        }
    },
    { threshold: 1.0 }
);

function observeLastElement() {
    const lastProductRef = document.querySelector("#lastproduct");
    if (lastProductRef) {
        observer.observe(lastProductRef);
    }
}
async function infiniteScroll() {
    await addProductsToDom();
}
function disconnectObserver() {
    observer.disconnect();
    console.log("All products loaded. Observer disconnected.");
}
infiniteScroll();

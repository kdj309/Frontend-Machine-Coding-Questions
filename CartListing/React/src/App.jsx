import { useState, useEffect } from "react";

import "./App.css";
import getCartProducts from "./lib/services/getCartProducts";
import getProductDetails from "./lib/services/getProduct";

import ProductCard from "./components/ProductCard";

function App() {
  const [cartProducts, setCartProducts] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const cartProducts = await getCartProducts();
        const products = await Promise.all(
          cartProducts.map((product) => getProductDetails(product.productId))
        );
        setCartProducts(products);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <main>
        <section className="cart-container">
          <h2>Cart</h2>
          <div className="cart-products-container">
            {cartProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default App;

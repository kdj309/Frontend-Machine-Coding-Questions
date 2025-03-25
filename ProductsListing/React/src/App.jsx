import { useState, useEffect } from "react";
import "./App.css";
import { getProducts } from "./lib/services/getSortedProducts";
import ProductCard from "./components/ProductCard";
function App() {
  const [sortingOrder, setSortingOrder] = useState("desc");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const products = await getProducts(sortingOrder);
        setProducts(products);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [sortingOrder]);

  return (
    <>
      <h2>Product Listing</h2>
      <section>
        <select
          id="sort-selectinput"
          value={sortingOrder}
          onChange={(e) => setSortingOrder(e.target.value)}
        >
          <option selected value="asc">
            asc
          </option>
          <option value="desc">desc</option>
        </select>
      </section>
      <section className="products-container">
        {products.map((product) => {
          return <ProductCard key={product.id} product={product}></ProductCard>;
        })}
      </section>
    </>
  );
}

export default App;

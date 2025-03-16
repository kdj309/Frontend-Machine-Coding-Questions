import { useCallback, useEffect, useRef, useState } from "react";
import { getProducts } from "../services/getProducts";
import Product from "./Product";

const Products = () => {
  const [skip, setSkip] = useState<number>(0);
  const [total, setTotal] = useState<number | null>(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const observer = useRef<IntersectionObserver | null>();
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver(
        (entries) => {
          const lastElement = entries[0];

          if (lastElement.isIntersecting && (total === null || skip < total)) {
            setSkip((prev) => (prev += 10));
          }
        },
        { threshold: 1.0 }
      );
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, total, products.length]
  );
  useEffect(() => {
    (async () => {
      setLoading(true);
      const { products, total: productstotal } = await getProducts(skip);
      setLoading(false);
      if (products.length) {
        //@ts-ignore
        setProducts((prev) => [...prev, ...products]);
      }
      if (!total) {
        setTotal(productstotal);
      }
    })();
  }, [skip]);

  return (
    <div className="products_container">
      {products.map((p, index) => (
        <Product
          key={index}
          lastelementRef={index === products.length - 1 ? lastElementRef : null}
          isLast={index === products.length - 1}
          product={p}
        ></Product>
      ))}
    </div>
  );
};
export default Products;

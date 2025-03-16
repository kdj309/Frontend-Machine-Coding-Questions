export default function Product({
  product,
  isLast,
  lastelementRef,
}: {
  product: {
    thumbnail: string;
    title: string;
    description: string;
    price: number;
    rating: number;
  };
  isLast: boolean;
  lastelementRef: ((node: any) => void) | null;
}) {
  return isLast ? (
    <div
      id="lastproduct"
      className="products_container_item"
      ref={lastelementRef}
    >
      <img src={product.thumbnail} alt="image-thumbnail" />
      <div className="products_container_item-details">
        <h3>{product.title}</h3>
        <p>{product.description}</p>
      </div>
      <div className="products_container_item-info">
        <div>{product.price} Rs</div>
        <div>{product.rating} ⭐</div>
      </div>
      <div className="products_container_item-actions">
        <button>Buy</button>
      </div>
    </div>
  ) : (
    <div className="products_container_item">
      <img src={product.thumbnail} alt="image-thumbnail" />
      <div className="products_container_item-details">
        <h3>{product.title}</h3>
        <p>{product.description}</p>
      </div>
      <div className="products_container_item-info">
        <div>{product.price} Rs</div>
        <div>{product.rating} ⭐</div>
      </div>
      <div className="products_container_item-actions">
        <button>Buy</button>
      </div>
    </div>
  );
}

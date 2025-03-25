import React from "react";

export default function ProductCard({ product }) {
  const { id, category, title, description, image, price } = product;
  return (
    <div className="product-card" id={id}>
      <figure className="product-card--image">
        <img src={image} alt={title} />
        <figcaption>{title}</figcaption>
      </figure>
      <div className="product-card--description">
        <p>{description}</p>
      </div>
      <div className="product-card--info">
        <p>{category}</p>
        <p>${price}</p>
      </div>
    </div>
  );
}

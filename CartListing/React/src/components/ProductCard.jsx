import React from 'react'

export default function ProductCard({product}) {
    const {title,image,price}=product
  return (
    <div className='product-card'>
         <figure className="product-card--image">
        <img src={image} alt={title}/>
        <figcaption>${title}</figcaption>
    </figure>
        <div className="product-card--info">
        <p>$${price}</p>
        </div>
    </div>
  )
}

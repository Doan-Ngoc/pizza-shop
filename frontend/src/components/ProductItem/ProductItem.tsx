

import React from 'react';
import { Link } from 'react-router-dom';
import { FoodItem } from '../../redux/interfaces';
import './ProductItem.css';
import './ProductItemResponsive.css'

interface ProductItemProps {
  dish: FoodItem;
}
const ProductItem: React.FC<ProductItemProps> = ({ dish }) => {
  const { id, name, image, price } = dish;

  return (
    <div className="product-item card">
      <div className="card-img-top">
        <img src={`images/menu-page/${image}`} alt={name} />
      </div>
      <div className="card-body text-center">

        <h5 className="card-title">{name}</h5>
        <div className='price-and-btn d-flex justify-content-center align-items-center gap-4'>
          <p className="card-text">{price.toLocaleString('vi', {style : 'currency', currency : 'VND'})} </p>
          <Link to={`/dish-details/${id}`}>
            <button className="cart-item-buy-btn btn btn-primary rounded-pill">
              Chi tiết </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;





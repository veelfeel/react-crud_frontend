import React from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { urlApi } from '../utils/api';

export const ProductBlock = ({ setProducts, _id, status, name, price, imageUrls }) => {
  const deleteProduct = async () => {
    try {
      const { data } = await axios.delete(`${urlApi}/api/products/${_id}`);
      setProducts(data.products);
      localStorage.removeItem(`${_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="product-block">
      <ul className="product-block__content">
        <li>
          <input type="checkbox" />
        </li>
        <li>
          <Link to={`/products/edit/${_id}`}>
            {imageUrls && (
              <img
                width="70"
                height="70"
                className="product-block__img"
                src={imageUrls[0]}
                alt={name}
              />
            )}
          </Link>
        </li>
        <li>
          <Link to={`/products/edit/${_id}`} className="product-block__link-to-edit">
            <h3 className="product-block__title">{name}</h3>
          </Link>
        </li>
        <li>
          <Link to={`/products/edit/${_id}`} className="product-block__link-to-edit">
            <span
              className={
                status === 'Активный'
                  ? 'product-block__status'
                  : 'product-block__status product-block__status--archival'
              }>
              {status === 'Активный' ? <>Active</> : <>Аrchival</>}
            </span>
          </Link>
        </li>
        <li className="product-block__price">
          <Link to={`/products/edit/${_id}`} className="product-block__link-to-edit">
            <div className="product-block__price">{price}</div>
          </Link>
        </li>
        <li>
          <button className="product-block__button" onClick={() => deleteProduct()}>
            Удалить
          </button>
        </li>
      </ul>
    </div>
  );
};

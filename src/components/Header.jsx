import React from 'react';
import { Link } from 'react-router-dom';

import arrowSvg from '../assets/arrow.svg';

export const Header = ({ isEditing }) => {
  return (
    <header className="product-screen__header">
      <Link to="/products">
        <img width="32" height="32" src={arrowSvg} alt="come-back" />
      </Link>
      <h1 className="product-screen__header-title">
        {isEditing ? 'Редактировать товар' : 'Добавить товар'}
      </h1>
    </header>
  );
};

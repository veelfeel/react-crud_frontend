import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = ({ isEditing, handleCreateProduct }) => {
  return (
    <footer className="product-screen__footer">
      <Link to="/products" className="button button--secondary">
        Отмена
      </Link>
      <button className="button" onClick={() => handleCreateProduct()}>
        {isEditing ? 'Сохранить' : 'Создать товар'}
      </button>
    </footer>
  );
};

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './app.css';

import ProductList from './pages/ProductList';
import AddProduct from './pages/AddProduct';

function App() {
  return (
    <Routes>
      <Route path="/products" element={<ProductList />}></Route>
      <Route path="/products/create" element={<AddProduct />}></Route>
      <Route path="/products/edit/:id" element={<AddProduct />}></Route>
    </Routes>
  );
}

export default App;

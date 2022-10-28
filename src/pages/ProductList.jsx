import React from 'react';
import debounce from 'lodash.debounce';
import { Link } from 'react-router-dom';

import { fetchProducts } from '../utils/api';

import { ProductBlock } from '../components';

const ProductList = () => {
  const [products, setProducts] = React.useState([]);
  const [loading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [searchValue, setSearchValue] = React.useState('');

  const limit = 5;

  const getProductsPage = (arr) => {
    const start = limit * (page - 1);
    const end = limit * page;
    return arr.slice(start, end);
  };

  const onChangeSearchValue = React.useMemo(
    () => debounce((e) => setSearchValue(e.target.value), 150),
    [],
  );

  React.useEffect(() => {
    fetchProducts().then((data) => setProducts(data));
    setIsLoading(false);
  }, []);

  return (
    <div className="products-screen">
      <div className="container">
        <header className="products__header space-between">
          <div className="space-between">
            <h1>Товары&nbsp;</h1>
            {products.length !== 0 && (
              <div className="products-screen__products-amount">{products.length}</div>
            )}
          </div>
          <Link to="/products/create" className="button">
            Добавить
          </Link>
        </header>
        <div className="products-screen__content">
          <div className="products-list__header">
            <ul className="products-list__content">
              <li>
                <input onChange={onChangeSearchValue} />
              </li>
              <li>
                <input type="checkbox" />
              </li>
              <li>
                <div>Название</div>
              </li>
              <li>
                <div>Статус</div>
              </li>
              <li>
                <div>Цена</div>
              </li>
            </ul>
          </div>
          <div className="product-container">
            {!loading &&
              getProductsPage(
                products.filter((obj) =>
                  obj.name.toLowerCase().includes(searchValue.toLowerCase()),
                ),
              ).map((product) => (
                <ProductBlock key={product._id} setProducts={setProducts} {...product} />
              ))}
          </div>
          <div className="products-screen__pagination">
            <button
              disabled={page === 1}
              className="products-screen__pagination-button"
              onClick={() => setPage(page - 1)}>
              Previous
            </button>
            <button
              disabled={products.length <= limit || page === Math.ceil(products.length / limit)}
              className="products-screen__pagination-button"
              onClick={() => setPage(page + 1)}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;

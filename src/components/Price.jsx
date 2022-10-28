import React from 'react';
import axios from 'axios';
import { urlApi } from '../utils/api';

export const Price = ({ id, setPrice, price, setCities, cities, setShowCities, showCities }) => {
  const onChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const onChangePriceCities = (e, id) => {
    setCities(cities.map((x) => (x.id === id ? { ...x, cityPrice: e.target.value } : x)));
  };

  const onClickCheckbox = () => {
    setCities(cities.map((city) => ({ ...city, cityPrice: price })));
    setShowCities(!showCities);
  };

  React.useEffect(() => {
    async function fetchCities() {
      const { data } = await axios.get(`${urlApi}/api/cities`);
      setCities(data.map((city) => ({ ...city, cityPrice: '' })));
    }

    fetchCities();

    const storageShowCities = JSON.parse(localStorage.getItem(`${id}`));

    if (!storageShowCities) return;

    setShowCities(storageShowCities);
  }, [id, setCities, setShowCities]);

  return (
    <div className="product-screen__price block">
      <h3 className="product-screen__title">Цена</h3>
      <div className="product-screen__checkbox-group">
        <input
          checked={!showCities}
          onChange={onClickCheckbox}
          type="checkbox"
          id="checkbox-price"
        />
        <label htmlFor="checkbox-price">Одна цена для всех городов</label>
        <input
          disabled={showCities}
          value={price}
          onChange={onChangePrice}
          placeholder="Цена"
          type="number"
        />
      </div>
      {showCities && (
        <table>
          <thead>
            <tr>
              <td>Город</td>
              <td>Цена</td>
            </tr>
          </thead>
          <tbody>
            {cities.map(({ id, name, cityPrice }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>
                  <input
                    value={cityPrice}
                    onChange={(e) => onChangePriceCities(e, id)}
                    placeholder="Цена"
                    type="number"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

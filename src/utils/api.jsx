import axios from 'axios';

export const urlApi = 'http://localhost:5000';

export const fetchProducts = async () => {
  const { data } = await axios.get(`${urlApi}/api/products`);
  return data;
};

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';
import { fetchProducts, urlApi } from '../utils/api';

import validation from '../validation';

import { Header, Text, Media, Status, Price, ValidationMessage, Footer } from '../components';

const AddProduct = () => {
  const { id } = useParams();
  const [addProductId, setAddProductId] = React.useState('');

  const isEditing = Boolean(id);

  const navigate = useNavigate();

  const [name, setName] = React.useState('');
  const [text, setText] = React.useState('');
  const [status, setStatus] = React.useState('Активный');
  const [imageUrls, setImageUrls] = React.useState([]);
  const [price, setPrice] = React.useState('');
  const [cities, setCities] = React.useState([]);

  const [showCities, setShowCities] = React.useState(false);

  const [validationText, setValidationText] = React.useState('');
  const [showMessage, setShowMessage] = React.useState(false);

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const handleCreateProduct = async () => {
    if (!validation(name, imageUrls, price, cities, setShowMessage, showCities, setValidationText))
      return;

    try {
      const fields = {
        name,
        status,
        text,
        imageUrls,
        price,
        cities,
      };

      if (isEditing) {
        await axios.patch(`${urlApi}/api/products/${id}`, fields);
        localStorage.setItem(`${id}`, showCities);
      } else {
        await axios.post(`${urlApi}/api/products`, fields);
        localStorage.setItem(`${addProductId}`, showCities);
      }

      navigate('/products');
    } catch (error) {
      console.warn(error);
      alert('Ошибка при создании товара');
    }
  };

  React.useEffect(() => {
    if (id) {
      async function getProduct() {
        try {
          const { data } = await axios.get(`${urlApi}/api/products/${id}`);
          setName(data.name);
          setText(data.text);
          setStatus(data.status);
          setImageUrls((imageUrls) => imageUrls.concat(data.imageUrls));
          setPrice(data.price);
          setCities(data.cities);
        } catch (err) {
          console.warn(err);
          alert('Ошибка при получении товара');
        }
      }

      getProduct();
    } else {
      fetchProducts().then((data) => setAddProductId(String(data.length + 1)));
    }
  }, [id]);

  return (
    <div className="product-screen">
      <div className="container">
        <Header isEditing={isEditing} />
        <div className="product-screen__content">
          <Text onChangeName={onChangeName} name={name} setText={setText} text={text} />
          <Status setStatus={setStatus} status={status} />
          <Media setImageUrls={setImageUrls} imageUrls={imageUrls} />
          <Price
            id={id}
            setPrice={setPrice}
            price={price}
            setCities={setCities}
            cities={cities}
            setShowCities={setShowCities}
            showCities={showCities}
          />
          <ValidationMessage
            setShowMessage={setShowMessage}
            showMessage={showMessage}
            validationText={validationText}
          />
        </div>
        <Footer isEditing={isEditing} handleCreateProduct={handleCreateProduct} />
      </div>
    </div>
  );
};

export default AddProduct;

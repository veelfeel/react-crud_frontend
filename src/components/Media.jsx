import React from 'react';
import axios from 'axios';

import { urlApi } from '../utils/api';

import deleteImgSvg from '../assets/delete-button.svg';

export const Media = ({ setImageUrls, imageUrls }) => {
  const inputFileRef = React.useRef(null);

  const onChangeFile = async (e) => {
    try {
      const files = Array.from(e.target.files);
      const formData = new FormData();
      files.forEach((file) => formData.append('images', file));

      const { data } = await axios.post(`${urlApi}/upload`, formData);
      setImageUrls((imageUrls) => imageUrls.concat(data.urls));
    } catch (error) {
      console.log(error);
      alert('Ошибка при загрузке файла');
    }
  };

  const onClickRemoveImage = (imageUrl) => {
    setImageUrls(imageUrls.filter((x) => x !== imageUrl));
  };

  return (
    <div className="product-screen__media block">
      <h3 className="product-screen__title">Медиа</h3>
      <div className="product-screen__media-content">
        <div className="product-screen__media-container">
          {imageUrls &&
            imageUrls.map((imageUrl, index) => (
              <div key={index} className="media-item">
                <img src={imageUrl} alt="" className="preview__image" />
                <button
                  className="preview__delete-button"
                  onClick={() => onClickRemoveImage(imageUrl)}>
                  <img width="32" height="32" src={deleteImgSvg} alt="delete-button" />
                </button>
              </div>
            ))}
          <input ref={inputFileRef} onChange={onChangeFile} type="file" multiple hidden />
          <button
            onClick={() => inputFileRef.current.click()}
            className="product-screen__media-input-file">
            <span>Добавить файл</span>
          </button>
        </div>
      </div>
    </div>
  );
};

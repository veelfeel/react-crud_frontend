import React from 'react';

export const ValidationMessage = ({ setShowMessage, showMessage, validationText }) => {
  const onClickCloseMessage = () => {
    setShowMessage(!showMessage);
  };

  return (
    showMessage && (
      <div className="message">
        <div className="message__content">
          <div className="message__text">{validationText}</div>
          <button className="button message__button" onClick={onClickCloseMessage}>
            Ок
          </button>
        </div>
      </div>
    )
  );
};

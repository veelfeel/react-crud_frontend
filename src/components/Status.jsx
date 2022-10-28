import React from 'react';

import selectStatusSvg from '../assets/select.svg';

export const productStatuses = ['Активный', 'Архивный'];

export const Status = ({ setStatus, status }) => {
  const [openStatus, setOpenStatus] = React.useState(false);

  const refProductStatus = React.useRef(null);

  const onClickNameStatus = (item) => {
    setStatus(item);
    setOpenStatus(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (refProductStatus.current && !e.path.includes(refProductStatus.current)) {
        setOpenStatus(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="product-screen__status block">
      <h3 className="product-screen__title">Статус товара</h3>
      <div
        ref={refProductStatus}
        onClick={() => setOpenStatus(!openStatus)}
        className="product-screen__status-text">
        {status}
        <img width="10" height="10" src={selectStatusSvg} alt="select" />
      </div>
      {openStatus && (
        <div className="product-screen__popup">
          <ul>
            {productStatuses.map((item, idx) => (
              <li
                className={
                  status === item
                    ? 'product-screen__popup-item product-screen__popup-item--active'
                    : 'product-screen__popup-item'
                }
                onClick={() => onClickNameStatus(item)}
                key={idx}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

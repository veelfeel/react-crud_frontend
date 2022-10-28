import React from 'react';

import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';

export const Text = ({ onChangeName, name, setText, text }) => {
  const onChange = React.useCallback(
    (value) => {
      setText(value);
    },
    [setText],
  );

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Добавьте описание...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
        uniqueId: 'unique',
      },
      forceSync: true,
    }),
    [],
  );

  return (
    <div className="product-screen__text block">
      <h3 className="product-screen__title">Название товара</h3>
      <input value={name} onChange={onChangeName} placeholder="Введите название" type="text" />
      <h3 className="product-screen__title">Описание</h3>
      <SimpleMDE value={text} onChange={onChange} options={options} />
    </div>
  );
};

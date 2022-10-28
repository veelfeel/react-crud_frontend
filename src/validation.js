const validation = (
  name,
  imageUrls,
  price,
  cities,
  setShowMessage,
  showCities,
  setValidationText,
) => {
  const citiesWithoutPrice = cities
    .filter((city) => city.cityPrice === '')
    .map((city) => city.name);

  if (!Boolean(name)) {
    setValidationText('Заполните название');
    setShowMessage(true);
    return false;
  }

  if (!Boolean(imageUrls.length)) {
    setValidationText('Добавьте изображение');
    setShowMessage(true);
    return false;
  }

  if (!showCities && !Boolean(price)) {
    setValidationText('Введите цену');
    setShowMessage(true);
    return false;
  }

  if (showCities && Boolean(citiesWithoutPrice.length)) {
    setValidationText(
      `Добавьте ${citiesWithoutPrice.length !== 1 ? 'цены' : 'цену'} для ${
        citiesWithoutPrice.length !== 1 ? 'городов' : 'города'
      }: ${citiesWithoutPrice.join(', ')}`,
    );
    setShowMessage(true);
    return false;
  }

  return true;
};

export default validation;

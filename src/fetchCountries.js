import Notiflix from 'notiflix';

export const fetchCountries = name =>
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags`
  ).then(response => {
    if (!response.ok) {
      Notiflix.Notify.failure(
        'Too many matches found. Please enter a more specific name.'
      );
    }
    return response.json();
  });

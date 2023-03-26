import Notiflix from 'notiflix';

export const fetchCountries = name =>
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags`
  )
    .then(response => {
      if (!response.ok) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
      return response.json();
    })
    .catch(console.warn);

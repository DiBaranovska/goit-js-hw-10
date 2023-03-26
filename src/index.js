import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

const serchCounry = () => {
  const serchQuery = inputEl.value.trim();
  if (serchQuery != '') {
    fetchCountries(serchQuery).then(data => {
      countryInfoEl.innerHTML = '';
      if (data.length > 1 && data.length <= 10) {
        const coutryEl = data
          .map(
            element => `
      <li class="country-item">
      <img src = "${element.flags.svg}" width="50" 
  >
      <p class="country-name">${element.name.official}</p>
      </li>`
          )
          .join(' ');
        countryListEl.innerHTML = coutryEl;
      } else if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length === 1) {
        countryListEl.innerHTML = '';
        const coutryEl = data
          .map(
            element => ` <img src = "${
              element.flags.svg
            }" width="40" height = "40" 
  >
   <p class="country-name country-title">${element.name.official}</p>
   <ul>
      <li><span class = "country-item">Capital:</span> ${element.capital}</li>
      <li><span class = "country-item">Population:</span> ${
        element.population
      }</li>
      <li><span class = "country-item">Languages:</span> ${Object.values(
        element.languages
      ).join(', ')}</li>
    </ul>
        `
          )
          .join(' ');
        countryInfoEl.innerHTML = coutryEl;
      } else {
        return Notiflix.Notify.failure(
          'Oops, there is no country with that name'
        );
      }
    });
  } else {
    countryInfoEl.innerHTML = '';
    countryListEl.innerHTML = '';
  }
};

inputEl.addEventListener('input', debounce(serchCounry, DEBOUNCE_DELAY));

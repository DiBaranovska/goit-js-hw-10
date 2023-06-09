import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

const counryListMarkup = data => {
  return data
    .map(
      element => `
      <li class="country-item">
      <img src = "${element.flags.svg}" width="50" 
  >
      <p class="country-name">${element.name.official}</p>
      </li>`
    )
    .join(' ');
};

const countryCardMarkup = data => {
  return data
    .map(
      element => ` <img src = "${element.flags.svg}" width="40" height = "40" 
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
};

const serchCounry = () => {
  const serchQuery = inputEl.value.trim();
  if (serchQuery != '') {
    fetchCountries(serchQuery)
      .then(data => {
        countryInfoEl.innerHTML = '';
        if (data.length > 1 && data.length <= 10) {
          countryListEl.innerHTML = counryListMarkup(data);
        } else if (data.length > 10) {
          countryInfoEl.innerHTML = '';
          countryListEl.innerHTML = '';
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (data.length === 1) {
          countryListEl.innerHTML = '';
          countryInfoEl.innerHTML = countryCardMarkup(data);
        } else {
          countryInfoEl.innerHTML = '';
          countryListEl.innerHTML = '';
        }
      })
      .catch(console.warn);
  }
};

inputEl.addEventListener('input', debounce(serchCounry, DEBOUNCE_DELAY));

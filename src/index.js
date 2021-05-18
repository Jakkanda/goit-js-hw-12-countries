import debounce from 'lodash.debounce';
import { error } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import './sass/main.scss';
import fetchCountries from './js/fetchCountries';
import countriesListTemplate from './templates/list-template.hbs';
import countriesCardTemplate from './templates/card-template.hbs';

const refs = {
  input: document.querySelector('.search-countries'),
  countryCard: document.querySelector('.country-card-wrapper'),
};

refs.input.addEventListener('input', debounce(onInputChange, 500));

function onInputChange(event) {
  const searchQuery = event.target.value;
  refs.countryCard.innerHTML = '';
  return fetchCountries(searchQuery)
    .then(updatePage)
    .catch(error => console.log(error));
}

function renderCountriesList(countries) {
  const markup = countriesListTemplate(countries);
  refs.countryCard.insertAdjacentHTML('beforeend', markup);
}

function renderCountryCard(countries) {
  const markup = countriesCardTemplate(countries[0]);
  refs.countryCard.insertAdjacentHTML('beforeend', markup);
}

function muchMoreCountries() {
  error({
    text: 'To many matches found. Please enter a more specific query!',
  });
}

function updatePage(result) {
  if (result.length > 10) {
    muchMoreCountries();
    return;
  }
  if (result.length >= 2 && result.length <= 10) {
    renderCountriesList(result);
    return;
  }
  renderCountryCard(result);
}

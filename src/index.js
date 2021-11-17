import './sass/main.scss';
import axios from 'axios';
import Notiflix from 'notiflix';
import NewsApiService from './js/services/fetch-api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import galleryCards from './templates/gallery-cards.hbs';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
// const input = document.querySelector('[type=text]');
// const button = document.querySelector('[type=submit]');

const newsApiService = new NewsApiService();

searchForm.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();
  newsApiService.query = event.currentTarget.elements.query.value;
  fetchGallery();
}

function fetchGallery() {
  newsApiService.fetchGallery().then(images => {
    appendGalleryMarkup(images);
  });
}
function appendGalleryMarkup(images) {
  gallery.insertAdjacentHTML('beforeend', gallerycards(images));
}
// const getContactId = searchImage => {
//   return axios.get(``);
// };

// const createContact = contact => {
//     return axios.post(`${BASE URL}`)
// }

// const deleteContact = id => {
//     return axios.delete(``)
// }

// const updateContact = id => {
//     return axios.put(`${}`)
// }

// webformatURL - ссылка на маленькое изображение для списка карточек.
// largeImageURL - ссылка на большое изображение.
// tags - строка с описанием изображения. Подойдет для атрибута alt.
// likes - количество лайков.
// views - количество просмотров.
// comments - количество комментариев.
// downloads - количество загрузок.

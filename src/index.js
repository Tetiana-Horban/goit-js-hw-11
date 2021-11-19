import './sass/main.scss';
import axios from 'axios';
import Notiflix from 'notiflix';
import NewsApiService from './js/services/fetch-api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import galleryCards from './templates/gallery-cards.hbs';
import LoadMoreBtn from './js/components/load-more-button';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');

const buttonLoadMore = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const newsApiService = new NewsApiService();
const lightbox = new SimpleLightbox('.gallery .gallery__item', {
  captions: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  nav: true,
  close: true,
});

let totalHits = 0;

searchForm.addEventListener('submit', onSearch);
buttonLoadMore.refs.button.addEventListener('click', onLoadMore);

function onSearch(event) {
  event.preventDefault();

  newsApiService.searchImages = event.currentTarget.elements.searchQuery.value.trim();
  newsApiService.resetPage();
  if (newsApiService.searchImages === '') {
    return Notiflix.Notify.warning(`Oops! You need to enter some value`);
  }
  buttonLoadMore.show();

  newsApiService.fetchImages().then(hits => {
    clearGalleryConteiner();
    appendGalleryMarkup(hits);
  });
}

function appendGalleryMarkup(hits) {
  gallery.insertAdjacentHTML('beforeend', galleryCards(hits));
  lightbox.refresh();
  totalHits += hits.length;

  Notiflix.Notify.success(`Hooray! We found ${totalHits} images for you`);
}

function onLoadMore() {
  newsApiService.fetchImages().then(appendGalleryMarkup);
}

function clearGalleryConteiner() {
  clearTotalHits();
  gallery.innerHTML = '';
}

function clearTotalHits() {
  totalHits = 0;
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

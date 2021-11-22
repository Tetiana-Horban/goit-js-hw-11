import './sass/main.scss';
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

let totalHitsShow = 0;

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
    showTotalHits();
  });
}

function appendGalleryMarkup({ hits }) {
  gallery.insertAdjacentHTML('beforeend', galleryCards(hits));
  lightbox.refresh();

  totalHitsShow += hits.length;

  if (hits.length === 0) {
    return Notiflix.Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`,
    );
  }

  newsApiService.fetchImages().then(response => {
    newsApiService.totalHits = response.totalHits;

    if (totalHitsShow >= response.totalHits) {
      setTimeout(hideButtonEndImages, 3000);
    }
  });
  clearTotalHits();
}

window.addEventListener('scroll', () => {
  scrollByDown(buttonLoadMore);
});

function showTotalHits() {
  newsApiService.fetchImages().then(response => {
    newsApiService.totalHits = response.totalHits;
    return Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images for you`);
  });
}

function onLoadMore() {
  newsApiService.fetchImages().then(appendGalleryMarkup);
}

function clearGalleryConteiner() {
  clearTotalHits();
  gallery.innerHTML = '';
}

function clearTotalHits() {
  newsApiService.totalHits = 0;
}

function hideButtonEndImages() {
  buttonLoadMore.hide();
  return Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
}

function scrollByDown() {
  const cardHeight = gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight.y * -2,
    behavior: 'smooth',
  });
}

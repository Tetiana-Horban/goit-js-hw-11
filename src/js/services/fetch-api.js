const BASE_URL = 'https://pixabay.com/api/';
const KEY = '24373442-b431678aac0bac18598ec6531';
const OPTIONS = 'image_type=photo&orientation=horizontal&safesearch=true';

export default class NewsApiService {
  constructor() {
    this.searchImages = '';
    this.page = 1;
    this.per_page = 3;
    this.totalHits = 1;
  }

  fetchImages() {
    const url = `${BASE_URL}?key=${KEY}&q=${this.searchImages}&${OPTIONS}&page=${this.page}&per_page=${this.per_page}`;
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        if (data.hits.length === 0) {
          return Notiflix.Notify.failure(
            `Sorry, there are no images matching your search query. Please try again.`,
          );
        }
        this.incrementPage();
        return data.hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchImages;
  }

  set query(newQuery) {
    this.searchImages = newQuery;
  }
}

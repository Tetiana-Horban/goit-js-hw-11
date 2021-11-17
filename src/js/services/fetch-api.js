const BASE_URL = 'https://pixabay.com/api/';
const KEY = '24373442-b431678aac0bac18598ec6531';
const OPTIONS = 'image_type=photo&orientation=horizontal&safesearch=true';

export default class NewsApiService {
  constructor() {
    this.searchImages = '';
    this.page = '';
  }

  fetchImages() {
    return fetch(`${BASE_URL}?${KEY}&q${this.searchImages}&${OPTIONS}&page=${this.page}`)
      .then(response =>
        // if (!response.ok) {
        //   throw Error(response.statusText);
        // }
        response.json(),
      )
      .then(({ cards }) => {
        this.incrementPage();
        return cards;
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

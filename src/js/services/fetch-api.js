import axios from 'axios';

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

  async fetchImages() {
    const url = `${BASE_URL}?key=${KEY}&q=${this.searchImages}&${OPTIONS}&page=${this.page}&per_page=${this.per_page}`;
    try {
      const response = await axios.get(url);
      this.incrementPage();

      return response.data.hits;
    } catch (error) {
      console.log(error);
    }
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

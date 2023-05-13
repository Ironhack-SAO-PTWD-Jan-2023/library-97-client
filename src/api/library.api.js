import axios from 'axios';

class LibApi {
  constructor(baseURL) {
    this.api = axios.create({
      baseURL
    })
  }

  getBooks = async () => {
    try {
      const { data } = await this.api.get('/books');
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  getBook = async (bookId) => {
    try {
      const { data } = await this.api.get(`/books/${bookId}`);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  addBook = async (book) => {
    try {
      const { data } = await this.api.post('/books', book);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  editBook = async (bookId, book) => {
    try {
      const { data } = await this.api.put(`/books/${bookId}`, book);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  removeBook = async (bookId) => {
    try {
      await this.api.delete(`/books/${bookId}`);
    } catch (error) {
      console.error(error);
    }
  }

}

const libApi = new LibApi(process.env.REACT_APP_API_URL);
export default libApi;
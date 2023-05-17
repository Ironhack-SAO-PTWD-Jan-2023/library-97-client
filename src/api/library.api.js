import axios from 'axios';
import { retrieveToken } from '../utils/local-storage.utils';

class LibApi {
  constructor(baseURL) {
    this.api = axios.create({
      baseURL
    })

    this.api.interceptors.request.use((req) => {
      const token = retrieveToken();

      if(token) {
        req.headers.Authorization = `Bearer ${token}`;
      }

      return req;
    })
  }

  signup = async({username, email, password}) => {
    try {
      const { data } = await this.api.post('/auth/signup', {username, email, password});
      return data;
    } catch (error) {
      throw error;
    }
  }

  login = async ({username, password}) => {
    try {
      const { data } = await this.api.post('/auth/login', {username, password});
      // saveToken(data.authToken);
      return data;
    } catch (error) {
      throw error;
    }
  }

  verify = async (token) => {
    const { data } = await this.api.get('/auth/verify', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data;
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
import axios from 'axios';

/**
 * Cliente Axios configurado para la API del backend.
 */
const axiosClient = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosClient;

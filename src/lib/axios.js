import axios from 'axios';

const API = axios.create({
  baseURL: 'https://ujc35n5wgi.execute-api.eu-north-1.amazonaws.com/dev',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;

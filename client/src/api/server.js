import axios from 'axios';

export default axios.create({
  baseURL: 'https://ecom-server2.herokuapp.com',
  withCredentials: true,
});

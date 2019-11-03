import axios from 'axios';
import config from '../config';

export default axios.create({
    baseURL: config.apiUrl,
    timeout: 1000,
    headers: {'Access-Control-Allow-Credentials': true},
    withCredentials: true,
    crossDomain: true,
});
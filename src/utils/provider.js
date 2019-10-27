import axios from 'axios';

export default axios.create({
    baseURL: 'http://test.ru:3000/',
    timeout: 1000,
    headers: {'Access-Control-Allow-Credentials': true},
    withCredentials: true,
    crossDomain: true,
});
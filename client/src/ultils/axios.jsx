import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const axiosPrivate = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

export default instance;

import axios from 'axios';

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;


const tmdbAxios = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
})

tmdbAxios.interceptors.request.use((config) => {
    // config.headers = {
    //     ...config.headers,
    //     Authorization: `Bearer ${TOKEN}`,
    // };
    config.headers.Authorization = `Bearer ${TOKEN}`;
    config.params = {
        ...config.params,
        api_key: TMDB_KEY
    }
    return config;
})

export default tmdbAxios;
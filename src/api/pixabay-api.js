import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '38565431-b345df84834b1c56108720619';
const PARAMS = '&image_type=photo&orientation=horizontal';
const PER_PAGE = 12;

export const getImages = async (query, page) => {
  const { data } = await axios.get(
    `?q=${query}&key=${API_KEY}&per_page=${PER_PAGE}&page=${page}${PARAMS}`
  );
  return data;
};

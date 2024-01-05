import axios from 'axios';
const API_KEY = '40374972-d5f9b0f3adca24ae39029e0ce';
const BASE_YRL = 'https://pixabay.com/api/';
const PER_PAGE = 12;

export const fetchCards = async (name, page) => {
  return await axios.get(
    `${BASE_YRL}?q=${name}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
  );
};

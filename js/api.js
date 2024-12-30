import { renderSketch} from './sketch.js';
import { renderGallery } from './gallery.js';
import { displayDataError } from './message.js';
import { initializePhotoSorting } from './filter-change.js';

const DATA_FETCH_URL = 'https://29.javascript.htmlacademy.pro/kekstagram/data';
const DATA_SEND_URL = 'https://29.javascript.htmlacademy.pro/kekstagram/';
const HTTP_POST_METHOD = 'POST';

const imageFiltersContainer = document.querySelector('.img-filters');

const fetchData = () => {
  fetch(DATA_FETCH_URL)
    .then((response) => response.json())
    .then((pictures) => {
      renderSketch(pictures);
      renderGallery(pictures);
      initializePhotoSorting(pictures);
      imageFiltersContainer.classList.remove('img-filters--inactive');
    })
    .catch(() => {
      displayDataError();
    });
};

const sendRequest = (body) => fetch(
  DATA_SEND_URL,
  {
    method: HTTP_POST_METHOD,
    body,
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
  })
  .catch(() => {
    throw new Error();
  });

export { fetchData, sendRequest };

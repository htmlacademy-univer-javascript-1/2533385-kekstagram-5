import { renderSketch } from './sketch.js';
import { debounce } from './util.js';
const MAX_RANDOM_PHOTOS = 10;
const FILTER_DEBOUNCE_DELAY = 500;
const filtersContainerElement = document.querySelector('.img-filters');
const filterButtonsElement = filtersContainerElement.querySelectorAll('.img-filters__button');

const updateActiveFilterButton = (filterButton) => {
  filterButtonsElement.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  filterButton.classList.add('img-filters__button--active');
  return filterButton.id;
};
const compareByCommentCount = (a, b) => b.comments.length - a.comments.length;
const initializePhotoSorting = (previews, onPhotoClick) => {
  const applySortingWithDebounce = debounce((filterType) => {
    let sortingPictures = previews;
    switch (filterType) {
      case 'filter-random':
        sortingPictures = previews.slice(0, MAX_RANDOM_PHOTOS);
        break;
      case 'filter-discussed':
        sortingPictures = previews.slice().sort(compareByCommentCount);
        break;
      default:
        sortingPictures = previews;
        break;
    }
    renderSketch(sortingPictures, onPhotoClick);
  }, FILTER_DEBOUNCE_DELAY);
  filterButtonsElement.forEach((button) => {
    button.addEventListener('click', () => {
      const filterType = updateActiveFilterButton(button);
      applySortingWithDebounce(filterType);
    });
  });
};
export { initializePhotoSorting};

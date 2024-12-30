import { showingBigPhoto } from './fullPicture.js';

const container = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    const sketch = evt.target.closest('[data-thumbnail-id]');
    if (sketch) {
      evt.preventDefault();
      const pictureId = +sketch.dataset.thumbnailId;
      const picture = pictures.find((item) => item.id === pictureId);
      showingBigPhoto(picture);
    }
  });
};

export { renderGallery };

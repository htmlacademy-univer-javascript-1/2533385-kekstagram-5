import {renderSketch} from './sketch.js';
import {showingBigPhoto} from './fullPicture.js';

const container = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    const sketch = evt.target.closest('[data-picture-id]');
    if (!sketch) {
      return;
    }

    evt.preventDefault();
    const picId = +sketch.dataset.pictureId;
    const picture = pictures.find((item) => item.id === picId);
    showingBigPhoto(picture);
  });

  renderSketch(pictures, container);
};
export{renderGallery};

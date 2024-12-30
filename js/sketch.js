const container = document.querySelector('.pictures');
const sketchTemplate = document.querySelector('#picture').content;
const template = sketchTemplate.querySelector('.picture');

const createSketch = ({url, description, comments, likes, id}) => {
  const sketch = template.cloneNode(true);

  sketch.querySelector('.picture__img').src = url;
  sketch.querySelector('.picture__img').alt = description;
  sketch.querySelector('.picture__comments').textContent = comments.length;
  sketch.querySelector('.picture__likes').textContent = likes;
  sketch.dataset.thumbnailId = id;

  return sketch;
};

const renderSketch = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const sketch = createSketch(picture);
    fragment.append(sketch);
  });
  container.append(fragment);
};

export { renderSketch } ;

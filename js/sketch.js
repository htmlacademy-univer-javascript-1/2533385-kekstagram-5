const container = document.querySelector('.pictures');
const sketchTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createSketch = ({comments, description, likes, url, id}) =>{
  const sketch = sketchTemplate.cloneNode(true);
  sketch.querySelector('.picture__comments').textContent = comments.length;
  sketch.querySelector('.picture__likes').textContent = likes;
  sketch.querySelector('.picture__img').src = url;
  sketch.querySelector('.picture__img').alt = description;
  sketch.dataset.pictureId = id;

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

export{renderSketch};

const box = document.querySelector('.pictures');
const sketchTemplate = document.querySelector('#picture').content.querySelector('picture');

const createSketch = ({comments, description, likes, url}) =>{
  const sketch = sketchTemplate.cloneNode(true);
  sketch.querySelector('.picture__comments').textContent = comments.length;
  sketch.querySelector('.picture__likes').textContent = likes;
  sketch.querySelector('.picture__img').scr = url;
  sketch.querySelector('.picture__img').alt = description;

  return sketch;
};

const renderSketch = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const sketch = createSketch(picture);
    fragment.append(sketch);
  });
  box.append(fragment);
};

export{renderSketch};

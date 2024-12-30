const MIN_SCALE_PERCENTAGE = 25;
const MAX_SCALE_PERCENTAGE = 100;
const DEFAULT_SCALE_PERCENTAGE = 100;
const SCALE_INCREMENT = 25;

const imagePreviewElement = document.querySelector('.img-upload__preview img');
const scaleSize = document.querySelector('.img-upload__scale');
const scaleSizeControl = scaleSize.querySelector('.scale__control--value');
const smallerButton = scaleSize.querySelector('.scale__control--smaller');
const biggerButton = scaleSize.querySelector('.scale__control--bigger');
let currentScalePercentage = DEFAULT_SCALE_PERCENTAGE;

const updateScale = (value) => {
  imagePreviewElement.style.transform = `scale(${value / 100})`;
  scaleSizeControl.value = `${value}%`;
};


const decreaseScaleClick = () => {
  currentScalePercentage = parseInt(scaleSizeControl.value, 10);
  let newScale = currentScalePercentage - SCALE_INCREMENT;
  if (newScale < MIN_SCALE_PERCENTAGE) {
    newScale = MIN_SCALE_PERCENTAGE;
  }
  updateScale(newScale);
};

const increaseScaleClick = () => {
  currentScalePercentage = parseInt(scaleSizeControl.value, 10);
  let newScale = currentScalePercentage + SCALE_INCREMENT;
  if (newScale > MAX_SCALE_PERCENTAGE) {
    newScale = MAX_SCALE_PERCENTAGE;
  }
  updateScale(newScale);
};

const changeScale = () => {
  smallerButton.addEventListener('click', decreaseScaleClick);
  biggerButton.addEventListener('click', increaseScaleClick);
};

const resetScale = () => {
  updateScale(DEFAULT_SCALE_PERCENTAGE);
  smallerButton.removeEventListener('click', changeScale(decreaseScaleClick));
  biggerButton.removeEventListener('click', changeScale(increaseScaleClick));
};

export { changeScale , resetScale };

import { resetScale } from './scale.js';

const DEFAULT_EFFECT_SETTINGS = {
  name: 'none',
  filter: 'none',
  min: 0,
  max: 100,
  step: 1,
  unit: '',
};

const effectConfigurations = {

  none: {
    filter: DEFAULT_EFFECT_SETTINGS.filter,
    min: DEFAULT_EFFECT_SETTINGS.min,
    max: DEFAULT_EFFECT_SETTINGS.max,
  },

  chrome: {
    class: 'effects__preview--chrome',
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },

  sepia: {
    class: 'effects__preview--sepia',
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },

  marvin: {
    class: 'effects__preview--marvin',
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },

  phobos: {
    class: 'effects__preview--phobos',
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },

  heat: {
    class: 'effects__preview--heat',
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
};

const imagePreview = document.querySelector('.img-upload__preview img');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValueField = document.querySelector('.effect-level__value');
const effectSelectorContainer = document.querySelector('.effects');
let effectSettings = DEFAULT_EFFECT_SETTINGS;

const initializeSlider = () => noUiSlider.create(effectLevelSlider, {
  range: {
    min: DEFAULT_EFFECT_SETTINGS.min,
    max: DEFAULT_EFFECT_SETTINGS.max,
  },
  start: DEFAULT_EFFECT_SETTINGS.max,
  step: DEFAULT_EFFECT_SETTINGS.step,
  connect: 'lower',
});

effectLevelContainer.classList.add('hidden');

const isDefaultEffect = () => effectSettings.filter === DEFAULT_EFFECT_SETTINGS.filter;

const showSlider = () => {
  if (isDefaultEffect()) {
    effectLevelContainer.classList.add('hidden');
  } else {
    effectLevelContainer.classList.remove('hidden');
  }
};

const updateSlider = () => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: effectSettings.min,
      max: effectSettings.max,
    },
    step: effectSettings.step,
    start: effectSettings.max,
    connect: 'lower',
  });
  showSlider();
};

const updateEffectContainer = (evt) => {
  if (!evt.target.matches('input[type="radio"]')) {
    return;
  }
  const effectName = evt.target.value;
  applyEffect(effectName);
};

function applyEffect(effect) {
  effectSettings = effectConfigurations[effect];
  updateSlider();
}

const handleSliderUpdate = () => {
  const currentValueEffect = effectLevelSlider.noUiSlider.get();
  if (isDefaultEffect()) {
    imagePreview.style.filter = 'none';
    resetScale();
  }
  imagePreview.style.filter = `${effectSettings.filter}(${currentValueEffect}${effectSettings.unit})`;
  effectLevelValueField.value = currentValueEffect;
};

const sliderOperation = () => {
  initializeSlider();
  handleSliderUpdate();
  effectSelectorContainer.addEventListener('change', updateEffectContainer);
  effectLevelSlider.noUiSlider.on('update', handleSliderUpdate);
};

const deactivateSlider = () => {
  effectSelectorContainer.removeEventListener('change', updateEffectContainer);
  effectLevelSlider.noUiSlider.destroy();
};

const resetEffects = () => {
  effectSettings = DEFAULT_EFFECT_SETTINGS;
  updateSlider();
};

export { resetEffects, sliderOperation , deactivateSlider };

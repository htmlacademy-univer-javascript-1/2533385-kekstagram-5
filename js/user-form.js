import { isEscapeKey, submitButtonAccess } from './util.js';
import { resetScale } from './scale.js';
import { resetEffects,sliderOperation, deactivateSlider } from './filter.js';
import { showErrorMessage, showSuccessMessage } from './message.js';
import { sendRequest } from './api.js';

const COMMENT_MAX_LENGTH = 140;
const MAX_HASHTAG_COUNT = 5;
const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const SUBMIT_BUTTON_DEFAULT_TEXT = 'ОПУБЛИКОВАТЬ';
const SUBMIT_BUTTON_SENDING_TEXT = 'ПУБЛИКУЮ...';
const errorMessages = {
  INVALID_HASHTAG: 'Хэш-тег должен начинаться с #, состоять из букв и чисел без пробелов, максимальная длина одного хэш-тега 20 символов, включая #',
  COMMENT_TOO_LONG: `Длина комментария не может составлять больше ${COMMENT_MAX_LENGTH} символов`,
  EXCESS_HASHTAGS: `Нельзя указать больше ${MAX_HASHTAG_COUNT} хэш-тегов`,
  DUPLICATE_HASHTAGS: 'Хэш-теги не должны повторяться',
};
const bodyElement = document.querySelector('body');
const uploadFormElement = document.querySelector('.img-upload__form');
const uploadInputElement = uploadFormElement.querySelector('.img-upload__input');
const uploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const cancelButtonElement = uploadFormElement.querySelector('.img-upload__cancel');
const hashtagFieldElement = uploadFormElement.querySelector('.text__hashtags');
const commentFieldElement = uploadFormElement.querySelector('.text__description');
const submitButton = uploadFormElement.querySelector('.img-upload__submit');

const pristineInstance = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

const validateCommentLength = (value) => value.length <= COMMENT_MAX_LENGTH;

pristineInstance.addValidator(commentFieldElement, validateCommentLength, errorMessages.COMMENT_TOO_LONG);

const extractHashtags = (value) => {
  const hashtags = value.trim().split(/\s+/).filter(Boolean);
  return hashtags;
};

const validateHashtagFormat = (value) => extractHashtags(value).every((hashtag) => HASHTAG_REGEX.test(hashtag));

const validateHashtagCount = (value) => extractHashtags(value).length <= MAX_HASHTAG_COUNT;

const validateHashtagUniqueness = (value) => {
  const hashtags = extractHashtags(value);
  const lowercaseHashtags = hashtags.map((hashtag) => hashtag.toLowerCase());
  return lowercaseHashtags.length === new Set(lowercaseHashtags).size;
};

pristineInstance.addValidator(hashtagFieldElement, validateHashtagFormat, errorMessages.INVALID_HASHTAG);
pristineInstance.addValidator(hashtagFieldElement, validateHashtagCount, errorMessages.EXCESS_HASHTAGS);
pristineInstance.addValidator(hashtagFieldElement, validateHashtagUniqueness, errorMessages.UNIQUENESS_ERROR);

const isInputFocused = () =>
  document.activeElement === hashtagFieldElement || document.activeElement === commentFieldElement;

const handleDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isInputFocused()) {
    evt.preventDefault();
    closeUploadForm();
  }
};

const openUploadForm = () => {
  uploadInputElement.addEventListener('change', () => {
    uploadOverlayElement.classList.remove('hidden');
    document.addEventListener('keydown', handleDocumentKeydown);
    bodyElement.classList.add('modal-open');
    cancelButtonElement.addEventListener('click', closeUploadForm);
    sliderOperation();
  });
};

function closeUploadForm() {
  uploadFormElement.reset();
  pristineInstance.reset();
  resetScale();
  resetEffects();
  deactivateSlider();
  uploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', handleDocumentKeydown);
  submitButtonAccess(submitButton, false, SUBMIT_BUTTON_DEFAULT_TEXT);
}

const cleanPristineErrors = () => {
  hashtagFieldElement.addEventListener('keydown', () => {
    if (hashtagFieldElement.value !== '' || commentFieldElement.value !== '') {
      pristineInstance.reset();
    }
  });
};

const sendFormSubmit = (data) => {
  document.removeEventListener('keydown', handleDocumentKeydown);
  cleanPristineErrors();
  submitButtonAccess(submitButton, false, SUBMIT_BUTTON_SENDING_TEXT);
  sendRequest(new FormData(data))
    .then(() => {
      showSuccessMessage();
      closeUploadForm();
    })
    .catch(() => {
      showErrorMessage();
    })
    .finally(submitButtonAccess(submitButton, true, SUBMIT_BUTTON_SENDING_TEXT));
};

const checkFormSubmit = () => {
  uploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristineInstance.validate()) {
      sendFormSubmit(evt.target);
    }
  });
};

export { handleDocumentKeydown , openUploadForm , checkFormSubmit, closeUploadForm , submitButton, SUBMIT_BUTTON_DEFAULT_TEXT };

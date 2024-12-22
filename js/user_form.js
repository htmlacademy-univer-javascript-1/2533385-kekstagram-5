import { isEscapeKey } from './util.js';

const COMMENT_MAX_LENGTH = 140;
const MAX_HASHTAG_COUNT = 5;
const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const errorMessages = {
  INVALID_HASHTAG: 'Хэш-тег должен начинаться с #, состоять из букв и чисел без пробелов, максимальная длина одного хэш-тега 20 символов, включая #',
  EXCESS_HASHTAGS: `Нельзя указать больше ${MAX_HASHTAG_COUNT} хэш-тегов`,
  DUPLICATE_HASHTAGS: 'Хэш-теги должны быть уникальными',
  COMMENT_TOO_LONG: `Длина комментария не может составлять больше ${COMMENT_MAX_LENGTH} символов`,

};
const bodyElement = document.querySelector('body');
const uploadFormElement = document.querySelector('.img-upload__form');
const uploadInputElement = uploadFormElement.querySelector('.img-upload__input');
const uploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const cancelButtonElement = uploadFormElement.querySelector('.img-upload__cancel');
const hashtagFieldElement = uploadFormElement.querySelector('.text__hashtags');
const commentFieldElement = uploadFormElement.querySelector('.text__description');
const pristineInstance = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

const validateCommentLength = (value) => value.length <= COMMENT_MAX_LENGTH;
pristineInstance.addValidator(commentFieldElement, validateCommentLength, errorMessages.COMMENT_TOO_LONG);
const extractHashtags = (value) => {
  const hashtags = value.trim().split(/\s+/);
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
pristineInstance.addValidator(hashtagFieldElement, validateHashtagUniqueness, errorMessages.DUPLICATE_HASHTAGS);
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
  });
};
function closeUploadForm() {
  uploadFormElement.reset();
  pristineInstance.reset();
  uploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', handleDocumentKeydown);
}
uploadFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const hasHashtagInput = hashtagFieldElement.value.trim() !== '';
  const hasCommentInput = commentFieldElement.value.trim() !== '';
  const isHashtagValid = !hasHashtagInput || pristineInstance.validate(hashtagFieldElement);
  const isCommentValid = !hasCommentInput || pristineInstance.validate(commentFieldElement);
  if (isHashtagValid && isCommentValid) {
    uploadFormElement.submit();
  }
});
hashtagFieldElement.addEventListener('keydown', () => {
  if (hashtagFieldElement.value !== '' || commentFieldElement.value !== '') {
    pristineInstance.reset();
  }
});
export { openUploadForm };

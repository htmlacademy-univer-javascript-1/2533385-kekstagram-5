import { isEscapeKey, closeMessage, showMessage, submitButtonAccess } from './util.js';
import { handleDocumentKeydown, submitButton, SUBMIT_BUTTON_DEFAULT_TEXT} from './user-form.js';


const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessageContainer = errorTemplate.cloneNode(true);
const errorActionButton = errorMessageContainer.querySelector('.error__button');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessageContainer = successTemplate.cloneNode(true);
const successActionButton = successMessageContainer.querySelector('.success__button');

const closeSuccessMessage = () => {
  closeMessage(successActionButton, onSuccessActionButtonClick, onSuccessMessageEscKeydown ,onSuccessMessageMouseClick, successMessageContainer);
};

function onSuccessActionButtonClick () {
  closeSuccessMessage();
}

function onSuccessMessageEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
  }
}

function onSuccessMessageMouseClick (evt) {
  if (!evt.target.matches('.success__inner')) {
    closeSuccessMessage();
  }
}

const showSuccessMessage = () => {
  showMessage(successMessageContainer, successActionButton, onSuccessActionButtonClick, onSuccessMessageEscKeydown, onSuccessMessageMouseClick);
};

const closeErrorMessage = () => {
  closeMessage(errorActionButton, onErrorActionButtonClick, onErrorMessageEscKeydown, onErrorMessageMouseClick, errorMessageContainer);
  submitButtonAccess(submitButton, false, SUBMIT_BUTTON_DEFAULT_TEXT);
  document.addEventListener('keydown', handleDocumentKeydown);
};

function onErrorActionButtonClick () {
  closeErrorMessage();
}

function onErrorMessageEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
}

function onErrorMessageMouseClick (evt) {
  if (!evt.target.matches('.error__inner')) {
    closeErrorMessage();
  }
}

const showErrorMessage = () => {
  showMessage(errorMessageContainer, errorActionButton, onErrorActionButtonClick, onErrorMessageEscKeydown, onErrorMessageMouseClick);
};

export { showErrorMessage , showSuccessMessage };

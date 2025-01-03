const isEscapeKey = (evt) => evt.key === 'Escape';
const ERROR_DISPLAY_DURATION = 5000;
const closeMessage = (button, onClick, onEsc, onMouseClick, container) => {
  button.removeEventListener('click', onClick);
  document.removeEventListener('keydown', onEsc);
  document.removeEventListener('click', onMouseClick);
  container.remove();
};

const showMessage = (container, button, onClick, onEsc, onMouseClick) => {
  document.body.append(container);
  button.addEventListener('click', onClick);
  document.addEventListener('keydown', onEsc);
  document.addEventListener('click', onMouseClick);
};

const submitButtonAccess = (button, condition, value) => {
  button.disabled = condition;
  button.textContent = value;
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
const renderAlertBox = (message) => {
  const alertMessageBox = document.createElement('div');
  alertMessageBox.style.zIndex = '100';
  alertMessageBox.style.position = 'absolute';
  alertMessageBox.style.left = '0';
  alertMessageBox.style.top = '0';
  alertMessageBox.style.right = '0';
  alertMessageBox.style.padding = '10px 3px';
  alertMessageBox.style.fontSize = '30px';
  alertMessageBox.style.textAlign = 'center';
  alertMessageBox.style.backgroundColor = 'red';
  alertMessageBox.textContent = message;
  document.body.append(alertMessageBox);
  setTimeout(() => {
    alertMessageBox.remove();
  },ERROR_DISPLAY_DURATION);
};
export {isEscapeKey, closeMessage, showMessage, submitButtonAccess, debounce, renderAlertBox };

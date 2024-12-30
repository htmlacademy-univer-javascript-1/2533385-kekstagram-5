import { isEscapeKey } from './util.js';

const COMMENTS_INCREMENT = 5;
const bigPictureContainer = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const commentListElement = bigPictureContainer.querySelector('.social__comments');
const loadMoreCommentsButton = document.querySelector('.comments-loader');
const cancelButtonElement = bigPictureContainer.querySelector('.big-picture__cancel');
const liElement = commentListElement.querySelector('li');
const commentCountElement = bigPictureContainer.querySelector('.social__comment-count');
let currentCount = 0;
let currentDisplayedComments = [];

const createComment = ({ avatar, message, name}) => {
  const comment = liElement.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = () => {
  currentCount += COMMENTS_INCREMENT;
  if (currentCount >= currentDisplayedComments.length) {
    loadMoreCommentsButton.classList.add('hidden');
    currentCount = currentDisplayedComments.length;
  } else {
    loadMoreCommentsButton.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < currentCount; i++) {
    const comment = createComment(currentDisplayedComments[i]);
    fragment.append(comment);
  }

  commentListElement.replaceChildren();
  commentListElement.append(fragment);
  commentCountElement.innerHTML =
  `${currentCount} из <span class="comments-count">${currentDisplayedComments.length}</span> комментариев`;
};

const onCommentsLoaderClick = () => {
  renderComments(currentDisplayedComments);
};

const handleDocumentKeydown = (evt) => {
  if (isEscapeKey) {
    evt.preventDefault();
    hideBigPicture();
  }
};

const onCancelButtonClick = () => {
  hideBigPicture();
};

function hideBigPicture () {
  bigPictureContainer.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', handleDocumentKeydown);
  loadMoreCommentsButton.removeEventListener('click', onCommentsLoaderClick);
  cancelButtonElement.removeEventListener('click', onCancelButtonClick);
  currentCount = 0;
}

const showPictureDetails = ({ url, likes, description }) => {
  bigPictureContainer.querySelector('.big-picture__img img').src = url;
  bigPictureContainer.querySelector('.likes-count').textContent = likes;
  bigPictureContainer.querySelector('.social__caption').textContent = description;
};

const showingBigPhoto = (data) => {
  bigPictureContainer.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  loadMoreCommentsButton.classList.add('hidden');
  document.addEventListener('keydown', handleDocumentKeydown);
  loadMoreCommentsButton.addEventListener('click', onCommentsLoaderClick);
  cancelButtonElement.addEventListener('click', onCancelButtonClick);

  showPictureDetails(data);
  currentDisplayedComments = data.comments;
  renderComments(currentDisplayedComments);
};

export { showingBigPhoto };

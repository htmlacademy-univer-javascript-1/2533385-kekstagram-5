const COMMENTS_INCREMENT = 5;
const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureImageElement = bigPictureContainer.querySelector('.big-picture__img img');
const likesCountElement = bigPictureContainer.querySelector('.likes-count');
const pictureCaptionElement = bigPictureContainer.querySelector('.social__caption');
const commentsListElement = bigPictureContainer.querySelector('.social__comments');
const commentsCountElement = bigPictureContainer.querySelector('.social__comment-count');
const loadMoreCommentsButton = bigPictureContainer.querySelector('.comments-loader');
const commentsFragment = document.createDocumentFragment();
const closeBigPictureButton = bigPictureContainer.querySelector('.big-picture__cancel');

let currentDisplayedComments = [];
let displayedCommentsCount = COMMENTS_INCREMENT;

const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  const commentImage = document.createElement('img');
  const commentText = document.createElement('p');

  commentElement.classList.add('social__comment');
  commentImage.classList.add('social--picture');
  commentText.classList.add('social__text');

  commentImage.src = comment.avatar;
  commentImage.alt = comment.name;
  commentText.textContent = comment.message;

  commentElement.appendChild(commentImage);
  commentElement.appendChild(commentText);

  commentsFragment.appendChild(commentElement);
};

const renderComments = () => {
  commentsListElement.innerHTML = '';
  commentsCountElement.innerHTML = '';

  displayedCommentsCount = (displayedCommentsCount > currentDisplayedComments.length) ? currentDisplayedComments.length : displayedCommentsCount;
  const commentsToDisplay = currentDisplayedComments.slice(0, displayedCommentsCount);

  if (currentDisplayedComments.length <= displayedCommentsCount) {
    loadMoreCommentsButton.classList.add('hidden');
  } else {
    loadMoreCommentsButton.classList.remove('hidden');
  }

  commentsCountElement.innerHTML = `${displayedCommentsCount} из <span class="comments-count">${currentDisplayedComments.length}</span> комментариев`;

  displayedCommentsCount = (displayedCommentsCount >= currentDisplayedComments.length) ? COMMENTS_INCREMENT : displayedCommentsCount;

  commentsToDisplay.forEach(createCommentElement);
  commentsListElement.appendChild(commentsFragment);
};

const onLoadMoreCommentsClick = () => {
  displayedCommentsCount += COMMENTS_INCREMENT;
  renderComments();
};

const closeBigPictureView = () => {
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const showingBigPhoto = (picture) => {
  const { url, comments, likes, description } = picture;
  bigPictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImageElement.src = url;
  likesCountElement.textContent = likes;
  pictureCaptionElement.textContent = description;

  currentDisplayedComments = comments.slice();
  displayedCommentsCount = COMMENTS_INCREMENT;

  renderComments();
  loadMoreCommentsButton.addEventListener('click', onLoadMoreCommentsClick);
};

closeBigPictureButton.addEventListener('click', closeBigPictureView);
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closeBigPictureView();
  }
});

export { showingBigPhoto };

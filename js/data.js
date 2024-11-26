import {getRandomArrayElement,getRandomInteger} from './util.js';

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const NAMES = ['Артём', 'Валерия', 'Александр', 'Виктория', 'Елена', 'Дмитрий', 'Анна', 'Сергей', 'Ольга', 'Николай'];

const DESCRIPTIONS = [
  'Удивительный закат на пляже!',
  'Лучший момент дня!',
  'Прекрасный вид на горы.',
  'Время отдыха на природе.',
  'Идеальный день для прогулки.',];


const generateComments = (count) => {
  const comments = [];
  for (let i = 0; i < count; i++) {
    comments.push({
      id: getRandomInteger(100, 1000),
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: getRandomArrayElement(MESSAGES),
      name: getRandomArrayElement(NAMES)});
  }
  return comments;
};

const createPhoto = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: generateComments(getRandomInteger(0, 30))
});

const generatePhotos = () => {
  const photos = [];
  for (let index = 0; index < 25; index++) {
    photos.push(createPhoto(index + 1));
  }
  return photos;
};

generatePhotos();

export {generatePhotos};

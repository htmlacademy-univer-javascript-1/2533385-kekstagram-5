
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

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function getRandomArrayElement(elements) {
  const randomIndex = getRandomInteger(0, elements.length - 1);
  return elements[randomIndex];
}

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

function generatePhotos() {
  const photos = [];
  for (let index = 0; index < 25; index++) {
    const photo = createPhoto(index + 1);
    photos.push(photo);
  }

  return photos;
}

generatePhotos();



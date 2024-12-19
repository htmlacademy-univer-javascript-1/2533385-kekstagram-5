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

export {getRandomArrayElement, getRandomInteger};



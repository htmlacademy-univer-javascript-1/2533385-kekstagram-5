function isLengthLessOrSame(string, length) {
  return string.length <= length;
}

// тесты
isLengthLessOrSame('проверяемая строка', 20); // true
isLengthLessOrSame('проверяемая строка', 18); // true
isLengthLessOrSame('проверяемая строка', 10); // false

function isPalindrome(strSome) {
  // Приводим строку к нижнему регистру и удаляем пробелы
  const normalizedStr = strSome.replaceAll(' ', ''). toLowerCase();
  // Используем цикл for для проверки символов
  for (let i = 0; i < normalizedStr.length / 2; i++) {
    // Сравниваем символ с начала строки с соответствующим символом с конца
    if (normalizedStr[i] !== normalizedStr[normalizedStr.length - i - 1]) {
      return false; // Если хоть один символ не совпадает, это не палиндром
    }
  }
  return true; // Все символы совпали, значит, это палиндром
}

// Тесты
isPalindrome('топот'); // true
isPalindrome('ДовОд'); // true
isPalindrome('Кекс'); // false
isPalindrome('Лёша на полке клопа нашёл '); // true


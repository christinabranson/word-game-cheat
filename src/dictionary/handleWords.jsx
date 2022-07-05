const readAllWordsIntoArray = (numLetters = 5) => {
  const dictionaryFilePath = `./words/${numLetters}.json`;

  return fetch(dictionaryFilePath, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((r) => r.json())
    .then((json) => json.words);
};

export const getWord = async (numLetters = 5) => {
  const randomWord = await readAllWordsIntoArray(numLetters).then(
    (textArray) => {
      const randomWord =
        textArray[Math.floor(Math.random() * textArray.length)];
      return randomWord;
    }
  );

  return randomWord;
};

export const validateWord = async (wordToCheck, numLetters = 5) => {
  const isValid = await readAllWordsIntoArray(numLetters).then((textArray) => {
    return !!textArray.includes(wordToCheck);
  });

  return isValid;
};

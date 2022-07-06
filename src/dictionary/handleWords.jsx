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

export const getMatchingWords = async (patternRegex, numLetters = 5) => {
  const matchingWords = await readAllWordsIntoArray(numLetters).then((textArray) => {
    return textArray.filter(testString => patternRegex.test(testString))
  });

  console.log("matchingWords: ", matchingWords);

  return matchingWords.map(word => word.split(""));
};

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

export const getMatchingWords = async (patternRegex, includedLetters, excludedLetters, numLetters = 5) => {
  const matchingWords = await readAllWordsIntoArray(numLetters).then((textArray) => {
    return textArray.filter(testString => {
      
      if (!patternRegex.test(testString)) {
        return false;
      }

      const textStringAsArray = testString.toLowerCase().split("");
      const wordHasLetter = letter => textStringAsArray.includes(letter.toLowerCase());

      if (includedLetters.length) {
        const includedLettersFilter = includedLetters.filter(includedLetter => wordHasLetter(includedLetter))
        if (includedLettersFilter.length != includedLetters.length) {
          return false;
        }
      }

      if (excludedLetters.length) {
        const excludedLettersFilter = excludedLetters.filter(excludedLetter => wordHasLetter(excludedLetter))
        if (excludedLettersFilter.length) {
          return false;
        }
      }


      return true;
    });
  });

  return matchingWords.map(word => word.split(""));
};

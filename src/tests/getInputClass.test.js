import {
  makeLowercased,
  getGuessAnalysis,
} from "../components/PreviousGuesses";

describe("# makeLowercased", () => {
  test("test makeLowercased returns lowercased versions of letters", () => {
    expect(
      makeLowercased(["F", "a", "K", "E", "g", "U", "E", "S", "S"])
    ).toEqual(["f", "a", "k", "e", "g", "u", "e", "s", "s"]);
  });
});

describe("# getGuessAnalysis", () => {
  const expectedAnalysisPerfect = [
    { value: "a", class: "inputIndexMatch" },
    { value: "b", class: "inputIndexMatch" },
    { value: "c", class: "inputIndexMatch" },
    { value: "d", class: "inputIndexMatch" },
  ];

  test("test perfect match", () => {
    const word = "abcd";
    const guess = ["a", "b", "c", "d"];

    const guessAnalysis = getGuessAnalysis(guess, word);

    expect(guessAnalysis).toEqual(expectedAnalysisPerfect);
  });

  test("test perfect match - uppercased word", () => {
    const word = "aBcD";
    const guess = ["a", "b", "c", "d"];

    const guessAnalysis = getGuessAnalysis(guess, word);

    expect(guessAnalysis).toEqual(expectedAnalysisPerfect);
  });

  test("test perfect match - uppercased guess", () => {
    const word = "abcd";
    const guess = ["A", "b", "C", "D"];

    const guessAnalysis = getGuessAnalysis(guess, word);

    expect(guessAnalysis).toEqual(expectedAnalysisPerfect);
  });

  test("test no matches", () => {
    const word = "zyxw";
    const guess = ["a", "b", "c", "d"];

    const guessAnalysis = getGuessAnalysis(guess, word);

    const expectedAnalysisNoMatches = [
      { value: "a", class: "inputIndexNone" },
      { value: "b", class: "inputIndexNone" },
      { value: "c", class: "inputIndexNone" },
      { value: "d", class: "inputIndexNone" },
    ];

    expect(guessAnalysis).toEqual(expectedAnalysisNoMatches);
  });

  test("test index match - no repeats", () => {
    const word = "ayxw";
    const guess = ["a", "b", "c", "d"];

    const guessAnalysis = getGuessAnalysis(guess, word);

    const expectedAnalysis = [
      { value: "a", class: "inputIndexMatch" },
      { value: "b", class: "inputIndexNone" },
      { value: "c", class: "inputIndexNone" },
      { value: "d", class: "inputIndexNone" },
    ];

    expect(guessAnalysis).toEqual(expectedAnalysis);
  });

  test("test partial matches - with repeat letter 1 valid", () => {
    const word = "zyaw";
    const guess = ["a", "a", "b", "c"];

    const guessAnalysis = getGuessAnalysis(guess, word);

    const expectedAnalysis = [
      { value: "a", class: "inputIndexInWord" },
      { value: "a", class: "inputIndexNone" },
      { value: "b", class: "inputIndexNone" },
      { value: "c", class: "inputIndexNone" },
    ];

    expect(guessAnalysis).toEqual(expectedAnalysis);
  });

  test("test partial matches - with repeat letter 2 valid", () => {
    const word = "zyaa";
    const guess = ["a", "a", "b", "c"];

    const guessAnalysis = getGuessAnalysis(guess, word);

    const expectedAnalysis = [
      { value: "a", class: "inputIndexInWord" },
      { value: "a", class: "inputIndexInWord" },
      { value: "b", class: "inputIndexNone" },
      { value: "c", class: "inputIndexNone" },
    ];

    expect(guessAnalysis).toEqual(expectedAnalysis);
  });

  test("test partial matches - valid repeats 1 perfect", () => {
    const word = "ayxa";
    const guess = ["a", "a", "b", "c"];

    const guessAnalysis = getGuessAnalysis(guess, word);

    const expectedAnalysis = [
      { value: "a", class: "inputIndexMatch" },
      { value: "a", class: "inputIndexInWord" },
      { value: "b", class: "inputIndexNone" },
      { value: "c", class: "inputIndexNone" },
    ];

    expect(guessAnalysis).toEqual(expectedAnalysis);
  });

  test("test partial matches - valid repeats", () => {
    const word = "azyaa";
    const guess = ["a", "a", "a", "b", "c"];

    const guessAnalysis = getGuessAnalysis(guess, word);

    const expectedAnalysis = [
      { value: "a", class: "inputIndexMatch" },
      { value: "a", class: "inputIndexInWord" },
      { value: "a", class: "inputIndexInWord" },
      { value: "b", class: "inputIndexNone" },
      { value: "c", class: "inputIndexNone" },
    ];

    expect(guessAnalysis).toEqual(expectedAnalysis);
  });

  test("test partial matches - all partial", () => {
    const word = "bcda";
    const guess = ["a", "b", "c", "d"];

    const guessAnalysis = getGuessAnalysis(guess, word);

    const expectedAnalysis = [
      { value: "a", class: "inputIndexInWord" },
      { value: "b", class: "inputIndexInWord" },
      { value: "c", class: "inputIndexInWord" },
      { value: "d", class: "inputIndexInWord" },
    ];

    expect(guessAnalysis).toEqual(expectedAnalysis);
  });
});

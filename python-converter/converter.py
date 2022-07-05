""" Script to convert a text file of words to JSON """
#!/usr/bin/python3
import json
import os

INPUT_FILE_PATH = "./input/"
OUTPUT_FILE_PATH = "../public/words/"


def process_files():
    """Read in text file of words, make lower case, sort, and write to JSON"""
    words_set = set()

    # Read Tournament Word List
    with open(INPUT_FILE_PATH + "twl.txt", "r") as input_file:
        words = input_file.read().lower().splitlines()
        words_set.update(words)

    # Read ENABLE list
    with open(INPUT_FILE_PATH + "enable.txt", "r") as input_file:
        words = input_file.read().lower().splitlines()
        words_set.update(words)

    word_obj = {}
    for word in words_set:
        word_length = len(word)
        if word_length < 4 or word_length > 10:
            continue

        if word_length in word_obj:
            word_obj[word_length].append(word)
        else:
            word_obj[word_length] = [word]

    for letterCount in word_obj:
        words = word_obj[letterCount]
        sorted_words = sorted(words)

        print(f"Saving {len(words)} words with {letterCount} letters...")

        with open(OUTPUT_FILE_PATH + str(letterCount) + ".json", "w") as output_file:
            output_file.write(json.dumps({"words": sorted_words}))


if __name__ == "__main__":
    process_files()

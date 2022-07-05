import React from "react";

const Instructions = () => (
  <div className="ui celled list instructions">
    <div className="item">
      <div className="content">
        <div className="header">Guess a word</div>
        If it's not a valid word, you'll get an error.
      </div>
    </div>
    <div className="item">
      <div className="content">
        <div className="header">We'll analyze your guess</div>
        If you get a correct letter in the correct position, it will turn{" "}
        <span className="green">green</span>.
        <br />
        <br />
        If you get a correct letter in the wrong position, it will turn{" "}
        <span className="orange">yellow</span>.
      </div>
    </div>
    <div className="item">
      <div className="content">
        <div className="header">Five letters too easy?</div>
        Use the dropdown above to change the number of letters, up to 10! It gets difficult!
      </div>
    </div>
    <div className="item">
      <div className="content">
        <div className="header">Having issues?</div>
        Try giving up. You'll forfeit the game, but it'll show you what the word
        was. You'll also get a message mocking you.
      </div>
    </div>
    <div className="item">
      <div className="content">
        <div className="header">Still having issues?</div>
        Consider{" "}
        <a
          href="https://github.com/christinabranson/word-game-clone/issues"
          target="_blank"
        >
          filing an issue
        </a>{" "}
        for the developer, and we'll take a look.
      </div>
    </div>
  </div>
);
export default Instructions;

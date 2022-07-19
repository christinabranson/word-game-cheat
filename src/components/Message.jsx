import React, { useState, useEffect } from "react";

const Message = ({setShouldShowMessage}) => (
    <div
    className="ui green message"
    role="alert"
    style={{ margin: "0px auto", width: "75%" }}
  >
    <i className="close icon" onClick={() => setShouldShowMessage(false)}></i>
    <h2 className="ui header">Word Game Cheater </h2>
    <h3 style={{ marginTop: "-2px", fontStyle: "italic" }}>
      Where you can cheat at Word Game Clone!
    </h3>
    <h4>How to use:</h4>
    <div
      style={{
        margin: "0px auto",
        width: "75%",
        textAlign: "left",
      }}
    >
      <ol>
        <li>
          <strong>Start a Word Game</strong> - I recommend{" "}
          <a
            href="https://christinabranson.github.io/word-game-clone/"
            target="_blank"
          >
            <strong>Word Game Clone</strong>
          </a>{" "}
          because you can play over and over, but I guess the{" "}
          <i>other</i> one is good, too.
        </li>
        <li>
          <strong>
            Play until you have some letters in the correct spots
          </strong>{" "}
          - Generally they show up as <strong>green</strong>.{" "}
        </li>
        <li>
          <strong>
            Note the number of letters in the game and the
            letters/positions that you know
          </strong>{" "}
          - Use the dropdown in the header to change the letters you
          can enter.
        </li>
        <li>
          <strong>
            On the cheat tool (HERE!) enter in what you know
          </strong>{" "}
          - Make sure that letters you know (<strong>green</strong>{" "}
          in most games) are in the correct positions.{" "}
        </li>
        <li>
          <strong>Use a period (.) for unknowns</strong> - This is
          super important!{" "}
        </li>
        <li>
          <strong>
            At least one real letter (not a period) must be provided
          </strong>{" "}
          - This is also important!{" "}
        </li>
        <li>
          <strong>Only use letters or periods</strong> - Or you will
          get yelled at!{" "}
        </li>
        <li>
          <strong>The more letters you have</strong> the better your
          results will be, so keep guessing if the list is too
          large!{" "}
        </li>
      </ol>
    </div>
  </div>
)

export default Message;
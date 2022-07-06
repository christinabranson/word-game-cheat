import React from "react";

const Footer = () => (
  <div className="ui inverted vertical footer segment">
    <div className="ui center aligned container">
      <div className="ui center aligned stackable inverted divided grid">
        <div className="seven wide column">
          <h3 className="ui inverted header">Word Game Cheat</h3>
          <h4 lassName="ui inverted header">
            To help you cheat at word games!
          </h4>
          <p>
            Meant to be a companion to{" "}
            <a
              href="https://christinabranson.github.io/word-game-clone/"
              target="_blank"
            >
              <strong>Word Game Clone</strong>
            </a>{" "} Play as many word-guessing games you want, from 4-11 letters!
          </p>
          <div className="ui horizontal inverted small divided link list">
            <strong>
              <a
                href="https://github.com/christinabranson/word-game-cheat"
                target="_blank"
                className="button"
              >
                Check out the project on GitHub
              </a>
            </strong>
          </div>
          <div className="ui inverted section divider"></div>
          <p>
            Available words come from the Tournament Word & ENABLE lists found
            at the{" "}
            <a href="https://norvig.com/ngrams/" target="_blank">
              Natural Language Corpus Data: Beautiful Data
            </a>{" "}
            site. Sorry in advance for any weirdness there.
          </p>
          <p>{' '}</p>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;

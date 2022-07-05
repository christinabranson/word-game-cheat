import React from "react";

const Footer = () => (
  <div className="ui inverted vertical footer segment">
    <div className="ui center aligned container">
      <div className="ui center aligned stackable inverted divided grid">
        <div className="seven wide column">
          <h4 className="ui inverted header">Word Game Clone</h4>
          <p>
            This is an open-source project that mimicks a popular word game.
          </p>
          <p>
            Available words come from the Tournament Word & ENABLE lists found
            at the{" "}
            <a href="https://norvig.com/ngrams/" target="_blank">
              Natural Language Corpus Data: Beautiful Data
            </a>{" "}
            site. Sorry in advance for any weirdness there.
          </p>
        </div>
      </div>
      <div className="ui inverted section divider"></div>
      <div className="ui horizontal inverted small divided link list">
        <a
          href="https://github.com/christinabranson/word-game-clone"
          target="_blank"
          className="button"
        >
          See on GitHub
        </a>
      </div>
    </div>
  </div>
);

export default Footer;

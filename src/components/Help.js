import React from "react";

// Component which shows helps information when clicked
class Help extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      helpWanted: false,
    };

    this.toggleHelpWanted = this.toggleHelpWanted.bind(this);
    this.helpInformation = this.helpInformation.bind(this);
  }

  toggleHelpWanted() {
    this.setState((prevState) => ({
      helpWanted: !prevState.helpWanted,
    }));
  }

  helpInformation() {
    if (this.state.helpWanted) {
      return (
        <div className="Help--text">
          <p>
            Each underscore represents a letter in the word. Words only have
            lower case letters. If you enter a correct letter, every instance of
            that letter will be revealed in the word. The text box allows you to
            enter letters, you can only enter letters. (other characters will
            result in an alert telling you to only enter letters)
          </p>
          <p>
            You may enter 9 incorrect letters, if you reach 10, The hangman
            drawing will be complete and the game will end. The other way to end
            the game is to get all the letters in the word.
          </p>
          <p>
            There is a restart button to restart the game, it will work wether
            you have completed a game or not.
          </p>
          <p>Have fun!</p>
        </div>
      );
    } else {
      return <div className="Help--text"></div>;
    }
  }

  render() {
    return (
      <div className="Help--container">
        <button className="Help--button" onClick={this.toggleHelpWanted}>
          Help
        </button>
        {this.helpInformation()}
      </div>
    );
  }
}

export default Help;

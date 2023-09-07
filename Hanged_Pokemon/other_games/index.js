// THE ORIGINAL SHRUGMAN GAME
const readline = require('readline');

class Shrugman {
  constructor(category) {
    this.category = category;
    this.words = {
      movies: ['Braveheart', 'The Godfather', 'Inception'],
      books: ['To Kill a Mockingbird', '1984', 'The Great Gatsby'],
      quotes: ['To be or not to be', 'May the Force be with you'],
    };
    this.attempts = 10; 
    this.secretWord = this.getRandomWord();
    this.guesses = new Set();
    this.maskedWord = this.maskSecretWord();
  }

  getRandomWord() {
    const wordList = this.words[this.category];
    if (!wordList) {
      console.error(`Invalid category or missing word list for category: ${this.category}`);
      return ''; // Return an empty string or handle the error accordingly
    }
    const randomIndex = Math.floor(Math.random() * (wordList.length -1));
    return wordList[randomIndex].toUpperCase();
  }

  maskSecretWord() {
    return this.secretWord.replace(/[A-Z]/g, '_');
  }

  displayGameStatus() {
    console.clear();
    console.log(`Category: ${this.category}`);
    console.log(`Word: ${this.maskedWord}`);
    console.log(`Attempts left: ${this.attempts}`);
    console.log('Shrugman:', 'ϞϞ(๑⚈ ․̫ ⚈๑)∩'.slice(0, 10 - this.attempts));
  }

  makeGuess(letter) {
    if (!/[A-Z]/.test(letter)) {
      console.log('Please enter a valid uppercase letter.');
      return;
    }

    if (this.guesses.has(letter)) {
      console.log('You already guessed that letter.');
      return;
    }

    this.guesses.add(letter);

    if (this.secretWord.includes(letter)) {
      for (let i = 0; i < this.secretWord.length; i++) {
        if (this.secretWord[i] === letter) {
          const wordArray = this.maskedWord.split('');
          wordArray[i] = letter;
          this.maskedWord = wordArray.join('');
        }
      }
      console.log('Correct guess!');
    } else {
      this.attempts--;
      console.log('Wrong guess!');
    }

    this.displayGameStatus();

    if (this.maskedWord === this.secretWord) {
      console.log('Congratulations! You won!');
      return true;
    } else if (this.attempts === 0) {
      console.log('Sorry, you lost. The word was:', this.secretWord);
      return true;
    }

    return false;
  }

  play() {
    this.displayGameStatus();

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.on('line', (input) => {
      const letter = input.trim().toUpperCase();
      if (letter === 'QUIT') {
        rl.close();
        return;
      }
      if (this.makeGuess(letter) || this.attempts === 0) {
        console.log('Game Over');
        rl.close();
      }
    });
  }
}

// Usage example:
const game = new Shrugman('movies');
game.play()

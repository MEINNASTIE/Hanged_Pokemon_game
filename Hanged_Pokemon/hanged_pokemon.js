const readline = require('readline');
const chalk = require('chalk');

class Pokemon {
  constructor(name, type, abilities) {
    this.name = name;
    this.type = type;
    this.abilities = abilities;
  }

  displayInfo() {
    console.log(chalk.magenta`Name: ${this.name}`);
    console.log(chalk.yellow`Type: ${this.type}`);
    console.log(chalk.green`Abilities: ${this.abilities.join(', ')}`);
  }
}

class Rise_of_the_Pokemon {
  constructor() {
    this.category = null;
    this.pokemonClasses = [
      new Pokemon('Pikachu', chalk.yellow('Electric'), ['Thunderbolt', 'Quick Attack']),
      new Pokemon('Charizard', chalk.red('Fire/Flying'), ['Flamethrower', 'Fly']),
      new Pokemon('Bulbasaur', chalk.green('Grass/Poison'), ['Vine Whip', 'Poison Powder']),
    ];
    this.selectedPokemon = null;
    this.words = {
      movies: ['The Shawshank Redemption', 'The Godfather', 'Inception', 'Schindlers list', 'The Lord of the Rings', 'Pulp Fiction', 'Fight Club', 'The Matrix', 'The Silence of the Lambs', 'Interstellar', 'Spiderman', 'Back to the Future', 'The Pianist', 'Parasite','Gladiator', 'Casablanca', 'The Prestige', 'The Usual Suspects', 'American Beauty', 'Inglorious Basterds', 'Requiem for a Dream'],
      books: ['To Kill a Mockingbird','The Great Gatsby', 'Don Quixote', 'Ulysses', 'One Hundred Years of Solitude', 'War and Peace', 'Hamlet', 'Crime and Punishment', 'The Catcher in the Rye', 'Pride and Prejudice', 'Alices Adventures in Wonderland', 'Nineteen Eighty Four', 'Invisible Man', 'The Stranger', 'A Portrait of the Artist as a young Man', 'Frankenstein'],
      quotes: ['To be or not to be', 'May the Force be with you', 'Do one thing every day that scares you', 'Carpe Diem', 'Be yourself; everyone else is already taken', 'Life is really simple, but we insist on making it complicated', 'The way to get started is to quit talking and begin doing', 'Amor est vitae essentia', 'Status Quo', 'Et tu Brute'],
    };
    this.pokemonHealth = 10;
    this.secretWord = null;
    this.guesses = new Set();
    this.maskedWord = '';

    // Pokemon powers
    //this.attackMessages = {};

    this.correctGuessAttacks = {
      Pikachu: 'Thunderbolt',
      Charizard: 'Flamethrower',
      Bulbasaur: 'Vine Whip',
    };

    this.incorrectGuessAttacks = {
      Pikachu: 'Quick Attack',
      Charizard: 'Fly',
      Bulbasaur: 'Poison Powder',
    };
  }

  setCategory(category) {
    this.category = category;
  }

  getRandomWord() {
    if (!this.category || !this.words[this.category] || this.words[this.category].length === 0) {
      console.error('Invalid category or missing word list.');
      return '';
    }
    const wordList = this.words[this.category];
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex].toUpperCase();
  }

  maskSecretWord() {
    return this.secretWord.replace(/[A-Z]/g, '_');
  }

  choosePokemon(pokemonIndex) {
    if (pokemonIndex >= 0 && pokemonIndex < this.pokemonClasses.length) {
      this.selectedPokemon = this.pokemonClasses[pokemonIndex];
      this.currentAttacker = this.selectedPokemon;
      console.log(`You've selected ${this.selectedPokemon.name}!`);
    } else {
      console.log('Invalid Pokemon selection.');
    }
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
  
    let guessedCorrectly = false;
  
    if (this.secretWord.includes(letter)) {
      for (let i = 0; i < this.secretWord.length; i++) {
        if (this.secretWord[i] === letter) {
          const wordArray = this.maskedWord.split('');
          wordArray[i] = letter;
          this.maskedWord = wordArray.join('');
        }
      }
      guessedCorrectly = true;
    } else {
      this.pokemonHealth--;
    }
  
    this.displayGameStatus();
  
    if (guessedCorrectly) {
      const correctAttack = this.correctGuessAttacks[this.selectedPokemon.name];
      console.log(`You guessed correctly! ${this.selectedPokemon.name} used ${correctAttack}!`);
    } else {
      const incorrectAttack = this.incorrectGuessAttacks[this.selectedPokemon.name];
      console.log(`Oops! ${this.selectedPokemon.name} used ${incorrectAttack}, now it suffers!`);
    }
    
    if (this.maskedWord === this.secretWord) {
      console.log('Congrats! You have won! Your Pokemon can now rest');
      return true;
    } else if (this.pokemonHealth <= 0) {
      console.log('Sorry, you have lost the battle. The word was:', this.secretWord);
      return true;
    }
    return false;
  }

  // The enemy Pokemon
  selectRandomOpponent() {
    const randomIndex = Math.floor(Math.random() * this.pokemonClasses.length);
    return this.pokemonClasses[randomIndex];
  }

  displayGameStatus() {
    console.clear();
    console.log(chalk.blue`Category: ${this.category}`);
    console.log(chalk.magenta`Word: ${this.maskedWord}`);
    console.log(chalk.green`HP: ${this.pokemonHealth}`);
    console.log(chalk.yellow('Pokesusmon:', 'ϞϞ(๑⚈ ․̫ ⚈๑)∩'.slice(0, 10 - this.pokemonHealth)));
    console.log('*.*.*.*.*.*.*.*.*.*.*.*.*.*.*')
   
    if (this.selectedPokemon) {
      console.log(chalk.blue('Your Pokemon:'));
      this.selectedPokemon.displayInfo();
    }
  }
  
  play() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    console.log(chalk.red('WELCOME TO THE ' + chalk.strikethrough('HANGED') + ' POKEMON ヽ(=^･ω･^=)丿'))
    console.log('*.*.*.*.*.*.*.*.*.*.*.*')
    rl.question(
      'Choose a category' + chalk.blue(' (movies, books, quotes) ') + 'or type "QUIT" to exit: ',
      (category) => {
        if (category.toUpperCase() === 'QUIT') {
          rl.close();
          return;
        }

        if (Object.keys(this.words).includes(category)) {
          this.setCategory(category);

          this.secretWord = this.getRandomWord();
          this.maskedWord = this.maskSecretWord();

          // Example: Select a random opponent Pokemon
          const opponentPokemon = this.selectRandomOpponent();
          console.log(chalk.inverse.bold`Your opponent is ${opponentPokemon.name}!`);

          // Example: Choose your Pokemon
          console.log('Choose your Pokemon:');
          for (let i = 0; i < this.pokemonClasses.length; i++) {
            console.log(`${i + 1}. ${this.pokemonClasses[i].name}`);
          }

          rl.question('Enter the number of the Pokeball you want to select: ', (pokemonIndex) => {
            pokemonIndex = parseInt(pokemonIndex, 10) - 1;
            this.choosePokemon(pokemonIndex);
            this.displayGameStatus();

            rl.on('line', (input) => {
              const letter = input.trim().toUpperCase();
              if (letter === 'QUIT') {
                rl.close();
                return;
              } else {
                if (this.makeGuess(letter) || this.pokemonHealth === 0) {
                  console.log('Game Over');
                  rl.close();
                }
              }
            });
          });
        } else {
          console.log('Invalid category.');
          rl.close();
        }
      }
    );
  }
}

module.exports = Rise_of_the_Pokemon;

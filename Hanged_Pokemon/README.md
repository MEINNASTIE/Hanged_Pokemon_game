## THE HANGED POKEMON
#### A simple pokemon battle using hanged man game mechanics

A simple text-based one player game in which the player chooses their pokemon and starts a game of word guessing. 

*This game works on the terminal so make sure you have installed Node.js on your computer*

Case 1: - with each certain amount of wrong attempts at word choosing, the pokemon loses slowly life until it loses the battle

Case 2: - correct input of words has been given and the pokemon wins the battle

#### PROCESS OF THOUGHT

1. *Pokemon Class* - We define a class to store out Pokemon statistics
2. *Rise of the Pokemon* - This class we define as our main part of the game
3. *Helper Methods* - We have methods that help us move the game onward! 
4. *Attack Messages* - A method that displays a message about which Pokemon is attacking with which letter
5. *Guessing the Word* - A method which guesses if the letter is valid and if it was not already guessed. We also handle if the letter is in the secret word or not. 
6. *Game Flow* - This is where we have a method which lets us choose a Pokemon from a list and displays the game status, then it listens to the players input and reacts accordingly
7. *End Game* - If a player guesses the word correctly or a Pokemon chosen health reaches zero, the game ends

#### Chalk important notice
- install [chalk](https://www.npmjs.com/package/chalk)
- when installing make sure you install the previous version before 5, as follows: `npm install chalk@4.1.2`

## Pseudocode

// Import necessary libraries
import readline
import chalk

// Define a Pokemon class
class Pokemon
  Initialize(name, type, abilities)
    Set this.name to name
    Set this.type to type
    Set this.abilities to abilities

  Method displayInfo()
    Print "Name: " + this.name in magenta color using chalk
    Print "Type: " + this.type in yellow color using chalk
    Print "Abilities: " + this.abilities joined by ", " in green color using chalk

// Define a Rise_of_the_Pokemon class
class Rise_of_the_Pokemon
  Initialize()
    Set this.category to null
    Create an array of Pokemon objects with names, types, and abilities
    Set this.selectedPokemon to null
    Initialize a dictionary of word categories with corresponding word lists
    Set this.pokemonHealth to 10
    Set this.secretWord to null
    Create an empty set for guesses
    Set this.maskedWord to an empty string

    Initialize dictionaries for correct and incorrect guess attacks for each Pokemon

  Method setCategory(category)
    Set this.category to the provided category

  Method getRandomWord()
    If no category or the category is missing in words dictionary, print an error message and return an empty string
    Get the word list for the current category
    Generate a random index
    Return a random word from the list in uppercase

  Method maskSecretWord()
    Replace all uppercase letters in this.secretWord with underscores
    Return the masked word

  Method choosePokemon(pokemonIndex)
    If the provided index is valid
      Set this.selectedPokemon to the Pokemon at the specified index
      Set this.currentAttacker to this.selectedPokemon
      Print a message indicating the selected Pokemon
    Else
      Print "Invalid Pokemon selection"

  Method makeGuess(letter)
    If the provided letter is not an uppercase letter
      Print "Please enter a valid uppercase letter"
      Return
    If the letter has already been guessed
      Print "You already guessed that letter"
      Return

    Add the letter to the set of guesses
    Initialize a variable guessedCorrectly to false

    If the secretWord includes the letter
      Iterate through the characters in secretWord
        If a character matches the letter
          Replace the corresponding character in maskedWord with the letter
      Set guessedCorrectly to true
    Else
      Decrement pokemonHealth

    Call displayGameStatus()

    If guessedCorrectly
      Get the correct attack for the selectedPokemon
      Print a message indicating the correct guess
    Else
      Get the incorrect attack for the selectedPokemon
      Print a message indicating the incorrect guess

    If maskedWord is equal to secretWord
      Print "Congrats! You have won! Your Pokemon can now rest"
      Return true
    Else if pokemonHealth is less than or equal to 0
      Print "Sorry, you have lost the battle. The word was: " + secretWord
      Return true

    Return false

  Method selectRandomOpponent()
    Generate a random index
    Return a random Pokemon from the list

  Method displayGameStatus()
    Clear the console
    Print the category in blue
    Print the maskedWord in magenta
    Print the pokemonHealth in green
    Print a representation of Pokesusmon based on pokemonHealth
    Print a separator
    If a selectedPokemon exists, print its information in blue and use displayInfo()

  Method play()
    Create a readline interface for input and output
    Print a welcome message
    Ask the player to choose a category or type "QUIT" to exit
    Listen for player's input
    If the player types "QUIT", close the readline interface
    If the category is valid
      Set the category
      Get a random secretWord
      Mask the secretWord
      Select a random opponent Pokemon
      Print the opponent's name
      Ask the player to choose their Pokemon and listen for their input
      When a Pokemon is chosen, display the game status
      Listen for player's guesses and call makeGuess()
      If the game is over, print "Game Over" and close the readline interface
    Else
      Print "Invalid category" and close the readline interface

Export the Rise_of_the_Pokemon class

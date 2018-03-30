// List of players to guess in my game
var players = [
    "KOIVU",
    "STAAL",
    "GRANLUND",
    "PARISE",
    "SUTER",
    "SPURGEON",
    "ZUCKER",
    "DUMBA",
    "BRODIN",
    "DUBNYK",
    "NIEDERREITER",
    "COYLE"
];

// Array of players' pictures
var playerpictures = [  "assets/images/player1.jpg",
                        "assets/images/player2.jpg",
                        "assets/images/player3.jpg",
                        "assets/images/player4.jpg",
                        "assets/images/player5.jpg",
                        "assets/images/player6.jpg",
                        "assets/images/player7.jpg",
                        "assets/images/player8.jpg",
                        "assets/images/player9.jpg",
                        "assets/images/player10.jpg",
                        "assets/images/player11.jpg",
                        "assets/images/player12.jpg"
]

// Array of messages that'll go with the pictures
var playermessage = [   "KapFinn",
                        "Good ol' Thunder Bay native",
                        "It's your boy, Granny",
                        "Heart & soul of the team",
                        "Everything is effortless",
                        "Tempstar spokesperson",
                        "Fastest skater ever",
                        "Dumba55",
                        "Swedish God",
                        "DUUUUUB",
                        "PING!",
                        "Charlie~"
]

// Alphabet array
var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

// Initializing the current player and its array + word progress array
var currentplayer = "";

var currentplayerarray = [];

var wordprogress = [];

// Initializing guessed letters & incorrect guesses
var correctguesses = [];

var incorrectguesses = [];

// Initializing wins, losses, and guesses left
var wincount = 0;

var losscount = 0;

var guessesleft = 10;

// Connecting variables to HTML elements
var currentplayerElement = document.getElementById('current-player');

var correctguessesElement = document.getElementById('correct-guesses');

var incorrectguessesElement = document.getElementById('incorrect-guesses');

var guessesleftElement = document.getElementById('guesses-left');

var wincountElement = document.getElementById('win-count');

var losscountElement = document.getElementById('loss-count');

var messageElement = document.getElementById('message');

var picturemessageElement = document.getElementById('picture-message');

var playerpictureElement = document.getElementById('player-picture');

// All functions

// Function to start the game
function startgame() {
    // Reset these variables
    guessesleft = 10;
    wordprogress = [];
    correctguesses = [];
    incorrectguesses = [];

    // Choosing a random player from the list
    currentplayer = players[Math.floor(Math.random() * players.length)];

    // Putting that player's name into an array
    currentplayerarray = currentplayer.split("");

    // Replacing letters with "_"
    for (i = 0; i < currentplayerarray.length; i++) {
        wordprogress.push("_");
    }

    // Reset what's being shown on HTML
    currentplayerElement.textContent = wordprogress.join(' ');
    guessesleftElement.textContent = guessesleft;
    correctguessesElement.textContent = "";
    incorrectguessesElement.textContent = "";
    messageElement.textContent = "Press any letters to start guessing the player!";
    picturemessageElement.textContent = "Who's it going to be?";
    playerpictureElement.setAttribute("src", "assets/images/player0.jpg");

    // Just console logging the current player each time
    console.log(currentplayer);
}

// Function for checking each guesses
function check(letter) {    
    // This will check if the letter guessed is in the player's name
    // In this if iteration, the letter guessed is not in the player's name
    if (currentplayer.indexOf(letter) === -1) {
        // This double checks if the letter guessed is in the player's name + also if it's a letter
        if (alphabet.indexOf(letter) === -1) {
            // I think I should've instead done the for loop which goes through the entire alphabet array, instead of
            // Leaving this section of code blank but I don't know, this looks better. Please let me know if I should
            // Not leave an empty section of codes like this when you grade it. Thanks!
        }
        else {
            // Marks down the # of guesses left + it also marks the incorrectly guessed letter 
            guessesleft--;
            guessesleftElement.textContent = guessesleft;
            incorrectguesses.push(letter);
            incorrectguessesElement.textContent = incorrectguesses.join(', ');
        }
    }
    // If the letter is in the player's name
    else {
        // Again, marks down the # of guesses left + the correctly guessed letter
        guessesleft--;
        guessesleftElement.textContent = guessesleft;
        correctguesses.push(letter);
        correctguessesElement.textContent = correctguesses.join(', ');
        // This is to update the word progress section
        for (i = 0; i < currentplayer.length; i++) {
            if (currentplayer[i] === letter) {
                wordprogress[i] = letter;
                currentplayerElement.textContent = wordprogress.join(' ');
            }
        }
    }
}

// Function to change the source of the player picture

function playerpicture(source) {
    playerpictureElement.setAttribute("src", source);
}


// Function that will end the game if conditions are met
function result() {
    // This is triggered by when there are no more _ left on player's name
    // It also sets the # of guesses left at 0 so next button you press will restart the game as well
    if (wordprogress.indexOf('_') === -1) {
        messageElement.textContent = "You guessed the correct player, you win!"
        
        guessesleft = 0;
        guessesleftElement.textContent = guessesleft;

        // This will output the correct player picture + message
        for (i = 0; i < players.length; i++) {
            if (currentplayer === players[i]) {
                picturemessageElement.textContent = playermessage[i];
                playerpicture(playerpictures[i]);
            }
        }
    }

    // When there are no more guesses left, the game will end
    else if (guessesleft === 0) {
        messageElement.textContent = "You ran out of guesses, better luck next time!"
    }
}

// Function when a key is pressed
document.onkeyup = function(event) {
    // If there are no guesses left then start the game up again
    if (guessesleft === 0) {
        startgame();
    }
    else {
        // Lowercasing the guess
        var guess = event.key.toUpperCase();

        // Run the function check with the letter pressed as a parameter
        check(guess);

        // Run the function result to see if the game can end
        result();
    }
}

// Restart Button 
function restart() {
    startgame();
}

// Guess Button
function guess() {
    // It'll prompt the guesser with the question
    var answer = prompt("Who do you think it is?").toUpperCase();

    // If the answer is correct
    if (answer === currentplayer) {
        // Display the message and just make it so that the # of guesses goes to zero
        // Allowing the next button pressed to restart the game
        messageElement.textContent = "You guessed the correct player, you win!"
        guessesleft = 0;
        guessesleftElement.textContent = guessesleft;
        
        // This loop is to update the current player in the html when the guess is correct
        for (i = 0; i < currentplayer.length; i++) {
            wordprogress[i] = currentplayer[i];
            currentplayerElement.textContent = wordprogress.join(' ');            
        }

        // This will output the correct player picture + message
        for (i = 0; i < players.length; i++) {
            if (currentplayer === players[i]) {
                picturemessageElement.textContent = playermessage[i];
                playerpicture(playerpictures[i]);
            }
        }
    }

    // Pretty much the same logic as if the answer was correct
    else {
        messageElement.textContent = "You guessed wrong, better luck next time!"
        guessesleft = 0;
        guessesleftElement.textContent = guessesleft;
    }
}

// Starting the game
startgame();
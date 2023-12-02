//VARIABLES
//starting sum of hands
let dealerNumber = 0;
let playerNumber = 0;
//deck and hidden card declarations
let deck = [];
let hiddenCard;
//ace count
let dealerAceCount = 0;
let playerAceCount = 0;
//player money
let playerMoney = 100;
//bet amount
let betAmount = 0;

//buttons
const hitButton = document.getElementById('hit-button');
const standButton = document.getElementById('stand-button');
const betButton = document.getElementById('bet-button');
const betAmountInput = document.getElementById('bet-input-field');

//dealer and player hand number
const dealerHandNumber = document.getElementById('dealer-number');
const playerHandNumber = document.getElementById('player-number');


//FUNCTIONS FOR THE GAME
function createDeck() {
    let values = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    let suit = ['Spades','Diamonds','Hearts','Clubs'];
    for (let i = 0; i < suit.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + suit[i]); //this puts together the values and suits. images will be pushed in later
        }
    }
    console.log(deck);
}


function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        //iterating through the deck and assigning a random card to each index
        let randomCard = Math.floor(Math.random() * deck.length);
        deck[i] = deck[randomCard];
    }
    console.log(deck);
}


createDeck();
shuffleDeck();


//START OF THE GAME BECAUSE WE NEEDED TO CREATE AND SHUFFLE THE DECK ON LOAD

//build a function to deal two cards to the player and dealer on load, dealer has one card hidden but has a number value

function dealCards() {
    const dealerCardOne = deck.pop();
    const dealerCardTwo = deck.pop();
    const playerCardOne = deck.pop();
    const playerCardTwo = deck.pop();
    hiddenCard = dealerCardOne;
    console.log(hiddenCard);

}

dealCards();

//build a function for the hit button, which will deal a card to the player. if the player busts, the dealer wins. if the player hits 21, the player wins. 

function playerHit() {
    const playerCard = deck.pop();
    const cardImg = document.createElement('img');
    cardImg.src = `card-imgs/${playerCard}.png`;
    document.getElementById('player-hand').appendChild(cardImg);
    console.log(playerCard);
    //if the player busts, the dealer wins. if the player hits 21, the player wins. 
}

document.getElementById('hit-button').addEventListener('click', playerHit);


//if the player gets an ace the player can choose if it is worth 1 or 11 points.

//build a function for the stand button, which will reveal the hidden card and deal cards to the dealer until they reach 17 or bust













//VARIABLES
//starting sum of hands
let dealerNumber = 0
let playerNumber = 0
//deck and hidden card declarations
let deck = []
let hiddenCard
//ace count
let dealerAceCount = 0
let playerAceCount = 0
//player money
let playerMoney = 100
//bet amount
let betAmount = 0

//buttons
const hitButton = document.getElementById('hit-button');
const standButton = document.getElementById('stand-button');
const betButton = document.getElementById('bet-button');
const betAmountInput = document.getElementById('bet-input-field');
const betError = document.getElementById('bet-error');

//dealer and player hand number
const dealerHandNumber = document.getElementById('dealer-number');
const playerHandNumber = document.getElementById('player-number');

//bets 
const betNumber = document.getElementById('bet-number');
const playerBalance = document.getElementById('player-balance');
const betDescription = document.getElementById('bet-description');


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

function playerBet() {
    let minBet = 20;
    betAmount = betAmountInput.value;
    betDescription.textContent = null;

    if (betAmount < minBet) {
        betError.textContent = 'Minimum bet is ' + minBet;
        betAmountInput.value = null;
        betNumber.textContent = null;
        betButton.disabled = false;
    } else if (betAmount > playerMoney) {
        betError.textContent = 'You know you dont have that much money.';
        betAmountInput.value = null;
        betNumber.textContent = null;
        betButton.disabled = false;
    } else {
        betNumber.textContent = betAmount;
        playerMoney -= betAmount;
        playerBalance.textContent = playerMoney;
        betButton.disabled = true;
        betError.textContent = null;
    }

    console.log(playerBalance);
}


betButton.addEventListener('click', playerBet);

//START OF THE GAME BECAUSE WE NEEDED TO CREATE AND SHUFFLE THE DECK ON LOAD

//build a function to deal two cards to the player and dealer on load, dealer has one card hidden but has a number value

function getCardNumber(card, total) {
    let value = card.match(/\d+|[A-Z]/)[0]; // Remove the last character (the suit)
    if (value === 'A') {
        return (total + 11 <= 21) ? 11 : 1; // Or 11, depending on how you want to handle aces
    } else if (['K', 'Q', 'J'].includes(value)) {
        return 10;
    } else {
        return parseInt(value, 10); // Convert number cards to integers
    }
}

function dealCards() {
    const dealerCard1 = deck.pop();
    const playerCard1 = deck.pop();
    const playerCard2 = deck.pop();

    const dealerCard1Img = document.createElement('img');
    const playerCard1Img = document.createElement('img');
    const playerCard2Img = document.createElement('img');

    dealerCard1Img.src = `card-imgs/${dealerCard1}.png`;
    playerCard1Img.src = `card-imgs/${playerCard1}.png`;
    playerCard2Img.src = `card-imgs/${playerCard2}.png`;

    document.getElementById('dealer-hand').appendChild(dealerCard1Img);
    document.getElementById('player-hand').appendChild(playerCard1Img);
    document.getElementById('player-hand').appendChild(playerCard2Img);

    dealerNumber += getCardNumber(dealerCard1, dealerNumber);
    playerNumber += getCardNumber(playerCard1, playerNumber);
    playerNumber += getCardNumber(playerCard2, playerNumber);

    dealerHandNumber.textContent = ' ' + dealerNumber;
    playerHandNumber.textContent = ' ' + playerNumber;
}

dealCards();

//build a function for the hit button, which will deal a card to the player. if the player busts, the dealer wins. if the player hits 21, the player wins. 

function playerHit() {
    const newCard = deck.pop();
    const newCardImg = document.createElement('img');
    newCardImg.src = `card-imgs/${newCard}.png`;
    document.getElementById('player-hand').appendChild(newCardImg);
    playerNumber += getCardNumber(newCard, playerNumber);
    playerHandNumber.textContent = ' ' + playerNumber;
    console.log(newCard);
    //if the player busts, the dealer wins. if the player hits 21, the player wins.
    
    if (playerNumber > 21) {

    }
}

document.getElementById('hit-button').addEventListener('click', playerHit);


//if the player gets an ace the player can choose if it is worth 1 or 11 points.

//build a function for the stand button, which will reveal the hidden card and deal cards to the dealer until they reach 17 or bust













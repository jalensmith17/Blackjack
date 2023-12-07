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

//hero container
const title = document.getElementById('title');
const heroContainer = document.getElementById('hero-container');

//hidden card
const hiddenCardImg = document.getElementById('hidden-card');

//buttons and descriptions
const hitButton = document.getElementById('hit-button');
const standButton = document.getElementById('stand-button');
const betButton = document.getElementById('bet-button');
const betAmountInput = document.getElementById('bet-input-field');
const betError = document.getElementById('bet-error');
const playAgainButton = document.getElementById('play-again-button');
const bettingContainer = document.getElementById('betting-container');

//dealer and player hand number
const dealerHand = document.getElementById('dealer-hand');
const playerHand = document.getElementById('player-hand');
const dealerHandNumber = document.getElementById('dealer-number');
const playerHandNumber = document.getElementById('player-number');

//bets 
const betAmountTitle = document.getElementById('bet-amount-title');
const betNumber = document.getElementById('bet-number');
const playerBalance = document.getElementById('player-balance');
const betDescription = document.getElementById('bet-description');

//game log
const gameLog = document.getElementById('game-log-text');

//disable buttons
hitButton.style.display = 'none';
standButton.style.display = 'none';
playAgainButton.style.display = 'none';


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
    for (let i = deck.length - 1; i > 0; i--) {
        //iterating through the deck and assigning a random card to each index. fisher yates shuffle
        let randomCard = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[randomCard]] = [deck[randomCard], deck[i]];
    }
    console.log(deck);
}


createDeck();
shuffleDeck();
playerBalance.textContent = '$' + playerMoney;
betAmountTitle.style.display = 'none';

function playerBet() {
    let minBet = 20;
    betAmount = betAmountInput.value;
    betDescription.textContent = null;
    bettingContainer.style.marginTop = '2rem';
    bettingContainer.style.animation = 'fadeIn 1s ease-in-out';
    title.style.marginTop = '1rem';
    title.style.animation = 'fadeIn 1s ease-in-out';
    

    if (betAmount < minBet) {
        betError.textContent = 'Minimum bet is $' + minBet;
        betAmountInput.value = null;
        betNumber.textContent = null;
        betButton.disabled = false;
    } else if (betAmount > playerMoney) {
        betError.textContent = 'You know you dont have that much money.';
    } else if (isNaN(betAmount)) {
        betError.textContent = 'Please enter a valid number.';
    } else {
        betNumber.textContent = '$' + betAmount;
        betAmountTitle.style.display = '';
        playerMoney -= betAmount;
        playerBalance.textContent = '$' + playerMoney;
        betError.textContent = null;
        betAmountInput.style.display = 'none';
        betButton.style.display = 'none';
        hitButton.style.display = '';
        standButton.style.display = '';
        heroContainer.style.display = 'flex';
    }
}


betButton.addEventListener('click', playerBet);

//build a function to deal two cards to the player and dealer on load, dealer has one card hidden but has a number value

function getCardNumber(card, total) {
    let value = card.match(/\d+|[A-Z]/)[0]; // remove the last character using regular expression
    if (value === 'A') {
        return (total + 11 <= 21) ? 11 : 1;
    } else if (['K', 'Q', 'J'].includes(value)) {
        return 10;
    } else {
        return parseInt(value, 10); 
    }
}

function dealCards() {
    const dealerCard1 = deck.pop();
    const playerCard1 = deck.pop();
    const playerCard2 = deck.pop();

    const dealerCard1Img = document.createElement('img');
    dealerCard1Img.classList.add('dealer-card');
    const playerCard1Img = document.createElement('img');
    playerCard1Img.classList.add('player-card-one');
    const playerCard2Img = document.createElement('img');
    playerCard2Img.classList.add('player-card-two');

    dealerCard1Img.src = `card-imgs/${dealerCard1}.png`;
    playerCard1Img.src = `card-imgs/${playerCard1}.png`;
    playerCard2Img.src = `card-imgs/${playerCard2}.png`;

    document.getElementById('dealer-hand').appendChild(dealerCard1Img);
    document.getElementById('player-hand').appendChild(playerCard1Img);
    document.getElementById('player-hand').appendChild(playerCard2Img);

    dealerNumber += getCardNumber(dealerCard1, dealerNumber);
    playerNumber += getCardNumber(playerCard1, playerNumber);
    playerNumber += getCardNumber(playerCard2, playerNumber);

    setTimeout(function() {
    dealerHandNumber.textContent = ' ' + dealerNumber;
    playerHandNumber.textContent = ' ' + playerNumber;
    dealerHandNumber.style.animation = 'fadeIn 1s ease-in-out';
    playerHandNumber.style.animation = 'fadeIn 1s ease-in-out';
    }, 3500);
}

dealCards();

//build a function for the hit button, which will deal a card to the player. if the player busts, the dealer wins. if the player hits 21, the player wins. 

function playerHit() {
    
    const newCard = deck.pop();
    const newCardImg = document.createElement('img');
    newCardImg.style.animation = 'moveInRight .5s ease-in-out';
    newCardImg.src = `card-imgs/${newCard}.png`;
    document.getElementById('player-hand').appendChild(newCardImg);
    playerNumber += getCardNumber(newCard, playerNumber);
    playerHandNumber.textContent = ' ' + playerNumber;

    if (playerNumber > 21) {
        checkWinner();
    }
}

hitButton.addEventListener('click', playerHit);

//build a function for the stand button, which will reveal the hidden card and deal cards to the dealer until they reach 17 or bust

function dealerDraw() {
    const newCard = deck.pop();
    const newCardImg = document.createElement('img');
    newCardImg.src = `card-imgs/${newCard}.png`;
    newCardImg.style.animation = 'moveInRight .5s ease-in-out';
    document.getElementById('dealer-hand').appendChild(newCardImg);
    dealerNumber += getCardNumber(newCard, dealerNumber);
    dealerHandNumber.textContent = ' ' + dealerNumber;

    if (dealerNumber < 17) {
        setTimeout(dealerDraw, 2000);
    } else {
        checkWinner();
    }
}

function stand() {
    hitButton.disabled = true;

    const hiddenCard = deck.pop();
    hiddenCardImg.src = `card-imgs/${hiddenCard}.png`;
    dealerNumber += getCardNumber(hiddenCard, dealerNumber);
    dealerHandNumber.textContent = ' ' + dealerNumber;

    if (dealerNumber < 17) {
        setTimeout(dealerDraw, 2000); //using recursion
    } else {
        checkWinner();
    }
}

standButton.addEventListener('click', stand);

function playAgain() {
    let dealerCards = Array.from(dealerHand.children);

    //removed everything but hidden card
    dealerCards.forEach(card => {
        if (card !== hiddenCardImg) {
            dealerHand.removeChild(card);
        }
    });

    heroContainer.style.display = 'none';

    //resetting it back with styles
    hiddenCardImg.src = 'card-imgs/backcard.png';
    hiddenCardImg.style.animation = 'none';
    hiddenCardImg.offsetHeight; //reflow
    hiddenCardImg.style.animation = 'moveInLeft 2s ease-in-out 1s backwards';
    hiddenCardImg.style.animationFillMode = 'backwards';
    hiddenCardImg.style.animationDelay = '1s';
    hiddenCardImg.style.opacity = '1';

    dealerHandNumber.textContent = ' '
    playerHandNumber.textContent = ' '

    playerHand.innerHTML = null;
    dealerNumber = 0;
    playerNumber = 0;

    dealerHandNumber.style.animation = 'none';
    playerHandNumber.style.animation = 'none';
    dealerHandNumber.offsetHeight; // reflow
    playerHandNumber.offsetHeight; // reflow

    setTimeout(function() {
        dealerHandNumber.textContent = ' ' + dealerNumber;
        playerHandNumber.textContent = ' ' + playerNumber;
        dealerHandNumber.style.animation = 'fadeIn 1s ease-in-out';
        playerHandNumber.style.animation = 'fadeIn 1s ease-in-out';
        }, 3500);

    deck = [];
    createDeck();
    shuffleDeck();

    hitButton.style.display = 'none';
    standButton.style.display = 'none';
    betAmountInput.style.display = '';
    betButton.style.display = '';
    betAmountTitle.style.display = 'none';
    playAgainButton.style.display = 'none';
    title.style.marginTop = '';
    bettingContainer.style.marginTop = '';

    gameLog.textContent = null;

    betNumber.textContent = null;

    dealCards();
}

function checkWinner() {
    hitButton.style.display = 'none';
    hitButton.disabled = false;
    standButton.style.display = 'none';
    playAgainButton.style.display = '';
    if (playerNumber > 21) {
        gameLog.textContent = 'You busted! Dealer wins.';
    } else if (playerNumber === 21) {
        gameLog.textContent = 'You win!';
        playerMoney += betAmount * 2;
    } else if (dealerNumber > 21) {
        gameLog.textContent = 'Dealer busted! You win!';
        playerMoney += betAmount * 2;
    } else if (dealerNumber > playerNumber && dealerNumber <= 21) {
        gameLog.textContent = 'Dealer wins!';
    } else if (dealerNumber < playerNumber && playerNumber <= 21) {
        gameLog.textContent = 'You win!';
        playerMoney += betAmount * 2;
    } else {
        gameLog.textContent = 'Push!';
        playerMoney += parseInt(betAmount, 10);
    }

    if (playerMoney < 20) {
        gameLog.textContent = 'Game over.';
        playAgainButton.addEventListener('click', function() {
            location.reload();
        });
    }

    playerBalance.textContent = '$' + playerMoney;

    playAgainButton.addEventListener('click', playAgain);
}
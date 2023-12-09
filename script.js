//VARIABLES
//starting sum of hands
let dealerNumber = 0
let playerNumber = 0

//deck and hidden card declarations
let deck = []
let hiddenCard

//player money
let playerMoney = 100
let betAmount = 0

//hero container
const title = document.getElementById('title')
const heroContainer = document.getElementById('hero-container')

//hidden card
const hiddenCardImg = document.getElementById('hidden-card')

//buttons and descriptions
const hitButton = document.getElementById('hit-button')
const standButton = document.getElementById('stand-button')
const doubleDownButton = document.getElementById('dd-button')
const betButton = document.getElementById('bet-button')
const betAmountInput = document.getElementById('bet-input-field')
const betError = document.getElementById('bet-error')
const playAgainButton = document.getElementById('play-again-button')
const bettingContainer = document.getElementById('betting-container')

//dealer and player hand number
const dealerHand = document.getElementById('dealer-hand')
const playerHand = document.getElementById('player-hand')
const dealerHandNumber = document.getElementById('dealer-number')
const playerHandNumber = document.getElementById('player-number')

//bets
const betAmountTitle = document.getElementById('bet-amount-title')
const betNumber = document.getElementById('bet-number')
const playerBalance = document.getElementById('player-balance')
const betDescription = document.getElementById('bet-description')

//game log
const gameLog = document.getElementById('game-log-text')

//disable buttons
playAgainButton.style.display = 'none'

//FUNCTIONS FOR THE GAME

//creating an array of cards
function createDeck() {
  let values = [
    'A',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
  ];
  let suit = ['Spades', 'Diamonds', 'Hearts', 'Clubs'];
  for (let i = 0; i < suit.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deck.push(values[j] + suit[i]); //this puts together the values and suits. images will be pushed in later
    }
  }
  console.log(deck);
}

function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    //iterating through the deck and assigning a random card to each index. fisher yates shuffle starts from the back of the index
    let randomCard = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[randomCard]] = [deck[randomCard], deck[i]];
  }
  console.log(deck);
}

createDeck();
shuffleDeck();
playerBalance.textContent = '$' + playerMoney;
betAmountTitle.style.display = 'none';

//moving the title and betting container up when the player bets
function moveDescription() {
  bettingContainer.style.marginTop = '2rem';
  bettingContainer.style.animation = 'fadeIn 1s ease-in-out';
  title.style.marginTop = '1rem';
  title.style.animation = 'fadeIn 1s ease-in-out';
}

//players betting functionality
function playerBet() {
  let minBet = 20;
  betAmount = betAmountInput.value;
  betDescription.textContent = null;

  //checking for betting errors
  if (betAmount < minBet) {
    betError.textContent = 'Minimum bet is $' + minBet;
    betAmountInput.value = null;
    betNumber.textContent = null;
    betButton.disabled = false;
  } else if (betAmount > playerMoney) {
    betError.textContent = 'You do not have enough money to bet that amount.';
  } else if (isNaN(betAmount)) {
    betError.textContent = 'Please enter a valid number.';
  } else {
    moveDescription();
    betNumber.textContent = '$' + betAmount;
    betAmountTitle.style.display = '';
    playerMoney -= betAmount;
    playerBalance.textContent = '$' + playerMoney;
    betError.textContent = null;
    betAmountInput.style.display = 'none';
    betButton.style.display = 'none';
    hitButton.style.display = '';
    standButton.style.display = '';
    doubleDownButton.style.display = '';
    heroContainer.style.display = 'flex';
  }
}

//grabbing the card number from the deck array by using regular expressions to remove the suit from the array
function getCardNumber(card, total) {
  let value = card.match(/\d+|[A-Z]/)[0]; // remove the last character using regular expression 
  if (value === 'A') {
    return total + 11 <= 21 ? 11 : 1; //if the total is less than or equal to 21, return 11, otherwise return 1
  } else if (['K', 'Q', 'J'].includes(value)) {
    return 10;
  } else {
    return parseInt(value, 10);
  }
}

// dealing the cards when the player bets
function dealCards() {
  //popping the cards from the deck array
  const dealerCard1 = deck.pop();
  const playerCard1 = deck.pop();
  const playerCard2 = deck.pop();

  //creating the card images and adding them to the dealer and player's hand
  const dealerCard1Img = document.createElement('img');
  dealerCard1Img.classList.add('dealer-card');
  const playerCard1Img = document.createElement('img');
  playerCard1Img.classList.add('player-card-one');
  const playerCard2Img = document.createElement('img');
  playerCard2Img.classList.add('player-card-two');

  //pushing the '.png' to the end of the card name to get the image
  dealerCard1Img.src = `card-imgs/${dealerCard1}.png`;
  playerCard1Img.src = `card-imgs/${playerCard1}.png`;
  playerCard2Img.src = `card-imgs/${playerCard2}.png`;

  document.getElementById('dealer-hand').appendChild(dealerCard1Img);
  document.getElementById('player-hand').appendChild(playerCard1Img);
  document.getElementById('player-hand').appendChild(playerCard2Img);

  //adding the card hand number to the dealer and player's hand
  dealerNumber += getCardNumber(dealerCard1, dealerNumber);
  playerNumber += getCardNumber(playerCard1, playerNumber);
  playerNumber += getCardNumber(playerCard2, playerNumber);

  //checking for blackjack and disabling buttons if the player has blackjack
  if (playerNumber === 21) {
    doubleDownButton.disabled = true;
    hitButton.disabled = true;
  }

  //delaying the dealer and player's hand number to show up
  setTimeout(function () {
    dealerHandNumber.textContent = ' ' + dealerNumber;
    playerHandNumber.textContent = ' ' + playerNumber;
    dealerHandNumber.style.animation = 'fadeIn 1s ease-in-out';
    playerHandNumber.style.animation = 'fadeIn 1s ease-in-out';
  }, 3500);
}

dealCards();

//hit functionality, creates a new card and adds it to the player's hand
function playerHit() {
  const newCard = deck.pop();
  const newCardImg = document.createElement('img');
  newCardImg.style.animation = 'moveInRight .5s ease-in-out';
  newCardImg.src = `card-imgs/${newCard}.png`;
  document.getElementById('player-hand').appendChild(newCardImg);
  playerNumber += getCardNumber(newCard, playerNumber);
  playerHandNumber.textContent = ' ' + playerNumber;
  doubleDownButton.style.display = 'none';
  betError.textContent = '';

  //checking for blackjack and disabling buttons if the player has blackjack, drawing cards if true
  if (playerNumber > 21) {
    checkWinner();
  } else if (playerNumber === 21) {
    showHiddenCard();
    setTimeout(dealerDraw, 2000);
    gameLog.textContent = 'You got Blackjack!'; 
    hitButton.disabled = true;
    standButton.disabled = true;
    doubleDownButton.disabled = true;
  }
}

//dealer draw functionality, creates a new card and adds it to the dealer's hand every two seconds until the dealers hand is greater than 17
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
} else if (dealerNumber === 21) {
    checkWinner();
} else {
    checkWinner();
}
}

//show hidden card functionality, shows the hidden card and adds it to the dealer's hand
function showHiddenCard() {
    const hiddenCard = deck.pop();
    hiddenCardImg.src = `card-imgs/${hiddenCard}.png`;
    dealerNumber += getCardNumber(hiddenCard, dealerNumber);
    dealerHandNumber.textContent = ' ' + dealerNumber;
}

//stand functionality, player cannot hit after this and allows the dealer to draw cards
function stand() {
  hitButton.disabled = true;
  doubleDownButton.disabled = true;

  showHiddenCard();
  dealerHandNumber.textContent = ' ' + dealerNumber;
  standButton.disabled = true;
  betError.textContent = '';

  if (dealerNumber < 17) {
    setTimeout(dealerDraw, 2000);
  } else {
    checkWinner();
  }
}

//double down functionality, doubles the bet amount and adds a card to the player's hand if the player has enough money to do so
function doubleDown() {
    if (playerMoney < betAmount) {
        betError.textContent = 'You do not have enough money to double down.';
        return;
    } 

    //doubling the bet amount and adding a card to the player's hand because it counts as a hit
    playerMoney -= betAmount;
    playerBalance.textContent = '$' + playerMoney;
    betAmount *= 2;
    betNumber.textContent = '$' + betAmount;
    doubleDownButton.disabled = true;

    playerHit();

    //delaying the dealer's draw and nullifying the function if the player busts
    if (playerNumber > 21) {
        checkWinner();
    } else {
        setTimeout(stand, 2000);
    }
}

//play again functionality, resets the game to original state
function playAgain() {
  let dealerCards = Array.from(dealerHand.children);

  //removed everything from the dealer's hand except the hidden card, if this wasn't done the hidden card would be removed as well when played again causing the dealers deck to be wrong
  dealerCards.forEach((card) => {
    if (card !== hiddenCardImg) {
      dealerHand.removeChild(card);
    }
  });

  heroContainer.style.display = 'none';

  //resetting it back with styles
  hiddenCardImg.src = 'card-imgs/backcard.png';
  hiddenCardImg.style.animation = 'none';
  hiddenCardImg.offsetHeight; //reflow trick
  hiddenCardImg.style.animation = 'moveInLeft 2s ease-in-out 1s backwards';
  hiddenCardImg.style.animationFillMode = 'backwards';
  hiddenCardImg.style.animationDelay = '1s';
  hiddenCardImg.style.opacity = '1';

  //resetting the game
  dealerHandNumber.textContent = ' ';
  playerHandNumber.textContent = ' ';

  playerHand.innerHTML = null;
  dealerNumber = 0;
  playerNumber = 0;

  dealerHandNumber.style.animation = 'none';
  playerHandNumber.style.animation = 'none';
  dealerHandNumber.offsetHeight; // reflow trick
  playerHandNumber.offsetHeight; // reflow trick

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

  betDescription.textContent = 'Enter a bet amount to start the next round!';
  betNumber.textContent = null;
  betError.textContent = '';

  dealCards();
}

//check winner functionality, checks to see who won and adds the bet amount to the player's money, logs content to the game log
function checkWinner() {
  hitButton.style.display = 'none';
  hitButton.disabled = false;
  standButton.disabled = false;
  standButton.style.display = 'none';
  doubleDownButton.style.display = 'none';
  doubleDownButton.disabled = false;
  playAgainButton.style.display = '';

  //different scenarios for who wins
  if (playerNumber > 21) {
    gameLog.textContent = 'You busted! Dealer wins.';
  } else if (dealerNumber > 21) {
    gameLog.textContent = 'Dealer busted! You win!';
    playerMoney += betAmount * 2;
  } else if (dealerNumber > playerNumber && dealerNumber <= 21) {
    gameLog.textContent = 'Dealer wins!';
  } else if (dealerNumber < playerNumber && playerNumber <= 21) {
    gameLog.textContent = 'You win!';
    playerMoney += betAmount * 2;
  } else if (dealerNumber === playerNumber) {
    gameLog.textContent = 'Push!';
    playerMoney += parseInt(betAmount, 10);
  }
  
  //reload the page if the player's money is less than 20 on click
  if (playerMoney < 20) {
    gameLog.textContent = 'Game over.';
    playAgainButton.addEventListener('click', function () {
      location.reload();
    });
  }

  playerBalance.textContent = '$' + playerMoney;
}

//event listeners
hitButton.addEventListener('click', playerHit);
standButton.addEventListener('click', stand);
doubleDownButton.addEventListener('click', doubleDown);
betButton.addEventListener('click', playerBet);
playAgainButton.addEventListener('click', playAgain);

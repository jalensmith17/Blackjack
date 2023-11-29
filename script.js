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

//FUNCTIONS FOR THE GAME
//build a function to create a deck of cards
function createDeck() {
    let values = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    let suit = ['Spades','Diamonds','Hearts','Clubs'];
    //leet code problem helped this one lol.
    for (let i = 0; i < suit.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + suit[i]); //this puts together the values and suits
        }
    }
    console.log(deck);
}


//build a function to shuffle the deck so we dont get the same cards on every load
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


//build a function for the hit button, which will deal a card to the player. if the player busts, the dealer wins. if the player hits 21, the player wins. 

//if the player gets an ace the player can choose if it is worth 1 or 11 points.

//build a function for the stand button, which will reveal the hidden card and deal cards to the dealer until they reach 17 or bust













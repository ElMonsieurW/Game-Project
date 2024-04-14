let dealerSum = 0;
let yourSum = 0;

let dealerAceCount = 0;
let yourAceCount = 0;

let hidden;
let deck;

let canHit = true;

const url = "http://localhost:3000/cards";

fetch(url, {
  method: "get",
  headers: new Headers({
    "Content-Type": "application/json",
  }),
})
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonResponse) {
    console.log(jsonResponse);
    buildDeck(jsonResponse);
    shuffleDeck();
    startGame();
  });

window.onload = function () {};

function buildDeck(dbCards) {
  deck = [];
  for (let currentCard = 0; currentCard < dbCards.data.length; currentCard++) {
    deck.push(
      dbCards.data[currentCard].value + "_" + dbCards.data[currentCard].symbol
    );
  }
}

function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length);
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  console.log(deck);
}

function dealerStart() {
  let cardImg = document.createElement("img");
  let card = deck.pop();
  cardImg.src = "./assets/" + card + ".png";
  dealerSum += getValue(card);
  dealerAceCount += checkAce(card);
  document.getElementById("dealer-cards").append(cardImg);
}

function dealerHit() {
  while (dealerSum < 17) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./assets/" + card + ".png";
    dealerSum += getValue(card);
    dealerAceCount += checkAce(card);
    document.getElementById("dealer-cards").append(cardImg);
  }
}

function startGame() {
  let chips = document.querySelectorAll(".chip");
  hidden = deck.pop();
  dealerSum += getValue(hidden);
  dealerAceCount += checkAce(hidden);
  console.log(dealerSum);
  dealerStart();
  console.log(dealerSum);

  for (let i = 0; i < 2; i++) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./assets/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);
  }

  console.log(yourSum);
  document.getElementById("hit").addEventListener("click", hit);
  document.getElementById("stay").addEventListener("click", stay);
  document.getElementById("play").addEventListener("click", play);
}

function hit() {
  if (!canHit) {
    return;
  }

  let cardImg = document.createElement("img");
  let card = deck.pop();
  cardImg.src = "./assets/" + card + ".png";
  yourSum += getValue(card);
  yourAceCount += checkAce(card);
  document.getElementById("your-cards").append(cardImg);

  if (reduceAce(yourSum, yourAceCount) > 21) {
    canHit = false;
  }
}

function stay() {
  dealerSum = reduceAce(dealerSum, dealerAceCount);
  yourSum = reduceAce(yourSum, yourAceCount);

  canHit = false;
  document.getElementById("hidden").src = "./assets/" + hidden + ".png";

  let message = "";
  if (yourSum > 21) {
    message = "You Lose!";
  } else if (dealerSum > 21) {
    message = "You win!";
  } else if (yourSum == dealerSum) {
    message = "Tie!";
  } else if (yourSum > dealerSum) {
    message = "You Win!";
  } else if (yourSum < dealerSum) {
    message = "You Lose!";
  }
  dealerHit();
  document.getElementById("dealer-sum").innerText = dealerSum;
  document.getElementById("your-sum").innerText = yourSum;
  document.getElementById("results").innerText = message;
  dealerHit();
  setTimeout(function () {
    window.location.reload();
  }, 3000);
}
function play() {
  dealerSum = 0;
  yourSum = 0;
  dealerAceCount = 0;
  yourAceCount = 0;
  dealer_sum = 0;
  hidden;
  hidden = deck.pop();
  document.getElementById("your-cards").innerHTML = "";
  document.getElementById("dealer-cards").innerHTML = "";
  let hiddenCardImg = document.createElement("img");
  hiddenCardImg.src = "./assets/" + hidden + ".png";
  document.getElementById("dealer-cards").appendChild(hiddenCardImg);
  startGame((canHit = true), (canStay = true));
  document.getElementById("dealer-sum").innerText = "";
  document.getElementById("your-sum").innerText = "";
}
function getValue(card) {
  console.log(card);
  let data = card.split("_");
  let value = data[0];

  if (isNaN(value)) {
    if (value == "As") {
      return 11;
    }
    return 10;
  }
  return parseInt(value);
}

function checkAce(card) {
  if (card[0] == "As") {
    return 1;
  }
  return 0;
}

function reduceAce(playerSum, playerAceCount) {
  while (playerSum > 21 && playerAceCount > 0) {
    playerSum -= 10;
    playerAceCount -= 1;
  }
  return playerSum;
}
console.log(dealerSum);
console.log(yourSum);

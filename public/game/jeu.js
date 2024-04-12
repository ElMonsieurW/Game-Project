import Card from "./class.js";
const maSauce = document.querySelector(".sauce");

const As_coeur = new Card(2, "1", 0, 1, "As_coeur.png");
const two_coeur = new Card(2, "1", 0, 1, "2_coeur.png");

const cardImage = document.createElement("img");

cardImage.setAttribute("src", "../assets/" + two_coeur.link);
maSauce.appendChild(cardImage);
console.log(As_coeur);
console.log(As_coeur.link);

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Deck {
  constructor() {
    this.cards = [];
    const symbol = ["♠", "♣", "♥", "♦"];
    const values = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
      "A",
    ];

    for (let symbol of symbols) {
      for (let value of values) {
        this.cards.push(new Card(id, value, color, symbol));
      }
    }
    this.shuffle();
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  dealCard() {
    return this.cards.pop();
  }
}

class Hand {
  constructor() {
    this.cards = [];
  }

  addCard(card) {
    this.cards.push(card);
  }

  getScore() {
    let score = 0;
    let numAces = 0;
    for (let card of this.cards) {
      score += card.getValue();
      if (card.value === "A") {
        numAces++;
      }
    }
    while (score > 21 && numAces > 0) {
      score -= 10;
      numAces--;
    }
    return score;
  }
}

class BlackjackGame {
  constructor() {
    this.deck = new Deck();
    this.playerHand = new Hand();
    this.dealerHand = new Hand();
  }

  dealInitialCards() {
    this.playerHand.addCard(this.deck.dealCard());
    this.dealerHand.addCard(this.deck.dealCard());
    this.playerHand.addCard(this.deck.dealCard());
    this.dealerHand.addCard(this.deck.dealCard());
  }

  printHands(showDealerCard = false) {
    console.log("Player's hand:");
    for (let card of this.playerHand.cards) {
      console.log(`${card.value}${card.symbol}`);
    }
    console.log(`Player's score: ${this.playerHand.getScore()}`);
    console.log("\nDealer's hand:");
    if (showDealerCard) {
      for (let card of this.dealerHand.cards) {
        console.log(`${card.value}${card.suit}`);
      }
      console.log(`Dealer's score: ${this.dealerHand.getScore()}`);
    } else {
      console.log(
        `${this.dealerHand.cards[0].value}${this.dealerHand.cards[0].suit}`
      );
      console.log("Hidden");
    }
    console.log("---------------------------------------");
  }

  playerTurn() {
    rl.question("Hit or stand? (h/s): ", (answer) => {
      if (answer.toLowerCase() === "h") {
        this.playerHand.addCard(this.deck.dealCard());
        this.printHands();
        if (this.playerHand.getScore() > 21) {
          console.log("Player busts! Dealer wins.");
          rl.close();
        } else {
          this.playerTurn();
        }
      } else {
        this.dealerTurn();
      }
    });
  }

  dealerTurn() {
    this.printHands(true);
    while (this.dealerHand.getScore() < 17) {
      this.dealerHand.addCard(this.deck.dealCard());
      this.printHands(true);
    }
    if (
      this.dealerHand.getScore() > 21 ||
      this.dealerHand.getScore() < this.playerHand.getScore()
    ) {
      console.log("Player wins!");
    } else if (this.dealerHand.getScore() === this.playerHand.getScore()) {
      console.log("It's a tie!");
    } else {
      console.log("Dealer wins!");
    }
    rl.close();
  }
}

// dealerSum = 0;
// yourSum = 0;
// dealerAceCount = 0;
// yourAceCount = 0;
// dealer_sum = 0;
// hidden;
// document.getElementById("your-cards").innerHTML = "";
// document.getElementById("dealer-cards").innerHTML = "";
// let hiddenCardImg = document.createElement("img");
// hiddenCardImg.src = "./assets/" + hidden + ".png";
// document.getElementById("dealer-cards").appendChild(hiddenCardImg);
// startGame((canHit = true), (canStay = true));
// document.getElementById("dealer-sum").innerText = "0";
// document.getElementById("your-sum").innerText = "0";

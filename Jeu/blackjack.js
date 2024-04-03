const readline = require('readline');

// Fonction pour mélanger un jeu de cartes
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Création d'un jeu de cartes
function createDeck() {
    const suits = ['♠', '♣', '♥', '♦'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const deck = [];
    for (const suit of suits) {
        for (const value of values) {
            deck.push({ value, suit });
        }
    }
    shuffleDeck(deck);
    return deck;
}

// Calcul du total d'une main
function calculateHandValue(hand) {
    let total = 0;
    let hasAce = false;
    for (const card of hand) {
        if (card.value === 'A') {
            hasAce = true;
        }
        if (['J', 'Q', 'K'].includes(card.value)) {
            total += 10;
        } else if (card.value !== 'A') {
            total += parseInt(card.value);
        }
    }
    if (hasAce) {
        if (total + 11 <= 21) {
            total += 11;
        } else {
            total += 1;
        }
    }
    return total;
}

// Affichage d'une main
function displayHand(hand) {
    const cards = hand.map(card => `${card.value}${card.suit}`).join(' ');
    console.log(`Hand: ${cards} (Value: ${calculateHandValue(hand)})`);
}

// Jeu de blackjack
function blackjackGame() {
    const deck = createDeck();
    const playerHand = [deck.pop(), deck.pop()];
    const dealerHand = [deck.pop(), deck.pop()];

    console.log('Welcome to Blackjack!\n');

    // Affichage des mains
    console.log('Dealer Hand:');
    console.log(`\t${dealerHand[0].value}${dealerHand[0].suit} ?\n`);
    console.log('Your Hand:');
    displayHand(playerHand);

    // Fonction pour demander à un joueur de frapper ou de rester
    function hitOrStand() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        return new Promise(resolve => {
            rl.question('Hit or Stand? (h/s) ', answer => {
                rl.close();
                resolve(answer.toLowerCase() === 'h');
            });
        });
    }

    // Tour du joueur
    async function playerTurn() {
        while (true) {
            const hit = await hitOrStand();
            if (hit) {
                playerHand.push(deck.pop());
                console.log('\nYour Hand:');
                displayHand(playerHand);
                if (calculateHandValue(playerHand) > 21) {
                    console.log('\nBusted! You lose.\n');
                    return false;
                }
            } else {
                return true;
            }
        }
    }

    // Tour du croupier
    function dealerTurn() {
        console.log('\nDealer Hand:');
        displayHand(dealerHand);
        while (calculateHandValue(dealerHand) < 17) {
            dealerHand.push(deck.pop());
            console.log('\nDealer Hits:');
            displayHand(dealerHand);
        }
    }

    // Résolution du jeu
    async function resolveGame() {
        const playerResult = await playerTurn();
        if (!playerResult) return;

        dealerTurn();

        const playerTotal = calculateHandValue(playerHand);
        const dealerTotal = calculateHandValue(dealerHand);

        console.log('\nGame Result:');
        console.log(`\tYour Hand: ${playerTotal}`);
        console.log(`\tDealer Hand: ${dealerTotal}`);

        if (playerTotal > dealerTotal || dealerTotal > 21) {
            console.log('\nCongratulations! You win!\n');
        } else if (playerTotal < dealerTotal) {
            console.log('\nSorry, you lose.\n');
        } else {
            console.log('\nIt\'s a tie!\n');
        }
    }

    resolveGame();
}

// Démarrage du jeu
blackjackGame();

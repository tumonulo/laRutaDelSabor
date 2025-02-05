// Variables del juego
let deck = [];
let dealerHand = [];
let playerHand = [];
let dealerScore = 0;
let playerScore = 0;
let gameOver = false;

// Elementos del DOM
const dealerCards = document.getElementById('dealer-cards');
const playerCards = document.getElementById('player-cards');
const dealerScoreDisplay = document.getElementById('dealer-score');
const playerScoreDisplay = document.getElementById('player-score');
const message = document.getElementById('message');
const hitButton = document.getElementById('hit-button');
const standButton = document.getElementById('stand-button');
const resetButton = document.getElementById('reset-button');

// Inicializar el juego
function initGame() {
    deck = createDeck();
    dealerHand = [drawCard(), drawCard()];
    playerHand = [drawCard(), drawCard()];
    dealerScore = calculateScore(dealerHand);
    playerScore = calculateScore(playerHand);
    gameOver = false;
    renderGame();
}

// Crear un mazo de cartas
function createDeck() {
    const suits = ['♥', '♦', '♣', '♠'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
    return shuffleDeck(deck);
}

// Barajar el mazo
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// Sacar una carta del mazo
function drawCard() {
    return deck.pop();
}

// Calcular el puntaje de una mano
function calculateScore(hand) {
    let score = 0;
    let aces = 0;
    for (let card of hand) {
        if (card.value === 'A') {
            aces++;
            score += 11;
        } else if (['J', 'Q', 'K'].includes(card.value)) {
            score += 10;
        } else {
            score += parseInt(card.value);
        }
    }
    while (score > 21 && aces > 0) {
        score -= 10;
        aces--;
    }
    return score;
}

// Renderizar el juego
function renderGame() {
    dealerCards.innerHTML = dealerHand.map(card => `<div class="card">${card.value}${card.suit}</div>`).join('');
    playerCards.innerHTML = playerHand.map(card => `<div class="card">${card.value}${card.suit}</div>`).join('');
    dealerScoreDisplay.textContent = dealerScore;
    playerScoreDisplay.textContent = playerScore;

    if (gameOver) {
        if (playerScore > 21) {
            message.textContent = '¡Perdiste! Te pasaste de 21.';
        } else if (dealerScore > 21 || playerScore > dealerScore) {
            message.textContent = '¡Ganaste!';
        } else if (playerScore === dealerScore) {
            message.textContent = '¡Empate!';
        } else {
            message.textContent = '¡Perdiste! El dealer tiene más puntos.';
        }
    } else {
        message.textContent = '';
    }
}

// Pedir carta
hitButton.addEventListener('click', () => {
    if (!gameOver) {
        playerHand.push(drawCard());
        playerScore = calculateScore(playerHand);
        if (playerScore > 21) {
            gameOver = true;
        }
        renderGame();
    }
});

// Plantarse
standButton.addEventListener('click', () => {
    if (!gameOver) {
        while (dealerScore < 17) {
            dealerHand.push(drawCard());
            dealerScore = calculateScore(dealerHand);
        }
        gameOver = true;
        renderGame();
    }
});

// Reiniciar el juego
resetButton.addEventListener('click', initGame);

// Iniciar el juego al cargar la página
initGame();
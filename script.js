const wordDisplay = document.getElementById('word-display');
const attemptsDisplay = document.getElementById('attempts');
const incorrectLettersDisplay = document.getElementById('incorrect-letters');
const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const messageDisplay = document.getElementById('message');
const hangmanArt = document.getElementById('hangman-art');

let secretWord = '';
let guessedWord = [];
let attempts = 6;
let guessedLetters = [];
let incorrectLetters = [];

// Desenho da forca e boneco
const hangmanStages = [
    `
       -----
       |   |
           |
           |
           |
           |
    ------------
    `,
    `
       -----
       |   |
       O   |
           |
           |
           |
    ------------
    `,
    `
       -----
       |   |
       O   |
       |   |
           |
           |
    ------------
    `,
    `
       -----
       |   |
       O   |
      /|   |
           |
           |
    ------------
    `,
    `
       -----
       |   |
       O   |
      /|\\  |
           |
           |
    ------------
    `,
    `
       -----
       |   |
       O   |
      /|\\  |
      /    |
           |
    ------------
    `,
    `
       -----
       |   |
       O   |
      /|\\  |
      / \\  |
           |
    ------------
    `
];

// Função para inicializar o jogo
function initGame() {
    secretWord = prompt("Digite a palavra secreta:").toUpperCase();
    if (!secretWord) {
        alert("Por favor, insira uma palavra válida.");
        initGame();
        return;
    }
    guessedWord = Array(secretWord.length).fill('_');
    attempts = 6;
    guessedLetters = [];
    incorrectLetters = [];
    updateDisplay();
}

// Atualiza a exibição da palavra, tentativas e desenho da forca
function updateDisplay() {
    wordDisplay.textContent = guessedWord.join(' ');
    attemptsDisplay.textContent = `Tentativas restantes: ${attempts}`;
    incorrectLettersDisplay.textContent = `Letras incorretas: ${incorrectLetters.join(', ')}`;
    hangmanArt.textContent = hangmanStages[6 - attempts];
}

// Verifica a letra digitada
function checkGuess() {
    const letter = guessInput.value.toUpperCase();
    guessInput.value = '';

    if (!letter || guessedLetters.includes(letter)) {
        messageDisplay.textContent = "Letra inválida ou já tentada.";
        return;
    }

    guessedLetters.push(letter);

    if (secretWord.includes(letter)) {
        for (let i = 0; i < secretWord.length; i++) {
            if (secretWord[i] === letter) {
                guessedWord[i] = letter;
            }
        }
        messageDisplay.textContent = "Boa! Letra correta.";
    } else {
        attempts--;
        incorrectLetters.push(letter);
        messageDisplay.textContent = "Letra incorreta. Tente novamente.";
    }

    updateDisplay();

    if (guessedWord.join('') === secretWord) {
        messageDisplay.textContent = "Parabéns! Você venceu!";
        endGame();
    } else if (attempts === 0) {
        messageDisplay.textContent = `Vocé Perdeu! A palavra era "${secretWord}".`;
        endGame();
    }
}

// Finaliza o jogo
function endGame() {
    guessInput.disabled = true;
    guessButton.disabled = true;
}

// Event listeners
guessButton.addEventListener('click', checkGuess);
guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkGuess();
    }
});

// Inicializa o jogo
initGame();
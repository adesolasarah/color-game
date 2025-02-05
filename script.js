const targetColorBox = document.getElementById("targetColor");
const colorOptions = document.getElementById("colorOptions");
const gameStatus = document.getElementById("gameStatus");
const scoreValue = document.getElementById("scoreValue");
const newGameBtn = document.getElementById("newGameBtn");

// Game State
let score = 0;
let currentColor = "";

const colors = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#FFA500",
  "#800080",
  "#008000",
  "#800000",
  "#008080",
  "#000080",
];

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function generateOptions(correctColor) {
  const options = [correctColor];
  while (options.length < 6) {
    const newColor = getRandomColor();
    if (!options.includes(newColor)) {
      options.push(newColor);
    }
  }
  return options.sort(() => Math.random() - 0.5);
}

function createColorButtons(colors) {
  colorOptions.innerHTML = "";
  colors.forEach((color) => {
    const button = document.createElement("button");
    button.setAttribute("data-testid", "colorOption");
    button.className = "color-option";
    button.style.backgroundColor = color;
    button.addEventListener("click", () => handleGuess(color));
    colorOptions.appendChild(button);
  });
}

function handleGuess(guessedColor) {
  const isCorrect = guessedColor === currentColor;

  gameStatus.className = `game-status ${isCorrect ? "correct" : "wrong"} show`;
  gameStatus.textContent = isCorrect
    ? "Correct! Well done!"
    : "Wrong guess. Try again!";

  if (isCorrect) {
    score++;
    scoreValue.textContent = score;

    setTimeout(() => {
      startNewGame();
    }, 1500);
  }

  setTimeout(() => {
    gameStatus.className = "game-status";
  }, 2000);
}

function startNewGame() {
  currentColor = getRandomColor();
  targetColorBox.style.backgroundColor = currentColor;
  const options = generateOptions(currentColor);
  createColorButtons(options);
  gameStatus.className = "game-status";
  targetColorBox.className = "color-box fade-in";

  setTimeout(() => {
    targetColorBox.className = "color-box";
  }, 300);
}

newGameBtn.addEventListener("click", () => {
  startNewGame();
});

startNewGame();

// Set up variables
const gameContainer = document.querySelector(".memory-game-blocks");
const blocks = Array.from(gameContainer.children);
const triesElement = document.querySelector(".tries span");
const successSound = document.getElementById("success");
const fullSuccessSound = document.getElementById("full-success");
const endGame = document.getElementById("End-Game");
const failSound = document.getElementById("fail");
let yourName;
let countdownTimer;
let timeLeft = 120; // 2 minutes

// Function to shuffle an array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Function to flip a block
function flipBlock(block) {
  block.classList.add("is-flipped");
  const allFlippedBlocks = blocks.filter((block) =>
    block.classList.contains("is-flipped")
  );
  if (allFlippedBlocks.length === 2) {
    setTimeout(() => {
      checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }, 1000);
    gameContainer.classList.add("no-clicking");
    setTimeout(() => {
      gameContainer.classList.remove("no-clicking");
    }, 1000);
  }
}

// Function to check if two blocks match
function checkMatchedBlocks(firstBlock, secondBlock) {
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");
    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
    successSound.play();
    checkIfWon();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, 1000);
    failSound.play();
  }
}

// Event listener for start game button
document
  .querySelector(".control-buttons span")
  .addEventListener("click", () => {
    yourName = prompt("What's your name?") || "Unknown";
    document.querySelector(".name span").innerHTML = yourName;
    document.querySelector(".control-buttons").remove();
    startCountdown();

    // Initialize game
    shuffle(blocks);
    blocks.forEach((block, index) => {
      block.style.order = index;
      block.addEventListener("click", () => {
        flipBlock(block);
      });
    });
  });

// Function to check if all blocks have a match
function checkIfWon() {
  const allBlocks = Array.from(gameContainer.children);
  const allMatched = allBlocks.every((block) =>
    block.classList.contains("has-match")
  );
  if (allMatched) {
    congratsPopup();
    successSound.remove();
    clearInterval(countdownTimer);
  }
}

// Function to display congrats popup
function congratsPopup() {
  const popup = document.querySelector(".congrats-popup");
  popup.style.display = "block";
  const congratsMessage = document.getElementById("congrats-message");
  congratsMessage.textContent = `Congratulations, ${yourName}! You won!`;
  fullSuccessSound.play();
}

// Function to start the countdown timer
function startCountdown() {
  countdownTimer = setInterval(() => {
    timeLeft--;
    document.getElementById("countdown").innerHTML = `Time left: ${formatTime(
      timeLeft
    )}`;
    if (timeLeft === 0) {
      clearInterval(countdownTimer);
      gameOver();
    }
  }, 1000);
}

// Function to format time
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// Function to handle game over
function gameOver() {
  const gameOverPopup = document.querySelector(".game-over-popup");
  gameOverPopup.style.display = "block";
  const gameOverMessage = document.getElementById("game-over-message");
  gameOverMessage.innerHTML = "Sorry, you lose!";
  endGame.play();
}

// Add event listener to play again button
document.getElementById("play-again-button").addEventListener("click", () => {
  window.location.reload();
});
document.getElementById("play-again").addEventListener("click", () => {
  window.location.reload();
});

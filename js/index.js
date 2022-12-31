// game constants and variables
let direction = { x: 0, y: 0 };
const foodSound = new Audio("./../music/food.mp3");
const gameOverSound = new Audio("./../music/gameover.mp3");
const moveSound = new Audio("./../music/move.mp3");
const musicSound = new Audio("./../music/music.mp3");
let speed = 5;
let lastPaintTime = 0;
let board = document.querySelector(".board");
let Score = document.querySelector(".score");
let highScore = document.querySelector(".highscore");
let max = 0;

let a = 2,
  b = 23;
let snakeArr = [
  {
    x: parseInt(a + (b - a) * Math.random()),
    y: parseInt(a + (b - a) * Math.random()),
  },
];
let food = {
  x: parseInt(a + (b - a) * Math.random()),
  y: parseInt(a + (b - a) * Math.random()),
};
let score = 0;
// game functions
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 500 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}
function isCollide(snakeArr) {
  // if (snakeArr[0].x > 25) return true;
  // if (snakeArr[0].x < 0)  return true;
  // if (snakeArr[0].y > 25) return true;
  // if (snakeArr[0].y < 0) return true;

  for (let i = 1; i < snakeArr.length; i++) {
    if (snakeArr[i].x == snakeArr[0].x && snakeArr[i].y == snakeArr[0].y)
      return true;
  }
  return false;
}

function gameEngine() {
  Score.innerHTML = "Score : " + score;
  highScore.innerHTML = "High Score : " + max;
  // part 1: Update the snake array and food
  if (isCollide(snakeArr)) {
    snakeArr = [
      {
        x: parseInt(a + (b - a) * Math.random()),
        y: parseInt(a + (b - a) * Math.random()),
      },
    ];
    food = {
      x: parseInt(a + (b - a) * Math.random()),
      y: parseInt(a + (b - a) * Math.random()),
    };
    direction = { x: 0, y: 0 };
    score = 0;
    speed = 5;
    musicSound.pause();
    musicSound.currentTime = 0;
    gameOverSound.play();
  } else {
    
    for (let i = snakeArr.length - 2; i >= 0; i--) {
      snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += direction.x;
    if (snakeArr[0].x == 26) snakeArr[0].x = 0;
    else if (snakeArr[0].x == -1) snakeArr[0].x = 25;

    snakeArr[0].y += direction.y;
    if (snakeArr[0].y == 26) snakeArr[0].y = 0;
    else if (snakeArr[0].y == -1) snakeArr[0].y = 25;

    if (snakeArr[0].x == food.x && snakeArr[0].y == food.y) {
      snakeArr.push({ x: undefined, y: undefined });
      foodSound.play();

      food = {
        x: parseInt(a + (b - a) * Math.random()),
        y: parseInt(a + (b - a) * Math.random()),
      };
      score++;
      max = max > score ? max : score;
      speed += 0.3;
    }
  }
  // part 2: display the snake and food
  // display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, i) => {
    let snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.x;
    if(e.x===undefined)
    snakeElement.style.display="none";
    else
    snakeElement.style.display="inline";
    snakeElement.style.gridColumnStart = e.y;
    
    if (i === 0) snakeElement.classList.add("head");
    else snakeElement.classList.add("snake");

    board.appendChild(snakeElement);
  });

  // display the food
  let foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.x;
  foodElement.style.gridColumnStart = food.y;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}
document.addEventListener("keydown", (e) => {
  musicSound.play();
  switch (e.key) {
    case "ArrowUp":
      direction.x = -1;
      direction.y = 0;
      break;
    case "ArrowDown":
      direction.x = 1;
      direction.y = 0;
      break;
    case "ArrowLeft":
      direction.x = 0;
      direction.y = -1;
      break;
    case "ArrowRight":
      direction.x = 0;
      direction.y = 1;
  }
});
// Main logic starts here
window.requestAnimationFrame(main);

const CANVAS = 600;
let snake = null;
let food = null;
let BOARD_SIZE = 40;
let STEP_SIZE = CANVAS / BOARD_SIZE;

function setup() {
  createCanvas(CANVAS, CANVAS);
  background(0);
  snake = new Snake(
    (BOARD_SIZE * STEP_SIZE) / 2,
    (BOARD_SIZE * STEP_SIZE) / 2,
    STEP_SIZE,
    CANVAS
  );

  let foodX = floor(random(BOARD_SIZE)) * STEP_SIZE;
  let foodY = floor(random(BOARD_SIZE)) * STEP_SIZE;
  console.log(foodX, foodY);

  food = new FoodBlock(foodX, foodY, STEP_SIZE);

  frameRate(10);
}

function draw() {
  background(0);

  checkForFood();
  snake.move();
  snake.show();

  food.show();
}

function checkForFood() {
  if (snake.x == food.x && snake.y == food.y) {
    snake.foundFood();
    food.relocate();
  }
}

function keyPressed() {
  let direction;

  switch (keyCode) {
    case LEFT_ARROW:
      direction = Snake.LEFT;
      break;

    case RIGHT_ARROW:
      direction = Snake.RIGHT;
      break;

    case UP_ARROW:
      direction = Snake.UP;
      break;

    case DOWN_ARROW:
      direction = Snake.DOWN;
      break;

    default:
      console.log(keyCode, LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW);
      break;
  }
  snake.changeDirection(direction);
}

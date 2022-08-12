class Snake {
  constructor(x, y, size, canvas) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.canvas = canvas;

    this.atEdge = false;
    this.direction = Snake.UP;

    this.history = [];
    this.justAte = false;
  }

  show() {
    fill(255);
    noStroke();
    rect(this.x, this.y, this.size, this.size);

    let count = 0;
    this.history.forEach((block) => {
      let c = map(count, 0, this.history.length, 250, 50);
      fill(c);
      rect(block.x, block.y, this.size, this.size);
      count++;
    });
  }

  move() {
    if (this.atEdge) {
      return;
    }

    let x = this.x;
    let y = this.y;

    switch (this.direction) {
      case Snake.UP:
        this.y = this.y - this.size;
        this.y = this.y < 0 ? this.canvas + this.y : this.y;
        break;
      case Snake.DOWN:
        this.y = (this.y + this.size) % this.canvas;
        break;
      case Snake.RIGHT:
        this.x = (this.x + this.size) % this.canvas;
        break;
      case Snake.LEFT:
        this.x = this.x - this.size;
        this.x = this.x < 0 ? this.canvas + this.x : this.x;
        break;
      default:
        this.direction = Snake.UP;
        break;
    }

    this.history.unshift(new SnakeBlock(x, y));
    if (!this.justAte) {
      this.history.pop();
    } else {
      this.justAte = false;
    }
    this.isAtEdge();
  }

  isAtEdge() {
    this.atEdge =
      this.atEdge ||
      this.history.find((h) => {
        return this.x == h.x && this.y == h.y;
      }) != null;

    return this.atEdge;
  }

  changeDirection(direction) {
    if (
      !direction ||
      direction == this.direction ||
      direction * -1 == this.direction
    ) {
      return;
    }
    this.direction = direction;
    this.isAtEdge();
  }

  grow() {
    if (this.atEdge) {
      return;
    }
    this.justAte = true;
  }

  foundFood() {
    this.grow();
  }

  static get UP() {
    return 1;
  }

  static get DOWN() {
    return -1;
  }

  static get LEFT() {
    return 2;
  }

  static get RIGHT() {
    return -2;
  }
}

class SnakeBlock {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class FoodBlock {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  show() {
    noStroke();
    fill(color(255, 0, 20));
    rect(this.x, this.y, this.size, this.size);
  }

  relocate() {
    this.x = floor(random(BOARD_SIZE)) * STEP_SIZE;
    this.y = floor(random(BOARD_SIZE)) * STEP_SIZE;
  }
}

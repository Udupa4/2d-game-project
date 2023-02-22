import {
  Idle,
  Running,
  Jumping,
  Falling,
  Crouching,
  Attack,
} from "./states.js";

export class Player {
  constructor(game) {
    this.game = game;
    this.spriteWidth = 50;
    this.spriteHeight = 37;
    this.width = this.spriteWidth * 2.5;
    this.height = this.spriteHeight * 3;
    this.x = 0;
    this.y = this.game.height - this.height;
    this.vy = 0;
    this.gravity = 1;
    this.image = document.getElementById("right-facing-character-animation");
    this.leftFacingImage = document.getElementById(
      "left-facing-character-animation"
    );
    this.leftFacing = false;
    this.frameX = 0;
    this.maxFrames = 3;
    this.frameY = 0;
    this.fps = 10;
    this.frameSpeed = 1;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.speed = 0;
    this.maxSpeed = 6;
    this.isAttacking = false;
    this.states = [
      new Idle(this),
      new Running(this),
      new Jumping(this),
      new Falling(this),
      new Crouching(this),
      new Attack(this),
    ];
    this.currentState = this.states[0];
  }

  update(inputArray, deltaTime) {
    this.currentState.handleInput(inputArray);

    // horizontal movement
    this.x += this.speed;
    if (
      inputArray.includes("d") &&
      !inputArray.includes("a") &&
      !inputArray.includes(" ")
    )
      this.speed = this.maxSpeed;
    else if (
      inputArray.includes("a") &&
      !inputArray.includes("d") &&
      !inputArray.includes(" ")
    )
      this.speed = -this.maxSpeed;
    else this.speed = 0;

    // boundary conditions
    if (this.x < 0) this.x = 0;
    else if (this.x + this.width >= this.game.width)
      this.x = this.game.width - this.width;

    // vertical movement
    this.y += this.vy;
    if (!this.onGround()) {
      this.vy += this.gravity;
      if (inputArray.includes("a")) {
        this.frameX = 7;
        this.leftFacing = true;
      } else if (inputArray.includes("d")) {
        this.frameX = 0;
        this.leftFacing = false;
      }
    }

    if (this.y + this.height >= this.game.height)
      this.y = this.game.height - this.height;

    // sprite animation
    if (this.frameTimer > this.frameInterval) {
      if (this.leftFacing) {
        if (this.frameX < 7 - this.maxFrames + 1) this.frameX = 7;
        else this.frameX--;
      } else {
        if (this.frameX < this.maxFrames) this.frameX++;
        else this.frameX = 0;
      }
      this.frameTimer = 0;
    } else this.frameTimer += deltaTime * this.frameSpeed;
  }

  draw(context) {
    if (this.leftFacing) {
      context.drawImage(
        this.leftFacingImage,
        this.spriteWidth * this.frameX,
        this.spriteHeight * this.frameY,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
    } else {
      context.drawImage(
        this.image,
        this.spriteWidth * this.frameX,
        this.spriteHeight * this.frameY,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }

    // context.strokeRect(
    //   this.x + this.width / 4,
    //   this.y,
    //   this.width / 2,
    //   this.height
    // );
  }

  onGround() {
    return this.y + this.height >= this.game.height;
  }

  setState(stateIndex, speed) {
    if (this.leftFacing) this.frameX = 7;
    else this.frameX = 0;

    if (speed) this.frameSpeed = speed;
    else this.frameSpeed = 1;

    this.currentState = this.states[stateIndex];
    this.currentState.enter();
  }
}

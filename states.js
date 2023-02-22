const statesObject = {
  IDLE_1: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
  CROUCHING: 4,
  ATTACK: 5,
  SLIDING: 6,
};

class PlayerState {
  constructor(state) {
    // for debugging purposes
    this.state = state;
  }
}

export class Idle extends PlayerState {
  constructor(player) {
    super("IDLE");
    this.player = player;
  }
  enter() {
    this.player.maxFrames = 3;
    this.player.frameY = 0;
  }
  handleInput(inputArray) {
    if (inputArray.includes("d") && !inputArray.includes("a")) {
      this.player.leftFacing = false;
      this.player.setState(1);
    } else if (inputArray.includes("a") && !inputArray.includes("d")) {
      this.player.leftFacing = true;
      this.player.setState(1);
    } else if (inputArray.includes("s")) this.player.setState(4);
    else if (inputArray.includes("w")) this.player.setState(2);
    else if (inputArray.includes(" ")) this.player.setState(5, 3);
  }
}

export class Running extends PlayerState {
  constructor(player) {
    super("RUNNING");
    this.player = player;
  }
  enter() {
    this.player.maxFrames = 5;
    this.player.frameY = 1;
  }
  handleInput(inputArray) {
    // attack state
    if (inputArray.includes(" ")) this.player.setState(5, 3);

    // left or right facing
    if (inputArray.includes("a") && !inputArray.includes("d"))
      this.player.leftFacing = true;
    else if (inputArray.includes("d") && !inputArray.includes("a"))
      this.player.leftFacing = false;

    // both left and right key pressed simultaneously
    if (inputArray.includes("d") && inputArray.includes("a")) {
      if (inputArray.indexOf("d") < inputArray.indexOf("a")) {
        this.player.leftFacing = false;
      } else {
        this.player.leftFacing = true;
      }
      this.player.setState(0);
    } else if (
      !(inputArray.includes("d") || inputArray.includes("a")) &&
      this.player.onGround()
    )
      this.player.setState(0);

    // jump
    if (inputArray.includes("w")) this.player.setState(2);
  }
}

export class Jumping extends PlayerState {
  constructor(player) {
    super("JUMPING");
    this.player = player;
  }
  enter() {
    if (this.player.onGround()) this.player.vy = -25;

    this.player.frameY = 2;
    this.player.maxFrames = 0;
  }
  handleInput(inputArray) {
    //console.log(this.player.vy);
    if (this.player.vy > this.player.gravity) {
      this.player.setState(3);
      console.log("falling");
    }
  }
}

export class Falling extends PlayerState {
  constructor(player) {
    super("FALLING");
    this.player = player;
  }
  enter() {
    //this.player.vy += this.player.gravity;
    this.player.frameY = 3;
    this.player.maxFrames = 1;
  }
  handleInput(inputArray) {
    if (this.player.onGround()) this.player.setState(0);
  }
}

export class Crouching extends PlayerState {
  constructor(player) {
    super("CROUCHING");
    this.player = player;
  }
  enter() {
    this.player.frameY = 4;
    this.player.maxFrames = 3;
  }
  handleInput(inputArray) {
    if (inputArray.includes("d") && inputArray.includes("a")) return;

    if (inputArray.includes("a") && !inputArray.includes("d")) {
      this.player.leftFacing = true;
      this.player.setState(1);
    } else if (inputArray.includes("d") && !inputArray.includes("a")) {
      this.player.leftFacing = false;
      this.player.setState(1);
    } else if (!inputArray.includes("s")) this.player.setState(0);
  }
}

export class Attack extends PlayerState {
  constructor(player) {
    super("ATTACK");
    this.player = player;
  }
  enter() {
    this.player.frameY = 5;
    this.player.maxFrames = 5;
  }
  handleInput(inputArray) {
    if (this.player.leftFacing) {
      if (this.player.frameX <= 3) this.player.setState(0);
    } else if (this.player.frameX >= 4) this.player.setState(0);
  }
}

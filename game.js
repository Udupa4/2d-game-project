import { Player } from "./player.js";
import { InputHandler } from "./input.js";

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const scale = 1;
const Canvas_width = canvas.width = 600 * scale;
const Canvas_Height = canvas.height = 600 * scale;

class Game {
    constructor() {
        this.width = Canvas_width;
        this.height = Canvas_Height;
        this.scale = scale;
        this.player = new Player(this);
        this.input = new InputHandler();
    }

    update(deltaTime) {
        this.player.update(this.input.keys, deltaTime);
    }

    draw(context) {
        this.player.draw(context);
    }
}

let game = new Game();
let lastTime = 0;
let deltaTime = 0;

function animate(timeStamp){
    deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, Canvas_width, Canvas_Height);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate);
}

animate(0);
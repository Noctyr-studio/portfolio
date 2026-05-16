
// ==================== CONFIG ====================
export const canvas = document.getElementById("gameCanvas");
export const ctx = canvas.getContext("2d");

export const GAME_WIDTH = 1024;
export const GAME_HEIGHT = 576;
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

export const WORLD_WIDTH = 6000;
export const WORLD_HEIGHT = 2000;

export const bgImage = new Image();
bgImage.src = "bg/Background_01.png";

export const keys = {};

window.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
window.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

canvas.addEventListener("click", e => {

  if(!scene || (!scene.gameOver && !scene.gameDone)) return;

  const rect = canvas.getBoundingClientRect();

  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  const buttonX = GAME_WIDTH / 2 - 100;
  const buttonY = 360;
  const buttonW = 200;
  const buttonH = 60;

  const inside =
    mouseX >= buttonX &&
    mouseX <= buttonX + buttonW &&
    mouseY >= buttonY &&
    mouseY <= buttonY + buttonH;

  if(inside){

    scene = new Scene();
  }
});


// ==================== IMPORT ====================
import { Scene } from "./scene.js";
import { AssetManager } from "./assetManager.js";
import { LoadingScreen } from "./loadingScreen.js";


// ==================== STATE ====================
let scene = null;
let gameStarted = false;
let lastTime = 0;



const assets = new AssetManager();

const loader = new LoadingScreen(assets);

await loader.load();


// ==================== LOOP ====================
function gameLoop(time){
  const dt = (time - lastTime) / 1000;
  lastTime = time;

  ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);

  if (!loader.isDone()) {
    loader.update(dt);
    loader.draw(ctx, GAME_WIDTH, GAME_HEIGHT);
    requestAnimationFrame(gameLoop);
    return;
  }

  if (!scene) {
    requestAnimationFrame(gameLoop);
    return;
  }

  if(keys["escape"]){
    scene.paused = !scene.paused;
    keys["escape"] = false;
  }

  scene.update(dt);
  scene.draw();

  requestAnimationFrame(gameLoop);
}

// ==================== INIT ====================
async function bootstrap() {
  await loader.load();

  scene = new Scene();
  gameStarted = true;

  requestAnimationFrame(gameLoop);
}

bootstrap();


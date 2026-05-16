

export class LoadingScreen {

  constructor(assetManager){

    this.assets = assetManager;

    this.progress = 0;
    this.fade = 0;

    this.done = false;
  }

  async load(){

    await Promise.all([

      // ---------------- IMAGENES ----------------
      /*this.assets.loadImage("logo", 
        "clean.png"),

      /* this.assets.loadImage(
        "bg",
        "medieval-ruins/Background_01.png"
      ),*/

      // ---------------- NINJA ----------------

      this.assets.loadAnimations(
        "ninja",
        [
          "idle",
          "run",
          "attack",
          "die",
          "jump",
          "slide",
          "throw",
          "jump_attack",
          "jump_throw"
        ],
        10
      ),

      // ---------------- KNIGHT ----------------

      this.assets.loadAnimations(
        "knight",
        [
          "idle",
          "run",
          "attack",
          "die"
        ],
        10
      )

    ]);

    this.done = true;
  }

  update(dt){

    // progreso REAL
    this.progress = this.assets.getProgress();

    // fade suave
    this.fade += dt * 2;  

    if(this.fade > 1){
      this.fade = 1;
    }
  }

  draw(ctx, width, height){

    // fondo
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);

    ctx.save();

    ctx.globalAlpha = this.fade;

    // ---------------- LOGO ----------------

    const logoSize = 200;

    ctx.drawImage(
      this.logo,
      width/2 - logoSize/2,
      height/2 - 150,
      logoSize,
      logoSize
    );

    // ---------------- TEXTO ----------------

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";

    const percent =
    Math.floor(this.progress * 100);

    ctx.fillText(
      `Loading... ${percent}%`,
      width/2 - 70,
      height/2 + 80
    );

    // ---------------- BARRA ----------------

    const barWidth = 300;
    const barHeight = 20;

    const x = width/2 - barWidth/2;
    const y = height/2 + 100;

    // fondo barra
    ctx.fillStyle = "#222";

    ctx.fillRect(
      x,
      y,
      barWidth,
      barHeight
    );

    // progreso
    ctx.fillStyle = "#00ffcc";

    ctx.fillRect(
      x,
      y,
      barWidth * this.progress,
      barHeight
    );

    ctx.restore();
  }

  isDone(){
    return this.done;
  }

}
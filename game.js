const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let player = {
  x: 50,
  y: 50,
  w: 30,
  h: 30,
  dx: 0,
  dy: 0,
  speed: 4,
  jump: 12,
  ground: false
};

let gravity = 0.5;

let platforms = [
  { x: 0, y: 370, w: 500, h: 30 },
  { x: 150, y: 300, w: 100, h: 20 },
  { x: 300, y: 220, w: 120, h: 20 },
  { x: 50, y: 150, w: 80, h: 20 }
];

let keys = {};

window.addEventListener("keydown", e => {
  keys[e.key] = true;
});

window.addEventListener("keyup", e => {
  keys[e.key] = false;
});

function collide(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );
}

function update() {
  if (keys["ArrowLeft"]) player.x -= player.speed;
  if (keys["ArrowRight"]) player.x += player.speed;

  if (keys[" "] && player.ground) {
    player.dy = -player.jump;
    player.ground = false;
  }

  player.dy += gravity;
  player.y += player.dy;

  player.ground = false;

  for (let i = 0; i < platforms.length; i++) {
    let p = platforms[i];

    if (collide(player, p)) {
      if (player.dy > 0 && player.y + player.h <= p.y + player.dy) {
        player.y = p.y - player.h;
        player.dy = 0;
        player.ground = true;
      }
    }
  }

  if (player.x < 0) player.x = 0;
  if (player.x + player.w > canvas.width) player.x = canvas.width - player.w;

  if (player.y + player.h > canvas.height) {
    player.y = canvas.height - player.h;
    player.dy = 0;
    player.ground = true;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "blue";
  ctx.fillRect(player.x, player.y, player.w, player.h);

  ctx.fillStyle = "red";
  for (let i = 0; i < platforms.length; i++) {
    let p = platforms[i];
    ctx.fillRect(p.x, p.y, p.w, p.h);
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();

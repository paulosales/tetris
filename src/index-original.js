const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");

context.scale(20, 20);

function arenaSweep() {
  let rowCount = 1;
  outer: for (let y = arena.length - 1; y > 0; --y) {
    for (let x = 0; x < arena[y].length; ++x) {
      if (arena[y][x] === 0) {
        continue outer;
      }
    }

    const row = arena.splice(y, 1)[0].fill(0);
    arena.unshift(row);
    ++y;

    player.score += rowCount * 10;
    rowCount *= 2;
  }
}

function collide(arena, player) {
  const [m, o] = [player.matrix, player.pos];
  for (let y = 0; y < m.length; ++y) {
    for (let x = 0; x < m[y].length; ++x) {
      if (m[y][x] !== 0 && (arena[o.y + y] && arena[o.y + y][o.x + x]) !== 0) {
        return true;
      }
    }
  }
  return false;
}

function createMatrix(w, h) {
  const matrix = [];
  while (h--) {
    matrix.push(new Array(w).fill(0));
  }
  return matrix;
}

const PiecesType = {
  T: 1,
  O: 2,
  L: 3,
  J: 4,
  I: 5,
  S: 6,
  Z: 7,
};

function createPiece(type) {
  switch (type) {
    case PiecesType.T:
      return [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ];
    case PiecesType.O:
      return [
        [2, 2],
        [2, 2],
      ];
    case PiecesType.L:
      return [
        [0, 3, 0],
        [0, 3, 0],
        [0, 3, 3],
      ];
    case PiecesType.J:
      return [
        [0, 4, 0],
        [0, 4, 0],
        [4, 4, 0],
      ];
    case PiecesType.I:
      return [
        [0, 5, 0, 0],
        [0, 5, 0, 0],
        [0, 5, 0, 0],
        [0, 5, 0, 0],
      ];
    case PiecesType.S:
      return [
        [0, 6, 6],
        [6, 6, 0],
        [0, 0, 0],
      ];
    case PiecesType.Z:
      return [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0],
      ];
    default:
      throw new Error("Invalid piece.");
  }
}

function draw() {
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.width, canvas.height);

  drawMatrix(arena, { x: 0, y: 0 });
  drawMatrix(player.matrix, player.pos);
}

function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = colors[value];
        context.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
}

function merge(arena, player) {
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        arena[player.pos.y + y][player.pos.x + x] = value;
      }
    });
  });
}

function playerDrop() {
  player.pos.y++;
  if (collide(arena, player)) {
    player.pos.y--;
    merge(arena, player);
    playerReset();
    arenaSweep();
    updateScore();
    player.pos.y = 0;
  }
  dropCounter = 0;
}

function playerMove(dir) {
  player.pos.x += dir;
  if (collide(arena, player)) {
    player.pos.x -= dir;
  }
}

function playerReset() {
  let pieceNumber = ((7 * Math.random()) | 0) + 1;
  while (pieceNumber === 7) {
    pieceNumber = ((7 * Math.random()) | 0) + 1;
  }
  player.matrix = createPiece(pieceNumber);
  player.pos.y = 0;
  player.pos.x =
    ((arena[0].length / 2) | 0) - ((player.matrix[0].length / 2) | 0);

  if (collide(arena, player)) {
    arena.forEach((row) => row.fill(0));
    player.score = 0;
    updateScore();
  }
}

/*
  the matix rotation is implemeted using two operations: transpose and reverse.
  Example: Rotate in clockwise direction
  Initial matrix M
  0 0 0
  1 1 1
  0 1 0

  transpose(M)
  0 1 0
  0 1 1
  0 1 0

  reverse-rows(M) //for couterwiseclock, just reverse columns.
  0 1 0
  1 1 0
  0 1 0
*/
const RotateDirection = {
  CLOCKWISE: 1,
  COUNTERCLOCKWISE: -1,
};

function rotate(matrix, dir) {
  //transpose the matrix: Exchange the matrix columns by matrix lines.
  for (let y = 0; y < matrix.length; ++y) {
    for (let x = 0; x < y; ++x) {
      //swaping
      [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
    }
  }

  if (dir === RotateDirection.CLOCKWISE) {
    //reverse the matrix rows
    matrix.forEach((row) => row.reverse());
  } else {
    //reverse the matrix columns
    matrix.reverse();
  }
}

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;
function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;
  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    playerDrop();
  }

  draw();
  requestAnimationFrame(update);
}

function updateScore() {
  document.getElementById("score").innerText = player.score;
}

const colors = [
  null,
  "#FF0D72",
  "#0DC2FF",
  "#0DFF72",
  "#F538FF",
  "#FF8E0D",
  "#FFE138",
  "#3877FF",
];

function playerRotate(dir) {
  const originPos = player.pos.x;
  rotate(player.matrix, dir);
  let offset = 1;
  while (collide(arena, player)) {
    player.pos.x += offset;
    offset = -(offset + (offset > 0 ? 1 : -1));
    if (offset > player.matrix[0].length) {
      rotate(player.matrix, -dir);
      player.pos.x = originPos;
      return;
    }
  }
}

const arena = createMatrix(12, 20);

const player = {
  pos: { x: 0, y: 0 },
  matrix: null,
  score: 0,
};

const Keys = { LEFT: 37, RIGHT: 39, DOWN: 40, Q: 81, W: 87 };

document.addEventListener("keydown", (event) => {
  switch (event.keyCode) {
    case Keys.LEFT:
      playerMove(-1);
      break;
    case Keys.RIGHT:
      playerMove(1);
      break;
    case Keys.DOWN:
      playerDrop();
      break;
    case Keys.Q:
      playerRotate(RotateDirection.CLOCKWISE);
      break;
    case Keys.W:
      playerRotate(RotateDirection.COUNTERCLOCKWISE);
      break;
    default:
      break;
  }
});

playerReset();
updateScore();
update();

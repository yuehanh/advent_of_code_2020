const parseInput = require("../util");

const inputs = parseInput("d12");

const navigate = () => {
  let dirIdx = 0;
  const directions = { E: 0, S: 1, W: 2, N: 3 };
  directions["F"] = dirIdx;
  const pos = [0, 0, 0, 0];

  for (const input of inputs) {
    const dirIns = input[0];
    const dirVal = Number(input.slice(1));

    switch (dirIns) {
      case "R":
        dirIdx = (dirVal / 90 + dirIdx) % 4;
        directions["F"] = dirIdx;
        break;
      case "L":
        dirIdx = (((dirIdx - dirVal / 90) % 4) + 4) % 4;
        directions["F"] = dirIdx;
        break;
      default:
        pos[directions[dirIns]] += dirVal;
    }
  }

  const mDist = Math.abs(pos[0] - pos[2]) + Math.abs(pos[1] - pos[3]);
  console.log(mDist);
};

navigate();

const rotate = (arr, val) => {
  return arr.slice(val).concat(arr.slice(0, val));
};

const trueNavigate = () => {
  const directions = { E: 0, S: 1, W: 2, N: 3 };

  let pos = [10, 0, 0, 1];
  let shipPos = [0, 0, 0, 0];

  for (const input of inputs) {
    const dirIns = input[0];
    const dirVal = Number(input.slice(1));

    switch (dirIns) {
      case "R":
        pos = rotate(pos, -(dirVal / 90));
        break;
      case "L":
        pos = rotate(pos, dirVal / 90);
        break;
      case "F":
        for (let i = 0; i < pos.length; i++) {
          shipPos[i] += pos[i] * dirVal;
        }
        break;
      default:
        pos[directions[dirIns]] += dirVal;
    }
  }
  const mDist =
    Math.abs(shipPos[0] - shipPos[2]) + Math.abs(shipPos[1] - shipPos[3]);
  console.log(mDist);
};

trueNavigate();

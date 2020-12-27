const parseInput = require("../util");

const inputs = parseInput("d8");

const interpretInput = (input) => {
  let [instruction, val] = input.split(" ");
  val = Number(val);
  return [instruction, val];
};

const findRepeat = () => {
  const length = inputs.length;
  let accCount = 0;
  const visited = new Set();
  let i = 0;
  while (!visited.has(i) && i < length) {
    visited.add(i);
    const [instruction, val] = interpretInput(inputs[i]);

    switch (instruction) {
      case "nop":
        i++;
        break;
      case "jmp":
        i += val;
        break;
      case "acc":
        i++;
        accCount += val;
        break;
      default:
        throw "error";
    }
  }

  console.log(accCount);
};

findRepeat();
const checkIns = (idx) => {
  const length = inputs.length;
  let accCount = 0;
  const visited = new Set();
  let i = 0;
  while (i < length) {
    if (visited.has(i)) {
      return undefined;
    }
    visited.add(i);
    let [instruction, val] = interpretInput(inputs[i]);
    if (idx === i) {
      if (instruction === "nop") {
        instruction = "jmp";
      } else if (instruction === "jmp") {
        instruction = "nop";
      }
    }
    switch (instruction) {
      case "nop":
        i++;
        break;
      case "jmp":
        i += val;
        break;
      case "acc":
        i++;
        accCount += val;
        break;
      default:
        throw "error";
    }
  }

  return accCount;
};

const findError = () => {
  const length = inputs.length;
  for (let i = 0; i < length; i++) {
    if (checkIns(i)) return checkIns(i);
  }
};
console.log(findError());

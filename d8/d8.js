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
    console.log(i)
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

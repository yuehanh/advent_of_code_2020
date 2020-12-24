const parseInput = require("../util");

const inputs = parseInput("d5");

const interpretSeatId = (input) => {
  const rowCode = input.slice(0, 7);
  const colCode = input.slice(7);

  const rowNum = codeInterpreter(rowCode, "F", "B");
  const colNum = codeInterpreter(colCode, "L", "R");

  const seatId = rowNum * 8 + colNum;
  return seatId;
};

const codeInterpreter = (code, codeOne, codeTwo) => {
  let result = 0;
  for (let i = 0; i < code.length; i++) {
    if (code[i] === codeTwo) result += 2 ** (code.length - i - 1);
  }

  return result;
};

const maxSeatId = () => {
  let max = 0;
  for (input of inputs) {
    max = Math.max(interpretSeatId(input), max);
  }
  return max;
};

console.log(maxSeatId());



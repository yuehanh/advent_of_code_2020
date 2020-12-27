const parseInput = require("../util");

const inputs = parseInput("d10")
  .map(Number)
  .sort((a, b) => a - b);
inputs.unshift(0);

const multOneAndThreeDiff = () => {
  let diff3 = 1;
  let diff1 = 0;
  for (let i = 0; i < inputs.length - 1; i++) {
    if (inputs[i + 1] - inputs[i] === 1) {
      diff1++;
    } else if (inputs[i + 1] - inputs[i] === 3) {
      diff3++;
    }
  }
  console.log(diff1 * diff3);
};

multOneAndThreeDiff();

const max = Math.max(...inputs);

const distinctWays = () => {
  const dpArr = Array(max + 1).fill(0);
  dpArr[1] = 1;
  dpArr[2] = 2;
  dpArr[3] = 4;
  for (let i = 4; i < max; i++) {
    dpArr[inputs[i]] =
      dpArr[inputs[i] - 1] + dpArr[inputs[i] - 2] + dpArr[inputs[i] - 3];
  }
  console.log(dpArr);
  return dpArr[max];
};

console.log(distinctWays());

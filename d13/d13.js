const { constants } = require("buffer");
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");
const parseInput = require("../util");

const inputs = parseInput("d13");

const timestamp = Number(inputs[0]);

const busNumbers = inputs[1].split(",");

const findEarliestBus = () => {
  let min = Infinity;
  let busNum;
  for (const num of busNumbers) {
    if (num === "x") continue;
    if (timestamp % num === 0) return 0;
    if (num - (timestamp % num) < min) {
      min = num - (timestamp % num);
      busNum = num;
    }
  }

  return busNum * min;
};

console.log(findEarliestBus());

const gcd = (a, b) => {
  if (a === 0) return b;

  return gcd(b % a, a);
};

const lcm = (a, b) => {
  return (a * b) / gcd(a, b);
};

const findTimeStampConsec = () => {
  let busLCM = Number(busNumbers[0]);
  let timestamp = 0;
  for (let i = 1; i < busNumbers.length; i++) {
    if (busNumbers[i] === "x") continue;
    const busNum = Number(busNumbers[i]);
    while ((timestamp + i) % busNum) {
      timestamp += busLCM;
    }
    busLCM = lcm(busLCM, busNum);
  }
  return timestamp;
};

console.log(findTimeStampConsec());

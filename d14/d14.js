const { strict } = require("assert");
const parseInput = require("../util");

const inputs = parseInput("d14");

const interpretInput = (input) => {
  const [name, num] = input.split(" = ");
  if (name.slice(0, 3) === "mem") {
    return {
      type: "mem",
      address: name.slice(4, -1),
      val: Number(num).toString(2).padStart(36, "0"),
    };
  } else {
    return {
      type: "mask",
      val: num,
    };
  }
};

const maskNum = (mask, string) => {
  let result = "";
  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === "X") {
      result += string[i];
    } else {
      result += mask[i];
    }
  }

  return parseInt(result, 2);
};

const sumMem = () => {
  const memory = {};
  let mask;
  for (const input of inputs) {
    const { type, address, val } = interpretInput(input);
    if (type === "mask") {
      mask = val;
    } else {
      memory[address] = maskNum(mask, val);
    }
  }

  return Object.values(memory).reduce((acc, el) => acc + el);
};

console.log(sumMem());

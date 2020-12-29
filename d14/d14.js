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

const interpretInput2 = (input) => {
  const [name, num] = input.split(" = ");
  if (name.slice(0, 3) === "mem") {
    return {
      type: "mem",
      address: Number(name.slice(4, -1)).toString(2).padStart(36, "0"),
      val: Number(num),
    };
  } else {
    return {
      type: "mask",
      val: num,
    };
  }
};

const maskAddress = (mask, string) => {
  let result = "";
  let pos = [];
  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === "X") {
      result += "0";
      pos.push(mask.length - 1 - i);
    } else {
      result += mask[i] | string[i];
    }
  }

  result = parseInt(result, 2);
  const addresses = subsets(pos).map((floats) =>
    floats.reduce((acc, el) => acc + 2 ** el, result)
  );

  return addresses;
};

const subsets = (array) => {
  if (array.length === 0) return [array];
  const lastItem = array.pop();
  let subset = subsets(array);

  return subset.map((el) => el.concat(lastItem)).concat(subset);
};

const sumMem2 = () => {
  const memory = {};
  let mask;
  for (const input of inputs) {
    const { type, address, val } = interpretInput2(input);
    if (type === "mask") {
      mask = val;
    } else {
      const keys = maskAddress(mask, address);
      for (const key of keys) {
        memory[key] = val;
      }
    }
  }

  return Object.values(memory).reduce((acc, el) => acc + el);
};

console.log(sumMem2());

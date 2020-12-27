const parseInput = require("../util");

const inputs = parseInput("d9").map(Number);

const findInvalid = () => {
  const nums = inputs.slice(0, 25);
  for (let i = 25; i < inputs.length; i++) {
    if (twoSum(nums, inputs[i])) {
      nums.shift();
      nums.push(inputs[i]);
    } else {
      return inputs[i];
    }
  }
};

const twoSum = (arr, target) => {
  const set = new Set();
  for (const num of arr) {
    const diff = target - num;
    if (set.has(diff)) {
      return true;
    }
    set.add(num);
  }
  return false;
};

console.log(findInvalid());

const findWeakness = () => {
  const target = findInvalid();
  let i = 0;
  let j = 0;
  let sum = 0;
  while (sum !== target && i < inputs.length) {
    if (sum < target) {
      sum += inputs[i];
      i++;
    } else {
      sum -= inputs[j];
      j++;
    }
  }
  const code = inputs.slice(j, i);
  return Math.min(...code) + Math.max(...code);
};

console.log(findWeakness());

const parseInput = require("../util");

const inputs = parseInput("d7");

const interpretInput = (input) => {
  let [parent, children] = input.split(" contain ");
  const val = parent.slice(0, -1);
  children = children.split(",");
  const keys = [];
  for (let child of children) {
    child = child.trim();
    if (child.match(/^[0-9]/)) {
      keys.push(child.slice(2).replace(/bag(?:s\.?|\.)/, "bag"));
    }
  }
  return { keys, val };
};

const constructGraph = () => {
  const map = {};

  for (const input of inputs) {
    const { keys, val } = interpretInput(input);
    for (const key of keys) {
      if (map[key]) {
        map[key].add(val);
      } else {
        map[key] = new Set([val]);
      }
    }
  }

  return map;
};

const countOuterBags = (color) => {
  const map = constructGraph();
  const outerBags = new Set();
  const queue = [color];
  console.log(outerBags);
  while (queue.length > 0) {
    const currColor = queue.shift();
    const colorArr = map[currColor] || [];
    colorArr.forEach((color2) => {
      if (!outerBags.has(color2)) {
        queue.push(color2);
        outerBags.add(color2);
      }
    });
  }
  console.log(outerBags.size);
};

console.log(countOuterBags("shiny gold bag"));

const interpretInput2 = (input) => {
  let [parent, children] = input.split(" contain ");
  const key = parent.slice(0, -1);
  children = children.split(",");
  const vals = [];
  for (let child of children) {
    child = child.trim();
    if (child.match(/^[0-9]/)) {
      const colorCode = child.slice(2).replace(/bag(?:s\.?|\.)/, "bag");
      const count = child[0];
      vals.push({ colorCode, count });
    }
  }
  return { key, vals };
};

const constructGraph2 = () => {
  const map = {};

  for (const input of inputs) {
    const { key, vals } = interpretInput2(input);
    map[key] = vals;
  }
  return map;
};

const countInnerBags = (color, memo = {}) => {
  const map = constructGraph2();
  if (memo[color]) return memo[color];
  memo[color] = 0;
  let innerBags = map[color] || [];
  for (const innerBag of innerBags) {
    memo[color] +=
      innerBag.count * (countInnerBags(innerBag.colorCode, memo) + 1);
  }

  return memo[color];
};

console.log(countInnerBags("shiny gold bag"));

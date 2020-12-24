const fs = require("fs");

const parseInput = (source) => {
  const data = fs.readFileSync(`./${source}/input`, "utf-8");
  return data.split("\n");
};

module.exports = parseInput;

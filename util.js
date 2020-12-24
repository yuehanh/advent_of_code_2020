const fs = require("fs");

const parseInput = () => {
  const data = fs.readFileSync("./input", "utf-8");
  return data.split("\n");
};

export const linesFromInput = parseInput();

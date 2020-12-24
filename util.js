const fs = require("fs");

const parseInput = (source, sep = "\n") => {
  const data = fs.readFileSync(`./${source}/input`, "utf-8");
  return data.split(sep);
};

module.exports = parseInput;

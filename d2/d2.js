const fs = require("fs");

const parseInput = () => {
  const data = fs.readFileSync("./input", "utf-8");
  return data.split("\n");
};

const lines = parseInput();

const interpretLine = (line) => {
  const [range, charP, pw] = line.split(" ");
  const [min, max] = range.split("-");
  const char = charP[0];
  return { min, max, char, pw };
};

const charCount = (pw, target) => {
  let count = 0;
  for (const char of pw) {
    if (char === target) {
      count++;
    }
  }
  return count;
};

const validPw = (lines) => {
  let validCount = 0;
  for (const line of lines) {
    const { min, max, char, pw } = interpretLine(line);
    const count = charCount(pw, char);
    if (min <= count && count <= max) {
      validCount++;
    }
  }
  return validCount;
};

console.log(validPw(lines));

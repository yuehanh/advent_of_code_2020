const parseInput = require("../util");

const inputs = parseInput("d6", "\n\n");

const numOfYesQs = (input) => {
  let resultSet = new Set();
  const questions = input.replace(/\s/g, "");

  for (const char of questions) {
    resultSet.add(char);
  }

  return resultSet.size;
};

const sumOfYesCounts = () => {
  let count = 0;
  for (const group of inputs) {
    count += numOfYesQs(group);
  }

  return count;
};

console.log(sumOfYesCounts());

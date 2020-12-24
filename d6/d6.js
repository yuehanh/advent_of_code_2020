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

const numOfCommonYes = (input) => {
  const answers = input.split("\n");
  let commonSet = new Set(answers[0].split(""));
  for (const ans of answers) {
    commonSet = new Set([...ans].filter((q) => commonSet.has(q)));
  }
  return commonSet.size;
};

const sumOfCommonYesCounts = () => {
  let count = 0;
  for (const group of inputs) {
    count += numOfCommonYes(group);
  }

  return count;
};

console.log(sumOfCommonYesCounts());

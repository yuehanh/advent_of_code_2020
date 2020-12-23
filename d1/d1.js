const fs = require("fs").promises;

const parseInput = async () => {
  const data = await fs.readFile("./input", { encoding: "utf-8" });
  return data.split("\n");
};
const sumTo2020 = async () => {
  const nums = await (await parseInput()).map(Number); //same as .map((num) => Number(num));
  const set = new Set();
  for (const num of nums) {
    const diff = 2020 - num;
    if (set.has(diff)) {
      return num * diff;
    }
    set.add(num);
  }
};

sumTo2020().then(console.log);

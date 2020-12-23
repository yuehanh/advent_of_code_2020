const fs = require("fs").promises;

const parseInput = async () => {
  const data = await fs.readFile("./input", { encoding: "utf-8" });
  return data.split("\n");
};
const sumTo2020 = async () => {
  const nums = (await parseInput()).map(Number); //same as .map((num) => Number(num));
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

const threeSumTo2020 = async () => {
  const nums = (await parseInput()).map(Number); //same as .map((num) => Number(num));
  for (let i = 0; i < nums.length; i++) {
    const set = new Set();
    const twoSum = 2020 - nums[i];
    for (let j = i + 1; j < nums.length; j++) {
      const diff = twoSum - nums[j];
      if (set.has(diff)) {
        console.log(diff);
        console.log(nums[i]);
        console.log(nums[j]);
        return nums[i] * nums[j] * diff;
      }
      set.add(nums[j]);
    }
  }
};

threeSumTo2020().then(console.log);

const parseInput = require("../util");

const lines = parseInput("d3");

const countTrees = (right = 3, down = 1) => {
  let rowPos = 0;
  let colPos = 0;
  const maxRow = lines.length;
  const maxCol = lines[0].length;

  let treeCount = 0;

  while (rowPos < maxRow) {
    if (lines[rowPos][colPos] === "#") {
      treeCount++;
    }
    rowPos += down;
    colPos = (colPos + right) % maxCol;
  }

  return treeCount;
};

console.log(countTrees());

const movements = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

const productOfTreeCounts = () => {
  const product = movements.reduce(
    (acc, el) => acc * countTrees(el[0], el[1]),
    1
  );
  return product;
};

console.log(productOfTreeCounts());

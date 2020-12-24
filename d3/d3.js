const parseInput = require("../util");

const lines = parseInput("d3");

const countTrees = () => {
  let rowPos = 0;
  let colPos = 0;
  const maxRow = lines.length;
  const maxCol = lines[0].length;

  let treeCount = 0;

  while (rowPos < maxRow) {
    if (lines[rowPos][colPos] === "#") {
      treeCount++;
    }
    rowPos++;
    colPos = (colPos + 3) % maxCol;
  }

  console.log(treeCount);
};

countTrees();

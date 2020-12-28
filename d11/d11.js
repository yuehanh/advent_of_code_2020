const parseInput = require("../util");

const inputs = parseInput("d11");

const constructMatrix = () => {
  const rowMax = inputs.length;
  const colMax = inputs[0].length;
  const matrix = Array.from({ length: rowMax + 2 }, () =>
    Array(colMax + 2).fill(null)
  );

  for (let i = 0; i < rowMax; i++) {
    const rowData = inputs[i].split("");
    for (let j = 0; j < colMax; j++) {
      if (rowData[j] !== ".") {
        matrix[i + 1][j + 1] = rowData[j] === "L" ? 0 : 1;
      }
    }
  }

  return matrix;
};

const numOccupied = (matrix, i, j) => {
  const surCoords = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  let count = 0;
  for (const coord of surCoords) {
    const mI = i + coord[0];
    const mJ = j + coord[1];
    count += matrix[mI][mJ];
  }
  return count;
};

const stablizingSeats = () => {
  let currMatrix = constructMatrix();
  let deStablized = true;
  const currRowMax = currMatrix.length;
  const currColMax = currMatrix[0].length;
  let seatCount = 0;
  while (deStablized) {
    deStablized = false;
    const tmpMatrix = Array.from({ length: currRowMax }, () =>
      Array(currColMax).fill(null)
    );
    seatCount = 0;
    for (let i = 0; i < currRowMax; i++) {
      for (let j = 0; j < currColMax; j++) {
        seatCount += currMatrix[i][j];
        if (currMatrix[i][j] === 1 && numOccupied(currMatrix, i, j) >= 4) {
          tmpMatrix[i][j] = 0;
          deStablized = true;
        } else if (currMatrix[i][j] === 0 && !numOccupied(currMatrix, i, j)) {
          tmpMatrix[i][j] = 1;
          deStablized = true;
        } else {
          tmpMatrix[i][j] = currMatrix[i][j];
        }
      }
    }
    currMatrix = tmpMatrix;
  }
  console.log(seatCount);
  return seatCount;
};

stablizingSeats();

const numOccupiedUpdated = (matrix, i, j) => {
  const surCoords = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  const currRowMax = matrix.length;
  const currColMax = matrix[0].length;
  let count = 0;
  for (const coord of surCoords) {
    const [dx, dy] = coord;
    let mI = dx + i;
    let mJ = dy + j;
    let inBound = mI >= 0 && mJ >= 0 && mI < currRowMax && mJ < currColMax;
    let seat = 0;
    while (inBound) {
      if (matrix[mI][mJ] !== null) {
        seat = matrix[mI][mJ];
        break;
      }
      mI += dx;
      mJ += dy;
      inBound = mI >= 0 && mJ >= 0 && mI < currRowMax && mJ < currColMax;
    }
    count += seat;
  }

  return count;
};

const stablizingSeats2 = () => {
  let currMatrix = constructMatrix();
  let deStablized = true;
  const currRowMax = currMatrix.length;
  const currColMax = currMatrix[0].length;
  let seatCount = 0;
  while (deStablized) {
    deStablized = false;
    const tmpMatrix = Array.from({ length: currRowMax }, () =>
      Array(currColMax).fill(null)
    );
    seatCount = 0;
    for (let i = 0; i < currRowMax; i++) {
      for (let j = 0; j < currColMax; j++) {
        seatCount += currMatrix[i][j];
        if (
          currMatrix[i][j] === 1 &&
          numOccupiedUpdated(currMatrix, i, j) >= 5
        ) {
          tmpMatrix[i][j] = 0;
          deStablized = true;
        } else if (
          currMatrix[i][j] === 0 &&
          !numOccupiedUpdated(currMatrix, i, j)
        ) {
          tmpMatrix[i][j] = 1;
          deStablized = true;
        } else {
          tmpMatrix[i][j] = currMatrix[i][j];
        }
      }
    }

    currMatrix = tmpMatrix;
  }

  console.log(seatCount);
  return seatCount;
};

stablizingSeats2();

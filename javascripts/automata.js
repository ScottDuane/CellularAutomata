

class Automata {
  constructor(tileType, speed, liveRule, deadRule) {
    this.cells = [];
    this.tileType = tileType;
    this.liveRule = liveRule;
    this.deadRule = deadRule;
    this.createCells();
    this.createInitialConditions();
  };

  createCells() {
    if (this.tileType === "square") {
      this.createSquares();
    } else if (this.tileType === "triangle") {
      this.createTriangles();
    } else {
      this.createHexagons();
    }
  };

  createSquares() {
    for (var i=0; i<100; i++) {
      this.cells.push([]);
      for (var j=0; j<100; j++) {
        let cell = new Cell("square", false);
        this.cells[i].push(cell);
      }
    }

    // for testing purposes
    this.cells[1][1].aliveState = true;
    this.cells[1][2].aliveState = true;
    this.cells[2][2].aliveState = true;
    this.cells[10][10].aliveState = true;
  };

  createTriangles() {
    for(var i=0; i<100; i++) {
      this.cells.push([]);
      for(var j=0; j<400; j++) {
        let cell = new Cell("triangle", false);
        this.cells[i].push(cell);
      }
    }

    this.cells[10][10].aliveState = true;

  };

  createHexagons() {
    for(let i=0; i<50; i++) {
      this.cells.push([]);
      for(let j=0; j<100; j++) {
        let cell = new Cell("hexagon", false);
        this.cells[i].push(cell);
      }
    }

    this.cells[5][5].aliveState = true;
    this.cells[5][7].aliveState = true;
    this.cells[7][4].aliveState = true;
    this.cells[7][8].aliveState = true;
    this.cells[9][3].aliveState = true;
    this.cells[9][5].aliveState = true;
    this.cells[9][7].aliveState = true;
    this.cells[9][9].aliveState = true;
    this.cells[11][5].aliveState = true;
    this.cells[11][7].aliveState = true;
  };

  setRules(ruleValue) {
    if (this.tileType === "triangle") {
      this.liveRule = ruleValue === "30" ? [100, 11, 10, 1] : [110, 100, 11, 1];
      this.deadRule = ruleValue === "30" ? [111, 110, 101, 0] : [111, 110, 10, 0];
    } else {
      let liveRule = ruleValue.split(",")[0].split(" ");
      let deadRule = ruleValue.split(",")[1].split(" ");

      this.liveRule = [];
      this.deadRule = [];
      let that = this;
      liveRule.forEach((el) => {
        that.liveRule.push(parseInt(el));
      });

      deadRule.forEach((el) => {
        that.deadRule.push(parseInt(el));
      });
    }
  };

  checkNeighbors(i, j) {
    switch(this.tileType) {
      case "square":
        return this.checkSquareNeighbors(i, j);
      case "hexagon":
        return this.checkHexagonalNeighbors(i, j);
      case "triangle":
        return this.checkTriangularNeighbors(i, j);
    };
  };

  checkSquareNeighbors(i, j) {
    let liveCount = 0;
    let directions = [[-1, -1], [-1, 0], [1, 0], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    let that = this;

    directions.forEach((vector) => {
      let checkX = i+vector[0];
      let checkY = j+vector[1];
      if ((checkX > -1 && checkY > -1) && (checkX < 100 && checkY < 100)) {
        if (that.cells[checkX][checkY].aliveState) {
          liveCount += 1;
        }
      }
    });

    if (this.cells[i][j].aliveState) {
      return this.liveRule.includes(liveCount);
    } else {
      return this.deadRule.includes(liveCount);
    }
  };

  checkHexagonalNeighbors(i, j) {
    let liveCount = 0;
    let directions = [[0, -1], [-1, 0], [0, 1], [1, 0]];

    if (i % 2 === 0) {
      directions.push([1, -1]);
      directions.push([1, 1]);
    } else {
      directions.push([-1, -1]);
      directions.push([-1, 1]);
    }

    let that = this;
    directions.forEach((vec) => {
      // debugger;
      if (that.inBounds(i + vec[0], j + vec[1]) && that.cells[i + vec[0]][j + vec[1]].aliveState) {
        liveCount += 1;
      }
    });

    if (this.cells[i][j].aliveState) {
      return this.liveRule.includes(liveCount);
    } else {
      return this.deadRule.includes(liveCount);
    }
  };

  inBounds(x, y) {
      return ((x > -1 && x < this.cells.length) && (y > -1 && y < this.cells[0].length));
  };

  checkTriangularNeighbors(i, j) {
    if (i === 0 || this.cells[i][j].aliveState) {
      return this.cells[i][j].aliveState;
    }

    let firstDigit = 0;
    let secondDigit = 0;
    let thirdDigit = 0;

    if (j > 0 && j < 199) {
      firstDigit = this.cells[i - 1][j - 1].aliveState ? 1 : 0;
      secondDigit = this.cells[i - 1][j].aliveState ? 1 : 0;
      thirdDigit = this.cells[i - 1][j + 1].aliveState ? 1 : 0;
    } else if (j === 0) {
      secondDigit = this.cells[i - 1][j].aliveState ? 1 : 0;
      thirdDigit = this.cells[i - 1][j + 1].aliveState ? 1 : 0;
    } else {
      firstDigit = this.cells[i - 1][j - 1].aliveState ? 1 : 0;
      secondDigit = this.cells[i - 1][j].aliveState ? 1 : 0;
    }
    let neighborCode = firstDigit*100 + secondDigit*10 + thirdDigit;
    // debugger;
    if (this.deadRule.includes(neighborCode)) {
      return false;
    } else {
      return true;
    }
  };

  resetAutomata() {
    this.createCells();
  };

  iterate() {
    let cellSetCopy = [];
    this.cells.forEach((row, i) => {
      cellSetCopy.push([]);
      row.forEach((el) => {
        let cellCopy = new Cell(el.shape, el.aliveState);
        cellSetCopy[i].push(cellCopy);
      });
    });

    for (let i=0; i<cellSetCopy.length; i++) {
        for(let j=0; j<cellSetCopy[0].length; j++) {
          cellSetCopy[i][j].aliveState = this.checkNeighbors(i, j);
        }
    }

    this.cells = cellSetCopy;
  };

  createInitialConditions() {
    this.pentadecathlon = [];
    this.pulsar = [];
    this.gliders = [];

    for (var i=0; i<100; i++) {
      this.pentadecathlon.push([]);
      this.pulsar.push([]);
      this.gliders.push([]);
    };

    let pentCoords = [[10, 5], [15, 5], [8, 6], [9, 6], [11, 6], [12, 6], [13, 6], [14, 6], [16, 6], [17, 6],
                      [10, 7], [15, 7]];

    let pulsarCoords = [[2, 0], [3, 0], [4, 0], [8, 0], [9, 0], [10, 0],
                        [0, 2], [5, 2], [7, 2], [12, 2],
                        [0, 3], [5, 3], [7, 3], [12, 3],
                        [0, 4], [5, 4], [7, 4], [12, 4],
                        [2, 5], [3, 5], [4, 5], [8, 5], [9, 5], [10, 5],
                        [2, 7], [3, 7], [4, 7], [8, 7], [9, 7], [10, 7],
                        [0, 8], [5, 8], [7, 8], [12, 8],
                        [0, 9], [5, 9], [7, 9], [12, 9],
                        [0, 10], [5, 10], [7, 10], [12, 10],
                        [2, 12], [3, 12], [4, 12], [8, 12], [9, 12], [10, 12]]
    let that = this;
    pentCoords.forEach((coord) => {
      that.pentadecathlon[coord[0]][coord[1]] = true;
    });


  };
};

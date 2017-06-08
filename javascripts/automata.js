

class Automata {
  constructor(tileType, rules, condition) {
    this.cells = [];
    this.tileType = tileType;
    this.setRules(rules);
    this.createCells();
    this.createPresets();
    this.initialCondition = condition;
    this.setInitialCondition(condition);
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
  };

  createTriangles() {
    for(var i=0; i<100; i++) {
      this.cells.push([]);
      for(var j=0; j<200; j++) {
        let cell = new Cell("triangle", false);
        this.cells[i].push(cell);
      }
    }

    this.cells[0][90].aliveState = true;
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
      this.deadRule = ruleValue === "30" ? [111, 110, 101, 0] : [111, 101, 10, 0];
      this.cells = [];
      this.createTriangles();
    } else {
      let deadRule = ruleValue.split(", ")[0].split(" ");
      let liveRule = ruleValue.split(", ")[1].split(" ");

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
    let liveCount = this.squareNeighborCount(i, j);
    if (this.cells[i][j].aliveState) {
      return this.liveRule.includes(liveCount);
    } else {
      return this.deadRule.includes(liveCount);
    }
  };

  squareNeighborCount(i, j) {
    let liveCount = 0;
    let directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
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

    return liveCount;
  }
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
    } else {
      let neighborCode = this.getTriangleNeighborCode(i, j);
      if (this.deadRule.includes(neighborCode)) {
        return false;
      } else {
        return true;
      }
    }
  };

  getTriangleNeighborCode(i, j) {
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

    return firstDigit*100 + secondDigit*10 + thirdDigit;
  };

  resetAutomata() {
    this.cells = [];
    this.createCells();
    this.setInitialCondition(this.initialCondition);
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

  createPresets() {
    this.pentCoords = [[2, 0], [7, 0],
                      [0, 1], [1, 1], [3, 1], [4, 1], [5, 1], [6, 1], [8, 1], [9, 1],
                      [2, 2], [7, 2]];

    this.pulsarCoords = [[2, 0], [3, 0], [4, 0], [8, 0], [9, 0], [10, 0],
                        [0, 2], [5, 2], [7, 2], [12, 2],
                        [0, 3], [5, 3], [7, 3], [12, 3],
                        [0, 4], [5, 4], [7, 4], [12, 4],
                        [2, 5], [3, 5], [4, 5], [8, 5], [9, 5], [10, 5],
                        [2, 7], [3, 7], [4, 7], [8, 7], [9, 7], [10, 7],
                        [0, 8], [5, 8], [7, 8], [12, 8],
                        [0, 9], [5, 9], [7, 9], [12, 9],
                        [0, 10], [5, 10], [7, 10], [12, 10],
                        [2, 12], [3, 12], [4, 12], [8, 12], [9, 12], [10, 12]];

     this.beaconCoords = [[0, 0], [1, 0],
                          [0, 1], [1, 1],
                          [2, 2], [3, 2],
                          [2, 3], [3, 3]];


     this.gliderCoords = [[0, 24],
                          [1, 22], [1, 24],
                          [2, 12], [2, 13], [2, 20], [2, 21], [2, 34], [2, 35],
                          [3, 11], [3, 15], [3, 20], [3, 21], [3, 34], [3, 35],
                          [4, 0], [4, 1], [4, 10], [4, 16], [4, 20], [4, 21],
                          [5, 0], [5, 1], [5, 10], [5, 14], [5, 16], [5, 17], [5, 22], [5, 24],
                          [6, 10], [6, 16], [6, 24],
                          [7, 11], [7, 15],
                          [8, 12], [8, 13]];
  };

  setInitialCondition(condition) {
    switch (condition) {
      case "pulsar":
        this.cells = [];
        this.createCells();
        this.initialCondition = "pulsar";
        this.pulsarCoords.forEach((coord) => {
          this.cells[coord[0]][coord[1]].aliveState = true;
        });
        break;
      case "beacon":
        this.cells = [];
        this.createCells();
        this.initialCondition = "beacon";
        this.beaconCoords.forEach((coord) => {
          this.cells[10 + coord[0]][10 + coord[1]].aliveState = true;
        });
        break;
      case "glider":
        this.cells = [];
        this.createCells();
        this.initialCondition = "glider";
        this.gliderCoords.forEach((coord) => {
          this.cells[10 + coord[0]][10 + coord[1]].aliveState = true;
        });
      case "random":
        this.cells = [];
        this.createCells();
        this.initialCondition = "random";
        this.cells.forEach((row) => {
          row.forEach((cell) => {
            let randomNum = Math.random();
            if (randomNum < .2) {
              cell.aliveState = true;
            } else {
              cell.aliveState = false;
            }
          })
        });
        break;

    };
  };

  getAliveCount () {
    let count = 0;
    this.cells.forEach((row) => {
      row.forEach((cell) => {
        if (cell.aliveState) {
          count += 1;
        }
      });
    });

    return count;
  }
};

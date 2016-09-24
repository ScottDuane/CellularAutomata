

class Automata {
  constructor(tileType, speed) {
    this.cells = [];
    this.tileType = tileType;
    this.speed = 100;
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
      for(var j=0; j<200; j++) {
        let cell = new Cell("triangle", false);
        this.cells[i].push(cell);
      }
    }

    this.cells[10][10].aliveState = true;

  };

  createHexagons() {

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
      if (liveCount < 2 || liveCount > 3) {
        return false;
      } else {
        return true;
      }
    } else {
      if (liveCount === 3) {
        return true;
      } else {
        return false;
      }
    }
  };

  checkHexagonalNeighbors() {

  };

  checkTriangularNeighbors(i, j) {
    if (i === 0) {
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
    let neigborCode = firstDigit*100 + secondDigit*10 + thirdDigit;
    // debugger;
    if ((neigborCode === 111 || neigborCode === 101) || (neigborCode === 10 || neigborCode === 0)) {
      return false;
    } else {
      return true;
    }
  };

// for testing purposes -- delete later
  printCells(cells) {
    cells.forEach( (row) => {
      let rowPrint = "";
      row.forEach( (el) => {
        let elPrint = el.aliveState ? "1" : "0";
        rowPrint += elPrint;
      });
      console.log(rowPrint);
    });
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
};



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
    let firstDigit = 0;
    let secondDigit = 0;
    let thirdDigit = 0;

    if (i > 0 && i < 99) {
      firstDigit = this.cells[i - 1][j] ? 1 : 0;
      secondDigit = this.cells[i][j] ? 1 : 0;
      thirdDigit = this.cells[i + 1][j] ? 1 : 0;
    } else if (i === 0) {
      secondDigit = this.cells[i][j] ? 1 : 0;
      thirdDigit = this.cells[i + 1][j] ? 1 : 0;
    } else {
      firstDigit = this.cells[i - 1][j] ? 1 : 0;
      secondDigit = this.cells[i][j] ? 1 : 0;
    }
    let neigborCode = firstDigit*100 + secondDigit*10 + thirdDigit;
    if ((neigborCode === 111 || neigborCode === 101) || (neigborCode === 10 || neigborCode === 1)) {
      return false;
    } else {
      return true;
    }
  };

  iterate() {
    debugger;
    let cellSetCopy = [];
    this.cells.forEach((row, i) => {
      cellSetCopy.push([]);
      row.forEach((el) => {
        cellSetCopy[i].push(el);
      });
    });

    cellSetCopy.forEach((row, i) => {
       row.forEach((el, j) => {
         if (this.checkNeighbors(i, j)) {
           el.aliveState = true;
         } else {
           el.aliveState = false;
         }
       });
     });

     this.cells = cellSetCopy;
  };
};

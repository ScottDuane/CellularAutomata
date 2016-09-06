class Automata {
  constructor(tileType, speed, x, y, dimX, dimY, game) {
    let posX = 0;
    let posY = 0;
    let this.cellSet = [];
    this.game = game;
    this.tileType = tileType;

    for (var i=0; i<x; i++) {
      this.cellSet.push([]);
      for (var j=0; j<y; j++) {
        let cell = Cell.new(dimX, dimY, posX, posY);
        this.cellSet[i].push(cell);
        posY += dimY;
      }
      posY = 0;
      posX += dimX;
    }
  };

  start() {
    let that = this;
    let this.gameInterval = window.setInterval(speed, () => {
      that.iterate();
      that.game.render();
    });
  };

  stop() {
    window.clearInterval(this.gameInterval);
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
    directions.forEach((vector) => {
      if (this.cellSet[vector[0]][vector[1]].aliveState) {
        liveCount += 1;
      }
    });

    if (this.cellSet[i][j].aliveState) {
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

  checkTriangularNeighbors() {

  };
  
  iterate() {
    let cellSetCopy = [];
    cellSet.forEach((row, i) => {
      cellSetCopy.push([]);
      row.forEach((el) => {
        cellSetCopy[i].push(el);
      });
    });

    cellSetCopy.forEach((row, i) => {
       row.forEach((el, j) {
         if (this.checkNeighbors(i, j)) {
           el.setAliveState(true);
         } else {
           el.setAliveState(false);
         }
       });
     });

     this.cellSet = cellSetCopy;
  };
}

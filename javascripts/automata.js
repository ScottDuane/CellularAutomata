class Automata {
  constructor(tileType, speed, x, y, dimX, dimY, game) {
    let posX = 0;
    let posY = 0;
    let cellSet = [];
    this.game = game;
    this.tileType = tileType;

    for (var i=0; i<x; i++) {
      cellSet.push([]);
      for (var j=0; j<y; j++) {
        let cell = Cell.new(dimX, dimY, posX, posY);
        cellSet[i].push(cell);
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
       })
     })
  }
}

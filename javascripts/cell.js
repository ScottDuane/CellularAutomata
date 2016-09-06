class Cell {
  constructor(shape, posX, posY, aliveState) {
    this.aliveState = aliveState;
    this.shape = shape;
  };

  setAliveState() {
    this.aliveState = !this.aliveState;
  };
};

export default Cell;
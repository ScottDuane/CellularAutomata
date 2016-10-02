class Cell {
  constructor(shape, aliveState) {
    this.aliveState = aliveState;
    this.shape = shape;
  };

  toggleAliveState() {
    this.aliveState = !this.aliveState;
  };
};

class Cell {
  constructor(shape, aliveState) {
    this.aliveState = aliveState;
    this.shape = shape;
  };

  toggleAliveState(callback) {
    this.aliveState = !this.aliveState;
    if (callback) {
      // debugger;
      callback.call();
    }
  };
};

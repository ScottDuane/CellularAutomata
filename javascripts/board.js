
class Board {
  constructor = (tileType, ctx) => {
    if (tileType === "square") {
      this.createSquares();
    } else if (tileType === "hex") {
      this.createHexagons();
    } else if (tileType === "triangle") {
      this.createTriangles();
    }

    this.ctx = ctx;
  };

  createSquares = () => {

  };

  createTriangles = () => {

  };

  createHexagons = () => {

  };

  render = () => {

  }
}

export default Board;

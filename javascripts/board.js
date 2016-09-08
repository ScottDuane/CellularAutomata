import easeljs from 'easeljs-loader';
import Automata from './automata';
import Cell from './cell';

class Board {
  constructor(tileType, ctx) {
    this.ctx = ctx;
    this.stage = new easeljs.Stage('canvas-el');
    this.graphics = new easeljs.Graphics();

    this.cells = [];
    if (tileType === "square") {
      this.createSquares();
    } else if (tileType === "hexagon") {
      this.createHexagons();
    } else if (tileType === "triangle") {
      this.createTriangles();
    }
  };

  createSquares() {
    let square = new easeljs.Shape(this.graphics);
    this.graphics.setStrokeStyle(8)
    this.graphics.beginStroke("#F0F")
    this.graphics.beginRadialGradientFill(["#FF0","#00F"],[0,1],100,200,0,100,200,40)
    this.graphics.drawCircle(100,200,40);
  };

  createTriangles() {

  };

  createHexagons() {

  };

  render() {
    // where most of the easel stuff comes in
  };
}

export default Board;

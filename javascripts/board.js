import createjs from 'node-easel';
import Automata from './automata';
import Cell from './cell';

class Board {
  constructor = (tileType, ctx) => {
    this.ctx = ctx;
    this.stage = new createjs.Stage('canvas-el');
    this.graphics = new createjs.Graphics();

    this.cells = [];
    if (tileType === "square") {
      this.createSquares();
    } else if (tileType === "hexagon") {
      this.createHexagons();
    } else if (tileType === "triangle") {
      this.createTriangles();
    }
  };

  createSquares = () => {
    let square = new createjs.Shape(this.graphics);
    this.graphics.setStrokeStyle(8)
    this.graphics.beginStroke("#F0F")
    this.graphics.beginRadialGradientFill(["#FF0","#00F"],[0,1],100,200,0,100,200,40)
    this.graphics.drawCircle(100,200,40);
  };

  createTriangles = () => {

  };

  createHexagons = () => {

  };

  render = () => {
    // where most of the easel stuff comes in
  }
}

export default Board;

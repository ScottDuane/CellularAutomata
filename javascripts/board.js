import createjs from 'node-easel';
import Automata from './automata';
import Cell from './cell';

class Board {
  constructor = (tileType, ctx) => {
    this.ctx = ctx;
    this.stage = new createjs.Stage('canvas-el');
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
    let g = new createjs.Graphics();
    let square = new createjs.Shape(g);
    g.setStrokeStyle(8)
    g.beginStroke("#F0F")
    g.beginRadialGradientFill(["#FF0","#00F"],[0,1],100,200,0,100,200,40)
    g.drawCircle(100,200,40);
  };

  createTriangles = () => {

  };

  createHexagons = () => {

  };

  render = () => {

  }
}

export default Board;

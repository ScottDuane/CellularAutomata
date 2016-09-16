

class Board {
  constructor(tileType, ctx) {
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

  createSquares() {
    debugger;
    let circle = new createjs.Shape(this.graphics);
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
    circle.x = 100;
    circle.y = 66;
    this.stage.addChild(circle);
    this.stage.update();
  };

  createTriangles() {

  };

  createHexagons() {

  };

  render() {
    // where most of the easel stuff comes in
  };
}

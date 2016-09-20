

class Board {
  constructor(tileType, ctx, automata) {
    this.DIM_X = 500;
    this.DIM_Y = 500;
    this.cells = automata.cells;
    this.ctx = ctx;
    this.automata = automata;
    this.stage = new createjs.Stage('canvas-el');
    this.graphics = new createjs.Graphics();
    this.tileType = tileType;
    if (this.tileType === "square") {
      this.renderSquares();
    } else if (tileType === "hexagon") {
      this.renderHexagons();
    } else if (tileType === "triangle") {
      this.renderTriangles();
    }
  };

  renderSquares() {
    let dx = this.DIM_X/100;
    let pos_x = 0;
    let pos_y = 0;
    // let square = new createjs.Rectangle(0, 0, 10, 10);
    //debugger;
    for(var i=0; i<100; i++) {
      pos_x = 0;
      for(var j=0; j<100; j++) {
        let color = "";
        if(this.cells[i][j].aliveState) {
          color = "#ff0000";
        } else {
          color = "#00ff00";
        }
        let graphics = new createjs.Graphics().beginFill(color).drawRect(pos_x, pos_y, pos_x + dx, pos_y + dx);
        let square = new createjs.Shape(graphics);
        this.stage.addChild(square);
        pos_x += dx;
      }

      pos_y += dx;
    }

    this.stage.update();
  };

  renderTriangles() {

  };

  renderHexagons() {

  };

  startGame() {
    let that = this;

    window.setInterval(function() {
      that.automata.iterate();
      that.render();
    }, this.speed);
    // debugger;
  };

  stopGame() {
    window.clearInterval(this.automataInterval);
  };

  render() {
    if (this.tileType === "square") {
      this.renderSquares();
    } else if (this.tileType === "hexagon") {
      this.renderHexagons();
    } else if (this.tileType === "triangle") {
      this.renderTriangles();
    }
    // where most of the easel stuff comes in
  };
}

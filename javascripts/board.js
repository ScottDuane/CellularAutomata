

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
    debugger;
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
    let sideLength = this.DIM_X/100;
    let pos_x = 0;
    let pos_y = 0;
    // let pos_y = sideLength/Math.sqrt(2);
    // let graphics = new createjs.Graphics();
    // let tri = new createjs.Shape(graphics);
    // tri.graphics.beginStroke('#ff0000').setStrokeStyle(75).moveTo(1,1).lineTo(2,2).lineTo(2,1).lineTo(1,1).closePath();
    //
    // this.stage.addChild(tri);
    // this.stage.update();
    let graphics = new createjs.Graphics();
    for(var i=0; i<100; i++) {
      for(var j=0; j<100; j++) {
        // let color = "";
        // if(this.cells[i][j].aliveState) {
        //   color = "#0000ff";
        // } else {
        //   color = "#fff000";
        // }

        let triangle = new createjs.Shape(graphics);
        triangle.graphics.beginStroke('#0da4d3').setStrokeStyle(75);
        triangle.graphics.moveTo(i, j).lineTo(i + 1, j+1).lineTo(i, j+1).lineTo(i, j).closePath();
        // .moveTo(pos_x, pos_y).lineTo(pos_x + sideLength/2, pos_y - sideLength/Math.sqrt(2)).lineTo(pos_x + sideLength, pos_y).lineTo(pos_x, pos_y).closePath();
        // pos_x += sideLength;

        this.stage.addChild(triangle);
      }

      pos_y += sideLength/Math.sqrt(2);
    }
    this.stage.update();
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
  };
}

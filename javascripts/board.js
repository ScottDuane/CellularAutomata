

class Board {
  constructor(tileType, ctx, automata) {
    this.DIM_X = 500;
    this.DIM_Y = 500;
    this.ctx = ctx;
    this.automata = automata;
    this.stage = new createjs.Stage(this.ctx);
    this.graphics = new createjs.Graphics();
    this.tileType = tileType;
    this.stopButton = document.getElementById("stop-button");
    this.resetButton = document.getElementById("reset-button");
    this.startButton = document.getElementById("start-button");
    this.stepButton = document.getElementById("step-button");
    let that = this;
    this.stopButton.addEventListener("click", () => {
      that.stopGame();
    });

    this.startButton.addEventListener("click", () => {
      that.startGame();
    });

    this.resetButton.addEventListener("click", () => {
      that.resetGame();
    });

    this.stepButton.addEventListener("click", () => {
      that.stepGame();
    });

    if (this.tileType === "square") {
      this.renderSquares();
    } else if (tileType === "hexagon") {
      this.renderHexagons();
    } else if (tileType === "triangle") {
      this.renderTriangles();
    }
  };

  renderSquares() {
    this.stage.removeAllChildren();
    let dx = this.DIM_X/100;
    let pos_x = 0;
    let pos_y = 0;

    for(var i=0; i<100; i++) {
      pos_x = 0;
      for(var j=0; j<100; j++) {
        let color = "";
        if(this.automata.cells[i][j].aliveState) {
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
    this.stage.removeAllChildren();
    let sideLength = this.DIM_X/100;
    let radius = (sideLength*Math.sqrt(3))/3;
    let pos_x_upper = sideLength/2;
    let pos_y_upper = (sideLength*Math.sqrt(3))/3;

    let pos_x_lower = pos_x_upper + sideLength/2;
    let pos_y_lower = (sideLength*Math.sqrt(3))/6;

    for(var i=0; i<100; i++) {
      for(var j=0; j<200; j+=2) {
        let lower_color = "";
        let upper_color = "";
        if(this.automata.cells[i][j].aliveState) {
          lower_color = "#0000ff";
        } else {
          lower_color = "#fff000";
        }

        if(this.automata.cells[i][j+1].aliveState) {
          upper_color = "#0000ff";
        } else {
          upper_color = "#fff000";
        }

        let graphics_upper = new createjs.Graphics().beginFill(lower_color).drawPolyStar(pos_x_upper, pos_y_upper, radius, 3, 0, -90);
        let triangle_upper = new createjs.Shape(graphics_upper);
        this.stage.addChild(triangle_upper);

        let graphics_lower = new createjs.Graphics().beginFill(upper_color).drawPolyStar(pos_x_lower, pos_y_lower, radius, 3, 0, 90);
        let triangle_lower = new createjs.Shape(graphics_lower);
        this.stage.addChild(triangle_lower);
        pos_x_lower += sideLength;
        pos_x_upper += sideLength;
      }
      pos_x_upper = sideLength/2;
      pos_x_lower = pos_x_upper + sideLength/2;
      pos_y_lower += sideLength;
      pos_y_upper += sideLength;
    }
    this.stage.update();
  };


  renderHexagons() {
    this.stage.removeAllChildren();
    let sideLength = 10;
    let top_x_pos = 0;
    let top_y_pos = 0;
    let bottom_x_pos = 1.5*sideLength;
    let bottom_y_pos = sideLength;
    for(let i=0; i<50; i++){
      for(let j=0; j<50; j++) {
        let topColor = this.automata.cells[i][2*j].aliveState ? "#00f0ff" : "#aaaaaa";
        let bottomColor = this.automata.cells[i][2*j + 1].aliveState ? "#00f0ff" : "#aaaaaa";

        let topGraphics = new createjs.Graphics().beginFill(topColor).drawPolyStar(top_x_pos, top_y_pos, sideLength, 6, 0, 0);
        let topHexagon = new createjs.Shape(topGraphics);
        let bottomGraphics = new createjs.Graphics().beginFill(bottomColor).drawPolyStar(bottom_x_pos, bottom_y_pos, sideLength, 6, 0, 0);
        let bottomHexagon = new createjs.Shape(bottomGraphics);

        this.stage.addChild(topHexagon);
        this.stage.addChild(bottomHexagon);
        bottom_x_pos += 3*sideLength;
        top_x_pos += 3*sideLength;
      }
      top_x_pos = 0;
      bottom_x_pos = 1.5*sideLength;
      top_y_pos += 2*sideLength;
      bottom_y_pos += 2*sideLength;
    }
    this.stage.update();
  };

  startGame() {
    let that = this;

    this.automataInterval = window.setInterval(function() {
      that.automata.iterate();
      that.render();
    }, this.speed);
    // debugger;
  };

  stopGame() {
    window.clearInterval(this.automataInterval);
  };

  stepGame() {
    this.stopGame();
    this.automata.iterate();
    this.render();
  };

  resetGame() {
    window.clearInterval(this.automataInterval);
    this.automata.resetAutomata();
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

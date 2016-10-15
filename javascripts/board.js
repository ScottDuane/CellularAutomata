

class Board {
  constructor(tileType, ctx, automata, colorIndex = 0) {
    this.ALIVE_COLORS = ["#9343fb", "#23ad34", "#ffffff"];
    this.DEAD_COLORS = ["#1a98fc", "yellow", "#000000"];
    this.DIM_X = 500;
    this.DIM_Y = 500;
    // this.cellHeight = cellHeight;
    this.ctx = ctx;
    this.automata = automata;
    this.stage = new createjs.Stage(this.ctx);
    this.graphics = new createjs.Graphics();
    this.tileType = tileType;

    this.stopButton = document.getElementById("stop-button");
    this.resetButton = document.getElementById("reset-button");
    this.startButton = document.getElementById("start-button");
    this.stepButton = document.getElementById("step-button");
    this.aboutButton = document.getElementById("about-button");
    this.aboutModal = document.getElementsByClassName("about-modal")[0];
    this.aboutModalWrapper = document.getElementsByClassName("modal-wrapper")[0];
    this.squareButton = document.getElementById("square-button");
    this.hexagonButton = document.getElementById("hexagon-button");
    this.triangleButton = document.getElementById("triangle-button");
    this.colorButtons = document.getElementsByClassName("color-choice");
    this.speedSlider = document.getElementById("speed-slider");
    this.squareRules = document.getElementById("square-control");
    this.triangleRules = document.getElementById("triangle-control");
    this.hexagonRules = document.getElementById("hexagon-control");

    this.speed = Math.floor(8000/parseInt(this.speedSlider.value));
    this.aboutModalDisplay = false;
    this.running = false;

    this.setColor(colorIndex);
    this.setCellHeight();
    this.bindClickHandlers();

    if (this.tileType === "square") {
      this.renderSquares();
      this.automata.setRules(this.squareRules.value);
    } else if (this.tileType === "hexagon") {
      this.renderHexagons();
      this.automata.setRules(this.hexagonRules.value);
    } else if (this.tileType === "triangle") {
      this.renderTriangles();
      this.automata.setRules(this.triangleRules.value);
    }
  };

  bindClickHandlers() {
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
      that.stepGame()
    });

    this.aboutButton.addEventListener("click", () => {
      that.toggleAboutModal();
    });

    this.ctx.addEventListener("click", (e) => {
      that.handleCellClick(e);
    });

    this.aboutModalWrapper.addEventListener("click", () => {
      that.toggleAboutModal();
    });

    this.squareButton.addEventListener("click", () => {
      that.toggleShapeType("square", that.squareButton);
    });

    this.hexagonButton.addEventListener("click", () => {
      that.toggleShapeType("hexagon", that.hexagonButton);
    });

    this.triangleButton.addEventListener("click", () => {
      that.toggleShapeType("triangle", that.triangleButton);
    });

    this.speedSlider.addEventListener("change", (e) => {
      that.setSpeed(e.target.value);
    });

    this.squareRules.addEventListener("change", (e) => {
      that.automata.setRules(e.target.value);
    });

    this.hexagonRules.addEventListener("change", (e) => {
      that.automata.setRules(e.target.value);
    });

    this.triangleRules.addEventListener("change", (e) => {
      that.automata.setRules(e.target.value);
    });

    for (let i=0; i<3; i++) {
      this.colorButtons[i].addEventListener("click", () => {
        that.setColor(i);
      });
    }
  };

  setSpeed(speedValue) {
    this.speed = Math.floor(8000/parseInt(speedValue));
    window.clearInterval(this.automataInterval);
    this.running = false;
    this.startGame();
  };

  setColor(colorIndex) {
    this.aliveColor = this.ALIVE_COLORS[colorIndex];
    this.deadColor = this.DEAD_COLORS[colorIndex];

    for (let i=0; i<3; i++) {
      if (i === colorIndex) {
        this.colorButtons[i].classList.add("active-color-button");
      } else {
        this.colorButtons[i].classList.remove("active-color-button");
      }
    };

  };

  setCellHeight() {
    // change probably in the future -- this is dumb
    if (this.tileType === "square") {
      this.cellHeight = this.DIM_X/100;
    } else if (this.tileType === "triangle") {
      this.cellHeight = this.DIM_X/50;
    } else {
      this.cellHeight = this.DIM_X/100;
    }
  };

  toggleShapeType(newType, shapeButton) {
    if (newType !== this.tileType) {
      this.automata = new Automata(newType, this.speed);
      this.tileType = newType;
      [this.squareButton, this.triangleButton, this.hexagonButton].forEach((button) => {
        if (button === shapeButton) {
          button.classList.add("active-shape-button");
        } else {
          button.classList.remove("active-shape-button");
        }
      });

      switch(this.tileType) {
        case "square":
          this.squareRules.classList.remove("invisible");
          this.hexagonRules.classList.add("invisible");
          this.triangleRules.classList.add("invisible");
          return this.automata.setRules(this.squareRules.value);
        case "hexagon":
          this.squareRules.classList.add("invisible");
          this.triangleRules.classList.add("invisible");
          this.hexagonRules.classList.remove("invisible");
          return this.automata.setRules(this.hexagonRules.value);
        case "triangle":
          this.squareRules.classList.add("invisible");
          this.hexagonRules.classList.add("invisible");
          this.triangleRules.classList.remove("invisible");
          return this.automata.setRules(this.triangleRules.value);
      };
      this.startGame();
    }
  };

  toggleAboutModal() {
    if (this.aboutModalDisplay) {
      this.aboutModalDisplay = false;
      this.aboutModal.classList.add("invisible");

    } else {
      this.aboutModalDisplay = true;
      this.aboutModal.classList.remove("invisible");
    }
  };

  renderSquares() {
    this.stage.removeAllChildren();
    let dx = 2*this.cellHeight;
    let pos_x = 0;
    let pos_y = 0;

    for(var i=0; i<100; i++) {
      pos_x = 0;
      for(var j=0; j<100; j++) {
        let color = this.automata.cells[i][j].aliveState ? this.aliveColor : this.deadColor;

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
    let sideLength = 2*this.cellHeight;
    let radius = (sideLength*Math.sqrt(3))/3;
    let pos_x_upper = sideLength/2;
    let pos_y_upper = (sideLength*Math.sqrt(3))/3;

    let pos_x_lower = pos_x_upper + sideLength/2;
    let pos_y_lower = (sideLength*Math.sqrt(3))/6;

    for(var i=0; i<100; i++) {
      for(var j=0; j<200; j+=2) {
        let lower_color = this.automata.cells[i][j].aliveState ? this.aliveColor : this.deadColor;
        let upper_color = this.automata.cells[i][j+1].aliveState ? this.aliveColor : this.deadColor;

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
    let sideLength = 2*this.cellHeight;
    let top_x_pos = 0;
    let top_y_pos = 0;
    let bottom_x_pos = 1.5*sideLength;
    let bottom_y_pos = sideLength;
    for(let i=0; i<50; i++){
      for(let j=0; j<50; j++) {
        let topColor = this.automata.cells[i][2*j].aliveState ? this.aliveColor : this.deadColor;
        let bottomColor = this.automata.cells[i][2*j + 1].aliveState ? this.aliveColor : this.deadColor;

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
    if (!this.running) {
      let that = this;
      this.running = true;
      this.automataInterval = window.setInterval(function() {
        that.automata.iterate();
        that.render();
      }, this.speed);
    }
  };

  stopGame() {
    window.clearInterval(this.automataInterval);
    this.running = false;
  };

  stepGame() {
    this.stopGame();
    this.automata.iterate();
    this.render();
  };

  resetGame() {
    window.clearInterval(this.automataInterval);
    this.running = false;
    this.automata.resetAutomata();
  };

  handleCellClick(e) {
    let col = 0;
    let row = 0;
    if (this.tileType === "square") {
      col = Math.floor(e.offsetX/this.cellHeight);
      row = Math.floor(e.offsetY/this.cellHeight);
    } else if (this.tileType === "triangle") {
      col = Math.floor(2*e.offsetX/this.cellHeight);
      row = Math.floor(e.offsetY/this.cellHeight);
    }
    this.automata.cells[row][col].toggleAliveState(this.render.bind(this));
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

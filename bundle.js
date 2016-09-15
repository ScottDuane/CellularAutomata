/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _automata = __webpack_require__(1);
	
	var _automata2 = _interopRequireDefault(_automata);
	
	var _board = __webpack_require__(3);
	
	var _board2 = _interopRequireDefault(_board);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener('DOMContentLoaded', function () {
	  var ctx = document.getElementById('canvas-el');
	  var board = new _board2.default('square', ctx);
	  var automataGame = new _automata2.default('square', 1000, 10, 10, 100, 100, board);
	  automataGame.start();
	});
	
	// hey doofus, don't forget you need babel, that's why you're getting errors you doofus

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _cell = __webpack_require__(2);
	
	var _cell2 = _interopRequireDefault(_cell);
	
	var _board = __webpack_require__(3);
	
	var _board2 = _interopRequireDefault(_board);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Automata = function () {
	  function Automata(tileType, speed, x, y, dimX, dimY, game) {
	    _classCallCheck(this, Automata);
	
	    var posX = 0;
	    var posY = 0;
	    this.cellSet = [];
	    this.game = game;
	    this.tileType = tileType;
	
	    for (var i = 0; i < x; i++) {
	      this.cellSet.push([]);
	      for (var j = 0; j < y; j++) {
	        var cell = _cell2.default.new(dimX, dimY, posX, posY);
	        this.cellSet[i].push(cell);
	        posY += dimY;
	      }
	      posY = 0;
	      posX += dimX;
	    }
	  }
	
	  _createClass(Automata, [{
	    key: 'start',
	    value: function start() {
	      var that = this;
	      this.gameInterval = window.setInterval(speed, function () {
	        that.iterate();
	        that.game.render();
	      });
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      window.clearInterval(this.gameInterval);
	    }
	  }, {
	    key: 'checkNeighbors',
	    value: function checkNeighbors(i, j) {
	      switch (this.tileType) {
	        case "square":
	          return this.checkSquareNeighbors(i, j);
	        case "hexagon":
	          return this.checkHexagonalNeighbors(i, j);
	        case "triangle":
	          return this.checkTriangularNeighbors(i, j);
	      };
	    }
	  }, {
	    key: 'checkSquareNeighbors',
	    value: function checkSquareNeighbors(i, j) {
	      var _this = this;
	
	      var liveCount = 0;
	      var directions = [[-1, -1], [-1, 0], [1, 0], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
	      directions.forEach(function (vector) {
	        if (_this.cellSet[vector[0]][vector[1]].aliveState) {
	          liveCount += 1;
	        }
	      });
	
	      if (this.cellSet[i][j].aliveState) {
	        if (liveCount < 2 || liveCount > 3) {
	          return false;
	        } else {
	          return true;
	        }
	      } else {
	        if (liveCount === 3) {
	          return true;
	        } else {
	          return false;
	        }
	      }
	    }
	  }, {
	    key: 'checkHexagonalNeighbors',
	    value: function checkHexagonalNeighbors() {}
	  }, {
	    key: 'checkTriangularNeighbors',
	    value: function checkTriangularNeighbors() {}
	  }, {
	    key: 'iterate',
	    value: function iterate() {
	      var _this2 = this;
	
	      var cellSetCopy = [];
	      cellSet.forEach(function (row, i) {
	        cellSetCopy.push([]);
	        row.forEach(function (el) {
	          cellSetCopy[i].push(el);
	        });
	      });
	
	      cellSetCopy.forEach(function (row, i) {
	        row.forEach(function (el, j) {
	          if (_this2.checkNeighbors(i, j)) {
	            el.setAliveState(true);
	          } else {
	            el.setAliveState(false);
	          }
	        });
	      });
	
	      this.cellSet = cellSetCopy;
	    }
	  }]);
	
	  return Automata;
	}();
	
	;
	
	exports.default = Automata;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Cell = function () {
	  function Cell(shape, posX, posY, aliveState) {
	    _classCallCheck(this, Cell);
	
	    this.aliveState = aliveState;
	    this.shape = shape;
	  }
	
	  _createClass(Cell, [{
	    key: "setAliveState",
	    value: function setAliveState() {
	      this.aliveState = !this.aliveState;
	    }
	  }]);
	
	  return Cell;
	}();
	
	;
	
	exports.default = Cell;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _nodeEasel = __webpack_require__(10);
	
	var _nodeEasel2 = _interopRequireDefault(_nodeEasel);
	
	var _canvas = __webpack_require__(81);
	
	var _canvas2 = _interopRequireDefault(_canvas);
	
	var _automata = __webpack_require__(1);
	
	var _automata2 = _interopRequireDefault(_automata);
	
	var _cell = __webpack_require__(2);
	
	var _cell2 = _interopRequireDefault(_cell);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Board = function () {
	  function Board(tileType, ctx) {
	    _classCallCheck(this, Board);
	
	    var eas = _nodeEasel2.default;
	    debugger;
	    console.log(_nodeEasel2.default);
	    console.log(easeljs.Stage);
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
	  }
	
	  _createClass(Board, [{
	    key: 'createSquares',
	    value: function createSquares() {
	      var square = new easeljs.Shape(this.graphics);
	      this.graphics.setStrokeStyle(8);
	      this.graphics.beginStroke("#F0F");
	      this.graphics.beginRadialGradientFill(["#FF0", "#00F"], [0, 1], 100, 200, 0, 100, 200, 40);
	      this.graphics.drawCircle(100, 200, 40);
	    }
	  }, {
	    key: 'createTriangles',
	    value: function createTriangles() {}
	  }, {
	    key: 'createHexagons',
	    value: function createHexagons() {}
	  }, {
	    key: 'render',
	    value: function render() {
	      // where most of the easel stuff comes in
	    }
	  }]);
	
	  return Board;
	}();
	
	exports.default = Board;

/***/ },
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports) {



/***/ },
/* 7 */,
/* 8 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 9 */,
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright (c) 2013 Wes Gorgichuk
	 *
	 * Permission is hereby granted, free of charge, to any person
	 * obtaining a copy of this software and associated documentation
	 * files (the "Software"), to deal in the Software without
	 * restriction, including without limitation the rights to use,
	 * copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the
	 * Software is furnished to do so, subject to the following
	 * conditions:
	 *
	 * The above copyright notice and this permission notice shall be
	 * included in all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	 * OTHER DEALINGS IN THE SOFTWARE.
	 */
	var Canvas = __webpack_require__(11);
	var Image = Canvas.Image;
	
	/**
	 * Surpress addEventListener errors on easel.
	 * Its currently only used for MouseEvent, so its not needed on the server.
	 *
	 */
	Canvas.prototype.addEventListener = function () { };
	
	/**
	 * Inject a window object
	 *
	 * @type {Object}
	 */
	window = { addEventListener:function () { } };
	
	/**
	 * node-canvas doesn't support cloneNode();
	 * So create our own.
	 *
	 * @return {Canvas}
	 */
	Canvas.prototype.cloneNode = function () {
		var c = new Canvas(this.width, this.height);
		c.type = this.type;
	
		return c;
	};
	
	// Easel uses instanceof HTMLCanvasElement, so change it to Canvas.
	HTMLCanvasElement = Canvas;
	
	// Create our global createjs namespace.
	createjs = {
		_snapToPixelEnabled:true,
	
		createCanvas:function () {
			return new Canvas();
		},
	
		createImage:function () {
			return new Image();
		}
	};
	
	var classes = [
		// Shared
		'createjs/events/EventDispatcher',
		'createjs/events/Event',
		'createjs/utils/IndexOf',
	
		// TweenJS code (used by MovieClip)
		'tweenjs/CSSPlugin',
		'tweenjs/Ease',
		'tweenjs/MotionGuidePlugin',
		'tweenjs/Timeline',
		'tweenjs/Tween',
		'tweenjs/version',
	
		// EaselJS code
		'easeljs/utils/UID',
		'easeljs/utils/SpriteSheetBuilder',
		'easeljs/utils/SpriteSheetUtils',
		'easeljs/utils/Ticker',
		'easeljs/events/MouseEvent',
		'easeljs/geom/Matrix2D',
		'easeljs/geom/Rectangle',
		'easeljs/geom/Point',
		'easeljs/display/DisplayObject',
		'easeljs/display/Container',
		'easeljs/display/Stage',
		'easeljs/display/Shadow',
		'easeljs/display/Shape',
		'easeljs/display/SpriteSheet',
		'easeljs/display/Sprite',
		'easeljs/display/Text',
		'easeljs/display/Bitmap',
		'easeljs/display/BitmapText',
		'easeljs/display/BitmapAnimation',
		'easeljs/display/Graphics',
		'easeljs/display/MovieClip',
		'easeljs/filters/Filter',
		'easeljs/filters/AlphaMapFilter',
		'easeljs/filters/AlphaMaskFilter',
		'easeljs/filters/BlurFilter',
		'easeljs/filters/ColorFilter',
		'easeljs/filters/ColorMatrix',
		'easeljs/filters/ColorMatrixFilter',
		'easeljs/version',
		'easeljs/version_movieclip'
	];
	
	for (var i = 0; i < classes.length; i++) {
		var path = classes[i];
		var name = path.split('/').pop();
		__webpack_require__(41)("./" + path + '.js')[name];
	};
	
	/**
	 * Inject custom functionality that is only required on the server.
	 * So we can keep the same EaselJS source desktop / server.
	 *
	 */
	
	/**
	 * Inject a halt method for Ticker.
	 * Clears the Ticker's Timeout, and stops all animation.
	 * Should only be called when your ready to stop the node instance.
	 *
	 */
	createjs.Ticker.halt = function() {
		if (createjs.Ticker.timeoutID !== null) {
			clearTimeout(createjs.Ticker.timeoutID);
		}
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';
	
	/*!
	 * Canvas
	 * Copyright (c) 2010 LearnBoost <tj@learnboost.com>
	 * MIT Licensed
	 */
	
	/**
	 * Module dependencies.
	 */
	
	var canvas = __webpack_require__(16)
	  , Canvas = canvas.Canvas
	  , Image = canvas.Image
	  , cairoVersion = canvas.cairoVersion
	  , Context2d = __webpack_require__(17)
	  , PNGStream = __webpack_require__(18)
	  , PDFStream = __webpack_require__(37)
	  , JPEGStream = __webpack_require__(38)
	  , FontFace = canvas.FontFace
	  , fs = __webpack_require__(6)
	  , packageJson = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../package.json\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	  , FORMATS = ['image/png', 'image/jpeg'];
	
	/**
	 * Export `Canvas` as the module.
	 */
	
	var Canvas = exports = module.exports = Canvas;
	
	/**
	 * Library version.
	 */
	
	exports.version = packageJson.version;
	
	/**
	 * Cairo version.
	 */
	
	exports.cairoVersion = cairoVersion;
	
	/**
	 * jpeglib version.
	 */
	
	if (canvas.jpegVersion) {
	  exports.jpegVersion = canvas.jpegVersion;
	}
	
	/**
	 * gif_lib version.
	 */
	
	if (canvas.gifVersion) {
	  exports.gifVersion = canvas.gifVersion.replace(/[^.\d]/g, '');
	}
	
	/**
	 * freetype version.
	 */
	
	if (canvas.freetypeVersion) {
	  exports.freetypeVersion = canvas.freetypeVersion;
	}
	
	/**
	 * Expose constructors.
	 */
	
	exports.Context2d = Context2d;
	exports.PNGStream = PNGStream;
	exports.PDFStream = PDFStream;
	exports.JPEGStream = JPEGStream;
	exports.Image = Image;
	exports.ImageData = canvas.ImageData;
	
	if (FontFace) {
	  var Font = function Font(name, path, idx) {
	    this.name = name;
	    this._faces = {};
	
	    this.addFace(path, 'normal', 'normal', idx);
	  };
	
	  Font.prototype.addFace = function(path, weight, style, idx) {
	    style = style || 'normal';
	    weight = weight || 'normal';
	
	    var face = new FontFace(path, idx || 0);
	    this._faces[weight + '-' + style] = face;
	  };
	
	  Font.prototype.getFace = function(weightStyle) {
	    return this._faces[weightStyle] || this._faces['normal-normal'];
	  };
	
	  exports.Font = Font;
	}
	
	/**
	 * Context2d implementation.
	 */
	
	__webpack_require__(17);
	
	/**
	 * Image implementation.
	 */
	
	__webpack_require__(40);
	
	/**
	 * Inspect canvas.
	 *
	 * @return {String}
	 * @api public
	 */
	
	Canvas.prototype.inspect = function(){
	  return '[Canvas ' + this.width + 'x' + this.height + ']';
	};
	
	/**
	 * Get a context object.
	 *
	 * @param {String} contextId
	 * @return {Context2d}
	 * @api public
	 */
	
	Canvas.prototype.getContext = function(contextId){
	  if ('2d' == contextId) {
	    var ctx = this._context2d || (this._context2d = new Context2d(this));
	    this.context = ctx;
	    ctx.canvas = this;
	    return ctx;
	  }
	};
	
	/**
	 * Create a `PNGStream` for `this` canvas.
	 *
	 * @return {PNGStream}
	 * @api public
	 */
	
	Canvas.prototype.pngStream =
	Canvas.prototype.createPNGStream = function(){
	  return new PNGStream(this);
	};
	
	/**
	 * Create a synchronous `PNGStream` for `this` canvas.
	 *
	 * @return {PNGStream}
	 * @api public
	 */
	
	Canvas.prototype.syncPNGStream =
	Canvas.prototype.createSyncPNGStream = function(){
	  return new PNGStream(this, true);
	};
	
	/**
	 * Create a `PDFStream` for `this` canvas.
	 *
	 * @return {PDFStream}
	 * @api public
	 */
	
	Canvas.prototype.pdfStream =
	Canvas.prototype.createPDFStream = function(){
	  return new PDFStream(this);
	};
	
	/**
	 * Create a synchronous `PDFStream` for `this` canvas.
	 *
	 * @return {PDFStream}
	 * @api public
	 */
	
	Canvas.prototype.syncPDFStream =
	Canvas.prototype.createSyncPDFStream = function(){
	  return new PDFStream(this, true);
	};
	
	/**
	 * Create a `JPEGStream` for `this` canvas.
	 *
	 * @param {Object} options
	 * @return {JPEGStream}
	 * @api public
	 */
	
	Canvas.prototype.jpegStream =
	Canvas.prototype.createJPEGStream = function(options){
	  return this.createSyncJPEGStream(options);
	};
	
	/**
	 * Create a synchronous `JPEGStream` for `this` canvas.
	 *
	 * @param {Object} options
	 * @return {JPEGStream}
	 * @api public
	 */
	
	Canvas.prototype.syncJPEGStream =
	Canvas.prototype.createSyncJPEGStream = function(options){
	  options = options || {};
	  // Don't allow the buffer size to exceed the size of the canvas (#674)
	  var maxBufSize = this.width * this.height * 4;
	  var clampedBufSize = Math.min(options.bufsize || 4096, maxBufSize);
	  return new JPEGStream(this, {
	      bufsize: clampedBufSize
	    , quality: options.quality || 75
	    , progressive: options.progressive || false
	  });
	};
	
	/**
	 * Return a data url. Pass a function for async support (required for "image/jpeg").
	 *
	 * @param {String} type, optional, one of "image/png" or "image/jpeg", defaults to "image/png"
	 * @param {Object|Number} encoderOptions, optional, options for jpeg compression (see documentation for Canvas#jpegStream) or the JPEG encoding quality from 0 to 1.
	 * @param {Function} fn, optional, callback for asynchronous operation. Required for type "image/jpeg".
	 * @return {String} data URL if synchronous (callback omitted)
	 * @api public
	 */
	
	Canvas.prototype.toDataURL = function(a1, a2, a3){
	  // valid arg patterns (args -> [type, opts, fn]):
	  // [] -> ['image/png', null, null]
	  // [qual] -> ['image/png', null, null]
	  // [undefined] -> ['image/png', null, null]
	  // ['image/png'] -> ['image/png', null, null]
	  // ['image/png', qual] -> ['image/png', null, null]
	  // [fn] -> ['image/png', null, fn]
	  // [type, fn] -> [type, null, fn]
	  // [undefined, fn] -> ['image/png', null, fn]
	  // ['image/png', qual, fn] -> ['image/png', null, fn]
	  // ['image/jpeg', fn] -> ['image/jpeg', null, fn]
	  // ['image/jpeg', opts, fn] -> ['image/jpeg', opts, fn]
	  // ['image/jpeg', qual, fn] -> ['image/jpeg', {quality: qual}, fn]
	  // ['image/jpeg', undefined, fn] -> ['image/jpeg', null, fn]
	
	  if (this.width === 0 || this.height === 0) {
	    // Per spec, if the bitmap has no pixels, return this string:
	    return "data:,";
	  }
	
	  var type = 'image/png';
	  var opts = {};
	  var fn;
	
	  if ('function' === typeof a1) {
	    fn = a1;
	  } else {
	    if ('string' === typeof a1 && FORMATS.indexOf(a1.toLowerCase()) !== -1) {
	      type = a1.toLowerCase();
	    }
	
	    if ('function' === typeof a2) {
	      fn = a2;
	    } else {
	      if ('object' === typeof a2) {
	        opts = a2;
	      } else if ('number' === typeof a2) {
	        opts = {quality: Math.max(0, Math.min(1, a2)) * 100};
	      }
	
	      if ('function' === typeof a3) {
	        fn = a3;
	      } else if (undefined !== a3) {
	        throw new TypeError(typeof a3 + ' is not a function');
	      }
	    }
	  }
	
	  if ('image/png' === type) {
	    if (fn) {
	      this.toBuffer(function(err, buf){
	        if (err) return fn(err);
	        fn(null, 'data:image/png;base64,' + buf.toString('base64'));
	      });
	    } else {
	      return 'data:image/png;base64,' + this.toBuffer().toString('base64');
	    }
	
	  } else if ('image/jpeg' === type) {
	    if (undefined === fn) {
	      throw new Error('Missing required callback function for format "image/jpeg"');
	    }
	
	    var stream = this.jpegStream(opts);
	    // note that jpegStream is synchronous
	    var buffers = [];
	    stream.on('data', function (chunk) {
	      buffers.push(chunk);
	    });
	    stream.on('error', function (err) {
	      fn(err);
	    });
	    stream.on('end', function() {
	      var result = 'data:image/jpeg;base64,' + Buffer.concat(buffers).toString('base64');
	      fn(null, result);
	    });
	  }
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12).Buffer))

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */
	
	'use strict'
	
	var base64 = __webpack_require__(13)
	var ieee754 = __webpack_require__(14)
	var isArray = __webpack_require__(15)
	
	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	
	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.
	
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()
	
	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength()
	
	function typedArraySupport () {
	  try {
	    var arr = new Uint8Array(1)
	    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}
	
	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}
	
	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length)
	    }
	    that.length = length
	  }
	
	  return that
	}
	
	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */
	
	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }
	
	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}
	
	Buffer.poolSize = 8192 // not used by this implementation
	
	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype
	  return arr
	}
	
	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }
	
	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }
	
	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }
	
	  return fromObject(that, value)
	}
	
	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	}
	
	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    })
	  }
	}
	
	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}
	
	function alloc (that, size, fill, encoding) {
	  assertSize(size)
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}
	
	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	}
	
	function allocUnsafe (that, size) {
	  assertSize(size)
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0
	    }
	  }
	  return that
	}
	
	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	}
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	}
	
	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8'
	  }
	
	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }
	
	  var length = byteLength(string, encoding) | 0
	  that = createBuffer(that, length)
	
	  var actual = that.write(string, encoding)
	
	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual)
	  }
	
	  return that
	}
	
	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0
	  that = createBuffer(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength // this throws if `array` is not a valid ArrayBuffer
	
	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }
	
	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }
	
	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array)
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset)
	  } else {
	    array = new Uint8Array(array, byteOffset, length)
	  }
	
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array)
	  }
	  return that
	}
	
	function fromObject (that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0
	    that = createBuffer(that, len)
	
	    if (that.length === 0) {
	      return that
	    }
	
	    obj.copy(that, 0, 0, len)
	    return that
	  }
	
	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }
	
	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }
	
	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}
	
	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}
	
	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0
	  }
	  return Buffer.alloc(+length)
	}
	
	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}
	
	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }
	
	  if (a === b) return 0
	
	  var x = a.length
	  var y = b.length
	
	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i]
	      y = b[i]
	      break
	    }
	  }
	
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}
	
	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }
	
	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }
	
	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length
	    }
	  }
	
	  var buffer = Buffer.allocUnsafe(length)
	  var pos = 0
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i]
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos)
	    pos += buf.length
	  }
	  return buffer
	}
	
	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string
	  }
	
	  var len = string.length
	  if (len === 0) return 0
	
	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength
	
	function slowToString (encoding, start, end) {
	  var loweredCase = false
	
	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.
	
	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }
	
	  if (end === undefined || end > this.length) {
	    end = this.length
	  }
	
	  if (end <= 0) {
	    return ''
	  }
	
	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0
	  start >>>= 0
	
	  if (end <= start) {
	    return ''
	  }
	
	  if (!encoding) encoding = 'utf8'
	
	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)
	
	      case 'ascii':
	        return asciiSlice(this, start, end)
	
	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)
	
	      case 'base64':
	        return base64Slice(this, start, end)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true
	
	function swap (b, n, m) {
	  var i = b[n]
	  b[n] = b[m]
	  b[m] = i
	}
	
	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1)
	  }
	  return this
	}
	
	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3)
	    swap(this, i + 1, i + 2)
	  }
	  return this
	}
	
	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7)
	    swap(this, i + 1, i + 6)
	    swap(this, i + 2, i + 5)
	    swap(this, i + 3, i + 4)
	  }
	  return this
	}
	
	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}
	
	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}
	
	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}
	
	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }
	
	  if (start === undefined) {
	    start = 0
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0
	  }
	  if (thisStart === undefined) {
	    thisStart = 0
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length
	  }
	
	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }
	
	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }
	
	  start >>>= 0
	  end >>>= 0
	  thisStart >>>= 0
	  thisEnd >>>= 0
	
	  if (this === target) return 0
	
	  var x = thisEnd - thisStart
	  var y = end - start
	  var len = Math.min(x, y)
	
	  var thisCopy = this.slice(thisStart, thisEnd)
	  var targetCopy = target.slice(start, end)
	
	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i]
	      y = targetCopy[i]
	      break
	    }
	  }
	
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1
	
	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset
	    byteOffset = 0
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000
	  }
	  byteOffset = +byteOffset  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1)
	  }
	
	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0
	    else return -1
	  }
	
	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding)
	  }
	
	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }
	
	  throw new TypeError('val must be string, number or Buffer')
	}
	
	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1
	  var arrLength = arr.length
	  var valLength = val.length
	
	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase()
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2
	      arrLength /= 2
	      valLength /= 2
	      byteOffset /= 2
	    }
	  }
	
	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }
	
	  var i
	  if (dir) {
	    var foundIndex = -1
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex
	        foundIndex = -1
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false
	          break
	        }
	      }
	      if (found) return i
	    }
	  }
	
	  return -1
	}
	
	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	}
	
	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	}
	
	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	}
	
	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }
	
	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')
	
	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed
	  }
	  return i
	}
	
	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}
	
	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}
	
	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}
	
	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }
	
	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining
	
	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }
	
	  if (!encoding) encoding = 'utf8'
	
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)
	
	      case 'ascii':
	        return asciiWrite(this, string, offset, length)
	
	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)
	
	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}
	
	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}
	
	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []
	
	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1
	
	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint
	
	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }
	
	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }
	
	    res.push(codePoint)
	    i += bytesPerSequence
	  }
	
	  return decodeCodePointsArray(res)
	}
	
	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000
	
	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }
	
	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}
	
	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}
	
	function latin1Slice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}
	
	function hexSlice (buf, start, end) {
	  var len = buf.length
	
	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len
	
	  var out = ''
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i])
	  }
	  return out
	}
	
	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}
	
	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end
	
	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }
	
	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }
	
	  if (end < start) end = start
	
	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end)
	    newBuf.__proto__ = Buffer.prototype
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start]
	    }
	  }
	
	  return newBuf
	}
	
	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}
	
	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }
	
	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}
	
	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}
	
	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}
	
	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}
	
	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}
	
	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}
	
	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}
	
	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}
	
	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}
	
	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}
	
	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}
	
	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}
	
	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}
	
	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }
	
	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }
	
	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}
	
	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}
	
	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = 0
	  var mul = 1
	  var sub = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = byteLength - 1
	  var mul = 1
	  var sub = 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}
	
	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}
	
	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}
	
	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}
	
	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}
	
	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start
	
	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0
	
	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')
	
	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }
	
	  var len = end - start
	  var i
	
	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    )
	  }
	
	  return len
	}
	
	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start
	      start = 0
	      end = this.length
	    } else if (typeof end === 'string') {
	      encoding = end
	      end = this.length
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0)
	      if (code < 256) {
	        val = code
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255
	  }
	
	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }
	
	  if (end <= start) {
	    return this
	  }
	
	  start = start >>> 0
	  end = end === undefined ? this.length : end >>> 0
	
	  if (!val) val = 0
	
	  var i
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString())
	    var len = bytes.length
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len]
	    }
	  }
	
	  return this
	}
	
	// HELPER FUNCTIONS
	// ================
	
	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g
	
	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}
	
	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}
	
	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}
	
	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []
	
	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i)
	
	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }
	
	        // valid lead
	        leadSurrogate = codePoint
	
	        continue
	      }
	
	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }
	
	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }
	
	    leadSurrogate = null
	
	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }
	
	  return bytes
	}
	
	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}
	
	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break
	
	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }
	
	  return byteArray
	}
	
	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}
	
	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}
	
	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12).Buffer, (function() { return this; }())))

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict'
	
	exports.toByteArray = toByteArray
	exports.fromByteArray = fromByteArray
	
	var lookup = []
	var revLookup = []
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array
	
	function init () {
	  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	  for (var i = 0, len = code.length; i < len; ++i) {
	    lookup[i] = code[i]
	    revLookup[code.charCodeAt(i)] = i
	  }
	
	  revLookup['-'.charCodeAt(0)] = 62
	  revLookup['_'.charCodeAt(0)] = 63
	}
	
	init()
	
	function toByteArray (b64) {
	  var i, j, l, tmp, placeHolders, arr
	  var len = b64.length
	
	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }
	
	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
	
	  // base64 is 4/3 + up to two characters of the original data
	  arr = new Arr(len * 3 / 4 - placeHolders)
	
	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len
	
	  var L = 0
	
	  for (i = 0, j = 0; i < l; i += 4, j += 3) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
	    arr[L++] = (tmp >> 16) & 0xFF
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }
	
	  if (placeHolders === 2) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
	    arr[L++] = tmp & 0xFF
	  } else if (placeHolders === 1) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }
	
	  return arr
	}
	
	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	}
	
	function encodeChunk (uint8, start, end) {
	  var tmp
	  var output = []
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
	    output.push(tripletToBase64(tmp))
	  }
	  return output.join('')
	}
	
	function fromByteArray (uint8) {
	  var tmp
	  var len = uint8.length
	  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
	  var output = ''
	  var parts = []
	  var maxChunkLength = 16383 // must be multiple of 3
	
	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
	  }
	
	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1]
	    output += lookup[tmp >> 2]
	    output += lookup[(tmp << 4) & 0x3F]
	    output += '=='
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
	    output += lookup[tmp >> 10]
	    output += lookup[(tmp >> 4) & 0x3F]
	    output += lookup[(tmp << 2) & 0x3F]
	    output += '='
	  }
	
	  parts.push(output)
	
	  return parts.join('')
	}


/***/ },
/* 14 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]
	
	  i += d
	
	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}
	
	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0
	
	  value = Math.abs(value)
	
	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }
	
	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }
	
	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}
	
	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}
	
	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 15 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../build/Release/canvas\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/*!
	 * Canvas - Context2d
	 * Copyright (c) 2010 LearnBoost <tj@learnboost.com>
	 * MIT Licensed
	 */
	
	/**
	 * Module dependencies.
	 */
	
	var canvas = __webpack_require__(16)
	  , Context2d = canvas.CanvasRenderingContext2d
	  , CanvasGradient = canvas.CanvasGradient
	  , CanvasPattern = canvas.CanvasPattern
	  , ImageData = canvas.ImageData;
	
	/**
	 * Export `Context2d` as the module.
	 */
	
	var Context2d = exports = module.exports = Context2d;
	
	/**
	 * Cache color string RGBA values.
	 */
	
	var cache = {};
	
	/**
	 * Text baselines.
	 */
	
	var baselines = ['alphabetic', 'top', 'bottom', 'middle', 'ideographic', 'hanging'];
	
	/**
	 * Font RegExp helpers.
	 */
	
	var weights = 'normal|bold|bolder|lighter|[1-9]00'
	  , styles = 'normal|italic|oblique'
	  , units = 'px|pt|pc|in|cm|mm|%'
	  , string = '\'([^\']+)\'|"([^"]+)"|[\\w-]+';
	
	/**
	 * Font parser RegExp;
	 */
	
	var fontre = new RegExp('^ *'
	  + '(?:(' + weights + ') *)?'
	  + '(?:(' + styles + ') *)?'
	  + '([\\d\\.]+)(' + units + ') *'
	  + '((?:' + string + ')( *, *(?:' + string + '))*)'
	  );
	
	/**
	 * Parse font `str`.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */
	
	var parseFont = exports.parseFont = function(str){
	  var font = {}
	    , captures = fontre.exec(str);
	
	  // Invalid
	  if (!captures) return;
	
	  // Cached
	  if (cache[str]) return cache[str];
	
	  // Populate font object
	  font.weight = captures[1] || 'normal';
	  font.style = captures[2] || 'normal';
	  font.size = parseFloat(captures[3]);
	  font.unit = captures[4];
	  font.family = captures[5].replace(/["']/g, '').split(',')[0].trim();
	
	  // TODO: dpi
	  // TODO: remaining unit conversion
	  switch (font.unit) {
	    case 'pt':
	      font.size /= .75;
	      break;
	    case 'in':
	      font.size *= 96;
	      break;
	    case 'mm':
	      font.size *= 96.0 / 25.4;
	      break;
	    case 'cm':
	      font.size *= 96.0 / 2.54;
	      break;
	  }
	
	  return cache[str] = font;
	};
	
	/**
	 * Enable or disable image smoothing.
	 *
	 * @api public
	 */
	
	Context2d.prototype.__defineSetter__('imageSmoothingEnabled', function(val){
	  this._imageSmoothing = !! val;
	  this.patternQuality = val ? 'best' : 'fast';
	});
	
	/**
	 * Get image smoothing value.
	 *
	 * @api public
	 */
	
	Context2d.prototype.__defineGetter__('imageSmoothingEnabled', function(val){
	  return !! this._imageSmoothing;
	});
	
	/**
	 * Create a pattern from `Image` or `Canvas`.
	 *
	 * @param {Image|Canvas} image
	 * @param {String} repetition
	 * @return {CanvasPattern}
	 * @api public
	 */
	
	Context2d.prototype.createPattern = function(image, repetition){
	  // TODO Use repetition (currently always 'repeat')
	  return new CanvasPattern(image);
	};
	
	/**
	 * Create a linear gradient at the given point `(x0, y0)` and `(x1, y1)`.
	 *
	 * @param {Number} x0
	 * @param {Number} y0
	 * @param {Number} x1
	 * @param {Number} y1
	 * @return {CanvasGradient}
	 * @api public
	 */
	
	Context2d.prototype.createLinearGradient = function(x0, y0, x1, y1){
	  return new CanvasGradient(x0, y0, x1, y1);
	};
	
	/**
	 * Create a radial gradient at the given point `(x0, y0)` and `(x1, y1)`
	 * and radius `r0` and `r1`.
	 *
	 * @param {Number} x0
	 * @param {Number} y0
	 * @param {Number} r0
	 * @param {Number} x1
	 * @param {Number} y1
	 * @param {Number} r1
	 * @return {CanvasGradient}
	 * @api public
	 */
	
	Context2d.prototype.createRadialGradient = function(x0, y0, r0, x1, y1, r1){
	  return new CanvasGradient(x0, y0, r0, x1, y1, r1);
	};
	
	/**
	 * Reset transform matrix to identity, then apply the given args.
	 *
	 * @param {...}
	 * @api public
	 */
	
	Context2d.prototype.setTransform = function(){
	  this.resetTransform();
	  this.transform.apply(this, arguments);
	};
	
	/**
	 * Set the fill style with the given css color string.
	 *
	 * @api public
	 */
	
	Context2d.prototype.__defineSetter__('fillStyle', function(val){
	  if (!val) return;
	  if ('CanvasGradient' == val.constructor.name
	    || 'CanvasPattern' == val.constructor.name) {
	    this.lastFillStyle = val;
	    this._setFillPattern(val);
	  } else if ('string' == typeof val) {
	    this._setFillColor(val);
	  }
	});
	
	/**
	 * Get previous fill style.
	 *
	 * @return {CanvasGradient|String}
	 * @api public
	 */
	
	Context2d.prototype.__defineGetter__('fillStyle', function(){
	  return this.lastFillStyle || this.fillColor;
	});
	
	/**
	 * Set the stroke style with the given css color string.
	 *
	 * @api public
	 */
	
	Context2d.prototype.__defineSetter__('strokeStyle', function(val){
	  if (!val) return;
	  if ('CanvasGradient' == val.constructor.name
	    || 'CanvasPattern' == val.constructor.name) {
	    this.lastStrokeStyle = val;
	    this._setStrokePattern(val);
	  } else if ('string' == typeof val) {
	    this._setStrokeColor(val);
	  }
	});
	
	/**
	 * Get previous stroke style.
	 *
	 * @return {CanvasGradient|String}
	 * @api public
	 */
	
	Context2d.prototype.__defineGetter__('strokeStyle', function(){
	  return this.lastStrokeStyle || this.strokeColor;
	});
	
	/**
	 * Register `font` for usage.
	 *
	 * @param {Font} font
	 * @api public
	 */
	
	Context2d.prototype.addFont = function(font) {
	  this._fonts = this._fonts || {};
	  if (this._fonts[font.name]) return;
	  this._fonts[font.name] = font;
	};
	
	/**
	 * Set font.
	 *
	 * @see exports.parseFont()
	 * @api public
	 */
	
	Context2d.prototype.__defineSetter__('font', function(val){
	  if (!val) return;
	  if ('string' == typeof val) {
	    var font;
	    if (font = parseFont(val)) {
	      this.lastFontString = val;
	
	      var fonts = this._fonts;
	      if (fonts && fonts[font.family]) {
	        var fontObj = fonts[font.family];
	        var type = font.weight + '-' + font.style;
	
	        var fontFace = fontObj.getFace(type);
	        this._setFontFace(fontFace, font.size);
	      } else {
	        this._setFont(
	            font.weight
	          , font.style
	          , font.size
	          , font.unit
	          , font.family);
	      }
	    }
	  }
	});
	
	/**
	 * Get the current font.
	 *
	 * @api public
	 */
	
	Context2d.prototype.__defineGetter__('font', function(){
	  return this.lastFontString || '10px sans-serif';
	});
	
	/**
	 * Set text baseline.
	 *
	 * @api public
	 */
	
	Context2d.prototype.__defineSetter__('textBaseline', function(val){
	  if (!val) return;
	  var n = baselines.indexOf(val);
	  if (~n) {
	    this.lastBaseline = val;
	    this._setTextBaseline(n);
	  }
	});
	
	/**
	 * Get the current baseline setting.
	 *
	 * @api public
	 */
	
	Context2d.prototype.__defineGetter__('textBaseline', function(){
	  return this.lastBaseline || 'alphabetic';
	});
	
	/**
	 * Set text alignment.
	 *
	 * @api public
	 */
	
	Context2d.prototype.__defineSetter__('textAlign', function(val){
	  switch (val) {
	    case 'center':
	      this._setTextAlignment(0);
	      this.lastTextAlignment = val;
	      break;
	    case 'left':
	    case 'start':
	      this._setTextAlignment(-1);
	      this.lastTextAlignment = val;
	      break;
	    case 'right':
	    case 'end':
	      this._setTextAlignment(1);
	      this.lastTextAlignment = val;
	      break;
	  }
	});
	
	/**
	 * Get the current font.
	 *
	 * @see exports.parseFont()
	 * @api public
	 */
	
	Context2d.prototype.__defineGetter__('textAlign', function(){
	  return this.lastTextAlignment || 'start';
	});
	
	/**
	 * Create `ImageData` with the given dimensions or
	 * `ImageData` instance for dimensions.
	 *
	 * @param {Number|ImageData} width
	 * @param {Number} height
	 * @return {ImageData}
	 * @api public
	 */
	
	Context2d.prototype.createImageData = function(width, height){
	  if ('ImageData' == width.constructor.name) {
	    height = width.height;
	    width = width.width;
	  }
	  return new ImageData(new Uint8ClampedArray(width * height * 4), width, height);
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	/*!
	 * Canvas - PNGStream
	 * Copyright (c) 2010 LearnBoost <tj@learnboost.com>
	 * MIT Licensed
	 */
	
	/**
	 * Module dependencies.
	 */
	
	var Stream = __webpack_require__(19).Stream;
	
	/**
	 * Initialize a `PNGStream` with the given `canvas`.
	 *
	 * "data" events are emitted with `Buffer` chunks, once complete the
	 * "end" event is emitted. The following example will stream to a file
	 * named "./my.png".
	 *
	 *     var out = fs.createWriteStream(__dirname + '/my.png')
	 *       , stream = canvas.createPNGStream();
	 *
	 *     stream.pipe(out);
	 *
	 * @param {Canvas} canvas
	 * @param {Boolean} sync
	 * @api public
	 */
	
	var PNGStream = module.exports = function PNGStream(canvas, sync) {
	  var self = this
	    , method = sync
	      ? 'streamPNGSync'
	      : 'streamPNG';
	  this.sync = sync;
	  this.canvas = canvas;
	  this.readable = true;
	  // TODO: implement async
	  if ('streamPNG' == method) method = 'streamPNGSync';
	  process.nextTick(function(){
	    canvas[method](function(err, chunk, len){
	      if (err) {
	        self.emit('error', err);
	        self.readable = false;
	      } else if (len) {
	        self.emit('data', chunk, len);
	      } else {
	        self.emit('end');
	        self.readable = false;
	      }
	    });
	  });
	};
	
	/**
	 * Inherit from `EventEmitter`.
	 */
	
	PNGStream.prototype.__proto__ = Stream.prototype;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	module.exports = Stream;
	
	var EE = __webpack_require__(20).EventEmitter;
	var inherits = __webpack_require__(21);
	
	inherits(Stream, EE);
	Stream.Readable = __webpack_require__(22);
	Stream.Writable = __webpack_require__(33);
	Stream.Duplex = __webpack_require__(34);
	Stream.Transform = __webpack_require__(35);
	Stream.PassThrough = __webpack_require__(36);
	
	// Backwards-compat with node 0.4.x
	Stream.Stream = Stream;
	
	
	
	// old-style streams.  Note that the pipe method (the only relevant
	// part of this class) is overridden in the Readable class.
	
	function Stream() {
	  EE.call(this);
	}
	
	Stream.prototype.pipe = function(dest, options) {
	  var source = this;
	
	  function ondata(chunk) {
	    if (dest.writable) {
	      if (false === dest.write(chunk) && source.pause) {
	        source.pause();
	      }
	    }
	  }
	
	  source.on('data', ondata);
	
	  function ondrain() {
	    if (source.readable && source.resume) {
	      source.resume();
	    }
	  }
	
	  dest.on('drain', ondrain);
	
	  // If the 'end' option is not supplied, dest.end() will be called when
	  // source gets the 'end' or 'close' events.  Only dest.end() once.
	  if (!dest._isStdio && (!options || options.end !== false)) {
	    source.on('end', onend);
	    source.on('close', onclose);
	  }
	
	  var didOnEnd = false;
	  function onend() {
	    if (didOnEnd) return;
	    didOnEnd = true;
	
	    dest.end();
	  }
	
	
	  function onclose() {
	    if (didOnEnd) return;
	    didOnEnd = true;
	
	    if (typeof dest.destroy === 'function') dest.destroy();
	  }
	
	  // don't leave dangling pipes when there are errors.
	  function onerror(er) {
	    cleanup();
	    if (EE.listenerCount(this, 'error') === 0) {
	      throw er; // Unhandled stream error in pipe.
	    }
	  }
	
	  source.on('error', onerror);
	  dest.on('error', onerror);
	
	  // remove all the event listeners that were added.
	  function cleanup() {
	    source.removeListener('data', ondata);
	    dest.removeListener('drain', ondrain);
	
	    source.removeListener('end', onend);
	    source.removeListener('close', onclose);
	
	    source.removeListener('error', onerror);
	    dest.removeListener('error', onerror);
	
	    source.removeListener('end', cleanup);
	    source.removeListener('close', cleanup);
	
	    dest.removeListener('close', cleanup);
	  }
	
	  source.on('end', cleanup);
	  source.on('close', cleanup);
	
	  dest.on('close', cleanup);
	
	  dest.emit('pipe', source);
	
	  // Allow for unix-like usage: A.pipe(B).pipe(C)
	  return dest;
	};


/***/ },
/* 20 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;
	
	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;
	
	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	
	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events)
	    this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }
	
	  handler = this._events[type];
	
	  if (isUndefined(handler))
	    return false;
	
	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events)
	    this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }
	
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  var fired = false;
	
	  function g() {
	    this.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type])
	    return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }
	
	    if (position < 0)
	      return this;
	
	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }
	
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;
	
	  if (!this._events)
	    return this;
	
	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }
	
	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }
	
	  listeners = this._events[type];
	
	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];
	
	  return this;
	};
	
	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];
	
	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};
	
	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 21 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {exports = module.exports = __webpack_require__(23);
	exports.Stream = __webpack_require__(19);
	exports.Readable = exports;
	exports.Writable = __webpack_require__(29);
	exports.Duplex = __webpack_require__(28);
	exports.Transform = __webpack_require__(31);
	exports.PassThrough = __webpack_require__(32);
	if (!process.browser && process.env.READABLE_STREAM === 'disable') {
	  module.exports = __webpack_require__(19);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	module.exports = Readable;
	
	/*<replacement>*/
	var isArray = __webpack_require__(24);
	/*</replacement>*/
	
	
	/*<replacement>*/
	var Buffer = __webpack_require__(12).Buffer;
	/*</replacement>*/
	
	Readable.ReadableState = ReadableState;
	
	var EE = __webpack_require__(20).EventEmitter;
	
	/*<replacement>*/
	if (!EE.listenerCount) EE.listenerCount = function(emitter, type) {
	  return emitter.listeners(type).length;
	};
	/*</replacement>*/
	
	var Stream = __webpack_require__(19);
	
	/*<replacement>*/
	var util = __webpack_require__(25);
	util.inherits = __webpack_require__(26);
	/*</replacement>*/
	
	var StringDecoder;
	
	
	/*<replacement>*/
	var debug = __webpack_require__(27);
	if (debug && debug.debuglog) {
	  debug = debug.debuglog('stream');
	} else {
	  debug = function () {};
	}
	/*</replacement>*/
	
	
	util.inherits(Readable, Stream);
	
	function ReadableState(options, stream) {
	  var Duplex = __webpack_require__(28);
	
	  options = options || {};
	
	  // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"
	  var hwm = options.highWaterMark;
	  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;
	
	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;
	
	  this.buffer = [];
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = null;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false;
	
	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;
	
	  // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.
	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;
	
	
	  // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away
	  this.objectMode = !!options.objectMode;
	
	  if (stream instanceof Duplex)
	    this.objectMode = this.objectMode || !!options.readableObjectMode;
	
	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';
	
	  // when piping, we only care about 'readable' events that happen
	  // after read()ing all the bytes and not getting any pushback.
	  this.ranOut = false;
	
	  // the number of writers that are awaiting a drain event in .pipe()s
	  this.awaitDrain = 0;
	
	  // if true, a maybeReadMore has been scheduled
	  this.readingMore = false;
	
	  this.decoder = null;
	  this.encoding = null;
	  if (options.encoding) {
	    if (!StringDecoder)
	      StringDecoder = __webpack_require__(30).StringDecoder;
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}
	
	function Readable(options) {
	  var Duplex = __webpack_require__(28);
	
	  if (!(this instanceof Readable))
	    return new Readable(options);
	
	  this._readableState = new ReadableState(options, this);
	
	  // legacy
	  this.readable = true;
	
	  Stream.call(this);
	}
	
	// Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.
	Readable.prototype.push = function(chunk, encoding) {
	  var state = this._readableState;
	
	  if (util.isString(chunk) && !state.objectMode) {
	    encoding = encoding || state.defaultEncoding;
	    if (encoding !== state.encoding) {
	      chunk = new Buffer(chunk, encoding);
	      encoding = '';
	    }
	  }
	
	  return readableAddChunk(this, state, chunk, encoding, false);
	};
	
	// Unshift should *always* be something directly out of read()
	Readable.prototype.unshift = function(chunk) {
	  var state = this._readableState;
	  return readableAddChunk(this, state, chunk, '', true);
	};
	
	function readableAddChunk(stream, state, chunk, encoding, addToFront) {
	  var er = chunkInvalid(state, chunk);
	  if (er) {
	    stream.emit('error', er);
	  } else if (util.isNullOrUndefined(chunk)) {
	    state.reading = false;
	    if (!state.ended)
	      onEofChunk(stream, state);
	  } else if (state.objectMode || chunk && chunk.length > 0) {
	    if (state.ended && !addToFront) {
	      var e = new Error('stream.push() after EOF');
	      stream.emit('error', e);
	    } else if (state.endEmitted && addToFront) {
	      var e = new Error('stream.unshift() after end event');
	      stream.emit('error', e);
	    } else {
	      if (state.decoder && !addToFront && !encoding)
	        chunk = state.decoder.write(chunk);
	
	      if (!addToFront)
	        state.reading = false;
	
	      // if we want the data now, just emit it.
	      if (state.flowing && state.length === 0 && !state.sync) {
	        stream.emit('data', chunk);
	        stream.read(0);
	      } else {
	        // update the buffer info.
	        state.length += state.objectMode ? 1 : chunk.length;
	        if (addToFront)
	          state.buffer.unshift(chunk);
	        else
	          state.buffer.push(chunk);
	
	        if (state.needReadable)
	          emitReadable(stream);
	      }
	
	      maybeReadMore(stream, state);
	    }
	  } else if (!addToFront) {
	    state.reading = false;
	  }
	
	  return needMoreData(state);
	}
	
	
	
	// if it's past the high water mark, we can push in some more.
	// Also, if we have no data yet, we can stand some
	// more bytes.  This is to work around cases where hwm=0,
	// such as the repl.  Also, if the push() triggered a
	// readable event, and the user called read(largeNumber) such that
	// needReadable was set, then we ought to push more, so that another
	// 'readable' event will be triggered.
	function needMoreData(state) {
	  return !state.ended &&
	         (state.needReadable ||
	          state.length < state.highWaterMark ||
	          state.length === 0);
	}
	
	// backwards compatibility.
	Readable.prototype.setEncoding = function(enc) {
	  if (!StringDecoder)
	    StringDecoder = __webpack_require__(30).StringDecoder;
	  this._readableState.decoder = new StringDecoder(enc);
	  this._readableState.encoding = enc;
	  return this;
	};
	
	// Don't raise the hwm > 128MB
	var MAX_HWM = 0x800000;
	function roundUpToNextPowerOf2(n) {
	  if (n >= MAX_HWM) {
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2
	    n--;
	    for (var p = 1; p < 32; p <<= 1) n |= n >> p;
	    n++;
	  }
	  return n;
	}
	
	function howMuchToRead(n, state) {
	  if (state.length === 0 && state.ended)
	    return 0;
	
	  if (state.objectMode)
	    return n === 0 ? 0 : 1;
	
	  if (isNaN(n) || util.isNull(n)) {
	    // only flow one buffer at a time
	    if (state.flowing && state.buffer.length)
	      return state.buffer[0].length;
	    else
	      return state.length;
	  }
	
	  if (n <= 0)
	    return 0;
	
	  // If we're asking for more than the target buffer level,
	  // then raise the water mark.  Bump up to the next highest
	  // power of 2, to prevent increasing it excessively in tiny
	  // amounts.
	  if (n > state.highWaterMark)
	    state.highWaterMark = roundUpToNextPowerOf2(n);
	
	  // don't have that much.  return null, unless we've ended.
	  if (n > state.length) {
	    if (!state.ended) {
	      state.needReadable = true;
	      return 0;
	    } else
	      return state.length;
	  }
	
	  return n;
	}
	
	// you can override either this method, or the async _read(n) below.
	Readable.prototype.read = function(n) {
	  debug('read', n);
	  var state = this._readableState;
	  var nOrig = n;
	
	  if (!util.isNumber(n) || n > 0)
	    state.emittedReadable = false;
	
	  // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.
	  if (n === 0 &&
	      state.needReadable &&
	      (state.length >= state.highWaterMark || state.ended)) {
	    debug('read: emitReadable', state.length, state.ended);
	    if (state.length === 0 && state.ended)
	      endReadable(this);
	    else
	      emitReadable(this);
	    return null;
	  }
	
	  n = howMuchToRead(n, state);
	
	  // if we've ended, and we're now clear, then finish it up.
	  if (n === 0 && state.ended) {
	    if (state.length === 0)
	      endReadable(this);
	    return null;
	  }
	
	  // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.
	
	  // if we need a readable event, then we need to do some reading.
	  var doRead = state.needReadable;
	  debug('need readable', doRead);
	
	  // if we currently have less than the highWaterMark, then also read some
	  if (state.length === 0 || state.length - n < state.highWaterMark) {
	    doRead = true;
	    debug('length less than watermark', doRead);
	  }
	
	  // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.
	  if (state.ended || state.reading) {
	    doRead = false;
	    debug('reading or ended', doRead);
	  }
	
	  if (doRead) {
	    debug('do read');
	    state.reading = true;
	    state.sync = true;
	    // if the length is currently zero, then we *need* a readable event.
	    if (state.length === 0)
	      state.needReadable = true;
	    // call internal read method
	    this._read(state.highWaterMark);
	    state.sync = false;
	  }
	
	  // If _read pushed data synchronously, then `reading` will be false,
	  // and we need to re-evaluate how much data we can return to the user.
	  if (doRead && !state.reading)
	    n = howMuchToRead(nOrig, state);
	
	  var ret;
	  if (n > 0)
	    ret = fromList(n, state);
	  else
	    ret = null;
	
	  if (util.isNull(ret)) {
	    state.needReadable = true;
	    n = 0;
	  }
	
	  state.length -= n;
	
	  // If we have nothing in the buffer, then we want to know
	  // as soon as we *do* get something into the buffer.
	  if (state.length === 0 && !state.ended)
	    state.needReadable = true;
	
	  // If we tried to read() past the EOF, then emit end on the next tick.
	  if (nOrig !== n && state.ended && state.length === 0)
	    endReadable(this);
	
	  if (!util.isNull(ret))
	    this.emit('data', ret);
	
	  return ret;
	};
	
	function chunkInvalid(state, chunk) {
	  var er = null;
	  if (!util.isBuffer(chunk) &&
	      !util.isString(chunk) &&
	      !util.isNullOrUndefined(chunk) &&
	      !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  return er;
	}
	
	
	function onEofChunk(stream, state) {
	  if (state.decoder && !state.ended) {
	    var chunk = state.decoder.end();
	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }
	  state.ended = true;
	
	  // emit 'readable' now to make sure it gets picked up.
	  emitReadable(stream);
	}
	
	// Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.
	function emitReadable(stream) {
	  var state = stream._readableState;
	  state.needReadable = false;
	  if (!state.emittedReadable) {
	    debug('emitReadable', state.flowing);
	    state.emittedReadable = true;
	    if (state.sync)
	      process.nextTick(function() {
	        emitReadable_(stream);
	      });
	    else
	      emitReadable_(stream);
	  }
	}
	
	function emitReadable_(stream) {
	  debug('emit readable');
	  stream.emit('readable');
	  flow(stream);
	}
	
	
	// at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.
	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    process.nextTick(function() {
	      maybeReadMore_(stream, state);
	    });
	  }
	}
	
	function maybeReadMore_(stream, state) {
	  var len = state.length;
	  while (!state.reading && !state.flowing && !state.ended &&
	         state.length < state.highWaterMark) {
	    debug('maybeReadMore read 0');
	    stream.read(0);
	    if (len === state.length)
	      // didn't get any data, stop spinning.
	      break;
	    else
	      len = state.length;
	  }
	  state.readingMore = false;
	}
	
	// abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.
	Readable.prototype._read = function(n) {
	  this.emit('error', new Error('not implemented'));
	};
	
	Readable.prototype.pipe = function(dest, pipeOpts) {
	  var src = this;
	  var state = this._readableState;
	
	  switch (state.pipesCount) {
	    case 0:
	      state.pipes = dest;
	      break;
	    case 1:
	      state.pipes = [state.pipes, dest];
	      break;
	    default:
	      state.pipes.push(dest);
	      break;
	  }
	  state.pipesCount += 1;
	  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
	
	  var doEnd = (!pipeOpts || pipeOpts.end !== false) &&
	              dest !== process.stdout &&
	              dest !== process.stderr;
	
	  var endFn = doEnd ? onend : cleanup;
	  if (state.endEmitted)
	    process.nextTick(endFn);
	  else
	    src.once('end', endFn);
	
	  dest.on('unpipe', onunpipe);
	  function onunpipe(readable) {
	    debug('onunpipe');
	    if (readable === src) {
	      cleanup();
	    }
	  }
	
	  function onend() {
	    debug('onend');
	    dest.end();
	  }
	
	  // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.
	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);
	
	  function cleanup() {
	    debug('cleanup');
	    // cleanup event handlers once the pipe is broken
	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', cleanup);
	    src.removeListener('data', ondata);
	
	    // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.
	    if (state.awaitDrain &&
	        (!dest._writableState || dest._writableState.needDrain))
	      ondrain();
	  }
	
	  src.on('data', ondata);
	  function ondata(chunk) {
	    debug('ondata');
	    var ret = dest.write(chunk);
	    if (false === ret) {
	      debug('false write response, pause',
	            src._readableState.awaitDrain);
	      src._readableState.awaitDrain++;
	      src.pause();
	    }
	  }
	
	  // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.
	  function onerror(er) {
	    debug('onerror', er);
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (EE.listenerCount(dest, 'error') === 0)
	      dest.emit('error', er);
	  }
	  // This is a brutally ugly hack to make sure that our error handler
	  // is attached before any userland ones.  NEVER DO THIS.
	  if (!dest._events || !dest._events.error)
	    dest.on('error', onerror);
	  else if (isArray(dest._events.error))
	    dest._events.error.unshift(onerror);
	  else
	    dest._events.error = [onerror, dest._events.error];
	
	
	
	  // Both close and finish should trigger unpipe, but only once.
	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }
	  dest.once('close', onclose);
	  function onfinish() {
	    debug('onfinish');
	    dest.removeListener('close', onclose);
	    unpipe();
	  }
	  dest.once('finish', onfinish);
	
	  function unpipe() {
	    debug('unpipe');
	    src.unpipe(dest);
	  }
	
	  // tell the dest that it's being piped to
	  dest.emit('pipe', src);
	
	  // start the flow if it hasn't been started already.
	  if (!state.flowing) {
	    debug('pipe resume');
	    src.resume();
	  }
	
	  return dest;
	};
	
	function pipeOnDrain(src) {
	  return function() {
	    var state = src._readableState;
	    debug('pipeOnDrain', state.awaitDrain);
	    if (state.awaitDrain)
	      state.awaitDrain--;
	    if (state.awaitDrain === 0 && EE.listenerCount(src, 'data')) {
	      state.flowing = true;
	      flow(src);
	    }
	  };
	}
	
	
	Readable.prototype.unpipe = function(dest) {
	  var state = this._readableState;
	
	  // if we're not piping anywhere, then do nothing.
	  if (state.pipesCount === 0)
	    return this;
	
	  // just one destination.  most common case.
	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes)
	      return this;
	
	    if (!dest)
	      dest = state.pipes;
	
	    // got a match.
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	    if (dest)
	      dest.emit('unpipe', this);
	    return this;
	  }
	
	  // slow case. multiple pipe destinations.
	
	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	
	    for (var i = 0; i < len; i++)
	      dests[i].emit('unpipe', this);
	    return this;
	  }
	
	  // try to find the right one.
	  var i = indexOf(state.pipes, dest);
	  if (i === -1)
	    return this;
	
	  state.pipes.splice(i, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1)
	    state.pipes = state.pipes[0];
	
	  dest.emit('unpipe', this);
	
	  return this;
	};
	
	// set up data events if they are asked for
	// Ensure readable listeners eventually get something
	Readable.prototype.on = function(ev, fn) {
	  var res = Stream.prototype.on.call(this, ev, fn);
	
	  // If listening to data, and it has not explicitly been paused,
	  // then call resume to start the flow of data on the next tick.
	  if (ev === 'data' && false !== this._readableState.flowing) {
	    this.resume();
	  }
	
	  if (ev === 'readable' && this.readable) {
	    var state = this._readableState;
	    if (!state.readableListening) {
	      state.readableListening = true;
	      state.emittedReadable = false;
	      state.needReadable = true;
	      if (!state.reading) {
	        var self = this;
	        process.nextTick(function() {
	          debug('readable nexttick read 0');
	          self.read(0);
	        });
	      } else if (state.length) {
	        emitReadable(this, state);
	      }
	    }
	  }
	
	  return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;
	
	// pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.
	Readable.prototype.resume = function() {
	  var state = this._readableState;
	  if (!state.flowing) {
	    debug('resume');
	    state.flowing = true;
	    if (!state.reading) {
	      debug('resume read 0');
	      this.read(0);
	    }
	    resume(this, state);
	  }
	  return this;
	};
	
	function resume(stream, state) {
	  if (!state.resumeScheduled) {
	    state.resumeScheduled = true;
	    process.nextTick(function() {
	      resume_(stream, state);
	    });
	  }
	}
	
	function resume_(stream, state) {
	  state.resumeScheduled = false;
	  stream.emit('resume');
	  flow(stream);
	  if (state.flowing && !state.reading)
	    stream.read(0);
	}
	
	Readable.prototype.pause = function() {
	  debug('call pause flowing=%j', this._readableState.flowing);
	  if (false !== this._readableState.flowing) {
	    debug('pause');
	    this._readableState.flowing = false;
	    this.emit('pause');
	  }
	  return this;
	};
	
	function flow(stream) {
	  var state = stream._readableState;
	  debug('flow', state.flowing);
	  if (state.flowing) {
	    do {
	      var chunk = stream.read();
	    } while (null !== chunk && state.flowing);
	  }
	}
	
	// wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.
	Readable.prototype.wrap = function(stream) {
	  var state = this._readableState;
	  var paused = false;
	
	  var self = this;
	  stream.on('end', function() {
	    debug('wrapped end');
	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length)
	        self.push(chunk);
	    }
	
	    self.push(null);
	  });
	
	  stream.on('data', function(chunk) {
	    debug('wrapped data');
	    if (state.decoder)
	      chunk = state.decoder.write(chunk);
	    if (!chunk || !state.objectMode && !chunk.length)
	      return;
	
	    var ret = self.push(chunk);
	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  });
	
	  // proxy all the other methods.
	  // important when wrapping filters and duplexes.
	  for (var i in stream) {
	    if (util.isFunction(stream[i]) && util.isUndefined(this[i])) {
	      this[i] = function(method) { return function() {
	        return stream[method].apply(stream, arguments);
	      }}(i);
	    }
	  }
	
	  // proxy certain important events.
	  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
	  forEach(events, function(ev) {
	    stream.on(ev, self.emit.bind(self, ev));
	  });
	
	  // when we try to consume some more bytes, simply unpause the
	  // underlying stream.
	  self._read = function(n) {
	    debug('wrapped _read', n);
	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };
	
	  return self;
	};
	
	
	
	// exposed for testing purposes only.
	Readable._fromList = fromList;
	
	// Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	function fromList(n, state) {
	  var list = state.buffer;
	  var length = state.length;
	  var stringMode = !!state.decoder;
	  var objectMode = !!state.objectMode;
	  var ret;
	
	  // nothing in the list, definitely empty.
	  if (list.length === 0)
	    return null;
	
	  if (length === 0)
	    ret = null;
	  else if (objectMode)
	    ret = list.shift();
	  else if (!n || n >= length) {
	    // read it all, truncate the array.
	    if (stringMode)
	      ret = list.join('');
	    else
	      ret = Buffer.concat(list, length);
	    list.length = 0;
	  } else {
	    // read just some of it.
	    if (n < list[0].length) {
	      // just take a part of the first list item.
	      // slice is the same for buffers and strings.
	      var buf = list[0];
	      ret = buf.slice(0, n);
	      list[0] = buf.slice(n);
	    } else if (n === list[0].length) {
	      // first list is a perfect match
	      ret = list.shift();
	    } else {
	      // complex case.
	      // we have enough to cover it, but it spans past the first buffer.
	      if (stringMode)
	        ret = '';
	      else
	        ret = new Buffer(n);
	
	      var c = 0;
	      for (var i = 0, l = list.length; i < l && c < n; i++) {
	        var buf = list[0];
	        var cpy = Math.min(n - c, buf.length);
	
	        if (stringMode)
	          ret += buf.slice(0, cpy);
	        else
	          buf.copy(ret, c, 0, cpy);
	
	        if (cpy < buf.length)
	          list[0] = buf.slice(cpy);
	        else
	          list.shift();
	
	        c += cpy;
	      }
	    }
	  }
	
	  return ret;
	}
	
	function endReadable(stream) {
	  var state = stream._readableState;
	
	  // If we get here before consuming all the bytes, then that is a
	  // bug in node.  Should never happen.
	  if (state.length > 0)
	    throw new Error('endReadable called on non-empty stream');
	
	  if (!state.endEmitted) {
	    state.ended = true;
	    process.nextTick(function() {
	      // Check that we didn't get one last unshift.
	      if (!state.endEmitted && state.length === 0) {
	        state.endEmitted = true;
	        stream.readable = false;
	        stream.emit('end');
	      }
	    });
	  }
	}
	
	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}
	
	function indexOf (xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }
	  return -1;
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	
	function isArray(arg) {
	  if (Array.isArray) {
	    return Array.isArray(arg);
	  }
	  return objectToString(arg) === '[object Array]';
	}
	exports.isArray = isArray;
	
	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;
	
	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;
	
	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;
	
	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;
	
	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;
	
	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;
	
	function isRegExp(re) {
	  return objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;
	
	function isDate(d) {
	  return objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;
	
	function isError(e) {
	  return (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;
	
	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;
	
	exports.isBuffer = Buffer.isBuffer;
	
	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12).Buffer))

/***/ },
/* 26 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 27 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// a duplex stream is just a stream that is both readable and writable.
	// Since JS doesn't have multiple prototypal inheritance, this class
	// prototypally inherits from Readable, and then parasitically from
	// Writable.
	
	module.exports = Duplex;
	
	/*<replacement>*/
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}
	/*</replacement>*/
	
	
	/*<replacement>*/
	var util = __webpack_require__(25);
	util.inherits = __webpack_require__(26);
	/*</replacement>*/
	
	var Readable = __webpack_require__(23);
	var Writable = __webpack_require__(29);
	
	util.inherits(Duplex, Readable);
	
	forEach(objectKeys(Writable.prototype), function(method) {
	  if (!Duplex.prototype[method])
	    Duplex.prototype[method] = Writable.prototype[method];
	});
	
	function Duplex(options) {
	  if (!(this instanceof Duplex))
	    return new Duplex(options);
	
	  Readable.call(this, options);
	  Writable.call(this, options);
	
	  if (options && options.readable === false)
	    this.readable = false;
	
	  if (options && options.writable === false)
	    this.writable = false;
	
	  this.allowHalfOpen = true;
	  if (options && options.allowHalfOpen === false)
	    this.allowHalfOpen = false;
	
	  this.once('end', onend);
	}
	
	// the no-half-open enforcer
	function onend() {
	  // if we allow half-open state, or if the writable side ended,
	  // then we're ok.
	  if (this.allowHalfOpen || this._writableState.ended)
	    return;
	
	  // no more data can be written.
	  // But allow more writes to happen in this tick.
	  process.nextTick(this.end.bind(this));
	}
	
	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// A bit simpler than readable streams.
	// Implement an async ._write(chunk, cb), and it'll handle all
	// the drain event emission and buffering.
	
	module.exports = Writable;
	
	/*<replacement>*/
	var Buffer = __webpack_require__(12).Buffer;
	/*</replacement>*/
	
	Writable.WritableState = WritableState;
	
	
	/*<replacement>*/
	var util = __webpack_require__(25);
	util.inherits = __webpack_require__(26);
	/*</replacement>*/
	
	var Stream = __webpack_require__(19);
	
	util.inherits(Writable, Stream);
	
	function WriteReq(chunk, encoding, cb) {
	  this.chunk = chunk;
	  this.encoding = encoding;
	  this.callback = cb;
	}
	
	function WritableState(options, stream) {
	  var Duplex = __webpack_require__(28);
	
	  options = options || {};
	
	  // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()
	  var hwm = options.highWaterMark;
	  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;
	
	  // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.
	  this.objectMode = !!options.objectMode;
	
	  if (stream instanceof Duplex)
	    this.objectMode = this.objectMode || !!options.writableObjectMode;
	
	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;
	
	  this.needDrain = false;
	  // at the start of calling end()
	  this.ending = false;
	  // when end() has been called, and returned
	  this.ended = false;
	  // when 'finish' is emitted
	  this.finished = false;
	
	  // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.
	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode;
	
	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';
	
	  // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.
	  this.length = 0;
	
	  // a flag to see when we're in the middle of a write.
	  this.writing = false;
	
	  // when true all writes will be buffered until .uncork() call
	  this.corked = 0;
	
	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;
	
	  // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.
	  this.bufferProcessing = false;
	
	  // the callback that's passed to _write(chunk,cb)
	  this.onwrite = function(er) {
	    onwrite(stream, er);
	  };
	
	  // the callback that the user supplies to write(chunk,encoding,cb)
	  this.writecb = null;
	
	  // the amount that is being written when _write is called.
	  this.writelen = 0;
	
	  this.buffer = [];
	
	  // number of pending user-supplied write callbacks
	  // this must be 0 before 'finish' can be emitted
	  this.pendingcb = 0;
	
	  // emit prefinish if the only thing we're waiting for is _write cbs
	  // This is relevant for synchronous Transform streams
	  this.prefinished = false;
	
	  // True if the error was already emitted and should not be thrown again
	  this.errorEmitted = false;
	}
	
	function Writable(options) {
	  var Duplex = __webpack_require__(28);
	
	  // Writable ctor is applied to Duplexes, though they're not
	  // instanceof Writable, they're instanceof Readable.
	  if (!(this instanceof Writable) && !(this instanceof Duplex))
	    return new Writable(options);
	
	  this._writableState = new WritableState(options, this);
	
	  // legacy.
	  this.writable = true;
	
	  Stream.call(this);
	}
	
	// Otherwise people can pipe Writable streams, which is just wrong.
	Writable.prototype.pipe = function() {
	  this.emit('error', new Error('Cannot pipe. Not readable.'));
	};
	
	
	function writeAfterEnd(stream, state, cb) {
	  var er = new Error('write after end');
	  // TODO: defer error events consistently everywhere, not just the cb
	  stream.emit('error', er);
	  process.nextTick(function() {
	    cb(er);
	  });
	}
	
	// If we get something that is not a buffer, string, null, or undefined,
	// and we're not in objectMode, then that's an error.
	// Otherwise stream chunks are all considered to be of length=1, and the
	// watermarks determine how many objects to keep in the buffer, rather than
	// how many bytes or characters.
	function validChunk(stream, state, chunk, cb) {
	  var valid = true;
	  if (!util.isBuffer(chunk) &&
	      !util.isString(chunk) &&
	      !util.isNullOrUndefined(chunk) &&
	      !state.objectMode) {
	    var er = new TypeError('Invalid non-string/buffer chunk');
	    stream.emit('error', er);
	    process.nextTick(function() {
	      cb(er);
	    });
	    valid = false;
	  }
	  return valid;
	}
	
	Writable.prototype.write = function(chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;
	
	  if (util.isFunction(encoding)) {
	    cb = encoding;
	    encoding = null;
	  }
	
	  if (util.isBuffer(chunk))
	    encoding = 'buffer';
	  else if (!encoding)
	    encoding = state.defaultEncoding;
	
	  if (!util.isFunction(cb))
	    cb = function() {};
	
	  if (state.ended)
	    writeAfterEnd(this, state, cb);
	  else if (validChunk(this, state, chunk, cb)) {
	    state.pendingcb++;
	    ret = writeOrBuffer(this, state, chunk, encoding, cb);
	  }
	
	  return ret;
	};
	
	Writable.prototype.cork = function() {
	  var state = this._writableState;
	
	  state.corked++;
	};
	
	Writable.prototype.uncork = function() {
	  var state = this._writableState;
	
	  if (state.corked) {
	    state.corked--;
	
	    if (!state.writing &&
	        !state.corked &&
	        !state.finished &&
	        !state.bufferProcessing &&
	        state.buffer.length)
	      clearBuffer(this, state);
	  }
	};
	
	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode &&
	      state.decodeStrings !== false &&
	      util.isString(chunk)) {
	    chunk = new Buffer(chunk, encoding);
	  }
	  return chunk;
	}
	
	// if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.
	function writeOrBuffer(stream, state, chunk, encoding, cb) {
	  chunk = decodeChunk(state, chunk, encoding);
	  if (util.isBuffer(chunk))
	    encoding = 'buffer';
	  var len = state.objectMode ? 1 : chunk.length;
	
	  state.length += len;
	
	  var ret = state.length < state.highWaterMark;
	  // we must ensure that previous needDrain will not be reset to false.
	  if (!ret)
	    state.needDrain = true;
	
	  if (state.writing || state.corked)
	    state.buffer.push(new WriteReq(chunk, encoding, cb));
	  else
	    doWrite(stream, state, false, len, chunk, encoding, cb);
	
	  return ret;
	}
	
	function doWrite(stream, state, writev, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  if (writev)
	    stream._writev(chunk, state.onwrite);
	  else
	    stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}
	
	function onwriteError(stream, state, sync, er, cb) {
	  if (sync)
	    process.nextTick(function() {
	      state.pendingcb--;
	      cb(er);
	    });
	  else {
	    state.pendingcb--;
	    cb(er);
	  }
	
	  stream._writableState.errorEmitted = true;
	  stream.emit('error', er);
	}
	
	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}
	
	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;
	
	  onwriteStateUpdate(state);
	
	  if (er)
	    onwriteError(stream, state, sync, er, cb);
	  else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(stream, state);
	
	    if (!finished &&
	        !state.corked &&
	        !state.bufferProcessing &&
	        state.buffer.length) {
	      clearBuffer(stream, state);
	    }
	
	    if (sync) {
	      process.nextTick(function() {
	        afterWrite(stream, state, finished, cb);
	      });
	    } else {
	      afterWrite(stream, state, finished, cb);
	    }
	  }
	}
	
	function afterWrite(stream, state, finished, cb) {
	  if (!finished)
	    onwriteDrain(stream, state);
	  state.pendingcb--;
	  cb();
	  finishMaybe(stream, state);
	}
	
	// Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.
	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	}
	
	
	// if there's something in the buffer waiting, then process it
	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;
	
	  if (stream._writev && state.buffer.length > 1) {
	    // Fast case, write everything using _writev()
	    var cbs = [];
	    for (var c = 0; c < state.buffer.length; c++)
	      cbs.push(state.buffer[c].callback);
	
	    // count the one we are adding, as well.
	    // TODO(isaacs) clean this up
	    state.pendingcb++;
	    doWrite(stream, state, true, state.length, state.buffer, '', function(err) {
	      for (var i = 0; i < cbs.length; i++) {
	        state.pendingcb--;
	        cbs[i](err);
	      }
	    });
	
	    // Clear buffer
	    state.buffer = [];
	  } else {
	    // Slow case, write chunks one-by-one
	    for (var c = 0; c < state.buffer.length; c++) {
	      var entry = state.buffer[c];
	      var chunk = entry.chunk;
	      var encoding = entry.encoding;
	      var cb = entry.callback;
	      var len = state.objectMode ? 1 : chunk.length;
	
	      doWrite(stream, state, false, len, chunk, encoding, cb);
	
	      // if we didn't call the onwrite immediately, then
	      // it means that we need to wait until it does.
	      // also, that means that the chunk and cb are currently
	      // being processed, so move the buffer counter past them.
	      if (state.writing) {
	        c++;
	        break;
	      }
	    }
	
	    if (c < state.buffer.length)
	      state.buffer = state.buffer.slice(c);
	    else
	      state.buffer.length = 0;
	  }
	
	  state.bufferProcessing = false;
	}
	
	Writable.prototype._write = function(chunk, encoding, cb) {
	  cb(new Error('not implemented'));
	
	};
	
	Writable.prototype._writev = null;
	
	Writable.prototype.end = function(chunk, encoding, cb) {
	  var state = this._writableState;
	
	  if (util.isFunction(chunk)) {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (util.isFunction(encoding)) {
	    cb = encoding;
	    encoding = null;
	  }
	
	  if (!util.isNullOrUndefined(chunk))
	    this.write(chunk, encoding);
	
	  // .end() fully uncorks
	  if (state.corked) {
	    state.corked = 1;
	    this.uncork();
	  }
	
	  // ignore unnecessary end() calls.
	  if (!state.ending && !state.finished)
	    endWritable(this, state, cb);
	};
	
	
	function needFinish(stream, state) {
	  return (state.ending &&
	          state.length === 0 &&
	          !state.finished &&
	          !state.writing);
	}
	
	function prefinish(stream, state) {
	  if (!state.prefinished) {
	    state.prefinished = true;
	    stream.emit('prefinish');
	  }
	}
	
	function finishMaybe(stream, state) {
	  var need = needFinish(stream, state);
	  if (need) {
	    if (state.pendingcb === 0) {
	      prefinish(stream, state);
	      state.finished = true;
	      stream.emit('finish');
	    } else
	      prefinish(stream, state);
	  }
	  return need;
	}
	
	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);
	  if (cb) {
	    if (state.finished)
	      process.nextTick(cb);
	    else
	      stream.once('finish', cb);
	  }
	  state.ended = true;
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var Buffer = __webpack_require__(12).Buffer;
	
	var isBufferEncoding = Buffer.isEncoding
	  || function(encoding) {
	       switch (encoding && encoding.toLowerCase()) {
	         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
	         default: return false;
	       }
	     }
	
	
	function assertEncoding(encoding) {
	  if (encoding && !isBufferEncoding(encoding)) {
	    throw new Error('Unknown encoding: ' + encoding);
	  }
	}
	
	// StringDecoder provides an interface for efficiently splitting a series of
	// buffers into a series of JS strings without breaking apart multi-byte
	// characters. CESU-8 is handled as part of the UTF-8 encoding.
	//
	// @TODO Handling all encodings inside a single object makes it very difficult
	// to reason about this code, so it should be split up in the future.
	// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
	// points as used by CESU-8.
	var StringDecoder = exports.StringDecoder = function(encoding) {
	  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
	  assertEncoding(encoding);
	  switch (this.encoding) {
	    case 'utf8':
	      // CESU-8 represents each of Surrogate Pair by 3-bytes
	      this.surrogateSize = 3;
	      break;
	    case 'ucs2':
	    case 'utf16le':
	      // UTF-16 represents each of Surrogate Pair by 2-bytes
	      this.surrogateSize = 2;
	      this.detectIncompleteChar = utf16DetectIncompleteChar;
	      break;
	    case 'base64':
	      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
	      this.surrogateSize = 3;
	      this.detectIncompleteChar = base64DetectIncompleteChar;
	      break;
	    default:
	      this.write = passThroughWrite;
	      return;
	  }
	
	  // Enough space to store all bytes of a single character. UTF-8 needs 4
	  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
	  this.charBuffer = new Buffer(6);
	  // Number of bytes received for the current incomplete multi-byte character.
	  this.charReceived = 0;
	  // Number of bytes expected for the current incomplete multi-byte character.
	  this.charLength = 0;
	};
	
	
	// write decodes the given buffer and returns it as JS string that is
	// guaranteed to not contain any partial multi-byte characters. Any partial
	// character found at the end of the buffer is buffered up, and will be
	// returned when calling write again with the remaining bytes.
	//
	// Note: Converting a Buffer containing an orphan surrogate to a String
	// currently works, but converting a String to a Buffer (via `new Buffer`, or
	// Buffer#write) will replace incomplete surrogates with the unicode
	// replacement character. See https://codereview.chromium.org/121173009/ .
	StringDecoder.prototype.write = function(buffer) {
	  var charStr = '';
	  // if our last write ended with an incomplete multibyte character
	  while (this.charLength) {
	    // determine how many remaining bytes this buffer has to offer for this char
	    var available = (buffer.length >= this.charLength - this.charReceived) ?
	        this.charLength - this.charReceived :
	        buffer.length;
	
	    // add the new bytes to the char buffer
	    buffer.copy(this.charBuffer, this.charReceived, 0, available);
	    this.charReceived += available;
	
	    if (this.charReceived < this.charLength) {
	      // still not enough chars in this buffer? wait for more ...
	      return '';
	    }
	
	    // remove bytes belonging to the current character from the buffer
	    buffer = buffer.slice(available, buffer.length);
	
	    // get the character that was split
	    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);
	
	    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	    var charCode = charStr.charCodeAt(charStr.length - 1);
	    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	      this.charLength += this.surrogateSize;
	      charStr = '';
	      continue;
	    }
	    this.charReceived = this.charLength = 0;
	
	    // if there are no more bytes in this buffer, just emit our char
	    if (buffer.length === 0) {
	      return charStr;
	    }
	    break;
	  }
	
	  // determine and set charLength / charReceived
	  this.detectIncompleteChar(buffer);
	
	  var end = buffer.length;
	  if (this.charLength) {
	    // buffer the incomplete character bytes we got
	    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
	    end -= this.charReceived;
	  }
	
	  charStr += buffer.toString(this.encoding, 0, end);
	
	  var end = charStr.length - 1;
	  var charCode = charStr.charCodeAt(end);
	  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	    var size = this.surrogateSize;
	    this.charLength += size;
	    this.charReceived += size;
	    this.charBuffer.copy(this.charBuffer, size, 0, size);
	    buffer.copy(this.charBuffer, 0, 0, size);
	    return charStr.substring(0, end);
	  }
	
	  // or just emit the charStr
	  return charStr;
	};
	
	// detectIncompleteChar determines if there is an incomplete UTF-8 character at
	// the end of the given buffer. If so, it sets this.charLength to the byte
	// length that character, and sets this.charReceived to the number of bytes
	// that are available for this character.
	StringDecoder.prototype.detectIncompleteChar = function(buffer) {
	  // determine how many bytes we have to check at the end of this buffer
	  var i = (buffer.length >= 3) ? 3 : buffer.length;
	
	  // Figure out if one of the last i bytes of our buffer announces an
	  // incomplete char.
	  for (; i > 0; i--) {
	    var c = buffer[buffer.length - i];
	
	    // See http://en.wikipedia.org/wiki/UTF-8#Description
	
	    // 110XXXXX
	    if (i == 1 && c >> 5 == 0x06) {
	      this.charLength = 2;
	      break;
	    }
	
	    // 1110XXXX
	    if (i <= 2 && c >> 4 == 0x0E) {
	      this.charLength = 3;
	      break;
	    }
	
	    // 11110XXX
	    if (i <= 3 && c >> 3 == 0x1E) {
	      this.charLength = 4;
	      break;
	    }
	  }
	  this.charReceived = i;
	};
	
	StringDecoder.prototype.end = function(buffer) {
	  var res = '';
	  if (buffer && buffer.length)
	    res = this.write(buffer);
	
	  if (this.charReceived) {
	    var cr = this.charReceived;
	    var buf = this.charBuffer;
	    var enc = this.encoding;
	    res += buf.slice(0, cr).toString(enc);
	  }
	
	  return res;
	};
	
	function passThroughWrite(buffer) {
	  return buffer.toString(this.encoding);
	}
	
	function utf16DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 2;
	  this.charLength = this.charReceived ? 2 : 0;
	}
	
	function base64DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 3;
	  this.charLength = this.charReceived ? 3 : 0;
	}


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	
	// a transform stream is a readable/writable stream where you do
	// something with the data.  Sometimes it's called a "filter",
	// but that's not a great name for it, since that implies a thing where
	// some bits pass through, and others are simply ignored.  (That would
	// be a valid example of a transform, of course.)
	//
	// While the output is causally related to the input, it's not a
	// necessarily symmetric or synchronous transformation.  For example,
	// a zlib stream might take multiple plain-text writes(), and then
	// emit a single compressed chunk some time in the future.
	//
	// Here's how this works:
	//
	// The Transform stream has all the aspects of the readable and writable
	// stream classes.  When you write(chunk), that calls _write(chunk,cb)
	// internally, and returns false if there's a lot of pending writes
	// buffered up.  When you call read(), that calls _read(n) until
	// there's enough pending readable data buffered up.
	//
	// In a transform stream, the written data is placed in a buffer.  When
	// _read(n) is called, it transforms the queued up data, calling the
	// buffered _write cb's as it consumes chunks.  If consuming a single
	// written chunk would result in multiple output chunks, then the first
	// outputted bit calls the readcb, and subsequent chunks just go into
	// the read buffer, and will cause it to emit 'readable' if necessary.
	//
	// This way, back-pressure is actually determined by the reading side,
	// since _read has to be called to start processing a new chunk.  However,
	// a pathological inflate type of transform can cause excessive buffering
	// here.  For example, imagine a stream where every byte of input is
	// interpreted as an integer from 0-255, and then results in that many
	// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
	// 1kb of data being output.  In this case, you could write a very small
	// amount of input, and end up with a very large amount of output.  In
	// such a pathological inflating mechanism, there'd be no way to tell
	// the system to stop doing the transform.  A single 4MB write could
	// cause the system to run out of memory.
	//
	// However, even in such a pathological case, only a single written chunk
	// would be consumed, and then the rest would wait (un-transformed) until
	// the results of the previous transformed chunk were consumed.
	
	module.exports = Transform;
	
	var Duplex = __webpack_require__(28);
	
	/*<replacement>*/
	var util = __webpack_require__(25);
	util.inherits = __webpack_require__(26);
	/*</replacement>*/
	
	util.inherits(Transform, Duplex);
	
	
	function TransformState(options, stream) {
	  this.afterTransform = function(er, data) {
	    return afterTransform(stream, er, data);
	  };
	
	  this.needTransform = false;
	  this.transforming = false;
	  this.writecb = null;
	  this.writechunk = null;
	}
	
	function afterTransform(stream, er, data) {
	  var ts = stream._transformState;
	  ts.transforming = false;
	
	  var cb = ts.writecb;
	
	  if (!cb)
	    return stream.emit('error', new Error('no writecb in Transform class'));
	
	  ts.writechunk = null;
	  ts.writecb = null;
	
	  if (!util.isNullOrUndefined(data))
	    stream.push(data);
	
	  if (cb)
	    cb(er);
	
	  var rs = stream._readableState;
	  rs.reading = false;
	  if (rs.needReadable || rs.length < rs.highWaterMark) {
	    stream._read(rs.highWaterMark);
	  }
	}
	
	
	function Transform(options) {
	  if (!(this instanceof Transform))
	    return new Transform(options);
	
	  Duplex.call(this, options);
	
	  this._transformState = new TransformState(options, this);
	
	  // when the writable side finishes, then flush out anything remaining.
	  var stream = this;
	
	  // start out asking for a readable event once data is transformed.
	  this._readableState.needReadable = true;
	
	  // we have implemented the _read method, and done the other things
	  // that Readable wants before the first _read call, so unset the
	  // sync guard flag.
	  this._readableState.sync = false;
	
	  this.once('prefinish', function() {
	    if (util.isFunction(this._flush))
	      this._flush(function(er) {
	        done(stream, er);
	      });
	    else
	      done(stream);
	  });
	}
	
	Transform.prototype.push = function(chunk, encoding) {
	  this._transformState.needTransform = false;
	  return Duplex.prototype.push.call(this, chunk, encoding);
	};
	
	// This is the part where you do stuff!
	// override this function in implementation classes.
	// 'chunk' is an input chunk.
	//
	// Call `push(newChunk)` to pass along transformed output
	// to the readable side.  You may call 'push' zero or more times.
	//
	// Call `cb(err)` when you are done with this chunk.  If you pass
	// an error, then that'll put the hurt on the whole operation.  If you
	// never call cb(), then you'll never get another chunk.
	Transform.prototype._transform = function(chunk, encoding, cb) {
	  throw new Error('not implemented');
	};
	
	Transform.prototype._write = function(chunk, encoding, cb) {
	  var ts = this._transformState;
	  ts.writecb = cb;
	  ts.writechunk = chunk;
	  ts.writeencoding = encoding;
	  if (!ts.transforming) {
	    var rs = this._readableState;
	    if (ts.needTransform ||
	        rs.needReadable ||
	        rs.length < rs.highWaterMark)
	      this._read(rs.highWaterMark);
	  }
	};
	
	// Doesn't matter what the args are here.
	// _transform does all the work.
	// That we got here means that the readable side wants more data.
	Transform.prototype._read = function(n) {
	  var ts = this._transformState;
	
	  if (!util.isNull(ts.writechunk) && ts.writecb && !ts.transforming) {
	    ts.transforming = true;
	    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
	  } else {
	    // mark that we need a transform, so that any data that comes in
	    // will get processed, now that we've asked for it.
	    ts.needTransform = true;
	  }
	};
	
	
	function done(stream, er) {
	  if (er)
	    return stream.emit('error', er);
	
	  // if there's nothing in the write buffer, then that means
	  // that nothing more will ever be provided
	  var ws = stream._writableState;
	  var ts = stream._transformState;
	
	  if (ws.length)
	    throw new Error('calling transform done when ws.length != 0');
	
	  if (ts.transforming)
	    throw new Error('calling transform done when still transforming');
	
	  return stream.push(null);
	}


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// a passthrough stream.
	// basically just the most minimal sort of Transform stream.
	// Every written chunk gets output as-is.
	
	module.exports = PassThrough;
	
	var Transform = __webpack_require__(31);
	
	/*<replacement>*/
	var util = __webpack_require__(25);
	util.inherits = __webpack_require__(26);
	/*</replacement>*/
	
	util.inherits(PassThrough, Transform);
	
	function PassThrough(options) {
	  if (!(this instanceof PassThrough))
	    return new PassThrough(options);
	
	  Transform.call(this, options);
	}
	
	PassThrough.prototype._transform = function(chunk, encoding, cb) {
	  cb(null, chunk);
	};


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(29)


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(28)


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(31)


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(32)


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	/*!
	 * Canvas - PDFStream
	 */
	
	/**
	 * Module dependencies.
	 */
	
	var Stream = __webpack_require__(19).Stream;
	
	/**
	 * Initialize a `PDFStream` with the given `canvas`.
	 *
	 * "data" events are emitted with `Buffer` chunks, once complete the
	 * "end" event is emitted. The following example will stream to a file
	 * named "./my.pdf".
	 *
	 *     var out = fs.createWriteStream(__dirname + '/my.pdf')
	 *       , stream = canvas.createPDFStream();
	 *
	 *     stream.pipe(out);
	 *
	 * @param {Canvas} canvas
	 * @param {Boolean} sync
	 * @api public
	 */
	
	var PDFStream = module.exports = function PDFStream(canvas, sync) {
	  var self = this
	    , method = sync
	      ? 'streamPDFSync'
	      : 'streamPDF';
	  this.sync = sync;
	  this.canvas = canvas;
	  this.readable = true;
	  // TODO: implement async
	  if ('streamPDF' == method) method = 'streamPDFSync';
	  process.nextTick(function(){
	    canvas[method](function(err, chunk, len){
	      if (err) {
	        self.emit('error', err);
	        self.readable = false;
	      } else if (len) {
	        self.emit('data', chunk, len);
	      } else {
	        self.emit('end');
	        self.readable = false;
	      }
	    });
	  });
	};
	
	/**
	 * Inherit from `EventEmitter`.
	 */
	
	PDFStream.prototype.__proto__ = Stream.prototype;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	/*!
	 * Canvas - JPEGStream
	 * Copyright (c) 2010 LearnBoost <tj@learnboost.com>
	 * MIT Licensed
	 */
	
	/**
	 * Module dependencies.
	 */
	
	var Stream = __webpack_require__(19).Stream;
	
	/**
	 * Initialize a `JPEGStream` with the given `canvas`.
	 *
	 * "data" events are emitted with `Buffer` chunks, once complete the
	 * "end" event is emitted. The following example will stream to a file
	 * named "./my.jpeg".
	 *
	 *     var out = fs.createWriteStream(__dirname + '/my.jpeg')
	 *       , stream = canvas.createJPEGStream();
	 *
	 *     stream.pipe(out);
	 *
	 * @param {Canvas} canvas
	 * @param {Boolean} sync
	 * @api public
	 */
	
	var JPEGStream = module.exports = function JPEGStream(canvas, options, sync) {
	  var self = this
	    , method = sync
	      ? 'streamJPEGSync'
	      : 'streamJPEG';
	  this.options = options;
	  this.sync = sync;
	  this.canvas = canvas;
	  this.readable = true;
	  // TODO: implement async
	  if ('streamJPEG' == method) method = 'streamJPEGSync';
	  process.nextTick(function(){
	    canvas[method](options.bufsize, options.quality, options.progressive, function(err, chunk){
	      if (err) {
	        self.emit('error', err);
	        self.readable = false;
	      } else if (chunk) {
	        self.emit('data', chunk);
	      } else {
	        self.emit('end');
	        self.readable = false;
	      }
	    });
	  });
	};
	
	/**
	 * Inherit from `EventEmitter`.
	 */
	
	JPEGStream.prototype.__proto__ = Stream.prototype;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 39 */,
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';
	
	/*!
	 * Canvas - Image
	 * Copyright (c) 2010 LearnBoost <tj@learnboost.com>
	 * MIT Licensed
	 */
	
	/**
	 * Module dependencies.
	 */
	
	var Canvas = __webpack_require__(16)
	  , Image = Canvas.Image;
	
	/**
	 * Src setter.
	 *
	 *  - convert data uri to `Buffer`
	 *
	 * @param {String|Buffer} val filename, buffer, data uri
	 * @api public
	 */
	
	Image.prototype.__defineSetter__('src', function(val){
	  if ('string' == typeof val && 0 == val.indexOf('data:')) {
	    val = val.slice(val.indexOf(',') + 1);
	    this.source = new Buffer(val, 'base64');
	  } else {
	    this.source = val;
	  }
	});
	
	/**
	 * Src getter.
	 *
	 * TODO: return buffer
	 *
	 * @api public
	 */
	
	Image.prototype.__defineGetter__('src', function(){
	  return this.source;
	});
	
	/**
	 * Inspect image.
	 *
	 * TODO: indicate that the .src was a buffer, data uri etc
	 *
	 * @return {String}
	 * @api public
	 */
	
	Image.prototype.inspect = function(){
	  return '[Image'
	    + (this.complete ? ':' + this.width + 'x' + this.height : '')
	    + (this.src ? ' ' + this.src : '')
	    + (this.complete ? ' complete' : '')
	    + ']';
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12).Buffer))

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./createjs/events/Event.js": 42,
		"./createjs/events/EventDispatcher.js": 43,
		"./createjs/utils/IndexOf.js": 44,
		"./easeljs/display/Bitmap.js": 45,
		"./easeljs/display/BitmapAnimation.js": 46,
		"./easeljs/display/BitmapText.js": 47,
		"./easeljs/display/Container.js": 48,
		"./easeljs/display/DisplayObject.js": 49,
		"./easeljs/display/Graphics.js": 50,
		"./easeljs/display/MovieClip.js": 51,
		"./easeljs/display/Shadow.js": 52,
		"./easeljs/display/Shape.js": 53,
		"./easeljs/display/Sprite.js": 54,
		"./easeljs/display/SpriteSheet.js": 55,
		"./easeljs/display/Stage.js": 56,
		"./easeljs/display/Text.js": 57,
		"./easeljs/events/MouseEvent.js": 58,
		"./easeljs/filters/AlphaMapFilter.js": 59,
		"./easeljs/filters/AlphaMaskFilter.js": 60,
		"./easeljs/filters/BlurFilter.js": 61,
		"./easeljs/filters/ColorFilter.js": 62,
		"./easeljs/filters/ColorMatrix.js": 63,
		"./easeljs/filters/ColorMatrixFilter.js": 64,
		"./easeljs/filters/Filter.js": 65,
		"./easeljs/geom/Matrix2D.js": 66,
		"./easeljs/geom/Point.js": 67,
		"./easeljs/geom/Rectangle.js": 68,
		"./easeljs/utils/SpriteSheetBuilder.js": 69,
		"./easeljs/utils/SpriteSheetUtils.js": 70,
		"./easeljs/utils/Ticker.js": 71,
		"./easeljs/utils/UID.js": 72,
		"./easeljs/version.js": 73,
		"./easeljs/version_movieclip.js": 74,
		"./node-easel.js": 10,
		"./tweenjs/CSSPlugin.js": 75,
		"./tweenjs/Ease.js": 76,
		"./tweenjs/MotionGuidePlugin.js": 77,
		"./tweenjs/Timeline.js": 78,
		"./tweenjs/Tween.js": 79,
		"./tweenjs/version.js": 80
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 41;


/***/ },
/* 42 */
/***/ function(module, exports) {

	/*
	* Event
	* Visit http://createjs.com/ for documentation, updates and examples.
	*
	* Copyright (c) 2010 gskinner.com, inc.
	*
	* Permission is hereby granted, free of charge, to any person
	* obtaining a copy of this software and associated documentation
	* files (the "Software"), to deal in the Software without
	* restriction, including without limitation the rights to use,
	* copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the
	* Software is furnished to do so, subject to the following
	* conditions:
	*
	* The above copyright notice and this permission notice shall be
	* included in all copies or substantial portions of the Software.
	*
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	* OTHER DEALINGS IN THE SOFTWARE.
	*/
	
	/**
	 * A collection of Classes that are shared across all the CreateJS libraries.  The classes are included in the minified
	 * files of each library and are available on the createsjs namespace directly.
	 *
	 * <h4>Example</h4>
	 *      myObject.addEventListener("change", createjs.proxy(myMethod, scope));
	 *
	 * @module CreateJS
	 * @main CreateJS
	 */
	
	// namespace:
	this.createjs = this.createjs||{};
	
	(function() {
		"use strict";
	
	/**
	 * Contains properties and methods shared by all events for use with
	 * {{#crossLink "EventDispatcher"}}{{/crossLink}}.
	 * 
	 * Note that Event objects are often reused, so you should never
	 * rely on an event object's state outside of the call stack it was received in.
	 * @class Event
	 * @param {String} type The event type.
	 * @param {Boolean} bubbles Indicates whether the event will bubble through the display list.
	 * @param {Boolean} cancelable Indicates whether the default behaviour of this event can be cancelled.
	 * @constructor
	 **/
	var Event = function(type, bubbles, cancelable) {
	  this.initialize(type, bubbles, cancelable);
	};
	var p = Event.prototype;
	
	// events:
	
	// public properties:
	
		/**
		 * The type of event.
		 * @property type
		 * @type String
		 **/
		p.type = null;
	
		/**
		 * The object that generated an event.
		 * @property target
		 * @type Object
		 * @default null
		 * @readonly
		*/
		p.target = null;
	
		/**
		 * The current target that a bubbling event is being dispatched from. For non-bubbling events, this will
		 * always be the same as target. For example, if childObj.parent = parentObj, and a bubbling event
		 * is generated from childObj, then a listener on parentObj would receive the event with
		 * target=childObj (the original target) and currentTarget=parentObj (where the listener was added).
		 * @property currentTarget
		 * @type Object
		 * @default null
		 * @readonly
		*/
		p.currentTarget = null;
	
		/**
		 * For bubbling events, this indicates the current event phase:<OL>
		 * 	<LI> capture phase: starting from the top parent to the target</LI>
		 * 	<LI> at target phase: currently being dispatched from the target</LI>
		 * 	<LI> bubbling phase: from the target to the top parent</LI>
		 * </OL>
		 * @property eventPhase
		 * @type Number
		 * @default 0
		 * @readonly
		*/
		p.eventPhase = 0;
	
		/**
		 * Indicates whether the event will bubble through the display list.
		 * @property bubbles
		 * @type Boolean
		 * @default false
		 * @readonly
		*/
		p.bubbles = false;
	
		/**
		 * Indicates whether the default behaviour of this event can be cancelled via
		 * {{#crossLink "Event/preventDefault"}}{{/crossLink}}. This is set via the Event constructor.
		 * @property cancelable
		 * @type Boolean
		 * @default false
		 * @readonly
		*/
		p.cancelable = false;
	
		/**
		 * The epoch time at which this event was created.
		 * @property timeStamp
		 * @type Number
		 * @default 0
		 * @readonly
		*/
		p.timeStamp = 0;
	
		/**
		 * Indicates if {{#crossLink "Event/preventDefault"}}{{/crossLink}} has been called
		 * on this event.
		 * @property defaultPrevented
		 * @type Boolean
		 * @default false
		 * @readonly
		*/
		p.defaultPrevented = false;
	
		/**
		 * Indicates if {{#crossLink "Event/stopPropagation"}}{{/crossLink}} or
		 * {{#crossLink "Event/stopImmediatePropagation"}}{{/crossLink}} has been called on this event.
		 * @property propagationStopped
		 * @type Boolean
		 * @default false
		 * @readonly
		*/
		p.propagationStopped = false;
	
		/**
		 * Indicates if {{#crossLink "Event/stopImmediatePropagation"}}{{/crossLink}} has been called
		 * on this event.
		 * @property immediatePropagationStopped
		 * @type Boolean
		 * @default false
		 * @readonly
		*/
		p.immediatePropagationStopped = false;
		
		/**
		 * Indicates if {{#crossLink "Event/remove"}}{{/crossLink}} has been called on this event.
		 * @property removed
		 * @type Boolean
		 * @default false
		 * @readonly
		*/
		p.removed = false;
	
	// constructor:
		/**
		 * Initialization method.
		 * @method initialize
		 * @param {String} type The event type.
		 * @param {Boolean} bubbles Indicates whether the event will bubble through the display list.
		 * @param {Boolean} cancelable Indicates whether the default behaviour of this event can be cancelled.
		 * @protected
		 **/
		p.initialize = function(type, bubbles, cancelable) {
			this.type = type;
			this.bubbles = bubbles;
			this.cancelable = cancelable;
			this.timeStamp = (new Date()).getTime();
		};
	
	// public methods:
	
		/**
		 * Sets {{#crossLink "Event/defaultPrevented"}}{{/crossLink}} to true.
		 * Mirrors the DOM event standard.
		 * @method preventDefault
		 **/
		p.preventDefault = function() {
			this.defaultPrevented = true;
		};
	
		/**
		 * Sets {{#crossLink "Event/propagationStopped"}}{{/crossLink}} to true.
		 * Mirrors the DOM event standard.
		 * @method stopPropagation
		 **/
		p.stopPropagation = function() {
			this.propagationStopped = true;
		};
	
		/**
		 * Sets {{#crossLink "Event/propagationStopped"}}{{/crossLink}} and
		 * {{#crossLink "Event/immediatePropagationStopped"}}{{/crossLink}} to true.
		 * Mirrors the DOM event standard.
		 * @method stopImmediatePropagation
		 **/
		p.stopImmediatePropagation = function() {
			this.immediatePropagationStopped = this.propagationStopped = true;
		};
		
		/**
		 * Causes the active listener to be removed via removeEventListener();
		 * 
		 * 		myBtn.addEventListener("click", function(evt) {
		 * 			// do stuff...
		 * 			evt.remove(); // removes this listener.
		 * 		});
		 * 
		 * @method remove
		 **/
		p.remove = function() {
			this.removed = true;
		};
		
		/**
		 * Returns a clone of the Event instance.
		 * @method clone
		 * @return {Event} a clone of the Event instance.
		 **/
		p.clone = function() {
			return new Event(this.type, this.bubbles, this.cancelable);
		};
	
		/**
		 * Returns a string representation of this object.
		 * @method toString
		 * @return {String} a string representation of the instance.
		 **/
		p.toString = function() {
			return "[Event (type="+this.type+")]";
		};
	
	createjs.Event = Event;
	}());


/***/ },
/* 43 */
/***/ function(module, exports) {

	/*
	* EventDispatcher
	* Visit http://createjs.com/ for documentation, updates and examples.
	*
	* Copyright (c) 2010 gskinner.com, inc.
	*
	* Permission is hereby granted, free of charge, to any person
	* obtaining a copy of this software and associated documentation
	* files (the "Software"), to deal in the Software without
	* restriction, including without limitation the rights to use,
	* copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the
	* Software is furnished to do so, subject to the following
	* conditions:
	*
	* The above copyright notice and this permission notice shall be
	* included in all copies or substantial portions of the Software.
	*
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	* OTHER DEALINGS IN THE SOFTWARE.
	*/
	
	/**
	 * @module CreateJS
	 */
	
	// namespace:
	this.createjs = this.createjs||{};
	
	(function() {
		"use strict";
	
	/**
	 * EventDispatcher provides methods for managing queues of event listeners and dispatching events.
	 *
	 * You can either extend EventDispatcher or mix its methods into an existing prototype or instance by using the
	 * EventDispatcher {{#crossLink "EventDispatcher/initialize"}}{{/crossLink}} method.
	 * 
	 * Together with the CreateJS Event class, EventDispatcher provides an extended event model that is based on the
	 * DOM Level 2 event model, including addEventListener, removeEventListener, and dispatchEvent. It supports
	 * bubbling / capture, preventDefault, stopPropagation, stopImmediatePropagation, and handleEvent.
	 * 
	 * EventDispatcher also exposes a {{#crossLink "EventDispatcher/on"}}{{/crossLink}} method, which makes it easier
	 * to create scoped listeners, listeners that only run once, and listeners with associated arbitrary data. The 
	 * {{#crossLink "EventDispatcher/off"}}{{/crossLink}} method is merely an alias to
	 * {{#crossLink "EventDispatcher/removeEventListener"}}{{/crossLink}}.
	 * 
	 * Another addition to the DOM Level 2 model is the {{#crossLink "EventDispatcher/removeAllEventListeners"}}{{/crossLink}}
	 * method, which can be used to listeners for all events, or listeners for a specific event. The Event object also 
	 * includes a {{#crossLink "Event/remove"}}{{/crossLink}} method which removes the active listener.
	 *
	 * <h4>Example</h4>
	 * Add EventDispatcher capabilities to the "MyClass" class.
	 *
	 *      EventDispatcher.initialize(MyClass.prototype);
	 *
	 * Add an event (see {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}}).
	 *
	 *      instance.addEventListener("eventName", handlerMethod);
	 *      function handlerMethod(event) {
	 *          console.log(event.target + " Was Clicked");
	 *      }
	 *
	 * <b>Maintaining proper scope</b><br />
	 * Scope (ie. "this") can be be a challenge with events. Using the {{#crossLink "EventDispatcher/on"}}{{/crossLink}}
	 * method to subscribe to events simplifies this.
	 *
	 *      instance.addEventListener("click", function(event) {
	 *          console.log(instance == this); // false, scope is ambiguous.
	 *      });
	 *      
	 *      instance.on("click", function(event) {
	 *          console.log(instance == this); // true, "on" uses dispatcher scope by default.
	 *      });
	 * 
	 * If you want to use addEventListener instead, you may want to use function.bind() or a similar proxy to manage scope.
	 *      
	 *
	 * @class EventDispatcher
	 * @constructor
	 **/
	var EventDispatcher = function() {
	/*	this.initialize(); */ // not needed.
	};
	var p = EventDispatcher.prototype;
	
	
		/**
		 * Static initializer to mix EventDispatcher methods into a target object or prototype.
		 * 
		 * 		EventDispatcher.initialize(MyClass.prototype); // add to the prototype of the class
		 * 		EventDispatcher.initialize(myObject); // add to a specific instance
		 * 
		 * @method initialize
		 * @static
		 * @param {Object} target The target object to inject EventDispatcher methods into. This can be an instance or a
		 * prototype.
		 **/
		EventDispatcher.initialize = function(target) {
			target.addEventListener = p.addEventListener;
			target.on = p.on;
			target.removeEventListener = target.off =  p.removeEventListener;
			target.removeAllEventListeners = p.removeAllEventListeners;
			target.hasEventListener = p.hasEventListener;
			target.dispatchEvent = p.dispatchEvent;
			target._dispatchEvent = p._dispatchEvent;
		};
		
	// constructor:
	
	// private properties:
		/**
		 * @protected
		 * @property _listeners
		 * @type Object
		 **/
		p._listeners = null;
	
		/**
		 * @protected
		 * @property _captureListeners
		 * @type Object
		 **/
		p._captureListeners = null;
	
	// constructor:
		/**
		 * Initialization method.
		 * @method initialize
		 * @protected
		 **/
		p.initialize = function() {};
	
	// public methods:
		/**
		 * Adds the specified event listener. Note that adding multiple listeners to the same function will result in
		 * multiple callbacks getting fired.
		 *
		 * <h4>Example</h4>
		 *
		 *      displayObject.addEventListener("click", handleClick);
		 *      function handleClick(event) {
		 *         // Click happened.
		 *      }
		 *
		 * @method addEventListener
		 * @param {String} type The string type of the event.
		 * @param {Function | Object} listener An object with a handleEvent method, or a function that will be called when
		 * the event is dispatched.
		 * @param {Boolean} [useCapture] For events that bubble, indicates whether to listen for the event in the capture or bubbling/target phase.
		 * @return {Function | Object} Returns the listener for chaining or assignment.
		 **/
		p.addEventListener = function(type, listener, useCapture) {
			var listeners;
			if (useCapture) {
				listeners = this._captureListeners = this._captureListeners||{};
			} else {
				listeners = this._listeners = this._listeners||{};
			}
			var arr = listeners[type];
			if (arr) { this.removeEventListener(type, listener, useCapture); }
			arr = listeners[type]; // remove may have deleted the array
			if (!arr) { listeners[type] = [listener];  }
			else { arr.push(listener); }
			return listener;
		};
		
		/**
		 * A shortcut method for using addEventListener that makes it easier to specify an execution scope, have a listener
		 * only run once, associate arbitrary data with the listener, and remove the listener.
		 * 
		 * This method works by creating an anonymous wrapper function and subscribing it with addEventListener.
		 * The created anonymous function is returned for use with .removeEventListener (or .off).
		 * 
		 * <h4>Example</h4>
		 * 
		 * 		var listener = myBtn.on("click", handleClick, null, false, {count:3});
		 * 		function handleClick(evt, data) {
		 * 			data.count -= 1;
		 * 			console.log(this == myBtn); // true - scope defaults to the dispatcher
		 * 			if (data.count == 0) {
		 * 				alert("clicked 3 times!");
		 * 				myBtn.off("click", listener);
		 * 				// alternately: evt.remove();
		 * 			}
		 * 		}
		 * 
		 * @method on
		 * @param {String} type The string type of the event.
		 * @param {Function | Object} listener An object with a handleEvent method, or a function that will be called when
		 * the event is dispatched.
		 * @param {Object} [scope] The scope to execute the listener in. Defaults to the dispatcher/currentTarget for function listeners, and to the listener itself for object listeners (ie. using handleEvent).
		 * @param {Boolean} [once=false] If true, the listener will remove itself after the first time it is triggered.
		 * @param {*} [data] Arbitrary data that will be included as the second parameter when the listener is called.
		 * @param {Boolean} [useCapture=false] For events that bubble, indicates whether to listen for the event in the capture or bubbling/target phase.
		 * @return {Function} Returns the anonymous function that was created and assigned as the listener. This is needed to remove the listener later using .removeEventListener.
		 **/
		p.on = function(type, listener, scope, once, data, useCapture) {
			if (listener.handleEvent) {
				scope = scope||listener;
				listener = listener.handleEvent;
			}
			scope = scope||this;
			return this.addEventListener(type, function(evt) {
					listener.call(scope, evt, data);
					once&&evt.remove();
				}, useCapture);
		};
	
		/**
		 * Removes the specified event listener.
		 *
		 * <b>Important Note:</b> that you must pass the exact function reference used when the event was added. If a proxy
		 * function, or function closure is used as the callback, the proxy/closure reference must be used - a new proxy or
		 * closure will not work.
		 *
		 * <h4>Example</h4>
		 *
		 *      displayObject.removeEventListener("click", handleClick);
		 *
		 * @method removeEventListener
		 * @param {String} type The string type of the event.
		 * @param {Function | Object} listener The listener function or object.
		 * @param {Boolean} [useCapture] For events that bubble, indicates whether to listen for the event in the capture or bubbling/target phase.
		 **/
		p.removeEventListener = function(type, listener, useCapture) {
			var listeners = useCapture ? this._captureListeners : this._listeners;
			if (!listeners) { return; }
			var arr = listeners[type];
			if (!arr) { return; }
			for (var i=0,l=arr.length; i<l; i++) {
				if (arr[i] == listener) {
					if (l==1) { delete(listeners[type]); } // allows for faster checks.
					else { arr.splice(i,1); }
					break;
				}
			}
		};
		
		/**
		 * A shortcut to the removeEventListener method, with the same parameters and return value. This is a companion to the
		 * .on method.
		 *
		 * @method off
		 * @param {String} type The string type of the event.
		 * @param {Function | Object} listener The listener function or object.
		 * @param {Boolean} [useCapture] For events that bubble, indicates whether to listen for the event in the capture or bubbling/target phase.
		 **/
		p.off = p.removeEventListener;
	
		/**
		 * Removes all listeners for the specified type, or all listeners of all types.
		 *
		 * <h4>Example</h4>
		 *
		 *      // Remove all listeners
		 *      displayObject.removeAllEvenListeners();
		 *
		 *      // Remove all click listeners
		 *      displayObject.removeAllEventListeners("click");
		 *
		 * @method removeAllEventListeners
		 * @param {String} [type] The string type of the event. If omitted, all listeners for all types will be removed.
		 **/
		p.removeAllEventListeners = function(type) {
			if (!type) { this._listeners = this._captureListeners = null; }
			else {
				if (this._listeners) { delete(this._listeners[type]); }
				if (this._captureListeners) { delete(this._captureListeners[type]); }
			}
		};
	
		/**
		 * Dispatches the specified event to all listeners.
		 *
		 * <h4>Example</h4>
		 *
		 *      // Use a string event
		 *      this.dispatchEvent("complete");
		 *
		 *      // Use an Event instance
		 *      var event = new createjs.Event("progress");
		 *      this.dispatchEvent(event);
		 *
		 * @method dispatchEvent
		 * @param {Object | String | Event} eventObj An object with a "type" property, or a string type.
		 * While a generic object will work, it is recommended to use a CreateJS Event instance. If a string is used,
		 * dispatchEvent will construct an Event instance with the specified type.
		 * @param {Object} [target] The object to use as the target property of the event object. This will default to the
		 * dispatching object. <b>This parameter is deprecated and will be removed.</b>
		 * @return {Boolean} Returns the value of eventObj.defaultPrevented.
		 **/
		p.dispatchEvent = function(eventObj, target) {
			if (typeof eventObj == "string") {
				// won't bubble, so skip everything if there's no listeners:
				var listeners = this._listeners;
				if (!listeners || !listeners[eventObj]) { return false; }
				eventObj = new createjs.Event(eventObj);
			}
			// TODO: deprecated. Target param is deprecated, only use case is MouseEvent/mousemove, remove.
			eventObj.target = target||this;
	
			if (!eventObj.bubbles || !this.parent) {
				this._dispatchEvent(eventObj, 2);
			} else {
				var top=this, list=[top];
				while (top.parent) { list.push(top = top.parent); }
				var i, l=list.length;
	
				// capture & atTarget
				for (i=l-1; i>=0 && !eventObj.propagationStopped; i--) {
					list[i]._dispatchEvent(eventObj, 1+(i==0));
				}
				// bubbling
				for (i=1; i<l && !eventObj.propagationStopped; i++) {
					list[i]._dispatchEvent(eventObj, 3);
				}
			}
			return eventObj.defaultPrevented;
		};
	
		/**
		 * Indicates whether there is at least one listener for the specified event type and `useCapture` value.
		 * @method hasEventListener
		 * @param {String} type The string type of the event.
		 * @return {Boolean} Returns true if there is at least one listener for the specified event.
		 **/
		p.hasEventListener = function(type) {
			var listeners = this._listeners, captureListeners = this._captureListeners;
			return !!((listeners && listeners[type]) || (captureListeners && captureListeners[type]));
		};
	
		/**
		 * @method toString
		 * @return {String} a string representation of the instance.
		 **/
		p.toString = function() {
			return "[EventDispatcher]";
		};
	
	// private methods:
		/**
		 * @method _dispatchEvent
		 * @param {Object | String | Event} eventObj
		 * @param {Object} eventPhase
		 * @protected
		 **/
		p._dispatchEvent = function(eventObj, eventPhase) {
			var l, listeners = (eventPhase==1) ? this._captureListeners : this._listeners;
			if (eventObj && listeners) {
				var arr = listeners[eventObj.type];
				if (!arr||!(l=arr.length)) { return; }
				eventObj.currentTarget = this;
				eventObj.eventPhase = eventPhase;
				eventObj.removed = false;
				arr = arr.slice(); // to avoid issues with items being removed or added during the dispatch
				for (var i=0; i<l && !eventObj.immediatePropagationStopped; i++) {
					var o = arr[i];
					if (o.handleEvent) { o.handleEvent(eventObj); }
					else { o(eventObj); }
					if (eventObj.removed) {
						this.off(eventObj.type, o, eventPhase==1);
						eventObj.removed = false;
					}
				}
			}
		};
	
	
	createjs.EventDispatcher = EventDispatcher;
	}());


/***/ },
/* 44 */
/***/ function(module, exports) {

	/*
	* IndexOf
	* Visit http://createjs.com/ for documentation, updates and examples.
	*
	* Copyright (c) 2010 gskinner.com, inc.
	* 
	* Permission is hereby granted, free of charge, to any person
	* obtaining a copy of this software and associated documentation
	* files (the "Software"), to deal in the Software without
	* restriction, including without limitation the rights to use,
	* copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the
	* Software is furnished to do so, subject to the following
	* conditions:
	* 
	* The above copyright notice and this permission notice shall be
	* included in all copies or substantial portions of the Software.
	* 
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	* OTHER DEALINGS IN THE SOFTWARE.
	*/
	
	/**
	  * @module CreateJS
	 */
	
	// namespace:
	this.createjs = this.createjs||{};
	
	/**
	 * @class Utility Methods
	 */
	(function() {
		"use strict";
	
		/*
		 * Employs Duff's Device to make a more performant implementation of indexOf.
		 * see http://jsperf.com/duffs-indexof/2
		 * #method indexOf
		 * @param {Array} array Array to search for searchElement
		 * @param searchElement Element to search array for.
		 * @return {Number} The position of the first occurrence of a specified value searchElement in the passed in array ar.
		 * @constructor
		 */
		/* replaced with simple for loop for now, perhaps will be researched further
		createjs.indexOf = function (ar, searchElement) {
			var l = ar.length;
	
			var n = (l * 0.125) ^ 0;	// 0.125 == 1/8, using multiplication because it's faster in some browsers	// ^0 floors result
			for (var i = 0; i < n; i++) {
				if(searchElement === ar[i*8])   { return (i*8);}
				if(searchElement === ar[i*8+1]) { return (i*8+1);}
				if(searchElement === ar[i*8+2]) { return (i*8+2);}
				if(searchElement === ar[i*8+3]) { return (i*8+3);}
				if(searchElement === ar[i*8+4]) { return (i*8+4);}
				if(searchElement === ar[i*8+5]) { return (i*8+5);}
				if(searchElement === ar[i*8+6]) { return (i*8+6);}
				if(searchElement === ar[i*8+7]) { return (i*8+7);}
			}
	
			var n = l % 8;
			for (var i = 0; i < n; i++) {
				if (searchElement === ar[l-n+i]) {
					return l-n+i;
				}
			}
	
			return -1;
		}
		*/
	
		/**
		 * Finds the first occurrence of a specified value searchElement in the passed in array, and returns the index of
		 * that value.  Returns -1 if value is not found.
		 *
		 *      var i = createjs.indexOf(myArray, myElementToFind);
		 *
		 * @method indexOf
		 * @param {Array} array Array to search for searchElement
		 * @param searchElement Element to find in array.
		 * @return {Number} The first index of searchElement in array.
		 */
		createjs.indexOf = function (array, searchElement){
			for (var i = 0,l=array.length; i < l; i++) {
				if (searchElement === array[i]) {
					return i;
				}
			}
			return -1;
		}
	
	}());

/***/ },
/* 45 */
/***/ function(module, exports) {

	/*
	* Bitmap
	* Visit http://createjs.com/ for documentation, updates and examples.
	*
	* Copyright (c) 2010 gskinner.com, inc.
	* 
	* Permission is hereby granted, free of charge, to any person
	* obtaining a copy of this software and associated documentation
	* files (the "Software"), to deal in the Software without
	* restriction, including without limitation the rights to use,
	* copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the
	* Software is furnished to do so, subject to the following
	* conditions:
	* 
	* The above copyright notice and this permission notice shall be
	* included in all copies or substantial portions of the Software.
	* 
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	* OTHER DEALINGS IN THE SOFTWARE.
	*/
	
	/**
	* @module EaselJS
	*/
	
	// namespace:
	this.createjs = this.createjs||{};
	
	(function() {
	
	/**
	 * A Bitmap represents an Image, Canvas, or Video in the display list. A Bitmap can be instantiated using an existing
	 * HTML element, or a string.
	 *
	 * <h4>Example</h4>
	 *      var bitmap = new createjs.Bitmap("imagePath.jpg");
	 *
	 * <strong>Notes:</strong>
	 * <ol>
	 *     <li>When a string path or image tag that is not yet loaded is used, the stage may need to be redrawn before it
	 *      will be displayed.</li>
	 *     <li>Bitmaps with an SVG source currently will not respect an alpha value other than 0 or 1. To get around this,
	 *     the Bitmap can be cached.</li>
	 *     <li>Bitmaps with an SVG source will taint the canvas with cross-origin data, which prevents interactivity. This
	 *     happens in all browsers except recent Firefox builds.</li>
	 * </ol>
	 *
	 * @class Bitmap
	 * @extends DisplayObject
	 * @constructor
	 * @param {Image | HTMLCanvasElement | HTMLVideoElement | String} imageOrUri The source object or URI to an image to
	 * display. This can be either an Image, Canvas, or Video object, or a string URI to an image file to load and use.
	 * If it is a URI, a new Image object will be constructed and assigned to the .image property.
	 **/
	var Bitmap = function(imageOrUri) {
	  this.initialize(imageOrUri);
	};
	var p = Bitmap.prototype = new createjs.DisplayObject();
	
	// public properties:
		/**
		 * The image to render. This can be an Image, a Canvas, or a Video.
		 * @property image
		 * @type Image | HTMLCanvasElement | HTMLVideoElement
		 **/
		p.image = null;
		
		/**
		 * Whether or not the Bitmap should be draw to the canvas at whole pixel coordinates.
		 * @property snapToPixel
		 * @type Boolean
		 * @default true
		 **/
		p.snapToPixel = true;
	
		/**
		 * Specifies an area of the source image to draw. If omitted, the whole image will be drawn.
		 * @property sourceRect
		 * @type Rectangle
		 * @default null
		 */
		p.sourceRect = null;
		
		// constructor:
	
		/**
		 * @property DisplayObject_initialize
		 * @type Function
		 * @private
		 **/
		p.DisplayObject_initialize = p.initialize;
	
		/** 
		 * Initialization method.
		 * @method initialize
		 * @param {Image | HTMLCanvasElement | HTMLVideoElement | String} imageOrUri The source object or URI to an image to
		 * display. This can be either an Image, Canvas, or Video object, or a string URI to an image file to load and use.
		 * If it is a URI, a new Image object will be constructed and assigned to the `.image` property.
		 * @protected
		 **/
		p.initialize = function(imageOrUri) {
			this.DisplayObject_initialize();
			if (typeof imageOrUri == "string") {
				this.image = new Image();
				this.image.src = imageOrUri;
			} else {
				this.image = imageOrUri;
			}
		};
		
	// public methods:
	
		/**
		 * Returns true or false indicating whether the display object would be visible if drawn to a canvas.
		 * This does not account for whether it would be visible within the boundaries of the stage.
		 *
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 * @method isVisible
		 * @return {Boolean} Boolean indicating whether the display object would be visible if drawn to a canvas
		 **/
		p.isVisible = function() {
			var hasContent = this.cacheCanvas || (this.image && (this.image.complete || this.image.getContext || this.image.readyState >= 2));
			return !!(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && hasContent);
		};
	
		/**
		 * @property DisplayObject_draw
		 * @type Function
		 * @protected
		 **/
		p.DisplayObject_draw = p.draw;
	
		/**
		 * Draws the display object into the specified context ignoring its visible, alpha, shadow, and transform.
		 * Returns true if the draw was handled (useful for overriding functionality).
		 *
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 * @method draw
		 * @param {CanvasRenderingContext2D} ctx The canvas 2D context object to draw into.
		 * @param {Boolean} ignoreCache Indicates whether the draw operation should ignore any current cache.
		 * For example, used for drawing the cache (to prevent it from simply drawing an existing cache back
		 * into itself).
		 **/
		p.draw = function(ctx, ignoreCache) {
			if (this.DisplayObject_draw(ctx, ignoreCache)) { return true; }
			var rect = this.sourceRect;
			if (rect) {
				ctx.drawImage(this.image, rect.x, rect.y, rect.width, rect.height, 0, 0, rect.width, rect.height);
			} else {
				ctx.drawImage(this.image, 0, 0);
			}
			return true;
		};
		
		//Note, the doc sections below document using the specified APIs (from DisplayObject)  from
		//Bitmap. This is why they have no method implementations.
		
		/**
		 * Because the content of a Bitmap is already in a simple format, cache is unnecessary for Bitmap instances.
		 * You should <b>not</b> cache Bitmap instances as it can degrade performance.
		 *
		 * <strong>However: If you want to use a filter on a Bitmap, you <em>MUST</em> cache it, or it will not work.</strong>
		 * To see the API for caching, please visit the DisplayObject {{#crossLink "DisplayObject/cache"}}{{/crossLink}}
		 * method.
		 * @method cache
		 **/
		
		/**
		 * Because the content of a Bitmap is already in a simple format, cache is unnecessary for Bitmap instances.
		 * You should <b>not</b> cache Bitmap instances as it can degrade performance.
		 *
		 * <strong>However: If you want to use a filter on a Bitmap, you <em>MUST</em> cache it, or it will not work.</strong>
		 * To see the API for caching, please visit the DisplayObject {{#crossLink "DisplayObject/cache"}}{{/crossLink}}
		 * method.
		 * @method updateCache
		 **/
		
		/**
		 * Because the content of a Bitmap is already in a simple format, cache is unnecessary for Bitmap instances.
		 * You should <b>not</b> cache Bitmap instances as it can degrade performance.
		 *
		 * <strong>However: If you want to use a filter on a Bitmap, you <em>MUST</em> cache it, or it will not work.</strong>
		 * To see the API for caching, please visit the DisplayObject {{#crossLink "DisplayObject/cache"}}{{/crossLink}}
		 * method.
		 * @method uncache
		 **/
		 
		/**
		 * @property DisplayObject_getBounds
		 * @type Function
		 * @protected
		 **/
		p.DisplayObject_getBounds = p.getBounds;
	
		/**
		 * Docced in superclass.
		 */
		p.getBounds = function() {
			var rect = this.DisplayObject_getBounds();
			if (rect) { return rect; }
			var o = this.sourceRect || this.image;
			var hasContent = (this.image && (this.image.complete || this.image.getContext || this.image.readyState >= 2));
			return hasContent ? this._rectangle.initialize(0, 0, o.width, o.height) : null;
		};
		
		/**
		 * Returns a clone of the Bitmap instance.
		 * @method clone
		 * @return {Bitmap} a clone of the Bitmap instance.
		 **/
		p.clone = function() {
			var o = new Bitmap(this.image);
			if (this.sourceRect) { o.sourceRect = this.sourceRect.clone(); }
			this.cloneProps(o);
			return o;
		};
		
		/**
		 * Returns a string representation of this object.
		 * @method toString
		 * @return {String} a string representation of the instance.
		 **/
		p.toString = function() {
			return "[Bitmap (name="+  this.name +")]";
		};
	
	// private methods:
	
	createjs.Bitmap = Bitmap;
	}());

/***/ },
/* 46 */
/***/ function(module, exports) {

	/*
	* BitmapAnimation
	* Visit http://createjs.com/ for documentation, updates and examples.
	*
	* Copyright (c) 2010 gskinner.com, inc.
	*
	* Permission is hereby granted, free of charge, to any person
	* obtaining a copy of this software and associated documentation
	* files (the "Software"), to deal in the Software without
	* restriction, including without limitation the rights to use,
	* copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the
	* Software is furnished to do so, subject to the following
	* conditions:
	*
	* The above copyright notice and this permission notice shall be
	* included in all copies or substantial portions of the Software.
	*
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	* OTHER DEALINGS IN THE SOFTWARE.
	*/
	
	// namespace:
	this.createjs = this.createjs||{};
	
	(function() {
		"use strict";
	/**
	 * Deprecated in favour of {{#crossLink "Sprite"}}{{/crossLink}}.
	 *
	 * @class BitmapAnimation
	 * @extends DisplayObject
	 * @constructor
	 * @param {SpriteSheet} spriteSheet The SpriteSheet instance to play back. This includes the source image(s), frame
	 * dimensions, and frame data. See {{#crossLink "SpriteSheet"}}{{/crossLink}} for more information.
	 * @deprecated Renamed to Sprite. Will be removed in a future version.
	 **/
	
	var e = "BitmapAnimation is deprecated in favour of Sprite. See VERSIONS file for info on changes.";
	if (!createjs.Sprite) { throw(e); }
	(createjs.BitmapAnimation = function(spriteSheet) {
	  console.log(e);
	  this.initialize(spriteSheet);
	}).prototype = new createjs.Sprite();
	})();


/***/ },
/* 47 */
/***/ function(module, exports) {

	/*
	* BitmapText
	* Visit http://createjs.com/ for documentation, updates and examples.
	*
	* Copyright (c) 2010 gskinner.com, inc.
	*
	* Permission is hereby granted, free of charge, to any person
	* obtaining a copy of this software and associated documentation
	* files (the "Software"), to deal in the Software without
	* restriction, including without limitation the rights to use,
	* copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the
	* Software is furnished to do so, subject to the following
	* conditions:
	*
	* The above copyright notice and this permission notice shall be
	* included in all copies or substantial portions of the Software.
	*
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	* OTHER DEALINGS IN THE SOFTWARE.
	*/
	
	this.createjs = this.createjs || {};
	
	(function () {
		"use strict";
	
	/**
	 * Displays text using bitmap glyphs defined in a sprite sheet. Multi-line text is supported
	 * using new line characters, but automatic wrapping is not supported. See the 
	 * {{#crossLink "BitmapText/spriteSheet:attribute"}}{{/crossLink}}
	 * property for more information on defining glyphs.
	 * @class BitmapText
	 * @extends DisplayObject
	 * @param {String} [text=""] The text to display.
	 * @param {SpriteSheet} [spriteSheet=null] The spritesheet that defines the character glyphs.
	 * @constructor
	 **/
	function BitmapText(text, spriteSheet) {
		this.initialize(text, spriteSheet);
	}
	var p = BitmapText.prototype = new createjs.DisplayObject();
	
	// static properties:
	
	// events:
	
	// public properties:
		/**
		 * The text to display.
		 * @property text
		 * @type String
		 * @default ""
		 **/
		p.text = "";
		
		/**
		 * A SpriteSheet instance that defines the glyphs for this bitmap text. Each glyph/character
		 * should have a single frame animation defined in the sprite sheet named the same as
		 * corresponding character. For example, the following animation definition:
		 *
		 * 		"A": {frames: [0]}
		 *
		 * would indicate that the frame at index 0 of the spritesheet should be drawn for the "A" character. The short form
		 * is also acceptable:
		 * 
		 * 		"A": 0
		 *
		 * Note that if a character in the text is not found in the sprite sheet, it will also
		 * try to use the alternate case (upper or lower).
		 *
		 * See SpriteSheet for more information on defining sprite sheet data.
		 * @property spriteSheet
		 * @type String
		 * @default null
		 **/
		p.spriteSheet = null;
	
		/**
		 * The height of each line of text. If 0, then it will use a line height calculated
		 * by checking for the height of the "1", "T", or "L" character (in that order). If
		 * those characters are not defined, it will use the height of the first frame of the
		 * sprite sheet.
		 * @property lineHeight
		 * @type Number
		 * @default 0
		 **/
		p.lineHeight = 0;
	
		/**
		 * This spacing (in pixels) will be added after each character in the output.
		 * @property letterSpacing
		 * @type Number
		 * @default 0
		 **/
		p.letterSpacing = 0;
	
		/**
		 * If a space character is not defined in the sprite sheet, then empty pixels equal to
		 * spaceWidth will be inserted instead. If  0, then it will use a value calculated
		 * by checking for the width of the "1", "E", or "A" character (in that order). If
		 * those characters are not defined, it will use the width of the first frame of the
		 * sprite sheet.
		 * @property spaceWidth
		 * @type Number
		 * @default 0
		 **/
		p.spaceWidth = 0;
		
	// private properties:
		
	// constructor:
		/**
		 * @property DisplayObject_initialize
		 * @type Function
		 * @protected
		 **/
		p.DisplayObject_initialize = p.initialize;
		
		/**
		 * Initialization method.
		 * @method initialize
		 * @param {String} [text=""] The text to display.
		 * @param {SpriteSheet} [spriteSheet=null] The spritesheet that defines the character glyphs.
		 * @protected
		 **/
		p.initialize = function (text, spriteSheet) {
			this.DisplayObject_initialize();
	
			this.text = text;
			this.spriteSheet = spriteSheet;
		};
		
	// public methods:
		/**
		 * @property DisplayObject_draw
		 * @type Function
		 * @protected
		 **/
		p.DisplayObject_draw = p.draw;
		
		/**
		 * Draws the display object into the specified context ignoring it's visible, alpha, shadow, and transform.
		 * Returns true if the draw was handled (useful for overriding functionality).
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 * @method draw
		 * @param {CanvasRenderingContext2D} ctx The canvas 2D context object to draw into.
		 * @param {Boolean} ignoreCache Indicates whether the draw operation should ignore any current cache.
		 * For example, used for drawing the cache (to prevent it from simply drawing an existing cache back
		 * into itself).
		 **/
		p.draw = function(ctx, ignoreCache) {
			if (this.DisplayObject_draw(ctx, ignoreCache)) { return true; }
			this._drawText(ctx);
		};
		
		/**
		 * Returns true or false indicating whether the display object would be visible if drawn to a canvas.
		 * This does not account for whether it would be visible within the boundaries of the stage.
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 * @method isVisible
		 * @return {Boolean} Boolean indicating whether the display object would be visible if drawn to a canvas
		 **/
		p.isVisible = function() {
			var hasContent = this.cacheCanvas || (this.spriteSheet && this.spriteSheet.complete && this.text);
			return !!(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && hasContent);
		};
		
		/**
		 * Docced in superclass.
		 */
		p.getBounds = function() {
			var bounds = this._rectangle;
			this._drawText(null, bounds);
			return bounds.width ? bounds : null;
		};
	
	// private methods:
		/**
		 * @method _getFrame
		 * @param {String} character
		 * @param {SpriteSheet} spriteSheet
		 * @protected
		 **/
		p._getFrame = function(character, spriteSheet) {
			var c, o = spriteSheet.getAnimation(character);
			if (!o) {
				(character != (c = character.toUpperCase())) || (character != (c = character.toLowerCase())) || (c=null);
				if (c) { o = spriteSheet.getAnimation(c); }
			}
			return o && spriteSheet.getFrame(o.frames[0]);
		};
		
		/**
		 * @method _getLineHeight
		 * @param {SpriteSheet} ss
		 * @protected
		 **/
		p._getLineHeight = function(ss) {
			var frame = this._getFrame("1",ss) || this._getFrame("T",ss) || this._getFrame("L",ss) || ss.getFrame(0);
			return frame ? frame.rect.height : 1;
		};
		
		/**
		 * @method _getSpaceWidth
		 * @param {SpriteSheet} ss
		 * @protected
		 **/
		p._getSpaceWidth = function(ss) {
			var frame = this._getFrame("1",ss) || this._getFrame("l",ss) || this._getFrame("e",ss) || this._getFrame("a",ss) || ss.getFrame(0);
			return frame ? frame.rect.width : 1;
		};
		
		/**
		 * @method _drawText
		 * @param {CanvasRenderingContext2D} ctx
		 * @param {Object | Rectangle} bounds
		 * @protected
		 **/
		p._drawText = function(ctx, bounds) {
			var w, h, rx, x=0, y=0, spaceW=this.spaceWidth, lineH=this.lineHeight, ss=this.spriteSheet;
					
			var hasSpace = !!this._getFrame(" ", ss);
			if (!hasSpace && spaceW==0) { spaceW = this._getSpaceWidth(ss); }
			if (lineH==0) { lineH = this._getLineHeight(ss); }
			
			var maxX = 0;
			for(var i=0, l=this.text.length; i<l; i++) {
				var character = this.text.charAt(i);
				if (!hasSpace && character == " ") {
					x += spaceW;
					continue;
				} else if (character=="\n" || character=="\r") {
					if (character=="\r" && this.text.charAt(i+1) == "\n") { i++; } // crlf
					if (x-rx > maxX) { maxX = x-rx; }
					x = 0;
					y += lineH;
					continue;
				}
	
				var o = this._getFrame(character, ss);
				if (!o) { continue; }
				var rect = o.rect;
				rx = o.regX;
				w = rect.width;
				ctx&&ctx.drawImage(o.image, rect.x, rect.y, w, h=rect.height, x-rx, y-o.regY, w, h);
				
				x += w + this.letterSpacing;
			}
			if (x-rx > maxX) { maxX = x-rx; }
			
			if (bounds) {
				bounds.width = maxX-this.letterSpacing;
				bounds.height = y+lineH;
			}
		};
	
		createjs.BitmapText = BitmapText;
	}());

/***/ },
/* 48 */
/***/ function(module, exports) {

	/*
	* Container
	* Visit http://createjs.com/ for documentation, updates and examples.
	*
	* Copyright (c) 2010 gskinner.com, inc.
	* 
	* Permission is hereby granted, free of charge, to any person
	* obtaining a copy of this software and associated documentation
	* files (the "Software"), to deal in the Software without
	* restriction, including without limitation the rights to use,
	* copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the
	* Software is furnished to do so, subject to the following
	* conditions:
	* 
	* The above copyright notice and this permission notice shall be
	* included in all copies or substantial portions of the Software.
	* 
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	* OTHER DEALINGS IN THE SOFTWARE.
	*/
	
	// namespace:
	this.createjs = this.createjs||{};
	
	(function() {
	
	/**
	 * A Container is a nestable display list that allows you to work with compound display elements. For  example you could
	 * group arm, leg, torso and head {{#crossLink "Bitmap"}}{{/crossLink}} instances together into a Person Container, and
	 * transform them as a group, while still being able to move the individual parts relative to each other. Children of
	 * containers have their <code>transform</code> and <code>alpha</code> properties concatenated with their parent
	 * Container.
	 *
	 * For example, a {{#crossLink "Shape"}}{{/crossLink}} with x=100 and alpha=0.5, placed in a Container with <code>x=50</code>
	 * and <code>alpha=0.7</code> will be rendered to the canvas at <code>x=150</code> and <code>alpha=0.35</code>.
	 * Containers have some overhead, so you generally shouldn't create a Container to hold a single child.
	 *
	 * <h4>Example</h4>
	 *      var container = new createjs.Container();
	 *      container.addChild(bitmapInstance, shapeInstance);
	 *      container.x = 100;
	 *
	 * @class Container
	 * @extends DisplayObject
	 * @constructor
	 **/
	var Container = function() {
	  this.initialize();
	};
	var p = Container.prototype = new createjs.DisplayObject();
	
	// public properties:
		/**
		 * The array of children in the display list. You should usually use the child management methods such as
		 * {{#crossLink "Container/addChild"}}{{/crossLink}}, {{#crossLink "Container/removeChild"}}{{/crossLink}},
		 * {{#crossLink "Container/swapChildren"}}{{/crossLink}}, etc, rather than accessing this directly, but it is
		 * included for advanced uses.
		 * @property children
		 * @type Array
		 * @default null
		 **/
		p.children = null;
		
		/**
		 * Indicates whether the children of this container are independently enabled for mouse/pointer interaction.
		 * If false, the children will be aggregated under the container - for example, a click on a child shape would
		 * trigger a click event on the container.
		 * @property mouseChildren
		 * @type Boolean
		 * @default true
		 **/
		p.mouseChildren = true;
	
	// constructor:
	
		/**
		 * @property DisplayObject_initialize
		 * @type Function
		 * @private
		 **/
		p.DisplayObject_initialize = p.initialize;
	
		/**
		 * Initialization method.
		 * @method initialize
		 * @protected
		*/
		p.initialize = function() {
			this.DisplayObject_initialize();
			this.children = [];
		};
	
	// public methods:
	
		/**
		 * Returns true or false indicating whether the display object would be visible if drawn to a canvas.
		 * This does not account for whether it would be visible within the boundaries of the stage.
		 *
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 * @method isVisible
		 * @return {Boolean} Boolean indicating whether the display object would be visible if drawn to a canvas
		 **/
		p.isVisible = function() {
			var hasContent = this.cacheCanvas || this.children.length;
			return !!(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && hasContent);
		};
	
		/**
		 * @property DisplayObject_draw
		 * @type Function
		 * @private
		 **/
		p.DisplayObject_draw = p.draw;
	
		/**
		 * Draws the display object into the specified context ignoring its visible, alpha, shadow, and transform.
		 * Returns true if the draw was handled (useful for overriding functionality).
		 *
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 * @method draw
		 * @param {CanvasRenderingContext2D} ctx The canvas 2D context object to draw into.
		 * @param {Boolean} [ignoreCache=false] Indicates whether the draw operation should ignore any current cache.
		 * For example, used for drawing the cache (to prevent it from simply drawing an existing cache back
		 * into itself).
		 **/
		p.draw = function(ctx, ignoreCache) {
			if (this.DisplayObject_draw(ctx, ignoreCache)) { return true; }
			
			// this ensures we don't have issues with display list changes that occur during a draw:
			var list = this.children.slice(0);
			for (var i=0,l=list.length; i<l; i++) {
				var child = list[i];
				if (!child.isVisible()) { continue; }
				
				// draw the child:
				ctx.save();
				child.updateContext(ctx);
				child.draw(ctx);
				ctx.restore();
			}
			return true;
		};
		
		/**
		 * Adds a child to the top of the display list.
		 *
		 * <h4>Example</h4>
		 *      container.addChild(bitmapInstance);
		 *
		 *  You can also add multiple children at once:
		 *
		 *      container.addChild(bitmapInstance, shapeInstance, textInstance);
		 *
		 * @method addChild
		 * @param {DisplayObject} child The display object to add.
		 * @return {DisplayObject} The child that was added, or the last child if multiple children were added.
		 **/
		p.addChild = function(child) {
			if (child == null) { return child; }
			var l = arguments.length;
			if (l > 1) {
				for (var i=0; i<l; i++) { this.addChild(arguments[i]); }
				return arguments[l-1];
			}
			if (child.parent) { child.parent.removeChild(child); }
			child.parent = this;
			this.children.push(child);
			return child;
		};
	
		/**
		 * Adds a child to the display list at the specified index, bumping children at equal or greater indexes up one, and
		 * setting its parent to this Container.
		 *
		 * <h4>Example</h4>
		 *      addChildAt(child1, index);
		 *
		 * You can also add multiple children, such as:
		 *
		 *      addChildAt(child1, child2, ..., index);
		 *
		 * The index must be between 0 and numChildren. For example, to add myShape under otherShape in the display list,
		 * you could use:
		 *
		 *      container.addChildAt(myShape, container.getChildIndex(otherShape));
		 *
		 * This would also bump otherShape's index up by one. Fails silently if the index is out of range.
		 *
		 * @method addChildAt
		 * @param {DisplayObject} child The display object to add.
		 * @param {Number} index The index to add the child at.
		 * @return {DisplayObject} Returns the last child that was added, or the last child if multiple children were added.
		 **/
		p.addChildAt = function(child, index) {
			var l = arguments.length;
			var indx = arguments[l-1]; // can't use the same name as the index param or it replaces arguments[1]
			if (indx < 0 || indx > this.children.length) { return arguments[l-2]; }
			if (l > 2) {
				for (var i=0; i<l-1; i++) { this.addChildAt(arguments[i], indx+i); }
				return arguments[l-2];
			}
			if (child.parent) { child.parent.removeChild(child); }
			child.parent = this;
			this.children.splice(index, 0, child);
			return child;
		};
	
		/**
		 * Removes the specified child from the display list. Note that it is faster to use removeChildAt() if the index is
		 * already known.
		 *
		 * <h4>Example</h4>
		 *      container.removeChild(child);
		 *
		 * You can also remove multiple children:
		 *
		 *      removeChild(child1, child2, ...);
		 *
		 * Returns true if the child (or children) was removed, or false if it was not in the display list.
		 * @method removeChild
		 * @param {DisplayObject} child The child to remove.
		 * @return {Boolean} true if the child (or children) was removed, or false if it was not in the display list.
		 **/
		p.removeChild = function(child) {
			var l = arguments.length;
			if (l > 1) {
				var good = true;
				for (var i=0; i<l; i++) { good = good && this.removeChild(arguments[i]); }
				return good;
			}
			return this.removeChildAt(createjs.indexOf(this.children, child));
		};
	
		/**
		 * Removes the child at the specified index from the display list, and sets its parent to null.
		 *
		 * <h4>Example</h4>
		 *
		 *      container.removeChildAt(2);
		 *
		 * You can also remove multiple children:
		 *
		 *      container.removeChild(2, 7, ...)
		 *
		 * Returns true if the child (or children) was removed, or false if any index was out of range.
		 * @method removeChildAt
		 * @param {Number} index The index of the child to remove.
		 * @return {Boolean} true if the child (or children) was removed, or false if any index was out of range.
		 **/
		p.removeChildAt = function(index) {
			var l = arguments.length;
			if (l > 1) {
				var a = [];
				for (var i=0; i<l; i++) { a[i] = arguments[i]; }
				a.sort(function(a, b) { return b-a; });
				var good = true;
				for (var i=0; i<l; i++) { good = good && this.removeChildAt(a[i]); }
				return good;
			}
			if (index < 0 || index > this.children.length-1) { return false; }
			var child = this.children[index];
			if (child) { child.parent = null; }
			this.children.splice(index, 1);
			return true;
		};
	
		/**
		 * Removes all children from the display list.
		 *
		 * <h4>Example</h4>
		 *      container.removeAlLChildren();
		 *
		 * @method removeAllChildren
		 **/
		p.removeAllChildren = function() {
			var kids = this.children;
			while (kids.length) { kids.pop().parent = null; }
		};
	
		/**
		 * Returns the child at the specified index.
		 *
		 * <h4>Example</h4>
		 *      container.getChildAt(2);
		 *
		 * @method getChildAt
		 * @param {Number} index The index of the child to return.
		 * @return {DisplayObject} The child at the specified index. Returns null if there is no child at the index.
		 **/
		p.getChildAt = function(index) {
			return this.children[index];
		};
		
		/**
		 * Returns the child with the specified name.
		 * @method getChildByName
		 * @param {String} name The name of the child to return.
		 * @return {DisplayObject} The child with the specified name.
		 **/
		p.getChildByName = function(name) {
			var kids = this.children;
			for (var i=0,l=kids.length;i<l;i++) {
				if(kids[i].name == name) { return kids[i]; }
			}
			return null;
		};
	
		/**
		 * Performs an array sort operation on the child list.
		 *
		 * <h4>Example</h4>
		 *      var sortFunction = function(item1, item2, options) {
		 *          if (item1 > item2) { return 1; }
		 *          if (item1 < item2) { return -1; }
		 *          return 0;
		 *      }
		 *      container.sortChildren(sortFunction);
		 *
		 * @method sortChildren
		 * @param {Function} sortFunction the function to use to sort the child list. See JavaScript's <code>Array.sort</code>
		 * documentation for details.
		 **/
		p.sortChildren = function(sortFunction) {
			this.children.sort(sortFunction);
		};
	
		/**
		 * Returns the index of the specified child in the display list, or -1 if it is not in the display list.
		 *
		 * <h4>Example</h4>
		 *      var index = container.getChildIndex(child);
		 *
		 * @method getChildIndex
		 * @param {DisplayObject} child The child to return the index of.
		 * @return {Number} The index of the specified child. -1 if the child is not found.
		 **/
		p.getChildIndex = function(child) {
			return createjs.indexOf(this.children, child);
		};
	
		/**
		 * Returns the number of children in the display list.
		 * @method getNumChildren
		 * @return {Number} The number of children in the display list.
		 **/
		p.getNumChildren = function() {
			return this.children.length;
		};
		
		/**
		 * Swaps the children at the specified indexes. Fails silently if either index is out of range.
		 * @method swapChildrenAt
		 * @param {Number} index1
		 * @param {Number} index2
		 **/
		p.swapChildrenAt = function(index1, index2) {
			var kids = this.children;
			var o1 = kids[index1];
			var o2 = kids[index2];
			if (!o1 || !o2) { return; }
			kids[index1] = o2;
			kids[index2] = o1;
		};
		
		/**
		 * Swaps the specified children's depth in the display list. Fails silently if either child is not a child of this
		 * Container.
		 * @method swapChildren
		 * @param {DisplayObject} child1
		 * @param {DisplayObject} child2
		 **/
		p.swapChildren = function(child1, child2) {
			var kids = this.children;
			var index1,index2;
			for (var i=0,l=kids.length;i<l;i++) {
				if (kids[i] == child1) { index1 = i; }
				if (kids[i] == child2) { index2 = i; }
				if (index1 != null && index2 != null) { break; }
			}
			if (i==l) { return; } // TODO: throw error?
			kids[index1] = child2;
			kids[index2] = child1;
		};
		
		/**
		 * Changes the depth of the specified child. Fails silently if the child is not a child of this container, or the index is out of range.
		 * @param {DisplayObject} child
		 * @param {Number} index  
		 * @method setChildIndex
		 **/
		p.setChildIndex = function(child, index) {
			var kids = this.children, l=kids.length;
			if (child.parent != this || index < 0 || index >= l) { return; }
			for (var i=0;i<l;i++) {
				if (kids[i] == child) { break; }
			}
			if (i==l || i == index) { return; }
			kids.splice(i,1);
			kids.splice(index,0,child);
		};
	
		/**
		 * Returns true if the specified display object either is this container or is a descendent (child, grandchild, etc)
		 * of this container.
		 * @method contains
		 * @param {DisplayObject} child The DisplayObject to be checked.
		 * @return {Boolean} true if the specified display object either is this container or is a descendent.
		 **/
		p.contains = function(child) {
			while (child) {
				if (child == this) { return true; }
				child = child.parent;
			}
			return false;
		};
	
		/**
		 * Tests whether the display object intersects the specified local point (ie. draws a pixel with alpha > 0 at the
		 * specified position). This ignores the alpha, shadow and compositeOperation of the display object, and all
		 * transform properties including regX/Y.
		 * @method hitTest
		 * @param {Number} x The x position to check in the display object's local coordinates.
		 * @param {Number} y The y position to check in the display object's local coordinates.
		 * @return {Boolean} A Boolean indicating whether there is a visible section of a DisplayObject that overlaps the specified
		 * coordinates.
		 **/
		p.hitTest = function(x, y) {
			// TODO: optimize to use the fast cache check where possible.
			return (this.getObjectUnderPoint(x, y) != null);
		};
	
		/**
		 * Returns an array of all display objects under the specified coordinates that are in this container's display
		 * list. This routine ignores any display objects with mouseEnabled set to false. The array will be sorted in order
		 * of visual depth, with the top-most display object at index 0. This uses shape based hit detection, and can be an
		 * expensive operation to run, so it is best to use it carefully. For example, if testing for objects under the
		 * mouse, test on tick (instead of on mousemove), and only if the mouse's position has changed.
		 * @method getObjectsUnderPoint
		 * @param {Number} x The x position in the container to test.
		 * @param {Number} y The y position in the container to test.
		 * @return {Array} An Array of DisplayObjects under the specified coordinates.
		 **/
		p.getObjectsUnderPoint = function(x, y) {
			var arr = [];
			var pt = this.localToGlobal(x, y);
			this._getObjectsUnderPoint(pt.x, pt.y, arr);
			return arr;
		};
	
		/**
		 * Similar to {{#crossLink "Container/getObjectsUnderPoint()"}}{{/crossLink}}, but returns only the top-most display
		 * object. This runs significantly faster than <code>getObjectsUnderPoint()<code>, but is still an expensive
		 * operation. See {{#crossLink "Container/getObjectsUnderPoint"}}{{/crossLink}} for more information.
		 * @method getObjectUnderPoint
		 * @param {Number} x The x position in the container to test.
		 * @param {Number} y The y position in the container to test.
		 * @return {DisplayObject} The top-most display object under the specified coordinates.
		 **/
		p.getObjectUnderPoint = function(x, y) {
			var pt = this.localToGlobal(x, y);
			return this._getObjectsUnderPoint(pt.x, pt.y);
		};
		
		/**
		 * @property DisplayObject_getBounds
		 * @type Function
		 * @protected
		 **/
		p.DisplayObject_getBounds = p.getBounds; 
		
		/**
		 * Docced in superclass.
		 */
		p.getBounds = function() {
			return this._getBounds(null, true);
		};
		
		
		/**
		 * Docced in superclass.
		 */
		p.getTransformedBounds = function() {
			return this._getBounds();
		};
	
		/**
		 * Returns a clone of this Container. Some properties that are specific to this instance's current context are
		 * reverted to their defaults (for example .parent).
		 * @method clone
		 * @param {Boolean} recursive If true, all of the descendants of this container will be cloned recursively. If false, the
		 * properties of the container will be cloned, but the new instance will not have any children.
		 * @return {Container} A clone of the current Container instance.
		 **/
		p.clone = function(recursive) {
			var o = new Container();
			this.cloneProps(o);
			if (recursive) {
				var arr = o.children = [];
				for (var i=0, l=this.children.length; i<l; i++) {
					var clone = this.children[i].clone(recursive);
					clone.parent = o;
					arr.push(clone);
				}
			}
			return o;
		};
	
		/**
		 * Returns a string representation of this object.
		 * @method toString
		 * @return {String} a string representation of the instance.
		 **/
		p.toString = function() {
			return "[Container (name="+  this.name +")]";
		};
	
	// private properties:
		/**
		 * @property DisplayObject__tick
		 * @type Function
		 * @private
		 **/
		p.DisplayObject__tick = p._tick;
		
		/**
		 * @method _tick
		 * @param {Array} params Parameters to pass onto the DisplayObject {{#crossLink "DisplayObject/tick"}}{{/crossLink}}
		 * function.
		 * @protected
		 **/
		p._tick = function(params) {
			for (var i=this.children.length-1; i>=0; i--) {
				var child = this.children[i];
				if (child._tick) { child._tick(params); }
			}
			this.DisplayObject__tick(params);
		};
	
		/**
		 * @method _getObjectsUnderPoint
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Array} arr
		 * @param {Boolean} mouse If true, it will respect mouse interaction properties like mouseEnabled, mouseChildren, and hitArea.
		 * @return {Array}
		 * @protected
		 **/
		p._getObjectsUnderPoint = function(x, y, arr, mouse) {
			var ctx = createjs.DisplayObject._hitTestContext;
			var mtx = this._matrix;
	
			// draw children one at a time, and check if we get a hit:
			var l = this.children.length;
			for (var i=l-1; i>=0; i--) {
				var child = this.children[i];
				var hitArea = mouse&&child.hitArea;
				if (!child.visible || (!hitArea && !child.isVisible()) || (mouse && !child.mouseEnabled)) { continue; }
				// if a child container has a hitArea then we only need to check its hitArea, so we can treat it as a normal DO:
				if (!hitArea && child instanceof Container) {
					var result = child._getObjectsUnderPoint(x, y, arr, mouse);
					if (!arr && result) { return result; }
				} else {
					child.getConcatenatedMatrix(mtx);
					
					if (hitArea) {
						mtx.appendTransform(hitArea.x, hitArea.y, hitArea.scaleX, hitArea.scaleY, hitArea.rotation, hitArea.skewX, hitArea.skewY, hitArea.regX, hitArea.regY);
						mtx.alpha = hitArea.alpha;
					}
					
					ctx.globalAlpha = mtx.alpha;
					ctx.setTransform(mtx.a,  mtx.b, mtx.c, mtx.d, mtx.tx-x, mtx.ty-y);
					(hitArea||child).draw(ctx);
					if (!this._testHit(ctx)) { continue; }
					ctx.setTransform(1, 0, 0, 1, 0, 0);
					ctx.clearRect(0, 0, 2, 2);
					if (arr) { arr.push(child); }
					else { return (mouse && !this.mouseChildren) ? this : child; }
				}
			}
			return null;
		};
		
		/**
		 * @method _getBounds
		 * @param {Matrix2D} matrix
		 * @param {Boolean} ignoreTransform If true, does not apply this object's transform.
		 * @return {Rectangle}
		 * @protected
		 **/
		p._getBounds = function(matrix, ignoreTransform) {
			var bounds = this.DisplayObject_getBounds();
			if (bounds) { return this._transformBounds(bounds, matrix, ignoreTransform); }
			
			var minX, maxX, minY, maxY;
			var mtx = ignoreTransform ? this._matrix.identity() : this.getMatrix(this._matrix);
			if (matrix) { mtx.prependMatrix(matrix); }
			
			var l = this.children.length;
			for (var i=0; i<l; i++) {
				var child = this.children[i];
				if (!child.visible || !(bounds = child._getBounds(mtx))) { continue; }
				var x1=bounds.x, y1=bounds.y, x2=x1+bounds.width, y2=y1+bounds.height;
				if (x1 < minX || minX == null) { minX = x1; }
				if (x2 > maxX || maxX == null) { maxX = x2; }
				if (y1 < minY || minY == null) { minY = y1; }
				if (y2 > maxY || maxY == null) { maxY = y2; }
			}
			
			return (maxX == null) ? null : this._rectangle.initialize(minX, minY, maxX-minX, maxY-minY);
		};
	
	createjs.Container = Container;
	}());

/***/ },
/* 49 */
/***/ function(module, exports) {

	/*
	* DisplayObject
	* Visit http://createjs.com/ for documentation, updates and examples.
	*
	* Copyright (c) 2010 gskinner.com, inc.
	* 
	* Permission is hereby granted, free of charge, to any person
	* obtaining a copy of this software and associated documentation
	* files (the "Software"), to deal in the Software without
	* restriction, including without limitation the rights to use,
	* copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the
	* Software is furnished to do so, subject to the following
	* conditions:
	* 
	* The above copyright notice and this permission notice shall be
	* included in all copies or substantial portions of the Software.
	* 
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	* OTHER DEALINGS IN THE SOFTWARE.
	*/
	
	/**
	 * The EaselJS Javascript library provides a retained graphics mode for canvas including a full hierarchical display
	 * list, a core interaction model, and helper classes to make working with 2D graphics in Canvas much easier.
	 * EaselJS provides straight forward solutions for working with rich graphics and interactivity with HTML5 Canvas...
	 *
	 * <h4>Getting Started</h4>
	 * To get started with Easel, create a {{#crossLink "Stage"}}{{/crossLink}} that wraps a CANVAS element, and add
	 * {{#crossLink "DisplayObject"}}{{/crossLink}} instances as children. EaselJS supports:
	 * <ul>
	 *      <li>Images using {{#crossLink "Bitmap"}}{{/crossLink}}</li>
	 *      <li>Vector graphics using {{#crossLink "Shape"}}{{/crossLink}} and {{#crossLink "Graphics"}}{{/crossLink}}</li>
	 *      <li>Animated bitmaps using {{#crossLink "SpriteSheet"}}{{/crossLink}} and {{#crossLink "Sprite"}}{{/crossLink}}
	 *      <li>Simple text instances using {{#crossLink "Text"}}{{/crossLink}}</li>
	 *      <li>Containers that hold other DisplayObjects using {{#crossLink "Container"}}{{/crossLink}}</li>
	 *      <li>Control HTML DOM elements using {{#crossLink "DOMElement"}}{{/crossLink}}</li>
	 * </ul>
	 *
	 * All display objects can be added to the stage as children, or drawn to a canvas directly.
	 *
	 * <b>User Interactions</b><br />
	 * All display objects on stage (except DOMElement) will dispatch events when interacted with using a mouse or
	 * touch. EaselJS supports hover, press, and release events, as well as an easy-to-use drag-and-drop model. Check out
	 * {{#crossLink "MouseEvent"}}{{/crossLink}} for more information.
	 *
	 * <h4>Simple Example</h4>
	 * This example illustrates how to create and position a {{#crossLink "Shape"}}{{/crossLink}} on the {{#crossLink "Stage"}}{{/crossLink}}
	 * using EaselJS' drawing API.
	 *
	 *	    //Create a stage by getting a reference to the canvas
	 *	    stage = new createjs.Stage("demoCanvas");
	 *	    //Create a Shape DisplayObject.
	 *	    circle = new createjs.Shape();
	 *	    circle.graphics.beginFill("red").drawCircle(0, 0, 40);
	 *	    //Set position of Shape instance.
	 *	    circle.x = circle.y = 50;
	 *	    //Add Shape instance to stage display list.
	 *	    stage.addChild(circle);
	 *	    //Update stage will render next frame
	 *	    stage.update();
	 *
	 * <b>Simple Interaction Example</b><br>
	 *
	 *      displayObject.addEventListener("click", handleClick);
	 *      function handleClick(event){
	 *          // Click happenened
	 *      }
	 *
	 *      displayObject.addEventListener("mousedown", handlePress);
	 *      function handlePress(event) {
	 *          // A mouse press happened.
	 *          // Listen for mouse move while the mouse is down:
	 *          event.addEventListener("mousemove", handleMove);
	 *      }
	 *      function handleMove(event) {
	 *          // Check out the DragAndDrop example in GitHub for more
	 *      }
	 *
	 * <b>Simple Animation Example</b><br />
	 * This example moves the shape created in the previous demo across the screen.
	 *
	 *	    //Update stage will render next frame
	 *	    createjs.Ticker.addEventListener("tick", handleTick);
	 *
	 *	    function handleTick() {
	 *          //Circle will move 10 units to the right.
	 *	    	circle.x += 10;
	 *	    	//Will cause the circle to wrap back
	 * 	    	if (circle.x > stage.canvas.width) { circle.x = 0; }
	 *	    	stage.update();
	 *	    }
	 *
	 * <h4>Other Features</h4>
	 * EaselJS also has built in support for
	 * <ul><li>Canvas features such as {{#crossLink "Shadow"}}{{/crossLink}} and CompositeOperation</li>
	 *      <li>{{#crossLink "Ticker"}}{{/crossLink}}, a global heartbeat that objects can subscribe to</li>
	 *      <li>Filters, including a provided {{#crossLink "ColorMatrixFilter"}}{{/crossLink}}, {{#crossLink "AlphaMaskFilter"}}{{/crossLink}},
	 *      {{#crossLink "AlphaMapFilter"}}{{/crossLink}}, and {{#crossLink "BlurFilter"}}{{/crossLink}}. See {{#crossLink "Filter"}}{{/crossLink}}
	 *      for more information</li>
	 *      <li>A {{#crossLink "ButtonHelper"}}{{/crossLink}} utility, to easily create interactive buttons</li>
	 *      <li>{{#crossLink "SpriteSheetUtils"}}{{/crossLink}} and a {{#crossLink "SpriteSheetBuilder"}}{{/crossLink}} to
	 *      help build and manage {{#crossLink "SpriteSheet"}}{{/crossLink}} functionality at run-time.</li>
	 * </ul>
	 *
	 * <h4>Browser Support</h4>
	 * All modern browsers that support Canvas will support EaselJS (<a href="http://caniuse.com/canvas">http://caniuse.com/canvas</a>).
	 * Browser performance may vary between platforms, for example, Android Canvas has poor hardware support, and is much
	 * slower on average than most other browsers.
	 *
	 * @module EaselJS
	 * @main EaselJS
	 */
	
	// namespace:
	this.createjs = this.createjs||{};
	
	(function() {
	/**
	 * DisplayObject is an abstract class that should not be constructed directly. Instead construct subclasses such as
	 * {{#crossLink "Container"}}{{/crossLink}}, {{#crossLink "Bitmap"}}{{/crossLink}}, and {{#crossLink "Shape"}}{{/crossLink}}.
	 * DisplayObject is the base class for all display classes in the EaselJS library. It defines the core properties and
	 * methods that are shared between all display objects, such as transformation properties (x, y, scaleX, scaleY, etc),
	 * caching, and mouse handlers.
	 * @class DisplayObject
	 * @extends EventDispatcher
	 * @constructor
	 **/
	var DisplayObject = function() {
	  this.initialize();
	};
	var p = DisplayObject.prototype = new createjs.EventDispatcher();
	
		/**
		 * Suppresses errors generated when using features like hitTest, mouse events, and {{#crossLink "getObjectsUnderPoint"}}{{/crossLink}}
		 * with cross domain content.
		 * @property suppressCrossDomainErrors
		 * @static
		 * @type {Boolean}
		 * @default false
		 **/
		DisplayObject.suppressCrossDomainErrors = false;
	
		/**
		 * @property _hitTestCanvas
		 * @type {HTMLCanvasElement | Object}
		 * @static
		 * @protected
		 **/
		 
		/**
		 * @property _hitTestContext
		 * @type {CanvasRenderingContext2D}
		 * @static
		 * @protected
		 **/
		var canvas = createjs.createCanvas?createjs.createCanvas():document.createElement("canvas"); // prevent errors on load in browsers without canvas.
		if (canvas.getContext) {
			DisplayObject._hitTestCanvas = canvas;
			DisplayObject._hitTestContext = canvas.getContext("2d");
			canvas.width = canvas.height = 1;
		}
	
		/**
		 * @property _nextCacheID
		 * @type {Number}
		 * @static
		 * @protected
		 **/
		DisplayObject._nextCacheID = 1;
	
	// events:
	
		/**
		 * Dispatched when the user presses their left mouse button over the display object. See the 
		 * {{#crossLink "MouseEvent"}}{{/crossLink}} class for a listing of event properties.
		 * @event mousedown
		 * @since 0.6.0
		 */
		 
		/**
		 * Dispatched when the user presses their left mouse button and then releases it while over the display object.
		 * See the {{#crossLink "MouseEvent"}}{{/crossLink}} class for a listing of event properties.
		 * @event click
		 * @since 0.6.0
		 */
		 
		/**
		 * Dispatched when the user double clicks their left mouse button over this display object.
		 * See the {{#crossLink "MouseEvent"}}{{/crossLink}} class for a listing of event properties.
		 * @event dblclick
		 * @since 0.6.0
		 */
		 
		/**
		 * Dispatched when the user's mouse enters this display object. This event must be enabled using 
		 * {{#crossLink "Stage/enableMouseOver"}}{{/crossLink}}. See also {{#crossLink "DisplayObject/rollover:event"}}{{/crossLink}}.
		 * See the {{#crossLink "MouseEvent"}}{{/crossLink}} class for a listing of event properties.
		 * @event mouseover
		 * @since 0.6.0
		 */
	
		/**
		 * Dispatched when the user's mouse leaves this display object. This event must be enabled using 
		 * {{#crossLink "Stage/enableMouseOver"}}{{/crossLink}}. See also {{#crossLink "DisplayObject/rollout:event"}}{{/crossLink}}.
		 * See the {{#crossLink "MouseEvent"}}{{/crossLink}} class for a listing of event properties.
		 * @event mouseout
		 * @since 0.6.0
		 */
		 
		/**
		 * This event is similar to {{#crossLink "DisplayObject/mouseover:event"}}{{/crossLink}}, with the following
		 * differences: it does not bubble, and it considers {{#crossLink "Container"}}{{/crossLink}} instances as an
		 * aggregate of their content.
		 * 
		 * For example, myContainer contains two overlapping children: shapeA and shapeB. The user moves their mouse over
		 * shapeA and then directly on to shapeB. With a listener for {{#crossLink "mouseover:event"}}{{/crossLink}} on
		 * myContainer, two events would be received, each targeting a child element:<OL>
		 * <LI>when the mouse enters shapeA (target=shapeA)</LI>
		 * <LI>when the mouse enters shapeB (target=shapeB)</LI>
		 * </OL>
		 * However, with a listener for "rollover" instead, only a single event is received when the mouse first enters
		 * the aggregate myContainer content (target=myContainer).
		 * 
		 * This event must be enabled using {{#crossLink "Stage/enableMouseOver"}}{{/crossLink}}.
		 * See the {{#crossLink "MouseEvent"}}{{/crossLink}} class for a listing of event properties.
		 * @event rollover
		 * @since 0.7.0
		 */
		 
		/**
		 * This event is similar to {{#crossLink "DisplayObject/mouseout:event"}}{{/crossLink}}, with the following
		 * differences: it does not bubble, and it considers {{#crossLink "Container"}}{{/crossLink}} instances as an
		 * aggregate of their content.
		 * 
		 * For example, myContainer contains two overlapping children: shapeA and shapeB. The user moves their mouse over
		 * shapeA, then directly on to shapeB, then off both. With a listener for {{#crossLink "mouseout:event"}}{{/crossLink}}
		 * on myContainer, two events would be received, each targeting a child element:<OL>
		 * <LI>when the mouse leaves shapeA (target=shapeA)</LI>
		 * <LI>when the mouse leaves shapeB (target=shapeB)</LI>
		 * </OL>
		 * However, with a listener for "rollout" instead, only a single event is received when the mouse leaves
		 * the aggregate myContainer content (target=myContainer).
		 * 
		 * This event must be enabled using {{#crossLink "Stage/enableMouseOver"}}{{/crossLink}}.
		 * See the {{#crossLink "MouseEvent"}}{{/crossLink}} class for a listing of event properties.
		 * @event rollout
		 * @since 0.7.0
		 */
		 
		/**
		 * After a {{#crossLink "DisplayObject/mousedown:event"}}{{/crossLink}} occurs on a display object, a pressmove
		 * event will be generated on that object whenever the mouse moves until the mouse press is released. This can be
		 * useful for dragging and similar operations.
		 * @event pressmove
		 * @since 0.7.0
		 */
		 
		/**
		 * After a {{#crossLink "DisplayObject/mousedown:event"}}{{/crossLink}} occurs on a display object, a pressup event
		 * will be generated on that object when that mouse press is released. This can be useful for dragging and similar
		 * operations.
		 * @event pressup
		 * @since 0.7.0
		 */
		 
		/**
		 * Dispatched on each display object on a stage whenever the stage updates. This occurs immediately before the
		 * rendering (draw) pass. When {{#crossLink "Stage/update"}}{{/crossLink}} is called, first all display objects on
		 * the stage dispatch the tick event, then all of the display objects are drawn to stage. Children will have their
		 * {{#crossLink "tick:event"}}{{/crossLink}} event dispatched in order of their depth prior to the event being
		 * dispatched on their parent.
		 * @event tick
		 * @param {Object} target The object that dispatched the event.
		 * @param {String} type The event type.
		 * @param {Array} params An array containing any arguments that were passed to the Stage.update() method. For
		 *      example if you called stage.update("hello"), then the params would be ["hello"].
		 * @since 0.6.0
		 */
	
	// public properties:
		/**
		 * The alpha (transparency) for this display object. 0 is fully transparent, 1 is fully opaque.
		 * @property alpha
		 * @type {Number}
		 * @default 1
		 **/
		p.alpha = 1;
	
		/**
		 * If a cache is active, this returns the canvas that holds the cached version of this display object. See {{#crossLink "cache"}}{{/crossLink}}
		 * for more information.
		 * @property cacheCanvas
		 * @type {HTMLCanvasElement | Object}
		 * @default null
		 * @readonly
		 **/
		p.cacheCanvas = null;
	
		/**
		 * Unique ID for this display object. Makes display objects easier for some uses.
		 * @property id
		 * @type {Number}
		 * @default -1
		 **/
		p.id = -1;
	
		/**
		 * Indicates whether to include this object when running mouse interactions. Setting this to `false` for children
		 * of a {{#crossLink "Container"}}{{/crossLink}} will cause events on the Container to not fire when that child is
		 * clicked. Note that setting this property to `false` does not prevent the {{#crossLink "Container/getObjectsUnderPoint"}}{{/crossLink}}
		 * method from returning the child.
		 * @property mouseEnabled
		 * @type {Boolean}
		 * @default true
		 **/
		p.mouseEnabled = true;
	
		/**
		 * An optional name for this display object. Included in {{#crossLink "DisplayObject/toString"}}{{/crossLink}} . Useful for
		 * debugging.
		 * @property name
		 * @type {String}
		 * @default null
		 **/
		p.name = null;
	
		/**
		 * A reference to the {{#crossLink "Container"}}{{/crossLink}} or {{#crossLink "Stage"}}{{/crossLink}} object that
		 * contains this display object, or null if it has not been added
		 * to one.
		 * @property parent
		 * @final
		 * @type {Container}
		 * @default null
		 * @readonly
		 **/
		p.parent = null;
	
		/**
		 * The left offset for this display object's registration point. For example, to make a 100x100px Bitmap rotate
		 * around its center, you would set regX and {{#crossLink "DisplayObject/regY:property"}}{{/crossLink}} to 50.
		 * @property regX
		 * @type {Number}
		 * @default 0
		 **/
		p.regX = 0;
	
		/**
		 * The y offset for this display object's registration point. For example, to make a 100x100px Bitmap rotate around
		 * its center, you would set {{#crossLink "DisplayObject/regX:property"}}{{/crossLink}} and regY to 50.
		 * @property regY
		 * @type {Number}
		 * @default 0
		 **/
		p.regY = 0;
	
		/**
		 * The rotation in degrees for this display object.
		 * @property rotation
		 * @type {Number}
		 * @default 0
		 **/
		p.rotation = 0;
	
		/**
		 * The factor to stretch this display object horizontally. For example, setting scaleX to 2 will stretch the display
		 * object to twice its nominal width. To horizontally flip an object, set the scale to a negative number.
		 * @property scaleX
		 * @type {Number}
		 * @default 1
		 **/
		p.scaleX = 1;
	
		/**
		 * The factor to stretch this display object vertically. For example, setting scaleY to 0.5 will stretch the display
		 * object to half its nominal height. To vertically flip an object, set the scale to a negative number.
		 * @property scaleY
		 * @type {Number}
		 * @default 1
		 **/
		p.scaleY = 1;
	
		/**
		 * The factor to skew this display object horizontally.
		 * @property skewX
		 * @type {Number}
		 * @default 0
		 **/
		p.skewX = 0;
	
		/**
		 * The factor to skew this display object vertically.
		 * @property skewY
		 * @type {Number}
		 * @default 0
		 **/
		p.skewY = 0;
	
		/**
		 * A shadow object that defines the shadow to render on this display object. Set to `null` to remove a shadow. If
		 * null, this property is inherited from the parent container.
		 * @property shadow
		 * @type {Shadow}
		 * @default null
		 **/
		p.shadow = null;
	
		/**
		 * Indicates whether this display object should be rendered to the canvas and included when running the Stage
		 * {{#crossLink "Stage/getObjectsUnderPoint"}}{{/crossLink}} method.
		 * @property visible
		 * @type {Boolean}
		 * @default true
		 **/
		p.visible = true;
	
		/**
		 * The x (horizontal) position of the display object, relative to its parent.
		 * @property x
		 * @type {Number}
		 * @default 0
		 **/
		p.x = 0;
	
		/** The y (vertical) position of the display object, relative to its parent.
		 * @property y
		 * @type {Number}
		 * @default 0
		 **/
		p.y = 0;
	
		/**
		 * The composite operation indicates how the pixels of this display object will be composited with the elements
		 * behind it. If `null`, this property is inherited from the parent container. For more information, read the
		 * <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#compositing">
		 * whatwg spec on compositing</a>.
		 * @property compositeOperation
		 * @type {String}
		 * @default null
		 **/
		p.compositeOperation = null;
	
		/**
		 * Indicates whether the display object should have its x & y position rounded prior to drawing it to stage.
		 * Snapping to whole pixels can result in a sharper and faster draw for images (ex. Bitmap & cached objects).
		 * This only applies if the enclosing stage has {{#crossLink "Stage/snapPixelsEnabled:property"}}{{/crossLink}} set
		 * to `true`. The snapToPixel property is `true` by default for {{#crossLink "Bitmap"}}{{/crossLink}} and {{#crossLink "Sprite"}}{{/crossLink}}
		 * instances, and `false` for all other display objects.
		 *
		 * Note that this applies only rounds the display object's local position. You should ensure that all of the display
		 * object's ancestors (parent containers) are also on a whole pixel. You can do this by setting the ancestors'
		 * snapToPixel property to `true`.
		 * @property snapToPixel
		 * @type {Boolean}
		 * @default false
		 * @deprecated Hardware acceleration in modern browsers makes this unnecessary.
		 **/
		p.snapToPixel = false;
		
		// TODO: remove handler docs in future:
		/**
		 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "DisplayObject/mousedown:event"}}{{/crossLink}}
		 * event.
		 * @property onPress
		 * @type {Function}
		 * @deprecated Use addEventListener and the "mousedown" event.
		 */
		/**
		 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "DisplayObject/click:event"}}{{/crossLink}}
		 * event.
		 * @property onClick
		 * @type {Function}
		 * @deprecated Use addEventListener and the "click" event.
		 */
		/**
		 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "DisplayObject/dblclick:event"}}{{/crossLink}}
		 * event.
		 * @property onDoubleClick
		 * @type {Function}
		 * @deprecated Use addEventListener and the "dblclick" event.
		 */
		/**
		 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "DisplayObject/mouseover:event"}}{{/crossLink}}
		 * event.
		 * @property onMouseOver
		 * @type {Function}
		 * @deprecated Use addEventListener and the "mouseover" event.
		 */
		/**
		 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "DisplayObject/mouseout:event"}}{{/crossLink}}
		 * event.
		 * @property onMouseOut
		 * @type {Function}
		 * @deprecated Use addEventListener and the "mouseout" event.
		 */
		/**
		 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "DisplayObject/tick:event"}}{{/crossLink}}
		 * event.
		 * @property onTick
		 * @type {Function}
		 * @deprecatedtick
		 */
	
		/**
		 * An array of Filter objects to apply to this display object. Filters are only applied / updated when {{#crossLink "cache"}}{{/crossLink}}
		 * or {{#crossLink "updateCache"}}{{/crossLink}} is called on the display object, and only apply to the area that is
		 * cached.
		 * @property filters
		 * @type {Array}
		 * @default null
		 **/
		p.filters = null;
	
		/**
		 * Returns an ID number that uniquely identifies the current cache for this display object. This can be used to
		 * determine if the cache has changed since a previous check.
		 * @property cacheID
		 * @type {Number}
		 * @default 0
		 */
		p.cacheID = 0;
		
		/**
		 * A Shape instance that defines a vector mask (clipping path) for this display object.  The shape's transformation
		 * will be applied relative to the display object's parent coordinates (as if it were a child of the parent).
		 * @property mask
		 * @type {Shape}
		 * @default null
		 */
		p.mask = null;
		
		/**
		 * A display object that will be tested when checking mouse interactions or testing {{#crossLink "Container/getObjectsUnderPoint"}}{{/crossLink}}.
		 * The hit area will have its transformation applied relative to this display object's coordinate space (as though
		 * the hit test object were a child of this display object and relative to its regX/Y). The hitArea will be tested
		 * using only its own `alpha` value regardless of the alpha value on the target display object, or the target's
		 * ancestors (parents).
		 * 
		 * If set on a {{#crossLink "Container"}}{{/crossLink}}, children of the Container will not receive mouse events.
		 * This is similar to setting {{#crossLink "mouseChildren"}}{{/crossLink}} to false.
		 *
		 * Note that hitArea is NOT currently used by the `hitTest()` method, nor is it supported for {{#crossLink "Stage"}}{{/crossLink}}.
		 * @property hitArea
		 * @type {DisplayObject}
		 * @default null
		 */
		p.hitArea = null;
		
		/**
		 * A CSS cursor (ex. "pointer", "help", "text", etc) that will be displayed when the user hovers over this display
		 * object. You must enable mouseover events using the {{#crossLink "Stage/enableMouseOver"}}{{/crossLink}} method to
		 * use this property. Setting a non-null cursor on a Container will override the cursor set on its descendants.
		 * @property cursor
		 * @type {String}
		 * @default null
		 */
		p.cursor = null;
	
	// private properties:
	
		/**
		 * @property _cacheOffsetX
		 * @protected
		 * @type {Number}
		 * @default 0
		 **/
		p._cacheOffsetX = 0;
	
		/**
		 * @property _cacheOffsetY
		 * @protected
		 * @type {Number}
		 * @default 0
		 **/
		p._cacheOffsetY = 0;
		
		/**
		 * @property _cacheScale
		 * @protected
		 * @type {Number}
		 * @default 1
		 **/
		p._cacheScale = 1;
	
		/**
		* @property _cacheDataURLID
		* @protected
		* @type {Number}
		* @default 0
		*/
		p._cacheDataURLID = 0;
		
		/**
		* @property _cacheDataURL
		* @protected
		* @type {String}
		* @default null
		*/
		p._cacheDataURL = null;
	
		/**
		 * @property _matrix
		 * @protected
		 * @type {Matrix2D}
		 * @default null
		 **/
		p._matrix = null;
	
		/**
		 * @property _rectangle
		 * @protected
		 * @type {Rectangle}
		 * @default null
		 **/
		p._rectangle = null;
	
		/**
		 * @property _bounds
		 * @protected
		 * @type {Rectangle}
		 * @default null
		 **/
		p._bounds = null;
		
	
	// constructor:
		// separated so it can be easily addressed in subclasses:
	
		/**
		 * Initialization method.
		 * @method initialize
		 * @protected
		*/
		p.initialize = function() {
			this.id = createjs.UID.get();
			this._matrix = new createjs.Matrix2D();
			this._rectangle = new createjs.Rectangle();
		};
	
	// public methods:
		/**
		 * Returns true or false indicating whether the display object would be visible if drawn to a canvas.
		 * This does not account for whether it would be visible within the boundaries of the stage.
		 *
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 * @method isVisible
		 * @return {Boolean} Boolean indicating whether the display object would be visible if drawn to a canvas
		 **/
		p.isVisible = function() {
			return !!(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0);
		};
	
		/**
		 * Draws the display object into the specified context ignoring its visible, alpha, shadow, and transform.
		 * Returns <code>true</code> if the draw was handled (useful for overriding functionality).
		 *
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 * @method draw
		 * @param {CanvasRenderingContext2D} ctx The canvas 2D context object to draw into.
		 * @param {Boolean} [ignoreCache=false] Indicates whether the draw operation should ignore any current cache. For example,
		 * used for drawing the cache (to prevent it from simply drawing an existing cache back into itself).
		 **/
		p.draw = function(ctx, ignoreCache) {
			var cacheCanvas = this.cacheCanvas;
			if (ignoreCache || !cacheCanvas) { return false; }
			var scale = this._cacheScale, offX = this._cacheOffsetX, offY = this._cacheOffsetY, fBounds;
			if (fBounds = this._applyFilterBounds(offX, offY, 0, 0)) {
				offX = fBounds.x;
				offY = fBounds.y;
			}
			ctx.drawImage(cacheCanvas, offX, offY, cacheCanvas.width/scale, cacheCanvas.height/scale);
			return true;
		};
		
		/**
		 * Applies this display object's transformation, alpha, globalCompositeOperation, clipping path (mask), and shadow
		 * to the specified context. This is typically called prior to {{#crossLink "DisplayObject/draw"}}{{/crossLink}}.
		 * @method updateContext
		 * @param {CanvasRenderingContext2D} ctx The canvas 2D to update.
		 **/
		p.updateContext = function(ctx) {
			var mtx, mask=this.mask, o=this;
			
			if (mask && mask.graphics && !mask.graphics.isEmpty()) {
				mtx = mask.getMatrix(mask._matrix);
				ctx.transform(mtx.a,  mtx.b, mtx.c, mtx.d, mtx.tx, mtx.ty);
				
				mask.graphics.drawAsPath(ctx);
				ctx.clip();
				
				mtx.invert();
				ctx.transform(mtx.a,  mtx.b, mtx.c, mtx.d, mtx.tx, mtx.ty);
			}
			
			mtx = o._matrix.identity().appendTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation, o.skewX, o.skewY, o.regX, o.regY);
			// TODO: should be a better way to manage this setting. For now, using dynamic access to avoid circular dependencies:
			if (createjs["Stage"]._snapToPixelEnabled && o.snapToPixel) { ctx.transform(mtx.a,  mtx.b, mtx.c, mtx.d, mtx.tx+0.5|0, mtx.ty+0.5|0); }
			else { ctx.transform(mtx.a,  mtx.b, mtx.c, mtx.d, mtx.tx, mtx.ty); }
			ctx.globalAlpha *= o.alpha;
			if (o.compositeOperation) { ctx.globalCompositeOperation = o.compositeOperation; }
			if (o.shadow) { this._applyShadow(ctx, o.shadow); }
		};
	
		/**
		 * Draws the display object into a new canvas, which is then used for subsequent draws. For complex content
		 * that does not change frequently (ex. a Container with many children that do not move, or a complex vector Shape),
		 * this can provide for much faster rendering because the content does not need to be re-rendered each tick. The
		 * cached display object can be moved, rotated, faded, etc freely, however if its content changes, you must
		 * manually update the cache by calling <code>updateCache()</code> or <code>cache()</code> again. You must specify
		 * the cache area via the x, y, w, and h parameters. This defines the rectangle that will be rendered and cached
		 * using this display object's coordinates.
		 *
		 * <h4>Example</h4>
		 * For example if you defined a Shape that drew a circle at 0, 0 with a radius of 25:
		 *
		 *      var shape = new createjs.Shape();
		 *      shape.graphics.beginFill("#ff0000").drawCircle(0, 0, 25);
		 *      myShape.cache(-25, -25, 50, 50);
		 *
		 * Note that filters need to be defined <em>before</em> the cache is applied. Check out the {{#crossLink "Filter"}}{{/crossLink}}
		 * class for more information. Some filters (ex. BlurFilter) will not work as expected in conjunction with the scale param.
		 * 
		 * Usually, the resulting cacheCanvas will have the dimensions width*scale by height*scale, however some filters (ex. BlurFilter)
		 * will add padding to the canvas dimensions.
		 *
		 * @method cache
		 * @param {Number} x The x coordinate origin for the cache region.
		 * @param {Number} y The y coordinate origin for the cache region.
		 * @param {Number} width The width of the cache region.
		 * @param {Number} height The height of the cache region.
		 * @param {Number} [scale=1] The scale at which the cache will be created. For example, if you cache a vector shape using
		 * 	myShape.cache(0,0,100,100,2) then the resulting cacheCanvas will be 200x200 px. This lets you scale and rotate
		 * 	cached elements with greater fidelity. Default is 1.
		 **/
		p.cache = function(x, y, width, height, scale) {
			// draw to canvas.
			scale = scale||1;
			if (!this.cacheCanvas) { this.cacheCanvas = createjs.createCanvas?createjs.createCanvas():document.createElement("canvas"); }
			this._cacheWidth = width;
			this._cacheHeight = height;
			this._cacheOffsetX = x;
			this._cacheOffsetY = y;
			this._cacheScale = scale;
			this.updateCache();
		};
	
		/**
		 * Redraws the display object to its cache. Calling updateCache without an active cache will throw an error.
		 * If compositeOperation is null the current cache will be cleared prior to drawing. Otherwise the display object
		 * will be drawn over the existing cache using the specified compositeOperation.
		 *
		 * <h4>Example</h4>
		 * Clear the current graphics of a cached shape, draw some new instructions, and then update the cache. The new line
		 * will be drawn on top of the old one.
		 *
		 *      // Not shown: Creating the shape, and caching it.
		 *      shapeInstance.clear();
		 *      shapeInstance.setStrokeStyle(3).beginStroke("#ff0000").moveTo(100, 100).lineTo(200,200);
		 *      shapeInstance.updateCache();
		 *
		 * @method updateCache
		 * @param {String} compositeOperation The compositeOperation to use, or null to clear the cache and redraw it.
		 * <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#compositing">
		 * whatwg spec on compositing</a>.
		 **/
		p.updateCache = function(compositeOperation) {
			var cacheCanvas = this.cacheCanvas, scale = this._cacheScale, offX = this._cacheOffsetX*scale, offY = this._cacheOffsetY*scale;
			var w = this._cacheWidth, h = this._cacheHeight, fBounds;
			if (!cacheCanvas) { throw "cache() must be called before updateCache()"; }
			var ctx = cacheCanvas.getContext("2d");
			
			// update bounds based on filters:
			if (fBounds = this._applyFilterBounds(offX, offY, w, h)) {
				offX = fBounds.x;
				offY = fBounds.y;
				w = fBounds.width;
				h = fBounds.height;
			}
			
			w = Math.ceil(w*scale);
			h = Math.ceil(h*scale);
			if (w != cacheCanvas.width || h != cacheCanvas.height) {
				// TODO: it would be nice to preserve the content if there is a compositeOperation.
				cacheCanvas.width = w;
				cacheCanvas.height = h;
			} else if (!compositeOperation) {
				ctx.clearRect(0, 0, w+1, h+1);
			}
			
			ctx.save();
			ctx.globalCompositeOperation = compositeOperation;
			ctx.setTransform(scale, 0, 0, scale, -offX, -offY);
			this.draw(ctx, true);
			// TODO: filters and cache scale don't play well together at present.
			this._applyFilters();
			ctx.restore();
			this.cacheID = DisplayObject._nextCacheID++;
		};
	
		/**
		 * Clears the current cache. See {{#crossLink "DisplayObject/cache"}}{{/crossLink}} for more information.
		 * @method uncache
		 **/
		p.uncache = function() {
			this._cacheDataURL = this.cacheCanvas = null;
			this.cacheID = this._cacheOffsetX = this._cacheOffsetY = 0;
			this._cacheScale = 1;
		};
		
		/**
		 * Returns a data URL for the cache, or null if this display object is not cached.
		 * Uses cacheID to ensure a new data URL is not generated if the cache has not changed.
		 * @method getCacheDataURL
		 * @return {String} The image data url for the cache.
		 **/
		p.getCacheDataURL = function() {
			if (!this.cacheCanvas) { return null; }
			if (this.cacheID != this._cacheDataURLID) { this._cacheDataURL = this.cacheCanvas.toDataURL(); }
			return this._cacheDataURL;
		};
	
		/**
		 * Returns the stage that this display object will be rendered on, or null if it has not been added to one.
		 * @method getStage
		 * @return {Stage} The Stage instance that the display object is a descendent of. null if the DisplayObject has not
		 * been added to a Stage.
		 **/
		p.getStage = function() {
			var o = this;
			while (o.parent) {
				o = o.parent;
			}
			// using dynamic access to avoid circular dependencies;
			if (o instanceof createjs["Stage"]) { return o; }
			return null;
		};
	
		/**
		 * Transforms the specified x and y position from the coordinate space of the display object
		 * to the global (stage) coordinate space. For example, this could be used to position an HTML label
		 * over a specific point on a nested display object. Returns a Point instance with x and y properties
		 * correlating to the transformed coordinates on the stage.
		 *
		 * <h4>Example</h4>
		 *
		 *      displayObject.x = 300;
		 *      displayObject.y = 200;
		 *      stage.addChild(displayObject);
		 *      var point = myDisplayObject.localToGlobal(100, 100);
		 *      // Results in x=400, y=300
		 *
		 * @method localToGlobal
		 * @param {Number} x The x position in the source display object to transform.
		 * @param {Number} y The y position in the source display object to transform.
		 * @return {Point} A Point instance with x and y properties correlating to the transformed coordinates
		 * on the stage.
		 **/
		p.localToGlobal = function(x, y) {
			var mtx = this.getConcatenatedMatrix(this._matrix);
			if (mtx == null) { return null; }
			mtx.append(1, 0, 0, 1, x, y);
			return new createjs.Point(mtx.tx, mtx.ty);
		};
	
		/**
		 * Transforms the specified x and y position from the global (stage) coordinate space to the
		 * coordinate space of the display object. For example, this could be used to determine
		 * the current mouse position within the display object. Returns a Point instance with x and y properties
		 * correlating to the transformed position in the display object's coordinate space.
		 *
		 * <h4>Example</h4>
		 *
		 *      displayObject.x = 300;
		 *      displayObject.y = 200;
		 *      stage.addChild(displayObject);
		 *      var point = myDisplayObject.globalToLocal(100, 100);
		 *      // Results in x=-200, y=-100
		 *
		 * @method globalToLocal
		 * @param {Number} x The x position on the stage to transform.
		 * @param {Number} y The y position on the stage to transform.
		 * @return {Point} A Point instance with x and y properties correlating to the transformed position in the
		 * display object's coordinate space.
		 **/
		p.globalToLocal = function(x, y) {
			var mtx = this.getConcatenatedMatrix(this._matrix);
			if (mtx == null) { return null; }
			mtx.invert();
			mtx.append(1, 0, 0, 1, x, y);
			return new createjs.Point(mtx.tx, mtx.ty);
		};
	
		/**
		 * Transforms the specified x and y position from the coordinate space of this display object to the coordinate
		 * space of the target display object. Returns a Point instance with x and y properties correlating to the
		 * transformed position in the target's coordinate space. Effectively the same as using the following code with
		 * {{#crossLink "DisplayObject/localToGlobal"}}{{/crossLink}} and {{#crossLink "DisplayObject/globalToLocal"}}{{/crossLink}}.
		 *
		 *      var pt = this.localToGlobal(x, y);
		 *      pt = target.globalToLocal(pt.x, pt.y);
		 *
		 * @method localToLocal
		 * @param {Number} x The x position in the source display object to transform.
		 * @param {Number} y The y position on the source display object to transform.
		 * @param {DisplayObject} target The target display object to which the coordinates will be transformed.
		 * @return {Point} Returns a Point instance with x and y properties correlating to the transformed position
		 * in the target's coordinate space.
		 **/
		p.localToLocal = function(x, y, target) {
			var pt = this.localToGlobal(x, y);
			return target.globalToLocal(pt.x, pt.y);
		};
	
		/**
		 * Shortcut method to quickly set the transform properties on the display object. All parameters are optional.
		 * Omitted parameters will have the default value set.
		 *
		 * <h4>Example</h4>
		 *
		 *      displayObject.setTransform(100, 100, 2, 2);
		 *
		 * @method setTransform
		 * @param {Number} [x=0] The horizontal translation (x position) in pixels
		 * @param {Number} [y=0] The vertical translation (y position) in pixels
		 * @param {Number} [scaleX=1] The horizontal scale, as a percentage of 1
		 * @param {Number} [scaleY=1] the vertical scale, as a percentage of 1
		 * @param {Number} [rotation=0] The rotation, in degrees
		 * @param {Number} [skewX=0] The horizontal skew factor
		 * @param {Number} [skewY=0] The vertical skew factor
		 * @param {Number} [regX=0] The horizontal registration point in pixels
		 * @param {Number} [regY=0] The vertical registration point in pixels
		 * @return {DisplayObject} Returns this instance. Useful for chaining commands.
		*/
		p.setTransform = function(x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
			this.x = x || 0;
			this.y = y || 0;
			this.scaleX = scaleX == null ? 1 : scaleX;
			this.scaleY = scaleY == null ? 1 : scaleY;
			this.rotation = rotation || 0;
			this.skewX = skewX || 0;
			this.skewY = skewY || 0;
			this.regX = regX || 0;
			this.regY = regY || 0;
			return this;
		};
		
		/**
		 * Returns a matrix based on this object's transform.
		 * @method getMatrix
		 * @param {Matrix2D} matrix Optional. A Matrix2D object to populate with the calculated values. If null, a new
		 * Matrix object is returned.
		 * @return {Matrix2D} A matrix representing this display object's transform.
		 **/
		p.getMatrix = function(matrix) {
			var o = this;
			return (matrix ? matrix.identity() : new createjs.Matrix2D()).appendTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation, o.skewX, o.skewY, o.regX, o.regY).appendProperties(o.alpha, o.shadow, o.compositeOperation);
		};
		
		/**
		 * Generates a concatenated Matrix2D object representing the combined transform of the display object and all of its
		 * parent Containers up to the highest level ancestor (usually the {{#crossLink "Stage"}}{{/crossLink}}). This can
		 * be used to transform positions between coordinate spaces, such as with {{#crossLink "DisplayObject/localToGlobal"}}{{/crossLink}}
		 * and {{#crossLink "DisplayObject/globalToLocal"}}{{/crossLink}}.
		 * @method getConcatenatedMatrix
		 * @param {Matrix2D} [mtx] A {{#crossLink "Matrix2D"}}{{/crossLink}} object to populate with the calculated values.
		 * If null, a new Matrix2D object is returned.
		 * @return {Matrix2D} a concatenated Matrix2D object representing the combined transform of the display object and
		 * all of its parent Containers up to the highest level ancestor (usually the {{#crossLink "Stage"}}{{/crossLink}}).
		 **/
		p.getConcatenatedMatrix = function(matrix) {
			if (matrix) { matrix.identity(); }
			else { matrix = new createjs.Matrix2D(); }
			var o = this;
			while (o != null) {
				matrix.prependTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation, o.skewX, o.skewY, o.regX, o.regY).prependProperties(o.alpha, o.shadow, o.compositeOperation);
				o = o.parent;
			}
			return matrix;
		};
	
		/**
		 * Tests whether the display object intersects the specified local point (ie. draws a pixel with alpha > 0 at
		 * the specified position). This ignores the alpha, shadow and compositeOperation of the display object, and all
		 * transform properties including regX/Y.
		 *
		 * <h4>Example</h4>
		 *
		 *      stage.addEventListener("stagemousedown", handleMouseDown);
		 *      function handleMouseDown(event) {
		 *          var hit = myShape.hitTest(event.stageX, event.stageY);
		 *      }
		 *
		 * Please note that shape-to-shape collision is not currently supported by EaselJS.
		 * @method hitTest
		 * @param {Number} x The x position to check in the display object's local coordinates.
		 * @param {Number} y The y position to check in the display object's local coordinates.
		 * @return {Boolean} A Boolean indicting whether a visible portion of the DisplayObject intersect the specified
		 * local Point.
		*/
		p.hitTest = function(x, y) {
			// TODO: update with support for .hitArea and update hitArea docs?
			var ctx = DisplayObject._hitTestContext;
			ctx.setTransform(1, 0, 0, 1, -x, -y);
			this.draw(ctx);
	
			var hit = this._testHit(ctx);
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.clearRect(0, 0, 2, 2);
			return hit;
		};
		
		/**
		 * Provides a chainable shortcut method for setting a number of properties on a DisplayObject instance.
		 *
		 * <h4>Example</h4>
		 *
		 *      var myGraphics = new createjs.Graphics().beginFill("#ff0000").drawCircle(0, 0, 25);
		 *      var shape = stage.addChild(new Shape())
		 *          .set({graphics:myGraphics, x:100, y:100, alpha:0.5});
		 *
		 * @method set
		 * @param {Object} props A generic object containing properties to copy to the DisplayObject instance.
		 * @return {DisplayObject} Returns The DisplayObject instance the method is called on (useful for chaining calls.)
		*/
		p.set = function(props) {
			for (var n in props) { this[n] = props[n]; }
			return this;
		};
		
		/**
		 * Returns a rectangle representing this object's bounds in its local coordinate system (ie. with no transformation).
		 * Objects that have been cached will return the bounds of the cache.
		 * 
		 * Not all display objects can calculate their own bounds (ex. Shape). For these objects, you can use 
		 * {{#crossLink "DisplayObject/setBounds"}}{{/crossLink}} so that they are included when calculating Container
		 * bounds.
		 * 
		 * <table>
		 * 	<tr><td><b>All</b></td><td>
		 * 		All display objects support setting bounds manually using setBounds(). Likewise, display objects that
		 * 		have been cached using cache() will return the bounds of their cache. Manual and cache bounds will override
		 * 		the automatic calculations listed below.
		 * 	</td></tr>
		 * 	<tr><td><b>Bitmap</b></td><td>
		 * 		Returns the width and height of the sourceRect (if specified) or image, extending from (x=0,y=0).
		 * 	</td></tr>
		 * 	<tr><td><b>Sprite</b></td><td>
		 * 		Returns the bounds of the current frame. May have non-zero x/y if a frame registration point was specified
		 * 		in the spritesheet data. See also {{#crossLink "SpriteSheet/getFrameBounds"}}{{/crossLink}}
		 * 	</td></tr>
		 * 	<tr><td><b>Container</b></td><td>
		 * 		Returns the aggregate (combined) bounds of all children that return a non-null value from getBounds().
		 * 	</td></tr>
		 * 	<tr><td><b>Shape</b></td><td>
		 * 		Does not currently support automatic bounds calculations. Use setBounds() to manually define bounds.
		 * 	</td></tr>
		 * 	<tr><td><b>Text</b></td><td>
		 * 		Returns approximate bounds. Horizontal values (x/width) are quite accurate, but vertical values (y/height) are
		 * 		not, especially when using textBaseline values other than "top".
		 * 	</td></tr>
		 * 	<tr><td><b>BitmapText</b></td><td>
		 * 		Returns approximate bounds. Values will be more accurate if spritesheet frame registration points are close
		 * 		to (x=0,y=0).
		 * 	</td></tr>
		* </table>
		 * 
		 * Bounds can be expensive to calculate for some objects (ex. text, or containers with many children), and
		 * are recalculated each time you call getBounds(). You can prevent recalculation on static objects by setting the
		 * bounds explicitly:
		 * 
		 * 	var bounds = obj.getBounds();
		 * 	obj.setBounds(bounds.x, bounds.y, bounds.width, bounds.height);
		 * 	// getBounds will now use the set values, instead of recalculating
		 * 
		 * To reduce memory impact, the returned Rectangle instance may be reused internally; clone the instance or copy its
		 * values if you need to retain it.
		 * 
		 * 	var myBounds = obj.getBounds().clone();
		 * 	// OR:
		 * 	myRect.copy(obj.getBounds());
		 * 
		 * @method getBounds
		 * @return {Rectangle} A Rectangle instance representing the bounds, or null if bounds are not available for this
		 * object.
		 **/
		p.getBounds = function() {
			if (this._bounds) { return this._rectangle.copy(this._bounds); }
			var cacheCanvas = this.cacheCanvas;
			if (cacheCanvas) {
				var scale = this._cacheScale;
				return this._rectangle.initialize(this._cacheOffsetX, this._cacheOffsetY, cacheCanvas.width/scale, cacheCanvas.height/scale);
			}
			return null;
		};
		
		/**
		 * Returns a rectangle representing this object's bounds in its parent's coordinate system (ie. with transformations applied).
		 * Objects that have been cached will return the transformed bounds of the cache.
		 * 
		 * Not all display objects can calculate their own bounds (ex. Shape). For these objects, you can use 
		 * {{#crossLink "DisplayObject/setBounds"}}{{/crossLink}} so that they are included when calculating Container
		 * bounds.
		 * 
		 * To reduce memory impact, the returned Rectangle instance may be reused internally; clone the instance or copy its
		 * values if you need to retain it.
		 * 
		 * Container instances calculate aggregate bounds for all children that return bounds via getBounds.
		 * @method getTransformedBounds
		 * @return {Rectangle} A Rectangle instance representing the bounds, or null if bounds are not available for this object.
		 **/
		p.getTransformedBounds = function() {
			return this._getBounds();
		};
		
		/**
		 * Allows you to manually specify the bounds of an object that either cannot calculate their own bounds (ex. Shape &
		 * Text) for future reference, or so the object can be included in Container bounds. Manually set bounds will always
		 * override calculated bounds.
		 * 
		 * The bounds should be specified in the object's local (untransformed) coordinates. For example, a Shape instance
		 * with a 25px radius circle centered at 0,0 would have bounds of (-25, -25, 50, 50).
		 * @method setBounds
		 * @param {Number} x The x origin of the bounds. Pass null to remove the manual bounds.
		 * @param {Number} y The y origin of the bounds.
		 * @param {Number} width The width of the bounds.
		 * @param {Number} height The height of the bounds.
		 **/
		p.setBounds = function(x, y, width, height) {
			if (x == null) { this._bounds = x; }
			this._bounds = (this._bounds || new createjs.Rectangle()).initialize(x, y, width, height);
		};
	
		/**
		 * Returns a clone of this DisplayObject. Some properties that are specific to this instance's current context are
		 * reverted to their defaults (for example .parent). Also note that caches are not maintained across clones.
		 * @method clone
		 * @return {DisplayObject} A clone of the current DisplayObject instance.
		 **/
		p.clone = function() {
			var o = new DisplayObject();
			this.cloneProps(o);
			return o;
		};
	
		/**
		 * Returns a string representation of this object.
		 * @method toString
		 * @return {String} a string representation of the instance.
		 **/
		p.toString = function() {
			return "[DisplayObject (name="+  this.name +")]";
		};
	
	// private methods:
	
		// separated so it can be used more easily in subclasses:
		/**
		 * @method cloneProps
		 * @protected
		 * @param {DisplayObject} o The DisplayObject instance which will have properties from the current DisplayObject
		 * instance copied into.
		 **/
		p.cloneProps = function(o) {
			o.alpha = this.alpha;
			o.name = this.name;
			o.regX = this.regX;
			o.regY = this.regY;
			o.rotation = this.rotation;
			o.scaleX = this.scaleX;
			o.scaleY = this.scaleY;
			o.shadow = this.shadow;
			o.skewX = this.skewX;
			o.skewY = this.skewY;
			o.visible = this.visible;
			o.x  = this.x;
			o.y = this.y;
			o._bounds = this._bounds;
			o.mouseEnabled = this.mouseEnabled;
			o.compositeOperation = this.compositeOperation;
		};
	
		/**
		 * @method _applyShadow
		 * @protected
		 * @param {CanvasRenderingContext2D} ctx
		 * @param {Shadow} shadow
		 **/
		p._applyShadow = function(ctx, shadow) {
			shadow = shadow || Shadow.identity;
			ctx.shadowColor = shadow.color;
			ctx.shadowOffsetX = shadow.offsetX;
			ctx.shadowOffsetY = shadow.offsetY;
			ctx.shadowBlur = shadow.blur;
		};
		
		
		/**
		 * @method _tick
		 * @param {Array} params Parameters to pass on to any listeners of the tick function. This will usually include the
		 * properties from the {{#crossLink "Ticker"}}{{/crossLink}} "tick" event, such as `delta` and `paused`, but may
		 * be undefined or contain other values depending on the usage by the application.
		 * @protected
		 **/
		p._tick = function(params) {
			// because tick can be really performance sensitive, we'll inline some of the dispatchEvent work.
			var ls = this._listeners;
			if (ls && ls["tick"]) {
				var evt = new createjs.Event("tick");
				evt.params = params;
				this._dispatchEvent(evt, this, 2);
			}
		};
	
		/**
		 * @method _testHit
		 * @protected
		 * @param {CanvasRenderingContext2D} ctx
		 * @return {Boolean}
		 **/
		p._testHit = function(ctx) {
			try {
				var hit = ctx.getImageData(0, 0, 1, 1).data[3] > 1;
			} catch (e) {
				if (!DisplayObject.suppressCrossDomainErrors) {
					throw "An error has occurred. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images.";
				}
			}
			return hit;
		};
	
		/**
		 * @method _applyFilters
		 * @protected
		 **/
		p._applyFilters = function() {
			if (!this.filters || this.filters.length == 0 || !this.cacheCanvas) { return; }
			var l = this.filters.length;
			var ctx = this.cacheCanvas.getContext("2d");
			var w = this.cacheCanvas.width;
			var h = this.cacheCanvas.height;
			for (var i=0; i<l; i++) {
				this.filters[i].applyFilter(ctx, 0, 0, w, h);
			}
		};
		
		/**
		 * @method _applyFilterBounds
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Number} width
		 * @param {Number} height
		 * @return {Rectangle}
		 * @protected
		 **/
		p._applyFilterBounds = function(x, y, width, height) {
			var bounds, l, filters = this.filters;
			if (!filters || !(l=filters.length)) { return; }
			
			for (var i=0; i<l; i++) {
				var f = this.filters[i];
				var fBounds = f.getBounds&&f.getBounds();
				if (!fBounds) { continue; }
				if (!bounds) { bounds = this._rectangle.initialize(x,y,width,height); }
				bounds.x += fBounds.x;
				bounds.y += fBounds.y;
				bounds.width += fBounds.width;
				bounds.height += fBounds.height;
			}
			return bounds;
		};
		
		/**
		 * @method _getBounds
		 * @param {Matrix2D} matrix
		 * @param {Boolean} ignoreTransform If true, does not apply this object's transform.
		 * @return {Rectangle}
		 * @protected
		 **/
		p._getBounds = function(matrix, ignoreTransform){
			return this._transformBounds(this.getBounds(), matrix, ignoreTransform);
		};
		
		/**
		 * @method _transformBounds
		 * @param {Rectangle} bounds
		 * @param {Matrix2D} matrix
		 * @param {Boolean} ignoreTransform
		 * @return {Rectangle}
		 * @protected
		 **/
		p._transformBounds = function(bounds, matrix, ignoreTransform) {
			if (!bounds) { return bounds; }
			var x = bounds.x, y = bounds.y, width = bounds.width, height = bounds.height;
			var mtx = ignoreTransform ? this._matrix.identity() : this.getMatrix(this._matrix);
			
			if (x || y) { mtx.appendTransform(0,0,1,1,0,0,0,-x,-y); }
			if (matrix) { mtx.prependMatrix(matrix); }
			
			var x_a = width*mtx.a, x_b = width*mtx.b;
			var y_c = height*mtx.c, y_d = height*mtx.d;
			var tx = mtx.tx, ty = mtx.ty;
			
			var minX = tx, maxX = tx, minY = ty, maxY = ty;
	
			if ((x = x_a + tx) < minX) { minX = x; } else if (x > maxX) { maxX = x; }
			if ((x = x_a + y_c + tx) < minX) { minX = x; } else if (x > maxX) { maxX = x; }
			if ((x = y_c + tx) < minX) { minX = x; } else if (x > maxX) { maxX = x; }
			
			if ((y = x_b + ty) < minY) { minY = y; } else if (y > maxY) { maxY = y; }
			if ((y = x_b + y_d + ty) < minY) { minY = y; } else if (y > maxY) { maxY = y; }
			if ((y = y_d + ty) < minY) { minY = y; } else if (y > maxY) { maxY = y; }
			
			return bounds.initialize(minX, minY, maxX-minX, maxY-minY);
		};
	
	createjs.DisplayObject = DisplayObject;
	}());

/***/ },
/* 50 */
/***/ function(module, exports) {

	/*
	* Graphics
	* Visit http://createjs.com/ for documentation, updates and examples.
	*
	* Copyright (c) 2010 gskinner.com, inc.
	*
	* Permission is hereby granted, free of charge, to any person
	* obtaining a copy of this software and associated documentation
	* files (the "Software"), to deal in the Software without
	* restriction, including without limitation the rights to use,
	* copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the
	* Software is furnished to do so, subject to the following
	* conditions:
	*
	* The above copyright notice and this permission notice shall be
	* included in all copies or substantial portions of the Software.
	*
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	* OTHER DEALINGS IN THE SOFTWARE.
	*/
	
	/**
	 * @module EaselJS
	 */
	
	// namespace:
	this.createjs = this.createjs||{};
	
	(function() {
		"use strict";
	
	/**
	* Inner class used by the {{#crossLink "Graphics"}}{{/crossLink}} class. Used to create the instruction lists used in Graphics:
	* @class Command
	* @protected
	* @constructor
	**/
	function Command(f, params, path) {
		this.f = f;
		this.params = params;
		this.path = path==null ? true : path;
	}
	
	/**
	* @method exec
	* @protected
	* @param {Object} scope
	**/
	Command.prototype.exec = function(scope) { this.f.apply(scope, this.params); };
	
	/**
	 * The Graphics class exposes an easy to use API for generating vector drawing instructions and drawing them to a
	 * specified context. Note that you can use Graphics without any dependency on the Easel framework by calling {{#crossLink "DisplayObject/draw"}}{{/crossLink}}
	 * directly, or it can be used with the {{#crossLink "Shape"}}{{/crossLink}} object to draw vector graphics within the
	 * context of an Easel display list.
	 *
	 * <h4>Example</h4>
	 *      var g = new createjs.Graphics();
	 *	    g.setStrokeStyle(1);
	 *	    g.beginStroke(createjs.Graphics.getRGB(0,0,0));
	 *	    g.beginFill(createjs.Graphics.getRGB(255,0,0));
	 *	    g.drawCircle(0,0,3);
	 *
	 *	    var s = new createjs.Shape(g);
	 *	    	s.x = 100;
	 *	    	s.y = 100;
	 *
	 *	    stage.addChild(s);
	 *	    stage.update();
	 *
	 * Note that all drawing methods in Graphics return the Graphics instance, so they can be chained together. For example,
	 * the following line of code would generate the instructions to draw a rectangle with a red stroke and blue fill, then
	 * render it to the specified context2D:
	 *
	 *      myGraphics.beginStroke("#F00").beginFill("#00F").drawRect(20, 20, 100, 50).draw(myContext2D);
	 *
	 * <h4>Tiny API</h4>
	 * The Graphics class also includes a "tiny API", which is one or two-letter methods that are shortcuts for all of the
	 * Graphics methods. These methods are great for creating compact instructions, and is used by the Toolkit for CreateJS
	 * to generate readable code. All tiny methods are marked as protected, so you can view them by enabling protected
	 * descriptions in the docs.
	 *
	 * <table>
	 *     <tr><td><b>Tiny</b></td><td><b>Method</b></td><td><b>Tiny</b></td><td><b>Method</b></td></tr>
	 *     <tr><td>mt</td><td>{{#crossLink "Graphics/moveTo"}}{{/crossLink}} </td>
	 *     <td>lt</td> <td>{{#crossLink "Graphics/lineTo"}}{{/crossLink}}</td></tr>
	 *     <tr><td>a/at</td><td>{{#crossLink "Graphics/arc"}}{{/crossLink}} / {{#crossLink "Graphics/arcTo"}}{{/crossLink}} </td>
	 *     <td>bt</td><td>{{#crossLink "Graphics/bezierCurveTo"}}{{/crossLink}} </td></tr>
	 *     <tr><td>qt</td><td>{{#crossLink "Graphics/quadraticCurveTo"}}{{/crossLink}} (also curveTo)</td>
	 *     <td>r</td><td>{{#crossLink "Graphics/rect"}}{{/crossLink}} </td></tr>
	 *     <tr><td>cp</td><td>{{#crossLink "Graphics/closePath"}}{{/crossLink}} </td>
	 *     <td>c</td><td>{{#crossLink "Graphics/clear"}}{{/crossLink}} </td></tr>
	 *     <tr><td>f</td><td>{{#crossLink "Graphics/beginFill"}}{{/crossLink}} </td>
	 *     <td>lf</td><td>{{#crossLink "Graphics/beginLinearGradientFill"}}{{/crossLink}} </td></tr>
	 *     <tr><td>rf</td><td>{{#crossLink "Graphics/beginRadialGradientFill"}}{{/crossLink}} </td>
	 *     <td>bf</td><td>{{#crossLink "Graphics/beginBitmapFill"}}{{/crossLink}} </td></tr>
	 *     <tr><td>ef</td><td>{{#crossLink "Graphics/endFill"}}{{/crossLink}} </td>
	 *     <td>ss</td><td>{{#crossLink "Graphics/setStrokeStyle"}}{{/crossLink}} </td></tr>
	 *     <tr><td>s</td><td>{{#crossLink "Graphics/beginStroke"}}{{/crossLink}} </td>
	 *     <td>ls</td><td>{{#crossLink "Graphics/beginLinearGradientStroke"}}{{/crossLink}} </td></tr>
	 *     <tr><td>rs</td><td>{{#crossLink "Graphics/beginRadialGradientStroke"}}{{/crossLink}} </td>
	 *     <td>bs</td><td>{{#crossLink "Graphics/beginBitmapStroke"}}{{/crossLink}} </td></tr>
	 *     <tr><td>es</td><td>{{#crossLink "Graphics/endStroke"}}{{/crossLink}} </td>
	 *     <td>dr</td><td>{{#crossLink "Graphics/drawRect"}}{{/crossLink}} </td></tr>
	 *     <tr><td>rr</td><td>{{#crossLink "Graphics/drawRoundRect"}}{{/crossLink}} </td>
	 *     <td>rc</td><td>{{#crossLink "Graphics/drawRoundRectComplex"}}{{/crossLink}} </td></tr>
	 *     <tr><td>dc</td><td>{{#crossLink "Graphics/drawCircle"}}{{/crossLink}} </td>
	 *     <td>de</td><td>{{#crossLink "Graphics/drawEllipse"}}{{/crossLink}} </td></tr>
	 *     <tr><td>dp</td><td>{{#crossLink "Graphics/drawPolyStar"}}{{/crossLink}} </td>
	 *     <td>p</td><td>{{#crossLink "Graphics/decodePath"}}{{/crossLink}} </td></tr>
	 * </table>
	 *
	 * Here is the above example, using the tiny API instead.
	 *
	 *      myGraphics.s("#F00").f("#00F").r(20, 20, 100, 50).draw(myContext2D);
	 *
	 * @class Graphics
	 * @constructor
	 * @for Graphics
	 **/
	var Graphics = function() {
		this.initialize();
	};
	var p = Graphics.prototype;
	
	// static public methods:
	
	
		/**
		 * Returns a CSS compatible color string based on the specified RGB numeric color values in the format
		 * "rgba(255,255,255,1.0)", or if alpha is null then in the format "rgb(255,255,255)". For example,
		 *
		 *      createjs.Graphics.getRGB(50, 100, 150, 0.5);
		 *      // Returns "rgba(50,100,150,0.5)"
		 *
		 * It also supports passing a single hex color value as the first param, and an optional alpha value as the second
		 * param. For example,
		 *
		 *      createjs.Graphics.getRGB(0xFF00FF, 0.2);
		 *      // Returns "rgba(255,0,255,0.2)"
		 *
		 * @method getRGB
		 * @static
		 * @param {Number} r The red component for the color, between 0 and 0xFF (255).
		 * @param {Number} g The green component for the color, between 0 and 0xFF (255).
		 * @param {Number} b The blue component for the color, between 0 and 0xFF (255).
		 * @param {Number} [alpha] The alpha component for the color where 0 is fully transparent and 1 is fully opaque.
		 * @return {String} A CSS compatible color string based on the specified RGB numeric color values in the format
		 * "rgba(255,255,255,1.0)", or if alpha is null then in the format "rgb(255,255,255)".
		 **/
		Graphics.getRGB = function(r, g, b, alpha) {
			if (r != null && b == null) {
				alpha = g;
				b = r&0xFF;
				g = r>>8&0xFF;
				r = r>>16&0xFF;
			}
			if (alpha == null) {
				return "rgb("+r+","+g+","+b+")";
			} else {
				return "rgba("+r+","+g+","+b+","+alpha+")";
			}
		};
	
		/**
		 * Returns a CSS compatible color string based on the specified HSL numeric color values in the format "hsla(360,100,100,1.0)",
		 * or if alpha is null then in the format "hsl(360,100,100)".
		 *
		 *      createjs.Graphics.getHSL(150, 100, 70);
		 *      // Returns "hsl(150,100,70)"
		 *
		 * @method getHSL
		 * @static
		 * @param {Number} hue The hue component for the color, between 0 and 360.
		 * @param {Number} saturation The saturation component for the color, between 0 and 100.
		 * @param {Number} lightness The lightness component for the color, between 0 and 100.
		 * @param {Number} [alpha] The alpha component for the color where 0 is fully transparent and 1 is fully opaque.
		 * @return {String} A CSS compatible color string based on the specified HSL numeric color values in the format
		 * "hsla(360,100,100,1.0)", or if alpha is null then in the format "hsl(360,100,100)".
		 **/
		Graphics.getHSL = function(hue, saturation, lightness, alpha) {
			if (alpha == null) {
				return "hsl("+(hue%360)+","+saturation+"%,"+lightness+"%)";
			} else {
				return "hsla("+(hue%360)+","+saturation+"%,"+lightness+"%,"+alpha+")";
			}
		};
	
	// static properties:
	
		/**
		 * Exposes the Command class used internally by Graphics. Useful for extending the Graphics class or injecting
		 * functionality.
		 * @property Command
		 * @static
		 * @type {Function}
		 **/
		Graphics.Command = Command;
	
		/**
		 * Map of Base64 characters to values. Used by {{#crossLink "Graphics/decodePath"}}{{/crossLink}}.
		 * @property BASE_64
		 * @static
		 * @final
		 * @readonly
		 * @type {Object}
		 **/
		Graphics.BASE_64 = {"A":0,"B":1,"C":2,"D":3,"E":4,"F":5,"G":6,"H":7,"I":8,"J":9,"K":10,"L":11,"M":12,"N":13,"O":14,"P":15,"Q":16,"R":17,"S":18,"T":19,"U":20,"V":21,"W":22,"X":23,"Y":24,"Z":25,"a":26,"b":27,"c":28,"d":29,"e":30,"f":31,"g":32,"h":33,"i":34,"j":35,"k":36,"l":37,"m":38,"n":39,"o":40,"p":41,"q":42,"r":43,"s":44,"t":45,"u":46,"v":47,"w":48,"x":49,"y":50,"z":51,"0":52,"1":53,"2":54,"3":55,"4":56,"5":57,"6":58,"7":59,"8":60,"9":61,"+":62,"/":63};
	
	
		/**
		 * Maps numeric values for the caps parameter of {{#crossLink "Graphics/setStrokeStyle"}}{{/crossLink}} to
		 * corresponding string values. This is primarily for use with the tiny API. The mappings are as follows: 0 to
		 * "butt", 1 to "round", and 2 to "square".
		 * For example, to set the line caps to "square":
		 *
		 *      myGraphics.ss(16, 2);
		 *
		 * @property STROKE_CAPS_MAP
		 * @static
		 * @final
		 * @readonly
		 * @type {Array}
		 **/
		Graphics.STROKE_CAPS_MAP = ["butt", "round", "square"];
	
		/**
		 * Maps numeric values for the joints parameter of {{#crossLink "Graphics/setStrokeStyle"}}{{/crossLink}} to
		 * corresponding string values. This is primarily for use with the tiny API. The mappings are as follows: 0 to
		 * "miter", 1 to "round", and 2 to "bevel".
		 * For example, to set the line joints to "bevel":
		 *
		 *      myGraphics.ss(16, 0, 2);
		 *
		 * @property STROKE_JOINTS_MAP
		 * @static
		 * @final
		 * @readonly
		 * @type {Array}
		 **/
		Graphics.STROKE_JOINTS_MAP = ["miter", "round", "bevel"];
	
		/**
		 * @property _ctx
		 * @static
		 * @protected
		 * @type {CanvasRenderingContext2D}
		 **/
		 
		/**
		 * @property beginCmd
		 * @static
		 * @protected
		 * @type {Command}
		 **/
		 
		/**
		 * @property fillCmd
		 * @static
		 * @protected
		 * @type {Command}
		 **/
		 
		/**
		 * @property strokeCmd
		 * @static
		 * @protected
		 * @type {Command}
		 **/
		var canvas = (createjs.createCanvas?createjs.createCanvas():document.createElement("canvas"));
		if (canvas.getContext) {
			var ctx = Graphics._ctx = canvas.getContext("2d");
			Graphics.beginCmd = new Command(ctx.beginPath, [], false);
			Graphics.fillCmd = new Command(ctx.fill, [], false);
			Graphics.strokeCmd = new Command(ctx.stroke, [], false);
			canvas.width = canvas.height = 1;
		}
		
	// public properties
	
	// private properties
		/**
		 * @property _strokeInstructions
		 * @protected
		 * @type {Array}
		 **/
		p._strokeInstructions = null;
	
		/**
		 * @property _strokeStyleInstructions
		 * @protected
		 * @type {Array}
		 **/
		p._strokeStyleInstructions = null;
	
		/**
		 * @property _strokeIgnoreScale
		 * @protected
		 * @type Boolean
		 **/
		p._strokeIgnoreScale = false;
	
		/**
		 * @property _fillInstructions
		 * @protected
		 * @type {Array}
		 **/
		p._fillInstructions = null;
	
		/**
		 * @property _strokeMatrix
		 * @protected
		 * @type {Array}
		 **/
		p._fillMatrix = null;
	
		/**
		 * @property _instructions
		 * @protected
		 * @type {Array}
		 **/
		p._instructions = null;
	
		/**
		 * @property _oldInstructions
		 * @protected
		 * @type {Array}
		 **/
		p._oldInstructions = null;
	
		/**
		 * @property _activeInstructions
		 * @protected
		 * @type {Array}
		 **/
		p._activeInstructions = null;
	
		/**
		 * @property _active
		 * @protected
		 * @type {Boolean}
		 * @default false
		 **/
		p._active = false;
	
		/**
		 * @property _dirty
		 * @protected
		 * @type {Boolean}
		 * @default false
		 **/
		p._dirty = false;
	
		/**
		 * Initialization method.
		 * @method initialize
		 * @protected
		 **/
		p.initialize = function() {
			this.clear();
			this._ctx = Graphics._ctx;
		};
	
		/**
		 * Returns true if this Graphics instance has no drawing commands.
		 * @method isEmpty
		 * @return {Boolean} Returns true if this Graphics instance has no drawing commands.
		 **/
		p.isEmpty = function() {
			return !(this._instructions.length || this._oldInstructions.length || this._activeInstructions.length);
		};
	
		/**
		 * Draws the display object into the specified context ignoring its visible, alpha, shadow, and transform.
		 * Returns true if the draw was handled (useful for overriding functionality).
		 *
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 * @method draw
		 * @param {CanvasRenderingContext2D} ctx The canvas 2D context object to draw into.
		 **/
		p.draw = function(ctx) {
			if (this._dirty) { this._updateInstructions(); }
			var instr = this._instructions;
			for (var i=0, l=instr.length; i<l; i++) {
				instr[i].exec(ctx);
			}
		};
	
		/**
		 * Draws only the path described for this Graphics instance, skipping any non-path instructions, including fill and
		 * stroke descriptions. Used by <code>DisplayObject.clippingPath</code> to draw the clipping path, for example.
		 * @method drawAsPath
		 * @param {CanvasRenderingContext2D} ctx The canvas 2D context object to draw into.
		 **/
		p.drawAsPath = function(ctx) {
			if (this._dirty) { this._updateInstructions(); }
			var instr, instrs = this._instructions;
			for (var i=0, l=instrs.length; i<l; i++) {
				// the first command is always a beginPath command.
				if ((instr = instrs[i]).path || i==0) { instr.exec(ctx); }
			}
		};
	
	// public methods that map directly to context 2D calls:
		/**
		 * Moves the drawing point to the specified position. A tiny API method "mt" also exists.
		 * @method moveTo
		 * @param {Number} x The x coordinate the drawing point should move to.
		 * @param {Number} y The y coordinate the drawing point should move to.
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls).
		 **/
		p.moveTo = function(x, y) {
			this._activeInstructions.push(new Command(this._ctx.moveTo, [x, y]));
			return this;
		};
	
		/**
		 * Draws a line from the current drawing point to the specified position, which become the new current drawing
		 * point. A tiny API method "lt" also exists.
		 *
		 * For detailed information, read the
		 * <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#complex-shapes-(paths)">
		 * whatwg spec</a>.
		 * @method lineTo
		 * @param {Number} x The x coordinate the drawing point should draw to.
		 * @param {Number} y The y coordinate the drawing point should draw to.
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		p.lineTo = function(x, y) {
			this._dirty = this._active = true;
			this._activeInstructions.push(new Command(this._ctx.lineTo, [x, y]));
			return this;
		};
	
		/**
		 * Draws an arc with the specified control points and radius.  For detailed information, read the
		 * <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#dom-context-2d-arcto">
		 * whatwg spec</a>. A tiny API method "at" also exists.
		 * @method arcTo
		 * @param {Number} x1
		 * @param {Number} y1
		 * @param {Number} x2
		 * @param {Number} y2
		 * @param {Number} radius
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		p.arcTo = function(x1, y1, x2, y2, radius) {
			this._dirty = this._active = true;
			this._activeInstructions.push(new Command(this._ctx.arcTo, [x1, y1, x2, y2, radius]));
			return this;
		};
	
		/**
		 * Draws an arc defined by the radius, startAngle and endAngle arguments, centered at the position (x, y). For
		 * example, to draw a full circle with a radius of 20 centered at (100, 100):
		 *
		 *      arc(100, 100, 20, 0, Math.PI*2);
		 *
		 * For detailed information, read the
		 * <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#dom-context-2d-arc">whatwg spec</a>.
		 * A tiny API method "a" also exists.
		 * @method arc
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Number} radius
		 * @param {Number} startAngle Measured in radians.
		 * @param {Number} endAngle Measured in radians.
		 * @param {Boolean} anticlockwise
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		p.arc = function(x, y, radius, startAngle, endAngle, anticlockwise) {
			this._dirty = this._active = true;
			if (anticlockwise == null) { anticlockwise = false; }
			this._activeInstructions.push(new Command(this._ctx.arc, [x, y, radius, startAngle, endAngle, anticlockwise]));
			return this;
		};
	
		/**
		 * Draws a quadratic curve from the current drawing point to (x, y) using the control point (cpx, cpy). For detailed
		 * information, read the <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#dom-context-2d-quadraticcurveto">
		 * whatwg spec</a>. A tiny API method "qt" also exists.
		 * @method quadraticCurveTo
		 * @param {Number} cpx
		 * @param {Number} cpy
		 * @param {Number} x
		 * @param {Number} y
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		p.quadraticCurveTo = function(cpx, cpy, x, y) {
			this._dirty = this._active = true;
			this._activeInstructions.push(new Command(this._ctx.quadraticCurveTo, [cpx, cpy, x, y]));
			return this;
		};
	
		/**
		 * Draws a bezier curve from the current drawing point to (x, y) using the control points (cp1x, cp1y) and (cp2x,
		 * cp2y). For detailed information, read the
		 * <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#dom-context-2d-beziercurveto">
		 * whatwg spec</a>. A tiny API method "bt" also exists.
		 * @method bezierCurveTo
		 * @param {Number} cp1x
		 * @param {Number} cp1y
		 * @param {Number} cp2x
		 * @param {Number} cp2y
		 * @param {Number} x
		 * @param {Number} y
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		p.bezierCurveTo = function(cp1x, cp1y, cp2x, cp2y, x, y) {
			this._dirty = this._active = true;
			this._activeInstructions.push(new Command(this._ctx.bezierCurveTo, [cp1x, cp1y, cp2x, cp2y, x, y]));
			return this;
		};
	
		/**
		 * Draws a rectangle at (x, y) with the specified width and height using the current fill and/or stroke.
		 * For detailed information, read the
		 * <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#dom-context-2d-rect">
		 * whatwg spec</a>. A tiny API method "r" also exists.
		 * @method rect
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Number} w Width of the rectangle
		 * @param {Number} h Height of the rectangle
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		p.rect = function(x, y, w, h) {
			this._dirty = this._active = true;
			this._activeInstructions.push(new Command(this._ctx.rect, [x, y, w, h]));
			return this;
		};
	
		/**
		 * Closes the current path, effectively drawing a line from the current drawing point to the first drawing point specified
		 * since the fill or stroke was last set. A tiny API method "cp" also exists.
		 * @method closePath
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		p.closePath = function() {
			if (this._active) {
				this._dirty = true;
				this._activeInstructions.push(new Command(this._ctx.closePath, []));
			}
			return this;
		};
	
	
	// public methods that roughly map to Flash graphics APIs:
		/**
		 * Clears all drawing instructions, effectively resetting this Graphics instance. Any line and fill styles will need
		 * to be redefined to draw shapes following a clear call. A tiny API method "c" also exists.
		 * @method clear
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		p.clear = function() {
			this._instructions = [];
			this._oldInstructions = [];
			this._activeInstructions = [];
			this._strokeStyleInstructions = this._strokeInstructions = this._fillInstructions = this._fillMatrix = null;
			this._active = this._dirty = this._strokeIgnoreScale = false;
			return this;
		};
	
		/**
		 * Begins a fill with the specified color. This ends the current sub-path. A tiny API method "f" also exists.
		 * @method beginFill
		 * @param {String} color A CSS compatible color value (ex. "red", "#FF0000", or "rgba(255,0,0,0.5)"). Setting to
		 * null will result in no fill.
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		p.beginFill = function(color) {
			if (this._active) { this._newPath(); }
			this._fillInstructions = color ? [new Command(this._setProp, ["fillStyle", color], false)] : null;
			this._fillMatrix = null;
			return this;
		};
	
		/**
		 * Begins a linear gradient fill defined by the line (x0, y0) to (x1, y1). This ends the current sub-path. For
		 * example, the following code defines a black to white vertical gradient ranging from 20px to 120px, and draws a
		 * square to display it:
		 *
		 *      myGraphics.beginLinearGradientFill(["#000","#FFF"], [0, 1], 0, 20, 0, 120).drawRect(20, 20, 120, 120);
		 *
		 * A tiny API method "lf" also exists.
		 * @method beginLinearGradientFill
		 * @param {Array} colors An array of CSS compatible color values. For example, ["#F00","#00F"] would define a gradient
		 * drawing from red to blue.
		 * @param {Array} ratios An array of gradient positions which correspond to the colors. For example, [0.1, 0.9] would draw
		 * the first color to 10% then interpolating to the second color at 90%.
		 * @param {Number} x0 The position of the first point defining the line that defines the gradient direction and size.
		 * @param {Number} y0 The position of the first point defining the line that defines the gradient direction and size.
		 * @param {Number} x1 The position of the second point defining the line that defines the gradient direction and size.
		 * @param {Number} y1 The position of the second point defining the line that defines the gradient direction and size.
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		p.beginLinearGradientFill = function(colors, ratios, x0, y0, x1, y1) {
			if (this._active) { this._newPath(); }
			var o = this._ctx.createLinearGradient(x0, y0, x1, y1);
			for (var i=0, l=colors.length; i<l; i++) {
				o.addColorStop(ratios[i], colors[i]);
			}
			this._fillInstructions = [new Command(this._setProp, ["fillStyle", o], false)];
			this._fillMatrix = null;
			return this;
		};
	
		/**
		 * Begins a radial gradient fill. This ends the current sub-path. For example, the following code defines a red to
		 * blue radial gradient centered at (100, 100), with a radius of 50, and draws a circle to display it:
		 *
		 *      myGraphics.beginRadialGradientFill(["#F00","#00F"], [0, 1], 100, 100, 0, 100, 100, 50).drawCircle(100, 100, 50);
		 *
		 * A tiny API method "rf" also exists.
		 * @method beginRadialGradientFill
		 * @param {Array} colors An array of CSS compatible color values. For example, ["#F00","#00F"] would define
		 * a gradient drawing from red to blue.
		 * @param {Array} ratios An array of gradient positions which correspond to the colors. For example, [0.1,
		 * 0.9] would draw the first color to 10% then interpolating to the second color at 90%.
		 * @param {Number} x0 Center position of the inner circle that defines the gradient.
		 * @param {Number} y0 Center position of the inner circle that defines the gradient.
		 * @param {Number} r0 Radius of the inner circle that defines the gradient.
		 * @param {Number} x1 Center position of the outer circle that defines the gradient.
		 * @param {Number} y1 Center position of the outer circle that defines the gradient.
		 * @param {Number} r1 Radius of the outer circle that defines the gradient.
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		p.beginRadialGradientFill = function(colors, ratios, x0, y0, r0, x1, y1, r1) {
			if (this._active) { this._newPath(); }
			var o = this._ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
			for (var i=0, l=colors.length; i<l; i++) {
				o.addColorStop(ratios[i], colors[i]);
			}
			this._fillInstructions = [new Command(this._setProp, ["fillStyle", o], false)];
			this._fillMatrix = null;
			return this;
		};
	
		/**
		 * Begins a pattern fill using the specified image. This ends the current sub-path. A tiny API method "bf" also
		 * exists.
		 * @method beginBitmapFill
		 * @param {HTMLImageElement | HTMLCanvasElement | HTMLVideoElement} image The Image, Canvas, or Video object to use
		 * as the pattern.
		 * @param {String} repetition Optional. Indicates whether to repeat the image in the fill area. One of "repeat",
		 * "repeat-x", "repeat-y", or "no-repeat". Defaults to "repeat". Note that Firefox does not support "repeat-x" or
		 * "repeat-y" (latest tests were in FF 20.0), and will default to "repeat".
		 * @param {Matrix2D} matrix Optional. Specifies a transformation matrix for the bitmap fill. This transformation
		 * will be applied relative to the parent transform.
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		p.beginBitmapFill = function(image, repetition, matrix) {
			if (this._active) { this._newPath(); }
			repetition = repetition || "";
			var o = this._ctx.createPattern(image, repetition);
			this._fillInstructions = [new Command(this._setProp, ["fillStyle", o], false)];
			this._fillMatrix = matrix ? [matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty] : null;
			return this;
		};
	
		/**
		 * Ends the current sub-path, and begins a new one with no fill. Functionally identical to <code>beginFill(null)</code>.
		 * A tiny API method "ef" also exists.
		 * @method endFill
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		p.endFill = function() {
			return this.beginFill();
		};
	
		/**
		 * Sets the stroke style for the current sub-path. Like all drawing methods, this can be chained, so you can define
		 * the stroke style and color in a single line of code like so:
		 *
		 *      myGraphics.setStrokeStyle(8,"round").beginStroke("#F00");
		 *
		 * A tiny API method "ss" also exists.
		 * @method setStrokeStyle
		 * @param {Number} thickness The width of the stroke.
		 * @param {String | Number} [caps=0] Indicates the type of caps to use at the end of lines. One of butt,
		 * round, or square. Defaults to "butt". Also accepts the values 0 (butt), 1 (round), and 2 (square) for use with
		 * the tiny API.
		 * @param {String | Number} [joints=0] Specifies the type of joints that should be used where two lines meet.
		 * One of bevel, round, or miter. Defaults to "miter". Also accepts the values 0 (miter), 1 (round), and 2 (bevel)
		 * for use with the tiny API.
		 * @param {Number} [miterLimit=10] If joints is set to "miter", then you can specify a miter limit ratio which
		 * controls at what point a mitered joint will be clipped.
		 * @param {Boolean} [ignoreScale=false] If true, the stroke will be drawn at the specified thickness regardless
		 * of active transformations.
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		p.setStrokeStyle = function(thickness, caps, joints, miterLimit, ignoreScale) {
			if (this._active) { this._newPath(); }
			this._strokeStyleInstructions = [
				new Command(this._setProp, ["lineWidth", (thickness == null ? "1" : thickness)], false),
				new Command(this._setProp, ["lineCap", (caps == null ? "butt" : (isNaN(caps) ? caps : Graphics.STROKE_CAPS_MAP[caps]))], false),
				new Command(this._setProp, ["lineJoin", (joints == null ? "miter" : (isNaN(joints) ? joints : Graphics.STROKE_JOINTS_MAP[joints]))], false),
				new Command(this._setProp, ["miterLimit", (miterLimit == null ? "10" : miterLimit)], false)
				];
			this._strokeIgnoreScale = ignoreScale;
			return this;
		};
	
		/**
		 * Begins a stroke with the specified color. This ends the current sub-path. A tiny API method "s" also exists.
		 * @method beginStroke
		 * @param {String} color A CSS compatible color value (ex. "#FF0000", "red", or "rgba(255,0,0,0.5)"). Setting to
		 * null will result in no stroke.
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		p.beginStroke = function(color) {
			if (this._active) { this._newPath(); }
			this._strokeInstructions = color ? [new Command(this._setProp, ["strokeStyle", color], false)] : null;
			return this;
		};
	
		/**
		 * Begins a linear gradient stroke defined by the line (x0, y0) to (x1, y1). This ends the current sub-path. For
		 * example, the following code defines a black to white vertical gradient ranging from 20px to 120px, and draws a
		 * square to display it:
		 *
		 *      myGraphics.setStrokeStyle(10).
		 *          beginLinearGradientStroke(["#000","#FFF"], [0, 1], 0, 20, 0, 120).drawRect(20, 20, 120, 120);
		 *
		 * A tiny API method "ls" also exists.
		 * @method beginLinearGradientStroke
		 * @param {Array} colors An array of CSS compatible color values. For example, ["#F00","#00F"] would define
		 * a gradient drawing from red to blue.
		 * @param {Array} ratios An array of gradient positions which correspond to the colors. For example, [0.1,
		 * 0.9] would draw the first color to 10% then interpolating to the second color at 90%.
		 * @param {Number} x0 The position of the first point defining the line that defines the gradient direction and size.
		 * @param {Number} y0 The position of the first point defining the line that defines the gradient direction and size.
		 * @param {Number} x1 The position of the second point defining the line that defines the gradient direction and size.
		 * @param {Number} y1 The position of the second point defining the line that defines the gradient direction and size.
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		p.beginLinearGradientStroke = function(colors, ratios, x0, y0, x1, y1) {
			if (this._active) { this._newPath(); }
			var o = this._ctx.createLinearGradient(x0, y0, x1, y1);
			for (var i=0, l=colors.length; i<l; i++) {
				o.addColorStop(ratios[i], colors[i]);
			}
			this._strokeInstructions = [new Command(this._setProp, ["strokeStyle", o], false)];
			return this;
		};
	
	
		/**
		 * Begins a radial gradient stroke. This ends the current sub-path. For example, the following code defines a red to
		 * blue radial gradient centered at (100, 100), with a radius of 50, and draws a rectangle to display it:
		 *
		 *      myGraphics.setStrokeStyle(10)
		 *          .beginRadialGradientStroke(["#F00","#00F"], [0, 1], 100, 100, 0, 100, 100, 50)
		 *          .drawRect(50, 90, 150, 110);
		 *
		 * A tiny API method "rs" also exists.
		 * @method beginRadialGradientStroke
		 * @param {Array} colors An array of CSS compatible color values. For example, ["#F00","#00F"] would define
		 * a gradient drawing from red to blue.
		 * @param {Array} ratios An array of gradient positions which correspond to the colors. For example, [0.1,
		 * 0.9] would draw the first color to 10% then interpolating to the second color at 90%, then draw the second color
		 * to 100%.
		 * @param {Number} x0 Center position of the inner circle that defines the gradient.
		 * @param {Number} y0 Center position of the inner circle that defines the gradient.
		 * @param {Number} r0 Radius of the inner circle that defines the gradient.
		 * @param {Number} x1 Center position of the outer circle that defines the gradient.
		 * @param {Number} y1 Center position of the outer circle that defines the gradient.
		 * @param {Number} r1 Radius of the outer circle that defines the gradient.
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		p.beginRadialGradientStroke = function(colors, ratios, x0, y0, r0, x1, y1, r1) {
			if (this._active) { this._newPath(); }
			var o = this._ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
			for (var i=0, l=colors.length; i<l; i++) {
				o.addColorStop(ratios[i], colors[i]);
			}
			this._strokeInstructions = [new Command(this._setProp, ["strokeStyle", o], false)];
			return this;
		};
	
		/**
		 * Begins a pattern fill using the specified image. This ends the current sub-path. Note that unlike bitmap fills,
		 * strokes do not currently support a matrix parameter due to limitations in the canvas API. A tiny API method "bs"
		 * also exists.
		 * @method beginBitmapStroke
		 * @param {HTMLImageElement | HTMLCanvasElement | HTMLVideoElement} image The Image, Canvas, or Video object to use
		 * as the pattern.
		 * @param {String} [repetition=repeat] Optional. Indicates whether to repeat the image in the fill area. One of
		 * "repeat", "repeat-x", "repeat-y", or "no-repeat". Defaults to "repeat".
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		p.beginBitmapStroke = function(image, repetition) {
			// NOTE: matrix is not supported for stroke because transforms on strokes also affect the drawn stroke width.
			if (this._active) { this._newPath(); }
			repetition = repetition || "";
			var o = this._ctx.createPattern(image, repetition);
			this._strokeInstructions = [new Command(this._setProp, ["strokeStyle", o], false)];
			return this;
		};
	
		/**
		 * Ends the current sub-path, and begins a new one with no stroke. Functionally identical to <code>beginStroke(null)</code>.
		 * A tiny API method "es" also exists.
		 * @method endStroke
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		p.endStroke = function() {
			this.beginStroke();
			return this;
		};
	
		/**
		 * Maps the familiar ActionScript <code>curveTo()</code> method to the functionally similar {{#crossLink "Graphics/quadraticCurveTo"}}{{/crossLink}}
		 * method.
		 * @method curveTo
		 * @type {Function}
		 **/
		p.curveTo = p.quadraticCurveTo;
	
		/**
		 * Maps the familiar ActionScript <code>drawRect()</code> method to the functionally similar {{#crossLink "Graphics/rect"}}{{/crossLink}}
		 * method.
		 * @method drawRect
		 * @type {Function}
		 **/
		p.drawRect = p.rect;
	
		/**
		 * Draws a rounded rectangle with all corners with the specified radius.
		 * @method drawRoundRect
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Number} w
		 * @param {Number} h
		 * @param {Number} radius Corner radius.
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		p.drawRoundRect = function(x, y, w, h, radius) {
			this.drawRoundRectComplex(x, y, w, h, radius, radius, radius, radius);
			return this;
		};
	
		/**
		 * Draws a rounded rectangle with different corner radii. Supports positive and negative corner radii. A tiny API
		 * method "rc" also exists.
		 * @method drawRoundRectComplex
		 * @param {Number} x The horizontal coordinate to draw the round rect.
		 * @param {Number} y The vertical coordinate to draw the round rect.
		 * @param {Number} w The width of the round rect.
		 * @param {Number} h The height of the round rect.
		 * @param {Number} radiusTL Top left corner radius.
		 * @param {Number} radiusTR Top right corner radius.
		 * @param {Number} radiusBR Bottom right corner radius.
		 * @param {Number} radiusBL Bottom left corner radius.
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		p.drawRoundRectComplex = function(x, y, w, h, radiusTL, radiusTR, radiusBR, radiusBL) {
			var max = (w<h?w:h)/2;
			var mTL=0, mTR=0, mBR=0, mBL=0;
			if (radiusTL < 0) { radiusTL *= (mTL=-1); }
			if (radiusTL > max) { radiusTL = max; }
			if (radiusTR < 0) { radiusTR *= (mTR=-1); }
			if (radiusTR > max) { radiusTR = max; }
			if (radiusBR < 0) { radiusBR *= (mBR=-1); }
			if (radiusBR > max) { radiusBR = max; }
			if (radiusBL < 0) { radiusBL *= (mBL=-1); }
			if (radiusBL > max) { radiusBL = max; }
	
			this._dirty = this._active = true;
			var arcTo=this._ctx.arcTo, lineTo=this._ctx.lineTo;
			this._activeInstructions.push(
				new Command(this._ctx.moveTo, [x+w-radiusTR, y]),
				new Command(arcTo, [x+w+radiusTR*mTR, y-radiusTR*mTR, x+w, y+radiusTR, radiusTR]),
				new Command(lineTo, [x+w, y+h-radiusBR]),
				new Command(arcTo, [x+w+radiusBR*mBR, y+h+radiusBR*mBR, x+w-radiusBR, y+h, radiusBR]),
				new Command(lineTo, [x+radiusBL, y+h]),
				new Command(arcTo, [x-radiusBL*mBL, y+h+radiusBL*mBL, x, y+h-radiusBL, radiusBL]),
				new Command(lineTo, [x, y+radiusTL]),
				new Command(arcTo, [x-radiusTL*mTL, y-radiusTL*mTL, x+radiusTL, y, radiusTL]),
				new Command(this._ctx.closePath)
			);
			return this;
		};
	
		/**
		 * Draws a circle with the specified radius at (x, y).
		 *
		 *      var g = new createjs.Graphics();
		 *	    g.setStrokeStyle(1);
		 *	    g.beginStroke(createjs.Graphics.getRGB(0,0,0));
		 *	    g.beginFill(createjs.Graphics.getRGB(255,0,0));
		 *	    g.drawCircle(0,0,3);
		 *
		 *	    var s = new createjs.Shape(g);
		 *		s.x = 100;
		 *		s.y = 100;
		 *
		 *	    stage.addChild(s);
		 *	    stage.update();
		 *
		 * A tiny API method "dc" also exists.
		 * @method drawCircle
		 * @param {Number} x x coordinate center point of circle.
		 * @param {Number} y y coordinate center point of circle.
		 * @param {Number} radius Radius of circle.
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		p.drawCircle = function(x, y, radius) {
			this.arc(x, y, radius, 0, Math.PI*2);
			return this;
		};
	
		/**
		 * Draws an ellipse (oval) with a specified width (w) and height (h). Similar to {{#crossLink "Graphics/drawCircle"}}{{/crossLink}},
		 * except the width and height can be different. A tiny API method "de" also exists.
		 * @method drawEllipse
		 * @param {Number} x x coordinate center point of ellipse.
		 * @param {Number} y y coordinate center point of ellipse.
		 * @param {Number} w height (horizontal diameter) of ellipse. The horizontal radius will be half of this number.
		 * @param {Number} h width (vertical diameter) of ellipse. The vertical radius will be half of this number.
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		p.drawEllipse = function(x, y, w, h) {
			this._dirty = this._active = true;
			var k = 0.5522848;
			var ox = (w / 2) * k;
			var oy = (h / 2) * k;
			var xe = x + w;
			var ye = y + h;
			var xm = x + w / 2;
			var ym = y + h / 2;
	
			this._activeInstructions.push(
				new Command(this._ctx.moveTo, [x, ym]),
				new Command(this._ctx.bezierCurveTo, [x, ym-oy, xm-ox, y, xm, y]),
				new Command(this._ctx.bezierCurveTo, [xm+ox, y, xe, ym-oy, xe, ym]),
				new Command(this._ctx.bezierCurveTo, [xe, ym+oy, xm+ox, ye, xm, ye]),
				new Command(this._ctx.bezierCurveTo, [xm-ox, ye, x, ym+oy, x, ym])
			);
			return this;
		};
	
		/**
		 * Provides a method for injecting arbitrary Context2D (aka Canvas) API calls into a Graphics queue. The specified
		 * callback function will be called in sequence with other drawing instructions. The callback will be executed in the
		 * scope of the target canvas's Context2D object, and will be passed the data object as a parameter.
		 *
		 * This is an advanced feature. It can allow for powerful functionality, like injecting output from tools that
		 * export Context2D instructions, executing raw canvas calls within the context of the display list, or dynamically
		 * modifying colors or stroke styles within a Graphics instance over time, but it is not intended for general use.
		 *
		 * Within a Graphics queue, each path begins by applying the fill and stroke styles and settings, followed by
		 * drawing instructions, followed by the fill() and/or stroke() commands. This means that within a path, inject() can
		 * update the fill & stroke styles, but for it to be applied in a predictable manner, you must have begun a fill or
		 * stroke (as appropriate) normally via the Graphics API. For example:
		 *
		 * 	function setColor(color) {
		 * 		this.fillStyle = color;
		 * 	}
		 *
		 * 	// this will not draw anything - no fill was begun, so fill() is not called:
		 * 	myGraphics.inject(setColor, "red").drawRect(0,0,100,100);
		 *
		 * 	// this will draw the rect in green:
		 * 	myGraphics.beginFill("#000").inject(setColor, "green").drawRect(0,0,100,100);
		 *
		 * 	// this will draw both rects in blue, because there is only a single path
		 * 	// so the second inject overwrites the first:
		 * 	myGraphics.beginFill("#000").inject(setColor, "green").drawRect(0,0,100,100)
		 * 		.inject(setColor, "blue").drawRect(100,0,100,100);
		 *
		 * 	// this will draw the first rect in green, and the second in blue:
		 * 	myGraphics.beginFill("#000").inject(setColor, "green").drawRect(0,0,100,100)
		 * 		.beginFill("#000").inject(setColor, "blue").drawRect(100,0,100,100);
		 *
		 * @method inject
		 * @param {Function} callback The function to execute.
		 * @param {Object} data Arbitrary data that will be passed to the callback when it is executed.
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		p.inject = function(callback, data) {
			this._dirty = this._active = true;
	
			this._activeInstructions.push(
				new Command(callback, [data])
			);
			return this;
		};
	
		/**
		 * Draws a star if pointSize is greater than 0, or a regular polygon if pointSize is 0 with the specified number of
		 * points. For example, the following code will draw a familiar 5 pointed star shape centered at 100, 100 and with a
		 * radius of 50:
		 *
		 *      myGraphics.beginFill("#FF0").drawPolyStar(100, 100, 50, 5, 0.6, -90);
		 *      // Note: -90 makes the first point vertical
		 *
		 * A tiny API method "dp" also exists.
		 *
		 * @method drawPolyStar
		 * @param {Number} x Position of the center of the shape.
		 * @param {Number} y Position of the center of the shape.
		 * @param {Number} radius The outer radius of the shape.
		 * @param {Number} sides The number of points on the star or sides on the polygon.
		 * @param {Number} pointSize The depth or "pointy-ness" of the star points. A pointSize of 0 will draw a regular
		 * polygon (no points), a pointSize of 1 will draw nothing because the points are infinitely pointy.
		 * @param {Number} angle The angle of the first point / corner. For example a value of 0 will draw the first point
		 * directly to the right of the center.
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		p.drawPolyStar = function(x, y, radius, sides, pointSize, angle) {
			this._dirty = this._active = true;
			if (pointSize == null) { pointSize = 0; }
			pointSize = 1-pointSize;
			if (angle == null) { angle = 0; }
			else { angle /= 180/Math.PI; }
			var a = Math.PI/sides;
	
			this._activeInstructions.push(new Command(this._ctx.moveTo, [x+Math.cos(angle)*radius, y+Math.sin(angle)*radius]));
			for (var i=0; i<sides; i++) {
				angle += a;
				if (pointSize != 1) {
					this._activeInstructions.push(new Command(this._ctx.lineTo, [x+Math.cos(angle)*radius*pointSize, y+Math.sin(angle)*radius*pointSize]));
				}
				angle += a;
				this._activeInstructions.push(new Command(this._ctx.lineTo, [x+Math.cos(angle)*radius, y+Math.sin(angle)*radius]));
			}
			return this;
		};
	
		/**
		 * Decodes a compact encoded path string into a series of draw instructions.
		 * This format is not intended to be human readable, and is meant for use by authoring tools.
		 * The format uses a base64 character set, with each character representing 6 bits, to define a series of draw
		 * commands.
		 *
		 * Each command is comprised of a single "header" character followed by a variable number of alternating x and y
		 * position values. Reading the header bits from left to right (most to least significant): bits 1 to 3 specify the
		 * type of operation (0-moveTo, 1-lineTo, 2-quadraticCurveTo, 3-bezierCurveTo, 4-closePath, 5-7 unused). Bit 4
		 * indicates whether position values use 12 bits (2 characters) or 18 bits (3 characters), with a one indicating the
		 * latter. Bits 5 and 6 are currently unused.
		 *
		 * Following the header is a series of 0 (closePath), 2 (moveTo, lineTo), 4 (quadraticCurveTo), or 6 (bezierCurveTo)
		 * parameters. These parameters are alternating x/y positions represented by 2 or 3 characters (as indicated by the
		 * 4th bit in the command char). These characters consist of a 1 bit sign (1 is negative, 0 is positive), followed
		 * by an 11 (2 char) or 17 (3 char) bit integer value. All position values are in tenths of a pixel. Except in the
		 * case of move operations which are absolute, this value is a delta from the previous x or y position (as
		 * appropriate).
		 *
		 * For example, the string "A3cAAMAu4AAA" represents a line starting at -150,0 and ending at 150,0.
		 * <br />A - bits 000000. First 3 bits (000) indicate a moveTo operation. 4th bit (0) indicates 2 chars per
		 * parameter.
		 * <br />n0 - 110111011100. Absolute x position of -150.0px. First bit indicates a negative value, remaining bits
		 * indicate 1500 tenths of a pixel.
		 * <br />AA - 000000000000. Absolute y position of 0.
		 * <br />I - 001100. First 3 bits (001) indicate a lineTo operation. 4th bit (1) indicates 3 chars per parameter.
		 * <br />Au4 - 000000101110111000. An x delta of 300.0px, which is added to the previous x value of -150.0px to
		 * provide an absolute position of +150.0px.
		 * <br />AAA - 000000000000000000. A y delta value of 0.
		 *
		 * A tiny API method "p" also exists.
		 * @method decodePath
		 * @param {String} str The path string to decode.
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		p.decodePath = function(str) {
			var instructions = [this.moveTo, this.lineTo, this.quadraticCurveTo, this.bezierCurveTo, this.closePath];
			var paramCount = [2, 2, 4, 6, 0];
			var i=0, l=str.length;
			var params = [];
			var x=0, y=0;
			var base64 = Graphics.BASE_64;
	
			while (i<l) {
				var c = str.charAt(i);
				var n = base64[c];
				var fi = n>>3; // highest order bits 1-3 code for operation.
				var f = instructions[fi];
				// check that we have a valid instruction & that the unused bits are empty:
				if (!f || (n&3)) { throw("bad path data (@"+i+"): "+c); }
				var pl = paramCount[fi];
				if (!fi) { x=y=0; } // move operations reset the position.
				params.length = 0;
				i++;
				var charCount = (n>>2&1)+2;  // 4th header bit indicates number size for this operation.
				for (var p=0; p<pl; p++) {
					var num = base64[str.charAt(i)];
					var sign = (num>>5) ? -1 : 1;
					num = ((num&31)<<6)|(base64[str.charAt(i+1)]);
					if (charCount == 3) { num = (num<<6)|(base64[str.charAt(i+2)]); }
					num = sign*num/10;
					if (p%2) { x = (num += x); }
					else { y = (num += y); }
					params[p] = num;
					i += charCount;
				}
				f.apply(this,params);
			}
			return this;
		};
	
		/**
		 * Returns a clone of this Graphics instance.
		 * @method clone
		 * @return {Graphics} A clone of the current Graphics instance.
		 **/
		p.clone = function() {
			var o = new Graphics();
			o._instructions = this._instructions.slice();
			o._activeInstructions = this._activeInstructions.slice();
			o._oldInstructions = this._oldInstructions.slice();
			if (this._fillInstructions) { o._fillInstructions = this._fillInstructions.slice(); }
			if (this._strokeInstructions) { o._strokeInstructions = this._strokeInstructions.slice(); }
			if (this._strokeStyleInstructions) { o._strokeStyleInstructions = this._strokeStyleInstructions.slice(); }
			o._active = this._active;
			o._dirty = this._dirty;
			o._fillMatrix = this._fillMatrix;
			o._strokeIgnoreScale = this._strokeIgnoreScale;
			return o;
		};
	
		/**
		 * Returns a string representation of this object.
		 * @method toString
		 * @return {String} a string representation of the instance.
		 **/
		p.toString = function() {
			return "[Graphics]";
		};
	
	
	// tiny API:
		/** Shortcut to moveTo.
		 * @method mt
		 * @protected
		 * @type {Function}
		 **/
		p.mt = p.moveTo;
	
		/** Shortcut to lineTo.
		 * @method lt
		 * @protected
		 * @type {Function}
		 **/
		p.lt = p.lineTo;
	
		/** Shortcut to arcTo.
		 * @method at
		 * @protected
		 * @type {Function}
		 **/
		p.at = p.arcTo;
	
		/** Shortcut to bezierCurveTo.
		 * @method bt
		 * @protected
		 * @type {Function}
		 **/
		p.bt = p.bezierCurveTo;
	
		/** Shortcut to quadraticCurveTo / curveTo.
		 * @method qt
		 * @protected
		 * @type {Function}
		 **/
		p.qt = p.quadraticCurveTo;
	
		/** Shortcut to arc.
		 * @method a
		 * @protected
		 * @type {Function}
		 **/
		p.a = p.arc;
	
		/** Shortcut to rect.
		 * @method r
		 * @protected
		 * @type {Function}
		 **/
		p.r = p.rect;
	
		/** Shortcut to closePath.
		 * @method cp
		 * @protected
		 * @type {Function}
		 **/
		p.cp = p.closePath;
	
		/** Shortcut to clear.
		 * @method c
		 * @protected
		 * @type {Function}
		 **/
		p.c = p.clear;
	
		/** Shortcut to beginFill.
		 * @method f
		 * @protected
		 * @type {Function}
		 **/
		p.f = p.beginFill;
	
		/** Shortcut to beginLinearGradientFill.
		 * @method lf
		 * @protected
		 * @type {Function}
		 **/
		p.lf = p.beginLinearGradientFill;
	
		/** Shortcut to beginRadialGradientFill.
		 * @method rf
		 * @protected
		 * @type {Function}
		 **/
		p.rf = p.beginRadialGradientFill;
	
		/** Shortcut to beginBitmapFill.
		 * @method bf
		 * @protected
		 * @type {Function}
		 **/
		p.bf = p.beginBitmapFill;
	
		/** Shortcut to endFill.
		 * @method ef
		 * @protected
		 * @type {Function}
		 **/
		p.ef = p.endFill;
	
		/** Shortcut to setStrokeStyle.
		 * @method ss
		 * @protected
		 * @type {Function}
		 **/
		p.ss = p.setStrokeStyle;
	
		/** Shortcut to beginStroke.
		 * @method s
		 * @protected
		 * @type {Function}
		 **/
		p.s = p.beginStroke;
	
		/** Shortcut to beginLinearGradientStroke.
		 * @method ls
		 * @protected
		 * @type {Function}
		 **/
		p.ls = p.beginLinearGradientStroke;
	
		/** Shortcut to beginRadialGradientStroke.
		 * @method rs
		 * @protected
		 * @type {Function}
		 **/
		p.rs = p.beginRadialGradientStroke;
	
		/** Shortcut to beginBitmapStroke.
		 * @method bs
		 * @protected
		 * @type {Function}
		 **/
		p.bs = p.beginBitmapStroke;
	
		/** Shortcut to endStroke.
		 * @method es
		 * @protected
		 * @type {Function}
		 **/
		p.es = p.endStroke;
	
		/** Shortcut to drawRect.
		 * @method dr
		 * @protected
		 * @type {Function}
		 **/
		p.dr = p.drawRect;
	
		/** Shortcut to drawRoundRect.
		 * @method rr
		 * @protected
		 * @type {Function}
		 **/
		p.rr = p.drawRoundRect;
	
		/** Shortcut to drawRoundRectComplex.
		 * @method rc
		 * @protected
		 * @type {Function}
		 **/
		p.rc = p.drawRoundRectComplex;
	
		/** Shortcut to drawCircle.
		 * @method dc
		 * @protected
		 * @type {Function}
		 **/
		p.dc = p.drawCircle;
	
		/** Shortcut to drawEllipse.
		 * @method de
		 * @protected
		 * @type {Function}
		 **/
		p.de = p.drawEllipse;
	
		/** Shortcut to drawPolyStar.
		 * @method dp
		 * @protected
		 * @type {Function}
		 **/
		p.dp = p.drawPolyStar;
	
		/** Shortcut to decodePath.
		 * @method p
		 * @protected
		 * t@ype Function
		 **/
		p.p = p.decodePath;
	
	
	// private methods:
		/**
		 * @method _updateInstructions
		 * @protected
		 **/
		p._updateInstructions = function() {
			this._instructions = this._oldInstructions.slice();
			this._instructions.push(Graphics.beginCmd);
	
			this._appendInstructions(this._fillInstructions);
			this._appendInstructions(this._strokeInstructions);
			this._appendInstructions(this._strokeInstructions&&this._strokeStyleInstructions);
	
			this._appendInstructions(this._activeInstructions);
	
			if (this._fillInstructions) {
				this._appendDraw(Graphics.fillCmd, this._fillMatrix);
			}
			if (this._strokeInstructions) {
				this._appendDraw(Graphics.strokeCmd, this._strokeIgnoreScale&&[1,0,0,1,0,0]);
			}
		};
	
		/**
		 * @method _appendInstructions
		 * @protected
		 **/
		p._appendInstructions = function(instructions) {
			if (instructions) { this._instructions.push.apply(this._instructions, instructions); }
		};
	
		/**
		 * @method _appendDraw
		 * @protected
		 **/
		p._appendDraw = function(command, matrixArr) {
			if (!matrixArr) { this._instructions.push(command); }
			else {
				this._instructions.push(
					new Command(this._ctx.save, [], false),
					new Command(this._ctx.transform, matrixArr, false),
					command,
					new Command(this._ctx.restore, [], false)
				);
			}
		};
	
		/**
		 * @method _newPath
		 * @protected
		 **/
		p._newPath = function() {
			if (this._dirty) { this._updateInstructions(); }
			this._oldInstructions = this._instructions;
			this._activeInstructions = [];
			this._active = this._dirty = false;
		};
	
		// used to create Commands that set properties:
		/**
		 * Used to create Commands that set properties
		 * @method _setProp
		 * @param {String} name
		 * @param {String} value
		 * @protected
		 **/
		p._setProp = function(name, value) {
			this[name] = value;
		};
	
	createjs.Graphics = Graphics;
	}());


/***/ },
/* 51 */
/***/ function(module, exports) {

	/*
	* MovieClip
	* Visit http://createjs.com/ for documentation, updates and examples.
	*
	* Copyright (c) 2010 gskinner.com, inc.
	*
	* Permission is hereby granted, free of charge, to any person
	* obtaining a copy of this software and associated documentation
	* files (the "Software"), to deal in the Software without
	* restriction, including without limitation the rights to use,
	* copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the
	* Software is furnished to do so, subject to the following
	* conditions:
	*
	* The above copyright notice and this permission notice shall be
	* included in all copies or substantial portions of the Software.
	*
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	* OTHER DEALINGS IN THE SOFTWARE.
	*/
	
	/**
	 * @module EaselJS
	 */
	
	// namespace:
	this.createjs = this.createjs||{};
	
	(function() {
		"use strict";
	
	/**
	 * The MovieClip class associates a TweenJS Timeline with an EaselJS {{#crossLink "Container"}}{{/crossLink}}. It allows
	 * you to create objects which encapsulate timeline animations, state changes, and synched actions. Due to the
	 * complexities inherent in correctly setting up a MovieClip, it is largely intended for tool output and is not included
	 * in the main EaselJS library.
	 *
	 * Currently MovieClip only works properly if it is tick based (as opposed to time based) though some concessions have
	 * been made to support time-based timelines in the future.
	 *
	 * <h4>Example</h4>
	 * This example animates two shapes back and forth. The grey shape starts on the left, but we jump to a mid-point in
	 * the animation using {{#crossLink "MovieClip/gotoAndPlay"}}{{/crossLink}}.
	 *
	 *      var stage = new createjs.Stage("canvas");
	 *      createjs.Ticker.addEventListener("tick", stage);
	 *
	 *      var mc = new createjs.MovieClip(null, 0, true, {start:20});
	 *      stage.addChild(mc);
	 *
	 *      var child1 = new createjs.Shape(
	 *          new createjs.Graphics().beginFill("#999999")
	 *              .drawCircle(30,30,30));
	 *      var child2 = new createjs.Shape(
	 *          new createjs.Graphics().beginFill("#5a9cfb")
	 *              .drawCircle(30,30,30));
	 *
	 *      mc.timeline.addTween(
	 *          createjs.Tween.get(child1)
	 *              .to({x:0}).to({x:60}, 50).to({x:0}, 50));
	 *      mc.timeline.addTween(
	 *          createjs.Tween.get(child2)
	 *              .to({x:60}).to({x:0}, 50).to({x:60}, 50));
	 *
	 *      mc.gotoAndPlay("start");
	 *
	 * It is recommended to use <code>tween.to()</code> to animate and set properties (use no duration to have it set
	 * immediately), and the <code>tween.wait()</code> method to create delays between animations. Note that using the
	 * <code>tween.set()</code> method to affect properties will likely not provide the desired result.
	 *
	 * @class MovieClip
	 * @main MovieClip
	 * @extends Container
	 * @constructor
	 * @param {String} [mode=independent] Initial value for the mode property. One of MovieClip.INDEPENDENT,
	 * MovieClip.SINGLE_FRAME, or MovieClip.SYNCHED. The default is MovieClip.INDEPENDENT.
	 * @param {Number} [startPosition=0] Initial value for the startPosition property.
	 * @param {Boolean} [loop=true] Initial value for the loop property. The default is true.
	 * @param {Object} [labels=null] A hash of labels to pass to the timeline instance associated with this MovieClip.
	 * Labels only need to be passed if they need to be used.
	 **/
	var MovieClip = function(mode, startPosition, loop, labels) {
	  this.initialize(mode, startPosition, loop, labels);
	};
	var p = MovieClip.prototype = new createjs.Container();
	
		/**
		 * The MovieClip will advance independently of its parent, even if its parent is paused.
		 * This is the default mode.
		 * @property INDEPENDENT
		 * @static
		 * @type String
		 * @default "independent"
		 * @readonly
		 **/
		MovieClip.INDEPENDENT = "independent";
	
		/**
		 * The MovieClip will only display a single frame (as determined by the startPosition property).
		 * @property SINGLE_FRAME
		 * @static
		 * @type String
		 * @default "single"
		 * @readonly
		 **/
		MovieClip.SINGLE_FRAME = "single";
	
		/**
		 * The MovieClip will be advanced only when its parent advances and will be synched to the position of
		 * the parent MovieClip.
		 * @property SYNCHED
		 * @static
		 * @type String
		 * @default "synched"
		 * @readonly
		 **/
		MovieClip.SYNCHED = "synched";
	
	// public properties:
	
		/**
		 * Controls how this MovieClip advances its time. Must be one of 0 (INDEPENDENT), 1 (SINGLE_FRAME), or 2 (SYNCHED).
		 * See each constant for a description of the behaviour.
		 * @property mode
		 * @type String
		 * @default null
		 **/
		p.mode;
	
		/**
		 * Specifies what the first frame to play in this movieclip, or the only frame to display if mode is SINGLE_FRAME.
		 * @property startPosition
		 * @type Number
		 * @default 0
		 */
		p.startPosition = 0;
	
		/**
		 * Indicates whether this MovieClip should loop when it reaches the end of its timeline.
		 * @property loop
		 * @type Boolean
		 * @default true
		 */
		p.loop = true;
	
		/**
		 * The current frame of the movieclip.
		 * @property currentFrame
		 * @type Number
		 * @default 0
		 * @readonly
		 */
		p.currentFrame = 0;
	
		/**
		 * The TweenJS Timeline that is associated with this MovieClip. This is created automatically when the MovieClip
		 * instance is initialized. Animations are created by adding <a href="http://tweenjs.com">TweenJS</a> Tween
		 * instances to the timeline.
		 *
		 * <h4>Example</h4>
		 *      var tween = createjs.Tween.get(target).to({x:0}).to({x:100}, 30);
		 *      var mc = new createjs.MovieClip();
		 *      mc.timeline.addTween(tween);
		 *
		 * Elements can be added and removed from the timeline by toggling an "_off" property
		 * using the <code>tweenInstance.to()</code> method. Note that using <code>Tween.set</code> is not recommended to
		 * create MovieClip animations. The following example will toggle the target off on frame 0, and then back on for
		 * frame 1. You can use the "visible" property to achieve the same effect.
		 *
		 *      var tween = createjs.Tween.get(target).to({_off:false})
		 *          .wait(1).to({_off:true})
		 *          .wait(1).to({_off:false});
		 *
		 * @property timeline
		 * @type Timeline
		 * @default null
		 */
		p.timeline = null;
	
		/**
		 * If true, the MovieClip's position will not advance when ticked.
		 * @property paused
		 * @type Boolean
		 * @default false
		 */
		p.paused = false;
	
		/**
		 * If true, actions in this MovieClip's tweens will be run when the playhead advances.
		 * @property actionsEnabled
		 * @type Boolean
		 * @default true
		 */
		p.actionsEnabled = true;
	
		/**
		 * If true, the MovieClip will automatically be reset to its first frame whenever the timeline adds
		 * it back onto the display list. This only applies to MovieClip instances with mode=INDEPENDENT.
		 * <br><br>
		 * For example, if you had a character animation with a "body" child MovieClip instance
		 * with different costumes on each frame, you could set body.autoReset = false, so that
		 * you can manually change the frame it is on, without worrying that it will be reset
		 * automatically.
		 * @property autoReset
		 * @type Boolean
		 * @default true
		 */
		p.autoReset = true;
		
		/**
		 * An array of bounds for each frame in the MovieClip. This is mainly intended for tool output.
		 * @property frameBounds
		 * @type Array
		 * @default null
		 */
		p.frameBounds = null;
		
		
	// private properties:
		/**
		 * @property _synchOffset
		 * @type Number
		 * @default 0
		 * @private
		 */
		p._synchOffset = 0;
	
		/**
		 * @property _prevPos
		 * @type Number
		 * @default -1
		 * @private
		 */
		p._prevPos = -1; // TODO: evaluate using a ._reset Boolean prop instead of -1.
	
		/**
		 * @property _prevPosition
		 * @type Number
		 * @default 0
		 * @private
		 */
		p._prevPosition = 0;
	
		/**
		 * List of display objects that are actively being managed by the MovieClip.
		 * @property _managed
		 * @type Object
		 * @private
		 */
		p._managed;
	
	// constructor:
	
		/**
		 * @property DisplayObject_initialize
		 * @type Function
	    * @private
		 **/
		p.Container_initialize = p.initialize;
	
		/** 
		 * Initialization method called by the constructor.
		 * @method initialize
		 * @param {String} [mode=independent] Initial value for the mode property. One of MovieClip.INDEPENDENT,
		 * MovieClip.SINGLE_FRAME, or MovieClip.SYNCHED. The default is MovieClip.INDEPENDENT.
		 * @param {Number} [startPosition=0] Initial value for the startPosition property.
		 * @param {Boolean} [loop=true] Initial value for the loop property. The default is true.
		 * @param {Object} [labels=null] A hash of labels to pass to the timeline instance associated with this MovieClip.
		 * Labels only need to be passed if they need to be used.
		 * @protected
		 **/
		p.initialize = function(mode, startPosition, loop, labels) {
			this.mode = mode||MovieClip.INDEPENDENT;
			this.startPosition = startPosition || 0;
			this.loop = loop;
			var props = {paused:true, position:startPosition, useTicks:true};
			this.Container_initialize();
			this.timeline = new createjs.Timeline(null, labels, props);
			this._managed = {};
		};
		
	// public methods:
		/**
		 * Returns true or false indicating whether the display object would be visible if drawn to a canvas.
		 * This does not account for whether it would be visible within the boundaries of the stage.
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 * @method isVisible
		 * @return {Boolean} Boolean indicating whether the display object would be visible if drawn to a canvas
		 **/
		p.isVisible = function() {
			// children are placed in draw, so we can't determine if we have content.
			return !!(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0);
		};
	
		/**
		 * @property Container_draw
		 * @type Function
		 * @private
		 **/
		p.Container_draw = p.draw;
	
		/**
		 * Draws the display object into the specified context ignoring its visible, alpha, shadow, and transform.
		 * Returns true if the draw was handled (useful for overriding functionality).
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 * @method draw
		 * @param {CanvasRenderingContext2D} ctx The canvas 2D context object to draw into.
		 * @param {Boolean} ignoreCache Indicates whether the draw operation should ignore any current cache.
		 * For example, used for drawing the cache (to prevent it from simply drawing an existing cache back
		 * into itself).
		 **/
		p.draw = function(ctx, ignoreCache) {
			// draw to cache first:
			if (this.DisplayObject_draw(ctx, ignoreCache)) { return true; }
			this._updateTimeline();
			this.Container_draw(ctx, ignoreCache);
			return true;
		};
		
		
		/**
		 * Sets paused to false.
		 * @method play
		 **/
		p.play = function() {
			this.paused = false;
		};
		
		/**
		 * Sets paused to true.
		 * @method stop
		 **/
		p.stop = function() {
			this.paused = true;
		};
		
		/**
		 * Advances this movie clip to the specified position or label and sets paused to false.
		 * @method gotoAndPlay
		 * @param {String|Number} positionOrLabel The animation name or frame number to go to.
		 **/
		p.gotoAndPlay = function(positionOrLabel) {
			this.paused = false;
			this._goto(positionOrLabel);
		};
		
		/**
		 * Advances this movie clip to the specified position or label and sets paused to true.
		 * @method gotoAndStop
		 * @param {String|Number} positionOrLabel The animation or frame name to go to.
		 **/
		p.gotoAndStop = function(positionOrLabel) {
			this.paused = true;
			this._goto(positionOrLabel);
		};
		
		
		/**
		 * Returns a sorted list of the labels defined on this MovieClip. Shortcut to TweenJS: Timeline.getLabels();
		 * @method getLabels
		 * @return {Array[Object]} A sorted array of objects with label and position (aka frame) properties.
		 **/
		p.getLabels = function() {
			return this.timeline.getLabels();
		};
		
		/**
		 * Returns the name of the label on or immediately before the current frame. See TweenJS: Timeline.getCurrentLabel()
		 * for more information.
		 * @method getCurrentLabel
		 * @return {String} The name of the current label or null if there is no label.
		 **/
		p.getCurrentLabel = function() {
			this._updateTimeline();
			return this.timeline.getCurrentLabel();
		};
		
		/**
		 * MovieClip instances cannot be cloned.
		 * @method clone
		 **/
		p.clone = function() {
			// TODO: add support for this? Need to clone the Timeline & retarget tweens - pretty complex.
			throw("MovieClip cannot be cloned.")
		};
		
		/**
		 * Returns a string representation of this object.
		 * @method toString
		 * @return {String} a string representation of the instance.
		 **/
		p.toString = function() {
			return "[MovieClip (name="+  this.name +")]";
		};
	
	// private methods:
	
		/**
		 * @property Container__tick
		 * @type Function
		 * @protected
		 **/
		p.Container__tick = p._tick;
	
		/**
		 * @method _tick
		 * @param {Array} params Parameters to pass onto the DisplayObject {{#crossLink "DisplayObject/tick"}}{{/crossLink}}
		 * function.
		 * @protected
		 **/
		p._tick = function(params) {
			if (!this.paused && this.mode == MovieClip.INDEPENDENT) {
				this._prevPosition = (this._prevPos < 0) ? 0 : this._prevPosition+1;
				this._updateTimeline();
			}
			this.Container__tick(params);
		};
		
		/**
		 * @method _goto
		 * @param {String|Number} positionOrLabel The animation name or frame number to go to.
		 * @protected
		 **/
		p._goto = function(positionOrLabel) {
			var pos = this.timeline.resolve(positionOrLabel);
			if (pos == null) { return; }
			// prevent _updateTimeline from overwriting the new position because of a reset:
			if (this._prevPos == -1) { this._prevPos = NaN; }
			this._prevPosition = pos;
			this._updateTimeline();
		};
		
		/**
		 * @method _reset
		 * @private
		 **/
		p._reset = function() {
			this._prevPos = -1;
			this.currentFrame = 0;
		};
		
		/**
		 * @method _updateTimeline
		 * @protected
		 **/
		p._updateTimeline = function() {
			var tl = this.timeline;
			var synched = this.mode != MovieClip.INDEPENDENT;
			tl.loop = (this.loop==null) ? true : this.loop;
	
			// update timeline position, ignoring actions if this is a graphic.
			if (synched) {
				tl.setPosition(this.startPosition + (this.mode==MovieClip.SINGLE_FRAME?0:this._synchOffset), createjs.Tween.NONE);
			} else {
				tl.setPosition(this._prevPos < 0 ? 0 : this._prevPosition, this.actionsEnabled ? null : createjs.Tween.NONE);
			}
	
			this._prevPosition = tl._prevPosition;
			if (this._prevPos == tl._prevPos) { return; }
			this.currentFrame = this._prevPos = tl._prevPos;
	
			for (var n in this._managed) { this._managed[n] = 1; }
	
			var tweens = tl._tweens;
			for (var i=0, l=tweens.length; i<l; i++) {
				var tween = tweens[i];
				var target = tween._target;
				if (target == this || tween.passive) { continue; } // TODO: this assumes actions tween has this as the target. Valid?
				var offset = tween._stepPosition;
	
				if (target instanceof createjs.DisplayObject) {
					// motion tween.
					this._addManagedChild(target, offset);
				} else {
					// state tween.
					this._setState(target.state, offset);
				}
			}
	
			var kids = this.children;
			for (i=kids.length-1; i>=0; i--) {
				var id = kids[i].id;
				if (this._managed[id] == 1) {
					this.removeChildAt(i);
					delete(this._managed[id]);
				}
			}
		};
	
		/**
		 * @method _setState
		 * @param {Array} state
		 * @param {Number} offset
		 * @protected
		 **/
		p._setState = function(state, offset) {
			if (!state) { return; }
			for (var i=state.length-1;i>=0;i--) {
				var o = state[i];
				var target = o.t;
				var props = o.p;
				for (var n in props) { target[n] = props[n]; }
				this._addManagedChild(target, offset);
			}
		};
	
		/**
		 * Adds a child to the timeline, and sets it up as a managed child.
		 * @method _addManagedChild
		 * @param {MovieClip} child The child MovieClip to manage
		 * @param {Number} offset
		 * @private
		 **/
		p._addManagedChild = function(child, offset) {
			if (child._off) { return; }
			this.addChildAt(child,0);
	
			if (child instanceof MovieClip) {
				child._synchOffset = offset;
				// TODO: this does not precisely match Flash. Flash loses track of the clip if it is renamed or removed from the timeline, which causes it to reset.
				if (child.mode == MovieClip.INDEPENDENT && child.autoReset && !this._managed[child.id]) { child._reset(); }
			}
			this._managed[child.id] = 2;
		};
		
		/**
		 * @method Container__getBounds
		 * @param {Matrix2D} matrix
		 * @param {Boolean} ignoreTransform
		 * @return {Rectangle}
		 * @protected
		 **/
		p.Container__getBounds = p._getBounds;
		
		/**
		 * @method _getBounds
		 * @param {Matrix2D} matrix
		 * @param {Boolean} ignoreTransform
		 * @return {Rectangle}
		 * @protected
		 **/
		p._getBounds = function(matrix, ignoreTransform) {
			var bounds = this.DisplayObject_getBounds();
			if (!bounds) {
				this._updateTimeline();
				if (this.frameBounds) { bounds = this._rectangle.copy(this.frameBounds[this.currentFrame]); }
			}
			if (bounds) { return this._transformBounds(bounds, matrix, ignoreTransform); }
			return this.Container__getBounds(matrix, ignoreTransform);
		};
	
	createjs.MovieClip = MovieClip;
	
	
	
		/**
		 * This plugin works with <a href="http://tweenjs.com" target="_blank">TweenJS</a> to prevent the startPosition
		 * property from tweening.
		 * @private
		 * @class MovieClipPlugin
		 * @constructor
		 **/
		var MovieClipPlugin = function() {
		  throw("MovieClipPlugin cannot be instantiated.")
		};
		
		/**
		 * @method priority
		 * @private
		 **/
		MovieClipPlugin.priority = 100; // very high priority, should run first
	
		/**
		 * @method install
		 * @private
		 **/
		MovieClipPlugin.install = function() {
			createjs.Tween.installPlugin(MovieClipPlugin, ["startPosition"]);
		};
		
		/**
		 * @method init
		 * @param {Tween} tween
		 * @param {String} prop
		 * @param {String|Number|Boolean} value
		 * @private
		 **/
		MovieClipPlugin.init = function(tween, prop, value) {
			return value;
		};
		
		/**
		 * @method step
		 * @private
		 **/
		MovieClipPlugin.step = function() {
			// unused.
		};
	
		/**
		 * @method tween
		 * @param {Tween} tween
		 * @param {String} prop
		 * @param {String | Number | Boolean} value
		 * @param {Array} startValues
		 * @param {Array} endValues
		 * @param {Number} ratio
		 * @param wait
		 * @param end
		 * @return {*}
		 */
		MovieClipPlugin.tween = function(tween, prop, value, startValues, endValues, ratio, wait, end) {
			if (!(tween.target instanceof MovieClip)) { return value; }
			return (ratio == 1 ? endValues[prop] : startValues[prop]);
		};
	
		MovieClipPlugin.install();
	
	}());


/***/ },
/* 52 */
/***/ function(module, exports) {

	/*
	* Shadow
	* Visit http://createjs.com/ for documentation, updates and examples.
	*
	* Copyright (c) 2010 gskinner.com, inc.
	*
	* Permission is hereby granted, free of charge, to any person
	* obtaining a copy of this software and associated documentation
	* files (the "Software"), to deal in the Software without
	* restriction, including without limitation the rights to use,
	* copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the
	* Software is furnished to do so, subject to the following
	* conditions:
	*
	* The above copyright notice and this permission notice shall be
	* included in all copies or substantial portions of the Software.
	*
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	* OTHER DEALINGS IN THE SOFTWARE.
	*/
	
	/**
	 * @module EaselJS
	 */
	
	// namespace:
	this.createjs = this.createjs||{};
	
	(function() {
		"use strict";
	
	/**
	 * This class encapsulates the properties required to define a shadow to apply to a {{#crossLink "DisplayObject"}}{{/crossLink}}
	 * via its <code>shadow</code> property.
	 *
	 * <h4>Example</h4>
	 *      myImage.shadow = new createjs.Shadow("#000000", 5, 5, 10);
	 *
	 * @class Shadow
	 * @constructor
	 * @param {String} color The color of the shadow.
	 * @param {Number} offsetX The x offset of the shadow in pixels.
	 * @param {Number} offsetY The y offset of the shadow in pixels.
	 * @param {Number} blur The size of the blurring effect.
	 **/
	var Shadow = function(color, offsetX, offsetY, blur) {
	  this.initialize(color, offsetX, offsetY, blur);
	};
	var p = Shadow.prototype;
	
	// static public properties:
		/**
		 * An identity shadow object (all properties are set to 0).
		 * @property identity
		 * @type Shadow
		 * @static
		 * @final
		 * @readonly
		 **/
		Shadow.identity = null; // set at bottom of class definition.
	
	// public properties:
		/** The color of the shadow.
		 * property color
		 * @type String
		 * @default null
		 */
		p.color = null;
	
		/** The x offset of the shadow.
		 * property offsetX
		 * @type Number
		 * @default 0
		 */
		p.offsetX = 0;
	
		/** The y offset of the shadow.
		 * property offsetY
		 * @type Number
		 * @default 0
		 */
		p.offsetY = 0;
	
		/** The blur of the shadow.
		 * property blur
		 * @type Number
		 * @default 0
		 */
		p.blur = 0;
	
	// constructor:
		/**
		 * Initialization method.
		 * @method initialize
		 * @protected
		 * @param {String} color The color of the shadow.
		 * @param {Number} offsetX The x offset of the shadow.
		 * @param {Number} offsetY The y offset of the shadow.
		 * @param {Number} blur The size of the blurring effect.
		 **/
		p.initialize = function(color, offsetX, offsetY, blur) {
			this.color = color;
			this.offsetX = offsetX;
			this.offsetY = offsetY;
			this.blur = blur;
		};
	
	// public methods:
		/**
		 * Returns a string representation of this object.
		 * @method toString
		 * @return {String} a string representation of the instance.
		 **/
		p.toString = function() {
			return "[Shadow]";
		};
	
	
		/**
		 * Returns a clone of this Shadow instance.
		 * @method clone
		 * @return {Shadow} A clone of the current Shadow instance.
		 **/
		p.clone = function() {
			return new Shadow(this.color, this.offsetX, this.offsetY, this.blur);
		};
	
		// this has to be populated after the class is defined:
		Shadow.identity = new Shadow("transparent", 0, 0, 0);
	
	createjs.Shadow = Shadow;
	}());


/***/ },
/* 53 */
/***/ function(module, exports) {

	/*
	* Shape
	* Visit http://createjs.com/ for documentation, updates and examples.
	*
	* Copyright (c) 2010 gskinner.com, inc.
	*
	* Permission is hereby granted, free of charge, to any person
	* obtaining a copy of this software and associated documentation
	* files (the "Software"), to deal in the Software without
	* restriction, including without limitation the rights to use,
	* copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the
	* Software is furnished to do so, subject to the following
	* conditions:
	*
	* The above copyright notice and this permission notice shall be
	* included in all copies or substantial portions of the Software.
	*
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	* OTHER DEALINGS IN THE SOFTWARE.
	*/
	
	/**
	 * @module EaselJS
	 */
	
	// namespace:
	this.createjs = this.createjs||{};
	
	(function() {
		"use strict";
	
	/**
	 * A Shape allows you to display vector art in the display list. It composites a {{#crossLink "Graphics"}}{{/crossLink}}
	 * instance which exposes all of the vector drawing methods. The Graphics instance can be shared between multiple Shape
	 * instances to display the same vector graphics with different positions or transforms.
	 *
	 * If the vector art will not
	 * change between draws, you may want to use the {{#crossLink "DisplayObject/cache"}}{{/crossLink}} method to reduce the
	 * rendering cost.
	 *
	 * <h4>Example</h4>
	 *      var graphics = new createjs.Graphics().beginFill("#ff0000").drawRect(0, 0, 100, 100);
	 *      var shape = new createjs.Shape(graphics);
	 *
	 *      //Alternatively use can also use the graphics property of the Shape class to renderer the same as above.
	 *      var shape = new createjs.Shape();
	 *      shape.graphics.beginFill("#ff0000").drawRect(0, 0, 100, 100);
	 *
	 * @class Shape
	 * @extends DisplayObject
	 * @constructor
	 * @param {Graphics} graphics Optional. The graphics instance to display. If null, a new Graphics instance will be created.
	 **/
	var Shape = function(graphics) {
	  this.initialize(graphics);
	}
	var p = Shape.prototype = new createjs.DisplayObject();
	
	// public properties:
		/**
		 * The graphics instance to display.
		 * @property graphics
		 * @type Graphics
		 **/
		p.graphics = null;
	
	// constructor:
		/**
		 * @property DisplayObject_initialize
		 * @private
		 * @type Function
		 **/
		p.DisplayObject_initialize = p.initialize;
	
		/**
		 * Initialization method.
		 * @method initialize
		 * @param {Graphics} graphics
		 * @protected
		 **/
		p.initialize = function(graphics) {
			this.DisplayObject_initialize();
			this.graphics = graphics ? graphics : new createjs.Graphics();
		}
	
		/**
		 * Returns true or false indicating whether the Shape would be visible if drawn to a canvas.
		 * This does not account for whether it would be visible within the boundaries of the stage.
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 * @method isVisible
		 * @return {Boolean} Boolean indicating whether the Shape would be visible if drawn to a canvas
		 **/
		p.isVisible = function() {
			var hasContent = this.cacheCanvas || (this.graphics && !this.graphics.isEmpty());
			return !!(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && hasContent);
		};
	
		/**
		 * @property DisplayObject_draw
		 * @private
		 * @type Function
		 **/
		p.DisplayObject_draw = p.draw;
	
		/**
		 * Draws the Shape into the specified context ignoring its visible, alpha, shadow, and transform. Returns true if
		 * the draw was handled (useful for overriding functionality).
		 *
		 * <i>NOTE: This method is mainly for internal use, though it may be useful for advanced uses.</i>
		 * @method draw
		 * @param {CanvasRenderingContext2D} ctx The canvas 2D context object to draw into.
		 * @param {Boolean} ignoreCache Indicates whether the draw operation should ignore any current cache. For example,
		 * used for drawing the cache (to prevent it from simply drawing an existing cache back into itself).
		 **/
		p.draw = function(ctx, ignoreCache) {
			if (this.DisplayObject_draw(ctx, ignoreCache)) { return true; }
			this.graphics.draw(ctx);
			return true;
		}
	
		/**
		 * Returns a clone of this Shape. Some properties that are specific to this instance's current context are reverted to
		 * their defaults (for example .parent).
		 * @method clone
		 * @param {Boolean} recursive If true, this Shape's {{#crossLink "Graphics"}}{{/crossLink}} instance will also be
		 * cloned. If false, the Graphics instance will be shared with the new Shape.
		 **/
		p.clone = function(recursive) {
			var o = new Shape((recursive && this.graphics) ? this.graphics.clone() : this.graphics);
			this.cloneProps(o);
			return o;
		}
	
		/**
		 * Returns a string representation of this object.
		 * @method toString
		 * @return {String} a string representation of the instance.
		 **/
		p.toString = function() {
			return "[Shape (name="+  this.name +")]";
		}
	
	createjs.Shape = Shape;
	}());


/***/ },
/* 54 */
/***/ function(module, exports) {

	/*
	* Sprite
	* Visit http://createjs.com/ for documentation, updates and examples.
	*
	* Copyright (c) 2010 gskinner.com, inc.
	*
	* Permission is hereby granted, free of charge, to any person
	* obtaining a copy of this software and associated documentation
	* files (the "Software"), to deal in the Software without
	* restriction, including without limitation the rights to use,
	* copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the
	* Software is furnished to do so, subject to the following
	* conditions:
	*
	* The above copyright notice and this permission notice shall be
	* included in all copies or substantial portions of the Software.
	*
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	* OTHER DEALINGS IN THE SOFTWARE.
	*/
	
	/**
	 * @module EaselJS
	 */
	
	// namespace:
	this.createjs = this.createjs||{};
	
	(function() {
		"use strict";
	
	/**
	 * Displays a frame or sequence of frames (ie. an animation) from a SpriteSheet instance. A sprite sheet is a series of
	 * images (usually animation frames) combined into a single image. For example, an animation consisting of 8 100x100
	 * images could be combined into a 400x200 sprite sheet (4 frames across by 2 high). You can display individual frames,
	 * play frames as an animation, and even sequence animations together.
	 *
	 * See the {{#crossLink "SpriteSheet"}}{{/crossLink}} class for more information on setting up frames and animations.
	 *
	 * <h4>Example</h4>
	 *      var instance = new createjs.Sprite(spriteSheet);
	 *      instance.gotoAndStop("frameName");
	 *
	 * Until {{#crossLink "Sprite/gotoAndStop"}}{{/crossLink}} or {{#crossLink "Sprite/gotoAndPlay"}}{{/crossLink}} is called,
	 * only the first defined frame defined in the sprite sheet will be displayed.
	 *
	 * @class Sprite
	 * @extends DisplayObject
	 * @constructor
	 * @param {SpriteSheet} spriteSheet The SpriteSheet instance to play back. This includes the source image(s), frame
	 * dimensions, and frame data. See {{#crossLink "SpriteSheet"}}{{/crossLink}} for more information.
	 * @param {String|Number} frameOrAnimation The frame number or animation to play initially.
	 **/
	var Sprite = function(spriteSheet, frameOrAnimation) {
	  this.initialize(spriteSheet, frameOrAnimation);
	};
	var p = Sprite.prototype = new createjs.DisplayObject();
	
	// events:
	
		/**
		 * Dispatched when an animation reaches its ends.
		 * @event animationend
		 * @param {Object} target The object that dispatched the event.
		 * @param {String} type The event type.
		 * @param {String} name The name of the animation that just ended.
		 * @param {String} next The name of the next animation that will be played, or null. This will be the same as name if the animation is looping.
		 * @since 0.6.0
		 */
	
	// public properties:
		// TODO: deprecated.
		/**
		 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "Sprite/animationend:event"}}{{/crossLink}}
		 * event.
		 * @property onAnimationEnd
		 * @type {Function}
		 * @deprecated Use addEventListener and the "animationend" event.
		 */
	
		/**
		 * The frame index that will be drawn when draw is called. Note that with some {{#crossLink "SpriteSheet"}}{{/crossLink}}
		 * definitions, this will advance non-sequentially. This will always be an integer value.
		 * @property currentFrame
		 * @type {Number}
		 * @default 0
		 * @readonly
		 **/
		p.currentFrame = 0;
	
		/**
		 * Returns the name of the currently playing animation.
		 * @property currentAnimation
		 * @type {String}
		 * @final
		 * @readonly
		 **/
		p.currentAnimation = null;
	
		/**
		 * Prevents the animation from advancing each tick automatically. For example, you could create a sprite
		 * sheet of icons, set paused to true, and display the appropriate icon by setting <code>currentFrame</code>.
		 * @property paused
		 * @type {Boolean}
		 * @default false
		 **/
		p.paused = true;
	
		/**
		 * The SpriteSheet instance to play back. This includes the source image, frame dimensions, and frame
		 * data. See {{#crossLink "SpriteSheet"}}{{/crossLink}} for more information.
		 * @property spriteSheet
		 * @type {SpriteSheet}
		 * @readonly
		 **/
		p.spriteSheet = null;
	
		/**
		 * Whether or not the image should be draw to the canvas at whole pixel coordinates.
		 * @property snapToPixel
		 * @type {Boolean}
		 * @default true
		 **/
		p.snapToPixel = true;
	
		/**
		 * @property offset
		 * @type {Number}
		 * @default 0
		 * @deprecated Not applicable to the new timing model in v0.7.0 and higher.
		 */
		p.offset = 0;
	
		/**
		 * Specifies the current frame index within the currently playing animation. When playing normally, this will increase
		 * from 0 to n-1, where n is the number of frames in the current animation.
		 *
		 * This could be a non-integer value if
		 * using time-based playback (see {{#crossLink "Sprite/framerate"}}{{/crossLink}}, or if the animation's speed is
		 * not an integer.
		 * @property currentAnimationFrame
		 * @type {Number}
		 * @default 0
		 **/
		p.currentAnimationFrame = 0;
	
		/**
		 * By default Sprite instances advance one frame per tick. Specifying a framerate for the Sprite (or its related
		 * SpriteSheet) will cause it to advance based on elapsed time between ticks as appropriate to maintain the target
		 * framerate.
		 *
		 * For example, if a Sprite with a framerate of 10 is placed on a Stage being updated at 40fps, then the Sprite will
		 * advance roughly one frame every 4 ticks. This will not be exact, because the time between each tick will
		 * vary slightly between frames.
		 *
		 * This feature is dependent on the tick event object (or an object with an appropriate "delta" property) being
		 * passed into {{#crossLink "Stage/update"}}{{/crossLink}}.
		 * @property framerate
		 * @type {Number}
		 * @default 0
		 **/
		p.framerate = 0;
	
	// private properties:
		/**
		 * @property _advanceCount
		 * @protected
		 * @type {Number}
		 * @default 0
		 **/
		p._advanceCount = 0;
	
		/**
		 * @property _animation
		 * @protected
		 * @type {Object}
		 * @default null
		 **/
		p._animation = null;
	
		/**
		 * @property _animation
		 * @protected
		 * @type {Object}
		 * @default null
		 **/
		p._currentFrame = null;
	
	// constructor:
		/**
		 * @property DisplayObject_initialize
		 * @type {Function}
		 * @private
		 **/
		p.DisplayObject_initialize = p.initialize;
	
		/**
		 * Initialization method.
		 * @method initialize
		 * @protected
		*/
		p.initialize = function(spriteSheet, frameOrAnimation) {
			this.DisplayObject_initialize();
			this.spriteSheet = spriteSheet;
			if (frameOrAnimation) { this.gotoAndPlay(frameOrAnimation); }
		};
	
		/**
		 * Returns true or false indicating whether the display object would be visible if drawn to a canvas.
		 * This does not account for whether it would be visible within the boundaries of the stage.
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 * @method isVisible
		 * @return {Boolean} Boolean indicating whether the display object would be visible if drawn to a canvas
		 **/
		p.isVisible = function() {
			var hasContent = this.cacheCanvas || this.spriteSheet.complete;
			return !!(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && hasContent);
		};
	
		/**
		 * @property DisplayObject_draw
		 * @type {Function}
		 * @private
		 **/
		p.DisplayObject_draw = p.draw;
	
		/**
		 * Draws the display object into the specified context ignoring its visible, alpha, shadow, and transform.
		 * Returns true if the draw was handled (useful for overriding functionality).
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 * @method draw
		 * @param {CanvasRenderingContext2D} ctx The canvas 2D context object to draw into.
		 * @param {Boolean} ignoreCache Indicates whether the draw operation should ignore any current cache.
		 * For example, used for drawing the cache (to prevent it from simply drawing an existing cache back
		 * into itself).
		 **/
		p.draw = function(ctx, ignoreCache) {
			if (this.DisplayObject_draw(ctx, ignoreCache)) { return true; }
			this._normalizeFrame();
			var o = this.spriteSheet.getFrame(this._currentFrame|0);
			if (!o) { return false; }
			var rect = o.rect;
			ctx.drawImage(o.image, rect.x, rect.y, rect.width, rect.height, -o.regX, -o.regY, rect.width, rect.height);
			return true;
		};
	
		//Note, the doc sections below document using the specified APIs (from DisplayObject)  from
		//Bitmap. This is why they have no method implementations.
	
		/**
		 * Because the content of a Bitmap is already in a simple format, cache is unnecessary for Bitmap instances.
		 * You should not cache Bitmap instances as it can degrade performance.
		 * @method cache
		 **/
	
		/**
		 * Because the content of a Bitmap is already in a simple format, cache is unnecessary for Bitmap instances.
		 * You should not cache Bitmap instances as it can degrade performance.
		 * @method updateCache
		 **/
	
		/**
		 * Because the content of a Bitmap is already in a simple format, cache is unnecessary for Bitmap instances.
		 * You should not cache Bitmap instances as it can degrade performance.
		 * @method uncache
		 **/
	
		/**
		 * Play (unpause) the current animation. The Sprite will be paused if either {{#crossLink "Sprite/stop"}}{{/crossLink}}
		 * or {{#crossLink "Sprite/gotoAndStop"}}{{/crossLink}} is called. Single frame animations will remain
		 * unchanged.
		 * @method play
		 **/
		p.play = function() {
			this.paused = false;
		};
	
		/**
		 * Stop playing a running animation. The Sprite will be playing if {{#crossLink "Sprite/gotoAndPlay"}}{{/crossLink}}
		 * is called. Note that calling {{#crossLink "Sprite/gotoAndPlay"}}{{/crossLink}} or {{#crossLink "Sprite/play"}}{{/crossLink}}
		 * will resume playback.
		 * @method stop
		 **/
		p.stop = function() {
			this.paused = true;
		};
	
		/**
		 * Sets paused to false and plays the specified animation name, named frame, or frame number.
		 * @method gotoAndPlay
		 * @param {String|Number} frameOrAnimation The frame number or animation name that the playhead should move to
		 * and begin playing.
		 **/
		p.gotoAndPlay = function(frameOrAnimation) {
			this.paused = false;
			this._goto(frameOrAnimation);
		};
	
		/**
		 * Sets paused to true and seeks to the specified animation name, named frame, or frame number.
		 * @method gotoAndStop
		 * @param {String|Number} frameOrAnimation The frame number or animation name that the playhead should move to
		 * and stop.
		 **/
		p.gotoAndStop = function(frameOrAnimation) {
			this.paused = true;
			this._goto(frameOrAnimation);
		};
	
		/**
		 * Advances the playhead. This occurs automatically each tick by default.
		 * @param [time] {Number} The amount of time in ms to advance by. Only applicable if framerate is set on the Sprite
		 * or its SpriteSheet.
		 * @method advance
		*/
		p.advance = function(time) {
			var speed = (this._animation&&this._animation.speed)||1;
			var fps = this.framerate || this.spriteSheet.framerate;
			var t = (fps && time != null) ? time/(1000/fps) : 1;
			if (this._animation) { this.currentAnimationFrame+=t*speed; }
			else { this._currentFrame+=t*speed; }
			this._normalizeFrame();
		};
		
		/**
		 * @property DisplayObject_getBounds
		 * @type Function
		 * @protected
		 **/
		p.DisplayObject_getBounds = p.getBounds; 
		
		/**
		 * Returns a {{#crossLink "Rectangle"}}{{/crossLink}} instance defining the bounds of the current frame relative to
		 * the origin. For example, a 90 x 70 frame with <code>regX=50</code> and <code>regY=40</code> would return a
		 * rectangle with [x=-50, y=-40, width=90, height=70]. This ignores transformations on the display object.
		 *
		 * Also see the SpriteSheet {{#crossLink "SpriteSheet/getFrameBounds"}}{{/crossLink}} method.
		 * @method getBounds
		 * @return {Rectangle} A Rectangle instance. Returns null if the frame does not exist, or the image is not fully
		 * loaded.
		 **/
		p.getBounds = function() {
			// TODO: should this normalizeFrame?
			return this.DisplayObject_getBounds() || this.spriteSheet.getFrameBounds(this.currentFrame, this._rectangle);
		};
	
		/**
		 * Returns a clone of the Sprite instance. Note that the same SpriteSheet is shared between cloned
		 * instances.
		 * @method clone
		 * @return {Sprite} a clone of the Sprite instance.
		 **/
		p.clone = function() {
			var o = new Sprite(this.spriteSheet);
			this.cloneProps(o);
			return o;
		};
	
		/**
		 * Returns a string representation of this object.
		 * @method toString
		 * @return {String} a string representation of the instance.
		 **/
		p.toString = function() {
			return "[Sprite (name="+  this.name +")]";
		};
	
	// private methods:
		/**
		 * @property DisplayObject__tick
		 * @type {Function}
		 * @private
		 **/
		p.DisplayObject__tick = p._tick;
	
		/**
		 * Advances the <code>currentFrame</code> if paused is not true. This is called automatically when the {{#crossLink "Stage"}}{{/crossLink}}
		 * ticks.
		 * @protected
		 * @method _tick
		 **/
		p._tick = function(params) {
			if (!this.paused) {
				this.advance(params&&params[0]&&params[0].delta);
			}
			this.DisplayObject__tick(params);
		};
	
	
		/**
		 * Normalizes the current frame, advancing animations and dispatching callbacks as appropriate.
		 * @protected
		 * @method _normalizeFrame
		 **/
		p._normalizeFrame = function() {
			var animation = this._animation;
			var paused = this.paused;
			var frame = this._currentFrame;
			var animFrame = this.currentAnimationFrame;
			var l;
	
			if (animation) {
				l = animation.frames.length;
				if ((animFrame|0) >= l) {
					var next = animation.next;
					if (this._dispatchAnimationEnd(animation, frame, paused, next, l-1)) {
						// something changed in the event stack.
					} else if (next) {
						// sequence. Automatically calls _normalizeFrame again.
						return this._goto(next, animFrame - l);
					} else {
						// end.
						this.paused = true;
						animFrame = this.currentAnimationFrame = animation.frames.length-1;
						this._currentFrame = animation.frames[animFrame];
					}
				} else {
					this._currentFrame = animation.frames[animFrame|0];
				}
			} else {
				l = this.spriteSheet.getNumFrames();
				if (frame >= l) {
					if (!this._dispatchAnimationEnd(animation, frame, paused, l-1)) {
						// looped.
						if ((this._currentFrame -= l) >= l) { return this._normalizeFrame(); }
					}
				}
			}
			this.currentFrame = this._currentFrame|0;
		};
	
		/**
		 * Dispatches the "animationend" event. Returns true if a handler changed the animation (ex. calling {{#crossLink "Sprite/stop"}}{{/crossLink}},
		 * {{#crossLink "Sprite/gotoAndPlay"}}{{/crossLink}}, etc.)
		 * @property _dispatchAnimationEnd
		 * @private
		 * @type {Function}
		 **/
		p._dispatchAnimationEnd = function(animation, frame, paused, next, end) {
			var name = animation ? animation.name : null;
			if (this.hasEventListener("animationend")) {
				var evt = new createjs.Event("animationend");
				evt.name = name;
				evt.next = next;
				this.dispatchEvent(evt);
			}
			// TODO: is this right?
			if (!paused && this.paused) { this.currentAnimationFrame = end; }
			return (this.paused != paused || this._animation != animation || this._currentFrame != frame);
		};
	
		/**
		 * @property DisplayObject_cloneProps
		 * @private
		 * @type {Function}
		 **/
		p.DisplayObject_cloneProps = p.cloneProps;
	
		/**
		 * @method cloneProps
		 * @param {Text} o
		 * @protected
		 **/
		p.cloneProps = function(o) {
			this.DisplayObject_cloneProps(o);
			o.currentFrame = this.currentFrame;
			o._currentFrame = this._currentFrame;
			o.currentAnimation = this.currentAnimation;
			o.paused = this.paused;
			o._animation = this._animation;
			o.currentAnimationFrame = this.currentAnimationFrame;
			o.framerate = this.framerate;
		};
	
		/**
		 * Moves the playhead to the specified frame number or animation.
		 * @method _goto
		 * @param {String|Number} frameOrAnimation The frame number or animation that the playhead should move to.
		 * @param {Boolean} [frame] The frame of the animation to go to. Defaults to 0.
		 * @protected
		 **/
		p._goto = function(frameOrAnimation, frame) {
			if (isNaN(frameOrAnimation)) {
				var data = this.spriteSheet.getAnimation(frameOrAnimation);
				if (data) {
					this.currentAnimationFrame = frame||0;
					this._animation = data;
					this.currentAnimation = frameOrAnimation;
					this._normalizeFrame();
				}
			} else {
				this.currentAnimationFrame = 0;
				this.currentAnimation = this._animation = null;
				this._currentFrame = frameOrAnimation;
				this._normalizeFrame();
			}
		};
	
	createjs.Sprite = Sprite;
	}());


/***/ },
/* 55 */
/***/ function(module, exports) {

	/*
	* SpriteSheet
	* Visit http://createjs.com/ for documentation, updates and examples.
	*
	* Copyright (c) 2010 gskinner.com, inc.
	*
	* Permission is hereby granted, free of charge, to any person
	* obtaining a copy of this software and associated documentation
	* files (the "Software"), to deal in the Software without
	* restriction, including without limitation the rights to use,
	* copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the
	* Software is furnished to do so, subject to the following
	* conditions:
	*
	* The above copyright notice and this permission notice shall be
	* included in all copies or substantial portions of the Software.
	*
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	* OTHER DEALINGS IN THE SOFTWARE.
	*/
	
	/**
	 * @module EaselJS
	 */
	
	// namespace:
	this.createjs = this.createjs||{};
	
	(function() {
		"use strict";
	/**
	 * Encapsulates the properties and methods associated with a sprite sheet. A sprite sheet is a series of images (usually
	 * animation frames) combined into a larger image (or images). For example, an animation consisting of eight 100x100
	 * images could be combined into a single 400x200 sprite sheet (4 frames across by 2 high).
	 *
	 * The data passed to the SpriteSheet constructor defines three critical pieces of information:<ol>
	 *    <li> The image or images to use.</li>
	 *    <li> The positions of individual image frames. This data can be represented in one of two ways:
	 *    As a regular grid of sequential, equal-sized frames, or as individually defined, variable sized frames arranged in
	 *    an irregular (non-sequential) fashion.</li>
	 *    <li> Likewise, animations can be represented in two ways: As a series of sequential frames, defined by a start and
	 *    end frame [0,3], or as a list of frames [0,1,2,3].</li>
	 * </OL>
	 *
	 * <h4>SpriteSheet Format</h4>
	 *
	 *      data = {
	 *          // DEFINING FRAMERATE:
	 *          // this specifies the framerate that will be set on the SpriteSheet. See Spritesheet.framerate
	 *          // for more information.
	 *          framerate: 20,
	 *
	 *          // DEFINING IMAGES:
	 *          // list of images or image URIs to use. SpriteSheet can handle preloading.
	 *          // the order dictates their index value for frame definition.
	 *          images: [image1, "path/to/image2.png"],
	 *
	 *          // DEFINING FRAMES:
	 * 	        // the simple way to define frames, only requires frame size because frames are consecutive:
	 * 	        // define frame width/height, and optionally the frame count and registration point x/y.
	 * 	        // if count is omitted, it will be calculated automatically based on image dimensions.
	 * 	        frames: {width:64, height:64, count:20, regX: 32, regY:64},
	 *
	 * 	        // OR, the complex way that defines individual rects for frames.
	 * 	        // The 5th value is the image index per the list defined in "images" (defaults to 0).
	 * 	        frames: [
	 * 	        	// x, y, width, height, imageIndex, regX, regY
	 * 	        	[0,0,64,64,0,32,64],
	 * 	        	[64,0,96,64,0]
	 * 	        ],
	 *
	 *          // DEFINING ANIMATIONS:
	 *
	 * 	        // simple animation definitions. Define a consecutive range of frames (begin to end inclusive).
	 * 	        // optionally define a "next" animation to sequence to (or false to stop) and a playback "speed"
	 * 	        animations: {
	 * 	        	// start, end, next, speed
	 * 	        	run: [0,8],
	 * 	        	jump: [9,12,"run",2]
	 * 	        }
	 *
	 *          // the complex approach which specifies every frame in the animation by index.
	 *          animations: {
	 *          	run: {
	 *          		frames: [1,2,3,3,2,1]
	 *          	},
	 *          	jump: {
	 *          		frames: [1,4,5,6,1],
	 *          		next: "run",
	 *          		speed: 2
	 *          	},
	 *          	stand: { frames: [7] }
	 *          }
	 *
	 * 	        // the above two approaches can be combined, you can also use a single frame definition:
	 * 	        animations: {
	 * 	        	run: [0,8,true,2],
	 * 	        	jump: {
	 * 	        		frames: [8,9,10,9,8],
	 * 	        		next: "run",
	 * 	        		speed: 2
	 * 	        	},
	 * 	        	stand: 7
	 * 	        }
	 *      }
	 *
	 * <h4>Example</h4>
	 * To define a simple sprite sheet, with a single image "sprites.jpg" arranged in a regular 50x50 grid with two
	 * animations, "run" looping from frame 0-4 inclusive, and "jump" playing from frame 5-8 and sequencing back to run:
	 *
	 *      var data = {
	 *          images: ["sprites.jpg"],
	 *          frames: {width:50, height:50},
	 *          animations: {run:[0,4], jump:[5,8,"run"]}
	 *      };
	 *      var spriteSheet = new createjs.SpriteSheet(data);
	 *      var animation = new createjs.Sprite(spriteSheet, "run");
	 *
	 * @class SpriteSheet
	 * @constructor
	 * @param {Object} data An object describing the SpriteSheet data.
	 * @extends EventDispatcher
	 **/
	var SpriteSheet = function(data) {
	  this.initialize(data);
	};
	var p = SpriteSheet.prototype = new createjs.EventDispatcher();
	
	// events:
	
		/**
		 * Dispatched when all images are loaded.  Note that this only fires if the images
		 * were not fully loaded when the sprite sheet was initialized. You should check the complete property
		 * to prior to adding a listener. Ex.
		 * <pre><code>var sheet = new SpriteSheet(data);
		 * if (!sheet.complete) {
		 *  &nbsp; // not preloaded, listen for the complete event:
		 *  &nbsp; sheet.addEventListener("complete", handler);
		 * }</code></pre>
		 * @event complete
		 * @param {Object} target The object that dispatched the event.
		 * @param {String} type The event type.
		 * @since 0.6.0
		 */
	
	// public properties:
		/**
		 * Indicates whether all images are finished loading.
		 * @property complete
		 * @type Boolean
		 * @readonly
		 **/
		p.complete = true;
	
	
		/**
		 * Specifies the framerate to use by default for Sprite instances using the SpriteSheet. See
		 * Sprite.framerate for more information.
		 * @property framerate
		 * @type Number
		 **/
		p.framerate = 0;
	
		// TODO: deprecated.
		/**
		 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "SpriteSheet/complete:event"}}{{/crossLink}}
		 * event.
		 * @property onComplete
		 * @type Function
		 * @deprecated Use addEventListener and the "complete" event.
		 **/
	
	// private properties:
		/**
		 * @property _animations
		 * @protected
		 **/
		p._animations = null;
	
		/**
		 * @property _frames
		 * @protected
		 **/
		p._frames = null;
	
		/**
		 * @property _images
		 * @protected
		 **/
		p._images = null;
	
		/**
		 * @property _data
		 * @protected
		 **/
		p._data = null;
	
		/**
		 * @property _loadCount
		 * @protected
		 **/
		p._loadCount = 0;
	
		// only used for simple frame defs:
		/**
		 * @property _frameHeight
		 * @protected
		 **/
		p._frameHeight = 0;
	
		/**
		 * @property _frameWidth
		 * @protected
		 **/
		p._frameWidth = 0;
	
		/**
		 * @property _numFrames
		 * @protected
		 **/
		p._numFrames = 0;
	
		/**
		 * @property _regX
		 * @protected
		 **/
		p._regX = 0;
	
		/**
		 * @property _regY
		 * @protected
		 **/
		p._regY = 0;
	
	// constructor:
		/**
		 * @method initialize
		 * @param {Object} data An object describing the SpriteSheet data.
		 * @protected
		 **/
		p.initialize = function(data) {
			var i,l,o,a;
			if (data == null) { return; }
	
			this.framerate = data.framerate||0;
	
			// parse images:
			if (data.images && (l=data.images.length) > 0) {
				a = this._images = [];
				for (i=0; i<l; i++) {
					var img = data.images[i];
					if (typeof img == "string") {
						var src = img;
						img = new Image();
						img.src = src;
					}
					a.push(img);
					if (!img.getContext && !img.complete) {
						this._loadCount++;
						this.complete = false;
						(function(o) { img.onload = function() { o._handleImageLoad(); } })(this);
					}
				}
			}
	
			// parse frames:
			if (data.frames == null) { // nothing
			} else if (data.frames instanceof Array) {
				this._frames = [];
				a = data.frames;
				for (i=0,l=a.length;i<l;i++) {
					var arr = a[i];
					this._frames.push({image:this._images[arr[4]?arr[4]:0], rect:new createjs.Rectangle(arr[0],arr[1],arr[2],arr[3]), regX:arr[5]||0, regY:arr[6]||0 });
				}
			} else {
				o = data.frames;
				this._frameWidth = o.width;
				this._frameHeight = o.height;
				this._regX = o.regX||0;
				this._regY = o.regY||0;
				this._numFrames = o.count;
				if (this._loadCount == 0) { this._calculateFrames(); }
			}
			
			// parse animations:
			this._animations = [];
			if ((o=data.animations) != null) {
				this._data = {};
				var name;
				for (name in o) {
					var anim = {name:name};
					var obj = o[name];
					if (typeof obj == "number") { // single frame
						a = anim.frames = [obj];
					} else if (obj instanceof Array) { // simple
						if (obj.length == 1) { anim.frames = [obj[0]]; }
						else {
							anim.speed = obj[3];
							anim.next = obj[2];
							a = anim.frames = [];
							for (i=obj[0];i<=obj[1];i++) {
								a.push(i);
							}
						}
					} else { // complex
						anim.speed = obj.speed;
						anim.next = obj.next;
						var frames = obj.frames;
						a = anim.frames = (typeof frames == "number") ? [frames] : frames.slice(0);
					}
					if (anim.next === true || anim.next === undefined) { anim.next = name; } // loop
					if (anim.next === false || (a.length < 2 && anim.next == name)) { anim.next = null; } // stop
					if (!anim.speed) { anim.speed = 1; }
					this._animations.push(name);
					this._data[name] = anim;
				}
			}
	
		};
	
	// public methods:
		/**
		 * Returns the total number of frames in the specified animation, or in the whole sprite
		 * sheet if the animation param is omitted.
	     * @method getNumFrames
		 * @param {String} animation The name of the animation to get a frame count for.
		 * @return {Number} The number of frames in the animation, or in the entire sprite sheet if the animation param is omitted.
		*/
		p.getNumFrames = function(animation) {
			if (animation == null) {
				return this._frames ? this._frames.length : this._numFrames;
			} else {
				var data = this._data[animation];
				if (data == null) { return 0; }
				else { return data.frames.length; }
			}
		};
	
		/**
		 * Returns an array of all available animation names as strings.
		 * @method getAnimations
		 * @return {Array} an array of animation names available on this sprite sheet.
		 **/
		p.getAnimations = function() {
			return this._animations.slice(0);
		};
	
		/**
		 * Returns an object defining the specified animation. The returned object contains:<UL>
		 *     <LI>frames: an array of the frame ids in the animation</LI>
		 *     <LI>speed: the playback speed for this animation</LI>
		 *     <LI>name: the name of the animation</LI>
		 *     <LI>next: the default animation to play next. If the animation loops, the name and next property will be the
		 *     same.</LI>
		 * </UL>
		 * @method getAnimation
		 * @param {String} name The name of the animation to get.
		 * @return {Object} a generic object with frames, speed, name, and next properties.
		 **/
		p.getAnimation = function(name) {
			return this._data[name];
		};
	
		/**
		 * Returns an object specifying the image and source rect of the specified frame. The returned object has:<UL>
		 *     <LI>an image property holding a reference to the image object in which the frame is found</LI>
		 *     <LI>a rect property containing a Rectangle instance which defines the boundaries for the frame within that
		 *     image.</LI>
		 * </UL>
		 * @method getFrame
		 * @param {Number} frameIndex The index of the frame.
		 * @return {Object} a generic object with image and rect properties. Returns null if the frame does not exist.
		 **/
		p.getFrame = function(frameIndex) {
			var frame;
			if (this._frames && (frame=this._frames[frameIndex])) { return frame; }
			return null;
		};
	
		/**
		 * Returns a {{#crossLink "Rectangle"}}{{/crossLink}} instance defining the bounds of the specified frame relative
		 * to the origin. For example, a 90 x 70 frame with a regX of 50 and a regY of 40 would return:
		 *
		 *      [x=-50, y=-40, width=90, height=70]
		 *
		 * @method getFrameBounds
		 * @param {Number} frameIndex The index of the frame.
		 * @param {Rectangle} [rectangle] A Rectangle instance to copy the values into. By default a new instance is created.
		 * @return {Rectangle} A Rectangle instance. Returns null if the frame does not exist, or the image is not fully loaded.
		 **/
		p.getFrameBounds = function(frameIndex, rectangle) {
			var frame = this.getFrame(frameIndex);
			return frame ? (rectangle||new createjs.Rectangle()).initialize(-frame.regX, -frame.regY, frame.rect.width, frame.rect.height) : null;
		};
	
		/**
		 * Returns a string representation of this object.
		 * @method toString
		 * @return {String} a string representation of the instance.
		 **/
		p.toString = function() {
			return "[SpriteSheet]";
		};
	
		/**
		 * Returns a clone of the SpriteSheet instance.
		 * @method clone
		 * @return {SpriteSheet} a clone of the SpriteSheet instance.
		 **/
		p.clone = function() {
			// TODO: there isn't really any reason to clone SpriteSheet instances, because they can be reused.
			var o = new SpriteSheet();
			o.complete = this.complete;
			o._animations = this._animations;
			o._frames = this._frames;
			o._images = this._images;
			o._data = this._data;
			o._frameHeight = this._frameHeight;
			o._frameWidth = this._frameWidth;
			o._numFrames = this._numFrames;
			o._loadCount = this._loadCount;
			return o;
		};
	
	// private methods:
		/**
		 * @method _handleImageLoad
		 * @protected
		 **/
		p._handleImageLoad = function() {
			if (--this._loadCount == 0) {
				this._calculateFrames();
				this.complete = true;
				this.dispatchEvent("complete");
			}
		};
	
		/**
		 * @method _calculateFrames
		 * @protected
		 **/
		p._calculateFrames = function() {
			if (this._frames || this._frameWidth == 0) { return; }
			this._frames = [];
			var ttlFrames = 0;
			var fw = this._frameWidth;
			var fh = this._frameHeight;
			for (var i=0,imgs = this._images; i<imgs.length; i++) {
				var img = imgs[i];
				var cols = (img.width+1)/fw|0;
				var rows = (img.height+1)/fh|0;
				var ttl = this._numFrames>0 ? Math.min(this._numFrames-ttlFrames,cols*rows) : cols*rows;
				for (var j=0;j<ttl;j++) {
					this._frames.push({image:img, rect:new createjs.Rectangle(j%cols*fw,(j/cols|0)*fh,fw,fh), regX:this._regX, regY:this._regY });
				}
				ttlFrames += ttl;
			}
			this._numFrames = ttlFrames;
		};
	
	createjs.SpriteSheet = SpriteSheet;
	}());


/***/ },
/* 56 */
/***/ function(module, exports) {

	/*
	* Stage
	* Visit http://createjs.com/ for documentation, updates and examples.
	*
	* Copyright (c) 2010 gskinner.com, inc.
	*
	* Permission is hereby granted, free of charge, to any person
	* obtaining a copy of this software and associated documentation
	* files (the "Software"), to deal in the Software without
	* restriction, including without limitation the rights to use,
	* copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the
	* Software is furnished to do so, subject to the following
	* conditions:
	*
	* The above copyright notice and this permission notice shall be
	* included in all copies or substantial portions of the Software.
	*
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	* OTHER DEALINGS IN THE SOFTWARE.
	*/
	
	/**
	 * @module EaselJS
	 */
	
	// namespace:
	this.createjs = this.createjs||{};
	
	(function() {
		"use strict";
	
	/**
	 * A stage is the root level {{#crossLink "Container"}}{{/crossLink}} for a display list. Each time its {{#crossLink "Stage/tick"}}{{/crossLink}}
	 * method is called, it will render its display list to its target canvas.
	 *
	 * <h4>Example</h4>
	 * This example creates a stage, adds a child to it, then uses {{#crossLink "Ticker"}}{{/crossLink}} to update the child
	 * and redraw the stage using {{#crossLink "Stage/update"}}{{/crossLink}}.
	 *
	 *      var stage = new createjs.Stage("canvasElementId");
	 *      var image = new createjs.Bitmap("imagePath.png");
	 *      stage.addChild(image);
	 *      createjs.Ticker.addEventListener("tick", handleTick);
	 *      function handleTick(event) {
	 *          image.x += 10;
	 *          stage.update();
	 *      }
	 *
	 * @class Stage
	 * @extends Container
	 * @constructor
	 * @param {HTMLCanvasElement | String | Object} canvas A canvas object that the Stage will render to, or the string id
	 * of a canvas object in the current document.
	 **/
	var Stage = function(canvas) {
	  this.initialize(canvas);
	};
	var p = Stage.prototype = new createjs.Container();
	
	// static properties:
		/**
		 * @property _snapToPixelEnabled
		 * @protected
		 * @static
		 * @type {Boolean}
		 * @default false
		 * @deprecated Hardware acceleration in modern browsers makes this unnecessary.
		 **/
		Stage._snapToPixelEnabled = false; // snapToPixelEnabled is temporarily copied here during a draw to provide global access.
	
	// events:
	
		/**
		 * Dispatched when the user moves the mouse over the canvas.
		 * See the {{#crossLink "MouseEvent"}}{{/crossLink}} class for a listing of event properties.
		 * @event stagemousemove
		 * @since 0.6.0
		 */
	
		/**
		 * Dispatched when the user presses their left mouse button on the canvas. See the {{#crossLink "MouseEvent"}}{{/crossLink}}
		 * class for a listing of event properties.
		 * @event stagemousedown
		 * @since 0.6.0
		 */
	
		/**
		 * Dispatched when the user the user releases the mouse button anywhere that the page can detect it (this varies slightly between browsers).
		 * See the {{#crossLink "MouseEvent"}}{{/crossLink}} class for a listing of event properties.
		 * @event stagemouseup
		 * @since 0.6.0
		 */
	
		/**
		 * Dispatched when the mouse moves from within the canvas area (mouseInBounds == true) to outside it (mouseInBounds == false).
		 * This is currently only dispatched for mouse input (not touch). See the {{#crossLink "MouseEvent"}}{{/crossLink}}
		 * class for a listing of event properties.
		 * @event mouseleave
		 * @since 0.7.0
		 */
	
		/**
		 * Dispatched when the mouse moves into the canvas area (mouseInBounds == false) from outside it (mouseInBounds == true).
		 * This is currently only dispatched for mouse input (not touch). See the {{#crossLink "MouseEvent"}}{{/crossLink}}
		 * class for a listing of event properties.
		 * @event mouseenter
		 * @since 0.7.0
		 */
		 
		/**
		 * Dispatched each update immediately before the tick event is propagated through the display list. Does not fire if
		 * tickOnUpdate is false.
		 * @event tickstart
		 * @since 0.7.0
		 */
		 
		/**
		 * Dispatched each update immediately after the tick event is propagated through the display list. Does not fire if
		 * tickOnUpdate is false. Precedes the "drawstart" event.
		 * @event tickend
		 * @since 0.7.0
		 */
		 
		/**
		 * Dispatched each update immediately before the canvas is cleared and the display list is drawn to it.
		 * @event drawstart
		 * @since 0.7.0
		 */
		 
		/**
		 * Dispatched each update immediately after the display list is drawn to the canvas and the canvas context is restored.
		 * @event drawend
		 * @since 0.7.0
		 */
	
	// public properties:
		/**
		 * Indicates whether the stage should automatically clear the canvas before each render. You can set this to <code>false</code>
		 * to manually control clearing (for generative art, or when pointing multiple stages at the same canvas for
		 * example).
		 *
		 * <h4>Example</h4>
		 *
		 *      var stage = new createjs.Stage("canvasId");
		 *      stage.autoClear = false;
		 *
		 * @property autoClear
		 * @type Boolean
		 * @default true
		 **/
		p.autoClear = true;
	
		/**
		 * The canvas the stage will render to. Multiple stages can share a single canvas, but you must disable autoClear for all but the
		 * first stage that will be ticked (or they will clear each other's render).
		 *
		 * When changing the canvas property you must disable the events on the old canvas, and enable events on the
		 * new canvas or mouse events will not work as expected. For example:
		 *
		 *      myStage.enableDOMEvents(false);
		 *      myStage.canvas = anotherCanvas;
		 *      myStage.enableDOMEvents(true);
		 *
		 * @property canvas
		 * @type HTMLCanvasElement | Object
		 **/
		p.canvas = null;
	
		/**
		 * The current mouse X position on the canvas. If the mouse leaves the canvas, this will indicate the most recent
		 * position over the canvas, and mouseInBounds will be set to false.
		 * @property mouseX
		 * @type Number
		 * @readonly
		 **/
		p.mouseX = 0;
	
		/**
		 * The current mouse Y position on the canvas. If the mouse leaves the canvas, this will indicate the most recent
		 * position over the canvas, and mouseInBounds will be set to false.
		 * @property mouseY
		 * @type Number
		 * @readonly
		 **/
		p.mouseY = 0;
	
		// TODO: deprecated.
		/**
		 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the "{{#crossLink "Stage/stagemousemove:event"}}{{/crossLink}}
		 * event.
		 * @property onMouseMove
		 * @type Function
		 * @deprecated Use addEventListener and the "stagemousemove" event.
		 */
		/**
		 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "Stage/stagemouseup:event"}}{{/crossLink}}
		 * event.
		 * @property onMouseUp
		 * @type Function
		 * @deprecated Use addEventListener and the "stagemouseup" event.
		 */
		/**
		 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "Stage/stagemousedown:event"}}{{/crossLink}}
		 * event.
		 * @property onMouseDown
		 * @type Function
		 * @deprecated Use addEventListener and the "stagemousedown" event.
		 */
	
		// TODO: deprecated.
		/**
		 * Indicates whether this stage should use the {{#crossLink "DisplayObject/snapToPixel"}}{{/crossLink}} property of
		 * display objects when rendering them.
		 * @property snapToPixelEnabled
		 * @type Boolean
		 * @default false
		 * @deprecated Hardware acceleration makes this not beneficial
		 **/
		p.snapToPixelEnabled = false;
	
		/**
		 * Indicates whether the mouse is currently within the bounds of the canvas.
		 * @property mouseInBounds
		 * @type Boolean
		 * @default false
		 **/
		p.mouseInBounds = false;
	
		/**
		 * If true, tick callbacks will be called on all display objects on the stage prior to rendering to the canvas.
		 * @property tickOnUpdate
		 * @type Boolean
		 * @default true
		 **/
		p.tickOnUpdate = true;
	
		/**
		 * If true, mouse move events will continue to be called when the mouse leaves the target canvas. See
		 * {{#crossLink "Stage/mouseInBounds:property"}}{{/crossLink}}, and {{#crossLink "MouseEvent"}}{{/crossLink}}
		 * x/y/rawX/rawY.
		 * @property mouseMoveOutside
		 * @type Boolean
		 * @default false
		 **/
		p.mouseMoveOutside = false;
		
		// TODO: confirm naming and inclusion.
		/**
		 * NOTE: this name is not final. Feedback is appreciated.
		 *
		 * The stage assigned to this property will have mouse interactions relayed to it after this stage handles them.
		 * This can be useful in cases where you have multiple canvases layered on top of one another and want your mouse
		 * events to pass through. For example, this would relay mouse events from topStage to bottomStage:
		 *
		 *      topStage.nextStage = bottomStage;
		 *
		 * Note that each stage handles the interactions independently. As such, you could have a click register on an
		 * object in the top stage, and another click register in the bottom stage. Consider using a single canvas with
		 * cached {{#crossLink "Container"}}{{/crossLink}} instances instead of multiple canvases.
		 *
		 * MouseOver, MouseOut, RollOver, and RollOut interactions will not be passed through. They must be enabled using
		 * {{#crossLink "Stage/enableMouseOver"}}{{/crossLink}} for each stage individually.
		 * 
		 * In most instances, you will also want to disable DOM events for the next stage to avoid duplicate interactions.
		 * myNextStage.enableDOMEvents(false);
		 * 
		 * @property nextStage
		 * @type Stage
		 **/
		p.nextStage = null;
	
		/**
		 * The hitArea property is not supported for Stage.
		 * @property hitArea
		 * @type {DisplayObject}
		 * @default null
		 */
	
	// private properties:
	
		/**
		 * Holds objects with data for each active pointer id. Each object has the following properties:
		 * x, y, event, target, overTarget, overX, overY, inBounds, posEvtObj (native event that last updated position)
		 * @property _pointerData
		 * @type {Object}
		 * @private
		 */
		p._pointerData = null;
	
		/**
		 * Number of active pointers.
		 * @property _pointerCount
		 * @type {Object}
		 * @private
		 */
		p._pointerCount = 0;
	
		/**
		 * The ID of the primary pointer.
		 * @property _primaryPointerID
		 * @type {Object}
		 * @private
		 */
		p._primaryPointerID = null;
	
		/**
		 * @property _mouseOverIntervalID
		 * @protected
		 * @type Number
		 **/
		p._mouseOverIntervalID = null;
	
	// constructor:
		/**
		 * @property DisplayObject_initialize
		 * @type Function
		 * @private
		 **/
		p.Container_initialize = p.initialize;
	
		/**
		 * Initialization method.
		 * @method initialize
		 * @param {HTMLCanvasElement | String | Object} canvas A canvas object, or the string id of a canvas object in the current document.
		 * @protected
		 **/
		p.initialize = function(canvas) {
			this.Container_initialize();
			this.canvas = (typeof canvas == "string") ? document.getElementById(canvas) : canvas;
			this._pointerData = {};
			this.enableDOMEvents(true);
		};
	
	// public methods:
	
		/**
		 * Each time the update method is called, the stage will tick all descendants (see: {{#crossLink "DisplayObject/tick"}}{{/crossLink}})
		 * and then render the display list to the canvas. Any parameters passed to `update()` will be passed on to any
		 * {{#crossLink "DisplayObject/tick:event"}}{{/crossLink}} event handlers.
		 *
		 * Some time-based features in EaselJS (for example {{#crossLink "Sprite/framerate"}}{{/crossLink}} require that
		 * a tick event object (or equivalent) be passed as the first parameter to update(). For example:
		 *
		 *      Ticker.addEventListener("tick", handleTick);
		 * 	    function handleTick(evtObj) {
		 * 	     	// do some work here, then update the stage, passing through the event object:
		 * 	    	myStage.update(evtObj);
		 * 	    }
		 *
		 * @method update
		 * @param {*} [params]* Params to include when ticking descendants. The first param should usually be a tick event.
		 **/
		p.update = function(params) {
			if (!this.canvas) { return; }
			if (this.tickOnUpdate) {
				this.dispatchEvent("tickstart");  // TODO: make cancellable?
				this._tick((arguments.length ? arguments : null));
				this.dispatchEvent("tickend");
			}
			this.dispatchEvent("drawstart"); // TODO: make cancellable?
			Stage._snapToPixelEnabled = this.snapToPixelEnabled;
			if (this.autoClear) { this.clear(); }
			var ctx = this.canvas.getContext("2d");
			ctx.save();
			this.updateContext(ctx);
			this.draw(ctx, false);
			ctx.restore();
			this.dispatchEvent("drawend");
		};
	
		/**
		 * Default event handler that calls the Stage {{#crossLink "Stage/update"}}{{/crossLink}} method when a {{#crossLink "DisplayObject/tick:event"}}{{/crossLink}}
		 * event is received. This allows you to register a Stage instance as a event listener on {{#crossLink "Ticker"}}{{/crossLink}}
		 * directly, using:
		 *
		 *      Ticker.addEventListener("tick", myStage");
		 *
		 * Note that if you subscribe to ticks using this pattern, then the tick event object will be passed through to
		 * display object tick handlers, instead of <code>delta</code> and <code>paused</code> parameters.
		 * @property handleEvent
		 * @type Function
		 **/
		p.handleEvent = function(evt) {
			if (evt.type == "tick") { this.update(evt); }
		};
	
		/**
		 * Clears the target canvas. Useful if {{#crossLink "Stage/autoClear:property"}}{{/crossLink}} is set to `false`.
		 * @method clear
		 **/
		p.clear = function() {
			if (!this.canvas) { return; }
			var ctx = this.canvas.getContext("2d");
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.clearRect(0, 0, this.canvas.width+1, this.canvas.height+1);
		};
	
		/**
		 * Returns a data url that contains a Base64-encoded image of the contents of the stage. The returned data url can
		 * be specified as the src value of an image element.
		 * @method toDataURL
		 * @param {String} backgroundColor The background color to be used for the generated image. The value can be any value HTML color
		 * value, including HEX colors, rgb and rgba. The default value is a transparent background.
		 * @param {String} mimeType The MIME type of the image format to be create. The default is "image/png". If an unknown MIME type
		 * is passed in, or if the browser does not support the specified MIME type, the default value will be used.
		 * @return {String} a Base64 encoded image.
		 **/
		p.toDataURL = function(backgroundColor, mimeType) {
			if(!mimeType) {
				mimeType = "image/png";
			}
	
			var ctx = this.canvas.getContext('2d');
			var w = this.canvas.width;
			var h = this.canvas.height;
	
			var data;
	
			if(backgroundColor) {
	
				//get the current ImageData for the canvas.
				data = ctx.getImageData(0, 0, w, h);
	
				//store the current globalCompositeOperation
				var compositeOperation = ctx.globalCompositeOperation;
	
				//set to draw behind current content
				ctx.globalCompositeOperation = "destination-over";
	
				//set background color
				ctx.fillStyle = backgroundColor;
	
				//draw background on entire canvas
				ctx.fillRect(0, 0, w, h);
			}
	
			//get the image data from the canvas
			var dataURL = this.canvas.toDataURL(mimeType);
	
			if(backgroundColor) {
				//clear the canvas
				ctx.clearRect (0, 0, w+1, h+1);
	
				//restore it with original settings
				ctx.putImageData(data, 0, 0);
	
				//reset the globalCompositeOperation to what it was
				ctx.globalCompositeOperation = compositeOperation;
			}
	
			return dataURL;
		};
	
		/**
		 * Enables or disables (by passing a frequency of 0) mouse over events ({{#crossLink "DisplayObject/mouseover:event"}}{{/crossLink}}
		 * and {{#crossLink "DisplayObject/mouseout:event"}}{{/crossLink}}) for this stage's display list. These events can
		 * be expensive to generate, so they are disabled by default. The frequency of the events can be controlled
		 * independently of mouse move events via the optional `frequency` parameter.
		 *
		 * <h4>Example</h4>
		 *      var stage = new createjs.Stage("canvasId");
		 *      stage.enableMouseOver(10); // 10 updates per second
		 *
		 * @method enableMouseOver
		 * @param {Number} [frequency=20] Optional param specifying the maximum number of times per second to broadcast
		 * mouse over/out events. Set to 0 to disable mouse over events completely. Maximum is 50. A lower frequency is less
		 * responsive, but uses less CPU.
		 **/
		p.enableMouseOver = function(frequency) {
			if (this._mouseOverIntervalID) {
				clearInterval(this._mouseOverIntervalID);
				this._mouseOverIntervalID = null;
				if (frequency == 0) {
					this._testMouseOver(true);
				}
			}
			if (frequency == null) { frequency = 20; }
			else if (frequency <= 0) { return; }
			var o = this;
			this._mouseOverIntervalID = setInterval(function(){ o._testMouseOver(); }, 1000/Math.min(50,frequency));
		};
	
		/**
		 * Enables or disables the event listeners that stage adds to DOM elements (window, document and canvas). It is good
		 * practice to disable events when disposing of a Stage instance, otherwise the stage will continue to receive
		 * events from the page.
		 *
		 * When changing the canvas property you must disable the events on the old canvas, and enable events on the
		 * new canvas or mouse events will not work as expected. For example:
		 *
		 *      myStage.enableDOMEvents(false);
		 *      myStage.canvas = anotherCanvas;
		 *      myStage.enableDOMEvents(true);
		 *
		 * @method enableDOMEvents
		 * @param {Boolean} [enable=true] Indicates whether to enable or disable the events. Default is true.
		 **/
		p.enableDOMEvents = function(enable) {
			if (enable == null) { enable = true; }
			var n, o, ls = this._eventListeners;
			if (!enable && ls) {
				for (n in ls) {
					o = ls[n];
					o.t.removeEventListener(n, o.f, false);
				}
				this._eventListeners = null;
			} else if (enable && !ls && this.canvas) {
				var t = window.addEventListener ? window : document;
				var _this = this;
				ls = this._eventListeners = {};
				ls["mouseup"] = {t:t, f:function(e) { _this._handleMouseUp(e)} };
				ls["mousemove"] = {t:t, f:function(e) { _this._handleMouseMove(e)} };
				ls["dblclick"] = {t:t, f:function(e) { _this._handleDoubleClick(e)} };
				ls["mousedown"] = {t:this.canvas, f:function(e) { _this._handleMouseDown(e)} };
	
				for (n in ls) {
					o = ls[n];
					o.t.addEventListener(n, o.f, false);
				}
			}
		};
	
		/**
		 * Returns a clone of this Stage.
		 * @return {Stage} A clone of the current Container instance.
		 **/
		p.clone = function() {
			var o = new Stage(null);
			this.cloneProps(o);
			return o;
		};
	
		/**
		 * Returns a string representation of this object.
		 * @method toString
		 * @return {String} a string representation of the instance.
		 **/
		p.toString = function() {
			return "[Stage (name="+  this.name +")]";
		};
	
		// private methods:
	
		/**
		 * @method _getElementRect
		 * @protected
		 * @param {HTMLElement} e
		 **/
		p._getElementRect = function(e) {
			var bounds;
			try { bounds = e.getBoundingClientRect(); } // this can fail on disconnected DOM elements in IE9
			catch (err) { bounds = {top: e.offsetTop, left: e.offsetLeft, width:e.offsetWidth, height:e.offsetHeight}; }
	
			var offX = (window.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || document.body.clientLeft || 0);
			var offY = (window.pageYOffset || document.scrollTop || 0) - (document.clientTop  || document.body.clientTop  || 0);
	
			var styles = window.getComputedStyle ? getComputedStyle(e) : e.currentStyle; // IE <9 compatibility.
			var padL = parseInt(styles.paddingLeft)+parseInt(styles.borderLeftWidth);
			var padT = parseInt(styles.paddingTop)+parseInt(styles.borderTopWidth);
			var padR = parseInt(styles.paddingRight)+parseInt(styles.borderRightWidth);
			var padB = parseInt(styles.paddingBottom)+parseInt(styles.borderBottomWidth);
	
			// note: in some browsers bounds properties are read only.
			return {
				left: bounds.left+offX+padL,
				right: bounds.right+offX-padR,
				top: bounds.top+offY+padT,
				bottom: bounds.bottom+offY-padB
			}
		};
	
		/**
		 * @method _getPointerData
		 * @protected
		 * @param {Number} id
		 **/
		p._getPointerData = function(id) {
			var data = this._pointerData[id];
			if (!data) {
				data = this._pointerData[id] = {x:0,y:0};
				// if it's the first new touch, then make it the primary pointer id:
				if (this._primaryPointerID == null) { this._primaryPointerID = id; }
			}
			return data;
		};
	
		/**
		 * @method _handleMouseMove
		 * @protected
		 * @param {MouseEvent} e
		 **/
		p._handleMouseMove = function(e) {
			if(!e){ e = window.event; }
			this._handlePointerMove(-1, e, e.pageX, e.pageY);
		};
	
		/**
		 * @method _handlePointerMove
		 * @protected
		 * @param {Number} id
		 * @param {Event} e
		 * @param {Number} pageX
		 * @param {Number} pageY
		 **/
		p._handlePointerMove = function(id, e, pageX, pageY) {
			if (!this.canvas) { return; }
			var o = this._getPointerData(id);
	
			var inBounds = o.inBounds;
			this._updatePointerPosition(id, e, pageX, pageY);
			if (!inBounds && !o.inBounds && !this.mouseMoveOutside) { return; }
			if (id == -1 && o.inBounds == !inBounds) {
				this._dispatchMouseEvent(this, (inBounds ? "mouseleave" : "mouseenter"), false, id, o, e);
			}
			
			this._dispatchMouseEvent(this, "stagemousemove", false, id, o, e);
			this._dispatchMouseEvent(o.target, "pressmove", true, id, o, e);
	
			// TODO: deprecated:
			var oEvent = o.event;
			if (oEvent && oEvent.hasEventListener("mousemove")) {
				// this doesn't use _dispatchMouseEvent because it requires re-targeting.
				oEvent.dispatchEvent(new createjs.MouseEvent("mousemove", false, false, o.x, o.y, e, id, (id == this._primaryPointerID), o.rawX, o.rawY), oTarget);
			}
	
			this.nextStage&&this.nextStage._handlePointerMove(id, e, pageX, pageY);
		};
	
		/**
		 * @method _updatePointerPosition
		 * @protected
		 * @param {Number} id
		 * @param {Event} e
		 * @param {Number} pageX
		 * @param {Number} pageY
		 **/
		p._updatePointerPosition = function(id, e, pageX, pageY) {
			var rect = this._getElementRect(this.canvas);
			pageX -= rect.left;
			pageY -= rect.top;
	
			var w = this.canvas.width;
			var h = this.canvas.height;
			pageX /= (rect.right-rect.left)/w;
			pageY /= (rect.bottom-rect.top)/h;
			var o = this._getPointerData(id);
			if (o.inBounds = (pageX >= 0 && pageY >= 0 && pageX <= w-1 && pageY <= h-1)) {
				o.x = pageX;
				o.y = pageY;
			} else if (this.mouseMoveOutside) {
				o.x = pageX < 0 ? 0 : (pageX > w-1 ? w-1 : pageX);
				o.y = pageY < 0 ? 0 : (pageY > h-1 ? h-1 : pageY);
			}
	
			o.posEvtObj = e;
			o.rawX = pageX;
			o.rawY = pageY;
	
			if (id == this._primaryPointerID) {
				this.mouseX = o.x;
				this.mouseY = o.y;
				this.mouseInBounds = o.inBounds;
			}
		};
	
		/**
		 * @method _handleMouseUp
		 * @protected
		 * @param {MouseEvent} e
		 **/
		p._handleMouseUp = function(e) {
			this._handlePointerUp(-1, e, false);
		};
	
		/**
		 * @method _handlePointerUp
		 * @protected
		 * @param {Number} id
		 * @param {Event} e
		 * @param {Boolean} clear
		 **/
		p._handlePointerUp = function(id, e, clear) {
			var o = this._getPointerData(id);
	
			this._dispatchMouseEvent(this, "stagemouseup", false, id, o, e);
	
			var oTarget = o.target;
			if (oTarget) {
				if (this._getObjectsUnderPoint(o.x, o.y, null, true) == oTarget) {
					this._dispatchMouseEvent(oTarget, "click", true, id, o, e);
				}
				this._dispatchMouseEvent(oTarget, "pressup", true, id, o, e);
			}
	
			// TODO: deprecated:
			var oEvent = o.event;
			if (oEvent && oEvent.hasEventListener("mouseup")) {
				// this doesn't use _dispatchMouseEvent because it requires re-targeting.
				oEvent.dispatchEvent(new createjs.MouseEvent("mouseup", false, false, o.x, o.y, e, id, (id==this._primaryPointerID), o.rawX, o.rawY), oTarget);
			}
	
			if (clear) {
				if (id==this._primaryPointerID) { this._primaryPointerID = null; }
				delete(this._pointerData[id]);
			} else { o.event = o.target = null; }
	
			this.nextStage&&this.nextStage._handlePointerUp(id, e, clear);
		};
	
		/**
		 * @method _handleMouseDown
		 * @protected
		 * @param {MouseEvent} e
		 **/
		p._handleMouseDown = function(e) {
			this._handlePointerDown(-1, e);
		};
	
		/**
		 * @method _handlePointerDown
		 * @protected
		 * @param {Number} id
		 * @param {Event} e
		 * @param {Number} pageX
		 * @param {Number} pageY
		 **/
		p._handlePointerDown = function(id, e, pageX, pageY) {
			if (pageY != null) { this._updatePointerPosition(id, e, pageX, pageY); }
			var o = this._getPointerData(id);
	
			this._dispatchMouseEvent(this, "stagemousedown", false, id, o, e);
	
			o.target = this._getObjectsUnderPoint(o.x, o.y, null, true);
			this._dispatchMouseEvent(o.target, "mousedown", true, id, o, e);
	
			this.nextStage&&this.nextStage._handlePointerDown(id, e, pageX, pageY);
		};
	
		/**
		 * @method _testMouseOver
		 * @param {Boolean} clear If true, clears the mouseover / rollover (ie. no target)
		 * @protected
		 **/
		p._testMouseOver = function(clear) {
			// only update if the mouse position has changed. This provides a lot of optimization, but has some trade-offs.
			if (this._primaryPointerID != -1 || (!clear && this.mouseX == this._mouseOverX && this.mouseY == this._mouseOverY && this.mouseInBounds)) { return; }
			var o = this._getPointerData(-1);
			var e = o.posEvtObj;
			var target, common = -1, cursor="", t, i, l;
			
			if (clear || this.mouseInBounds && e && e.target == this.canvas) {
				target = this._getObjectsUnderPoint(this.mouseX, this.mouseY, null, true);
				this._mouseOverX = this.mouseX;
				this._mouseOverY = this.mouseY;
			}
	
			var oldList = this._mouseOverTarget||[];
			var oldTarget = oldList[oldList.length-1];
			var list = this._mouseOverTarget = [];
	
			// generate ancestor list and check for cursor:
			t = target;
			while (t) {
				list.unshift(t);
				if (t.cursor != null) { cursor = t.cursor; }
				t = t.parent;
			}
			this.canvas.style.cursor = cursor;
	
			// find common ancestor:
			for (i=0,l=list.length; i<l; i++) {
				if (list[i] != oldList[i]) { break; }
				common = i;
			}
	
			if (oldTarget != target) {
				this._dispatchMouseEvent(oldTarget, "mouseout", true, -1, o, e);
			}
	
			for (i=oldList.length-1; i>common; i--) {
				this._dispatchMouseEvent(oldList[i], "rollout", false, -1, o, e);
			}
	
			for (i=list.length-1; i>common; i--) {
				this._dispatchMouseEvent(list[i], "rollover", false, -1, o, e);
			}
	
			if (oldTarget != target) {
				this._dispatchMouseEvent(target, "mouseover", true, -1, o, e);
			}
	
		};
	
		/**
		 * @method _handleDoubleClick
		 * @protected
		 * @param {MouseEvent} e
		 **/
		p._handleDoubleClick = function(e) {
			var o = this._getPointerData(-1);
			var target = this._getObjectsUnderPoint(o.x, o.y, null, true);
			this._dispatchMouseEvent(target, "dblclick", true, -1, o, e);
	
			this.nextStage&&this.nextStage._handleDoubleClick(e);
		};
	
		/**
		 * @method _dispatchMouseEvent
		 * @protected
		 * @param {DisplayObject} target
		 * @param {String} type
		 * @param {Boolean} bubbles
		 * @param {Number} pointerId
		 * @param {Object} o
		 * @param {MouseEvent} [nativeEvent]
		 **/
		p._dispatchMouseEvent = function(target, type, bubbles, pointerId, o, nativeEvent) {
			// TODO: might be worth either reusing MouseEvent instances, or adding a willTrigger method to avoid GC.
			if (!target || (!bubbles && !target.hasEventListener(type))) { return; }
			/*
			// TODO: account for stage transformations:
			this._mtx = this.getConcatenatedMatrix(this._mtx).invert();
			var pt = this._mtx.transformPoint(o.x, o.y);
			var evt = new createjs.MouseEvent(type, bubbles, false, pt.x, pt.y, nativeEvent, pointerId, pointerId==this._primaryPointerID, o.rawX, o.rawY);
			*/
			var evt = new createjs.MouseEvent(type, bubbles, false, o.x, o.y, nativeEvent, pointerId, pointerId==this._primaryPointerID, o.rawX, o.rawY);
			target.dispatchEvent(evt);
		};
	
	createjs.Stage = Stage;
	}());


/***/ },
/* 57 */
/***/ function(module, exports) {

	/*
	* Text
	* Visit http://createjs.com/ for documentation, updates and examples.
	*
	* Copyright (c) 2010 gskinner.com, inc.
	*
	* Permission is hereby granted, free of charge, to any person
	* obtaining a copy of this software and associated documentation
	* files (the "Software"), to deal in the Software without
	* restriction, including without limitation the rights to use,
	* copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the
	* Software is furnished to do so, subject to the following
	* conditions:
	*
	* The above copyright notice and this permission notice shall be
	* included in all copies or substantial portions of the Software.
	*
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	* OTHER DEALINGS IN THE SOFTWARE.
	*/
	
	/**
	 * @module EaselJS
	 */
	
	// namespace:
	this.createjs = this.createjs||{};
	
	(function() {
		"use strict";
	
	/**
	 * Display one or more lines of dynamic text (not user editable) in the display list. Line wrapping support (using the
	 * lineWidth) is very basic, wrapping on spaces and tabs only. Note that as an alternative to Text, you can position HTML
	 * text above or below the canvas relative to items in the display list using the {{#crossLink "DisplayObject/localToGlobal"}}{{/crossLink}}
	 * method, or using {{#crossLink "DOMElement"}}{{/crossLink}}.
	 *
	 * <b>Please note that Text does not support HTML text, and can only display one font style at a time.</b> To use
	 * multiple font styles, you will need to create multiple text instances, and position them manually.
	 *
	 * <h4>Example</h4>
	 *      var text = new createjs.Text("Hello World", "20px Arial", "#ff7700");
	 *      text.x = 100;
	 *      text.textBaseline = "alphabetic";
	 *
	 * CreateJS Text supports web fonts (the same rules as Canvas). The font must be loaded and supported by the browser
	 * before it can be displayed.
	 *
	 * <strong>Note:</strong> Text can be expensive to generate, so cache instances where possible. Be aware that not all
	 * browsers will render Text exactly the same.
	 * @class Text
	 * @extends DisplayObject
	 * @constructor
	 * @param {String} [text] The text to display.
	 * @param {String} [font] The font style to use. Any valid value for the CSS font attribute is acceptable (ex. "bold
	 * 36px Arial").
	 * @param {String} [color] The color to draw the text in. Any valid value for the CSS color attribute is acceptable (ex.
	 * "#F00", "red", or "#FF0000").
	 **/
	var Text = function(text, font, color) {
	  this.initialize(text, font, color);
	};
	var p = Text.prototype = new createjs.DisplayObject();
	
		/**
		 * @property _workingContext
		 * @type CanvasRenderingContext2D
		 * @private
		 **/
		var canvas = (createjs.createCanvas?createjs.createCanvas():document.createElement("canvas"));
		if (canvas.getContext) { Text._workingContext = canvas.getContext("2d"); canvas.width = canvas.height = 1; }
		
	// static properties:
		/**
		 * Lookup table for the ratio to offset bounds x calculations based on the textAlign property.
		 * @property H_OFFSETS
		 * @type Object
		 * @protected
		 * @static
		 **/
		Text.H_OFFSETS = {start: 0, left: 0, center: -0.5, end: -1, right: -1};
		
		/**
		 * Lookup table for the ratio to offset bounds y calculations based on the textBaseline property.
		 * @property H_OFFSETS
		 * @type Object
		 * @protected
		 * @static
		 **/
		Text.V_OFFSETS = {top: 0, hanging: -0.01, middle: -0.4, alphabetic: -0.8, ideographic: -0.85, bottom: -1};
	
	// public properties:
		/**
		 * The text to display.
		 * @property text
		 * @type String
		 **/
		p.text = "";
	
		/**
		 * The font style to use. Any valid value for the CSS font attribute is acceptable (ex. "bold 36px Arial").
		 * @property font
		 * @type String
		 **/
		p.font = null;
	
		/**
		 * The color to draw the text in. Any valid value for the CSS color attribute is acceptable (ex. "#F00"). Default is "#000".
		 * It will also accept valid canvas fillStyle values.
		 * @property color
		 * @type String
		 **/
		p.color = null;
	
		/**
		 * The horizontal text alignment. Any of "start", "end", "left", "right", and "center". For detailed
		 * information view the
		 * <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#text-styles">
		 * whatwg spec</a>. Default is "left".
		 * @property textAlign
		 * @type String
		 **/
		p.textAlign = "left";
	
		/**
		 * The vertical alignment point on the font. Any of "top", "hanging", "middle", "alphabetic", "ideographic", or
		 * "bottom". For detailed information view the <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#text-styles">
		 * whatwg spec</a>. Default is "top".
		 * @property textBaseline
		 * @type String
		*/
		p.textBaseline = "top";
	
		/**
		 * The maximum width to draw the text. If maxWidth is specified (not null), the text will be condensed or
		 * shrunk to make it fit in this width. For detailed information view the
		 * <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#text-styles">
		 * whatwg spec</a>.
		 * @property maxWidth
		 * @type Number
		*/
		p.maxWidth = null;
	
		/**
		 * If greater than 0, the text will be drawn as a stroke (outline) of the specified width.
		 * @property outline
		 * @type Number
		 **/
		p.outline = 0;
	
		/**
		 * Indicates the line height (vertical distance between baselines) for multi-line text. If null or 0,
		 * the value of getMeasuredLineHeight is used.
		 * @property lineHeight
		 * @type Number
		 **/
		p.lineHeight = 0;
	
		/**
		 * Indicates the maximum width for a line of text before it is wrapped to multiple lines. If null,
		 * the text will not be wrapped.
		 * @property lineWidth
		 * @type Number
		 **/
		p.lineWidth = null;
	
	// private properties:
	
	// constructor:
		/**
		 * @property DisplayObject_initialize
		 * @private
		 * @type Function
		 **/
		p.DisplayObject_initialize = p.initialize;
	
		/**
		 * Initialization method.
		 * @method initialize
		 * @param {String} [text] The text to display.
		 * @param {String} [font] The font style to use. Any valid value for the CSS font attribute is acceptable (ex. "bold
		 * 36px Arial").
		 * @param {String} [color] The color to draw the text in. Any valid value for the CSS color attribute is acceptable (ex.
		 * "#F00", "red", or "#FF0000").
		 * @protected
		*/
		p.initialize = function(text, font, color) {
			this.DisplayObject_initialize();
			this.text = text;
			this.font = font;
			this.color = color;
		};
	
		/**
		 * Returns true or false indicating whether the display object would be visible if drawn to a canvas.
		 * This does not account for whether it would be visible within the boundaries of the stage.
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 * @method isVisible
		 * @return {Boolean} Whether the display object would be visible if drawn to a canvas
		 **/
		p.isVisible = function() {
			var hasContent = this.cacheCanvas || (this.text != null && this.text !== "");
			return !!(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && hasContent);
		};
	
		/**
		 * @property DisplayObject_draw
		 * @private
		 * @type Function
		 **/
		p.DisplayObject_draw = p.draw;
	
		/**
		 * Draws the Text into the specified context ignoring its visible, alpha, shadow, and transform.
		 * Returns true if the draw was handled (useful for overriding functionality).
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 * @method draw
		 * @param {CanvasRenderingContext2D} ctx The canvas 2D context object to draw into.
		 * @param {Boolean} ignoreCache Indicates whether the draw operation should ignore any current cache.
		 * For example, used for drawing the cache (to prevent it from simply drawing an existing cache back
		 * into itself).
		 **/
		p.draw = function(ctx, ignoreCache) {
			if (this.DisplayObject_draw(ctx, ignoreCache)) { return true; }
	
			var col = this.color || "#000";
			if (this.outline) { ctx.strokeStyle = col; ctx.lineWidth = this.outline*1; }
			else { ctx.fillStyle = col; }
			
			this._drawText(this._prepContext(ctx));
			return true;
		};
	
		/**
		 * Returns the measured, untransformed width of the text without wrapping. Use getBounds for a more robust value.
		 * @method getMeasuredWidth
		 * @return {Number} The measured, untransformed width of the text.
		 **/
		p.getMeasuredWidth = function() {
			return this._prepContext(Text._workingContext).measureText(this.text).width;
		};
	
		/**
		 * Returns an approximate line height of the text, ignoring the lineHeight property. This is based on the measured
		 * width of a "M" character multiplied by 1.2, which provides an approximate line height for most fonts.
		 * @method getMeasuredLineHeight
		 * @return {Number} an approximate line height of the text, ignoring the lineHeight property. This is
		 * based on the measured width of a "M" character multiplied by 1.2, which approximates em for most fonts.
		 **/
		p.getMeasuredLineHeight = function() {
			return this._prepContext(Text._workingContext).measureText("M").width*1.2;
		};
	
		/**
		 * Returns the approximate height of multi-line text by multiplying the number of lines against either the
		 * <code>lineHeight</code> (if specified) or {{#crossLink "Text/getMeasuredLineHeight"}}{{/crossLink}}. Note that
		 * this operation requires the text flowing logic to run, which has an associated CPU cost.
		 * @method getMeasuredHeight
		 * @return {Number} The approximate height of the untransformed multi-line text.
		 **/
		p.getMeasuredHeight = function() {
			return this._drawText(null,{}).height;
		};
		
		/**
		 * @property DisplayObject_getBounds
		 * @type Function
		 * @protected
		 **/
		p.DisplayObject_getBounds = p.getBounds;
	
		/**
		 * Docced in superclass.
		 */
		p.getBounds = function() {
			var rect = this.DisplayObject_getBounds();
			if (rect) { return rect; }
			if (this.text == null || this.text == "") { return null; }
			var o = this._drawText(null, {});
			var w = (this.maxWidth && this.maxWidth < o.width) ? this.maxWidth : o.width;
			var x = w * Text.H_OFFSETS[this.textAlign||"left"];
			var lineHeight = this.lineHeight||this.getMeasuredLineHeight();
			var y = lineHeight * Text.V_OFFSETS[this.textBaseline||"top"];
			return this._rectangle.initialize(x, y, w, o.height);
		};
	
		/**
		 * Returns a clone of the Text instance.
		 * @method clone
		 * @return {Text} a clone of the Text instance.
		 **/
		p.clone = function() {
			var o = new Text(this.text, this.font, this.color);
			this.cloneProps(o);
			return o;
		};
	
		/**
		 * Returns a string representation of this object.
		 * @method toString
		 * @return {String} a string representation of the instance.
		 **/
		p.toString = function() {
			return "[Text (text="+  (this.text.length > 20 ? this.text.substr(0, 17)+"..." : this.text) +")]";
		};
	
	// private methods:
	
		/**
		 * @property DisplayObject_cloneProps
		 * @private
		 * @type Function
		 **/
		p.DisplayObject_cloneProps = p.cloneProps;
	
		/**
		 * @method cloneProps
		 * @param {Text} o
		 * @protected
		 **/
		p.cloneProps = function(o) {
			this.DisplayObject_cloneProps(o);
			o.textAlign = this.textAlign;
			o.textBaseline = this.textBaseline;
			o.maxWidth = this.maxWidth;
			o.outline = this.outline;
			o.lineHeight = this.lineHeight;
			o.lineWidth = this.lineWidth;
		};
	
		/**
		 * @method _getWorkingContext
		 * @param {CanvasRenderingContext2D} ctx
		 * @return {CanvasRenderingContext2D}
		 * @protected
		 **/
		p._prepContext = function(ctx) {
			ctx.font = this.font;
			ctx.textAlign = this.textAlign||"left";
			ctx.textBaseline = this.textBaseline||"top";
			return ctx;
		};
	
		/**
		 * Draws multiline text.
		 * @method _drawText
		 * @param {CanvasRenderingContext2D} ctx
		 * @param {Object} o
		 * @return {Object}
		 * @protected
		 **/
		p._drawText = function(ctx, o) {
			var paint = !!ctx;
			if (!paint) { ctx = this._prepContext(Text._workingContext); }
			var lineHeight = this.lineHeight||this.getMeasuredLineHeight();
			
			var maxW = 0, count = 0;
			var lines = String(this.text).split(/(?:\r\n|\r|\n)/);
			for (var i=0, l=lines.length; i<l; i++) {
				var str = lines[i];
				var w = null;
				
				if (this.lineWidth != null && (w = ctx.measureText(str).width) > this.lineWidth) {
					// text wrapping:
					var words = str.split(/(\s)/);
					str = words[0];
					w = ctx.measureText(str).width;
					
					for (var j=1, jl=words.length; j<jl; j+=2) {
						// Line needs to wrap:
						var wordW = ctx.measureText(words[j] + words[j+1]).width;
						if (w + wordW > this.lineWidth) {
							if (paint) { this._drawTextLine(ctx, str, count*lineHeight); }
							if (w > maxW) { maxW = w; }
							str = words[j+1];
							w = ctx.measureText(str).width;
							count++;
						} else {
							str += words[j] + words[j+1];
							w += wordW;
						}
					}
				}
				
				if (paint) { this._drawTextLine(ctx, str, count*lineHeight); }
				if (o && w == null) { w = ctx.measureText(str).width; }
				if (w > maxW) { maxW = w; }
				count++;
			}
			
			if (o) {
				o.count = count;
				o.width = maxW;
				o.height = count*lineHeight;
			}
			return o;
		};
	
		/**
		 * @method _drawTextLine
		 * @param {CanvasRenderingContext2D} ctx
		 * @param {String} text
		 * @param {Number} y
		 * @protected
		 **/
		p._drawTextLine = function(ctx, text, y) {
			// Chrome 17 will fail to draw the text if the last param is included but null, so we feed it a large value instead:
				if (this.outline) { ctx.strokeText(text, 0, y, this.maxWidth||0xFFFF); }
				else { ctx.fillText(text, 0, y, this.maxWidth||0xFFFF); }
	
		};
	
	createjs.Text = Text;
	}());


/***/ },
/* 58 */
/***/ function(module, exports) {

	/*
	* MouseEvent
	* Visit http://createjs.com/ for documentation, updates and examples.
	*
	* Copyright (c) 2010 gskinner.com, inc.
	*
	* Permission is hereby granted, free of charge, to any person
	* obtaining a copy of this software and associated documentation
	* files (the "Software"), to deal in the Software without
	* restriction, including without limitation the rights to use,
	* copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the
	* Software is furnished to do so, subject to the following
	* conditions:
	*
	* The above copyright notice and this permission notice shall be
	* included in all copies or substantial portions of the Software.
	*
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	* OTHER DEALINGS IN THE SOFTWARE.
	*/
	
	/**
	 * @module EaselJS
	 */
	
	// namespace:
	this.createjs = this.createjs||{};
	
	(function() {
		"use strict";
	
	// TODO: deprecated. @uses EventDispatcher
	/**
	 * This is passed as the parameter to all mouse/pointer/touch related events on {{#crossLink "DisplayObject"}}{{/crossLink}}
	 * instances.
	 * @class MouseEvent
	 * @param {String} type The event type.
	 * @param {Boolean} bubbles Indicates whether the event will bubble through the display list.
	 * @param {Boolean} cancelable Indicates whether the default behaviour of this event can be cancelled.
	 * @param {Number} stageX The normalized x position relative to the stage.
	 * @param {Number} stageY The normalized y position relative to the stage.
	 * @param {MouseEvent} nativeEvent The native DOM event related to this mouse event.
	 * @param {Number} pointerID The unique id for the pointer.
	 * @param {Boolean} primary Indicates whether this is the primary pointer in a multitouch environment.
	 * @param {Number} rawX The raw x position relative to the stage.
	 * @param {Number} rawY The raw y position relative to the stage.
	 * @extends Event
	 * @uses EventDispatcher
	 * @constructor
	 **/
	var MouseEvent = function(type, bubbles, cancelable, stageX, stageY, nativeEvent, pointerID, primary, rawX, rawY) {
		this.initialize(type, bubbles, cancelable, stageX, stageY, nativeEvent, pointerID, primary, rawX, rawY);
	};
	var p = MouseEvent.prototype = new createjs.Event();
	
	// events:
	
		/**
		 * For MouseEvent objects of type "mousedown", mousemove events will be dispatched from the event object until the
		 * user releases the mouse anywhere. This enables you to listen to mouse move interactions for the duration of a
		 * press, which can be very useful for operations such as drag and drop.
		 *
		 * See the {{#crossLink "MouseEvent"}}{{/crossLink}} class for a listing of event properties.
		 * @event mousemove
		 * @since 0.6.0
		 * @deprecated In favour of the DisplayObject "pressmove" event.
		 */
	
		/**
		 * For MouseEvent objects of type "mousedown", a mouseup event will be dispatched from the event object when the
		 * user releases the mouse anywhere. This enables you to listen for a corresponding mouse up from a specific press,
		 * which can be very useful for operations such as drag and drop.
		 *
		 * See the {{#crossLink "MouseEvent"}}{{/crossLink}} class for a listing of event properties.
		 * @event mouseup
		 * @since 0.6.0
		 * @deprecated In favour of the DisplayObject "pressup" event.
		 */
	
	// public properties:
	
		/**
		 * The normalized x position on the stage. This will always be within the range 0 to stage width.
		 * @property stageX
		 * @type Number
		*/
		p.stageX = 0;
	
		/**
		 * The normalized y position on the stage. This will always be within the range 0 to stage height.
		 * @property stageY
		 * @type Number
		 **/
		p.stageY = 0;
	
		/**
		 * The raw x position relative to the stage. Normally this will be the same as the stageX value, unless
		 * stage.mouseMoveOutside is true and the pointer is outside of the stage bounds.
		 * @property rawX
		 * @type Number
		*/
		p.rawX = 0;
	
		/**
		 * The raw y position relative to the stage. Normally this will be the same as the stageY value, unless
		 * stage.mouseMoveOutside is true and the pointer is outside of the stage bounds.
		 * @property rawY
		 * @type Number
		*/
		p.rawY = 0;
	
		/**
		 * The native MouseEvent generated by the browser. The properties and API for this
		 * event may differ between browsers. This property will be null if the
		 * EaselJS property was not directly generated from a native MouseEvent.
		 * @property nativeEvent
		 * @type MouseEvent
		 * @default null
		 **/
		p.nativeEvent = null;
	
		// TODO: deprecated:
		/**
		 * REMOVED. Use the {{#crossLink "DisplayObject"}}{{/crossLink}} {{#crossLink "DisplayObject/pressmove:event"}}{{/crossLink}}
		 * event.
		 * @property onMouseMove
		 * @type Function
		 * @deprecated Use the DisplayObject "pressmove" event.
		 */
		/**
		 * REMOVED. Use the {{#crossLink "DisplayObject"}}{{/crossLink}} {{#crossLink "DisplayObject/pressup:event"}}{{/crossLink}}
		 * event.
		 * @property onMouseUp
		 * @type Function
		 * @deprecated Use the DisplayObject "pressup" event.
		 */
	
		/**
		 * The unique id for the pointer (touch point or cursor). This will be either -1 for the mouse, or the system
		 * supplied id value.
		 * @property pointerID
		 * @type {Number}
		 */
		p.pointerID = 0;
	
		/**
		 * Indicates whether this is the primary pointer in a multitouch environment. This will always be true for the mouse.
		 * For touch pointers, the first pointer in the current stack will be considered the primary pointer.
		 * @property primary
		 * @type {Boolean}
		 */
		p.primary = false;
	
	// mix-ins:
		// EventDispatcher methods:
		// TODO: deprecated:
		p.addEventListener = null;
		p.removeEventListener = null;
		p.removeAllEventListeners = null;
		p.dispatchEvent = null;
		p.hasEventListener = null;
		p._listeners = null;
		createjs.EventDispatcher.initialize(p); // inject EventDispatcher methods.
	
	// constructor:
		/**
		 * @property Event_initialize
		 * @private
		 * @type Function
		 **/
		p.Event_initialize = p.initialize;
	
		/**
		 * Initialization method.
		 * @method initialize
		 * @param {String} type The event type.
		 * @param {Boolean} bubbles Indicates whether the event will bubble through the display list.
		 * @param {Boolean} cancelable Indicates whether the default behaviour of this event can be cancelled.
		 * @param {Number} stageX The normalized x position relative to the stage.
		 * @param {Number} stageY The normalized y position relative to the stage.
		 * @param {MouseEvent} nativeEvent The native DOM event related to this mouse event.
		 * @param {Number} pointerID The unique id for the pointer.
		 * @param {Boolean} primary Indicates whether this is the primary pointer in a multitouch environment.
		 * @param {Number} rawX The raw x position relative to the stage.
		 * @param {Number} rawY The raw y position relative to the stage.
		 * @protected
		 **/
		p.initialize = function(type, bubbles, cancelable, stageX, stageY, nativeEvent, pointerID, primary, rawX, rawY) {
			this.Event_initialize(type, bubbles, cancelable);
			this.stageX = stageX;
			this.stageY = stageY;
			this.nativeEvent = nativeEvent;
			this.pointerID = pointerID;
			this.primary = primary;
			this.rawX = (rawX==null)?stageX:rawX;
			this.rawY = (rawY==null)?stageY:rawY;
		};
	
	// public methods:
		/**
		 * Returns a clone of the MouseEvent instance.
		 * @method clone
		 * @return {MouseEvent} a clone of the MouseEvent instance.
		 **/
		p.clone = function() {
			return new MouseEvent(this.type, this.bubbles, this.cancelable, this.stageX, this.stageY, this.target, this.nativeEvent, this.pointerID, this.primary, this.rawX, this.rawY);
		};
	
		/**
		 * Returns a string representation of this object.
		 * @method toString
		 * @return {String} a string representation of the instance.
		 **/
		p.toString = function() {
			return "[MouseEvent (type="+this.type+" stageX="+this.stageX+" stageY="+this.stageY+")]";
		};
	
	createjs.MouseEvent = MouseEvent;
	}());


/***/ },
/* 59 */
/***/ function(module, exports) {

	/*
	 * AlphaMapFilter
	 * Visit http://createjs.com/ for documentation, updates and examples.
	 *
	 * Copyright (c) 2010 gskinner.com, inc.
	 *
	 * Permission is hereby granted, free of charge, to any person
	 * obtaining a copy of this software and associated documentation
	 * files (the "Software"), to deal in the Software without
	 * restriction, including without limitation the rights to use,
	 * copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the
	 * Software is furnished to do so, subject to the following
	 * conditions:
	 *
	 * The above copyright notice and this permission notice shall be
	 * included in all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	 * OTHER DEALINGS IN THE SOFTWARE.
	 */
	
	/**
	 * @module EaselJS
	 */
	
	// namespace:
	this.createjs = this.createjs || {};
	
	(function () {
		"use strict";
		/**
		 * Applies a greyscale alpha map image (or canvas) to the target, such that the alpha channel of the result will
		 * be copied from the red channel of the map, and the RGB channels will be copied from the target.
		 *
		 * Generally, it is recommended that you use {{#crossLink "AlphaMaskFilter"}}{{/crossLink}}, because it has much
		 * better performance.
		 *
		 * <h4>Example</h4>
		 * This example draws a red->blue box, caches it, and then uses the cache canvas as an alpha map on a 100x100 image.
		 *
		 *       var box = new createjs.Shape();
		 *       box.graphics.beginLinearGradientFill(["#ff0000", "#0000ff"], [0, 1], 0, 0, 0, 100)
		 *       box.graphics.drawRect(0, 0, 100, 100);
		 *       box.cache(0, 0, 100, 100);
		 *
		 *       var bmp = new createjs.Bitmap("path/to/image.jpg");
		 *       bmp.filters = [
		 *           new createjs.AlphaMapFilter(box.cacheCanvas)
		 *       ];
		 *       bmp.cache(0, 0, 100, 100);
		 *       stage.addChild(bmp);
		 *
		 * See {{#crossLink "Filter"}}{{/crossLink}} for more information on applying filters.
		 * @class AlphaMapFilter
		 * @extends Filter
		 * @constructor
		 * @param {Image|HTMLCanvasElement} alphaMap The greyscale image (or canvas) to use as the alpha value for the
		 * result. This should be exactly the same dimensions as the target.
		 **/
		var AlphaMapFilter = function (alphaMap) {
			this.initialize(alphaMap);
		};
		var p = AlphaMapFilter.prototype = new createjs.Filter();
	
	// constructor:
		/** @ignore */
		p.initialize = function (alphaMap) {
			this.alphaMap = alphaMap;
		};
	
	// public properties:
	
		/**
		 * The greyscale image (or canvas) to use as the alpha value for the result. This should be exactly the same
		 * dimensions as the target.
		 * @property alphaMap
		 * @type Image|HTMLCanvasElement
		 **/
		p.alphaMap = null;
	
	// private properties:
		p._alphaMap = null;
		p._mapData = null;
	
	// public methods:
	
		p.applyFilter = function (ctx, x, y, width, height, targetCtx, targetX, targetY) {
			if (!this.alphaMap) {
				return true;
			}
			if (!this._prepAlphaMap()) {
				return false;
			}
			targetCtx = targetCtx || ctx;
			if (targetX == null) {
				targetX = x;
			}
			if (targetY == null) {
				targetY = y;
			}
	
			try {
				var imageData = ctx.getImageData(x, y, width, height);
			} catch (e) {
				//if (!this.suppressCrossDomainErrors) throw new Error("unable to access local image data: " + e);
				return false;
			}
			var data = imageData.data;
			var map = this._mapData;
			var l = data.length;
			for(var i = 0; i < l; i += 4) {
				data[i + 3] = map[i] || 0;
			}
			imageData.data = data;
			targetCtx.putImageData(imageData, targetX, targetY);
			return true;
		};
	
		/**
		 * Returns a clone of this object.
		 * @return {AlphaMapFilter} A clone of the current AlphaMapFilter instance.
		 **/
		p.clone = function () {
			return new AlphaMapFilter(this.alphaMap);
		};
	
		p.toString = function () {
			return "[AlphaMapFilter]";
		};
	
	// private methods:
		p._prepAlphaMap = function () {
			if (!this.alphaMap) {
				return false;
			}
			if (this.alphaMap == this._alphaMap && this._mapData) {
				return true;
			}
	
			this._mapData = null;
			var map = this._alphaMap = this.alphaMap;
			var canvas = map;
			var ctx;
			if (map instanceof HTMLCanvasElement) {
				ctx = canvas.getContext("2d");
			} else {
				canvas = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
				canvas.width = map.width;
				canvas.height = map.height;
				ctx = canvas.getContext("2d");
				ctx.drawImage(map, 0, 0);
			}
	
			try {
				var imgData = ctx.getImageData(0, 0, map.width, map.height);
			} catch (e) {
				//if (!this.suppressCrossDomainErrors) throw new Error("unable to access local image data: " + e);
				return false;
			}
			this._mapData = imgData.data;
			return true;
		};
	
		createjs.AlphaMapFilter = AlphaMapFilter;
	
	}());


/***/ },
/* 60 */
/***/ function(module, exports) {

	/*
	 * AlphaMaskFilter
	 * Visit http://createjs.com/ for documentation, updates and examples.
	 *
	 * Copyright (c) 2010 gskinner.com, inc.
	 *
	 * Permission is hereby granted, free of charge, to any person
	 * obtaining a copy of this software and associated documentation
	 * files (the "Software"), to deal in the Software without
	 * restriction, including without limitation the rights to use,
	 * copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the
	 * Software is furnished to do so, subject to the following
	 * conditions:
	 *
	 * The above copyright notice and this permission notice shall be
	 * included in all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	 * OTHER DEALINGS IN THE SOFTWARE.
	 */
	
	/**
	 * @module EaselJS
	 */
	
	// namespace:
	this.createjs = this.createjs || {};
	
	(function () {
		"use strict";
	
		/**
		 * Applies the alpha from the mask image (or canvas) to the target, such that the alpha channel of the result will
		 * be derived from the mask, and the RGB channels will be copied from the target. This can be used, for example, to
		 * apply an alpha mask to a display object. This can also be used to combine a JPG compressed RGB image with a PNG32
		 * alpha mask, which can result in a much smaller file size than a single PNG32 containing ARGB.
		 *
		 * <b>IMPORTANT NOTE: This filter currently does not support the targetCtx, or targetX/Y parameters correctly.</b>
		 *
		 * <h4>Example</h4>
		 * This example draws a gradient box, then caches it and uses the "cacheCanvas" as the alpha mask on a 100x100 image.
		 *
		 *      var box = new createjs.Shape();
		 *      box.graphics.beginLinearGradientFill(["#000000", "rgba(0, 0, 0, 0)"], [0, 1], 0, 0, 100, 100)
		 *      box.graphics.drawRect(0, 0, 100, 100);
		 *      box.cache(0, 0, 100, 100);
		 *
		 *      var bmp = new createjs.Bitmap("path/to/image.jpg");
		 *      bmp.filters = [
		 *          new createjs.AlphaMaskFilter(box.cacheCanvas)
		 *      ];
		 *      bmp.cache(0, 0, 100, 100);
		 *
		 * See {{#crossLink "Filter"}}{{/crossLink}} for more information on applying filters.
		 * @class AlphaMaskFilter
		 * @extends Filter
		 * @constructor
		 * @param {Image} mask
		 **/
		var AlphaMaskFilter = function (mask) {
			this.initialize(mask);
		}
		var p = AlphaMaskFilter.prototype = new createjs.Filter();
	
	// constructor:
		/** @ignore */
		p.initialize = function (mask) {
			this.mask = mask;
		}
	
	// public properties:
	
		/**
		 * The image (or canvas) to use as the mask.
		 * @property mask
		 * @type Image
		 **/
		p.mask = null;
	
	// public methods:
	
		/**
		 * Applies the filter to the specified context.
		 *
		 * <strong>IMPORTANT NOTE: This filter currently does not support the targetCtx, or targetX/Y parameters
		 * correctly.</strong>
		 * @method applyFilter
		 * @param {CanvasRenderingContext2D} ctx The 2D context to use as the source.
		 * @param {Number} x The x position to use for the source rect.
		 * @param {Number} y The y position to use for the source rect.
		 * @param {Number} width The width to use for the source rect.
		 * @param {Number} height The height to use for the source rect.
		 * @param {CanvasRenderingContext2D} [targetCtx] The 2D context to draw the result to. Defaults to the context passed to ctx.
		 * @param {Number} [targetX] The x position to draw the result to. Defaults to the value passed to x.
		 * @param {Number} [targetY] The y position to draw the result to. Defaults to the value passed to y.
		 * @return {Boolean} If the filter was applied successfully.
		 **/
		p.applyFilter = function (ctx, x, y, width, height, targetCtx, targetX, targetY) {
			if (!this.mask) {
				return true;
			}
			targetCtx = targetCtx || ctx;
			if (targetX == null) {
				targetX = x;
			}
			if (targetY == null) {
				targetY = y;
			}
	
			targetCtx.save();
			if (ctx != targetCtx) {
				// TODO: support targetCtx and targetX/Y
				// clearRect, then draw the ctx in?
			}
	
			targetCtx.globalCompositeOperation = "destination-in";
			targetCtx.drawImage(this.mask, targetX, targetY);
			targetCtx.restore();
			return true;
		}
	
		/**
		 * Returns a clone of this object.
		 * @return {AlphaMaskFilter}
		 **/
		p.clone = function () {
			return new AlphaMaskFilter(this.mask);
		}
	
		p.toString = function () {
			return "[AlphaMaskFilter]";
		}
	
	// private methods:
	
	
		createjs.AlphaMaskFilter = AlphaMaskFilter;
	}());


/***/ },
/* 61 */
/***/ function(module, exports) {

	/*
	* BlurFilter
	* Visit http://createjs.com/ for documentation, updates and examples.
	*
	* Copyright (c) 2010 gskinner.com, inc.
	*
	* Permission is hereby granted, free of charge, to any person
	* obtaining a copy of this software and associated documentation
	* files (the "Software"), to deal in the Software without
	* restriction, including without limitation the rights to use,
	* copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the
	* Software is furnished to do so, subject to the following
	* conditions:
	*
	* The above copyright notice and this permission notice shall be
	* included in all copies or substantial portions of the Software.
	*
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	* OTHER DEALINGS IN THE SOFTWARE.
	*/
	
	/**
	 * @module EaselJS
	 */
	
	// namespace:
	this.createjs = this.createjs||{};
	
	(function() {
		"use strict";
	
	/**
	 * Applies a box blur to DisplayObjects. Note that this filter is fairly CPU intensive, particularly if the quality is
	 * set higher than 1.
	 *
	 * <h4>Example</h4>
	 * This example creates a red circle, and then applies a 5 pixel blur to it. It uses the {{#crossLink "Filter/getBounds"}}{{/crossLink}}
	 * method to account for the spread that the blur causes.
	 *
	 *      var shape = new createjs.Shape().set({x:100,y:100});
	 *      shape.graphics.beginFill("#ff0000").drawCircle(0,0,50);
	 *
	 *      var blurFilter = new createjs.BlurFilter(5, 5, 1);
	 *      shape.filters = [blurFilter];
	 *      var bounds = blurFilter.getBounds();
	 *
	 *      shape.cache(-50+bounds.x, -50+bounds.y, 100+bounds.width, 100+bounds.height);
	 *
	 * See {{#crossLink "Filter"}}{{/crossLink}} for an more information on applying filters.
	 * @class BlurFilter
	 * @extends Filter
	 * @constructor
	 * @param {Number} [blurX=0] The horizontal blur radius in pixels.
	 * @param {Number} [blurY=0] The vertical blur radius in pixels.
	 * @param {Number} [quality=1] The number of blur iterations.
	 **/
	var BlurFilter = function( blurX, blurY, quality ) {
	  this.initialize( blurX, blurY, quality );
	};
	var p = BlurFilter.prototype = new createjs.Filter();
	
	// constructor:
		/** @ignore */
		p.initialize = function( blurX, blurY, quality ) {
			if ( isNaN(blurX) || blurX < 0 ) blurX = 0;
			this.blurX = blurX | 0;
			if ( isNaN(blurY) || blurY < 0 ) blurY = 0;
			this.blurY = blurY | 0;
			if ( isNaN(quality) || quality < 1  ) quality = 1;
			this.quality = quality | 0;
		};
	
	// public properties:
	
		/**
		 * Horizontal blur radius in pixels
		 * @property blurX
		 * @default 0
		 * @type Number
		 **/
		p.blurX = 0;
	
		/**
		 * Vertical blur radius in pixels
		 * @property blurY
		 * @default 0
		 * @type Number
		 **/
		p.blurY = 0;
	
		/**
		 * Number of blur iterations. For example, a value of 1 will produce a rough blur. A value of 2 will produce a
		 * smoother blur, but take twice as long to run.
		 * @property quality
		 * @default 1
		 * @type Number
		 **/
		p.quality = 1;
		
		//TODO: There might be a better better way to place these two lookup tables:
		p.mul_table = [ 1,171,205,293,57,373,79,137,241,27,391,357,41,19,283,265,497,469,443,421,25,191,365,349,335,161,155,149,9,278,269,261,505,245,475,231,449,437,213,415,405,395,193,377,369,361,353,345,169,331,325,319,313,307,301,37,145,285,281,69,271,267,263,259,509,501,493,243,479,118,465,459,113,446,55,435,429,423,209,413,51,403,199,393,97,3,379,375,371,367,363,359,355,351,347,43,85,337,333,165,327,323,5,317,157,311,77,305,303,75,297,294,73,289,287,71,141,279,277,275,68,135,67,133,33,262,260,129,511,507,503,499,495,491,61,121,481,477,237,235,467,232,115,457,227,451,7,445,221,439,218,433,215,427,425,211,419,417,207,411,409,203,202,401,399,396,197,49,389,387,385,383,95,189,47,187,93,185,23,183,91,181,45,179,89,177,11,175,87,173,345,343,341,339,337,21,167,83,331,329,327,163,81,323,321,319,159,79,315,313,39,155,309,307,153,305,303,151,75,299,149,37,295,147,73,291,145,289,287,143,285,71,141,281,35,279,139,69,275,137,273,17,271,135,269,267,133,265,33,263,131,261,130,259,129,257,1];
	        
	   
		p.shg_table = [0,9,10,11,9,12,10,11,12,9,13,13,10,9,13,13,14,14,14,14,10,13,14,14,14,13,13,13,9,14,14,14,15,14,15,14,15,15,14,15,15,15,14,15,15,15,15,15,14,15,15,15,15,15,15,12,14,15,15,13,15,15,15,15,16,16,16,15,16,14,16,16,14,16,13,16,16,16,15,16,13,16,15,16,14,9,16,16,16,16,16,16,16,16,16,13,14,16,16,15,16,16,10,16,15,16,14,16,16,14,16,16,14,16,16,14,15,16,16,16,14,15,14,15,13,16,16,15,17,17,17,17,17,17,14,15,17,17,16,16,17,16,15,17,16,17,11,17,16,17,16,17,16,17,17,16,17,17,16,17,17,16,16,17,17,17,16,14,17,17,17,17,15,16,14,16,15,16,13,16,15,16,14,16,15,16,12,16,15,16,17,17,17,17,17,13,16,15,17,17,17,16,15,17,17,17,16,15,17,17,14,16,17,17,16,17,17,16,15,17,16,14,17,16,15,17,16,17,17,16,17,15,16,17,14,17,16,15,17,16,17,13,17,16,17,17,16,17,14,17,16,17,16,17,16,17,9];
	
	// public methods:
		/** docced in super class **/
		p.getBounds = function() {
			var q = Math.pow(this.quality, 0.6)*0.5;
			return new createjs.Rectangle(-this.blurX*q,-this.blurY*q,2*this.blurX*q,2*this.blurY*q);
		};
	
		p.applyFilter = function(ctx, x, y, width, height, targetCtx, targetX, targetY) {
			targetCtx = targetCtx || ctx;
			if (targetX == null) { targetX = x; }
			if (targetY == null) { targetY = y; }
			try {
				var imageData = ctx.getImageData(x, y, width, height);
			} catch(e) {
				//if (!this.suppressCrossDomainErrors) throw new Error("unable to access local image data: " + e);
				return false;
			}
	
			var radiusX = this.blurX/2;
			if ( isNaN(radiusX) || radiusX < 0 ) return false;
			radiusX |= 0;
	
			var radiusY = this.blurY/2;
			if ( isNaN(radiusY) || radiusY < 0 ) return false;
			radiusY |= 0;
	
			if ( radiusX == 0 && radiusY == 0 ) return false;
	
			var iterations = this.quality;
			if ( isNaN(iterations) || iterations < 1  ) iterations = 1;
			iterations |= 0;
			if ( iterations > 3 ) iterations = 3;
			if ( iterations < 1 ) iterations = 1;
	
			var pixels = imageData.data;
	
			var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, a_sum, 
			r_out_sum, g_out_sum, b_out_sum, a_out_sum,
			r_in_sum, g_in_sum, b_in_sum, a_in_sum, 
			pr, pg, pb, pa, rbs;
	
			var divx = radiusX + radiusX + 1;
			var divy = radiusY + radiusY + 1;
			var w4 = width << 2;
			var widthMinus1  = width - 1;
			var heightMinus1 = height - 1;
			var rxp1  = radiusX + 1;
			var ryp1  = radiusY + 1;
			var stackStartX = {r:0,b:0,g:0,a:0,next:null};
			var stackx = stackStartX;
			for ( i = 1; i < divx; i++ )
			{
				stackx = stackx.next = {r:0,b:0,g:0,a:0,next:null};
				if ( i == rxp1 ) var stackEndX = stackx;
			}
			stackx.next = stackStartX;
			
			var stackStartY = {r:0,b:0,g:0,a:0,next:null};
			var stacky = stackStartY;
			for ( i = 1; i < divy; i++ )
			{
				stacky = stacky.next = {r:0,b:0,g:0,a:0,next:null};
				if ( i == ryp1 ) var stackEndY = stacky;
			}
			stacky.next = stackStartY;
			
			var stackIn = null;
	
	
	
			
			while ( iterations-- > 0 ) {
				yw = yi = 0;
				var mul_sum = this.mul_table[radiusX];
				var shg_sum = this.shg_table[radiusX];
				for ( y = height; --y > -1; )
				{
					r_sum = rxp1 * ( pr = pixels[yi] );
					g_sum = rxp1 * ( pg = pixels[yi+1] );
					b_sum = rxp1 * ( pb = pixels[yi+2] );
					a_sum = rxp1 * ( pa = pixels[yi+3] );
	
					stackx = stackStartX;
	
					for( i = rxp1; --i > -1; )
					{
						stackx.r = pr;
						stackx.g = pg;
						stackx.b = pb;
						stackx.a = pa;
						stackx = stackx.next;
					}
	
					for( i = 1; i < rxp1; i++ )
					{
						p = yi + (( widthMinus1 < i ? widthMinus1 : i ) << 2 );
						r_sum += ( stackx.r = pixels[p]);
						g_sum += ( stackx.g = pixels[p+1]);
						b_sum += ( stackx.b = pixels[p+2]);
						a_sum += ( stackx.a = pixels[p+3]);
	
						stackx = stackx.next;
					}
	
					stackIn = stackStartX;
					for ( x = 0; x < width; x++ )
					{
						pixels[yi++] = (r_sum * mul_sum) >>> shg_sum;
						pixels[yi++] = (g_sum * mul_sum) >>> shg_sum;
						pixels[yi++] = (b_sum * mul_sum) >>> shg_sum;
						pixels[yi++] = (a_sum * mul_sum) >>> shg_sum;
	
						p =  ( yw + ( ( p = x + radiusX + 1 ) < widthMinus1 ? p : widthMinus1 ) ) << 2;
	
						r_sum -= stackIn.r - ( stackIn.r = pixels[p]);
						g_sum -= stackIn.g - ( stackIn.g = pixels[p+1]);
						b_sum -= stackIn.b - ( stackIn.b = pixels[p+2]);
						a_sum -= stackIn.a - ( stackIn.a = pixels[p+3]);
	
						stackIn = stackIn.next;
	
					}
					yw += width;
				}
	
				mul_sum = this.mul_table[radiusY];
				shg_sum = this.shg_table[radiusY];
				for ( x = 0; x < width; x++ )
				{
					yi = x << 2;
	
					r_sum = ryp1 * ( pr = pixels[yi]);
					g_sum = ryp1 * ( pg = pixels[yi+1]);
					b_sum = ryp1 * ( pb = pixels[yi+2]);
					a_sum = ryp1 * ( pa = pixels[yi+3]);
	
					stacky = stackStartY;
	
					for( i = 0; i < ryp1; i++ )
					{
						stacky.r = pr;
						stacky.g = pg;
						stacky.b = pb;
						stacky.a = pa;
						stacky = stacky.next;
					}
	
					yp = width;
	
					for( i = 1; i <= radiusY; i++ )
					{
						yi = ( yp + x ) << 2;
	
						r_sum += ( stacky.r = pixels[yi]);
						g_sum += ( stacky.g = pixels[yi+1]);
						b_sum += ( stacky.b = pixels[yi+2]);
						a_sum += ( stacky.a = pixels[yi+3]);
	
						stacky = stacky.next;
	
						if( i < heightMinus1 )
						{
							yp += width;
						}
					}
	
					yi = x;
					stackIn = stackStartY;
					if ( iterations > 0 )
					{
						for ( y = 0; y < height; y++ )
						{
							p = yi << 2;
							pixels[p+3] = pa =(a_sum * mul_sum) >>> shg_sum;
							if ( pa > 0 )
							{
								pixels[p]   = ((r_sum * mul_sum) >>> shg_sum ); 
								pixels[p+1] = ((g_sum * mul_sum) >>> shg_sum );
								pixels[p+2] = ((b_sum * mul_sum) >>> shg_sum );
							} else {
								pixels[p] = pixels[p+1] = pixels[p+2] = 0
							}
	
							p = ( x + (( ( p = y + ryp1) < heightMinus1 ? p : heightMinus1 ) * width )) << 2;
	
							r_sum -= stackIn.r - ( stackIn.r = pixels[p]);
							g_sum -= stackIn.g - ( stackIn.g = pixels[p+1]);
							b_sum -= stackIn.b - ( stackIn.b = pixels[p+2]);
							a_sum -= stackIn.a - ( stackIn.a = pixels[p+3]);
	
							stackIn = stackIn.next;
	
							yi += width;
						}
					} else {
						for ( y = 0; y < height; y++ )
						{
							p = yi << 2;
							pixels[p+3] = pa =(a_sum * mul_sum) >>> shg_sum;
							if ( pa > 0 )
							{
								pa = 255 / pa;
								pixels[p]   = ((r_sum * mul_sum) >>> shg_sum ) * pa; 
								pixels[p+1] = ((g_sum * mul_sum) >>> shg_sum ) * pa;
								pixels[p+2] = ((b_sum * mul_sum) >>> shg_sum ) * pa;
							} else {
								pixels[p] = pixels[p+1] = pixels[p+2] = 0
							}
	
							p = ( x + (( ( p = y + ryp1) < heightMinus1 ? p : heightMinus1 ) * width )) << 2;
	
							r_sum -= stackIn.r - ( stackIn.r = pixels[p]);
							g_sum -= stackIn.g - ( stackIn.g = pixels[p+1]);
							b_sum -= stackIn.b - ( stackIn.b = pixels[p+2]);
							a_sum -= stackIn.a - ( stackIn.a = pixels[p+3]);
	
							stackIn = stackIn.next;
	
							yi += width;
						}
					}
				}
			}
			targetCtx.putImageData(imageData, targetX, targetY);
			return true;
		};
	
		/**
		 * Returns a clone of this object.
		 * @return {BlurFilter}
		 **/
		p.clone = function() {
			return new BlurFilter(this.blurX, this.blurY, this.quality);
		};
	
		p.toString = function() {
			return "[BlurFilter]";
		};
	
		createjs.BlurFilter = BlurFilter;
	
	}());


/***/ },
/* 62 */
/***/ function(module, exports) {

	/*
	* ColorFilter
	* Visit http://createjs.com/ for documentation, updates and examples.
	*
	* Copyright (c) 2010 gskinner.com, inc.
	*
	* Permission is hereby granted, free of charge, to any person
	* obtaining a copy of this software and associated documentation
	* files (the "Software"), to deal in the Software without
	* restriction, including without limitation the rights to use,
	* copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the
	* Software is furnished to do so, subject to the following
	* conditions:
	*
	* The above copyright notice and this permission notice shall be
	* included in all copies or substantial portions of the Software.
	*
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	* OTHER DEALINGS IN THE SOFTWARE.
	*/
	
	/**
	 * @module EaselJS
	 */
	
	// namespace:
	this.createjs = this.createjs||{};
	
	(function() {
		"use strict";
	
	/**
	 * Applies a color transform to DisplayObjects.
	 *
	 * <h4>Example</h4>
	 * This example draws a red circle, and then transforms it to Blue. This is accomplished by multiplying all the channels
	 * to 0 (except alpha, which is set to 1), and then adding 255 to the blue channel.
	 *
	 *      var shape = new createjs.Shape().set({x:100,y:100});
	 *      shape.graphics.beginFill("#ff0000").drawCircle(0,0,50);
	 *
	 *      shape.filters = [
	 *          new createjs.ColorFilter(0,0,0,1, 0,0,255,0)
	 *      ];
	 *      shape.cache(-50, -50, 100, 100);
	 *
	 * See {{#crossLink "Filter"}}{{/crossLink}} for an more information on applying filters.
	 * @class ColorFilter
	 * @param {Number} [redMultiplier=1] The amount to multiply against the red channel. This is a range between 0 and 1.
	 * @param {Number} [greenMultiplier=1] The amount to multiply against the green channel. This is a range between 0 and 1.
	 * @param {Number} [blueMultiplier=1] The amount to multiply against the blue channel. This is a range between 0 and 1.
	 * @param {Number} [alphaMultiplier=1] The amount to multiply against the alpha channel. This is a range between 0 and 1.
	 * @param {Number} [redOffset=0] The amount to add to the red channel after it has been multiplied. This is a range
	 * between -255 and 255.
	 * @param {Number} [greenOffset=0] The amount to add to the green channel after it has been multiplied. This is a range
	  * between -255 and 255.
	 * @param {Number} [blueOffset=0] The amount to add to the blue channel after it has been multiplied. This is a range
	  * between -255 and 255.
	 * @param {Number} [alphaOffset=0] The amount to add to the alpha channel after it has been multiplied. This is a range
	  * between -255 and 255.
	 * @constructor
	 * @extends Filter
	 **/
	var ColorFilter = function(redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier, redOffset, greenOffset, blueOffset, alphaOffset) {
	  this.initialize(redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier, redOffset, greenOffset, blueOffset, alphaOffset);
	}
	var p = ColorFilter.prototype = new createjs.Filter();
	
	// public properties:
		/**
		 * Red channel multiplier.
		 * @property redMultiplier
		 * @type Number
		 **/
		p.redMultiplier = 1;
	
		/**
		 * Green channel multiplier.
		 * @property greenMultiplier
		 * @type Number
		 **/
		p.greenMultiplier = 1;
	
		/**
		 * Blue channel multiplier.
		 * @property blueMultiplier
		 * @type Number
		 **/
		p.blueMultiplier = 1;
	
		/**
		 * Alpha channel multiplier.
		 * @property alphaMultiplier
		 * @type Number
		 **/
		p.alphaMultiplier = 1;
	
		/**
		 * Red channel offset (added to value).
		 * @property redOffset
		 * @type Number
		 **/
		p.redOffset = 0;
	
		/**
		 * Green channel offset (added to value).
		 * @property greenOffset
		 * @type Number
		 **/
		p.greenOffset = 0;
	
		/**
		 * Blue channel offset (added to value).
		 * @property blueOffset
		 * @type Number
		 **/
		p.blueOffset = 0;
	
		/**
		 * Alpha channel offset (added to value).
		 * @property alphaOffset
		 * @type Number
		 **/
		p.alphaOffset = 0;
	
	// constructor:
		/**
		 * Initialization method.
		 * @method initialize
		 * @param {Number} [redMultiplier=1] The amount to multiply against the red channel. This is a range between 0 and 1.
		 * @param {Number} [greenMultiplier=1] The amount to multiply against the green channel. This is a range between 0 and 1.
		 * @param {Number} [blueMultiplier=1] The amount to multiply against the blue channel. This is a range between 0 and 1.
		 * @param {Number} [alphaMultiplier=1] The amount to multiply against the alpha channel. This is a range between 0 and 1.
		 * @param {Number} [redOffset=0] The amount to add to the red channel after it has been multiplied. This is a range
		 * between -255 and 255.
		 * @param {Number} [greenOffset=0] The amount to add to the green channel after it has been multiplied. This is a range
		 * between -255 and 255.
		 * @param {Number} [blueOffset=0] The amount to add to the blue channel after it has been multiplied. This is a range
		 * between -255 and 255.
		 * @param {Number} [alphaOffset=0] The amount to add to the alpha channel after it has been multiplied. This is a range
		 * between -255 and 255.
		 * @protected
		 **/
		p.initialize = function(redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier, redOffset, greenOffset, blueOffset, alphaOffset) {
			this.redMultiplier = redMultiplier != null ? redMultiplier : 1;
			this.greenMultiplier = greenMultiplier != null ? greenMultiplier : 1;
			this.blueMultiplier = blueMultiplier != null ? blueMultiplier : 1;
			this.alphaMultiplier = alphaMultiplier != null ? alphaMultiplier : 1;
			this.redOffset = redOffset || 0;
			this.greenOffset = greenOffset || 0;
			this.blueOffset = blueOffset || 0;
			this.alphaOffset = alphaOffset || 0;
		}
	
	// public methods:
		p.applyFilter = function(ctx, x, y, width, height, targetCtx, targetX, targetY) {
			targetCtx = targetCtx || ctx;
			if (targetX == null) { targetX = x; }
			if (targetY == null) { targetY = y; }
			try {
				var imageData = ctx.getImageData(x, y, width, height);
			} catch(e) {
				//if (!this.suppressCrossDomainErrors) throw new Error("unable to access local image data: " + e);
				return false;
			}
			var data = imageData.data;
			var l = data.length;
			for (var i=0; i<l; i+=4) {
				data[i] = data[i]*this.redMultiplier+this.redOffset;
				data[i+1] = data[i+1]*this.greenMultiplier+this.greenOffset;
				data[i+2] = data[i+2]*this.blueMultiplier+this.blueOffset;
				data[i+3] = data[i+3]*this.alphaMultiplier+this.alphaOffset;
			}
			targetCtx.putImageData(imageData, targetX, targetY);
			return true;
		}
	
		p.toString = function() {
			return "[ColorFilter]";
		}
	
		/**
		 * Returns a clone of this ColorFilter instance.
		 * @method clone
		 * @return {ColorFilter} A clone of the current ColorFilter instance.
		 **/
		p.clone = function() {
			return new ColorFilter(this.redMultiplier, this.greenMultiplier, this.blueMultiplier, this.alphaMultiplier, this.redOffset, this.greenOffset, this.blueOffset, this.alphaOffset);
		}
	
		createjs.ColorFilter = ColorFilter;
	
	}());


/***/ },
/* 63 */
/***/ function(module, exports) {

	/*
	* ColorMatrix
	* Visit http://createjs.com/ for documentation, updates and examples.
	*
	* Copyright (c) 2010 gskinner.com, inc.
	*
	* Permission is hereby granted, free of charge, to any person
	* obtaining a copy of this software and associated documentation
	* files (the "Software"), to deal in the Software without
	* restriction, including without limitation the rights to use,
	* copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the
	* Software is furnished to do so, subject to the following
	* conditions:
	*
	* The above copyright notice and this permission notice shall be
	* included in all copies or substantial portions of the Software.
	*
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	* OTHER DEALINGS IN THE SOFTWARE.
	*/
	
	/**
	 * @module EaselJS
	 */
	
	// namespace:
	this.createjs = this.createjs||{};
	
	(function() {
		"use strict";
	
		/**
		 * Provides helper functions for assembling a matrix for use with the {{#crossLink "ColorMatrixFilter"}}{{/crossLink}},
		 * or can be used directly as the matrix for a ColorMatrixFilter. Most methods return the instance to facilitate
		 * chained calls.
		 *
		 * <h4>Example</h4>
		 *      myColorMatrix.adjustHue(20).adjustBrightness(50);
		 *
		 * See {{#crossLink "Filter"}}{{/crossLink}} for an example of how to apply filters, or {{#crossLink "ColorMatrixFilter"}}{{/crossLink}}
		 * for an example of how to use ColorMatrix to change a DisplayObject's color.
		 * @class ColorMatrix
		 * @param {Number} brightness
		 * @param {Number} contrast
		 * @param {Number} saturation
		 * @param {Number} hue
		 * @constructor
		 * @extends Array
		 **/
		var ColorMatrix = function(brightness, contrast, saturation, hue) {
		  this.initialize(brightness, contrast, saturation, hue);
		};
		var p = ColorMatrix.prototype = [];
	
		/**
		 * Array of delta values for contrast calculations.
		 * @property DELTA_INDEX
		 * @type Array
		 * @protected
		 * @static
		 **/
		ColorMatrix.DELTA_INDEX = [
			0,    0.01, 0.02, 0.04, 0.05, 0.06, 0.07, 0.08, 0.1,  0.11,
			0.12, 0.14, 0.15, 0.16, 0.17, 0.18, 0.20, 0.21, 0.22, 0.24,
			0.25, 0.27, 0.28, 0.30, 0.32, 0.34, 0.36, 0.38, 0.40, 0.42,
			0.44, 0.46, 0.48, 0.5,  0.53, 0.56, 0.59, 0.62, 0.65, 0.68,
			0.71, 0.74, 0.77, 0.80, 0.83, 0.86, 0.89, 0.92, 0.95, 0.98,
			1.0,  1.06, 1.12, 1.18, 1.24, 1.30, 1.36, 1.42, 1.48, 1.54,
			1.60, 1.66, 1.72, 1.78, 1.84, 1.90, 1.96, 2.0,  2.12, 2.25,
			2.37, 2.50, 2.62, 2.75, 2.87, 3.0,  3.2,  3.4,  3.6,  3.8,
			4.0,  4.3,  4.7,  4.9,  5.0,  5.5,  6.0,  6.5,  6.8,  7.0,
			7.3,  7.5,  7.8,  8.0,  8.4,  8.7,  9.0,  9.4,  9.6,  9.8,
			10.0
		];
	
		/**
		 * Identity matrix values.
		 * @property IDENTITY_MATRIX
		 * @type Array
		 * @protected
		 * @static
		 **/
		ColorMatrix.IDENTITY_MATRIX = [
			1,0,0,0,0,
			0,1,0,0,0,
			0,0,1,0,0,
			0,0,0,1,0,
			0,0,0,0,1
		];
	
		/**
		 * The constant length of a color matrix.
		 * @property LENGTH
		 * @type Number
		 * @protected
		 * @static
		 **/
		ColorMatrix.LENGTH = ColorMatrix.IDENTITY_MATRIX.length;
	
	
		/**
		 * Initialization method.
		 * @method initialize
		 * @param {Number} brightness
		 * @param {Number} contrast
		 * @param {Number} saturation
		 * @param {Number} hue
		 * @protected
		 */
		p.initialize = function(brightness,contrast,saturation,hue) {
			this.reset();
			this.adjustColor(brightness,contrast,saturation,hue);
			return this;
		};
	
		/**
		 * Resets the matrix to identity values.
		 * @method reset
		 * @return {ColorMatrix} The ColorMatrix instance the method is called on (useful for chaining calls.)
		 */
		p.reset = function() {
			return this.copyMatrix(ColorMatrix.IDENTITY_MATRIX);
		};
	
		/**
		 * Shortcut method to adjust brightness, contrast, saturation and hue.
		 * Equivalent to calling adjustHue(hue), adjustContrast(contrast),
		 * adjustBrightness(brightness), adjustSaturation(saturation), in that order.
		 * @method adjustColor
		 * @param {Number} brightness
		 * @param {Number} contrast
		 * @param {Number} saturation
		 * @param {Number} hue
		 * @return {ColorMatrix} The ColorMatrix instance the method is called on (useful for chaining calls.)
		 **/
		p.adjustColor = function(brightness,contrast,saturation,hue) {
			this.adjustHue(hue);
			this.adjustContrast(contrast);
			this.adjustBrightness(brightness);
			return this.adjustSaturation(saturation);
		};
	
		/**
		 * Adjusts the brightness of pixel color by adding the specified value to the red, green and blue channels.
		 * Positive values will make the image brighter, negative values will make it darker.
		 * @method adjustBrightness
		 * @param {Number} value A value between -255 & 255 that will be added to the RGB channels.
		 * @return {ColorMatrix} The ColorMatrix instance the method is called on (useful for chaining calls.)
		 **/
		p.adjustBrightness = function(value) {
			if (value == 0 || isNaN(value)) { return this; }
			value = this._cleanValue(value,255);
			this._multiplyMatrix([
				1,0,0,0,value,
				0,1,0,0,value,
				0,0,1,0,value,
				0,0,0,1,0,
				0,0,0,0,1
			]);
			return this;
		};
	
		/**
		 * Adjusts the contrast of pixel color.
		 * Positive values will increase contrast, negative values will decrease contrast.
		 * @method adjustContrast
		 * @param {Number} value A value between -100 & 100.
		 * @return {ColorMatrix} The ColorMatrix instance the method is called on (useful for chaining calls.)
		 **/
		p.adjustContrast = function(value) {
			if (value == 0 || isNaN(value)) { return this; }
			value = this._cleanValue(value,100);
			var x;
			if (value<0) {
				x = 127+value/100*127;
			} else {
				x = value%1;
				if (x == 0) {
					x = ColorMatrix.DELTA_INDEX[value];
				} else {
					x = ColorMatrix.DELTA_INDEX[(value<<0)]*(1-x)+ColorMatrix.DELTA_INDEX[(value<<0)+1]*x; // use linear interpolation for more granularity.
				}
				x = x*127+127;
			}
			this._multiplyMatrix([
				x/127,0,0,0,0.5*(127-x),
				0,x/127,0,0,0.5*(127-x),
				0,0,x/127,0,0.5*(127-x),
				0,0,0,1,0,
				0,0,0,0,1
			]);
			return this;
		};
	
		/**
		 * Adjusts the color saturation of the pixel.
		 * Positive values will increase saturation, negative values will decrease saturation (trend towards greyscale).
		 * @method adjustSaturation
		 * @param {Number} value A value between -100 & 100.
		 * @return {ColorMatrix} The ColorMatrix instance the method is called on (useful for chaining calls.)
		 **/
		p.adjustSaturation = function(value) {
			if (value == 0 || isNaN(value)) { return this; }
			value = this._cleanValue(value,100);
			var x = 1+((value > 0) ? 3*value/100 : value/100);
			var lumR = 0.3086;
			var lumG = 0.6094;
			var lumB = 0.0820;
			this._multiplyMatrix([
				lumR*(1-x)+x,lumG*(1-x),lumB*(1-x),0,0,
				lumR*(1-x),lumG*(1-x)+x,lumB*(1-x),0,0,
				lumR*(1-x),lumG*(1-x),lumB*(1-x)+x,0,0,
				0,0,0,1,0,
				0,0,0,0,1
			]);
			return this;
		};
	
	
		/**
		 * Adjusts the hue of the pixel color.
		 * @method adjustHue
		 * @param {Number} value A value between -180 & 180.
		 * @return {ColorMatrix} The ColorMatrix instance the method is called on (useful for chaining calls.)
		 **/
		p.adjustHue = function(value) {
			if (value == 0 || isNaN(value)) { return this; }
			value = this._cleanValue(value,180)/180*Math.PI;
			var cosVal = Math.cos(value);
			var sinVal = Math.sin(value);
			var lumR = 0.213;
			var lumG = 0.715;
			var lumB = 0.072;
			this._multiplyMatrix([
				lumR+cosVal*(1-lumR)+sinVal*(-lumR),lumG+cosVal*(-lumG)+sinVal*(-lumG),lumB+cosVal*(-lumB)+sinVal*(1-lumB),0,0,
				lumR+cosVal*(-lumR)+sinVal*(0.143),lumG+cosVal*(1-lumG)+sinVal*(0.140),lumB+cosVal*(-lumB)+sinVal*(-0.283),0,0,
				lumR+cosVal*(-lumR)+sinVal*(-(1-lumR)),lumG+cosVal*(-lumG)+sinVal*(lumG),lumB+cosVal*(1-lumB)+sinVal*(lumB),0,0,
				0,0,0,1,0,
				0,0,0,0,1
			]);
			return this;
		};
	
		/**
		 * Concatenates (multiplies) the specified matrix with this one.
		 * @method concat
		 * @param {Array} matrix An array or ColorMatrix instance.
		 * @return {ColorMatrix} The ColorMatrix instance the method is called on (useful for chaining calls.)
		 **/
		p.concat = function(matrix) {
			matrix = this._fixMatrix(matrix);
			if (matrix.length != ColorMatrix.LENGTH) { return this; }
			this._multiplyMatrix(matrix);
			return this;
		};
	
		/**
		 * Returns a clone of this ColorMatrix.
		 * @method clone
		 * @return {ColorMatrix} A clone of this ColorMatrix.
		 **/
		p.clone = function() {
			return new ColorMatrix(this);
		};
	
		/**
		 * Return a length 25 (5x5) array instance containing this matrix's values.
		 * @method toArray
		 * @return {Array} An array holding this matrix's values.
		 **/
		p.toArray = function() {
			return this.slice(0,ColorMatrix.LENGTH);
		};
	
		/**
		 * Copy the specified matrix's values to this matrix.
		 * @method copyMatrix
		 * @param {Array} matrix An array or ColorMatrix instance.
		 * @return {ColorMatrix} The ColorMatrix instance the method is called on (useful for chaining calls.)
		 **/
		p.copyMatrix = function(matrix) {
			var l = ColorMatrix.LENGTH;
			for (var i=0;i<l;i++) {
				this[i] = matrix[i];
			}
			return this;
		};
	
	// private methods:
	
		/**
		 * @method _multiplyMatrix
		 * @param {Array} matrix
		 * @protected
		 **/
		p._multiplyMatrix = function(matrix) {
			var col = [];
	
			for (var i=0;i<5;i++) {
				for (var j=0;j<5;j++) {
					col[j] = this[j+i*5];
				}
				for (var j=0;j<5;j++) {
					var val=0;
					for (var k=0;k<5;k++) {
						val += matrix[j+k*5]*col[k];
					}
					this[j+i*5] = val;
				}
			}
		};
	
		/**
		 * Make sure values are within the specified range, hue has a limit of 180, brightness is 255, others are 100.
		 * @method _cleanValue
		 * @param {Number} value The raw number
		 * @param {Number} limit The maximum that the number can be. The minimum is the limit * -1.
		 * @protected
		 **/
		p._cleanValue = function(value, limit) {
			return Math.min(limit,Math.max(-limit,value));
		};
	
		//
		/**
		 * Makes sure matrixes are 5x5 (25 long).
		 * @method _fixMatrix
		 * @param {Array} matrix
		 * @protected
		 **/
		p._fixMatrix = function(matrix) {
			if (matrix instanceof ColorMatrix) { matrix = matrix.slice(0); }
			if (matrix.length < ColorMatrix.LENGTH) {
				matrix = matrix.slice(0,matrix.length).concat(ColorMatrix.IDENTITY_MATRIX.slice(matrix.length,ColorMatrix.LENGTH));
			} else if (matrix.length > ColorMatrix.LENGTH) {
				matrix = matrix.slice(0,ColorMatrix.LENGTH);
			}
			return matrix;
		};
	
		createjs.ColorMatrix = ColorMatrix;
	
	}());


/***/ },
/* 64 */
/***/ function(module, exports) {

	/*
	* ColorMatrixFilter
	* Visit http://createjs.com/ for documentation, updates and examples.
	*
	* Copyright (c) 2010 gskinner.com, inc.
	*
	* Permission is hereby granted, free of charge, to any person
	* obtaining a copy of this software and associated documentation
	* files (the "Software"), to deal in the Software without
	* restriction, including without limitation the rights to use,
	* copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the
	* Software is furnished to do so, subject to the following
	* conditions:
	*
	* The above copyright notice and this permission notice shall be
	* included in all copies or substantial portions of the Software.
	*
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	* OTHER DEALINGS IN THE SOFTWARE.
	*/
	
	/**
	 * @module EaselJS
	 */
	
	// namespace:
	this.createjs = this.createjs||{};
	
	(function() {
		"use strict";
	
	/**
	 * Allows you to carry out complex color operations such as modifying saturation, brightness, or inverting. See the
	 * {{#crossLink "ColorMatrix"}}{{/crossLink}} for more information on changing colors. For an easier color transform,
	 * consider the {{#crossLink "ColorFilter"}}{{/crossLink}}.
	 *
	 * <h4>Example</h4>
	 * This example creates a red circle, inverts its hue, and then saturates it to brighten it up.
	 *
	 *      var shape = new createjs.Shape().set({x:100,y:100});
	 *      shape.graphics.beginFill("#ff0000").drawCircle(0,0,50);
	 *
	 *      var matrix = new createjs.ColorMatrix().adjustHue(180).adjustSaturation(100);
	 *      shape.filters = [
	 *          new createjs.ColorMatrixFilter(matrix)
	 *      ];
	 *
	 *      shape.cache(-50, -50, 100, 100);
	 *
	 * See {{#crossLink "Filter"}}{{/crossLink}} for an more information on applying filters.
	 * @class ColorMatrixFilter
	 * @constructor
	 * @extends Filter
	 * @param {Array} matrix A 4x5 matrix describing the color operation to perform. See also the {{#crossLink "ColorMatrix"}}{{/crossLink}}
	 * class.
	 **/
	var ColorMatrixFilter = function(matrix) {
	  this.initialize(matrix);
	};
	var p = ColorMatrixFilter.prototype = new createjs.Filter();
	
	// public properties:
		p.matrix = null;
	
	// constructor:
		// TODO: detailed docs.
		/**
		 * @method initialize
		 * @protected
		 * @param {Array} matrix A 4x5 matrix describing the color operation to perform.
		 **/
		p.initialize = function(matrix) {
			this.matrix = matrix;
		};
	
	// public methods:
		p.applyFilter = function(ctx, x, y, width, height, targetCtx, targetX, targetY) {
			targetCtx = targetCtx || ctx;
			if (targetX == null) { targetX = x; }
			if (targetY == null) { targetY = y; }
			try {
				var imageData = ctx.getImageData(x, y, width, height);
			} catch(e) {
				//if (!this.suppressCrossDomainErrors) throw new Error("unable to access local image data: " + e);
				return false;
			}
			var data = imageData.data;
			var l = data.length;
			var r,g,b,a;
			var mtx = this.matrix;
			var m0 =  mtx[0],  m1 =  mtx[1],  m2 =  mtx[2],  m3 =  mtx[3],  m4 =  mtx[4];
			var m5 =  mtx[5],  m6 =  mtx[6],  m7 =  mtx[7],  m8 =  mtx[8],  m9 =  mtx[9];
			var m10 = mtx[10], m11 = mtx[11], m12 = mtx[12], m13 = mtx[13], m14 = mtx[14];
			var m15 = mtx[15], m16 = mtx[16], m17 = mtx[17], m18 = mtx[18], m19 = mtx[19];
	
			for (var i=0; i<l; i+=4) {
				r = data[i];
				g = data[i+1];
				b = data[i+2];
				a = data[i+3];
				data[i] = r*m0+g*m1+b*m2+a*m3+m4; // red
				data[i+1] = r*m5+g*m6+b*m7+a*m8+m9; // green
				data[i+2] = r*m10+g*m11+b*m12+a*m13+m14; // blue
				data[i+3] = r*m15+g*m16+b*m17+a*m18+m19; // alpha
			}
			targetCtx.putImageData(imageData, targetX, targetY);
			return true;
		};
	
		p.toString = function() {
			return "[ColorMatrixFilter]";
		};
	
		/**
		 * Returns a clone of this ColorMatrixFilter instance.
		 * @method clone
		 * @return {ColorMatrixFilter} A clone of the current ColorMatrixFilter instance.
		 **/
		p.clone = function() {
			return new ColorMatrixFilter(this.matrix);
		};
	
		createjs.ColorMatrixFilter = ColorMatrixFilter;
	
	}());


/***/ },
/* 65 */
/***/ function(module, exports) {

	/*
	* Filter
	* Visit http://createjs.com/ for documentation, updates and examples.
	*
	* Copyright (c) 2010 gskinner.com, inc.
	*
	* Permission is hereby granted, free of charge, to any person
	* obtaining a copy of this software and associated documentation
	* files (the "Software"), to deal in the Software without
	* restriction, including without limitation the rights to use,
	* copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the
	* Software is furnished to do so, subject to the following
	* conditions:
	*
	* The above copyright notice and this permission notice shall be
	* included in all copies or substantial portions of the Software.
	*
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	* OTHER DEALINGS IN THE SOFTWARE.
	*/
	
	/**
	 * @module EaselJS
	 */
	
	// namespace:
	this.createjs = this.createjs||{};
	
	(function() {
		"use strict";
	
	/**
	 * Base class that all filters should inherit from. Filters need to be applied to objects that have been cached using
	 * the {{#crossLink "DisplayObject/cache"}}{{/crossLink}} method. If an object changes, please cache it again, or use
	 * {{#crossLink "DisplayObject/updateCache"}}{{/crossLink}}. Note that the filters must be applied before caching.
	 *
	 * <h4>Example</h4>
	 *      myInstance.filters = [
	 *          new createjs.ColorFilter(0, 0, 0, 1, 255, 0, 0),
	 *          new createjs.BlurFilter(5, 5, 10)
	 *      ];
	 *      myInstance.cache(0,0, 100, 100);
	 *
	 * Note that each filter can implement a {{#crossLink "Filter/getBounds"}}{{/crossLink}} method, which returns the
	 * margins that need to be applied in order to fully display the filter. For example, the {{#crossLink "BlurFilter"}}{{/crossLink}}
	 * will cause an object to feather outwards, resulting in a margin around the shape.
	 *
	 * <h4>EaselJS Filters</h4>
	 * EaselJS comes with a number of pre-built filters. Note that individual filters are not compiled into the minified
	 * version of EaselJS. To use them, you must include them manually in the HTML.
	 * <ul><li>{{#crossLink "AlphaMapFilter"}}{{/crossLink}} : Map a greyscale image to the alpha channel of a display object</li>
	 *      <li>{{#crossLink "AlphaMaskFilter"}}{{/crossLink}}: Map an image's alpha channel to the alpha channel of a display object</li>
	 *      <li>{{#crossLink "BlurFilter"}}{{/crossLink}}: Apply vertical and horizontal blur to a display object</li>
	 *      <li>{{#crossLink "ColorFilter"}}{{/crossLink}}: Color transform a display object</li>
	 *      <li>{{#crossLink "ColorMatrixFilter"}}{{/crossLink}}: Transform an image using a {{#crossLink "ColorMatrix"}}{{/crossLink}}</li>
	 * </ul>
	 *
	 * @class Filter
	 * @constructor
	 **/
	var Filter = function() {
	  this.initialize();
	};
	var p = Filter.prototype;
	
	// constructor:
		/**
		 * Initialization method.
		 * @method initialize
		 * @protected
		 **/
		p.initialize = function() {}
	
	// public methods:
		/**
		 * Returns a rectangle with values indicating the margins required to draw the filter or null.
		 * For example, a filter that will extend the drawing area 4 pixels to the left, and 7 pixels to the right
		 * (but no pixels up or down) would return a rectangle with (x=-4, y=0, width=11, height=0).
		 * @method getBounds
		 * @return {Rectangle} a rectangle object indicating the margins required to draw the filter or null if the filter does not effect bounds.
		 **/
		p.getBounds = function() {
			return null;
		};
	
		/**
		 * Applies the filter to the specified context.
		 * @method applyFilter
		 * @param {CanvasRenderingContext2D} ctx The 2D context to use as the source.
		 * @param {Number} x The x position to use for the source rect.
		 * @param {Number} y The y position to use for the source rect.
		 * @param {Number} width The width to use for the source rect.
		 * @param {Number} height The height to use for the source rect.
		 * @param {CanvasRenderingContext2D} [targetCtx] The 2D context to draw the result to. Defaults to the context passed to ctx.
		 * @param {Number} [targetX] The x position to draw the result to. Defaults to the value passed to x.
		 * @param {Number} [targetY] The y position to draw the result to. Defaults to the value passed to y.
		 * @return {Boolean} If the filter was applied successfully.
		 **/
		p.applyFilter = function(ctx, x, y, width, height, targetCtx, targetX, targetY) {}
	
		/**
		 * Returns a string representation of this object.
		 * @method toString
		 * @return {String} a string representation of the instance.
		 **/
		p.toString = function() {
			return "[Filter]";
		};
	
		/**
		 * Returns a clone of this Filter instance.
		 * @method clone
		 * @return {Filter} A clone of the current Filter instance.
		 **/
		p.clone = function() {
			return new Filter();
		};
	
	createjs.Filter = Filter;
	}());


/***/ },
/* 66 */
/***/ function(module, exports) {

	/*
	* Matrix2D
	* Visit http://createjs.com/ for documentation, updates and examples.
	*
	* Copyright (c) 2010 gskinner.com, inc.
	*
	* Permission is hereby granted, free of charge, to any person
	* obtaining a copy of this software and associated documentation
	* files (the "Software"), to deal in the Software without
	* restriction, including without limitation the rights to use,
	* copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the
	* Software is furnished to do so, subject to the following
	* conditions:
	*
	* The above copyright notice and this permission notice shall be
	* included in all copies or substantial portions of the Software.
	*
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	* OTHER DEALINGS IN THE SOFTWARE.
	*/
	
	/**
	 * @module EaselJS
	 */
	
	// namespace:
	this.createjs = this.createjs||{};
	
	(function() {
		"use strict";
	
	/**
	 * Represents an affine transformation matrix, and provides tools for constructing and concatenating matrixes.
	 * @class Matrix2D
	 * @param {Number} [a=1] Specifies the a property for the new matrix.
	 * @param {Number} [b=0] Specifies the b property for the new matrix.
	 * @param {Number} [c=0] Specifies the c property for the new matrix.
	 * @param {Number} [d=1] Specifies the d property for the new matrix.
	 * @param {Number} [tx=0] Specifies the tx property for the new matrix.
	 * @param {Number} [ty=0] Specifies the ty property for the new matrix.
	 * @constructor
	 **/
	var Matrix2D = function(a, b, c, d, tx, ty) {
	  this.initialize(a, b, c, d, tx, ty);
	};
	var p = Matrix2D.prototype;
	
	// static public properties:
	
		/**
		 * An identity matrix, representing a null transformation.
		 * @property identity
		 * @static
		 * @type Matrix2D
		 * @readonly
		 **/
		Matrix2D.identity = null; // set at bottom of class definition.
	
		/**
		 * Multiplier for converting degrees to radians. Used internally by Matrix2D.
		 * @property DEG_TO_RAD
		 * @static
		 * @final
		 * @type Number
		 * @readonly
		 **/
		Matrix2D.DEG_TO_RAD = Math.PI/180;
	
	
	// public properties:
		/**
		 * Position (0, 0) in a 3x3 affine transformation matrix.
		 * @property a
		 * @type Number
		 **/
		p.a = 1;
	
		/**
		 * Position (0, 1) in a 3x3 affine transformation matrix.
		 * @property b
		 * @type Number
		 **/
		p.b = 0;
	
		/**
		 * Position (1, 0) in a 3x3 affine transformation matrix.
		 * @property c
		 * @type Number
		 **/
		p.c = 0;
	
		/**
		 * Position (1, 1) in a 3x3 affine transformation matrix.
		 * @property d
		 * @type Number
		 **/
		p.d = 1;
	
		/**
		 * Position (2, 0) in a 3x3 affine transformation matrix.
		 * @property tx
		 * @type Number
		 **/
		p.tx = 0;
	
		/**
		 * Position (2, 1) in a 3x3 affine transformation matrix.
		 * @property ty
		 * @type Number
		 **/
		p.ty = 0;
	
		/**
		 * Property representing the alpha that will be applied to a display object. This is not part of matrix
		 * operations, but is used for operations like getConcatenatedMatrix to provide concatenated alpha values.
		 * @property alpha
		 * @type Number
		 **/
		p.alpha = 1;
	
		/**
		 * Property representing the shadow that will be applied to a display object. This is not part of matrix
		 * operations, but is used for operations like getConcatenatedMatrix to provide concatenated shadow values.
		 * @property shadow
		 * @type Shadow
		 **/
		p.shadow  = null;
	
		/**
		 * Property representing the compositeOperation that will be applied to a display object. This is not part of
		 * matrix operations, but is used for operations like getConcatenatedMatrix to provide concatenated
		 * compositeOperation values. You can find a list of valid composite operations at:
		 * <a href="https://developer.mozilla.org/en/Canvas_tutorial/Compositing">https://developer.mozilla.org/en/Canvas_tutorial/Compositing</a>
		 * @property compositeOperation
		 * @type String
		 **/
		p.compositeOperation = null;
	
	// constructor:
		/**
		 * Initialization method. Can also be used to reinitialize the instance.
		 * @method initialize
		 * @param {Number} [a=1] Specifies the a property for the new matrix.
		 * @param {Number} [b=0] Specifies the b property for the new matrix.
		 * @param {Number} [c=0] Specifies the c property for the new matrix.
		 * @param {Number} [d=1] Specifies the d property for the new matrix.
		 * @param {Number} [tx=0] Specifies the tx property for the new matrix.
		 * @param {Number} [ty=0] Specifies the ty property for the new matrix.
		 * @return {Matrix2D} This instance. Useful for chaining method calls.
		*/
		p.initialize = function(a, b, c, d, tx, ty) {
			this.a = (a == null) ? 1 : a;
			this.b = b || 0;
			this.c = c || 0;
			this.d = (d == null) ? 1 : d;
			this.tx = tx || 0;
			this.ty = ty || 0;
			return this;
		};
	
	// public methods:
		/**
		 * Concatenates the specified matrix properties with this matrix. All parameters are required.
		 * @method prepend
		 * @param {Number} a
		 * @param {Number} b
		 * @param {Number} c
		 * @param {Number} d
		 * @param {Number} tx
		 * @param {Number} ty
		 * @return {Matrix2D} This matrix. Useful for chaining method calls.
		 **/
		p.prepend = function(a, b, c, d, tx, ty) {
			var tx1 = this.tx;
			if (a != 1 || b != 0 || c != 0 || d != 1) {
				var a1 = this.a;
				var c1 = this.c;
				this.a  = a1*a+this.b*c;
				this.b  = a1*b+this.b*d;
				this.c  = c1*a+this.d*c;
				this.d  = c1*b+this.d*d;
			}
			this.tx = tx1*a+this.ty*c+tx;
			this.ty = tx1*b+this.ty*d+ty;
			return this;
		};
	
		/**
		 * Appends the specified matrix properties with this matrix. All parameters are required.
		 * @method append
		 * @param {Number} a
		 * @param {Number} b
		 * @param {Number} c
		 * @param {Number} d
		 * @param {Number} tx
		 * @param {Number} ty
		 * @return {Matrix2D} This matrix. Useful for chaining method calls.
		 **/
		p.append = function(a, b, c, d, tx, ty) {
			var a1 = this.a;
			var b1 = this.b;
			var c1 = this.c;
			var d1 = this.d;
	
			this.a  = a*a1+b*c1;
			this.b  = a*b1+b*d1;
			this.c  = c*a1+d*c1;
			this.d  = c*b1+d*d1;
			this.tx = tx*a1+ty*c1+this.tx;
			this.ty = tx*b1+ty*d1+this.ty;
			return this;
		};
	
		/**
		 * Prepends the specified matrix with this matrix.
		 * @method prependMatrix
		 * @param {Matrix2D} matrix
		 **/
		p.prependMatrix = function(matrix) {
			this.prepend(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
			this.prependProperties(matrix.alpha, matrix.shadow,  matrix.compositeOperation);
			return this;
		};
	
		/**
		 * Appends the specified matrix with this matrix.
		 * @method appendMatrix
		 * @param {Matrix2D} matrix
		 * @return {Matrix2D} This matrix. Useful for chaining method calls.
		 **/
		p.appendMatrix = function(matrix) {
			this.append(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
			this.appendProperties(matrix.alpha, matrix.shadow,  matrix.compositeOperation);
			return this;
		};
	
		/**
		 * Generates matrix properties from the specified display object transform properties, and prepends them with this matrix.
		 * For example, you can use this to generate a matrix from a display object: var mtx = new Matrix2D();
		 * mtx.prependTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation);
		 * @method prependTransform
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Number} scaleX
		 * @param {Number} scaleY
		 * @param {Number} rotation
		 * @param {Number} skewX
		 * @param {Number} skewY
		 * @param {Number} regX Optional.
		 * @param {Number} regY Optional.
		 * @return {Matrix2D} This matrix. Useful for chaining method calls.
		 **/
		p.prependTransform = function(x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
			if (rotation%360) {
				var r = rotation*Matrix2D.DEG_TO_RAD;
				var cos = Math.cos(r);
				var sin = Math.sin(r);
			} else {
				cos = 1;
				sin = 0;
			}
	
			if (regX || regY) {
				// append the registration offset:
				this.tx -= regX; this.ty -= regY;
			}
			if (skewX || skewY) {
				// TODO: can this be combined into a single prepend operation?
				skewX *= Matrix2D.DEG_TO_RAD;
				skewY *= Matrix2D.DEG_TO_RAD;
				this.prepend(cos*scaleX, sin*scaleX, -sin*scaleY, cos*scaleY, 0, 0);
				this.prepend(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), x, y);
			} else {
				this.prepend(cos*scaleX, sin*scaleX, -sin*scaleY, cos*scaleY, x, y);
			}
			return this;
		};
	
		/**
		 * Generates matrix properties from the specified display object transform properties, and appends them with this matrix.
		 * For example, you can use this to generate a matrix from a display object: var mtx = new Matrix2D();
		 * mtx.appendTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation);
		 * @method appendTransform
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Number} scaleX
		 * @param {Number} scaleY
		 * @param {Number} rotation
		 * @param {Number} skewX
		 * @param {Number} skewY
		 * @param {Number} regX Optional.
		 * @param {Number} regY Optional.
		 * @return {Matrix2D} This matrix. Useful for chaining method calls.
		 **/
		p.appendTransform = function(x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
			if (rotation%360) {
				var r = rotation*Matrix2D.DEG_TO_RAD;
				var cos = Math.cos(r);
				var sin = Math.sin(r);
			} else {
				cos = 1;
				sin = 0;
			}
	
			if (skewX || skewY) {
				// TODO: can this be combined into a single append?
				skewX *= Matrix2D.DEG_TO_RAD;
				skewY *= Matrix2D.DEG_TO_RAD;
				this.append(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), x, y);
				this.append(cos*scaleX, sin*scaleX, -sin*scaleY, cos*scaleY, 0, 0);
			} else {
				this.append(cos*scaleX, sin*scaleX, -sin*scaleY, cos*scaleY, x, y);
			}
	
			if (regX || regY) {
				// prepend the registration offset:
				this.tx -= regX*this.a+regY*this.c; 
				this.ty -= regX*this.b+regY*this.d;
			}
			return this;
		};
	
		/**
		 * Applies a rotation transformation to the matrix.
		 * @method rotate
		 * @param {Number} angle The angle in radians. To use degrees, multiply by <code>Math.PI/180</code>.
		 * @return {Matrix2D} This matrix. Useful for chaining method calls.
		 **/
		p.rotate = function(angle) {
			var cos = Math.cos(angle);
			var sin = Math.sin(angle);
	
			var a1 = this.a;
			var c1 = this.c;
			var tx1 = this.tx;
	
			this.a = a1*cos-this.b*sin;
			this.b = a1*sin+this.b*cos;
			this.c = c1*cos-this.d*sin;
			this.d = c1*sin+this.d*cos;
			this.tx = tx1*cos-this.ty*sin;
			this.ty = tx1*sin+this.ty*cos;
			return this;
		};
	
		/**
		 * Applies a skew transformation to the matrix.
		 * @method skew
		 * @param {Number} skewX The amount to skew horizontally in degrees.
		 * @param {Number} skewY The amount to skew vertically in degrees.
		 * @return {Matrix2D} This matrix. Useful for chaining method calls.
		*/
		p.skew = function(skewX, skewY) {
			skewX = skewX*Matrix2D.DEG_TO_RAD;
			skewY = skewY*Matrix2D.DEG_TO_RAD;
			this.append(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), 0, 0);
			return this;
		};
	
		/**
		 * Applies a scale transformation to the matrix.
		 * @method scale
		 * @param {Number} x The amount to scale horizontally
		 * @param {Number} y The amount to scale vertically
		 * @return {Matrix2D} This matrix. Useful for chaining method calls.
		 **/
		p.scale = function(x, y) {
			this.a *= x;
			this.d *= y;
			this.c *= x;
			this.b *= y;
			this.tx *= x;
			this.ty *= y;
			return this;
		};
	
		/**
		 * Translates the matrix on the x and y axes.
		 * @method translate
		 * @param {Number} x
		 * @param {Number} y
		 * @return {Matrix2D} This matrix. Useful for chaining method calls.
		 **/
		p.translate = function(x, y) {
			this.tx += x;
			this.ty += y;
			return this;
		};
	
		/**
		 * Sets the properties of the matrix to those of an identity matrix (one that applies a null transformation).
		 * @method identity
		 * @return {Matrix2D} This matrix. Useful for chaining method calls.
		 **/
		p.identity = function() {
			this.alpha = this.a = this.d = 1;
			this.b = this.c = this.tx = this.ty = 0;
			this.shadow = this.compositeOperation = null;
			return this;
		};
	
		/**
		 * Inverts the matrix, causing it to perform the opposite transformation.
		 * @method invert
		 * @return {Matrix2D} This matrix. Useful for chaining method calls.
		 **/
		p.invert = function() {
			var a1 = this.a;
			var b1 = this.b;
			var c1 = this.c;
			var d1 = this.d;
			var tx1 = this.tx;
			var n = a1*d1-b1*c1;
	
			this.a = d1/n;
			this.b = -b1/n;
			this.c = -c1/n;
			this.d = a1/n;
			this.tx = (c1*this.ty-d1*tx1)/n;
			this.ty = -(a1*this.ty-b1*tx1)/n;
			return this;
		};
	
		/**
		 * Returns true if the matrix is an identity matrix.
		 * @method isIdentity
		 * @return {Boolean}
		 **/
		p.isIdentity = function() {
			return this.tx == 0 && this.ty == 0 && this.a == 1 && this.b == 0 && this.c == 0 && this.d == 1;
		};
	
		/**
		 * Transforms a point according to this matrix.
		 * @method transformPoint
		 * @param {Number} x The x component of the point to transform.
		 * @param {Number} y The y component of the point to transform.
		 * @param {Point | Object} [pt] An object to copy the result into. If omitted a generic object with x/y properties will be returned.
		 **/
		p.transformPoint = function(x, y, pt) {
			pt = pt||{};
			pt.x = x*this.a+y*this.c+this.tx;
			pt.y = x*this.b+y*this.d+this.ty;
			return pt;
		};
	
		/**
		 * Decomposes the matrix into transform properties (x, y, scaleX, scaleY, and rotation). Note that this these values
		 * may not match the transform properties you used to generate the matrix, though they will produce the same visual
		 * results.
		 * @method decompose
		 * @param {Object} target The object to apply the transform properties to. If null, then a new object will be returned.
		 * @return {Matrix2D} This matrix. Useful for chaining method calls.
		*/
		p.decompose = function(target) {
			// TODO: it would be nice to be able to solve for whether the matrix can be decomposed into only scale/rotation
			// even when scale is negative
			if (target == null) { target = {}; }
			target.x = this.tx;
			target.y = this.ty;
			target.scaleX = Math.sqrt(this.a * this.a + this.b * this.b);
			target.scaleY = Math.sqrt(this.c * this.c + this.d * this.d);
	
			var skewX = Math.atan2(-this.c, this.d);
			var skewY = Math.atan2(this.b, this.a);
	
			if (skewX == skewY) {
				target.rotation = skewY/Matrix2D.DEG_TO_RAD;
				if (this.a < 0 && this.d >= 0) {
					target.rotation += (target.rotation <= 0) ? 180 : -180;
				}
				target.skewX = target.skewY = 0;
			} else {
				target.skewX = skewX/Matrix2D.DEG_TO_RAD;
				target.skewY = skewY/Matrix2D.DEG_TO_RAD;
			}
			return target;
		};
	
		/**
		 * Reinitializes all matrix properties to those specified.
		 * @method reinitialize
		 * @param {Number} [a=1] Specifies the a property for the new matrix.
		 * @param {Number} [b=0] Specifies the b property for the new matrix.
		 * @param {Number} [c=0] Specifies the c property for the new matrix.
		 * @param {Number} [d=1] Specifies the d property for the new matrix.
		 * @param {Number} [tx=0] Specifies the tx property for the new matrix.
		 * @param {Number} [ty=0] Specifies the ty property for the new matrix.
		 * @param {Number} [alpha=1] desired alpha value
		 * @param {Shadow} [shadow=null] desired shadow value
		 * @param {String} [compositeOperation=null] desired composite operation value
		 * @return {Matrix2D} This matrix. Useful for chaining method calls.
		*/
		p.reinitialize = function(a, b, c, d, tx, ty, alpha, shadow, compositeOperation) {
			this.initialize(a,b,c,d,tx,ty);
			this.alpha = alpha == null ? 1 : alpha;
			this.shadow = shadow;
			this.compositeOperation = compositeOperation;
			return this;
		};
		
		/**
		 * Copies all properties from the specified matrix to this matrix.
		 * @method copy
		 * @param {Matrix2D} matrix The matrix to copy properties from.
		 * @return {Matrix2D} This matrix. Useful for chaining method calls.
		*/
		p.copy = function(matrix) {
			return this.reinitialize(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty, matrix.alpha, matrix.shadow, matrix.compositeOperation);
		};
	
		/**
		 * Appends the specified visual properties to the current matrix.
		 * @method appendProperties
		 * @param {Number} alpha desired alpha value
		 * @param {Shadow} shadow desired shadow value
		 * @param {String} compositeOperation desired composite operation value
		 * @return {Matrix2D} This matrix. Useful for chaining method calls.
		*/
		p.appendProperties = function(alpha, shadow, compositeOperation) {
			this.alpha *= alpha;
			this.shadow = shadow || this.shadow;
			this.compositeOperation = compositeOperation || this.compositeOperation;
			return this;
		};
	
		/**
		 * Prepends the specified visual properties to the current matrix.
		 * @method prependProperties
		 * @param {Number} alpha desired alpha value
		 * @param {Shadow} shadow desired shadow value
		 * @param {String} compositeOperation desired composite operation value
		 * @return {Matrix2D} This matrix. Useful for chaining method calls.
		*/
		p.prependProperties = function(alpha, shadow, compositeOperation) {
			this.alpha *= alpha;
			this.shadow = this.shadow || shadow;
			this.compositeOperation = this.compositeOperation || compositeOperation;
			return this;
		};
	
		/**
		 * Returns a clone of the Matrix2D instance.
		 * @method clone
		 * @return {Matrix2D} a clone of the Matrix2D instance.
		 **/
		p.clone = function() {
			return (new Matrix2D()).copy(this);
		};
	
		/**
		 * Returns a string representation of this object.
		 * @method toString
		 * @return {String} a string representation of the instance.
		 **/
		p.toString = function() {
			return "[Matrix2D (a="+this.a+" b="+this.b+" c="+this.c+" d="+this.d+" tx="+this.tx+" ty="+this.ty+")]";
		};
	
		// this has to be populated after the class is defined:
		Matrix2D.identity = new Matrix2D();
	
	createjs.Matrix2D = Matrix2D;
	}());


/***/ },
/* 67 */
/***/ function(module, exports) {

	/*
	* Point
	* Visit http://createjs.com/ for documentation, updates and examples.
	*
	* Copyright (c) 2010 gskinner.com, inc.
	*
	* Permission is hereby granted, free of charge, to any person
	* obtaining a copy of this software and associated documentation
	* files (the "Software"), to deal in the Software without
	* restriction, including without limitation the rights to use,
	* copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the
	* Software is furnished to do so, subject to the following
	* conditions:
	*
	* The above copyright notice and this permission notice shall be
	* included in all copies or substantial portions of the Software.
	*
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	* OTHER DEALINGS IN THE SOFTWARE.
	*/
	
	/**
	 * @module EaselJS
	 */
	
	// namespace:
	this.createjs = this.createjs||{};
	
	(function() {
		"use strict";
	
	/**
	 * Represents a point on a 2 dimensional x / y coordinate system.
	 *
	 * <h4>Example</h4>
	 *      var point = new Point(0, 100);
	 *
	 * @class Point
	 * @param {Number} [x=0] X position.
	 * @param {Number} [y=0] Y position.
	 * @constructor
	 **/
	var Point = function(x, y) {
	  this.initialize(x, y);
	};
	var p = Point.prototype;
	
	// public properties:
	
		/**
		 * X position.
		 * @property x
		 * @type Number
		 **/
		p.x = 0;
	
		/**
		 * Y position.
		 * @property y
		 * @type Number
		 **/
		p.y = 0;
	
	// constructor:
		/** 
		 * Initialization method. Can also be used to reinitialize the instance.
		 * @method initialize
		 * @param {Number} [x=0] X position.
		 * @param {Number} [y=0] Y position.
		 * @return {Point} This instance. Useful for chaining method calls.
		*/
		p.initialize = function(x, y) {
			this.x = (x == null ? 0 : x);
			this.y = (y == null ? 0 : y);
			return this;
		};
		
	// public methods:
		/**
		 * Copies all properties from the specified point to this point.
		 * @method copy
		 * @param {Point} point The point to copy properties from.
		 * @return {Point} This point. Useful for chaining method calls.
		*/
		p.copy = function(point) {
			return this.initialize(point.x, point.y);
		};
		
		/**
		 * Returns a clone of the Point instance.
		 * @method clone
		 * @return {Point} a clone of the Point instance.
		 **/
		p.clone = function() {
			return new Point(this.x, this.y);
		};
	
		/**
		 * Returns a string representation of this object.
		 * @method toString
		 * @return {String} a string representation of the instance.
		 **/
		p.toString = function() {
			return "[Point (x="+this.x+" y="+this.y+")]";
		};
		
	createjs.Point = Point;
	}());


/***/ },
/* 68 */
/***/ function(module, exports) {

	/*
	* Rectangle
	* Visit http://createjs.com/ for documentation, updates and examples.
	*
	* Copyright (c) 2010 gskinner.com, inc.
	*
	* Permission is hereby granted, free of charge, to any person
	* obtaining a copy of this software and associated documentation
	* files (the "Software"), to deal in the Software without
	* restriction, including without limitation the rights to use,
	* copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the
	* Software is furnished to do so, subject to the following
	* conditions:
	*
	* The above copyright notice and this permission notice shall be
	* included in all copies or substantial portions of the Software.
	*
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	* OTHER DEALINGS IN THE SOFTWARE.
	*/
	
	/**
	 * @module EaselJS
	 */
	
	// namespace:
	this.createjs = this.createjs||{};
	
	(function() {
		"use strict";
	
	/**
	 * Represents a rectangle as defined by the points (x, y) and (x+width, y+height).
	 *
	 * @example
	 *      var rect = new createjs.Rectangle(0, 0, 100, 100);
	 *
	 * @class Rectangle
	 * @param {Number} [x=0] X position.
	 * @param {Number} [y=0] Y position.
	 * @param {Number} [width=0] The width of the Rectangle.
	 * @param {Number} [height=0] The height of the Rectangle.
	 * @constructor
	 **/
	var Rectangle = function(x, y, width, height) {
	  this.initialize(x, y, width, height);
	};
	var p = Rectangle.prototype;
	
	// public properties:
		/**
		 * X position.
		 * @property x
		 * @type Number
		 **/
		p.x = 0;
	
		/**
		 * Y position.
		 * @property y
		 * @type Number
		 **/
		p.y = 0;
	
		/**
		 * Width.
		 * @property width
		 * @type Number
		 **/
		p.width = 0;
	
		/**
		 * Height.
		 * @property height
		 * @type Number
		 **/
		p.height = 0;
	
	// constructor:
		/** 
		 * Initialization method. Can also be used to reinitialize the instance.
		 * @method initialize
		 * @param {Number} [x=0] X position.
		 * @param {Number} [y=0] Y position.
		 * @param {Number} [width=0] The width of the Rectangle.
		 * @param {Number} [height=0] The height of the Rectangle.
		 * @return {Rectangle} This instance. Useful for chaining method calls.
		*/
		p.initialize = function(x, y, width, height) {
			this.x = x||0;
			this.y = y||0;
			this.width = width||0;
			this.height = height||0;
			return this;
		};
		
	// public methods:
		/**
		 * Copies all properties from the specified rectangle to this rectangle.
		 * @method copy
		 * @param {Rectangle} rectangle The rectangle to copy properties from.
		 * @return {Rectangle} This rectangle. Useful for chaining method calls.
		*/
		p.copy = function(rectangle) {
			return this.initialize(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
		};
		
		/**
		 * Returns a clone of the Rectangle instance.
		 * @method clone
		 * @return {Rectangle} a clone of the Rectangle instance.
		 **/
		p.clone = function() {
			return new Rectangle(this.x, this.y, this.width, this.height);
		};
	
		/**
		 * Returns a string representation of this object.
		 * @method toString
		 * @return {String} a string representation of the instance.
		 **/
		p.toString = function() {
			return "[Rectangle (x="+this.x+" y="+this.y+" width="+this.width+" height="+this.height+")]";
		};
		
	createjs.Rectangle = Rectangle;
	}());


/***/ },
/* 69 */
/***/ function(module, exports) {

	/*
	* SpriteSheetBuilder
	* Visit http://createjs.com/ for documentation, updates and examples.
	*
	* Copyright (c) 2010 gskinner.com, inc.
	*
	* Permission is hereby granted, free of charge, to any person
	* obtaining a copy of this software and associated documentation
	* files (the "Software"), to deal in the Software without
	* restriction, including without limitation the rights to use,
	* copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the
	* Software is furnished to do so, subject to the following
	* conditions:
	*
	* The above copyright notice and this permission notice shall be
	* included in all copies or substantial portions of the Software.
	*
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	* OTHER DEALINGS IN THE SOFTWARE.
	*/
	
	/**
	 * @module EaselJS
	 */
	
	// namespace:
	this.createjs = this.createjs||{};
	
	(function() {
		"use strict";
	
	/**
	 * The SpriteSheetBuilder allows you to generate sprite sheets at run time from any display object. This can allow
	 * you to maintain your assets as vector graphics (for low file size), and render them at run time as sprite sheets
	 * for better performance.
	 *
	 * Sprite sheets can be built either synchronously, or asynchronously, so that large sprite sheets can be generated
	 * without locking the UI.
	 *
	 * Note that the "images" used in the generated sprite sheet are actually canvas elements, and that they will be sized
	 * to the nearest power of 2 up to the value of <code>maxWidth</code> or <code>maxHeight</code>.
	 * @class SpriteSheetBuilder
	 * @extends EventDispatcher
	 * @constructor
	 **/
	var SpriteSheetBuilder = function() {
	  this.initialize();
	};
	var p = SpriteSheetBuilder.prototype = new createjs.EventDispatcher;
	
	// constants:
		SpriteSheetBuilder.ERR_DIMENSIONS = "frame dimensions exceed max spritesheet dimensions";
		SpriteSheetBuilder.ERR_RUNNING = "a build is already running";
	
	// events:
	
		/**
		 * Dispatched when a build completes.
		 * @event complete
		 * @param {Object} target The object that dispatched the event.
		 * @param {String} type The event type.
		 * @since 0.6.0
		 */
	
		/**
		 * Dispatched when an asynchronous build has progress.
		 * @event complete
		 * @param {Object} target The object that dispatched the event.
		 * @param {String} type The event type.
		 * @param {Number} progress The current progress value (0-1).
		 * @since 0.6.0
		 */
	
	// public properties:
	
		/**
		 * The maximum width for the images (not individual frames) in the generated sprite sheet. It is recommended to use
		 * a power of 2 for this value (ex. 1024, 2048, 4096). If the frames cannot all fit within the max dimensions, then
		 * additional images will be created as needed.
		 * @property maxWidth
		 * @type Number
		 * @default 2048
		*/
		p.maxWidth = 2048;
	
		/**
		 * The maximum height for the images (not individual frames) in the generated sprite sheet. It is recommended to use
		 * a power of 2 for this value (ex. 1024, 2048, 4096). If the frames cannot all fit within the max dimensions, then
		 * additional images will be created as needed.
		 * @property maxHeight
		 * @type Number
		 * @default 2048
		 **/
		p.maxHeight = 2048;
	
		/**
		 * The sprite sheet that was generated. This will be null before a build is completed successfully.
		 * @property spriteSheet
		 * @type SpriteSheet
		 **/
		p.spriteSheet = null;
	
		/**
		 * The scale to apply when drawing all frames to the sprite sheet. This is multiplied against any scale specified
		 * in the addFrame call. This can be used, for example, to generate a sprite sheet at run time that is tailored to
		 * the a specific device resolution (ex. tablet vs mobile).
		 * @property scale
		 * @type Number
		 * @default 1
		 **/
		p.scale = 1;
	
		/**
		* The padding to use between frames. This is helpful to preserve antialiasing on drawn vector content.
		* @property padding
		* @type Number
		* @default 1
		**/
		p.padding = 1;
	
		/**
		 * A number from 0.01 to 0.99 that indicates what percentage of time the builder can use. This can be
		 * thought of as the number of seconds per second the builder will use. For example, with a timeSlice value of 0.3,
		 * the builder will run 20 times per second, using approximately 15ms per build (30% of available time, or 0.3s per second).
		 * Defaults to 0.3.
		 * @property timeSlice
		 * @type Number
		 * @default 0.3
		 **/
		p.timeSlice = 0.3;
	
		/**
		 * A value between 0 and 1 that indicates the progress of a build, or -1 if a build has not
		 * been initiated.
		 * @property progress
		 * @type Number
		 * @default -1
		 * @readonly
		 **/
		p.progress = -1;
	
		// TODO: deprecated.
		/**
		 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "SpriteSheetBuilder/complete:event"}}{{/crossLink}}
		 * event.
		 * @property onComplete
		 * @type Function
		 * @deprecated Use addEventListener and the "complete" event.
		 */
		/**
		 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "SpriteSheetBuilder/progress:event"}}{{/crossLink}}
		 * event.
		 * @property onProgress
		 * @type Function
		 * @deprecated Use addEventListener and the "progress" event.
		 */
	
	// private properties:
	
		/**
		 * @property _frames
		 * @protected
		 * @type Array
		 **/
		p._frames = null;
	
		/**
		 * @property _animations
		 * @protected
		 * @type Array
		 **/
		p._animations = null;
	
		/**
		 * @property _data
		 * @protected
		 * @type Array
		 **/
		p._data = null;
	
		/**
		 * @property _nextFrameIndex
		 * @protected
		 * @type Number
		 **/
		p._nextFrameIndex = 0;
	
		/**
		 * @property _index
		 * @protected
		 * @type Number
		 **/
		p._index = 0;
	
		/**
		 * @property _timerID
		 * @protected
		 * @type Number
		 **/
		p._timerID = null;
	
		/**
		 * @property _scale
		 * @protected
		 * @type Number
		 **/
		p._scale = 1;
	
	// constructor:
		/**
		 * Initialization method.
		 * @method initialize
		 * @protected
		 **/
		p.initialize = function() {
			this._frames = [];
			this._animations = {};
		};
	
	// public methods:
	
		/**
		 * Adds a frame to the {{#crossLink "SpriteSheet"}}{{/crossLink}}. Note that the frame will not be drawn until you
		 * call {{#crossLink "SpriteSheetBuilder/build"}}{{/crossLink}} method. The optional setup params allow you to have
		 * a function run immediately before the draw occurs. For example, this allows you to add a single source multiple
		 * times, but manipulate it or its children to change it to generate different frames.
		 *
		 * Note that the source's transformations (x, y, scale, rotate, alpha) will be ignored, except for regX/Y. To apply
		 * transforms to a source object and have them captured in the sprite sheet, simply place it into a {{#crossLink "Container"}}{{/crossLink}}
		 * and pass in the Container as the source.
		 * @method addFrame
		 * @param {DisplayObject} source The source {{#crossLink "DisplayObject"}}{{/crossLink}}  to draw as the frame.
		 * @param {Rectangle} [sourceRect] A {{#crossLink "Rectangle"}}{{/crossLink}} defining the portion of the
		 * source to draw to the frame. If not specified, it will look for a <code>getBounds</code> method, bounds property,
		 * or <code>nominalBounds</code> property on the source to use. If one is not found, the frame will be skipped.
		 * @param {Number} [scale=1] Optional. The scale to draw this frame at. Default is 1.
		 * @param {Function} [setupFunction] Optional. A function to call immediately before drawing this frame.
		 * @param {Array} [setupParams] Parameters to pass to the setup function.
		 * @param {Object} [setupScope] The scope to call the setupFunction in.
		 * @return {Number} The index of the frame that was just added, or null if a sourceRect could not be determined.
		 **/
		p.addFrame = function(source, sourceRect, scale, setupFunction, setupParams, setupScope) {
			if (this._data) { throw SpriteSheetBuilder.ERR_RUNNING; }
			var rect = sourceRect||source.bounds||source.nominalBounds;
			if (!rect&&source.getBounds) { rect = source.getBounds(); }
			if (!rect) { return null; }
			scale = scale||1;
			return this._frames.push({source:source, sourceRect:rect, scale:scale, funct:setupFunction, params:setupParams, scope:setupScope, index:this._frames.length, height:rect.height*scale})-1;
		};
	
		/**
		 * Adds an animation that will be included in the created sprite sheet.
		 * @method addAnimation
		 * @param {String} name The name for the animation.
		 * @param {Array} frames An array of frame indexes that comprise the animation. Ex. [3,6,5] would describe an animation
		 * that played frame indexes 3, 6, and 5 in that order.
		 * @param {String} [next] Specifies the name of the animation to continue to after this animation ends. You can
		 * also pass false to have the animation stop when it ends. By default it will loop to the start of the same animation.
		 * @param {Number} [frequency] Specifies a frame advance frequency for this animation. For example, a value
		 * of 2 would cause the animation to advance every second tick.
		 **/
		p.addAnimation = function(name, frames, next, frequency) {
			if (this._data) { throw SpriteSheetBuilder.ERR_RUNNING; }
			this._animations[name] = {frames:frames, next:next, frequency:frequency};
		};
	
		/**
		 * This will take a MovieClip, and add its frames and labels to this builder. Labels will be added as an animation
		 * running from the label index to the next label. For example, if there is a label named "foo" at frame 0 and a label
		 * named "bar" at frame 10, in a MovieClip with 15 frames, it will add an animation named "foo" that runs from frame
		 * index 0 to 9, and an animation named "bar" that runs from frame index 10 to 14.
		 *
		 * Note that this will iterate through the full MovieClip with actionsEnabled set to false, ending on the last frame.
		 * @method addMovieClip
		 * @param {MovieClip} source The source MovieClip to add to the sprite sheet.
		 * @param {Rectangle} [sourceRect] A {{#crossLink "Rectangle"}}{{/crossLink}} defining the portion of the source to
		 * draw to the frame. If not specified, it will look for a <code>getBounds</code> method, <code>frameBounds</code>
		 * Array, <code>bounds</code> property, or <code>nominalBounds</code> property on the source to use. If one is not
		 * found, the MovieClip will be skipped.
		 * @param {Number} [scale=1] The scale to draw the movie clip at.
		 **/
		p.addMovieClip = function(source, sourceRect, scale) {
			if (this._data) { throw SpriteSheetBuilder.ERR_RUNNING; }
			var rects = source.frameBounds;
			var rect = sourceRect||source.bounds||source.nominalBounds;
			if (!rect&&source.getBounds) { rect = source.getBounds(); }
			if (!rect && !rects) { return null; }
	
			var baseFrameIndex = this._frames.length;
			var duration = source.timeline.duration;
			for (var i=0; i<duration; i++) {
				var r = (rects&&rects[i]) ? rects[i] : rect;
				this.addFrame(source, r, scale, function(frame) {
					var ae = this.actionsEnabled;
					this.actionsEnabled = false;
					this.gotoAndStop(frame);
					this.actionsEnabled = ae;
				}, [i], source);
			}
			var labels = source.timeline._labels;
			var lbls = [];
			for (var n in labels) {
				lbls.push({index:labels[n], label:n});
			}
			if (lbls.length) {
				lbls.sort(function(a,b){ return a.index-b.index; });
				for (var i=0,l=lbls.length; i<l; i++) {
					var label = lbls[i].label;
					var start = baseFrameIndex+lbls[i].index;
					var end = baseFrameIndex+((i == l-1) ? duration : lbls[i+1].index);
					var frames = [];
					for (var j=start; j<end; j++) { frames.push(j); }
					this.addAnimation(label, frames, true); // for now, this loops all animations.
				}
			}
		};
	
		/**
		 * Builds a SpriteSheet instance based on the current frames.
		 * @method build
		 * @return SpriteSheet The created SpriteSheet instance, or null if a build is already running or an error occurred.
		 **/
		p.build = function() {
			if (this._data) { throw SpriteSheetBuilder.ERR_RUNNING; }
			this._startBuild();
			while (this._drawNext()) {}
			this._endBuild();
			return this.spriteSheet;
		};
	
		/**
		 * Asynchronously builds a {{#crossLink "SpriteSheet"}}{{/crossLink}} instance based on the current frames. It will
		 * run 20 times per second, using an amount of time defined by <code>timeSlice</code>. When it is complete it will
		 * call the specified callback.
		 * @method buildAsync
		 * @param {Number} [timeSlice] Sets the timeSlice property on this instance.
		 **/
		p.buildAsync = function(timeSlice) {
			if (this._data) { throw SpriteSheetBuilder.ERR_RUNNING; }
			this.timeSlice = timeSlice;
			this._startBuild();
			var _this = this;
			this._timerID = setTimeout(function() { _this._run(); }, 50-Math.max(0.01, Math.min(0.99, this.timeSlice||0.3))*50);
		};
	
		/**
		 * Stops the current asynchronous build.
		 * @method stopAsync
		 **/
		p.stopAsync = function() {
			clearTimeout(this._timerID);
			this._data = null;
		};
	
		/**
		 * SpriteSheetBuilder instances cannot be cloned.
		 * @method clone
		 **/
		p.clone = function() {
			throw("SpriteSheetBuilder cannot be cloned.");
		};
	
		/**
		 * Returns a string representation of this object.
		 * @method toString
		 * @return {String} a string representation of the instance.
		 **/
		p.toString = function() {
			return "[SpriteSheetBuilder]";
		};
	
	// private methods:
		/**
		 * @method _startBuild
		 * @protected
		 **/
		p._startBuild = function() {
			var pad = this.padding||0;
			this.progress = 0;
			this.spriteSheet = null;
			this._index = 0;
			this._scale = this.scale;
			var dataFrames = [];
			this._data = {
				images: [],
				frames: dataFrames,
				animations: this._animations // TODO: should we "clone" _animations in case someone adds more animations after a build?
			};
	
			var frames = this._frames.slice();
			frames.sort(function(a,b) { return (a.height<=b.height) ? -1 : 1; });
	
			if (frames[frames.length-1].height+pad*2 > this.maxHeight) { throw SpriteSheetBuilder.ERR_DIMENSIONS; }
			var y=0, x=0;
			var img = 0;
			while (frames.length) {
				var o = this._fillRow(frames, y, img, dataFrames, pad);
				if (o.w > x) { x = o.w; }
				y += o.h;
				if (!o.h || !frames.length) {
					var canvas = createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");
					canvas.width = this._getSize(x,this.maxWidth);
					canvas.height = this._getSize(y,this.maxHeight);
					this._data.images[img] = canvas;
					if (!o.h) {
						x=y=0;
						img++;
					}
				}
			}
		};
	
		/**
		 * @method _getSize
		 * @protected
		 * @return {Number} The width & height of the row.
		 **/
		p._getSize = function(size,max) {
			var pow = 4;
			while (Math.pow(2,++pow) < size){}
			return Math.min(max,Math.pow(2,pow));
		};
	
		/**
		 * @method _fillRow
		 * @param {Array} frames
		 * @param {Number} y
		 * @param {Image} img
		 * @param {Object} dataFrames
		 * @param {Number} pad
		 * @protected
		 * @return {Number} The width & height of the row.
		 **/
		p._fillRow = function(frames, y, img, dataFrames, pad) {
			var w = this.maxWidth;
			var maxH = this.maxHeight;
			y += pad;
			var h = maxH-y;
			var x = pad;
			var height = 0;
			for (var i=frames.length-1; i>=0; i--) {
				var frame = frames[i];
				var sc = this._scale*frame.scale;
				var rect = frame.sourceRect;
				var source = frame.source;
				var rx = Math.floor(sc*rect.x-pad);
				var ry = Math.floor(sc*rect.y-pad);
				var rh = Math.ceil(sc*rect.height+pad*2);
				var rw = Math.ceil(sc*rect.width+pad*2);
				if (rw > w) { throw SpriteSheetBuilder.ERR_DIMENSIONS; }
				if (rh > h || x+rw > w) { continue; }
				frame.img = img;
				frame.rect = new createjs.Rectangle(x,y,rw,rh);
				height = height || rh;
				frames.splice(i,1);
				dataFrames[frame.index] = [x,y,rw,rh,img,Math.round(-rx+sc*source.regX-pad),Math.round(-ry+sc*source.regY-pad)];
				x += rw;
			}
			return {w:x, h:height};
		};
	
		/**
		 * @method _endBuild
		 * @protected
		 **/
		p._endBuild = function() {
			this.spriteSheet = new createjs.SpriteSheet(this._data);
			this._data = null;
			this.progress = 1;
			this.dispatchEvent("complete");
		};
	
		/**
		 * @method _run
		 * @protected
		 **/
		p._run = function() {
			var ts = Math.max(0.01, Math.min(0.99, this.timeSlice||0.3))*50;
			var t = (new Date()).getTime()+ts;
			var complete = false;
			while (t > (new Date()).getTime()) {
				if (!this._drawNext()) { complete = true; break; }
			}
			if (complete) {
				this._endBuild();
			} else {
				var _this = this;
				this._timerID = setTimeout(function() { _this._run(); }, 50-ts);
			}
			var p = this.progress = this._index/this._frames.length;
			if (this.hasEventListener("progress")) {
				var evt = new createjs.Event("progress");
				evt.progress = p;
				this.dispatchEvent(evt);
			}
		};
	
		/**
		 * @method _drawNext
		 * @protected
		 * @return Boolean Returns false if this is the last draw.
		 **/
		p._drawNext = function() {
			var frame = this._frames[this._index];
			var sc = frame.scale*this._scale;
			var rect = frame.rect;
			var sourceRect = frame.sourceRect;
			var canvas = this._data.images[frame.img];
			var ctx = canvas.getContext("2d");
			frame.funct&&frame.funct.apply(frame.scope, frame.params);
			ctx.save();
			ctx.beginPath();
			ctx.rect(rect.x, rect.y, rect.width, rect.height);
			ctx.clip();
			ctx.translate(Math.ceil(rect.x-sourceRect.x*sc), Math.ceil(rect.y-sourceRect.y*sc));
			ctx.scale(sc,sc);
			frame.source.draw(ctx); // display object will draw itself.
			ctx.restore();
			return (++this._index) < this._frames.length;
		};
	
	createjs.SpriteSheetBuilder = SpriteSheetBuilder;
	}());


/***/ },
/* 70 */
/***/ function(module, exports) {

	/*
	* SpriteSheetUtils
	* Visit http://createjs.com/ for documentation, updates and examples.
	*
	* Copyright (c) 2010 gskinner.com, inc.
	*
	* Permission is hereby granted, free of charge, to any person
	* obtaining a copy of this software and associated documentation
	* files (the "Software"), to deal in the Software without
	* restriction, including without limitation the rights to use,
	* copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the
	* Software is furnished to do so, subject to the following
	* conditions:
	*
	* The above copyright notice and this permission notice shall be
	* included in all copies or substantial portions of the Software.
	*
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	* OTHER DEALINGS IN THE SOFTWARE.
	*/
	
	/**
	 * @module EaselJS
	 */
	
	// namespace:
	this.createjs = this.createjs||{};
	
	(function() {
		"use strict";
	// constructor:
	/**
	 * The SpriteSheetUtils class is a collection of static methods for working with {{#crossLink "SpriteSheet"}}{{/crossLink}}s.
	 * A sprite sheet is a series of images (usually animation frames) combined into a single image on a regular grid. For
	 * example, an animation consisting of 8 100x100 images could be combined into a 400x200 sprite sheet (4 frames across
	 * by 2 high). The SpriteSheetUtils class uses a static interface and should not be instantiated.
	 * @class SpriteSheetUtils
	 * @static
	 **/
	var SpriteSheetUtils = function() {
		throw "SpriteSheetUtils cannot be instantiated";
	};
	
		/**
		 * @property _workingCanvas
		 * @static
		 * @type HTMLCanvasElement | Object
		 * @protected
		*/
		
		/**
		 * @property _workingContext
		 * @static
		 * @type CanvasRenderingContext2D
		 * @protected
		*/
		var canvas = (createjs.createCanvas?createjs.createCanvas():document.createElement("canvas"));
		if (canvas.getContext) {
			SpriteSheetUtils._workingCanvas = canvas;
			SpriteSheetUtils._workingContext = canvas.getContext("2d");
			canvas.width = canvas.height = 1;
		}
	
		
	
	// public static methods:
		/**
		 * <b>This is an experimental method, and may be buggy. Please report issues.</b><br/><br/>
		 * Extends the existing sprite sheet by flipping the original frames horizontally, vertically, or both,
		 * and adding appropriate animation & frame data. The flipped animations will have a suffix added to their names
		 * (_h, _v, _hv as appropriate). Make sure the sprite sheet images are fully loaded before using this method.
		 * <br/><br/>
		 * For example:<br/>
		 * SpriteSheetUtils.addFlippedFrames(mySpriteSheet, true, true);
		 * The above would add frames that are flipped horizontally AND frames that are flipped vertically.
		 * <br/><br/>
		 * Note that you can also flip any display object by setting its scaleX or scaleY to a negative value. On some
		 * browsers (especially those without hardware accelerated canvas) this can result in slightly degraded performance,
		 * which is why addFlippedFrames is available.
		 * @method addFlippedFrames
		 * @static
		 * @param {SpriteSheet} spriteSheet
		 * @param {Boolean} horizontal If true, horizontally flipped frames will be added.
		 * @param {Boolean} vertical If true, vertically flipped frames will be added.
		 * @param {Boolean} both If true, frames that are flipped both horizontally and vertically will be added.
		 * @deprecated Modern browsers perform better when flipping via a transform (ex. scaleX=-1) rendering this obsolete.
		 **/
		SpriteSheetUtils.addFlippedFrames = function(spriteSheet, horizontal, vertical, both) {
			if (!horizontal && !vertical && !both) { return; }
	
			var count = 0;
			if (horizontal) { SpriteSheetUtils._flip(spriteSheet,++count,true,false); }
			if (vertical) { SpriteSheetUtils._flip(spriteSheet,++count,false,true); }
			if (both) { SpriteSheetUtils._flip(spriteSheet,++count,true,true); }
		};
	
		/**
		 * Returns a single frame of the specified sprite sheet as a new PNG image. An example of when this may be useful is
		 * to use a spritesheet frame as the source for a bitmap fill.
		 *
		 * <strong>WARNING:</strong> In almost all cases it is better to display a single frame using a {{#crossLink "Sprite"}}{{/crossLink}}
		 * with a {{#crossLink "Sprite/gotoAndStop"}}{{/crossLink}} call than it is to slice out a frame using this
		 * method and display it with a Bitmap instance. You can also crop an image using the {{#crossLink "Bitmap/sourceRect"}}{{/crossLink}}
		 * property of {{#crossLink "Bitmap"}}{{/crossLink}}.
		 *
		 * The extractFrame method may cause cross-domain warnings since it accesses pixels directly on the canvas.
		 * @method extractFrame
		 * @static
		 * @param {Image} spriteSheet The SpriteSheet instance to extract a frame from.
		 * @param {Number|String} frameOrAnimation The frame number or animation name to extract. If an animation
		 * name is specified, only the first frame of the animation will be extracted.
		 * @return {Image} a single frame of the specified sprite sheet as a new PNG image.
		*/
		SpriteSheetUtils.extractFrame = function(spriteSheet, frameOrAnimation) {
			if (isNaN(frameOrAnimation)) {
				frameOrAnimation = spriteSheet.getAnimation(frameOrAnimation).frames[0];
			}
			var data = spriteSheet.getFrame(frameOrAnimation);
			if (!data) { return null; }
			var r = data.rect;
			var canvas = SpriteSheetUtils._workingCanvas;
			canvas.width = r.width;
			canvas.height = r.height;
			SpriteSheetUtils._workingContext.drawImage(data.image, r.x, r.y, r.width, r.height, 0, 0, r.width, r.height);
			var img = new Image();
			img.src = canvas.toDataURL("image/png");
			return img;
		};
	
		/**
		 * Merges the rgb channels of one image with the alpha channel of another. This can be used to combine a compressed
		 * JPEG image containing color data with a PNG32 monochromatic image containing alpha data. With certain types of
		 * images (those with detail that lend itself to JPEG compression) this can provide significant file size savings
		 * versus a single RGBA PNG32. This method is very fast (generally on the order of 1-2 ms to run).
		 * @method mergeAlpha
		 * @static
		 * @param {Image} rbgImage The image (or canvas) containing the RGB channels to use.
		 * @param {Image} alphaImage The image (or canvas) containing the alpha channel to use.
		 * @param {Canvas} canvas Optional. If specified, this canvas will be used and returned. If not, a new canvas will be created.
		 * @return {Canvas} A canvas with the combined image data. This can be used as a source for Bitmap or SpriteSheet.
		 * @deprecated Tools such as ImageAlpha generally provide better results. This will be moved to sandbox in the future.
		*/
		SpriteSheetUtils.mergeAlpha = function(rgbImage, alphaImage, canvas) {
			if (!canvas) { canvas = createjs.createCanvas?createjs.createCanvas():document.createElement("canvas"); }
			canvas.width = Math.max(alphaImage.width, rgbImage.width);
			canvas.height = Math.max(alphaImage.height, rgbImage.height);
			var ctx = canvas.getContext("2d");
			ctx.save();
			ctx.drawImage(rgbImage,0,0);
			ctx.globalCompositeOperation = "destination-in";
			ctx.drawImage(alphaImage,0,0);
			ctx.restore();
			return canvas;
		};
	
	
	// private static methods:
		SpriteSheetUtils._flip = function(spriteSheet, count, h, v) {
			var imgs = spriteSheet._images;
			var canvas = SpriteSheetUtils._workingCanvas;
			var ctx = SpriteSheetUtils._workingContext;
			var il = imgs.length/count;
			for (var i=0;i<il;i++) {
				var src = imgs[i];
				src.__tmp = i; // a bit hacky, but faster than doing indexOf below.
				ctx.setTransform(1,0,0,1,0,0);
				ctx.clearRect(0,0,canvas.width+1,canvas.height+1);
				canvas.width = src.width;
				canvas.height = src.height;
				ctx.setTransform(h?-1:1, 0, 0, v?-1:1, h?src.width:0, v?src.height:0);
				ctx.drawImage(src,0,0);
				var img = new Image();
				img.src = canvas.toDataURL("image/png");
				// work around a strange bug in Safari:
				img.width = src.width;
				img.height = src.height;
				imgs.push(img);
			}
	
			var frames = spriteSheet._frames;
			var fl = frames.length/count;
			for (i=0;i<fl;i++) {
				src = frames[i];
				var rect = src.rect.clone();
				img = imgs[src.image.__tmp+il*count];
	
				var frame = {image:img,rect:rect,regX:src.regX,regY:src.regY};
				if (h) {
					rect.x = img.width-rect.x-rect.width; // update rect
					frame.regX = rect.width-src.regX; // update registration point
				}
				if (v) {
					rect.y = img.height-rect.y-rect.height;  // update rect
					frame.regY = rect.height-src.regY; // update registration point
				}
				frames.push(frame);
			}
	
			var sfx = "_"+(h?"h":"")+(v?"v":"");
			var names = spriteSheet._animations;
			var data = spriteSheet._data;
			var al = names.length/count;
			for (i=0;i<al;i++) {
				var name = names[i];
				src = data[name];
				var anim = {name:name+sfx,frequency:src.frequency,next:src.next,frames:[]};
				if (src.next) { anim.next += sfx; }
				frames = src.frames;
				for (var j=0,l=frames.length;j<l;j++) {
					anim.frames.push(frames[j]+fl*count);
				}
				data[anim.name] = anim;
				names.push(anim.name);
			}
		};
	
	
	createjs.SpriteSheetUtils = SpriteSheetUtils;
	}());


/***/ },
/* 71 */
/***/ function(module, exports) {

	/*
	* Ticker
	* Visit http://createjs.com/ for documentation, updates and examples.
	*
	* Copyright (c) 2010 gskinner.com, inc.
	*
	* Permission is hereby granted, free of charge, to any person
	* obtaining a copy of this software and associated documentation
	* files (the "Software"), to deal in the Software without
	* restriction, including without limitation the rights to use,
	* copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the
	* Software is furnished to do so, subject to the following
	* conditions:
	*
	* The above copyright notice and this permission notice shall be
	* included in all copies or substantial portions of the Software.
	*
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	* OTHER DEALINGS IN THE SOFTWARE.
	*/
	
	/**
	 * @module EaselJS
	 */
	
	// namespace:
	this.createjs = this.createjs||{};
	
	(function() {
		"use strict";
	
	// constructor:
	/**
	 * The Ticker provides  a centralized tick or heartbeat broadcast at a set interval. Listeners can subscribe to the tick
	 * event to be notified when a set time interval has elapsed.
	 *
	 * Note that the interval that the tick event is called is a target interval, and may be broadcast at a slower interval
	 * during times of high CPU load. The Ticker class uses a static interface (ex. <code>Ticker.getPaused()</code>) and
	 * should not be instantiated.
	 *
	 * <h4>Example</h4>
	 *      createjs.Ticker.addEventListener("tick", handleTick);
	 *      function handleTick(event) {
	 *          // Actions carried out each frame
	 *          if (!event.paused) {
	 *              // Actions carried out when the Ticker is not paused.
	 *          }
	 *      }
	 *
	 * To update a stage every tick, the {{#crossLink "Stage"}}{{/crossLink}} instance can also be used as a listener, as
	 * it will automatically update when it receives a tick event:
	 *
	 *      createjs.Ticker.addEventListener("tick", stage);
	 *
	 * @class Ticker
	 * @uses EventDispatcher
	 * @static
	 **/
	var Ticker = function() {
		throw "Ticker cannot be instantiated.";
	};
	
	// constants:
		/**
		 * In this mode, Ticker uses the requestAnimationFrame API, but attempts to synch the ticks to target framerate. It
		 * uses a simple heuristic that compares the time of the RAF return to the target time for the current frame and
		 * dispatches the tick when the time is within a certain threshold.
		 *
		 * This mode has a higher variance for time between frames than TIMEOUT, but does not require that content be time
		 * based as with RAF while gaining the benefits of that API (screen synch, background throttling).
		 *
		 * Variance is usually lowest for framerates that are a divisor of the RAF frequency. This is usually 60, so
		 * framerates of 10, 12, 15, 20, and 30 work well.
		 *
		 * Falls back on TIMEOUT if the requestAnimationFrame API is not supported.
		 * @property RAF_SYNCHED
		 * @static
		 * @type {String}
		 * @default "synched"
		 * @readonly
		 **/
		Ticker.RAF_SYNCHED = "synched";
	
		/**
		 * In this mode, Ticker passes through the requestAnimationFrame heartbeat, ignoring the target framerate completely.
		 * Because requestAnimationFrame frequency is not deterministic, any content using this mode should be time based.
		 * You can leverage {{#crossLink "Ticker/getTime"}}{{/crossLink}} and the tick event object's "delta" properties
		 * to make this easier.
		 *
		 * Falls back on TIMEOUT if the requestAnimationFrame API is not supported.
		 * @property RAF
		 * @static
		 * @type {String}
		 * @default "raf"
		 * @readonly
		 **/
		Ticker.RAF = "raf";
	
		/**
		 * In this mode, Ticker uses the setTimeout API. This provides predictable, adaptive frame timing, but does not
		 * provide the benefits of requestAnimationFrame (screen synch, background throttling).
		 * @property RAF
		 * @static
		 * @type {String}
		 * @default "timer"
		 * @readonly
		 **/
		Ticker.TIMEOUT = "timeout";
	
	// events:
	
		/**
		 * Dispatched each tick. The event will be dispatched to each listener even when the Ticker has been paused using
		 * {{#crossLink "Ticker/setPaused"}}{{/crossLink}}.
		 *
		 * <h4>Example</h4>
		 *      createjs.Ticker.addEventListener("tick", handleTick);
		 *      function handleTick(event) {
		 *          console.log("Paused:", event.paused, event.delta);
		 *      }
		 *
		 * @event tick
		 * @param {Object} target The object that dispatched the event.
		 * @param {String} type The event type.
		 * @param {Boolean} paused Indicates whether the ticker is currently paused.
		 * @param {Number} delta The time elapsed in ms since the last tick.
		 * @param {Number} time The total time in ms since Ticker was initialized.
		 * @param {Number} runTime The total time in ms that Ticker was not paused since it was initialized. For example,
		 * 	you could determine the amount of time that the Ticker has been paused since initialization with time-runTime.
		 * @since 0.6.0
		 */
	
	// public static properties:
		/**
		 * Deprecated in favour of {{#crossLink "Ticker/timingMode"}}{{/crossLink}}, and will be removed in a future version. If true, timingMode will
		 * use {{#crossLink "Ticker/RAF_SYNCHED"}}{{/crossLink}} by default.
		 * @deprecated Deprecated in favour of {{#crossLink "Ticker/timingMode"}}{{/crossLink}}.
		 * @property useRAF
		 * @static
		 * @type {Boolean}
		 * @default false
		 **/
		Ticker.useRAF = false;
	
		/**
		 * Specifies the timing api (setTimeout or requestAnimationFrame) and mode to use. See
		 * {{#crossLink "Ticker/TIMEOUT"}}{{/crossLink}}, {{#crossLink "Ticker/RAF"}}{{/crossLink}}, and
		 * {{#crossLink "Ticker/RAF_SYNCHED"}}{{/crossLink}} for mode details.
		 * @property timingMode
		 * @static
		 * @type {String}
		 * @default Ticker.TIMEOUT
		 **/
		Ticker.timingMode = null;
	
		/**
		 * Specifies a maximum value for the delta property in the tick event object. This is useful when building time
		 * based animations and systems to prevent issues caused by large time gaps caused by background tabs, system sleep,
		 * alert dialogs, or other blocking routines. Double the expected frame duration is often an effective value
		 * (ex. maxDelta=50 when running at 40fps).
		 * 
		 * This does not impact any other values (ex. time, runTime, etc), so you may experience issues if you enable maxDelta
		 * when using both delta and other values.
		 * 
		 * If 0, there is no maximum.
		 * @property maxDelta
		 * @static
		 * @type {number}
		 * @default 0
		 */
		Ticker.maxDelta = 0;
	
	// mix-ins:
		// EventDispatcher methods:
		Ticker.removeEventListener = null;
		Ticker.removeAllEventListeners = null;
		Ticker.dispatchEvent = null;
		Ticker.hasEventListener = null;
		Ticker._listeners = null;
		createjs.EventDispatcher.initialize(Ticker); // inject EventDispatcher methods.
		Ticker._addEventListener = Ticker.addEventListener;
		Ticker.addEventListener = function() {
			!Ticker._inited&&Ticker.init();
			Ticker._addEventListener.apply(Ticker, arguments);
		};
	
	// private static properties:
		
		/** 
		 * @property _paused
		 * @type {Boolean}
		 * @protected
		 **/
		Ticker._paused = false;
	
		/**
		 * @property _inited
		 * @type {Boolean}
		 * @protected
		 **/
		Ticker._inited = false;
	
		/**
		 * @property _startTime
		 * @type {Number}
		 * @protected
		 **/
		Ticker._startTime = 0;
	
		/**
		 * @property _pausedTime
		 * @type {Number}
		 * @protected
		 **/
		Ticker._pausedTime=0;
	
		/**
		 * The number of ticks that have passed
		 * @property _ticks
		 * @type {Number}
		 * @protected
		 **/
		Ticker._ticks = 0;
	
		/**
		 * The number of ticks that have passed while Ticker has been paused
		 * @property _pausedTicks
		 * @type {Number}
		 * @protected
		 **/
		Ticker._pausedTicks = 0;
	
		/**
		 * @property _interval
		 * @type {Number}
		 * @protected
		 **/
		Ticker._interval = 50;
	
		/**
		 * @property _lastTime
		 * @type {Number}
		 * @protected
		 **/
		Ticker._lastTime = 0;
	
		/**
		 * @property _times
		 * @type {Array}
		 * @protected
		 **/
		Ticker._times = null;
	
		/**
		 * @property _tickTimes
		 * @type {Array}
		 * @protected
		 **/
		Ticker._tickTimes = null;
	
		/**
		 * Stores the timeout or requestAnimationFrame id.
		 * @property _timerId
		 * @type {Number}
		 * @protected
		 **/
		Ticker._timerId = null;
		
		/**
		 * True if currently using requestAnimationFrame, false if using setTimeout.
		 * @property _raf
		 * @type {Boolean}
		 * @protected
		 **/
		Ticker._raf = true;
	
	// public static methods:
		
		/**
		 * Starts the tick. This is called automatically when the first listener is added.
		 * @method init
		 * @static
		 **/
		Ticker.init = function() {
			if (Ticker._inited) { return; }
			Ticker._inited = true;
			Ticker._times = [];
			Ticker._tickTimes = [];
			Ticker._startTime = Ticker._getTime();
			Ticker._times.push(Ticker._lastTime = 0);
			Ticker.setInterval(Ticker._interval);
		};
		
		/**
		 * Stops the Ticker and removes all listeners. Use init() to restart the Ticker.
		 * @method reset
		 * @static
		 **/
		Ticker.reset = function() {
			if (Ticker._raf) {
				var f = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame;
				f&&f(Ticker._timerId);
			} else {
				clearTimeout(Ticker._timerId);
			}
			Ticker.removeAllEventListeners("tick");
		};
		
		/**
		 * Sets the target time (in milliseconds) between ticks. Default is 50 (20 FPS).
		 *
		 * Note actual time between ticks may be more than requested depending on CPU load.
		 * @method setInterval
		 * @static
		 * @param {Number} interval Time in milliseconds between ticks. Default value is 50.
		 **/
		Ticker.setInterval = function(interval) {
			Ticker._interval = interval;
			if (!Ticker._inited) { return; }
			Ticker._setupTick();
		};
	
		/**
		 * Returns the current target time between ticks, as set with {{#crossLink "Ticker/setInterval"}}{{/crossLink}}.
		 * @method getInterval
		 * @static
		 * @return {Number} The current target interval in milliseconds between tick events.
		 **/
		Ticker.getInterval = function() {
			return Ticker._interval;
		};
	
		/**
		 * Sets the target frame rate in frames per second (FPS). For example, with an interval of 40, <code>getFPS()</code>
		 * will return 25 (1000ms per second divided by 40 ms per tick = 25fps).
		 * @method setFPS
		 * @static
		 * @param {Number} value Target number of ticks broadcast per second.
		 **/
		Ticker.setFPS = function(value) {
			Ticker.setInterval(1000/value);
		};
	
		/**
		 * Returns the target frame rate in frames per second (FPS). For example, with an interval of 40, <code>getFPS()</code>
		 * will return 25 (1000ms per second divided by 40 ms per tick = 25fps).
		 * @method getFPS
		 * @static
		 * @return {Number} The current target number of frames / ticks broadcast per second.
		 **/
		Ticker.getFPS = function() {
			return 1000/Ticker._interval;
		};
	
		/**
		 * Returns the average time spent within a tick. This can vary significantly from the value provided by getMeasuredFPS
		 * because it only measures the time spent within the tick execution stack. 
		 * 
		 * Example 1: With a target FPS of 20, getMeasuredFPS() returns 20fps, which indicates an average of 50ms between 
		 * the end of one tick and the end of the next. However, getMeasuredTickTime() returns 15ms. This indicates that 
		 * there may be up to 35ms of "idle" time between the end of one tick and the start of the next.
		 *
		 * Example 2: With a target FPS of 30, getFPS() returns 10fps, which indicates an average of 100ms between the end of
		 * one tick and the end of the next. However, getMeasuredTickTime() returns 20ms. This would indicate that something
		 * other than the tick is using ~80ms (another script, DOM rendering, etc).
		 * @method getMeasuredTickTime
		 * @static
		 * @param {Number} [ticks] The number of previous ticks over which to measure the average time spent in a tick.
		 * Defaults to the number of ticks per second. To get only the last tick's time, pass in 1.
		 * @return {Number} The average time spent in a tick in milliseconds.
		 **/
		Ticker.getMeasuredTickTime = function(ticks) {
			var ttl=0, times=Ticker._tickTimes;
			if (times.length < 1) { return -1; }
	
			// by default, calculate average for the past ~1 second:
			ticks = Math.min(times.length, ticks||(Ticker.getFPS()|0));
			for (var i=0; i<ticks; i++) { ttl += times[i]; }
			return times/ticks;
		};
	
		/**
		 * Returns the actual frames / ticks per second.
		 * @method getMeasuredFPS
		 * @static
		 * @param {Number} [ticks] The number of previous ticks over which to measure the actual frames / ticks per second.
		 * Defaults to the number of ticks per second.
		 * @return {Number} The actual frames / ticks per second. Depending on performance, this may differ
		 * from the target frames per second.
		 **/
		Ticker.getMeasuredFPS = function(ticks) {
			var times = Ticker._times;
			if (times.length < 2) { return -1; }
	
			// by default, calculate fps for the past ~1 second:
			ticks = Math.min(times.length-1, ticks||(Ticker.getFPS()|0));
			return 1000/((times[0]-times[ticks])/ticks);
		};
	
		/**
		 * Changes the "paused" state of the Ticker, which can be retrieved by the {{#crossLink "Ticker/getPaused"}}{{/crossLink}}
		 * method, and is passed as the "paused" property of the <code>tick</code> event. When the ticker is paused, all
		 * listeners will still receive a tick event, but the <code>paused</code> property will be false.
		 *
		 * Note that in EaselJS v0.5.0 and earlier, "pauseable" listeners would <strong>not</strong> receive the tick
		 * callback when Ticker was paused. This is no longer the case.
		 *
		 * <h4>Example</h4>
		 *      createjs.Ticker.addEventListener("tick", handleTick);
		 *      createjs.Ticker.setPaused(true);
		 *      function handleTick(event) {
		 *          console.log("Paused:", event.paused, createjs.Ticker.getPaused());
		 *      }
		 *
		 * @method setPaused
		 * @static
		 * @param {Boolean} value Indicates whether to pause (true) or unpause (false) Ticker.
		 **/
		Ticker.setPaused = function(value) {
			Ticker._paused = value;
		};
	
		/**
		 * Returns a boolean indicating whether Ticker is currently paused, as set with {{#crossLink "Ticker/setPaused"}}{{/crossLink}}.
		 * When the ticker is paused, all listeners will still receive a tick event, but this value will be false.
		 *
		 * Note that in EaselJS v0.5.0 and earlier, "pauseable" listeners would <strong>not</strong> receive the tick
		 * callback when Ticker was paused. This is no longer the case.
		 *
		 * <h4>Example</h4>
		 *      createjs.Ticker.addEventListener("tick", handleTick);
		 *      createjs.Ticker.setPaused(true);
		 *      function handleTick(event) {
		 *          console.log("Paused:", createjs.Ticker.getPaused());
		 *      }
		 *
		 * @static
		 * @return {Boolean} Whether the Ticker is currently paused.
		 **/
		Ticker.getPaused = function() {
			return Ticker._paused;
		};
	
		/**
		 * Returns the number of milliseconds that have elapsed since Ticker was initialized. For example, you could use
		 * this in a time synchronized animation to determine the exact amount of time that has elapsed.
		 * @method getTime
		 * @static
		 * @param {Boolean} [runTime=false] If true only time elapsed while Ticker was not paused will be returned.
		 * If false, the value returned will be total time elapsed since the first tick event listener was added.
		 * @return {Number} Number of milliseconds that have elapsed since Ticker was initialized.
		 **/
		Ticker.getTime = function(runTime) {
			return Ticker._getTime() - Ticker._startTime - (runTime ? Ticker._pausedTime : 0);
		};
	
		/**
		 * Similar to getTime(), but returns the time included with the current (or most recent) tick event object.
		 * @method getEventTime
		 * @param runTime {Boolean} [runTime=false] If true, the runTime property will be returned instead of time.
		 * @returns {number} The time or runTime property from the most recent tick event.
		 */
		Ticker.getEventTime = function(runTime) {
			return (Ticker._lastTime || Ticker._startTime) - (runTime ? Ticker._pausedTime : 0);
		};
		
		/**
		 * Returns the number of ticks that have been broadcast by Ticker.
		 * @method getTicks
		 * @static
		 * @param {Boolean} pauseable Indicates whether to include ticks that would have been broadcast
		 * while Ticker was paused. If true only tick events broadcast while Ticker is not paused will be returned.
		 * If false, tick events that would have been broadcast while Ticker was paused will be included in the return
		 * value. The default value is false.
		 * @return {Number} of ticks that have been broadcast.
		 **/
		Ticker.getTicks = function(pauseable) {
			return  Ticker._ticks - (pauseable ?Ticker._pausedTicks : 0);
		};
	
	// private static methods:
		/**
		 * @method _handleSynch
		 * @static
		 * @protected
		 **/
		Ticker._handleSynch = function() {
			var time = Ticker._getTime() - Ticker._startTime;
			Ticker._timerId = null;
			Ticker._setupTick();
	
			// run if enough time has elapsed, with a little bit of flexibility to be early:
			if (time - Ticker._lastTime >= (Ticker._interval-1)*0.97) {
				Ticker._tick();
			}
		};
	
		/**
		 * @method _handleRAF
		 * @static
		 * @protected
		 **/
		Ticker._handleRAF = function() {
			Ticker._timerId = null;
			Ticker._setupTick();
			Ticker._tick();
		};
	
		/**
		 * @method _handleTimeout
		 * @static
		 * @protected
		 **/
		Ticker._handleTimeout = function() {
			Ticker._timerId = null;
			Ticker._setupTick();
			Ticker._tick();
		};
	
		/**
		 * @method _setupTick
		 * @static
		 * @protected
		 **/
		Ticker._setupTick = function() {
			if (Ticker._timerId != null) { return; } // avoid duplicates
	
			var mode = Ticker.timingMode||(Ticker.useRAF&&Ticker.RAF_SYNCHED);
			if (mode == Ticker.RAF_SYNCHED || mode == Ticker.RAF) {
				var f = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
				if (f) {
					Ticker._timerId = f(mode == Ticker.RAF ? Ticker._handleRAF : Ticker._handleSynch);
					Ticker._raf = true;
					return;
				}
			}
			Ticker._raf = false;
			Ticker._timerId = setTimeout(Ticker._handleTimeout, Ticker._interval);
		};
	
		/**
		 * @method _tick
		 * @static
		 * @protected
		 **/
		Ticker._tick = function() {
			var time = Ticker._getTime()-Ticker._startTime;
			var elapsedTime = time-Ticker._lastTime;
			var paused = Ticker._paused;
			
			Ticker._ticks++;
			if (paused) {
				Ticker._pausedTicks++;
				Ticker._pausedTime += elapsedTime;
			}
			Ticker._lastTime = time;
			
			if (Ticker.hasEventListener("tick")) {
				var event = new createjs.Event("tick");
				var maxDelta = Ticker.maxDelta;
				event.delta = (maxDelta && elapsedTime > maxDelta) ? maxDelta : elapsedTime;
				event.paused = paused;
				event.time = time;
				event.runTime = time-Ticker._pausedTime;
				Ticker.dispatchEvent(event);
			}
			
			Ticker._tickTimes.unshift(Ticker._getTime()-time);
			while (Ticker._tickTimes.length > 100) { Ticker._tickTimes.pop(); }
	
			Ticker._times.unshift(time);
			while (Ticker._times.length > 100) { Ticker._times.pop(); }
		};
	
		/**
		 * @method _getTime
		 * @static
		 * @protected
		 **/
		var now = window.performance && (performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow);
		Ticker._getTime = function() {
			return (now&&now.call(performance))||(new Date().getTime());
		};
	
	createjs.Ticker = Ticker;
	}());


/***/ },
/* 72 */
/***/ function(module, exports) {

	/*
	* UID
	* Visit http://createjs.com/ for documentation, updates and examples.
	*
	* Copyright (c) 2010 gskinner.com, inc.
	*
	* Permission is hereby granted, free of charge, to any person
	* obtaining a copy of this software and associated documentation
	* files (the "Software"), to deal in the Software without
	* restriction, including without limitation the rights to use,
	* copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the
	* Software is furnished to do so, subject to the following
	* conditions:
	*
	* The above copyright notice and this permission notice shall be
	* included in all copies or substantial portions of the Software.
	*
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	* OTHER DEALINGS IN THE SOFTWARE.
	*/
	
	/**
	 * @module EaselJS
	 */
	
	// namespace:
	this.createjs = this.createjs||{};
	
	(function() {
		"use strict";
	
	/**
	 * Global utility for generating sequential unique ID numbers. The UID class uses a static interface (ex. <code>UID.get()</code>)
	 * and should not be instantiated.
	 * @class UID
	 * @static
	 **/
	var UID = function() {
		throw "UID cannot be instantiated";
	}
	
		/**
		 * @property _nextID
		 * @type Number
		 * @protected
		 **/
		UID._nextID = 0;
	
		/**
		 * Returns the next unique id.
		 * @method get
		 * @return {Number} The next unique id
		 * @static
		 **/
		UID.get = function() {
			return UID._nextID++;
		}
	
	createjs.UID = UID;
	}());


/***/ },
/* 73 */
/***/ function(module, exports) {

	/**
	 * @module EaselJS
	 */
	this.createjs = this.createjs || {};
	
	(function() {
		"use strict";
	
		/**
		 * Static class holding library specific information such as the version and buildDate of
		 * the library.
		 * @class EaselJS
		 **/
		var s = createjs.EaselJS = createjs.EaselJS || {};
	
		/**
		 * The version string for this release.
		 * @property version
		 * @type String
		 * @static
		 **/
		s.version = /*version*/"0.7.0"; // injected by build process
	
		/**
		 * The build date for this release in UTC format.
		 * @property buildDate
		 * @type String
		 * @static
		 **/
		s.buildDate = /*date*/"Wed, 25 Sep 2013 17:09:35 GMT"; // injected by build process
	
	})();


/***/ },
/* 74 */
/***/ function(module, exports) {

	this.createjs = this.createjs || {};
	
	(function() {
		"use strict";
	
		/**
		 * Static class holding library specific information such as the version and buildDate of
		 * the library.
		 **/
		var s = createjs.MovieClip = createjs.MovieClip || {};
	
		/**
		 * The version string for this release.
		 * @property version
		 * @for MovieClip
		 * @type String
		 * @static
		 **/
		s.version = /*version*/"0.7.0"; // injected by build process
	
		/**
		 * The build date for this release in UTC format.
		 * @property buildDate
		 * @for MovieClip
		 * @type String
		 * @static
		 **/
		s.buildDate = /*date*/"Wed, 25 Sep 2013 17:09:35 GMT"; // injected by build process
	
	})();


/***/ },
/* 75 */
/***/ function(module, exports) {

	/*
	* CSSPlugin
	* Visit http://createjs.com/ for documentation, updates and examples.
	*
	* Copyright (c) 2010 gskinner.com, inc.
	* 
	* Permission is hereby granted, free of charge, to any person
	* obtaining a copy of this software and associated documentation
	* files (the "Software"), to deal in the Software without
	* restriction, including without limitation the rights to use,
	* copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the
	* Software is furnished to do so, subject to the following
	* conditions:
	* 
	* The above copyright notice and this permission notice shall be
	* included in all copies or substantial portions of the Software.
	* 
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	* OTHER DEALINGS IN THE SOFTWARE.
	*/
	
	// namespace:
	this.createjs = this.createjs||{};
	
	(function() {
	/**
	 * A TweenJS plugin for working with numeric CSS string properties (ex. top, left). To use simply install after
	 * TweenJS has loaded:
	 *
	 *      createjs.CSSPlugin.install();
	 *
	 * You can adjust the CSS properties it will work with by modifying the <code>cssSuffixMap</code> property. Currently,
	 * the top, left, bottom, right, width, height have a "px" suffix appended.
	 * @class CSSPlugin
	 * @constructor
	 **/
	var CSSPlugin = function() {
	  throw("CSSPlugin cannot be instantiated.")
	}
		
	// static interface:
		/** 
		 * Defines the default suffix map for CSS tweens. This can be overridden on a per tween basis by specifying a
		 * cssSuffixMap value for the individual tween. The object maps CSS property names to the suffix to use when
		 * reading or setting those properties. For example a map in the form {top:"px"} specifies that when tweening
		 * the "top" CSS property, it should use the "px" suffix (ex. target.style.top = "20.5px"). This only applies
		 * to tweens with the "css" config property set to true.
		 * @property cssSuffixMap
		 * @type Object
		 * @static
		 **/
		CSSPlugin.cssSuffixMap = {top:"px",left:"px",bottom:"px",right:"px",width:"px",height:"px",opacity:""};
		
		/**
		 * @property priority
		 * @protected
		 * @static
		 **/
		CSSPlugin.priority = -100; // very low priority, should run last
	
		/**
		 * Installs this plugin for use with TweenJS. Call this once after TweenJS is loaded to enable this plugin.
		 * @method install
		 * @static
		 **/
		CSSPlugin.install = function() {
			var arr = [], map = CSSPlugin.cssSuffixMap;
			for (var n in map) { arr.push(n); }
			createjs.Tween.installPlugin(CSSPlugin, arr);
		}
		
		
		/**
		 * @method init
		 * @protected
		 * @static
		 **/
		CSSPlugin.init = function(tween, prop, value) {
			var sfx0,sfx1,style,map = CSSPlugin.cssSuffixMap;
			if ((sfx0 = map[prop]) == null || !(style = tween.target.style)) { return value; }
			var str = style[prop];
			if (!str) { return 0; } // no style set.
			var i = str.length-sfx0.length;
			if ((sfx1 = str.substr(i)) != sfx0) {
				throw("CSSPlugin Error: Suffixes do not match. ("+sfx0+":"+sfx1+")");
			} else {
				return parseInt(str.substr(0,i));
			}
		}
		
		/**
		 * @method step
		 * @protected
		 * @static
		 **/
		CSSPlugin.step = function(tween, prop, startValue, endValue, injectProps) {
			// unused
		}
		
		
		/**
		 * @method tween
		 * @protected
		 * @static
		 **/
		CSSPlugin.tween = function(tween, prop, value, startValues, endValues, ratio, wait, end) {
			var style,map = CSSPlugin.cssSuffixMap;
			if (map[prop] == null || !(style = tween.target.style)) { return value; }
			style[prop] = value+map[prop];
			return createjs.Tween.IGNORE;
		}
	
	// public properties:
	
	// private properties:
		
	// constructor:
		
	// public methods:
	
	
	// private methods:
		
	createjs.CSSPlugin = CSSPlugin;
	}());


/***/ },
/* 76 */
/***/ function(module, exports) {

	/*
	* Ease
	* Visit http://createjs.com/ for documentation, updates and examples.
	*
	* Copyright (c) 2010 gskinner.com, inc.
	* 
	* Permission is hereby granted, free of charge, to any person
	* obtaining a copy of this software and associated documentation
	* files (the "Software"), to deal in the Software without
	* restriction, including without limitation the rights to use,
	* copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the
	* Software is furnished to do so, subject to the following
	* conditions:
	* 
	* The above copyright notice and this permission notice shall be
	* included in all copies or substantial portions of the Software.
	* 
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	* OTHER DEALINGS IN THE SOFTWARE.
	*/
	
	// namespace:
	this.createjs = this.createjs||{};
	
	(function() {
	
	// constructor:
	/**
	 * The Ease class provides a collection of easing functions for use with TweenJS. It does not use the standard 4 param
	 * easing signature. Instead it uses a single param which indicates the current linear ratio (0 to 1) of the tween.
	 *
	 * Most methods on Ease can be passed directly as easing functions:
	 *
	 *      Tween.get(target).to({x:100}, 500, Ease.linear);
	 *
	 * However, methods beginning with "get" will return an easing function based on parameter values:
	 *
	 *      Tween.get(target).to({y:200}, 500, Ease.getPowIn(2.2));
	 *
	 * Please see the <a href="http://www.createjs.com/#!/TweenJS/demos/sparkTable">spark table demo</a> for an overview
	 * of the different ease types on <a href="http://tweenjs.com">TweenJS.com</a>.
	 *
	 * <i>Equations derived from work by Robert Penner.</i>
	 * @class Ease
	 * @static
	 **/
	var Ease = function() {
		throw "Ease cannot be instantiated.";
	}
	
	// public static methods:
		/** 
		 * @method linear
		 * @static
		 **/
		Ease.linear = function(t) { return t; }
		
		/** 
		 * Identical to linear.
		 * @method none
		 * @static
		 **/
		Ease.none = Ease.linear;
		
		/** 
		 * Mimics the simple -100 to 100 easing in Flash Pro.
		 * @method get
		 * @param amount A value from -1 (ease in) to 1 (ease out) indicating the strength and direction of the ease.
		 * @static
		 **/
		Ease.get = function(amount) {
			if (amount < -1) { amount = -1; }
			if (amount > 1) { amount = 1; }
			return function(t) {
				if (amount==0) { return t; }
				if (amount<0) { return t*(t*-amount+1+amount); }
				return t*((2-t)*amount+(1-amount));
			}
		}
		
		/** 
		 * Configurable exponential ease.
		 * @method getPowIn
		 * @param pow The exponent to use (ex. 3 would return a cubic ease).
		 * @static
		 **/
		Ease.getPowIn = function(pow) {
			return function(t) {
				return Math.pow(t,pow);
			}
		}
		
		
		/** 
		 * Configurable exponential ease.
		 * @method getPowOut
		 * @param pow The exponent to use (ex. 3 would return a cubic ease).
		 * @static
		 **/
		Ease.getPowOut = function(pow) {
			return function(t) {
				return 1-Math.pow(1-t,pow);
			}
		}
		
		
		/** 
		 * Configurable exponential ease.
		 * @method getPowInOut
		 * @param pow The exponent to use (ex. 3 would return a cubic ease).
		 * @static
		 **/
		Ease.getPowInOut = function(pow) {
			return function(t) {
				if ((t*=2)<1) return 0.5*Math.pow(t,pow);
				return 1-0.5*Math.abs(Math.pow(2-t,pow));
			}
		}
		
		
		/** 
		 * @method quadIn
		 * @static
		 **/
		Ease.quadIn = Ease.getPowIn(2);
		/** 
		 * @method quadOut
		 * @static
		 **/
		Ease.quadOut = Ease.getPowOut(2);
		/** 
		 * @method quadInOut
		 * @static
		 **/
		Ease.quadInOut = Ease.getPowInOut(2);
		
		
		/** 
		 * @method cubicIn
		 * @static
		 **/
		Ease.cubicIn = Ease.getPowIn(3);
		/** 
		 * @method cubicOut
		 * @static
		 **/
		Ease.cubicOut = Ease.getPowOut(3);
		/** 
		 * @method cubicInOut
		 * @static
		 **/
		Ease.cubicInOut = Ease.getPowInOut(3);
		
		
		/** 
		 * @method quartIn
		 * @static
		 **/
		Ease.quartIn = Ease.getPowIn(4);
		/** 
		 * @method quartOut
		 * @static
		 **/
		Ease.quartOut = Ease.getPowOut(4);
		/** 
		 * @method quartInOut
		 * @static
		 **/
		Ease.quartInOut = Ease.getPowInOut(4);
		
		
		/** 
		 * @method quintIn
		 * @static
		 **/
		Ease.quintIn = Ease.getPowIn(5);
		/** 
		 * @method quintOut
		 * @static
		 **/
		Ease.quintOut = Ease.getPowOut(5);
		/** 
		 * @method quintInOut
		 * @static
		 **/
		Ease.quintInOut = Ease.getPowInOut(5);
		
		
		/** 
		 * @method sineIn
		 * @static
		 **/
		Ease.sineIn = function(t) {
			return 1-Math.cos(t*Math.PI/2);
		}
		
		/** 
		 * @method sineOut
		 * @static
		 **/
		Ease.sineOut = function(t) {
			return Math.sin(t*Math.PI/2);
		}
		
		/** 
		 * @method sineInOut
		 * @static
		 **/
		Ease.sineInOut = function(t) {
			return -0.5*(Math.cos(Math.PI*t) - 1)
		}
		
		
		/** 
		 * Configurable "back in" ease.
		 * @method getBackIn
		 * @param amount The strength of the ease.
		 * @static
		 **/
		Ease.getBackIn = function(amount) {
			return function(t) {
				return t*t*((amount+1)*t-amount);
			}
		}
		/** 
		 * @method backIn
		 * @static
		 **/
		Ease.backIn = Ease.getBackIn(1.7);
		
		/** 
		 * Configurable "back out" ease.
		 * @method getBackOut
		 * @param amount The strength of the ease.
		 * @static
		 **/
		Ease.getBackOut = function(amount) {
			return function(t) {
				return (--t*t*((amount+1)*t + amount) + 1);
			}
		}
		/** 
		 * @method backOut
		 * @static
		 **/
		Ease.backOut = Ease.getBackOut(1.7);
		
		/** 
		 * Configurable "back in out" ease.
		 * @method getBackInOut
		 * @param amount The strength of the ease.
		 * @static
		 **/
		Ease.getBackInOut = function(amount) {
			amount*=1.525;
			return function(t) {
				if ((t*=2)<1) return 0.5*(t*t*((amount+1)*t-amount));
				return 0.5*((t-=2)*t*((amount+1)*t+amount)+2);
			}
		}
		/** 
		 * @method backInOut
		 * @static
		 **/
		Ease.backInOut = Ease.getBackInOut(1.7);
		
		
		/** 
		 * @method circIn
		 * @static
		 **/
		Ease.circIn = function(t) {
			return -(Math.sqrt(1-t*t)- 1);
		}
		
		/** 
		 * @method circOut
		 * @static
		 **/
		Ease.circOut = function(t) {
			return Math.sqrt(1-(--t)*t);
		}
		
		/** 
		 * @method circInOut
		 * @static
		 **/
		Ease.circInOut = function(t) {
			if ((t*=2) < 1) return -0.5*(Math.sqrt(1-t*t)-1);
			return 0.5*(Math.sqrt(1-(t-=2)*t)+1);
		}
		
		/** 
		 * @method bounceIn
		 * @static
		 **/
		Ease.bounceIn = function(t) {
			return 1-Ease.bounceOut(1-t);
		}
		
		/** 
		 * @method bounceOut
		 * @static
		 **/
		Ease.bounceOut = function(t) {
			if (t < 1/2.75) {
				return (7.5625*t*t);
			} else if (t < 2/2.75) {
				return (7.5625*(t-=1.5/2.75)*t+0.75);
			} else if (t < 2.5/2.75) {
				return (7.5625*(t-=2.25/2.75)*t+0.9375);
			} else {
				return (7.5625*(t-=2.625/2.75)*t +0.984375);
			}
		}
		
		/** 
		 * @method bounceInOut
		 * @static
		 **/
		Ease.bounceInOut = function(t) {
			if (t<0.5) return Ease.bounceIn (t*2) * .5;
			return Ease.bounceOut(t*2-1)*0.5+0.5;
		}
		
		
		/** 
		 * Configurable elastic ease.
		 * @method getElasticIn
		 * @param amplitude
		 * @param period
		 * @static
		 **/
		Ease.getElasticIn = function(amplitude,period) {
			var pi2 = Math.PI*2;
			return function(t) {
				if (t==0 || t==1) return t;
				var s = period/pi2*Math.asin(1/amplitude);
				return -(amplitude*Math.pow(2,10*(t-=1))*Math.sin((t-s)*pi2/period));
			}
		}
		/** 
		 * @method elasticIn
		 * @static
		 **/
		Ease.elasticIn = Ease.getElasticIn(1,0.3);
		
		/** 
		 * Configurable elastic ease.
		 * @method getElasticOut
		 * @param amplitude
		 * @param period
		 * @static
		 **/
		Ease.getElasticOut = function(amplitude,period) {
			var pi2 = Math.PI*2;
			return function(t) {
				if (t==0 || t==1) return t;
				var s = period/pi2 * Math.asin(1/amplitude);
				return (amplitude*Math.pow(2,-10*t)*Math.sin((t-s)*pi2/period )+1);
			}
		}
		/** 
		 * @method elasticOut
		 * @static
		 **/
		Ease.elasticOut = Ease.getElasticOut(1,0.3);
		
		/** 
		 * Configurable elastic ease.
		 * @method getElasticInOut
		 * @param amplitude
		 * @param period
		 * @static
		 **/
		Ease.getElasticInOut = function(amplitude,period) {
			var pi2 = Math.PI*2;
			return function(t) {
				var s = period/pi2 * Math.asin(1/amplitude);
				if ((t*=2)<1) return -0.5*(amplitude*Math.pow(2,10*(t-=1))*Math.sin( (t-s)*pi2/period ));
				return amplitude*Math.pow(2,-10*(t-=1))*Math.sin((t-s)*pi2/period)*0.5+1;
			}
		}
		/** 
		 * @method elasticInOut
		 * @static
		 **/
		Ease.elasticInOut = Ease.getElasticInOut(1,0.3*1.5);
		
	createjs.Ease = Ease;
	}());


/***/ },
/* 77 */
/***/ function(module, exports) {

	/*
	 * MotionGuidePlugin
	 * Visit http://createjs.com/ for documentation, updates and examples.
	 *
	 * Copyright (c) 2010 gskinner.com, inc.
	 *
	 * Permission is hereby granted, free of charge, to any person
	 * obtaining a copy of this software and associated documentation
	 * files (the "Software"), to deal in the Software without
	 * restriction, including without limitation the rights to use,
	 * copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the
	 * Software is furnished to do so, subject to the following
	 * conditions:
	 *
	 * The above copyright notice and this permission notice shall be
	 * included in all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	 * OTHER DEALINGS IN THE SOFTWARE.
	 */
	
	// namespace:
	this.createjs = this.createjs||{};
	
	(function() {
		/**
		 * A TweenJS plugin for working with motion guides.
		 *
		 * To use, install the plugin after TweenJS has loaded. Next tween the 'guide' property with an object as detailed below.
		 *
		 *       createjs.MotionGuidePlugin.install();
		 *
		 * <h4>Example</h4>
		 *
		 *      // Using a Motion Guide
		 *	    Tween.get(target).to({guide:{ path:[0,0, 0,200,200,200, 200,0,0,0] }},7000);
		 *	    // Visualizing the line
		 *	    graphics.moveTo(0,0).curveTo(0,200,200,200).curveTo(200,0,0,0);
		 *
		 * Each path needs pre-computation to ensure there's fast performance. Because of the pre-computation there's no
		 * built in support for path changes mid tween. These are the Guide Object's properties:<UL>
		 *      <LI> path: Required, Array : The x/y points used to draw the path with a moveTo and 1 to n curveTo calls.</LI>
		 *      <LI> start: Optional, 0-1 : Initial position, default 0 except for when continuing along the same path.</LI>
		 *      <LI> end: Optional, 0-1 : Final position, default 1 if not specified.</LI>
		 *      <LI> orient: Optional, bool : Set the target's rotation parallel to the curve at its position.</LI>
		 * </UL>
		 * Guide objects should not be shared between tweens even if all properties are identical, the library stores
		 * information on these objects in the background and sharing them can cause unexpected behaviour. Values
		 * outside 0-1 range of tweens will be a "best guess" from the appropriate part of the defined curve.
		 *
		 * @class MotionGuidePlugin
		 * @constructor
		 **/
		var MotionGuidePlugin = function() {
			throw("MotionGuidePlugin cannot be instantiated.")
		};
	
		// static interface:
		/**
		 * @property priority
		 * @protected
		 * @static
		 **/
		MotionGuidePlugin.priority = 0; // high priority, should run sooner
	
		/**
		 * Installs this plugin for use with TweenJS. Call this once after TweenJS is loaded to enable this plugin.
		 * @method install
		 * @static
		 **/
		MotionGuidePlugin.install = function() {
			createjs.Tween.installPlugin(MotionGuidePlugin, ["guide", "x", "y", "rotation"]);
			return createjs.Tween.IGNORE;
		};
	
		/**
		 * @method init
		 * @protected
		 * @static
		 **/
		MotionGuidePlugin.init = function(tween, prop, value) {
			var target = tween.target;
			if(!target.hasOwnProperty("x")){ target.x = 0; }
			if(!target.hasOwnProperty("y")){ target.y = 0; }
			if(!target.hasOwnProperty("rotation")){ target.rotation = 0; }
			return prop=="guide"?null:value;
		};
	
		/**
		 * @method step
		 * @protected
		 * @static
		 **/
		MotionGuidePlugin.step = function(tween, prop, startValue, endValue, injectProps) {
			if(prop != "guide"){ return endValue; }
			var temp, data = endValue;
			if(!data.hasOwnProperty("path")){ data.path = []; }
			var path = data.path;
			if(!data.hasOwnProperty("end")){ data.end = 1; }
			if(!data.hasOwnProperty("start")){
				data.start = (startValue&&startValue.hasOwnProperty("end")&&startValue.path===path)?startValue.end:0;
			}
			if(data.hasOwnProperty("_segments") && data._length){ return endValue; }
			var l = path.length;
			var accuracy = 10;		// Adjust to improve line following precision but sacrifice performance (# of seg)
			if(l >= 6 && (l-2) % 4 == 0){	// Enough points && contains correct number per entry ignoring start
				data._segments = [];
				data._length = 0;
				for(var i=2; i<l; i+=4){
					var sx = path[i-2], sy = path[i-1];
					var cx = path[i+0], cy = path[i+1];
					var ex = path[i+2], ey = path[i+3];
					var oldX = sx, oldY = sy;
					var tempX, tempY, total = 0;
					var sublines = [];
					for(var j=1; j<=accuracy; j++){
						var t = j/accuracy;
						var inv = 1 - t;
						tempX = inv*inv * sx + 2 * inv * t * cx + t*t * ex;
						tempY = inv*inv * sy + 2 * inv * t * cy + t*t * ey;
						total += sublines[sublines.push(Math.sqrt((temp=tempX-oldX)*temp + (temp=tempY-oldY)*temp))-1];
						oldX = tempX;
						oldY = tempY;
					}
					data._segments.push(total);
					data._segments.push(sublines);
					data._length += total;
				}
			} else {
				throw("invalid 'path' data, please see documentation for valid paths");
			}
	
			temp = data.orient;
			data.orient = false;
			MotionGuidePlugin.calc(data, data.end, injectProps);
			data.orient = temp;
			return endValue;
		};
	
		/**
		 * @method tween
		 * @protected
		 * @static
		 **/
		MotionGuidePlugin.tween = function(tween, prop, value, startValues, endValues, ratio, wait, end) {
			var data = endValues.guide;
			if(data == undefined || data === startValues.guide){ return value; }
			if(data.lastRatio != ratio){
				// first time through so calculate what I need to
				var t = ((data.end-data.start)*(wait?data.end:ratio)+data.start);
				MotionGuidePlugin.calc(data, t, tween.target);
				if(data.orient){ tween.target.rotation += startValues.rotation||0; }
				data.lastRatio = ratio;
			}
			if(!data.orient && prop == "rotation"){ return value; }
			return tween.target[prop];
		};
	
		/**
		 * Determine the appropriate x/y/rotation information about a path for a given ratio along the path.
		 * Assumes a path object with all optional parameters specified.
		 * @param data Data object you would pass to the "guide:" property in a Tween
		 * @param ratio 0-1 Distance along path, values outside 0-1 are "best guess"
		 * @param target Object to copy the results onto, will use a new object if not supplied.
		 * @return {Object} The target object or a new object w/ the tweened properties
		 * @static
		 */
		MotionGuidePlugin.calc = function(data, ratio, target) {
			if(data._segments == undefined){ MotionGuidePlugin.validate(data); }
			if(target == undefined){ target = {x:0, y:0, rotation:0}; }
			var seg = data._segments;
			var path = data.path;
	
			// find segment
			var pos = data._length * ratio;
			var cap = seg.length - 2;
			var n = 0;
			while(pos > seg[n] && n < cap){
				pos -= seg[n];
				n+=2;
			}
	
			// find subline
			var sublines = seg[n+1];
			var i = 0;
			cap = sublines.length-1;
			while(pos > sublines[i] && i < cap){
				pos -= sublines[i];
				i++;
			}
			var t = (i/++cap)+(pos/(cap*sublines[i]));
	
			// find x/y
			n = (n*2)+2;
			var inv = 1 - t;
			target.x = inv*inv * path[n-2] + 2 * inv * t * path[n+0] + t*t * path[n+2];
			target.y = inv*inv * path[n-1] + 2 * inv * t * path[n+1] + t*t * path[n+3];
	
			// orientation
			if(data.orient){
				target.rotation = 57.2957795 * Math.atan2(
					(path[n+1]-path[n-1])*inv + (path[n+3]-path[n+1])*t,
					(path[n+0]-path[n-2])*inv + (path[n+2]-path[n+0])*t);
			}
	
			return target;
		};
	
		// public properties:
	
		// private properties:
	
		// constructor:
	
		// public methods:
	
		// private methods:
	
		createjs.MotionGuidePlugin = MotionGuidePlugin;
	}());


/***/ },
/* 78 */
/***/ function(module, exports) {

	/*
	* Timeline
	* Visit http://createjs.com/ for documentation, updates and examples.
	*
	* Copyright (c) 2010 gskinner.com, inc.
	* 
	* Permission is hereby granted, free of charge, to any person
	* obtaining a copy of this software and associated documentation
	* files (the "Software"), to deal in the Software without
	* restriction, including without limitation the rights to use,
	* copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the
	* Software is furnished to do so, subject to the following
	* conditions:
	* 
	* The above copyright notice and this permission notice shall be
	* included in all copies or substantial portions of the Software.
	* 
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	* OTHER DEALINGS IN THE SOFTWARE.
	*/
	
	// namespace:
	this.createjs = this.createjs||{};
	
	(function() {
	
	/**
	 * The Timeline class synchronizes multiple tweens and allows them to be controlled as a group. Please note that if a
	 * timeline is looping, the tweens on it may appear to loop even if the "loop" property of the tween is false.
	 * @class Timeline
	 * @param tweens An array of Tweens to add to this timeline. See addTween for more info.
	 * @param labels An object defining labels for using gotoAndPlay/Stop. See {{#crossLink "Timeline/setLabels"}}{{/crossLink}}
	 * for details.
	 * @param props The configuration properties to apply to this tween instance (ex. {loop:true}). All properties default to
	 * false. Supported props are:<UL>
	 *    <LI> loop: sets the loop property on this tween.</LI>
	 *    <LI> useTicks: uses ticks for all durations instead of milliseconds.</LI>
	 *    <LI> ignoreGlobalPause: sets the ignoreGlobalPause property on this tween.</LI>
	 *    <LI> paused: indicates whether to start the tween paused.</LI>
	 *    <LI> position: indicates the initial position for this timeline.</LI>
	 *    <LI> onChanged: specifies an onChange handler for this timeline.</LI>
	 * </UL>
	 * @constructor
	 **/
	var Timeline = function(tweens, labels, props) {
	  this.initialize(tweens, labels, props);
	}
	var p = Timeline.prototype;
	
	// public properties:
		
		/**
		 * Causes this timeline to continue playing when a global pause is active.
		 * @property ignoreGlobalPause
		 * @type Boolean
		 **/
		p.ignoreGlobalPause = false;
		
		/**
		 * Read-only property specifying the total duration of this timeline in milliseconds (or ticks if useTicks is true).
		 * This value is usually automatically updated as you modify the timeline. See updateDuration for more information.
		 * @property duration
		 * @type Number
		 **/
		p.duration = 0;
		
		/**
		 * If true, the timeline will loop when it reaches the end. Can be set via the props param.
		 * @property loop
		 * @type Boolean
		 **/
		p.loop = false;
		
		/**
		 * Called, with a single parameter referencing this timeline instance, whenever the timeline's position changes.
		 * @property onChange
		 * @type Function
		 **/
		p.onChange = null;
		
		/**
		 * Read-only. The current normalized position of the timeline. This will always be a value between 0 and duration.
		 * Changing this property directly will have no effect.
		 * @property position
		 * @type Object
		 **/
		p.position = null;
	
	// private properties:
		
		/**
		 * @property _paused
		 * @type Boolean
		 * @protected
		 **/
		p._paused = false;
		
		/**
		 * @property _tweens
		 * @type Array[Tween]
		 * @protected
		 **/
		p._tweens = null;
		
		/**
		 * @property _labels
		 * @type Array[String]
		 * @protected
		 **/
		p._labels = null;
		
		/**
		 * @property _prevPosition
		 * @type Number
		 * @protected
		 **/
		p._prevPosition = 0;
		
		/**
		 * @property _prevPos
		 * @type Number
		 * @protected
		 **/
		p._prevPos = -1;
		
		/**
		 * @property _useTicks
		 * @type Boolean
		 * @protected
		 **/
		p._useTicks = false;
		
	// constructor:
		/** 
		* Initialization method.
		* @method initialize
		* @protected
		**/
		p.initialize = function(tweens, labels, props) {
			this._tweens = [];
			if (props) {
				this._useTicks = props.useTicks;
				this.loop = props.loop;
				this.ignoreGlobalPause = props.ignoreGlobalPause;
				this.onChange = props.onChange;
			}
			if (tweens) { this.addTween.apply(this, tweens); }
			this.setLabels(labels);
			if (props&&props.paused) { this._paused=true; }
			else { createjs.Tween._register(this,true); }
			if (props&&props.position!=null) { this.setPosition(props.position, createjs.Tween.NONE); }
		}
		
	// public methods:
		/** 
		 * Adds one or more tweens (or timelines) to this timeline. The tweens will be paused (to remove them from the normal ticking system)
		 * and managed by this timeline. Adding a tween to multiple timelines will result in unexpected behaviour.
		 * @method addTween
		 * @param tween The tween(s) to add. Accepts multiple arguments.
		 * @return Tween The first tween that was passed in.
		 **/
		p.addTween = function(tween) {
			var l = arguments.length;
			if (l > 1) {
				for (var i=0; i<l; i++) { this.addTween(arguments[i]); }
				return arguments[0];
			} else if (l == 0) { return null; }
			this.removeTween(tween);
			this._tweens.push(tween);
			tween.setPaused(true);
			tween._paused = false;
			tween._useTicks = this._useTicks;
			if (tween.duration > this.duration) { this.duration = tween.duration; }
			if (this._prevPos >= 0) { tween.setPosition(this._prevPos, createjs.Tween.NONE); }
			return tween;
		}
	
		/** 
		 * Removes one or more tweens from this timeline.
		 * @method removeTween
		 * @param tween The tween(s) to remove. Accepts multiple arguments.
		 * @return Boolean Returns true if all of the tweens were successfully removed.
		 **/
		p.removeTween = function(tween) {
			var l = arguments.length;
			if (l > 1) {
				var good = true;
				for (var i=0; i<l; i++) { good = good && this.removeTween(arguments[i]); }
				return good;
			} else if (l == 0) { return false; }
			var index = this._tweens.indexOf(tween);
			if (index != -1) {
				this._tweens.splice(index,1);
				if (tween.duration >= this.duration) { this.updateDuration(); }
				return true;
			} else { return false; }
		}
		
		/** 
		 * Adds a label that can be used with gotoAndPlay/Stop.
		 * @method addLabel
		 * @param label The label name.
		 * @param position The position this label represents.
		 **/
		p.addLabel = function(label, position) {
			this._labels[label] = position;
		}
	
		/** 
		 * Defines labels for use with gotoAndPlay/Stop. Overwrites any previously set labels.
		 * @method addLabel
		 * @param o An object defining labels for using gotoAndPlay/Stop in the form {labelName:time} where time is in ms (or ticks if useTicks is true).
		 **/
		p.setLabels = function(o) {
			this._labels = o ?  o : {};
		}
		
		/** 
		 * Unpauses this timeline and jumps to the specified position or label.
		 * @method gotoAndPlay
		 * @param positionOrLabel The position in milliseconds (or ticks if useTicks is true) or label to jump to.
		 **/
		p.gotoAndPlay = function(positionOrLabel) {
			this.setPaused(false);
			this._goto(positionOrLabel);
		}
		
		/** 
		 * Pauses this timeline and jumps to the specified position or label.
		 * @method gotoAndStop
		 * @param positionOrLabel The position in milliseconds (or ticks if useTicks is true) or label to jump to.
		 **/
		p.gotoAndStop = function(positionOrLabel) {
			this.setPaused(true);
			this._goto(positionOrLabel);
		}
		
		/** 
		 * Advances the timeline to the specified position.
		 * @method setPosition
		 * @param value The position to seek to in milliseconds (or ticks if useTicks is true).
		 * @param actionsMode Optional parameter specifying how actions are handled. See Tween.setPosition for more details.
		 * @return Boolean Returns true if the timeline is complete (ie. the full timeline has run & loop is false).
		 **/
		p.setPosition = function(value, actionsMode) {
			if (value < 0) { value = 0; }
			var t = this.loop ? value%this.duration : value;
			var end = !this.loop && value >= this.duration;
			if (t == this._prevPos) { return end; }
			this._prevPosition = value;
			this.position = this._prevPos = t; // in case an action changes the current frame.
			for (var i=0, l=this._tweens.length; i<l; i++) {
				this._tweens[i].setPosition(t, actionsMode);
				if (t != this._prevPos) { return false; } // an action changed this timeline's position.
			}
			if (end) { this.setPaused(true); }
			this.onChange&&this.onChange(this);
			return end;
		}
		
		/** 
		 * Pauses or plays this timeline.
		 * @method setPaused
		 * @param value Indicates whether the tween should be paused (true) or played (false).
		 **/
		p.setPaused = function(value) {
			this._paused = !!value;
			createjs.Tween._register(this, !value);
		}
		
		/** 
		 * Recalculates the duration of the timeline.
		 * The duration is automatically updated when tweens are added or removed, but this method is useful 
		 * if you modify a tween after it was added to the timeline.
		 * @method updateDuration
		 **/
		p.updateDuration = function() {
			this.duration = 0;
			for (var i=0,l=this._tweens.length; i<l; i++) {
				var tween = this._tweens[i];
				if (tween.duration > this.duration) { this.duration = tween.duration; }
			}
		}
		
		/** 
		 * Advances this timeline by the specified amount of time in milliseconds (or ticks if useTicks is true).
		 * This is normally called automatically by the Tween engine (via Tween.tick), but is exposed for advanced uses.
		 * @method tick
		 * @param delta The time to advance in milliseconds (or ticks if useTicks is true).
		 **/
		p.tick = function(delta) {
			this.setPosition(this._prevPosition+delta);
		}
		 
		/** 
		 * If a numeric position is passed, it is returned unchanged. If a string is passed, the position of the
		 * corresponding frame label will be returned, or null if a matching label is not defined.
		 * @method resolve
		 * @param positionOrLabel A numeric position value or label string.
		 **/
		p.resolve = function(positionOrLabel) {
			var pos = parseFloat(positionOrLabel);
			if (isNaN(pos)) { pos = this._labels[positionOrLabel]; }
			return pos;
		}
	
		/**
		* Returns a string representation of this object.
		* @method toString
		* @return {String} a string representation of the instance.
		**/
		p.toString = function() {
			return "[Timeline]";
		}
		
		/**
		 * @method clone
		 * @protected
		 **/
		p.clone = function() {
			throw("Timeline can not be cloned.")
		}
		
	// private methods:
		/**
		 * @method _goto
		 * @protected
		 **/
		p._goto = function(positionOrLabel) {
			var pos = this.resolve(positionOrLabel);
			if (pos != null) { this.setPosition(pos); }
		}
		
	createjs.Timeline = Timeline;
	}());


/***/ },
/* 79 */
/***/ function(module, exports) {

	/*
	* Tween
	* Visit http://createjs.com/ for documentation, updates and examples.
	*
	* Copyright (c) 2010 gskinner.com, inc.
	* 
	* Permission is hereby granted, free of charge, to any person
	* obtaining a copy of this software and associated documentation
	* files (the "Software"), to deal in the Software without
	* restriction, including without limitation the rights to use,
	* copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the
	* Software is furnished to do so, subject to the following
	* conditions:
	* 
	* The above copyright notice and this permission notice shall be
	* included in all copies or substantial portions of the Software.
	* 
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	* OTHER DEALINGS IN THE SOFTWARE.
	*/
	
	/**
	 * The TweenJS Javascript library provides a simple but powerful tweening interface. It supports tweening of both
	 * numeric object properties & CSS style properties, and allows you to chain tweens and actions together to create
	 * complex sequences.
	 *
	 * <h4>Simple Tween</h4>
	 * This tween will tween the target's alpha property from 0 to 1 for 1s then call the <code>onComplete</code> function.
	 *
	 *	    target.alpha = 0;
	 *	    Tween.get(target).to({alpha:1}, 1000).call(onComplete);
	 *	    function onComplete() {
	 *	    	//Tween complete
	 *	    }
	 *
	 * <strong>Arguments and Scope</strong>
	 * Tween also supports a `call()` with arguments and/or a scope. If no scope is passed, then the function is called
	 * anonymously (normal JavaScript behaviour). The scope is useful for maintaining scope when doing object-oriented
	 * style development.
	 *
	 *      Tween.get(target).to({alpha:0})
	 *          .call(onComplete, [argument1, argument2], this);
	 *
	 * <h4>Chainable Tween</h4> 
	 * This tween will wait 0.5s, tween the target's alpha property to 0 over 1s, set it's visible to false, then call the
	 * <code>onComplete</code> function.
	 *
	 *	    target.alpha = 1;
	 *	    Tween.get(target).wait(500).to({alpha:0, visible:false}, 1000).call(onComplete);
	 *	    function onComplete() {
	 *	    	//Tween complete
	 *	    }
	 *
	 * @module TweenJS
	 */
	 
	// TODO: possibly add a END actionsMode (only runs actions that == position)?
	// TODO: evaluate a way to decouple paused from tick registration.
	
	// namespace:
	this.createjs = this.createjs||{};
	
	(function() {
	/**
	 * A Tween instance tweens properties for a single target. Instance methods can be chained for easy construction and sequencing:
	 *
	 * <h4>Example</h4>
	 *
	 *      target.alpha = 1;
	 *	    Tween.get(target)
	 *	         .wait(500)
	 *	         .to({alpha:0, visible:false}, 1000)
	 *	         .call(onComplete);
	 *	    function onComplete() {
	 *	    	//Tween complete
	 *	    }
	 *
	 * Multiple tweens can point to the same instance, however if they affect the same properties there could be unexpected
	 * behaviour. To stop all tweens on an object, use {{#crossLink "Tween/removeTweens"}}{{/crossLink}} or pass <code>override:true</code>
	 * in the props argument.
	 *
	 *      Tween.get(target, {override:true}).to({x:100});
	 *
	 * Subscribe to the "change" event to get notified when a property of the target is changed.
	 *
	 *      Tween.get(target, {override:true}).to({x:100}).addEventListener("change", handleChange);
	 *      function handleChange(event) {
	 *          // The tween changed.
	 *      }
	 *
	 * See the Tween {{#crossLink "Tween/get"}}{{/crossLink}} method for additional param documentation.
	 * @class Tween
	 * @constructor
	 */
	var Tween = function(target, props, pluginData) {
	  this.initialize(target, props, pluginData);
	}
	var p = Tween.prototype;
	
	// static interface:
		/** 
		 * Constant defining the none actionsMode for use with setPosition.
		 * @property NONE
		 * @type Number
		 * @default 0
		 * @static
		 **/
		Tween.NONE = 0;
		
		/** 
		 * Constant defining the loop actionsMode for use with setPosition.
		 * @property LOOP
		 * @type Number
		 * @default 1
		 * @static
		 **/
		Tween.LOOP = 1;
		
		/** 
		 * Constant defining the reverse actionsMode for use with setPosition.
		 * @property REVERSE
		 * @type Number
		 * @default 2
		 * @static
		 **/
		Tween.REVERSE = 2;
	
		/**
		 * Constant returned by plugins to tell the tween not to use default assignment.
		 * @property IGNORE
		 * @type Object
		 * @static
		 */
		Tween.IGNORE = {};
		
		/** 
		 * @property _listeners
		 * @type Array[Tween]
		 * @static
		 * @protected 
		 **/
		Tween._tweens = [];
		
		/** 
		 * @property _plugins
		 * @type Object
		 * @static
		 * @protected 
		 **/
		Tween._plugins = {};
	
		/**
		 * Returns a new tween instance. This is functionally identical to using "new Tween(...)", but looks cleaner
		 * with the chained syntax of TweenJS.
		 * @example
		 *	var tween = createjs.Tween.get(target);
		 * @method get
		 * @static
		 * @param {Object} target The target object that will have its properties tweened.
		 * @param {Object} [props] The configuration properties to apply to this tween instance (ex. <code>{loop:true, paused:true}</code>).
		 * All properties default to false. Supported props are:<UL>
		 *    <LI> loop: sets the loop property on this tween.</LI>
		 *    <LI> useTicks: uses ticks for all durations instead of milliseconds.</LI>
		 *    <LI> ignoreGlobalPause: sets the ignoreGlobalPause property on this tween.</LI>
		 *    <LI> override: if true, Tween.removeTweens(target) will be called to remove any other tweens with the same target.
		 *    <LI> paused: indicates whether to start the tween paused.</LI>
		 *    <LI> position: indicates the initial position for this tween.</LI>
		 *    <LI> onChange: specifies an onChange handler for this tween. Note that this is deprecated in favour of the
		 *    "change" event.</LI>
		 * </UL>
		 * @param {Object} [pluginData] An object containing data for use by installed plugins. See individual
		 * plugins' documentation for details.
		 * @param {Boolean} [override=false] If true, any previous tweens on the same target will be removed. This is the same as
		 * calling <code>Tween.removeTweens(target)</code>.
		 * @return {Tween} A reference to the created tween. Additional chained tweens, method calls, or callbacks can be
		 * applied to the returned tween instance.
		 **/
		Tween.get = function(target, props, pluginData, override) {
			if (override) { Tween.removeTweens(target); }
			return new Tween(target, props, pluginData);
		}
		
		/**
		 * Advances all tweens. This typically uses the Ticker class (available in the EaselJS library), but you can call it
		 * manually if you prefer to use your own "heartbeat" implementation.
		 * @method tick
		 * @static
		 * @param {Number} delta The change in time in milliseconds since the last tick. Required unless all tweens have
		 * <code>useTicks</code> set to true.
		 * @param {Boolean} paused Indicates whether a global pause is in effect. Tweens with <code>ignoreGlobalPause</code> will ignore
		 * this, but all others will pause if this is true.
		 **/
		Tween.tick = function(delta, paused) {
			var tweens = Tween._tweens.slice(); // to avoid race conditions.
			for (var i=tweens.length-1; i>=0; i--) {
				var tween = tweens[i];
				if ((paused && !tween.ignoreGlobalPause) || tween._paused) { continue; }
				tween.tick(tween._useTicks?1:delta);
			}
		}
		if (createjs.Ticker) { createjs.Ticker.addListener(Tween,false); }
		
		
		/** 
		 * Removes all existing tweens for a target. This is called automatically by new tweens if the <code>override</code>
		 * property is <code>true</code>.
		 * @method removeTweens
		 * @param {Object} target The target object to remove existing tweens from.
		 * @static
		 **/
		Tween.removeTweens = function(target) {
			if (!target.tweenjs_count) { return; }
			var tweens = Tween._tweens;
			for (var i=tweens.length-1; i>=0; i--) {
				if (tweens[i]._target == target) {
					tweens[i]._paused = true;
					tweens.splice(i,1);
				}
			}
			target.tweenjs_count = 0;
		}
	
		/**
		 * Remove all tweens. This will stop and clean up all existing tweens.
		 * @method removeAllTweens
		 * @static
		 * @since 0.4.1
		 */
		Tween.removeAllTweens = function() {
			var tweens = Tween._tweens;
			for (var i= 0, l=tweens.length; i<l; i++) {
				var tween = tweens[i];
				tween.paused = true;
				tween.target.tweenjs_count = 0;
			}
			tweens.length = 0;
		}
		
		/** 
		 * Indicates whether there are any active tweens on the target object (if specified) or in general.
		 * @method hasActiveTweens
		 * @static
		 * @param {Object} target Optional. If not specified, the return value will indicate if there are any active tweens
		 * on any target.
		 * @return {Boolean} A boolean indicating whether there are any active tweens.
		 **/
		Tween.hasActiveTweens = function(target) {
			if (target) { return target.tweenjs_count; }
			return Tween._tweens && Tween._tweens.length;
		}
		
		/** 
		 * Installs a plugin, which can modify how certain properties are handled when tweened. See the CSSPlugin for an
		 * example of how to write TweenJS plugins.
		 * @method installPlugin
		 * @static
		 * @param {Object} plugin The plugin class to install
		 * @param {Array} properties An array of properties that the plugin will handle.
		 **/
		Tween.installPlugin = function(plugin, properties) {
			var priority = plugin.priority;
			if (priority == null) { plugin.priority = priority = 0; }
			for (var i=0,l=properties.length,p=Tween._plugins;i<l;i++) {
				var n = properties[i];
				if (!p[n]) { p[n] = [plugin]; }
				else {
					var arr = p[n];
					for (var j=0,jl=arr.length;j<jl;j++) {
						if (priority < arr[j].priority) { break; }
					}
					p[n].splice(j,0,plugin);
				}
			}
		}
		
		/** 
		 * Registers or unregisters a tween with the ticking system.
		 * @method _register
		 * @static
		 * @protected 
		 **/
		Tween._register = function(tween, value) {
			var target = tween._target;
			if (value) {
				// TODO: this approach might fail if a dev is using sealed objects in ES5
				if (target) { target.tweenjs_count = target.tweenjs_count ? target.tweenjs_count+1 : 1; }
				Tween._tweens.push(tween);
			} else {
				if (target) { target.tweenjs_count--; }
				var i = Tween._tweens.indexOf(tween);
				if (i != -1) { Tween._tweens.splice(i,1); }
			}
		}
	    
	    // mix-ins:
	    // EventDispatcher methods:
	    p.addEventListener = null;
	    p.removeEventListener = null;
	    p.removeAllEventListeners = null;
	    p.dispatchEvent = null;
	    p.hasEventListener = null;
	    p._listeners = null;
	
	    createjs.EventDispatcher.initialize(p); // inject EventDispatcher methods.  
	
	// public properties:
		/**
		 * Causes this tween to continue playing when a global pause is active. For example, if TweenJS is using Ticker,
		 * then setting this to true (the default) will cause this tween to be paused when <code>Ticker.setPaused(true)</code> is called.
		 * See Tween.tick() for more info. Can be set via the props param.
		 * @property ignoreGlobalPause
		 * @type Boolean
		 * @default false
		 **/
		p.ignoreGlobalPause = false;
		
		/**
		 * If true, the tween will loop when it reaches the end. Can be set via the props param.
		 * @property loop
		 * @type {Boolean}
		 * @default false
		 **/
		p.loop = false;
		
		/**
		 * Read-only. Specifies the total duration of this tween in milliseconds (or ticks if useTicks is true).
		 * This value is automatically updated as you modify the tween. Changing it directly could result in unexpected
		 * behaviour.
		 * @property duration
		 * @type {Number}
		 * @default 0
		 **/
		p.duration = 0;
		
		/**
		 * Allows you to specify data that will be used by installed plugins. Each plugin uses this differently, but in general
		 * you specify data by setting it to a property of pluginData with the same name as the plugin class.
		 * @example
		 *	myTween.pluginData.PluginClassName = data;
		 * <br/>
		 * Also, most plugins support a property to enable or disable them. This is typically the plugin class name followed by "_enabled".<br/>
		 * @example 
		 *	myTween.pluginData.PluginClassName_enabled = false;<br/>
		 * <br/>
		 * Some plugins also store instance data in this object, usually in a property named _PluginClassName.
		 * See the documentation for individual plugins for more details.
		 * @property pluginData
		 * @type {Object}
		 **/
		p.pluginData = null;
		
		/**
		 * Called whenever the tween's position changes with a single parameter referencing this tween instance.
		 * @property onChange
		 * @type {Function}
		 **/
		p.onChange = null;
	    
	    /**
		 * Called whenever the tween's position changes with a single parameter referencing this tween instance.
	     * @event change
	     * @since 0.4.0
		 **/
	    p.change = null;
		
		/**
		 * Read-only. The target of this tween. This is the object on which the tweened properties will be changed. Changing 
		 * this property after the tween is created will not have any effect.
		 * @property target
		 * @type {Object}
		 **/
		p.target = null;
		
		/**
		 * Read-only. The current normalized position of the tween. This will always be a value between 0 and duration.
		 * Changing this property directly will have no effect.
		 * @property position
		 * @type {Object}
		 **/
		p.position = null;
	
	// private properties:
		
		/**
		 * @property _paused
		 * @type {Boolean}
		 * @default false
		 * @protected
		 **/
		p._paused = false;
		
		/**
		 * @property _curQueueProps
		 * @type {Object}
		 * @protected
		 **/
		p._curQueueProps = null;
		
		/**
		 * @property _initQueueProps
		 * @type {Object}
		 * @protected
		 **/
		p._initQueueProps = null;
		
		/**
		 * @property _steps
		 * @type {Array}
		 * @protected
		 **/
		p._steps = null;
		
		/**
		 * @property _actions
		 * @type {Array}
		 * @protected
		 **/
		p._actions = null;
		
		/**
		 * Raw position.
		 * @property _prevPosition
		 * @type {Number}
		 * @default 0
		 * @protected
		 **/
		p._prevPosition = 0;
	
		/**
		 * The position within the current step.
		 * @property _stepPosition
		 * @type {Number}
		 * @default 0
		 * @protected
		 */
		p._stepPosition = 0; // this is needed by MovieClip.
		
		/**
		 * Normalized position.
		 * @property _prevPos
		 * @type {Number}
		 * @default -1
		 * @protected
		 **/
		p._prevPos = -1;
		
		/**
		 * @property _target
		 * @type {Object}
		 * @protected
		 **/
		p._target = null;
		
		/**
		 * @property _useTicks
		 * @type {Boolean}
		 * @default false
		 * @protected
		 **/
		p._useTicks = false;
		
	// constructor:
		/** 
		 * @method initialize
		 * @param {Object} target
		 * @param {Object} props
		 * @param {Object} pluginData
		 * @protected
		 **/
		p.initialize = function(target, props, pluginData) {
			this.target = this._target = target;
			if (props) {
				this._useTicks = props.useTicks;
				this.ignoreGlobalPause = props.ignoreGlobalPause;
				this.loop = props.loop;
				this.onChange = props.onChange;
				if (props.override) { Tween.removeTweens(target); }
			}
			
			this.pluginData = pluginData || {};
			this._curQueueProps = {};
			this._initQueueProps = {};
			this._steps = [];
			this._actions = [];
			if (props&&props.paused) { this._paused=true; }
			else { Tween._register(this,true); }
			if (props&&props.position!=null) { this.setPosition(props.position, Tween.NONE); }
		}
		
	// public methods:
		/** 
		 * Queues a wait (essentially an empty tween).
		 * @example                                                   
		 *	//This tween will wait 1s before alpha is faded to 0.
		 *	createjs.Tween.get(target).wait(1000).to({alpha:0}, 1000);
		 * @method wait
		 * @param {Number} duration The duration of the wait in milliseconds (or in ticks if <code>useTicks</code> is true).
		 * @return {Tween} This tween instance (for chaining calls).
		 **/
		p.wait = function(duration) {
			if (duration == null || duration <= 0) { return this; }
			var o = this._cloneProps(this._curQueueProps);
			return this._addStep({d:duration, p0:o, e:this._linearEase, p1:o});
		}
	
		/** 
		 * Queues a tween from the current values to the target properties. Set duration to 0 to jump to these value.
		 * Numeric properties will be tweened from their current value in the tween to the target value. Non-numeric
		 * properties will be set at the end of the specified duration.
		 * @example
		 *	createjs.Tween.get(target).to({alpha:0}, 1000);
		 * @method to
		 * @param {Object} props An object specifying property target values for this tween (Ex. <code>{x:300}</code> would tween the x
		 *      property of the target to 300).
		 * @param {Number} duration Optional. The duration of the wait in milliseconds (or in ticks if <code>useTicks</code> is true).
		 *      Defaults to 0.
		 * @param {Function} ease Optional. The easing function to use for this tween. Defaults to a linear ease.
		 * @return {Tween} This tween instance (for chaining calls).
		 **/
		p.to = function(props, duration, ease) {
			if (isNaN(duration) || duration < 0) { duration = 0; }
			return this._addStep({d:duration||0, p0:this._cloneProps(this._curQueueProps), e:ease, p1:this._cloneProps(this._appendQueueProps(props))});
		}
		
		/** 
		 * Queues an action to call the specified function. 
		 *	@example
		 *   	//would call myFunction() after 1s.      
		 *   	myTween.wait(1000).call(myFunction);
		 * @method call
		 * @param {Function} callback The function to call.
		 * @param {Array} params Optional. The parameters to call the function with. If this is omitted, then the function
		 *      will be called with a single param pointing to this tween.
		 * @param {Object} scope Optional. The scope to call the function in. If omitted, it will be called in the target's
		 *      scope.
		 * @return {Tween} This tween instance (for chaining calls).
		 **/
		p.call = function(callback, params, scope) {
			return this._addAction({f:callback, p:params ? params : [this], o:scope ? scope : this._target});
		}
		
		// TODO: add clarification between this and a 0 duration .to:
		/** 
		 * Queues an action to set the specified props on the specified target. If target is null, it will use this tween's
		 * target.
		 * @example
		 *	myTween.wait(1000).set({visible:false},foo);
		 * @method set
		 * @param {Object} props The properties to set (ex. <code>{visible:false}</code>).
		 * @param {Object} target Optional. The target to set the properties on. If omitted, they will be set on the tween's target.
		 * @return {Tween} This tween instance (for chaining calls).
		 **/
		p.set = function(props, target) {
			return this._addAction({f:this._set, o:this, p:[props, target ? target : this._target]});
		}
		
		/** 
		 * Queues an action to to play (unpause) the specified tween. This enables you to sequence multiple tweens.
		 * @example 
		 *	myTween.to({x:100},500).play(otherTween);
		 * @method play
		 * @param {Tween} tween The tween to play.
		 * @return {Tween} This tween instance (for chaining calls).
		 **/
		p.play = function(tween) {
			return this.call(tween.setPaused, [false], tween);
		}
	
		/** 
		 * Queues an action to to pause the specified tween.
		 * @method pause
		 * @param {Tween} tween The tween to play. If null, it pauses this tween.
		 * @return {Tween} This tween instance (for chaining calls)
		 **/
		p.pause = function(tween) {
			if (!tween) { tween = this; }
			return this.call(tween.setPaused, [true], tween);
		}
		
		/** 
		 * Advances the tween to a specified position.
		 * @method setPosition
		 * @param {Number} value The position to seek to in milliseconds (or ticks if useTicks is true).
		 * @param {Number} actionsMode Optional parameter specifying how actions are handled (ie. call, set, play, pause):
		 *      <code>Tween.NONE</code> (0) - run no actions. <code>Tween.LOOP</code> (1) - if new position is less than old, then run all actions
		 *      between old and duration, then all actions between 0 and new. Defaults to <code>LOOP</code>. <code>Tween.REVERSE</code> (2) - if new
		 *      position is less than old, run all actions between them in reverse.
		 * @return {Boolean} Returns true if the tween is complete (ie. the full tween has run & loop is false).
		 **/
		p.setPosition = function(value, actionsMode) {
			if (value < 0) { value = 0; }
			if (actionsMode == null) { actionsMode = 1; }
			
			// normalize position:
			var t = value;
			var end = false;
			if (t >= this.duration) {
				if (this.loop) { t = t%this.duration; }
				else {
					t = this.duration;
					end = true;
				}
			}
			if (t == this._prevPos) { return end; }
			
			
			var prevPos = this._prevPos;
			this.position = this._prevPos = t; // set this in advance in case an action modifies position.
			this._prevPosition = value;
			
			// handle tweens:
			if (this._target) {
				if (end) {
					// addresses problems with an ending zero length step.
					this._updateTargetProps(null,1);
				} else if (this._steps.length > 0) {
					// find our new tween index:
					for (var i=0, l=this._steps.length; i<l; i++) {
						if (this._steps[i].t > t) { break; }
					}
					var step = this._steps[i-1];
					this._updateTargetProps(step,(this._stepPosition = t-step.t)/step.d);
				}
			}
			
			// run actions:
			if (actionsMode != 0 && this._actions.length > 0) {
				if (this._useTicks) {
					// only run the actions we landed on.
					this._runActions(t,t);
				} else if (actionsMode == 1 && t<prevPos) {
					if (prevPos != this.duration) { this._runActions(prevPos, this.duration); }
					this._runActions(0, t, true);
				} else {
					this._runActions(prevPos, t);
				}
			}
	
			if (end) { this.setPaused(true); }
			
			this.onChange&&this.onChange(this);
	        this.dispatchEvent("change");
			return end;
		}
	
		/** 
		 * Advances this tween by the specified amount of time in milliseconds (or ticks if <code>useTicks</code> is true).
		 * This is normally called automatically by the Tween engine (via <code>Tween.tick</code>), but is exposed for advanced uses.
		 * @method tick
		 * @param {Number} delta The time to advance in milliseconds (or ticks if <code>useTicks</code> is true).
		 **/
		p.tick = function(delta) {
			if (this._paused) { return; }
			this.setPosition(this._prevPosition+delta);
		}
	
		/** 
		 * Pauses or plays this tween.
		 * @method setPaused
		 * @param {Boolean} value Indicates whether the tween should be paused (true) or played (false).
		 * @return {Tween} This tween instance (for chaining calls)
		 **/
		p.setPaused = function(value) {
			this._paused = !!value;
			Tween._register(this, !value);
			return this;
		}
	
		// tiny api (primarily for tool output):
		p.w = p.wait;
		p.t = p.to;
		p.c = p.call;
		p.s = p.set;
	
		/**
		 * Returns a string representation of this object.
		 * @method toString
		 * @return {String} a string representation of the instance.
		 **/
		p.toString = function() {
			return "[Tween]";
		}
		
		/**
		 * @method clone
		 * @protected
		 **/
		p.clone = function() {
			throw("Tween can not be cloned.")
		}
	
	// private methods:
		/**
		 * @method _updateTargetProps
		 * @param {Object} step
		 * @param {Number} ratio
		 * @protected
		 **/
		p._updateTargetProps = function(step, ratio) {
			var p0,p1,v,v0,v1,arr;
			if (!step && ratio == 1) {
				p0 = p1 = this._curQueueProps;
			} else {
				// apply ease to ratio.
				if (step.e) { ratio = step.e(ratio,0,1,1); }
				p0 = step.p0;
				p1 = step.p1;
			}
	
			for (n in this._initQueueProps) {
				if ((v0 = p0[n]) == null) { p0[n] = v0 = this._initQueueProps[n]; }
				if ((v1 = p1[n]) == null) { p1[n] = v1 = v0; }
				if (v0 == v1 || ratio == 0 || ratio == 1 || (typeof(v0) != "number")) {
					// no interpolation - either at start, end, values don't change, or the value is non-numeric.
					v = ratio == 1 ? v1 : v0;
				} else {
					v = v0+(v1-v0)*ratio;
				}
				
				var ignore = false;
				if (arr = Tween._plugins[n]) {
					for (var i=0,l=arr.length;i<l;i++) {
						var v2 = arr[i].tween(this, n, v, p0, p1, ratio, !!step&&p0==p1, !step);
						if (v2 == Tween.IGNORE) { ignore = true; }
						else { v = v2; }
					}
				}
				if (!ignore) { this._target[n] = v; }
			}
			
		}
		
		/**
		 * @method _runActions
		 * @param {Number} startPos
		 * @param {Number} endPos
		 * @param {Boolean} includeStart
		 * @protected
		 **/
		p._runActions = function(startPos, endPos, includeStart) {
			var sPos = startPos;
			var ePos = endPos;
			var i = -1;
			var j = this._actions.length;
			var k = 1;
			if (startPos > endPos) {
				// running backwards, flip everything:
				sPos = endPos;
				ePos = startPos;
				i = j;
				j = k = -1;
			}
			while ((i+=k) != j) {
				var action = this._actions[i];
				var pos = action.t;
				if (pos == ePos || (pos > sPos && pos < ePos) || (includeStart && pos == startPos) ) {
					action.f.apply(action.o, action.p);
				}
			}
		}
	
		/**
		 * @method _appendQueueProps
		 * @param {Object} o
		 * @protected
		 **/
		p._appendQueueProps = function(o) {
			var arr,oldValue,i, l, injectProps;
			for (var n in o) {
				if (this._initQueueProps[n] === undefined) {
					oldValue = this._target[n];
					
					// init plugins:
					if (arr = Tween._plugins[n]) {
						for (i=0,l=arr.length;i<l;i++) {
							oldValue = arr[i].init(this, n, oldValue);
						}
					}
					this._initQueueProps[n] = oldValue===undefined?null:oldValue;
				} else {
					oldValue = this._curQueueProps[n];
				}
				
				if (arr = Tween._plugins[n]) {
					injectProps = injectProps||{};
					for (i=0, l=arr.length;i<l;i++) {
						// TODO: remove the check for .step in the next version. It's here for backwards compatibility.
						if (arr[i].step) { arr[i].step(this, n, oldValue, o[n], injectProps); }
					}
				}
				this._curQueueProps[n] = o[n];
			}
			if (injectProps) { this._appendQueueProps(injectProps); }
			return this._curQueueProps;
		}
	
		/**
		 * @method _cloneProps
		 * @param {Object} props
		 * @protected
		 **/
		p._cloneProps = function(props) {
			var o = {};
			for (var n in props) {
				o[n] = props[n];
			}
			return o;
		}
	
		/**
		 * @method _addStep
		 * @param {Object} o
		 * @protected
		 **/
		p._addStep = function(o) {
			if (o.d > 0) {
				this._steps.push(o);
				o.t = this.duration;
				this.duration += o.d;
			}
			return this;
		}
		
		/**
		 * @method _addAction
		 * @param {Object} o
		 * @protected
		 **/
		p._addAction = function(o) {
			o.t = this.duration;
			this._actions.push(o);
			return this;
		}
	
		/**
		 * @method _set
		 * @param {Object} props
		 * @param {Object} o
		 * @protected
		 **/
		p._set = function(props, o) {
			for (var n in props) {
				o[n] = props[n];
			}
		}
		
	createjs.Tween = Tween;
	}());


/***/ },
/* 80 */
/***/ function(module, exports) {

	(function() {
	
	/**
	 * Static class holding library specific information such as the version and buildDate of
	 * the library.
	 * @class TweenJS
	 **/
	var o = this.createjs = this.createjs||{};
	o = (o.TweenJS = o.TweenJS||{});
	 
	/**
	 * The version string for this release.
	 * @property version
	 * @type String
	 * @static
	 **/
	o.version = /*version*/"0.4.0"; // injected by build process
	
	/**
	 * The build date for this release in UTC format.
	 * @property buildDate
	 * @type String
	 * @static
	 **/
	o.buildDate = /*date*/"Tue, 12 Feb 2013 21:08:16 GMT"; // injected by build process
	
	})();

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';
	
	/*!
	 * Canvas
	 * Copyright (c) 2010 LearnBoost <tj@learnboost.com>
	 * MIT Licensed
	 */
	
	/**
	 * Module dependencies.
	 */
	
	var canvas = __webpack_require__(82)
	  , Canvas = canvas.Canvas
	  , Image = canvas.Image
	  , cairoVersion = canvas.cairoVersion
	  , Context2d = __webpack_require__(83)
	  , PNGStream = __webpack_require__(84)
	  , PDFStream = __webpack_require__(85)
	  , JPEGStream = __webpack_require__(86)
	  , FontFace = canvas.FontFace
	  , fs = __webpack_require__(6)
	  , packageJson = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../package.json\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	  , FORMATS = ['image/png', 'image/jpeg'];
	
	/**
	 * Export `Canvas` as the module.
	 */
	
	var Canvas = exports = module.exports = Canvas;
	
	/**
	 * Library version.
	 */
	
	exports.version = packageJson.version;
	
	/**
	 * Cairo version.
	 */
	
	exports.cairoVersion = cairoVersion;
	
	/**
	 * jpeglib version.
	 */
	
	if (canvas.jpegVersion) {
	  exports.jpegVersion = canvas.jpegVersion;
	}
	
	/**
	 * gif_lib version.
	 */
	
	if (canvas.gifVersion) {
	  exports.gifVersion = canvas.gifVersion.replace(/[^.\d]/g, '');
	}
	
	/**
	 * freetype version.
	 */
	
	if (canvas.freetypeVersion) {
	  exports.freetypeVersion = canvas.freetypeVersion;
	}
	
	/**
	 * Expose constructors.
	 */
	
	exports.Context2d = Context2d;
	exports.PNGStream = PNGStream;
	exports.PDFStream = PDFStream;
	exports.JPEGStream = JPEGStream;
	exports.Image = Image;
	exports.ImageData = canvas.ImageData;
	
	if (FontFace) {
	  var Font = function Font(name, path, idx) {
	    this.name = name;
	    this._faces = {};
	
	    this.addFace(path, 'normal', 'normal', idx);
	  };
	
	  Font.prototype.addFace = function(path, weight, style, idx) {
	    style = style || 'normal';
	    weight = weight || 'normal';
	
	    var face = new FontFace(path, idx || 0);
	    this._faces[weight + '-' + style] = face;
	  };
	
	  Font.prototype.getFace = function(weightStyle) {
	    return this._faces[weightStyle] || this._faces['normal-normal'];
	  };
	
	  exports.Font = Font;
	}
	
	/**
	 * Context2d implementation.
	 */
	
	__webpack_require__(83);
	
	/**
	 * Image implementation.
	 */
	
	__webpack_require__(88);
	
	/**
	 * Inspect canvas.
	 *
	 * @return {String}
	 * @api public
	 */
	
	Canvas.prototype.inspect = function(){
	  return '[Canvas ' + this.width + 'x' + this.height + ']';
	};
	
	/**
	 * Get a context object.
	 *
	 * @param {String} contextId
	 * @return {Context2d}
	 * @api public
	 */
	
	Canvas.prototype.getContext = function(contextId){
	  if ('2d' == contextId) {
	    var ctx = this._context2d || (this._context2d = new Context2d(this));
	    this.context = ctx;
	    ctx.canvas = this;
	    return ctx;
	  }
	};
	
	/**
	 * Create a `PNGStream` for `this` canvas.
	 *
	 * @return {PNGStream}
	 * @api public
	 */
	
	Canvas.prototype.pngStream =
	Canvas.prototype.createPNGStream = function(){
	  return new PNGStream(this);
	};
	
	/**
	 * Create a synchronous `PNGStream` for `this` canvas.
	 *
	 * @return {PNGStream}
	 * @api public
	 */
	
	Canvas.prototype.syncPNGStream =
	Canvas.prototype.createSyncPNGStream = function(){
	  return new PNGStream(this, true);
	};
	
	/**
	 * Create a `PDFStream` for `this` canvas.
	 *
	 * @return {PDFStream}
	 * @api public
	 */
	
	Canvas.prototype.pdfStream =
	Canvas.prototype.createPDFStream = function(){
	  return new PDFStream(this);
	};
	
	/**
	 * Create a synchronous `PDFStream` for `this` canvas.
	 *
	 * @return {PDFStream}
	 * @api public
	 */
	
	Canvas.prototype.syncPDFStream =
	Canvas.prototype.createSyncPDFStream = function(){
	  return new PDFStream(this, true);
	};
	
	/**
	 * Create a `JPEGStream` for `this` canvas.
	 *
	 * @param {Object} options
	 * @return {JPEGStream}
	 * @api public
	 */
	
	Canvas.prototype.jpegStream =
	Canvas.prototype.createJPEGStream = function(options){
	  return this.createSyncJPEGStream(options);
	};
	
	/**
	 * Create a synchronous `JPEGStream` for `this` canvas.
	 *
	 * @param {Object} options
	 * @return {JPEGStream}
	 * @api public
	 */
	
	Canvas.prototype.syncJPEGStream =
	Canvas.prototype.createSyncJPEGStream = function(options){
	  options = options || {};
	  // Don't allow the buffer size to exceed the size of the canvas (#674)
	  var maxBufSize = this.width * this.height * 4;
	  var clampedBufSize = Math.min(options.bufsize || 4096, maxBufSize);
	  return new JPEGStream(this, {
	      bufsize: clampedBufSize
	    , quality: options.quality || 75
	    , progressive: options.progressive || false
	  });
	};
	
	/**
	 * Return a data url. Pass a function for async support (required for "image/jpeg").
	 *
	 * @param {String} type, optional, one of "image/png" or "image/jpeg", defaults to "image/png"
	 * @param {Object|Number} encoderOptions, optional, options for jpeg compression (see documentation for Canvas#jpegStream) or the JPEG encoding quality from 0 to 1.
	 * @param {Function} fn, optional, callback for asynchronous operation. Required for type "image/jpeg".
	 * @return {String} data URL if synchronous (callback omitted)
	 * @api public
	 */
	
	Canvas.prototype.toDataURL = function(a1, a2, a3){
	  // valid arg patterns (args -> [type, opts, fn]):
	  // [] -> ['image/png', null, null]
	  // [qual] -> ['image/png', null, null]
	  // [undefined] -> ['image/png', null, null]
	  // ['image/png'] -> ['image/png', null, null]
	  // ['image/png', qual] -> ['image/png', null, null]
	  // [fn] -> ['image/png', null, fn]
	  // [type, fn] -> [type, null, fn]
	  // [undefined, fn] -> ['image/png', null, fn]
	  // ['image/png', qual, fn] -> ['image/png', null, fn]
	  // ['image/jpeg', fn] -> ['image/jpeg', null, fn]
	  // ['image/jpeg', opts, fn] -> ['image/jpeg', opts, fn]
	  // ['image/jpeg', qual, fn] -> ['image/jpeg', {quality: qual}, fn]
	  // ['image/jpeg', undefined, fn] -> ['image/jpeg', null, fn]
	
	  if (this.width === 0 || this.height === 0) {
	    // Per spec, if the bitmap has no pixels, return this string:
	    return "data:,";
	  }
	
	  var type = 'image/png';
	  var opts = {};
	  var fn;
	
	  if ('function' === typeof a1) {
	    fn = a1;
	  } else {
	    if ('string' === typeof a1 && FORMATS.indexOf(a1.toLowerCase()) !== -1) {
	      type = a1.toLowerCase();
	    }
	
	    if ('function' === typeof a2) {
	      fn = a2;
	    } else {
	      if ('object' === typeof a2) {
	        opts = a2;
	      } else if ('number' === typeof a2) {
	        opts = {quality: Math.max(0, Math.min(1, a2)) * 100};
	      }
	
	      if ('function' === typeof a3) {
	        fn = a3;
	      } else if (undefined !== a3) {
	        throw new TypeError(typeof a3 + ' is not a function');
	      }
	    }
	  }
	
	  if ('image/png' === type) {
	    if (fn) {
	      this.toBuffer(function(err, buf){
	        if (err) return fn(err);
	        fn(null, 'data:image/png;base64,' + buf.toString('base64'));
	      });
	    } else {
	      return 'data:image/png;base64,' + this.toBuffer().toString('base64');
	    }
	
	  } else if ('image/jpeg' === type) {
	    if (undefined === fn) {
	      throw new Error('Missing required callback function for format "image/jpeg"');
	    }
	
	    var stream = this.jpegStream(opts);
	    // note that jpegStream is synchronous
	    var buffers = [];
	    stream.on('data', function (chunk) {
	      buffers.push(chunk);
	    });
	    stream.on('error', function (err) {
	      fn(err);
	    });
	    stream.on('end', function() {
	      var result = 'data:image/jpeg;base64,' + Buffer.concat(buffers).toString('base64');
	      fn(null, result);
	    });
	  }
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12).Buffer))

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../build/Release/canvas\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/*!
	 * Canvas - Context2d
	 * Copyright (c) 2010 LearnBoost <tj@learnboost.com>
	 * MIT Licensed
	 */
	
	/**
	 * Module dependencies.
	 */
	
	var canvas = __webpack_require__(82)
	  , Context2d = canvas.CanvasRenderingContext2d
	  , CanvasGradient = canvas.CanvasGradient
	  , CanvasPattern = canvas.CanvasPattern
	  , ImageData = canvas.ImageData;
	
	/**
	 * Export `Context2d` as the module.
	 */
	
	var Context2d = exports = module.exports = Context2d;
	
	/**
	 * Cache color string RGBA values.
	 */
	
	var cache = {};
	
	/**
	 * Text baselines.
	 */
	
	var baselines = ['alphabetic', 'top', 'bottom', 'middle', 'ideographic', 'hanging'];
	
	/**
	 * Font RegExp helpers.
	 */
	
	var weights = 'normal|bold|bolder|lighter|[1-9]00'
	  , styles = 'normal|italic|oblique'
	  , units = 'px|pt|pc|in|cm|mm|%'
	  , string = '\'([^\']+)\'|"([^"]+)"|[\\w-]+';
	
	/**
	 * Font parser RegExp;
	 */
	
	var fontre = new RegExp('^ *'
	  + '(?:(' + weights + ') *)?'
	  + '(?:(' + styles + ') *)?'
	  + '([\\d\\.]+)(' + units + ') *'
	  + '((?:' + string + ')( *, *(?:' + string + '))*)'
	  );
	
	/**
	 * Parse font `str`.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */
	
	var parseFont = exports.parseFont = function(str){
	  var font = {}
	    , captures = fontre.exec(str);
	
	  // Invalid
	  if (!captures) return;
	
	  // Cached
	  if (cache[str]) return cache[str];
	
	  // Populate font object
	  font.weight = captures[1] || 'normal';
	  font.style = captures[2] || 'normal';
	  font.size = parseFloat(captures[3]);
	  font.unit = captures[4];
	  font.family = captures[5].replace(/["']/g, '').split(',')[0].trim();
	
	  // TODO: dpi
	  // TODO: remaining unit conversion
	  switch (font.unit) {
	    case 'pt':
	      font.size /= .75;
	      break;
	    case 'in':
	      font.size *= 96;
	      break;
	    case 'mm':
	      font.size *= 96.0 / 25.4;
	      break;
	    case 'cm':
	      font.size *= 96.0 / 2.54;
	      break;
	  }
	
	  return cache[str] = font;
	};
	
	/**
	 * Enable or disable image smoothing.
	 *
	 * @api public
	 */
	
	Context2d.prototype.__defineSetter__('imageSmoothingEnabled', function(val){
	  this._imageSmoothing = !! val;
	  this.patternQuality = val ? 'best' : 'fast';
	});
	
	/**
	 * Get image smoothing value.
	 *
	 * @api public
	 */
	
	Context2d.prototype.__defineGetter__('imageSmoothingEnabled', function(val){
	  return !! this._imageSmoothing;
	});
	
	/**
	 * Create a pattern from `Image` or `Canvas`.
	 *
	 * @param {Image|Canvas} image
	 * @param {String} repetition
	 * @return {CanvasPattern}
	 * @api public
	 */
	
	Context2d.prototype.createPattern = function(image, repetition){
	  // TODO Use repetition (currently always 'repeat')
	  return new CanvasPattern(image);
	};
	
	/**
	 * Create a linear gradient at the given point `(x0, y0)` and `(x1, y1)`.
	 *
	 * @param {Number} x0
	 * @param {Number} y0
	 * @param {Number} x1
	 * @param {Number} y1
	 * @return {CanvasGradient}
	 * @api public
	 */
	
	Context2d.prototype.createLinearGradient = function(x0, y0, x1, y1){
	  return new CanvasGradient(x0, y0, x1, y1);
	};
	
	/**
	 * Create a radial gradient at the given point `(x0, y0)` and `(x1, y1)`
	 * and radius `r0` and `r1`.
	 *
	 * @param {Number} x0
	 * @param {Number} y0
	 * @param {Number} r0
	 * @param {Number} x1
	 * @param {Number} y1
	 * @param {Number} r1
	 * @return {CanvasGradient}
	 * @api public
	 */
	
	Context2d.prototype.createRadialGradient = function(x0, y0, r0, x1, y1, r1){
	  return new CanvasGradient(x0, y0, r0, x1, y1, r1);
	};
	
	/**
	 * Reset transform matrix to identity, then apply the given args.
	 *
	 * @param {...}
	 * @api public
	 */
	
	Context2d.prototype.setTransform = function(){
	  this.resetTransform();
	  this.transform.apply(this, arguments);
	};
	
	/**
	 * Set the fill style with the given css color string.
	 *
	 * @api public
	 */
	
	Context2d.prototype.__defineSetter__('fillStyle', function(val){
	  if (!val) return;
	  if ('CanvasGradient' == val.constructor.name
	    || 'CanvasPattern' == val.constructor.name) {
	    this.lastFillStyle = val;
	    this._setFillPattern(val);
	  } else if ('string' == typeof val) {
	    this._setFillColor(val);
	  }
	});
	
	/**
	 * Get previous fill style.
	 *
	 * @return {CanvasGradient|String}
	 * @api public
	 */
	
	Context2d.prototype.__defineGetter__('fillStyle', function(){
	  return this.lastFillStyle || this.fillColor;
	});
	
	/**
	 * Set the stroke style with the given css color string.
	 *
	 * @api public
	 */
	
	Context2d.prototype.__defineSetter__('strokeStyle', function(val){
	  if (!val) return;
	  if ('CanvasGradient' == val.constructor.name
	    || 'CanvasPattern' == val.constructor.name) {
	    this.lastStrokeStyle = val;
	    this._setStrokePattern(val);
	  } else if ('string' == typeof val) {
	    this._setStrokeColor(val);
	  }
	});
	
	/**
	 * Get previous stroke style.
	 *
	 * @return {CanvasGradient|String}
	 * @api public
	 */
	
	Context2d.prototype.__defineGetter__('strokeStyle', function(){
	  return this.lastStrokeStyle || this.strokeColor;
	});
	
	/**
	 * Register `font` for usage.
	 *
	 * @param {Font} font
	 * @api public
	 */
	
	Context2d.prototype.addFont = function(font) {
	  this._fonts = this._fonts || {};
	  if (this._fonts[font.name]) return;
	  this._fonts[font.name] = font;
	};
	
	/**
	 * Set font.
	 *
	 * @see exports.parseFont()
	 * @api public
	 */
	
	Context2d.prototype.__defineSetter__('font', function(val){
	  if (!val) return;
	  if ('string' == typeof val) {
	    var font;
	    if (font = parseFont(val)) {
	      this.lastFontString = val;
	
	      var fonts = this._fonts;
	      if (fonts && fonts[font.family]) {
	        var fontObj = fonts[font.family];
	        var type = font.weight + '-' + font.style;
	
	        var fontFace = fontObj.getFace(type);
	        this._setFontFace(fontFace, font.size);
	      } else {
	        this._setFont(
	            font.weight
	          , font.style
	          , font.size
	          , font.unit
	          , font.family);
	      }
	    }
	  }
	});
	
	/**
	 * Get the current font.
	 *
	 * @api public
	 */
	
	Context2d.prototype.__defineGetter__('font', function(){
	  return this.lastFontString || '10px sans-serif';
	});
	
	/**
	 * Set text baseline.
	 *
	 * @api public
	 */
	
	Context2d.prototype.__defineSetter__('textBaseline', function(val){
	  if (!val) return;
	  var n = baselines.indexOf(val);
	  if (~n) {
	    this.lastBaseline = val;
	    this._setTextBaseline(n);
	  }
	});
	
	/**
	 * Get the current baseline setting.
	 *
	 * @api public
	 */
	
	Context2d.prototype.__defineGetter__('textBaseline', function(){
	  return this.lastBaseline || 'alphabetic';
	});
	
	/**
	 * Set text alignment.
	 *
	 * @api public
	 */
	
	Context2d.prototype.__defineSetter__('textAlign', function(val){
	  switch (val) {
	    case 'center':
	      this._setTextAlignment(0);
	      this.lastTextAlignment = val;
	      break;
	    case 'left':
	    case 'start':
	      this._setTextAlignment(-1);
	      this.lastTextAlignment = val;
	      break;
	    case 'right':
	    case 'end':
	      this._setTextAlignment(1);
	      this.lastTextAlignment = val;
	      break;
	  }
	});
	
	/**
	 * Get the current font.
	 *
	 * @see exports.parseFont()
	 * @api public
	 */
	
	Context2d.prototype.__defineGetter__('textAlign', function(){
	  return this.lastTextAlignment || 'start';
	});
	
	/**
	 * Create `ImageData` with the given dimensions or
	 * `ImageData` instance for dimensions.
	 *
	 * @param {Number|ImageData} width
	 * @param {Number} height
	 * @return {ImageData}
	 * @api public
	 */
	
	Context2d.prototype.createImageData = function(width, height){
	  if ('ImageData' == width.constructor.name) {
	    height = width.height;
	    width = width.width;
	  }
	  return new ImageData(new Uint8ClampedArray(width * height * 4), width, height);
	};


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	/*!
	 * Canvas - PNGStream
	 * Copyright (c) 2010 LearnBoost <tj@learnboost.com>
	 * MIT Licensed
	 */
	
	/**
	 * Module dependencies.
	 */
	
	var Stream = __webpack_require__(19).Stream;
	
	/**
	 * Initialize a `PNGStream` with the given `canvas`.
	 *
	 * "data" events are emitted with `Buffer` chunks, once complete the
	 * "end" event is emitted. The following example will stream to a file
	 * named "./my.png".
	 *
	 *     var out = fs.createWriteStream(__dirname + '/my.png')
	 *       , stream = canvas.createPNGStream();
	 *
	 *     stream.pipe(out);
	 *
	 * @param {Canvas} canvas
	 * @param {Boolean} sync
	 * @api public
	 */
	
	var PNGStream = module.exports = function PNGStream(canvas, sync) {
	  var self = this
	    , method = sync
	      ? 'streamPNGSync'
	      : 'streamPNG';
	  this.sync = sync;
	  this.canvas = canvas;
	  this.readable = true;
	  // TODO: implement async
	  if ('streamPNG' == method) method = 'streamPNGSync';
	  process.nextTick(function(){
	    canvas[method](function(err, chunk, len){
	      if (err) {
	        self.emit('error', err);
	        self.readable = false;
	      } else if (len) {
	        self.emit('data', chunk, len);
	      } else {
	        self.emit('end');
	        self.readable = false;
	      }
	    });
	  });
	};
	
	/**
	 * Inherit from `EventEmitter`.
	 */
	
	PNGStream.prototype.__proto__ = Stream.prototype;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	/*!
	 * Canvas - PDFStream
	 */
	
	/**
	 * Module dependencies.
	 */
	
	var Stream = __webpack_require__(19).Stream;
	
	/**
	 * Initialize a `PDFStream` with the given `canvas`.
	 *
	 * "data" events are emitted with `Buffer` chunks, once complete the
	 * "end" event is emitted. The following example will stream to a file
	 * named "./my.pdf".
	 *
	 *     var out = fs.createWriteStream(__dirname + '/my.pdf')
	 *       , stream = canvas.createPDFStream();
	 *
	 *     stream.pipe(out);
	 *
	 * @param {Canvas} canvas
	 * @param {Boolean} sync
	 * @api public
	 */
	
	var PDFStream = module.exports = function PDFStream(canvas, sync) {
	  var self = this
	    , method = sync
	      ? 'streamPDFSync'
	      : 'streamPDF';
	  this.sync = sync;
	  this.canvas = canvas;
	  this.readable = true;
	  // TODO: implement async
	  if ('streamPDF' == method) method = 'streamPDFSync';
	  process.nextTick(function(){
	    canvas[method](function(err, chunk, len){
	      if (err) {
	        self.emit('error', err);
	        self.readable = false;
	      } else if (len) {
	        self.emit('data', chunk, len);
	      } else {
	        self.emit('end');
	        self.readable = false;
	      }
	    });
	  });
	};
	
	/**
	 * Inherit from `EventEmitter`.
	 */
	
	PDFStream.prototype.__proto__ = Stream.prototype;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	/*!
	 * Canvas - JPEGStream
	 * Copyright (c) 2010 LearnBoost <tj@learnboost.com>
	 * MIT Licensed
	 */
	
	/**
	 * Module dependencies.
	 */
	
	var Stream = __webpack_require__(19).Stream;
	
	/**
	 * Initialize a `JPEGStream` with the given `canvas`.
	 *
	 * "data" events are emitted with `Buffer` chunks, once complete the
	 * "end" event is emitted. The following example will stream to a file
	 * named "./my.jpeg".
	 *
	 *     var out = fs.createWriteStream(__dirname + '/my.jpeg')
	 *       , stream = canvas.createJPEGStream();
	 *
	 *     stream.pipe(out);
	 *
	 * @param {Canvas} canvas
	 * @param {Boolean} sync
	 * @api public
	 */
	
	var JPEGStream = module.exports = function JPEGStream(canvas, options, sync) {
	  var self = this
	    , method = sync
	      ? 'streamJPEGSync'
	      : 'streamJPEG';
	  this.options = options;
	  this.sync = sync;
	  this.canvas = canvas;
	  this.readable = true;
	  // TODO: implement async
	  if ('streamJPEG' == method) method = 'streamJPEGSync';
	  process.nextTick(function(){
	    canvas[method](options.bufsize, options.quality, options.progressive, function(err, chunk){
	      if (err) {
	        self.emit('error', err);
	        self.readable = false;
	      } else if (chunk) {
	        self.emit('data', chunk);
	      } else {
	        self.emit('end');
	        self.readable = false;
	      }
	    });
	  });
	};
	
	/**
	 * Inherit from `EventEmitter`.
	 */
	
	JPEGStream.prototype.__proto__ = Stream.prototype;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 87 */,
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';
	
	/*!
	 * Canvas - Image
	 * Copyright (c) 2010 LearnBoost <tj@learnboost.com>
	 * MIT Licensed
	 */
	
	/**
	 * Module dependencies.
	 */
	
	var Canvas = __webpack_require__(82)
	  , Image = Canvas.Image;
	
	/**
	 * Src setter.
	 *
	 *  - convert data uri to `Buffer`
	 *
	 * @param {String|Buffer} val filename, buffer, data uri
	 * @api public
	 */
	
	Image.prototype.__defineSetter__('src', function(val){
	  if ('string' == typeof val && 0 == val.indexOf('data:')) {
	    val = val.slice(val.indexOf(',') + 1);
	    this.source = new Buffer(val, 'base64');
	  } else {
	    this.source = val;
	  }
	});
	
	/**
	 * Src getter.
	 *
	 * TODO: return buffer
	 *
	 * @api public
	 */
	
	Image.prototype.__defineGetter__('src', function(){
	  return this.source;
	});
	
	/**
	 * Inspect image.
	 *
	 * TODO: indicate that the .src was a buffer, data uri etc
	 *
	 * @return {String}
	 * @api public
	 */
	
	Image.prototype.inspect = function(){
	  return '[Image'
	    + (this.complete ? ':' + this.width + 'x' + this.height : '')
	    + (this.src ? ' ' + this.src : '')
	    + (this.complete ? ' complete' : '')
	    + ']';
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12).Buffer))

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
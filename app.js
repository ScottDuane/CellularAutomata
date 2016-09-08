import Automata from './javascripts/automata.js';
import Board from './javascripts/board';

document.addEventListener('DOMContentLoaded', () => {
  let ctx = document.getElementById('canvas-el');
  let board = new Board('square', ctx);
  let automataGame = new Automata('square', 1000, 10, 10, 100, 100, board);
  automataGame.start();
});

// hey doofus, don't forget you need babel, that's why you're getting errors you doofus 
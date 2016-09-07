import Automata from './javascripts/automata';
import Board from './javascripts/board';

document.addEventListener('DOMContentLoaded', () => {
  let ctx = document.getElementById('canvas-el');
  let board = new Board('square', ctx);
  let automataGame = new Automata('square', 1000, 10, 10, 100, 100, board);
  automataGame.start();
});

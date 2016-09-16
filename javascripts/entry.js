
document.addEventListener('DOMContentLoaded', () => {
  let ctx = document.getElementById('canvas-el');
  let board = new Board('square', ctx);
  let x = 100;
  let y = 100;
  let dimX = 100;
  let dimY = 100;
  let speed = 1000;
  let automata = new Automata('square', speed, x, y, dimX, dimY, board);
  automata.start();
})
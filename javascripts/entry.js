
document.addEventListener('DOMContentLoaded', () => {
  let ctx = document.getElementById('canvas-el');
  let speed = 1000;
  let automata = new Automata('square', speed);
  let board = new Board('square', ctx, automata);
  board.startGame();
})

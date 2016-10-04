
document.addEventListener('DOMContentLoaded', () => {
  let ctx = document.getElementById('canvas-el');
  let speed = 2000;
  let automata = new Automata('hexagon', speed);
  let board = new Board('hexagon', ctx, automata);
  board.startGame();
});

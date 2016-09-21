
document.addEventListener('DOMContentLoaded', () => {
  let ctx = document.getElementById('canvas-el');
  let speed = 1000;
  let automata = new Automata('triangle', speed);
  let board = new Board('triangle', ctx, automata);
  board.startGame();
})

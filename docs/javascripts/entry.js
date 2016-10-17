
document.addEventListener('DOMContentLoaded', () => {
  let ctx = document.getElementById('canvas-el');
  let speed = 2000;
  let rules = document.getElementById('square-control').value;
  let initialCondition = document.getElementById('square-ic').value;
  let automata = new Automata('square', rules, initialCondition);
  let board = new Board('square', ctx, automata);
  board.startGame();
});

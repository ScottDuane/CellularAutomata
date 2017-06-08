## Cellular Automata

<a href="https://scottduane.github.io/CellularAutomata">Live Link</a>

This is a small demonstration of a few different cellular automatons: Conway's Game of Life, a hexagonal variation on Game of Life, and Rule 30. It's implemented using vanilla Javascript along with HTML5 Canvas with the Easel API. 

### Background 

A cellular automaton is a discrete object consisting of a grid of *cells*, each of which has a state. Typically, these states are alive or dead, but cellular automata can exist with more than two states. A cellular automaton's existence is measured in generations. Each successive generation gives way to a new state for each cell, based upon the rules that define the automaton. 

Here, three different automatons are demonstrated:

- **Conway's Game of Life**: this automaton consists of a regular square 2-dimensional grid. A cell's *neighbors* are defined as the eight cells surrounding that cell. The original Game of Life uses the following rules from generation to generation:
  - If a cell is alive and has 3 or 4 neighbors, it remains alive into the next generation. Otherwise, it dies.
  - If a cell is dead and has exactly 3 neighbors, it comes to life in the next generation. Otherwise, it remains dead.

The numbers that determine life or death can be adjusted to create variations on the original GoL. 
- **Hexagonal Game of Life**: this automaton is similar to the original Game of Life, except that it uses a regular hexagonal 2-dimensional grid instead of a square grid. The rules defining neighbors and life/death from generation to generation are similar. 
- **Rule 30**: this automaton is composed of a regular, 2-dimensional triangular grid. As with the Game of Life, each cell can be either alive or dead. In this case, the state of a cell is based on the three cells that appear directly above it on the grid. Letting 0 indicate dead and 1 indicate alive, the rules of Rule 30 are as follows:
  - 111, 110, 101, or 000 -> 0
  - 100, 011, 010, or 001 -> 1

Rule 30 has the unique property that, if allowed to iterate ad infinitum, the grid will approach the Sierpinski's Triangle.

'use strict';

const { json } = require('body-parser');
const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route('/api/check').post((req, res) => {
    const { puzzle, coordinate, value } = req.body;
    if (!puzzle || !coordinate || !value) {
      return res.json({ error: 'Required field(s) missing' });
    }

    const validationError = solver.validate(puzzle);
    if (validationError !== 'Valid') {
      return res.json({ error: validationError });
    }

    const row = coordinate[0];
    const column = coordinate[1];
    if (
      coordinate.length !== 2 ||
      !/[a-i]/i.test(row) ||
      !/[1-9]/.test(column)
    ) {
      return res.json({ error: 'Invalid coordinate' });
    }

    if (!/^[1-9]$/.test(value)) {
      return res.json({ error: 'Invalid value' });
    }

    const rowIndex = solver.letterToNumber(row);
    const columnIndex = parseInt(column);
    const puzzleIndex = (rowIndex - 1) * 9 + (columnIndex - 1);

    if (puzzle[puzzleIndex] == value) {
      return res.json({ valid: true });
    }

    const validRow = solver.checkRowPlacement(puzzle, row, column, value);
    const validCol = solver.checkColPlacement(puzzle, row, column, value);
    const validReg = solver.checkRegionPlacement(puzzle, row, column, value);

    const conflict = [];
    if (!validRow) conflict.push('row');
    if (!validCol) conflict.push('column');
    if (!validReg) conflict.push('region');

    if (validRow && validCol && validReg) {
      return res.json({ valid: true });
    } else {
      return res.json({ valid: false, conflict });
    }
  });

  app.route('/api/solve').post((req, res) => {
    const puzzle = req.body.puzzle;
    const validationError = solver.validate(puzzle);
    if (validationError !== 'Valid') {
      return res.json({ error: validationError });
    }

    const solution = solver.solve(puzzle);
    if (solution.error) {
      return res.json(solution);
    }
    return res.json({ solution });
  });
};

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

    if (solver.validate(puzzle) !== 'Valid') {
      return res.json({ error: solver.validate(puzzle) });
    }

    const row = coordinate.split('')[0];
    const column = coordinate.split('')[1];
    if (
      coordinate.length !== 2 ||
      !/[a-i]/i.test(row) ||
      !/[1-9]/i.test(column)
    ) {
      console.log('invalid coordinate: ');
      return res.json({ json: 'Invalid coordinate' });
    }

    if (!/^[1-9]$/.test(value)) {
      return res.json({ error: 'Invalid value' });
    }
  });

  app.route('/api/solve').post((req, res) => {
    const puzzle = req.body.puzzle;
    if (solver.validate(puzzle) !== 'Valid') {
      return res.json({ error: solver.validate(puzzle) });
    }
    const solution = solver.completeSudoku(puzzle);
    if (solution.error) {
      return res.json(solution);
    }
    return res.json({ solution });
  });
};

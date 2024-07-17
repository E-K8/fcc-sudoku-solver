'use strict';

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

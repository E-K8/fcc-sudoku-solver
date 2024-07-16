class SudokuSolver {
  validate(puzzle) {
    if (!puzzle) {
      return 'Required field missing';
    }
    if (puzzle.length != 81) {
      return 'Expected puzzle to be 81 characters long';
    }
    if (/[^1-9.]/g.test(puzzle)) {
      return 'Invalid characters in puzzle';
    }
    return 'Valid';
  }

  validate(puzzleString) {}

  checkRowPlacement(puzzleString, row, column, value) {}

  checkColPlacement(puzzleString, row, column, value) {}

  checkRegionPlacement(puzzleString, row, column, value) {}

  solve(puzzleString) {}
}

module.exports = SudokuSolver;

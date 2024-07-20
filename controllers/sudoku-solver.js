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

  letterToNumber(row) {
    switch (row.toUpperCase()) {
      case 'A':
        return 1;
      case 'B':
        return 2;
      case 'C':
        return 3;
      case 'D':
        return 4;
      case 'E':
        return 5;
      case 'F':
        return 6;
      case 'G':
        return 7;
      case 'H':
        return 8;
      case 'I':
        return 9;
      default:
        return 'none';
    }
  }

  validate(puzzleString) {}

  checkRowPlacement(puzzleString, row, column, value) {}

  checkColPlacement(puzzleString, row, column, value) {}

  checkRegionPlacement(puzzleString, row, column, value) {}

  solve(puzzleString) {}
}

module.exports = SudokuSolver;

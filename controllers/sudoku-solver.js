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

  // validate(puzzleString) {}

  checkRowPlacement(puzzleString, row, column, value) {
    let grid = this.stringToBoard(puzzleString);
    row = this.letterToNumber(row);

    for (let i = 0; i < 9; i++) {
      if (grid[row - 1][i] == value) {
        return false;
      }
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    let grid = this.stringToBoard(puzzleString);
    row = this.letterToNumber(row);

    for (let i = 0; i < 9; i++) {
      if (grid[i][column - 1] == value) {
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let grid = this.stringToBoard(puzzleString);
    row = this.letterToNumber(row);

    let startRow = row - (row % 3);
    let startCol = column - (column % 3);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i + startRow][j + startCol] == value) {
          return false;
        }
      }
    }
    return true;
  }

  stringToBoard(sudokuString) {
    const SIZE = 9;
    const board = [];

    for (let row = 0; row < SIZE; row++) {
      const start = row * SIZE;
      const end = start + SIZE;
      board[row] = sudokuString
        .substring(start, end)
        .split('')
        .map((char) => (char === '.' ? 0 : parseInt(char)));
    }
    return board;
  }

  solve(puzzleString) {}
}

module.exports = SudokuSolver;

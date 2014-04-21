'use strict';

angular.module('gameOfLifeApp', [
  'Common.ArrayService'
])
    .controller('MainCtrl', function ($scope, CommonArrayService) {

    /* Init main flow */
    $scope.init = function () {
      $scope.initVars();
    };

    /* Init vars within scope */
    $scope.initVars = function () {
      $scope.GAME_BOARD_SIZE = 5;
      $scope.MIN_ROW = 0;
      $scope.MAX_ROW = 5;
      $scope.MIN_COL = 0;
      $scope.MAX_COL = 5;
      $scope.DEAD_CELL = 0;
      $scope.LIVE_CELL = 1;
      $scope.DEFAULT_CELL_STR = '0100010011110010100010001';

      $scope.gameBoardStart = true;
    };

    $scope.initGame = function (gameBoardType) {
      switch (gameBoardType) {
        case 'default':
          $scope.initDefaultGameCells();
          break;
        case 'random':
          $scope.initRandomGameCells();
          break;
        default:
          $scope.initDefaultGameCells();
          break;
      }

      $scope.generations = 0;
      $scope.gameBoardStart = false;
      $scope.gameBoardInitialized = true;
      $scope.initGameBoard();
    };

    $scope.initDefaultGameCells = function () {
      if (typeof $scope.defaultGameCellsArray === 'undefined') {
        $scope.createDefaultGameCellValues();
      }

      $scope.gameCellsArray = $scope.defaultGameCellsArray;
    };

    $scope.createDefaultGameCellValues = function () {
      var defaultCellsStr = $scope.DEFAULT_CELL_STR,
          cellStr = null,
          cellsArraySize = $scope.MAX_ROW * $scope.MAX_COL,
          cellsArray = new Array(cellsArraySize),
          cellsArrayLength = cellsArray.length,
          index = null;

      // Set all cell values to 0
      for (index = 0; index < cellsArrayLength; index++) {
        cellStr = defaultCellsStr.charAt(index);
        cellsArray[index] = parseInt(cellStr, 10 );
      }

      $scope.defaultGameCellsArray = cellsArray;
    };

    $scope.initRandomGameCells = function () {
      var cellsArraySize = $scope.MAX_ROW * $scope.MAX_COL,
          cellsArray = new Array(cellsArraySize),
          cellsArrayLength = cellsArray.length,
          index = null;

      for (index = 0; index < cellsArrayLength; index++) {
        // Round number to a random generation between 0 < 1
        cellsArray[index] = Math.round(Math.random());
      }

      $scope.gameCellsArray = cellsArray;
    };

    /* Initialize gameBoard array */
    $scope.initGameBoard = function () {
      var GAME_BOARD_SIZE = $scope.GAME_BOARD_SIZE,
          row = null,
          col = null,
          rowColIndex = null,
          maxRow = $scope.MAX_ROW,
          maxCol = $scope.MAX_ROW,
          cellsArray = $scope.gameCellsArray,
          gameBoard = new Array(GAME_BOARD_SIZE);

      // Create gameBoard array of rows and column cells
      for (row = 0; row < maxRow; row++) {
        gameBoard[row] = new Array(this.rowSize);
        rowColIndex = (row * 5);

        for (col = 0; col < maxCol; col++) {
          gameBoard[row][col] = cellsArray[rowColIndex];
          rowColIndex += 1;
        }
      }

      // Init empty gameBoards array and push initial randomized gameBoard to gameBoards
      $scope.gameBoards = [];
      $scope.gameBoards.push(gameBoard);
      $scope.updateGameBoardGeneration();
    };

    /* Create a new generation of cell values to push to gameBoards array */
    $scope.createNewGeneration = function () {
      var gameBoardsLength = $scope.gameBoards.length,
          row = null,
          col = null,
          cell = null,
          maxRow = $scope.MAX_ROW,
          maxCol = $scope.MAX_ROW,
          childGenerationBoard = null;

      // Clone array copy of parentGeneration to childGeneration
      $scope.parentGenerationBoard = $scope.gameBoards[gameBoardsLength - 1];
      childGenerationBoard = CommonArrayService.cloneMultiDimensionalArray($scope.parentGenerationBoard);

      // Create gameBoard array of rows and column cells
      for (row = 0; row < maxRow; row++) {
        for (col = 0; col < maxCol; col++) {
          cell = childGenerationBoard[row][col];
          childGenerationBoard[row][col] = $scope.evolveCell(row, col, cell);
        }
      }

      // Push childGenerationBoard on to gameBoards and update game board generation
      $scope.gameBoards.push(childGenerationBoard);
      $scope.updateGameBoardGeneration();
    };

    $scope.updateGameBoardGeneration = function () {
      var lastGameBoard = null;

      // Update gameBoards array container and number of generations
      $scope.generations += 1;

      // Update gameBoard with last gameBoards item to update the view-model display
      lastGameBoard = $scope.gameBoards.length - 1;
      $scope.gameBoard = $scope.gameBoards[lastGameBoard];
    };

    /* Logic to determine cell values of evolution generation */
    $scope.evolveCell = function (row, col, cell) {
      var deadCell = $scope.DEAD_CELL,
          liveNeighbors = null;

      // Verify which neighbor cells exist in the game board array
      $scope.verifyNeighborCellsExist(row, col);

      liveNeighbors = $scope.sumNeighborCellValues(row, col);

      // If cell equals dead or else alive
      if (cell === deadCell) {
        return $scope.evolveDeadCell(liveNeighbors);
      } else {
        return $scope.evolveLiveCell(liveNeighbors);
      }
    };

    $scope.evolveDeadCell = function (liveNeighbors) {
      var deadCell = $scope.DEAD_CELL,
          liveCell = $scope.LIVE_CELL;

      if (liveNeighbors === 3) {
        return liveCell;
      }

      return deadCell;
    };

    $scope.evolveLiveCell = function (liveNeighbors) {
      var deadCell = $scope.DEAD_CELL,
          liveCell = $scope.LIVE_CELL;

      if (liveNeighbors === 2 || liveNeighbors === 3) {
        return liveCell;
      }

      return deadCell;
    };

    $scope.verifyNeighborCellsExist = function (row, col) {
      var minRow = $scope.MIN_ROW ,
          maxRow = $scope.MAX_ROW - 1,
          minCol = $scope.MIN_COL,
          maxCol = $scope.MAX_ROW - 1;

      $scope.topNeighborExists = false;
      $scope.bottomNeighborExists = false;
      $scope.rightNeighborExists = false;
      $scope.leftNeighborExists = false;

      if (row > minRow) {
        $scope.topNeighborExists = true;
      }

      if (row < maxRow) {
        $scope.bottomNeighborExists = true;
      }

      if (col > minCol) {
        $scope.leftNeighborExists = true;
      }

      if (col < maxCol) {
        $scope.rightNeighborExists = true;
      }
    };

    $scope.sumNeighborCellValues = function (row, col) {
      var board = $scope.parentGenerationBoard,
          top = $scope.topNeighborExists,
          bottom = $scope.bottomNeighborExists,
          left = $scope.leftNeighborExists,
          right = $scope.rightNeighborExists,
          rowMin = row,
          rowMax = row,
          rowIndex = null,
          colMin = col,
          colMax = col,
          colIndex = null,
          liveNeighbors = 0;

      if (top) {
        rowMin -= 1;
      }

      if (bottom) {
        rowMax += 1;
      }

      if (left) {
        colMin -= 1;
      }

      if (right) {
        colMax += 1;
      }

      for (rowIndex = rowMin; rowIndex <= rowMax; rowIndex++) {
        for (colIndex = colMin; colIndex <= colMax; colIndex++) {
          // Continue to next iteration if index equals the cell itself
          if (rowIndex === row && colIndex === col) {
            continue;
          }

          liveNeighbors += board[rowIndex][colIndex];
        }
      }

      return liveNeighbors;
    };

    // Init main flow
    $scope.init();
  });

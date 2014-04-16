'use strict';

angular.module('gameOfLifeApp', [
  'Common.ArrayService'
])
    .controller('MainCtrl', function ($scope, CommonArrayService) {

    /* Init main flow */
    function init() {
      $scope.initVars();
      $scope.initGameBoard();
    }

    /* Init vars within scope */
    $scope.initVars = function () {
      $scope.GAME_BOARD_SIZE = 5;
      $scope.MIN_ROW = 0;
      $scope.MAX_ROW = 5;
      $scope.MIN_COL = 0;
      $scope.MAX_COL = 5;
      $scope.DEAD_CELL = 0;
      $scope.LIVE_CELL = 1;
    };

    /* Initialize gameBoard array */
    $scope.initGameBoard = function () {
      var GAME_BOARD_SIZE = $scope.GAME_BOARD_SIZE,
          row = null,
          col = null,
          maxRow = $scope.MAX_ROW,
          maxCol = $scope.MAX_ROW,
          gameBoard = new Array(GAME_BOARD_SIZE);

      // Create gameBoard array of rows and column cells
      for (row = 0; row < maxRow; row++) {
        gameBoard[row] = new Array(this.rowSize);

        for (col = 0; col < maxCol; col++) {
          // Round number to a random generation between 0 < 1
          gameBoard[row][col] = Math.round(Math.random());
        }
      }

      // Init empty gameBoards array and push initial randomized gameBoard to gameBoards
      $scope.gameBoards = [];
      $scope.gameBoards.push(gameBoard);
    };

    /* Create a new generation of cell values to push to gameBoards array */
    $scope.createNewGeneration = function () {
      var GAME_BOARD_SIZE = $scope.GAME_BOARD_SIZE,
          gameBoardsLength = $scope.gameBoards.length,
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

      // Push new childGeneration game board to gameBoards
      $scope.gameBoards.push(childGenerationBoard);
    };

    /* Logic to determine cell values of evolution generation */
    $scope.evolveCell = function (row, col, cell) {
      var deadCell = $scope.DEAD_CELL;

      // Verify which neighbor cells exist in the game board array
      $scope.verifyNeighborCellsExist(row, col);

      // If cell equals dead or else alive
      if (cell === deadCell) {
        return $scope.evolveDeadCell();
      } else {
        return $scope.evolveLiveCell();
      }
    };

    $scope.evolveDeadCell = function (neighbors) {
      var deadCell = $scope.DEAD_CELL,
          liveCell = $scope.LIVE_CELL;

      if (neighbors === 3) {
        return liveCell;
      }

      return deadCell;
    };

    $scope.evolveLiveCell = function (neighbors) {
      var deadCell = $scope.DEAD_CELL,
          liveCell = $scope.LIVE_CELL;

      if (neighbors === 2 || neighbors === 3) {
        return liveCell;
      }

      return deadCell
    };

    $scope.verifyNeighborCellsExist = function (row, col) {
      var minRow = $scope.MIN_ROW ,
          maxRow = $scope.MAX_ROW - 1,
          minCol = $scope.MIN_COL,
          maxCol = $scope.MAX_ROW - 1;

      $scope.topNeighborExists = false;
      $scope.rightNeighborExists = false;
      $scope.bottomNeighborExists = false;
      $scope.leftNeighborExists = false;

      if (row > minRow) {
        $scope.topNeighborExists = true;
      }

      if (col < maxCol) {
        $scope.rightNeighborExists = true;
      }

      if (row < maxRow) {
        $scope.bottomNeighborExists = true;
      }

      if (col > minCol) {
        $scope.leftNeighborExists = true;
      }
    };

    // Init main flow
    init();
  });

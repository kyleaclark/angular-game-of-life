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
    };

    /* Initialize gameBoard array */
    $scope.initGameBoard = function () {
      var GAME_BOARD_SIZE = $scope.GAME_BOARD_SIZE,
          row = null,
          col = null,
          colSize = GAME_BOARD_SIZE,
          rowSize = GAME_BOARD_SIZE,
          gameBoard = new Array(GAME_BOARD_SIZE);

      // Create gameBoard array of rows and column cells
      for (row = 0; row < rowSize; row++) {
        gameBoard[row] = new Array(this.rowSize);

        for (col = 0; col < colSize; col++) {
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
          colSize = GAME_BOARD_SIZE,
          rowSize = GAME_BOARD_SIZE,
          childGenerationBoard = null;

      // Clone array copy of parentGeneration to childGeneration
      $scope.parentGenerationBoard = $scope.gameBoards[gameBoardsLength - 1];
      childGenerationBoard = CommonArrayService.cloneMultiDimensionalArray($scope.parentGenerationBoard);

      // Create gameBoard array of rows and column cells
      for (row = 0; row < rowSize; row++) {
        for (col = 0; col < colSize; col++) {
          cell = childGenerationBoard[row][col];
          childGenerationBoard[row][col] = $scope.evolveCell(row, col, cell);
        }
      }

      // Push new childGeneration game board to gameBoards
      $scope.gameBoards.push(childGenerationBoard);
    };

    /* Logic to determine cell values of evolution generation */
    $scope.evolveCell = function () {
      return 1;
    };

    // Init main flow
    init();
  });

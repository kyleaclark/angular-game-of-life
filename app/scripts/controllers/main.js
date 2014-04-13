'use strict';

angular.module('gameOfLifeApp')
  .controller('MainCtrl', function ($scope) {
    $scope.gameBoard = null;

    function init () {
      $scope.initGameBoard();
    }

    /* Initialize gameBoard array */
    $scope.initGameBoard = function () {
      var GAME_BOARD_SIZE = 5,
          gameBoard = new Array(GAME_BOARD_SIZE),
          row = null,
          col = null;

      // Create gameBoard array of rows and column cells
      for (row = 0; row < GAME_BOARD_SIZE; row++) {
        gameBoard[row] = new Array(GAME_BOARD_SIZE);

        for (col = 0; col < GAME_BOARD_SIZE; col++) {
          // Round number to a random generation between 0 < 1
          gameBoard[row][col] = Math.round(Math.random());
        }
      }

      $scope.gameBoard = gameBoard;
    };

    init();
  });

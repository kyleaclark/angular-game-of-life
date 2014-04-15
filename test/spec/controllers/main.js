'use strict';

describe('Controller: MainCtrl', function () {

  var MainCtrl = null,
      scope = null;

  // Initialize the controller and a mock scope
  beforeEach(function () {
    module('gameOfLifeApp');

    inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      MainCtrl = $controller('MainCtrl', {
        $scope: scope
      });
    });
  });

  describe('When initializing variables', function () {

    it('should set values of scope variables', function () {
      // Act
      scope.initVars();

      // Assert
      expect(scope.GAME_BOARD_SIZE).to.equal(5);
      expect(scope.DEAD_CELL).to.equal(0);
      expect(scope.LIVE_CELL).to.equal(0);
    });

  });

  describe('When initializing a gameBoard', function () {

    it('should define an empty gameBoards array container', function () {
      // Act
      scope.initGameBoard();

      // Assert
      expect(scope.gameBoards).to.exist;
      expect(scope.gameBoards).to.be.instanceof(Array);
    });

    it('should push a new 5x5 game board array on to gameBoards array container', function () {
      var gameBoard = null;

      // Act
      scope.initGameBoard();
      gameBoard = scope.gameBoards[0];

      // Assert
      expect(scope.gameBoards[0]).to.exist;
      expect(scope.gameBoards[0]).to.be.instanceof(Array);
      expect(gameBoard[4][4]).to.exist;
    });

    it('should populate each game board cell with a value of 0 or 1', function () {
      // Arrange
      var GAME_BOARD_SIZE = 5,
          gameBoard = null,
          row = null,
          col = null;

      // Act
      scope.initGameBoard();
      gameBoard = scope.gameBoards[0];

      // Assert
      for (row = 0; row < GAME_BOARD_SIZE; row++) {
        for (col = 0; col < GAME_BOARD_SIZE; col++) {
          expect(gameBoard[row][col]).to.be.at.least(0);
          expect(gameBoard[row][col]).to.be.at.most(1);
        }
      }
    });

  });

  describe('When creating a new generation on the game board', function () {

    it('should assign the last gameBoard in gameBoards array container to scope.parentGenerationBoard', function () {
      // Arrange
      var gameBoard = null,
          gameBoardsLength = null;

      scope.initGameBoard();
      gameBoardsLength = scope.gameBoards.length;
      gameBoard = scope.gameBoards[gameBoardsLength - 1];

      // Act
      scope.createNewGeneration();

      // Assert
      expect(scope.parentGenerationBoard).to.exist;
      expect(scope.parentGenerationBoard).to.eql(gameBoard);
    });

    it('should push a new 5x5 game board array on to gameBoards array container', function () {
      // Arrange
      var gameBoardsLength = null,
          newGameBoardsLength = null;

      scope.initGameBoard();
      gameBoardsLength = scope.gameBoards.length;

      // Act
      scope.createNewGeneration();
      newGameBoardsLength = scope.gameBoards.length;

      // Assert
      expect(scope.gameBoards[gameBoardsLength]).to.exist;
      expect(scope.gameBoards[gameBoardsLength]).to.be.instanceof(Array);
      expect(newGameBoardsLength).to.equal(gameBoardsLength + 1);
    });

    it('should evolve each cell in the new game board to a value of 1', function () {
      // Arrange
      var GAME_BOARD_SIZE = 5,
          gameBoardsLength = null,
          gameBoard = null,
          row = null,
          col = null;

      scope.initGameBoard();
      gameBoardsLength = scope.gameBoards.length;

      // Act
      scope.createNewGeneration();
      gameBoard = scope.gameBoards[gameBoardsLength];

      // Assert
      for (row = 0; row < GAME_BOARD_SIZE; row++) {
        for (col = 0; col < GAME_BOARD_SIZE; col++) {
          expect(gameBoard[row][col]).to.equal(1);
        }
      }
    });

  });

  describe('When the evolveCell method is called to evolve an individual cell generation', function () {

    it.skip('should return a value of 0 to equal a dead cell', function () {

    });

    it.skip('should return a value of 1 to equal a live cell', function () {

    });

    it.skip('should return a dead cell value if a live cell has fewer than two live neighbors', function () {

    });

    it.skip('should return a live cell value if a live cell has two or three live neighbors', function () {

    });

    it.skip('should return a dead cell value if a live cell has more than three live neighbors', function () {

    });

    it.skip('should return a live cell value if a dead cell has exactly three live neighbors', function () {

    });

  });

});

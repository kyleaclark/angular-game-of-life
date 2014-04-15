'use strict';

describe('Controller: MainCtrl', function () {

  var MainCtrl = null,
      scope = null,
      spy = sinon.spy;

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
      expect(scope.MIN_ROW).to.equal(0);
      expect(scope.MAX_ROW).to.equal(5);
      expect(scope.MIN_COL).to.equal(0);
      expect(scope.MAX_COL).to.equal(5);
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

    it('should call verifyNeighborCellsExist method to verify which neighbor cells exist for the given row and col', function () {
      // Arrange
      spy(scope, 'verifyNeighborCellsExist');

      // Act
      scope.evolveCell(0, 0);

      // Assert
      expect(scope.verifyNeighborCellsExist.calledOnce).to.be.true;
      expect(scope.verifyNeighborCellsExist.calledWith(0, 0)).to.be.true;
    });

    it('should return a value of 1', function () {
      // Arrange
      var cell = null;

      // Act
      cell = scope.evolveCell();

      // Assert
      expect(cell).to.equal(1);
    });

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

  describe('When the verifyNeighborExists method is called', function () {

    it('should set the top neighbor cell exists to true only if row is greater than the first row', function () {
      // Arrange
      var topTestOne = false,
          topTestTwo = false;

      // Act
      scope.verifyNeighborCellsExist(scope.MIN_ROW, 0);
      topTestOne = scope.topNeighborExists;

      scope.verifyNeighborCellsExist(scope.MIN_ROW + 1, 0);
      topTestTwo = scope.topNeighborExists;

      // Assert
      expect(topTestOne).to.be.false;
      expect(topTestTwo).to.be.true;
    });

    it('should set the right neighbor cell exists to true only if col is less than the last col', function () {
      // Arrange
      var rightTestOne = false,
          rightTestTwo = false;

      // Act
      scope.verifyNeighborCellsExist(0, scope.MAX_COL - 1);
      rightTestOne = scope.rightNeighborExists;

      scope.verifyNeighborCellsExist(0, scope.MAX_COL - 2);
      rightTestTwo = scope.rightNeighborExists;

      // Assert
      expect(rightTestOne).to.be.false;
      expect(rightTestTwo).to.be.true;
    });

    it('should set the bottom neighbor cell exists to true only if row is less than the last row', function () {
      // Arrange
      var bottomTestOne = false,
          bottomTestTwo = false;

      // Act
      scope.verifyNeighborCellsExist(scope.MAX_ROW - 1, 0);
      bottomTestOne = scope.bottomNeighborExists;

      scope.verifyNeighborCellsExist(scope.MAX_ROW - 2, 0);
      bottomTestTwo = scope.bottomNeighborExists;

      // Assert
      expect(bottomTestOne).to.be.false;
      expect(bottomTestTwo).to.be.true;
    });

    it('should set the left neighbor cell exists to true only if col is greater than the first col', function () {
      // Arrange
      var leftTestOne = false,
          leftTestTwo = false;

      // Act
      scope.verifyNeighborCellsExist(0, scope.MIN_COL);
      leftTestOne = scope.leftNeighborExists;

      scope.verifyNeighborCellsExist(0, scope.MIN_COL + 1);
      leftTestTwo = scope.leftNeighborExists;

      // Assert
      expect(leftTestOne).to.be.false;
      expect(leftTestTwo).to.be.true;
    });

  });

});

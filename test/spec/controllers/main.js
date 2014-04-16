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

  describe('When initializing the scope flow', function () {

    it('should initialize scope variables', function () {
      // Arrange
      spy(scope, 'initVars');

      // Act
      scope.initVars();

      // Assert
      expect(scope.initVars.calledOnce).to.be.true;
    });

    it('should create a random game board', function () {
      // Arrange
      spy(scope, 'createRandomGameBoard');

      // Act
      scope.createRandomGameBoard();

      // Assert
      expect(scope.createRandomGameBoard.calledOnce).to.be.true;
    });

  });

  describe('When initializing scope variables', function () {

    it('should set values of scope constants', function () {
      // Act
      scope.initVars();

      // Assert
      expect(scope.GAME_BOARD_SIZE).to.equal(5);
      expect(scope.MIN_ROW).to.equal(0);
      expect(scope.MAX_ROW).to.equal(5);
      expect(scope.MIN_COL).to.equal(0);
      expect(scope.MAX_COL).to.equal(5);
      expect(scope.DEAD_CELL).to.equal(0);
      expect(scope.LIVE_CELL).to.equal(1);
    });

  });

  describe('When creating a random game board', function () {

    it('should create an array with length with the product of MAX_ROW multiplied by MAX_COL', function () {
      // Arrange
      var gameBoard = null,
          arrayLength = scope.MAX_ROW * scope.MAX_COL;

      // Act
      scope.createRandomGameBoard();
      gameBoard = scope.randomGameBoard;

      // Assert
      expect(gameBoard.length).to.equal(arrayLength);
    });

    it('should create a game board array of random cell values', function () {
      // Arrange
      var gameBoard = null,
          gameBoardLength = null,
          cell = null,
          index = null;

      // Act
      scope.createRandomGameBoard();
      gameBoard = scope.randomGameBoard;
      gameBoardLength = gameBoard.length;

      // Assert
      for (index = 0; index < gameBoardLength; index++) {
        cell = gameBoard[index];
        expect(cell).to.be.at.least(0);
        expect(cell).to.be.at.most(1);
      }
    });

  });

  describe('When initializing a gameBoard', function () {

    it('should define an empty gameBoards array container', function () {
      // Arrange
      var cellValues = null;

      scope.createRandomGameBoard();
      cellValues = scope.randomGameBoard;

      // Act
      scope.initGameBoard(cellValues);

      // Assert
      expect(scope.gameBoards).to.exist;
      expect(scope.gameBoards).to.be.instanceof(Array);
    });

    it('should push a new game board array on to gameBoards array container', function () {
      // Arrange
      var cellValues = null,
          gameBoard = null;

      scope.createRandomGameBoard();
      cellValues = scope.randomGameBoard;

      // Act
      scope.initGameBoard(cellValues);
      gameBoard = scope.gameBoards[0];

      // Assert
      expect(gameBoard).to.exist;
      expect(gameBoard).to.be.instanceof(Array);
    });

    it('should push a 2d array game board defined by the scope MAX_ROW and MAX_COL values', function () {
      var cellValues = null,
          gameBoard = null,
          rowSize = scope.MAX_ROW - 1,
          colSize = scope.MAX_COL - 1;

      scope.createRandomGameBoard();
      cellValues = scope.randomGameBoard;

      // Act
      scope.initGameBoard(cellValues);
      gameBoard = scope.gameBoards[0];

      // Assert
      expect(gameBoard[rowSize][colSize]).to.exist;
    });

    it('should populate each game board cell with the specified cellsArray of values', function () {
      // Arrange
      var rowSize = scope.ROW_SIZE,
          colSize = scope.COL_SIZE,
          gameBoard = null,
          row = null,
          col = null,
          cell = null,
          cellValues = null;

      scope.createRandomGameBoard();
      cellValues = scope.randomGameBoard;

      // Act
      scope.initGameBoard(cellValues);
      gameBoard = scope.gameBoards[0];

      // Assert
      for (row = 0; row < rowSize; row++) {
        for (col = 0; col < colSize; col++) {
          cell = gameBoard[row][col];
          expect(cell).to.be.at.least(0);
          expect(cell).to.be.at.most(1);
        }
      }
    });

  });

  describe('When creating a new generation on the game board', function () {

    it('should assign the last gameBoard in gameBoards array container to scope.parentGenerationBoard', function () {
      // Arrange
      var gameBoard = null,
          gameBoardsLength = null;

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

      gameBoardsLength = scope.gameBoards.length;

      // Act
      scope.createNewGeneration();
      newGameBoardsLength = scope.gameBoards.length;

      // Assert
      expect(scope.gameBoards[gameBoardsLength]).to.exist;
      expect(scope.gameBoards[gameBoardsLength]).to.be.instanceof(Array);
      expect(newGameBoardsLength).to.equal(gameBoardsLength + 1);
    });

    it('should send each cell with its row and col to the evolveCell method', function () {
      // Arrange
      var rowSize = scope.ROW_SIZE,
          colSize = scope.COL_SIZE,
          gameBoardsLength = null,
          gameBoard = null,
          row = null,
          col = null,
          cell = null;

      // Act
      scope.createNewGeneration();
      gameBoard = scope.gameBoards[gameBoardsLength];

      // Assert
      for (row = 0; row < rowSize; row++) {
        for (col = 0; col < colSize; col++) {
          cell = gameBoard[row][col];
          expect(scope.evolveCell.calledWith(row, col, cell)).to.be.true;
        }
      }
    });

  });

  describe('When the evolveCell method is called to evolve an individual cell generation', function () {

    it('should call verifyNeighborCellsExist method to verify which neighbor cells exist for the row and col of the cell', function () {
      // Arrange
      spy(scope, 'verifyNeighborCellsExist');

      // Act
      scope.evolveCell(0, 0);

      // Assert
      expect(scope.verifyNeighborCellsExist.calledOnce).to.be.true;
      expect(scope.verifyNeighborCellsExist.calledWith(0, 0)).to.be.true;
    });

    describe('And given the cell is dead', function () {

      it('should return the value returned from the evolveDeadCell method', function () {
        var cell = scope.DEAD_CELL,
            genCell = null,
            genDeadCell = null;

        // Act
        genCell = scope.evolveCell(0, 0, cell);
        genDeadCell = scope.evolveDeadCell();

        // Assert
        expect(genCell).to.equal(genDeadCell);
      });

    });

    describe('And given the cell is live', function () {

      it('should return the value returned from the evolveLiveCell method', function () {
        var cell = scope.LIVE_CELL,
            genCell = null,
            genLiveCell = null;

        // Act
        genCell = scope.evolveCell(0, 0, cell);
        genLiveCell = scope.evolveLiveCell();

        // Assert
        expect(genCell).to.equal(genLiveCell);
      });

    });

  });

  describe('When the evolveDeadCell method is called to evolve the value of a dead cell', function () {

    it('should only return a value of 0 or 1', function () {
      // Arrange
      var cells = [],
          cellsLength = null,
          index = null;

      // Act
      cells[0] = scope.evolveDeadCell(0);
      cells[1] = scope.evolveDeadCell(1);
      cells[2] = scope.evolveDeadCell(2);
      cells[3] = scope.evolveDeadCell(3);
      cells[4] = scope.evolveDeadCell(8);

      cellsLength = cells.length;

      // Assert
      for (index = 0; index < cellsLength; index++) {
        expect(cells[index]).to.be.at.least(0);
        expect(cells[index]).to.be.at.most(1);
      }
    });

    it('should return a live cell value if a dead cell has exactly three live neighbors', function () {
      // Arrange
      var liveCell = scope.LIVE_CELL,
          neighbors = 3,
          cell = null;

      // Act
      cell = scope.evolveDeadCell(neighbors);

      // Assert
      expect(cell).to.equal(liveCell);
    });

    it('should return a dead cell value if a dead cell does not have exactly three live neighbors', function () {
      // Arrange
      var deadCell = scope.DEAD_CELL,
          cells = [],
          cellsLength = null,
          index = null;

      // Act
      cells[0] = scope.evolveDeadCell(0);
      cells[1] = scope.evolveDeadCell(1);
      cells[2] = scope.evolveDeadCell(2);
      cells[3] = scope.evolveDeadCell(4);
      cells[4] = scope.evolveDeadCell(8);

      cellsLength = cells.length;

      // Assert
      for (index = 0; index < cellsLength; index++) {
        expect(cells[index]).to.equal(deadCell);
      }
    });

  });

  describe('When the evolveLiveCell method is called to evolve the value of a live cell', function () {

    it('should only return a value of 0 or 1', function () {
      // Arrange
      var cells = [],
          cellsLength = null,
          index = null;

      // Act
      cells[0] = scope.evolveLiveCell(0);
      cells[1] = scope.evolveLiveCell(1);
      cells[2] = scope.evolveLiveCell(2);
      cells[3] = scope.evolveLiveCell(3);
      cells[4] = scope.evolveLiveCell(8);

      cellsLength = cells.length;

      // Assert
      for (index = 0; index < cellsLength; index++) {
        expect(cells[index]).to.be.at.least(0);
        expect(cells[index]).to.be.at.most(1);
      }
    });

    it('should return a dead cell value if a live cell has fewer than two live neighbors', function () {
      // Arrange
      var deadCell = scope.DEAD_CELL,
          cells = [],
          cellsLength = null,
          index = null;

      // Act
      cells[0] = scope.evolveLiveCell(0);
      cells[1] = scope.evolveLiveCell(1);
      cells[2] = scope.evolveLiveCell(-1);

      cellsLength = cells.length;

      // Assert
      for (index = 0; index < cellsLength; index++) {
        expect(cells[index]).to.equal(deadCell);
      }
    });

    it('should return a live cell value if a live cell has two or three live neighbors', function () {
      // Arrange
      var liveCell = scope.LIVE_CELL,
          cells = [],
          cellsLength = null,
          index = null;

      // Act
      cells[0] = scope.evolveLiveCell(2);
      cells[1] = scope.evolveLiveCell(3);

      cellsLength = cells.length;

      // Assert
      for (index = 0; index < cellsLength; index++) {
        expect(cells[index]).to.equal(liveCell);
      }
    });

    it('should return a dead cell value if a live cell has more than three live neighbors', function () {
      // Arrange
      var deadCell = scope.DEAD_CELL,
          cells = [],
          cellsLength = null,
          index = null;

      // Act
      cells[0] = scope.evolveLiveCell(4);
      cells[1] = scope.evolveLiveCell(5);
      cells[2] = scope.evolveLiveCell(8);

      cellsLength = cells.length;

      // Assert
      for (index = 0; index < cellsLength; index++) {
        expect(cells[index]).to.equal(deadCell);
      }
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

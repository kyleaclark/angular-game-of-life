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

      // Restore
      scope.initVars.restore();
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
      expect(scope.DEFAULT_CELL_STR).to.equal('0100010011110010100010001');
      expect(scope.gameBoardStart).to.equal(true);
    });

  });

  describe('When initializing a new game', function () {

    it('should make a method call to init default game cells for a default game type', function () {
      // Arrange
      spy(scope, 'initDefaultGameCells');

      // Act
      scope.initGame('default');

      // Assert
      expect(scope.initDefaultGameCells.calledOnce).to.be.true;

      // Restore
      scope.initDefaultGameCells.restore();
    });

    it('should make a method all to init random game cells for a random game type', function () {
      // Arrange
      spy(scope, 'initRandomGameCells');

      // Act
      scope.initGame('random');

      // Assert
      expect(scope.initRandomGameCells.calledOnce).to.be.true;

      // Restore
      scope.initRandomGameCells.restore();
    });

    it('should make a method all to init default game cells for a non-specified game type', function () {
      // Arrange
      spy(scope, 'initDefaultGameCells');

      // Act
      scope.initGame();

      // Assert
      expect(scope.initDefaultGameCells.calledOnce).to.be.true;

      // Restore
      scope.initDefaultGameCells.restore();
    });

    it('should define the value of generations', function () {
      // Act
      scope.initGame();

      // Assert
      expect(scope.generations).to.exist;
    });

    it('should set the value of game board start to false', function () {
      // Act
      scope.initGame();

      // Assert
      expect(scope.gameBoardStart).to.be.false;
    });

    it('should set the value of game board initialized to true', function () {
      // Act
      scope.initGame();

      // Assert
      expect(scope.gameBoardInitialized).to.be.true;
    });

    it('should make a method all to init game board', function () {
      // Arrange
      spy(scope, 'initGameBoard');

      // Act
      scope.initGame();

      // Assert
      expect(scope.initGameBoard.calledOnce).to.be.true;

      // Restore
      scope.initGameBoard.restore();
    });

  });

  describe('When initializing default game cells', function () {

    describe('Given a default game cells array is not defined', function () {

      it('should make a method call to create default game cell values', function () {
        // Arrange
        scope.defaultGameCellsArray = undefined;
        spy(scope, 'createDefaultGameCellValues');

        // Act
        scope.initDefaultGameCells();

        // Assert
        expect(scope.createDefaultGameCellValues.calledOnce).to.be.true;

        // Restore
        scope.createDefaultGameCellValues.restore();
      });

    });

    it('should set the value of the game cells array to the default game cells array', function () {
      // Arrange
      scope.defaultGameCellsArray = ['1', '2', '3'];

      // Act
      scope.initDefaultGameCells();

      // Assert
      expect(scope.gameCellsArray).to.eql(scope.defaultGameCellsArray);
    });

  });

  describe('When creating default game cell values', function () {

    it('should create a default game cells array with the length of the product of MAX_ROW multiplied by MAX_COL', function () {
      // Arrange
      var arrayLength = scope.MAX_ROW * scope.MAX_COL;

      // Act
      scope.createDefaultGameCellValues();

      // Assert
      expect(scope.defaultGameCellsArray).to.exist;
      expect(scope.defaultGameCellsArray).to.be.instanceof(Array);
      expect(scope.defaultGameCellsArray.length).to.equal(arrayLength);
    });

    it('should contain cell values matching the values in the default cell string data', function () {
      // Arrange
      var index = null,
          cellStr = null,
          cellValue = null,
          cellsArrayLength = scope.DEFAULT_CELL_STR.length;

      // Act
      scope.createDefaultGameCellValues();

      // Assert
      for (index = 0; index < cellsArrayLength; index++) {
        cellStr = scope.DEFAULT_CELL_STR.charAt(index);
        cellValue = parseInt(cellStr, 10 );
        expect(scope.defaultGameCellsArray[index]).to.equal(cellValue);
      }
    });

  });

  describe('When initializing random game cells', function () {

    it('should define the game cells array with the length of the product of MAX_ROW multiplied by MAX_COL', function () {
      // Arrange
      var arrayLength = scope.MAX_ROW * scope.MAX_COL;

      // Act
      scope.initRandomGameCells();

      // Assert
      expect(scope.gameCellsArray).to.exist;
      expect(scope.gameCellsArray).to.be.instanceof(Array);
      expect(scope.gameCellsArray.length).to.equal(arrayLength);
    });

    it('should set the game cells array to contain random cell values of 0 or 1', function () {
      // Arrange
      var gameCells = null,
          gameCellsLength = null,
          gameBoardLength = null,
          cell = null,
          index = null;

      // Act
      scope.initRandomGameCells();
      gameCells = scope.gameCellsArray;
      gameCellsLength = gameCells.length;

      // Assert
      for (index = 0; index < gameCellsLength; index++) {
        cell = gameCells[index];
        expect(cell).to.be.at.least(0);
        expect(cell).to.be.at.most(1);
      }
    });

  });

  describe('When initializing game board', function () {

    it('should define an empty game boards array container', function () {
      // Arrange
      scope.initDefaultGameCells();

      // Act
      scope.initGameBoard();

      // Assert
      expect(scope.gameBoards).to.exist;
      expect(scope.gameBoards).to.be.instanceof(Array);
    });

    it('should push a new game board on to the game boards array container', function () {
      // Arrange
      var gameBoard = null;

      scope.initDefaultGameCells();

      // Act
      scope.initGameBoard();
      gameBoard = scope.gameBoards[0];

      // Assert
      expect(gameBoard).to.exist;
      expect(gameBoard).to.be.instanceof(Array);
    });

    it('should create a 2d array game board defined by the MAX_ROW and MAX_COL values', function () {
      var cellValues = null,
          gameBoard = null,
          rowSize = scope.MAX_ROW - 1,
          colSize = scope.MAX_COL - 1;

      scope.initDefaultGameCells();

      // Act
      scope.initGameBoard(cellValues);
      gameBoard = scope.gameBoards[0];

      // Assert
      expect(gameBoard[rowSize][colSize]).to.exist;
    });

    it('should populate each game board cell with the specified game cells array of values', function () {
      // Arrange
      var rowSize = scope.ROW_SIZE,
          colSize = scope.COL_SIZE,
          gameBoard = null,
          cellValues = null,
          row = null,
          col = null,
          rowColIndex = null,
          cell = null;

      scope.initDefaultGameCells();
      cellValues = scope.gameCellsArra

      // Act
      scope.initGameBoard();
      gameBoard = scope.gameBoards[0];

      // Assert
      for (row = 0; row < rowSize; row++) {
        rowColIndex = (row * 5);
        for (col = 0; col < colSize; col++) {
          rowColIndex += 1;
          cell = cellValues[row + col];
          expect(gameBoard[row][col]).to.equal(cell);
        }
      }
    });

    it('should make a method call to update the game board generation', function () {
      // Arrange
      spy(scope, 'updateGameBoardGeneration');

      scope.initDefaultGameCells();

      // Act
      scope.initGameBoard();

      // Assert
      expect(scope.updateGameBoardGeneration.calledOnce).to.be.true;

      // Restore
      scope.updateGameBoardGeneration.restore();
    });

  });

  describe('When creating a new generation on the game board', function () {

    it('should assign the last gameBoard in gameBoards array container to scope.parentGenerationBoard', function () {
      // Arrange
      var gameBoard = null,
          gameBoardsLength = null;

      scope.initGame();

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

      scope.initGame();

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

      scope.initGame();

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

    it('should make a method call to update the game board generation', function () {
      // Arrange
      scope.initGame();

      spy(scope, 'updateGameBoardGeneration');

      // Act
      scope.createNewGeneration();

      // Assert
      expect(scope.updateGameBoardGeneration.calledOnce).to.be.true;

      // Restore
      scope.updateGameBoardGeneration.restore();
    });

  });

  describe('When updating the game board generation', function () {

    it('should set the value of generations to plus 1', function () {
      // Arrange
      var plusOneGeneration = 0;

      scope.initGame();

      plusOneGeneration = scope.generations + 1;

      // Act
      scope.updateGameBoardGeneration();

      // Assert
      expect(scope.generations).to.equal(plusOneGeneration);
    });

    it('should set the game board value to the last item in the game boards container', function () {
      // Arrange
      var lastGameBoard = null;

      scope.initGame();

      // Act
      scope.updateGameBoardGeneration();
      lastGameBoard = scope.gameBoards.length - 1;

      // Assert
      expect(scope.gameBoard).to.eql(scope.gameBoards[lastGameBoard]);
    })

  });

  describe('When the evolveCell method is called to evolve an individual cell generation', function () {

    var cellsArray = null;

    beforeEach(function () {
      var cellsArraySize = 5,
          liveCell = 1,
          row = null,
          col = null;

      cellsArray = new Array(cellsArraySize);

      for (row = 0; row < cellsArraySize; row++) {
        cellsArray[row] = new Array(cellsArraySize);

        for (col = 0; col < cellsArraySize; col++) {
          cellsArray[row][col] = liveCell;
        }
      }
    });

    it('should call verifyNeighborCellsExist method to verify which neighbor cells exist for the row and col of the cell', function () {
      // Arrange
      spy(scope, 'verifyNeighborCellsExist');

      scope.parentGenerationBoard = cellsArray;

      // Act
      scope.evolveCell(0, 0);

      // Assert
      expect(scope.verifyNeighborCellsExist.calledOnce).to.be.true;
      expect(scope.verifyNeighborCellsExist.calledWith(0, 0)).to.be.true;

      // Restore
      scope.verifyNeighborCellsExist.restore();
    });

    it('should call sumNeighborCellValues method to get the live neighbors value for the row and col of the cell', function () {
      // Arrange
      spy(scope, 'sumNeighborCellValues');

      scope.parentGenerationBoard = cellsArray;

      // Act
      scope.evolveCell(0, 0);

      // Assert
      expect(scope.sumNeighborCellValues.calledOnce).to.be.true;
      expect(scope.sumNeighborCellValues.calledWith(0, 0)).to.be.true;

      // Restore
      scope.sumNeighborCellValues.restore();
    });

    describe('And given the cell is dead', function () {

      it('should return the value returned from the evolveDeadCell method', function () {
        var cell = scope.DEAD_CELL,
            genCell = null,
            genDeadCell = null,
            liveNeighbors = 0;

        scope.parentGenerationBoard = cellsArray;

        // Act
        genCell = scope.evolveCell(0, 0, cell);
        liveNeighbors = scope.sumNeighborCellValues(0, 0);
        genDeadCell = scope.evolveDeadCell(liveNeighbors);

        // Assert
        expect(genCell).to.equal(genDeadCell);
      });

    });

    describe('And given the cell is live', function () {

      it('should return the value returned from the evolveLiveCell method', function () {
        var cell = scope.LIVE_CELL,
            genCell = null,
            genLiveCell = null,
            liveNeighbors = 0;

        scope.parentGenerationBoard = cellsArray;

        // Act
        genCell = scope.evolveCell(0, 0, cell);
        liveNeighbors = scope.sumNeighborCellValues(0, 0);
        genLiveCell = scope.evolveLiveCell(liveNeighbors);

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

  describe('When the neighbor cell values are summed', function () {

    var cellsArray = null;

    beforeEach(function () {
      var cellsArraySize = 5,
          liveCell = 1,
          row = null,
          col = null;

      cellsArray = new Array(cellsArraySize);

      for (row = 0; row < cellsArraySize; row++) {
        cellsArray[row] = new Array(cellsArraySize);

        for (col = 0; col < cellsArraySize; col++) {
          cellsArray[row][col] = liveCell;
        }
      }
    });

    /*
     POSSIBLE NEIGHBOR PERMUTATIONS
      T - B - L - R
      T - B - L
      T - B -   - R
      T -   - L - R
      T -   - L
      T -   -   - R
          B - L - R
          B - L
          B -   - R
    */

    it('should sum for the top, bottom, left, right neighbor permutation', function () {
      // Arrange
      var liveNeighbors = null;

      scope.parentGenerationBoard = cellsArray;
      scope.verifyNeighborCellsExist(2, 2);

      // Act
      liveNeighbors = scope.sumNeighborCellValues(2, 2);

      // Assert
      expect(liveNeighbors).to.equal(8);
    });

    it('should sum for the top, bottom, left neighbor permutation', function () {
      // Arrange
      var liveNeighbors = null,
          colMax = scope.MAX_COL - 1;

      scope.parentGenerationBoard = cellsArray;
      scope.verifyNeighborCellsExist(2, colMax);

      // Act
      liveNeighbors = scope.sumNeighborCellValues(2, colMax);

      // Assert
      expect(liveNeighbors).to.equal(5);
    });

    it('should sum for the top, bottom, right neighbor permutation', function () {
      // Arrange
      var liveNeighbors = null;

      scope.parentGenerationBoard = cellsArray;
      scope.verifyNeighborCellsExist(2, 0);

      // Act
      liveNeighbors = scope.sumNeighborCellValues(2, 0);

      // Assert
      expect(liveNeighbors).to.equal(5);
    });

    it('should sum for the top, left, right neighbor permutation', function () {
      // Arrange
      var liveNeighbors = null,
          rowMax = scope.MAX_ROW - 1;

      scope.parentGenerationBoard = cellsArray;
      scope.verifyNeighborCellsExist(rowMax, 2);

      // Act
      liveNeighbors = scope.sumNeighborCellValues(rowMax, 2);

      // Assert
      expect(liveNeighbors).to.equal(5);
    });

    it('should sum for the top, left neighbor permutation', function () {
      // Arrange
      var liveNeighbors = null,
          rowMax = scope.MAX_ROW - 1,
          colMax = scope.MAX_COL - 1;

      scope.parentGenerationBoard = cellsArray;
      scope.verifyNeighborCellsExist(rowMax, colMax);

      // Act
      liveNeighbors = scope.sumNeighborCellValues(rowMax, colMax);

      // Assert
      expect(liveNeighbors).to.equal(3);
    });

    it('should sum for the top, right neighbor permutation', function () {
      // Arrange
      var liveNeighbors = null,
          rowMax = scope.MAX_ROW - 1;

      scope.parentGenerationBoard = cellsArray;
      scope.verifyNeighborCellsExist(rowMax, 0);

      // Act
      liveNeighbors = scope.sumNeighborCellValues(rowMax, 0);

      // Assert
      expect(liveNeighbors).to.equal(3);
    });

    it('should sum for the bottom, left, right neighbor permutation', function () {
      // Arrange
      var liveNeighbors = null;

      scope.parentGenerationBoard = cellsArray;
      scope.verifyNeighborCellsExist(0, 2);

      // Act
      liveNeighbors = scope.sumNeighborCellValues(0, 2);

      // Assert
      expect(liveNeighbors).to.equal(5);
    });

    it('should sum for the bottom, left neighbor permutation', function () {
      // Arrange
      var liveNeighbors = null,
          colMax = scope.MAX_COL - 1;

      scope.parentGenerationBoard = cellsArray;
      scope.verifyNeighborCellsExist(0, colMax);

      // Act
      liveNeighbors = scope.sumNeighborCellValues(0, colMax);

      // Assert
      expect(liveNeighbors).to.equal(3);
    });

    it('should sum for the bottom, right neighbor permutation', function () {
      // Arrange
      var liveNeighbors = null;

      scope.parentGenerationBoard = cellsArray;
      scope.verifyNeighborCellsExist(0, 0);

      // Act
      liveNeighbors = scope.sumNeighborCellValues(0, 0);

      // Assert
      expect(liveNeighbors).to.equal(3);
    });

  });

});

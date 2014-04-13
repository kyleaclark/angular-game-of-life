"use strict";

describe("Controller: MainCtrl", function () {

  // load the controller's module
  beforeEach(module("gameOfLifeApp"));

  var MainCtrl,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller("MainCtrl", {
      $scope: scope
    });
  }));

  describe("When initializing a gameBoard", function () {

    it("should create a 5x5 gameBoard array", function () {
      // Act
      scope.initGameBoard();

      // Assert
      expect(scope.gameBoard).to.exist;
      expect(scope.gameBoard).to.be.instanceof(Array);
      expect(scope.gameBoard[4][4]).to.exist;
    });

    it("should populate each gameBoard cell with a value of 0 or 1", function () {
      // Arrange
      var GAME_BOARD_SIZE = 5,
          row = null,
          col = null;

      // Act
      scope.initGameBoard();

      // Assert
      for (row = 0; row < GAME_BOARD_SIZE; row++) {
        for (col = 0; col < GAME_BOARD_SIZE; col++) {
          expect(scope.gameBoard[row][col]).to.be.at.least(0);
          expect(scope.gameBoard[row][col]).to.be.at.most(1);
        }
      }
    });

  });

});

'use strict';

describe('Service: CommonArrayService', function () {

  var Service = null;

  beforeEach(function () {
    module('Common.ArrayService');

    inject(function (CommonArrayService) {
      Service = CommonArrayService;
    });
  });

  describe('When a current array reference is passed to cloneMultiDimensionalArray method', function () {

    var currentArray = null,
        clonedArray = null;

    before(function () {
      // Arrange
      var CURRENT_ARRAY_SIZE = 5,
          row = null,
          col = null;

      currentArray = new Array(CURRENT_ARRAY_SIZE);

      for (row = 0; row < CURRENT_ARRAY_SIZE; row++) {
        currentArray[row] = new Array(CURRENT_ARRAY_SIZE);

        for (col = 0; col < CURRENT_ARRAY_SIZE; col++) {
          currentArray[row][col] = Math.round(Math.random());
        }
      }
    });

    it('should return a new cloned array of the current array', function () {
      // Act
      clonedArray = Service.cloneMultiDimensionalArray(currentArray);

      // Assert
      expect(clonedArray).to.exist;
      expect(clonedArray).to.eql(currentArray);
    });

    it('should return only a copy of the current array, not a mutable reference', function () {
      // Act
      clonedArray = Service.cloneMultiDimensionalArray(currentArray);
      clonedArray[0][0] = !clonedArray[0][0];

      // Assert
      expect(clonedArray[0][0]).to.not.equal(currentArray[0][0]);
      expect(clonedArray).to.not.eql(currentArray);
    });

  });

});
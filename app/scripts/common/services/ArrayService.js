'use strict';

angular.module('Common.ArrayService', [
  ])

    .service('CommonArrayService', function () {

      this.cloneMultiDimensionalArray = function (currentArray) {
        var currentArrayLength = currentArray.length,
            clonedArray = [],
            index = null;

        for (index = 0; index < currentArrayLength; index++) {
          clonedArray[index] = currentArray[index].slice();
        }

        return clonedArray;
      };

    });
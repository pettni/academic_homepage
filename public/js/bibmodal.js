angular.module('acadApp').controller('BibModalCtrl', 
   function ($scope, $modalInstance, text) {

  $scope.text = text;

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.getTextToCopy = function() {
    return $scope.text;
  };

  $scope.doSomething = function() {
    alert('Entry copied!');
  };

});
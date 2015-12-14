angular.module('acadApp').controller('BibModalCtrl', 
   function ($scope, $uibModalInstance, text) {

  $scope.text = text;

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

});
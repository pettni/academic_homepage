angular.module('acadApp').controller('PicModalCtrl', 
   function ($scope, $uibModalInstance, pic_location) {

  $scope.pic_location = pic_location;

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

});
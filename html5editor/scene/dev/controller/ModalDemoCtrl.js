define(['angularAMD','uiBootstrap'],function(angularAMD){

    angularAMD.controller('ModalDemoCtrl',['$scope', '$uibModal', '$log', function ($scope, $uibModal, $log) {

        $scope.items = ['item1', 'item2', 'item3'];
        $scope.preview_sence_id=$scope.MAP['sence_id'];
        $scope.preview_page_id=$scope.MAP['page_id'];
        $scope.apiKey=$scope.MAP['apiKey'];

        $scope.animationsEnabled = true;

        $scope.open = function (size) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                scope : $scope,
                resolve: {
                    items: function () {
                        return {
                            preview_sence_id : $scope.preview_sence_id
                            ,preview_page_id : $scope.preview_page_id
                            ,apiKey : $scope.apiKey
                        };
                    }

                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
               // $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };

    }]);

    // Please note that $uibModalInstance represents a modal window (instance) dependency.
    // It is not the same as the $uibModal service used above.

    angularAMD.controller('ModalInstanceCtrl',['$scope', '$uibModalInstance', 'items', '$sce',
        function ($scope, $uibModalInstance, items ,$sce) {

         $scope.items = items;

         $scope.preview_sence_id=$scope.items.preview_sence_id;
         $scope.preview_page_id=$scope.items.preview_page_id;
         $scope.apiKey=$scope.items.apiKey;
         $scope.url='../admin/preview.html?sence_id='+$scope.preview_sence_id+'&page_id='+$scope.preview_page_id+'&apiKey='+$scope.apiKey;
         $scope.url = $sce.trustAsResourceUrl($scope.url);

         $scope.ok = function () {
            $uibModalInstance.close($scope.item);
         };

         $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
         };
     }]);

    // todo hepl hotkey ...............................................................................
    angularAMD.controller('ModalkeyHelpCtrl',['$scope', '$uibModal', '$log',function ($scope, $uibModal, $log) {

        $scope.open = function (size) {
            $scope.animationsEnabled = true;
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalHotkey.html',
                controller: 'ModalInstanceHotkey',
                size: size
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {

            });
        };
     }]);

    angularAMD.controller('ModalInstanceHotkey',['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {

        $scope.ok = function () {
            $uibModalInstance.dismiss('ok');
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);

    // todo hepl hotkey ...............................................................................
    angularAMD.controller('comsspeHelp',['$scope', '$uibModal', '$log', function ($scope, $uibModal, $log) {

        $scope.open = function (size) {
            $scope.animationsEnabled = true;
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalcompess.html',
                controller: 'ModalInstanceCompess',
                size: size
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {

            });
        };
    }]);

    angularAMD.controller('ModalInstanceCompess',['$scope', '$uibModalInstance',function ($scope, $uibModalInstance) {

        $scope.ok = function () {
            $uibModalInstance.dismiss('ok');
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);
});
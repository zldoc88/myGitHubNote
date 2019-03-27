define(['angularAMD'],function(angularAMD,dir){

    angularAMD.controller("homeController", ["$scope",'$rootScope', '$state','$location',function ($scope ,$rootScope, $state , $location) {

        $scope.timeToHref = function(){
            $state.go("about",{ id:8,p:'文字7' });

        };

        console.log('初始化URL：'+$rootScope.staticsURL);
        console.log('当前URL：'+$location.absUrl());
    }]);


});
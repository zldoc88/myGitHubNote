define(['angularAMD'],function(angularAMD,dir){

    angularAMD.controller("will_announcedController", ["$scope",'$rootScope', '$state','$location',function ($scope ,$rootScope, $state , $location) {




        console.log('初始化URL：'+$rootScope.staticsURL);
        console.log('当前URL：'+$location.absUrl());
    }]);


});
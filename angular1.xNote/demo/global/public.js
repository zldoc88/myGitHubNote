//全局
define(['angularAMD'],function(angularAMD){

    angularAMD.controller('global', ['$rootScope', '$scope','$state', '$log',
        function($rootScope, $scope,$state, $log) {
            $rootScope.historyBack = false;
            $rootScope.stopBack = false;
            $rootScope.speed = 500;
            $rootScope.mainViewStyle = 'anim-slide-left';
            $rootScope.pageAnimationStyle = 'anim-slide-right';
            $rootScope.isDefaultLoad = true;



            $rootScope.$on('$stateChangeStart', function(e) {

            });







        }
    ]);

});

require([
    'angular'
   , 'angularAMD'
    ,"ui-router"
    ,'router'

    ,'global'
    ,'homeController'
], function (angular,angularAMD,uiRouter,router) {

    console.log('Require file loaded!');



    var defalutURL = window.location.href; // 静态初始化URL
    defalutURL = defalutURL.split('#')[0];

    var app = angular.module("myapp",['ui.router']);

    var common =router;

    // routes
    function registerRoutes($stateProvider, $locationProvider ,$urlMatcherFactoryProvider ,$urlRouterProvider ,$compileProvider) {
        // default

        $urlMatcherFactoryProvider.strictMode(false);
        $locationProvider.html5Mode(false);
        $urlRouterProvider.otherwise("/home");

        for(var router in common){
            $stateProvider.state(router,common[router]);
        }
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);


    };

    app.config(['$stateProvider', '$locationProvider', '$urlMatcherFactoryProvider', '$urlRouterProvider','$compileProvider', registerRoutes])
        .run(['$rootScope','$state','$location',function($rootScope,$state, $location){

        console.log('-run--$stateChangeStart--------------------');

        $rootScope.$on('$stateChangeStart', function(e, to, toP, from, fromP) {

            console.log('---$stateChangeStart--------------------');

            //todo =========后退===================================
            //$rootScope.isDefaultLoad 默认开始页面 不视为后退
            if('/'+to.name == $location.path() && !$rootScope.isDefaultLoad ){
                console.log('---触发了浏览器返回--------------------');
               //
                //todo  是否是禁止【模拟】返回
                if($rootScope.stopBack){
                    e.preventDefault();
                    $state.transitionTo(from,fromP,{notify :false});
                    //return;
                }
                $rootScope.mainViewStyle='anim-slide-right';
                $rootScope.historyBack = true;

                return
            }

            $rootScope.mainViewStyle = $rootScope.isDefaultLoad? '' :'anim-slide-left';
            if($rootScope.isDefaultLoad) $rootScope.staticsURL = defalutURL;
           // $rootScope.isDefaultLoad = false;
            $rootScope.pageAnimationStyle = 'anim-fade';
        });

        $rootScope.$on('$stateChangeSuccess', function(e, to, toP, from, fromP) {
           // if(!$rootScope.isDefaultLoad) window.scrollTo(0,0);
            if(!$rootScope.isDefaultLoad) document.body.scrollTop=0;

            $rootScope.isDefaultLoad = false;
        });

    }]);


    return angularAMD.bootstrap(app);
});

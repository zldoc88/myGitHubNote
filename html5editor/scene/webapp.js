require([
    'angularAMD'
    ,'angularAnimate'
    ,'uiBootstrap'
    ,'bootstrapColorpicker'
    ,'sortableView'
    ,'hotkeys'
    ,'underscore'

    ,'server'

    ,'mainCtr'
    ,'mainQuickCtr'
    ,'senceCtr'
    ,'ModalDemoCtrl'
    ,'backgroundSettingCtrl'
    ,'animationSettingCtrl'
    ,'animationGuideCtrl'
    ,'mediaManagerCtrl'
    ,'eventsManagerCtrl'

    ,'mainDir'
    ,'senceEventDir'
    ,'pubileEventDir'
    ,'moveEventDir'
    ,'dblclickEventDir'
    ,'toolmangerDir'
    ,'toolpickDir'
    ,'senceRenderDir'
    ,'drawToolDir'
    ,'moveComponentDir'
    ,'seResizeBDir'
    ,'seResizeTDir'
    ,'swResizeTDir'
    ,'swResizeBDir'
    ,'nsResizeTDir'
    ,'nsResizeBDir'
    ,'ewResizeLDir'
    ,'ewResizeRDir'

    ,'compRotateDir'
    ,'changeValueDir'
    ,'seleteInitDir'
    ,'oninputValueDir'
    ,'backgroundsettingDir'

    ,'lineDir'
    ,'squareDir'
    ,'circularDir'
    ,'buttonDir'
    ,'txtDir'
    ,'formDataDir'
    ,'imageDir'

    ,'animationsettingDir'
    ,'animationGuideDir'
    ,'mediaManagerDir'
    ,'eventsManagerDir'
], function (angularAMD) {
    var app = angular.module("myapp",['colorpicker.module','ui.bootstrap','ngAnimate','angular-sortable-view','cfp.hotkeys']);
    app.config(['$locationProvider', '$httpProvider', function($locationProvider, $httpProvider) {

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        $httpProvider.defaults.useXDomain = true;

    }]);
    return angularAMD.bootstrap(app);
});

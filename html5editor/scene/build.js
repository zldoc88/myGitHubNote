({
    baseUrl: './',
    paths : {
        'angular': 'lib/angular.min', //angular框架
        'angularAMD': 'lib/angularAMD.min'//angular AMD 模块框架
        ,'angularAnimate': 'lib/angular-animate.min' //angular 动画 模块框架
        ,'uiBootstrap': 'lib/ui-bootstrap-tpls-1.2.5.min' // ui-bootstrap 扩展
        ,'bootstrapColorpicker': 'lib/bootstrap-colorpicker-module.min' // 颜色选择 扩展
        ,'sortableView': 'lib/angular-sortable-view.min' // 拖动排序
        ,'hotkeys': 'lib/hotkeys.min' // 热键
        ,'underscore': 'lib/underscore-min' // 数组对象处理方法集合工具
        ,'cropper': 'lib/cropper.min' // 图片剪切插件

        //服务----
        ,'server': 'dev/server/server' //请求数据

        //控制器----
        ,'mainCtr': 'dev/controller/main' //主控制器
        ,'mainQuickCtr': 'dev/controller/mainQuick'
        ,'senceCtr': 'dev/controller/sence'
        ,'ModalDemoCtrl': 'dev/controller/ModalDemoCtrl'
        ,'backgroundSettingCtrl': 'dev/controller/background-setting'
        ,'animationSettingCtrl': 'dev/controller/animation-setting'
        ,'animationGuideCtrl': 'dev/controller/animation-guide'
        ,'mediaManagerCtrl': 'dev/controller/media.Manager'
        ,'eventsManagerCtrl': 'dev/controller/events.manager'


        //指令器----
        ,'mainDir': 'dev/directive/main'
        ,'senceEventDir': 'dev/directive/sence.event'
        ,'pubileEventDir': 'dev/directive/pubile.event'
        ,'moveEventDir': 'dev/directive/move.event'
        ,'dblclickEventDir': 'dev/directive/dblclick-event'
        ,'toolmangerDir': 'dev/directive/toolmanger'
        ,'toolpickDir': 'dev/directive/toolpick'
        ,'senceRenderDir': 'dev/directive/sence.render'
        ,'drawToolDir': 'dev/directive/draw.tool'
        ,'moveComponentDir': 'dev/directive/move.component'

        ,'seResizeBDir': 'dev/directive/seResize-b'
        ,'seResizeTDir': 'dev/directive/seResize-t'
        ,'swResizeTDir': 'dev/directive/swResize-t'
        ,'swResizeBDir': 'dev/directive/swResize-b'
        ,'nsResizeTDir': 'dev/directive/nsResize-t'
        ,'nsResizeBDir': 'dev/directive/nsResize-b'
        ,'ewResizeLDir': 'dev/directive/ewResize-l'
        ,'ewResizeRDir': 'dev/directive/ewResize-r'

        ,'compRotateDir': 'dev/directive/comp-rotate' //旋转
        ,'changeValueDir': 'dev/directive/change-value'
        ,'seleteInitDir': 'dev/directive/selete-init'
        ,'oninputValueDir': 'dev/directive/oninput.value'
        ,'backgroundsettingDir': 'dev/directive/background-setting'

        ,'lineDir': 'dev/directive/toolTpye.line'
        ,'squareDir': 'dev/directive/toolTpye.square'
        ,'circularDir': 'dev/directive/toolTpye.circular'
        ,'buttonDir': 'dev/directive/toolTpye.button'
        ,'txtDir': 'dev/directive/toolTpye.txt'
        ,'formDataDir': 'dev/directive/toolTpye.formData'
        ,'imageDir': 'dev/directive/toolTpye.image'

        ,'animationsettingDir': 'dev/directive/animation-setting'
        ,'animationGuideDir': 'dev/directive/animation-guide'
        ,'mediaManagerDir': 'dev/directive/media-manager'
        ,'eventsManagerDir': 'dev/directive/events.manager'
    },
    shim: {
        'angular': {
            exports: "angular"
        },
        'angularAMD': ['angular']
        ,'hotkeys': ['angular']
        ,'angularAnimate': ['angular']
        ,'uiBootstrap': ['angular']
        ,'bootstrapColorpicker': ['angular']
        ,'sortableView': ['angular']
        ,'ModalDemoCtrl': ['uiBootstrap']
        ,'mediaManagerCtrl': ['uiBootstrap']
        ,'mainCtr': ['server']
    },
    name: "webapp",
    out: "min/make.all.min.js"
    // node r.js -o build.js
});

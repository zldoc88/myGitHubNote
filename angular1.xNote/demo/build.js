({
    baseUrl: './',
    paths : {
        'angular': 'libs/angular1.5.6.min', //angular框架
        'angularAMD': 'libs/angularAMD.min'//angular AMD 模块框架
        ,'underscore': 'libs/underscore-min' // 数组对象处理方法集合工具
        ,"ui-router": "libs/angular-ui-router"
        ,"angular-animate": "libs/angular-animate.min"
        ,"ng-animate": "libs/anim-in-out"
        ,"ngScroller": "libs/vscroller"
        ,"wx": "libs/jweixin-1.0.0"

        ,"router": "router/router"

        //服务----
        ,'server': 'server/server' //请求数据

        //控制器----
        ,'global' : 'global/public'

        //指令器----
        ,'publicDirective': 'directive/public'
        ,'ngMenu': 'libs/ngMenu'
        ,'ngAlert': 'libs/ngAlert'
        ,'ngSelect': 'libs/ngSelect'

        ,'EXIF': 'libs/ngPhotoExif'
        ,'ResizeIMGFix': 'libs/ngLocalResizeIMGFix'
        ,'ResizeIMG': 'libs/ngLocalResizeIMG'
        ,'IMGCutUpLoad': 'libs/ngLocalIMGCutUpLoad'

        ,'bannerTool': 'directive/banner.tool'


        //todo controller

        ,"homeController": "controller/ctrl_home"
        ,"already_announcedController": "controller/ctrl_already_announced"
        ,"will_announcedController": "controller/ctrl_will_announced"
        ,"detailController": "controller/ctrl_detail"
        ,"mublistController": "controller/ctrl_mublist"
        ,"product_detailController": "controller/ctrl_product_detail"
        ,"memberController": "controller/ctrl_member"
        ,"helpController": "controller/ctrl_help"
        ,"luckHistoryController": "controller/ctrl_luckHistory"
        ,"joinHistoryController": "controller/ctrl_joinHistory"
        ,"roleController": "controller/ctrl_role"
        ,"addroleController": "controller/ctrl_addrole"
        ,"receiveController": "controller/ctrl_receive"
        ,"orderController": "controller/ctrl_order"
        ,"payController": "controller/ctrl_pay"

        //todo directive
        ,"public_header": "directive/public_header"
        ,"public_footer": "directive/public_footer"

        ,"homeDirective": "directive/dir_home"
        ,"already_announcedDirective": "directive/dir_already_announced"
        ,"will_announcedDirective": "directive/dir_will_announced"
        ,"detailDirective": "directive/dir_detail"
        ,"mublistDirective": "directive/dir_mublist"
        ,"product_detailDirective": "directive/dir_product_detail"
        ,"memberDirective": "directive/dir_member"
        ,"helpDirective": "directive/dir_help"
        ,"luckHistoryDirective": "directive/dir_luckHistory"
        ,"joinHistoryDirective": "directive/dir_joinHistory"
        ,"roleDirective": "directive/dir_role"
        ,"addroleDirective": "directive/dir_addrole"
        ,"receiveDirective": "directive/dir_receive"
        ,"orderDirective": "directive/dir_order"
        ,"payDirective": "directive/dir_pay"
    },
    shim: {
        'angular': {
            exports: "angular"
        },
        'ui-router': ['angular'],
        'angularAMD': ['angular','ui-router']
    },
    name: "webapp",
    out: "min/make.all.min.v2.js"
    // node r.js -o build.js
});

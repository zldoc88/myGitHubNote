var version = '1.0.1';
var timecapt = new Date().getTime();
require.config({
    urlArgs: 'ver='+version+'#cacheTime='+timecapt,
    paths: {
        // angular
        "angular": "lib/angular.1.4.4.min",
        //"angular": "lib/angular/angular",
        // angular-ui
        'ui-bootstrap': "lib/ui-bootstrap-0.13.4.min",

        "angular-ui-router": "lib/angular-ui-router/release/angular-ui-router",

        "angularAMD": "lib/angularAMD.min"
        //"angularAMD": "lib/angularAMD/angularAMD"
        ,"ngload": "lib/angularAMD/ngload"

        //public
        ,"public": "public"

        //todo controller
        ,"headerController": "controller/ctrl_header"


        //todo directive
        ,"headDirective": "directive/dir_header"



    },
    shim: {
        // angular
        "angular": { exports: "angular" },
        'ui-bootstrap' : ["angular"],
        // angular-ui
        "angular-ui-router": ["angular"],
        // angularAMD
        "angularAMD": ["angular"]
        ,"ngload": ["angularAMD"]

    }
    ,deps: ['app']
});
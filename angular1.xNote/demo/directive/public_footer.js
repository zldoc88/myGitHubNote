define(['angularAMD'], function(angularAMD) {

    angularAMD.directive('publicFooter',['$document','$compile',function($document , $compile){

        return {
            templateUrl:'view/header.html',
            link:function(scope,element,attr){
                element.on('touchstart touchmove',function(e){
                    e.preventDefault();
                });
            }
        }

    }]);
});

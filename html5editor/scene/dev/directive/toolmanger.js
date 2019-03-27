define(['angularAMD'],function(angularAMD){
    angularAMD.directive('toolManger', ['$document','$compile',function($document,$compile) {
        return {
            templateUrl:'scene/component/tool.html'
            ,scope:false//切换为{}，true测试
            ,link:function(scope,element,attr){

                //工具加载

            }
        }

    }]);
});
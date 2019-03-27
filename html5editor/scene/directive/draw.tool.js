app.directive('drawTool', ['$document','$compile',function($document,$compile) {
    return {
        templateUrl:'../common/scene/component/draw.html'
        ,scope:false//切换为{}，true测试
        ,link:function(scope,element,attr){

            //工具加载

        }
    }

}]);
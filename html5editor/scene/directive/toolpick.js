app.directive('toolPick', ['$document',function($document) {
    return {
        link:function(scope,element,attr){

            //选择工具

            element.on('click',function(){
                var selectTool = attr['toolType'];
                if(scope.ActiveToolType == selectTool) return;
                scope.ActiveToolType =selectTool;
                scope.$emit('updataActiveToolType',scope.ActiveToolType);
            });







        }
    }

}]);

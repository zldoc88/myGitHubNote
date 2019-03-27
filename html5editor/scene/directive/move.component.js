app.directive('moveComponent', ['$document','$compile',function($document,$compile) {

    return {
        link:function(scope,element,attr){
            //todo ===================拖动组件=========================
            var setting = JSON.parse(attr['setting']);

            var isMove = false,stopPotion=null;
            var TargertStart = null;


            var parentElem;
            element.on('mousedown',function(e){
                if(scope.ActiveToolType!=='pick') return;
                if(scope.selectedItem==null) return;
                if(scope.selectedItem.id!==setting.id) return;
                isMove = true;
                stopPotion = e;
                parentElem = angular.element(element).parent();
                TargertStart = {
                    x : parentElem[0].offsetLeft
                    ,y : parentElem[0].offsetTop
                };
                document.body.addEventListener("mousemove",moveTool,false);

            });
            angular.element(document).on('mouseup',function(e){
                if(isMove){
                    //释放move事件
                    document.body.removeEventListener("mousemove",moveTool,false);
                }
                isMove = false;
                stopPotion = null;
                TargertStart = null;
            });


            function moveTool(e){
                if(isMove){
                    e.preventDefault();
                   // if(document.selection) document.selection.empty();
                    var X = e.pageX;
                    var Y = e.pageY;
                    var moveX = X - stopPotion.pageX;
                    var moveY = Y - stopPotion.pageY;

                    var top = TargertStart.y +moveY;
                    var left = TargertStart.x +moveX;
                    parentElem[0].style['top']=top;
                    parentElem[0].style['left']=left;
                    scope.setComponentValue({top:top,left:left});
                  //  scope.$emit('moveComponentEmit',);

                }
            };




        }
    }



}]);

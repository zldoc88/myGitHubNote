define(['angularAMD'],function(angularAMD){
    angularAMD.directive('vtResize', ['$document','$compile',function($document,$compile) {


        return{
            link :function(scope,element,attr){

                var setting = JSON.parse(attr['setting']),isMove=false,parentElem,TargertStart,stopPotion;

                element.on('mousedown',function(e){

                    if(scope.ActiveToolType!=='pick') return;
                    if(scope.selectedItem==null) return;
                    if(scope.selectedItem.id!==setting.id) return;
                    isMove = true;
                    stopPotion = e;
                    parentElem = angular.element(element).parent();
                    TargertStart = {
                        y : scope.getComponentValue('top'),
                        height : scope.getComponentValue('height'),
                        width : scope.getComponentValue('width')
                    };
                    document.body.addEventListener("mousemove",nsResizeT,false);
                });

                angular.element(document).on('mouseup',function(e){
                    if(isMove){
                        //释放move事件
                        document.body.removeEventListener("mousemove",nsResizeT,false);
                    }
                    isMove = false;
                    stopPotion = null;
                    TargertStart = null;
                });

                function nsResizeT(e){
                    if(isMove){
                        e.preventDefault();
                        var Y = e.pageY;
                        var moveY = Y - stopPotion.pageY;
                        var n_y = parseFloat(TargertStart.y) +  parseFloat(moveY);
                        var n_height = parseFloat(TargertStart.height) - parseFloat(moveY);
                        parentElem[0].style['top']=n_y;
                        parentElem[0].style['height']=n_height;
                        scope.setComponentValue({top:n_y,height : n_height});

                    }
                }












            }
        }




    }]);
});
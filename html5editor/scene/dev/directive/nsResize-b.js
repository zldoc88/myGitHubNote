define(['angularAMD'],function(angularAMD){
    angularAMD.directive('vbResize', ['$document','$compile',function($document,$compile) {


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
                        height : scope.getComponentValue('height')
                    };
                    document.body.addEventListener("mousemove",nsResizeB,false);
                });

                angular.element(document).on('mouseup',function(e){
                    if(isMove){
                        //释放move事件
                        document.body.removeEventListener("mousemove",nsResizeB,false);
                    }
                    isMove = false;
                    stopPotion = null;
                    TargertStart = null;
                });

                function nsResizeB(e){
                    if(isMove){
                        e.preventDefault();
                        var Y = e.pageY;
                        var moveY = Y - stopPotion.pageY;

                        var remY = parseFloat(moveY);

                        var n_height = parseFloat(TargertStart.height) + remY;
                        parentElem[0].style['height']=n_height;
                        scope.setComponentValue({height : n_height});

                    }
                }












            }
        }




    }]);
});
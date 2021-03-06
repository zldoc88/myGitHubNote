define(['angularAMD'],function(angularAMD){
    angularAMD.directive('swTresize', ['$document','$compile',function($document,$compile) {


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
                        x : scope.getComponentValue('left'),
                        y : scope.getComponentValue('top'),
                        height : scope.getComponentValue('height'),
                        width : scope.getComponentValue('width')
                    };
                    document.body.addEventListener("mousemove",swResizeT,false);
                });

                angular.element(document).on('mouseup',function(e){
                    if(isMove){
                        //释放move事件
                        document.body.removeEventListener("mousemove",swResizeT,false);
                    }
                    isMove = false;
                    stopPotion = null;
                    TargertStart = null;
                });

                function swResizeT(e){
                    if(isMove){
                        e.preventDefault();
                        var X = e.pageX;
                        var Y = e.pageY;
                        var moveX = X - stopPotion.pageX;
                        var moveY = Y - stopPotion.pageY;
                        var remX = parseFloat(moveX);
                        var remY = parseFloat(moveY);
                        //var n_x = parseFloat(TargertStart.x) +  remX + 'rem';
                        var n_y = parseFloat(TargertStart.y) +  remY;
                        var n_width = parseFloat(TargertStart.width) +  remX;
                        var n_height = parseFloat(TargertStart.height) - remY;
                        //parentElem[0].style['left']=n_x;
                        parentElem[0].style['top']=n_y;
                        parentElem[0].style['height']=n_height;
                        parentElem[0].style['width']=n_width;
                        scope.setComponentValue({top:n_y, height : n_height, width : n_width});

                    }
                }












            }
        }




    }]);
});
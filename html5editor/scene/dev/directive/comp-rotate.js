define(['angularAMD'],function(angularAMD){

    angularAMD.directive('compRotate', ['$document','$compile',function($document,$compile) {

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
                        rotate : scope.getComponentValue('rotate')
                    };
                    document.body.addEventListener("mousemove",esResizeT,false);
                });

                angular.element(document).on('mouseup',function(e){
                    if(isMove){
                        //释放move事件
                        document.body.removeEventListener("mousemove",esResizeT,false);
                    }
                    isMove = false;
                    stopPotion = null;
                    TargertStart = null;
                });

                function esResizeT(e){
                    if(isMove){
                        var X = e.pageX;
                        var moveX = stopPotion.pageX -X;
                        var n_x =   moveX - parseFloat(TargertStart.rotate);
                        n_x = -n_x*0.5;

                        parentElem.css({
                            '-webkit-transform': 'rotateZ(' + n_x + 'deg)',
                            '-moz-transform': 'rotateZ(' + n_x + 'deg)',
                            'transform': 'rotateZ(' + n_x + 'deg)'
                        });

                        scope.setComponentValue({ rotate:n_x});

                    }
                }












            }
        }


    }]);
});

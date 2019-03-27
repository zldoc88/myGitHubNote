app.directive('hlBresize', ['$document','$compile',function($document,$compile) {


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
                    width : scope.getComponentValue('width')
                };
                document.body.addEventListener("mousemove",ewResizeL,false);
            });

            angular.element(document).on('mouseup',function(e){
                if(isMove){
                    //释放move事件
                    document.body.removeEventListener("mousemove",ewResizeL,false);
                }
                isMove = false;
                stopPotion = null;
                TargertStart = null;
            });

            function ewResizeL(e){
                if(isMove){
                    e.preventDefault();
                    var X = e.pageX;
                    var moveX = X - stopPotion.pageX;
                    var remX = parseFloat(moveX);
                    var n_x = parseFloat(TargertStart.x) +  remX;
                    var n_width = parseFloat(TargertStart.width) -  remX;

                    parentElem[0].style['left']=n_x;
                    parentElem[0].style['width']=n_width;
                    scope.setComponentValue({left:n_x, width : n_width});

                }
            }












        }
    }




}]);

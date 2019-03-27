define(['angularAMD'],function(angularAMD){
    angularAMD.directive('moveEvent', ['$document',function($document) {

        return {
            link : function(scope,element,attr){

                //注册鼠标事件
                /*===todo====================面板拖动事件======================================*/
                var isMove = false,stopPotion=null,isMoveTool=true;

                var TargertStart = null;
                element.find('h3').on('mousedown',function(e){

                    isMove = true;
                    stopPotion = e;
                    var toolWindow = attr['windowType'];
                    isMoveTool = toolWindow =='tool-window'? true:false;
                    TargertStart = isMoveTool? {
                        x : angular.element(element)[0].offsetLeft
                        ,y : angular.element(element)[0].offsetTop
                    } : null;
                    angular.element(document.querySelector('.on-drap-window')).removeClass('on-drap-window');
                    angular.element(element).addClass('on-drap-window');
                    //绑定move事件
                    document.body.addEventListener("mousemove",move,false);
                });
                element.on('mouseup',function(e){
                    if(isMove){
                        //释放move事件
                        document.body.removeEventListener("mousemove",move,false);
                    }
                    isMove = false;
                    stopPotion = null;
                    TargertStart = null;

                });

                function move(e){
                    //拖动某面板
                    if(isMove){
                        var X = e.pageX;
                        var Y = e.pageY;
                        var moveX = X - stopPotion.pageX;
                        var moveY = Y - stopPotion.pageY;
                        angular.element(element)[0].style['top']=TargertStart.y +moveY + 'px';
                        angular.element(element)[0].style['left']=TargertStart.x +moveX + 'px';

                    }
                }
            }
        }


    }]);
});
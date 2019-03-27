app.directive('senceRender', ['$document','$compile',function($document,$compile) {
    return {
        link:function(scope,element,attr){

            scope.startAt = {
                y:angular.element(element)[0].getBoundingClientRect().top,
                x:angular.element(element)[0].getBoundingClientRect().left,
                sY:angular.element(element)[0].scrollHeight
            };


            scope.ActiveToolType ='default';
            scope.$on('changeActiveToolType',function(evt,data){
                scope.ActiveToolType=data;
            });

            //todo 接收controller 重新取值上报 scope.startAt
            scope.$on('reSetreGetgetBoundingClientRect',function(evt,data){
                scope.startAt = {
                    y:angular.element(element)[0].getBoundingClientRect().top,
                    x:angular.element(element)[0].getBoundingClientRect().left,
                    sY:angular.element(element)[0].scrollHeight
                };
                scope.$emit('onWindowResize',scope.startAt);
            });


            //todo  创建组件
            element.on('click',function(e){
                if(scope.ActiveToolType=='default' || scope.ActiveToolType=='pick') return;
               // console.log('========start===draw======='+scope.ActiveToolType);
                var x = e.pageX;
                var y = e.pageY;
                scope.$emit('addNewOne',scope.getCSS[scope.ActiveToolType]({x:x,y:y}));
            });



            //todo 窗体resize 重新取值上报 scope.startAt
            angular.element(window).on('resize',function(){
                scope.startAt = {
                    y:angular.element(element)[0].getBoundingClientRect().top,
                    x:angular.element(element)[0].getBoundingClientRect().left
                };
                scope.$emit('onWindowResize',scope.startAt);
            });




            //鼠标移动到舞台
            element.on('mouseover',function(e){
                scope.$emit('mouseOverScene',true);
            });
            element.on('mouseout',function(e){
                scope.$emit('mouseOverScene',false);
            });



        }

    }
}]);

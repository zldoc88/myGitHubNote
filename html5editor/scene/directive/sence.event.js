app.directive('senceDir', ['$document','$compile',function($document,$compile) {

    return {
        link : function(scope,element,attr){

            scope.$on('overSceneChange',function(oldVal,newVal){
                scope.overScene = newVal;
            });

            function showMenu(e){
                var x = e.pageX;
                var y = e.pageY;
                var foubackgroud="<div right-click class='foubackgroud'></div>";
                var html="<div class='right-click-menu' style='top:"+y+"px;left:"+x+"px;' >" +
                    "<div class='ads-row' >"+
                    "<a class='ads-row' href='javascript:;'><i class='ion-ios-help-outline'></i> 技术问题？</a>"+
                    "<a class='ads-row' href='javascript:;'><i class='fa fa-cubes'></i> Editor版本v1.0.1</a>"+
                    "</div>"+
                    "</div>";

                var template = angular.element(html);
                angular.element(document.body).append(foubackgroud);
                var $bg=angular.element(document.querySelector('.foubackgroud'));
                $bg.append(template);
                $compile($bg)(scope);
            }


            angular.element(element).on('scroll',function(){
                scope.reGetgetBoundingClientRect();
            });


            element.on('contextmenu',function(e){

                if(!scope.overScene){
                    showMenu(e);
                }else{
                    scope.$emit('isOnSence',true);
                }
            });
            element.on('mousedown',function(e){
                scope.$emit('isOnSence',true);
            });

        }
    }


}]);

app.directive('rightClick', ['$document',function($document) {
    return {
        link:function(scope,element,attr){
            // remove移除创建的元素
            element.on('mousedown',function(e){
                element.remove();
            });

        }
    }
}]);

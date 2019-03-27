define(['angularAMD'],function(angularAMD){

    angularAMD.directive('ngMenuelemt',['$document','$animate','$state',function($document,$animate ,$state){

        return {
            link:function(scope,element,attr){

                //判断当前是否在显示
                var activeName = '';
                scope.$on('$stateChangeSuccess', function(e, to, toP, from, fromP) {
                    activeName = to.name;
                });

                function hidenMe(){
                    element.css({display:'none'});
                    element.removeClass('on-showMenu');
                }

                scope.hrefTo = function(url){
                    hidenMe();
                    if(activeName != url) $state.go(url,{ id:8,p:url});
                };

                scope.$on('showMenus.$broadcast',function(evt,data){

                    element.css({display:'block'});

                    var handle = angular.element(element[0].querySelector('.system-menu-handle-fouce'));
                    var menuContent = angular.element(element[0].querySelector('.system-menu-content-space'));
                    $animate.addClass(element[0],'on-showMenu');
                    handle.on('touchmove',function(e){
                        e.preventDefault();
                    });
                    handle.on('click',function(e){
                        e.preventDefault();
                        hidenMe();
                    });


                });



            }
        }

    }]);




});
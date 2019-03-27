define(['angularAMD'], function(angularAMD) {

    angularAMD.directive('publicHead',['$document','$compile',function($document , $compile){
        var basePath = 'site/';
        return {
            templateUrl:basePath+'view/header.html?v=32',
            link:function(scope,element,attr){
                element.on('touchmove',function(e){
                    e.preventDefault();
                });

                //显示菜单
                scope.showMenuBroadcast = function(){
                    scope.$broadcast('showMenus.$broadcast',{});
                };

                //隐藏菜单
                scope.hidenMenuBroadcast=function(){

                };


                scope.menus = [
                    {
                        text:'首页'
                        ,link:'home'
                        ,icon:'ion-ios-home-outline'
                    },
                    {
                        text:'已揭晓'
                        ,link:'already_announced'
                        ,icon:'ion-ios-stopwatch-outline'
                    },
                    {
                        text:'即将揭晓'
                        ,link:'will_announced'
                        ,icon:'ion-ios-alarm-outline'
                    },

                    {
                        text:'个人中心'
                        ,link:'member'
                        ,icon:'ion-ios-person-outline'
                    }
                    ,{
                        text:'中奖历史'
                        ,link:'luckHistory'
                        ,icon:'ion-ribbon-b'
                    }
                    ,{
                        text:'购买历史'
                        ,link:'joinHistory'
                        ,icon:'ion-ios-list-outline'
                    }
                    ,{
                        text:'规则说明'
                        ,link:'help'
                        ,icon:'ion-ios-help-outline'
                    }



                ];






            }
        }

    }]);
});

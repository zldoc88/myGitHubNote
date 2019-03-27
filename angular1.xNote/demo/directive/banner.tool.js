define(['angularAMD'],function(angularAMD){

    angularAMD.directive('ngBanner',['$document',function($document){

        return {
            template:'<div class="_banner_container" ' +
            'ng-style="{height:windowWidth/3 +\'px\'}" ><div ' +
            'class="_item_banner" ' +
            'ng-class="{true:\'tool-hidden\',false:\'tool-show\'}[activeShowNum == k]"' +
            'ng-repeat="(k,banner) in bannerModel track by $index"><img src="site/images/img.jpg?v=1" /></div></div>',
            link:function(scope,element,attr){
                var windowWidth = window.innerWidth;

                scope.bannerModel =JSON.parse(attr['ngBanner']) || [] ;
                scope.windowWidth =windowWidth;
                scope.activeShowNum = 0;

                function setActiveNum(index){
                    scope.$applyAsync(function(){
                        scope.activeShowNum = index;
                    })
                }

                var _move = function(e){
                    e.preventDefault();
                    if(ismove){
                        var _x = e.pageX|| e.changedTouches[0].pageX;
                        //向右滑
                        if(_x-x>=10){
                            clearTimeout(timeouFN);
                            var i = scope.activeShowNum+1;
                            i = i > scope.bannerModel.length-1 ? 0 : i;
                            setActiveNum(i);
                            timeouFN = setTimeout(loopitem,3500);
                            return;
                        }
                        if(_x-x<=-10){
                            clearTimeout(timeouFN);
                            var i = scope.activeShowNum-1;
                            i = i < 0 ? scope.bannerModel.length-1 : i;
                            setActiveNum(i);
                            timeouFN = setTimeout(loopitem,3500);
                            return;
                        }
                    }
                }
                    ,_start=function(e){
                    e.preventDefault();
                    ismove =true;
                    x = e.pageX|| e.changedTouches[0].pageX;

                }
                    ,_end = function(e){
                    ismove=false;
                },xGrc=10, x=0,y= 0,ismove=false,timeouFN=null
                    ,loopitem = function(){
                    var i = scope.activeShowNum+1;
                    i = i > scope.bannerModel.length-1 ? 0 : i;
                    setActiveNum(i);
                    timeouFN = setTimeout(loopitem,3500);
                };
                loopitem();




                element.on('touchstart mousedown',_start);
                element.on('touchmove mousemove',_move);
                element.on('touchend mouseup',_end);





            }
        }

    }]);




});

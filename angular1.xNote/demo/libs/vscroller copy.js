define(['angularAMD'],function(angularAMD){

    //说明变量
    /*//todo

        1.
    */



    angularAMD.directive('globalScroll',['$document','$window',function($document ,$window){

        return {
            link:function(scope,element,attr){
//                var windowWidth = window.innerWidth;

                console.log($window);
                var isLoadingBroadcast=false; //加载数据完成
                window.onscroll=_scroll;


                //滚动条在Y轴上的滚动距离
                function getScrollTop(){
                    var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
                    if(document.body){
                        bodyScrollTop = document.body.scrollTop;
                    }
                    if(document.documentElement){
                        documentScrollTop = document.documentElement.scrollTop;
                    }
                    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
                    return scrollTop;
                }
                //文档的总高度
                function getScrollHeight(){
                    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
                    if(document.body){
                        bodyScrollHeight = document.body.scrollHeight;
                    }
                    if(document.documentElement){
                        documentScrollHeight = document.documentElement.scrollHeight;
                    }
                    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
                    return scrollHeight;
                }
                //浏览器视口的高度
                function getWindowHeight(){
                    var windowHeight = 0;
                    if(document.compatMode == "CSS1Compat"){
                        windowHeight = document.documentElement.clientHeight;
                    }else{
                        windowHeight = document.body.clientHeight;
                    }
                    return windowHeight;
                }

                function _scroll(e){
                    if(isLoadingBroadcast) e.preventDefault();

                    scope.$broadcast('window.onscroll.$broadcast',getScrollTop()); //广播滚动事件 传当前滚动Y轴数值
                    if(getScrollTop() + getWindowHeight() == getScrollHeight() && !isLoadingBroadcast){
                        isLoadingBroadcast = true;
                        scope.$broadcast('window.onscroll.bottom.$broadcast',{}); //广播滚动事件 传当前滚动Y轴数值
                    }

                    if(getScrollTop()==0 && !isLoadingBroadcast){
                        isLoadingBroadcast = true;
                        scope.$broadcast('window.onscroll.top.$broadcast',{}); //广播滚动事件 传当前滚动Y轴数值
                    }
                }

                //顶部下滑动
                var tT = 0;
                angular.element(document).on('touchstart mousedown',function(e){
                    tT = e.pageY || e.changedTouches[0].pageY;
                });
                angular.element(document).on('touchend mouseup',function(e){
                    tT = 0;
                });
                //顶部下滑动
                angular.element(document).on('touchmove mousemove',function(e){
                    var nY = e.pageY || e.changedTouches[0].pageY;
                    if(nY>tT && !isLoadingBroadcast){
                        isLoadingBroadcast = true;
                        scope.$broadcast('window.onscroll.top.$broadcast',{}); //广播滚动事件 传当前滚动Y轴数值
                    }
                });





            }
        }

    }]);

    angularAMD.directive('scrollShowloading',['$document','$window',function($document ,$window){

        return {
            link : function(scope,element,attr){

                //记录move 事件
                var isTopgoonMove =false,startPontY=-1,loadfnish=true,isStartRun=false;
                //回到设定的位置

                function resetToTargetPonit(){
                    addTransition();
                    element.css({
                        transform:'translateY(36px)'
                        ,'-webkit-transform':'translateY(36px)'
                    });
                };
                //添加动画过渡
                function addTransition(fnc){
                    element.css({
                        transition:'transform 250ms ease-in-out'
                        ,'-webkit-transition':'-webkit-transform 250ms ease-in-out'
                    })
                    .one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd otransitionend transitionend',function(){
                            //console.log('动画结束');
                            removeTransition();
                            try{
                                fnc();
                            }catch (e){};
                        });
                }
                function removeTransition(){
                    element.css({
                        transition:''
                        ,'-webkit-transition':''
                    })
                };

                //todo 取消加载=================
                function cancelLading (){
                    addTransition(function(){
                        isStartRun =false;
                        console.log('取消刷新');
                    });
                    element.css({
                        transform:'translateY(0px)'
                        ,'-webkit-transform':'translateY(0px)'
                    });

                }

                angular.element(document).on('touchmove mousemove',function(e){
                    //滑动刷新
                    if(!isStartRun) return;
                    if(isStartRun) e.preventDefault();
                    if(isTopgoonMove && startPontY>0){
                        var nY = e.changedTouches[0].pageY || e.pageY;
                        if(nY > startPontY ){
                            element.css({transform:'translateY('+(nY - startPontY)+'px)'});
                        }

                    }
                    if(isTopgoonMove && startPontY<0){
                        startPontY=e.pageY|| e.changedTouches[0].pageY;
                    }
                    //todo 加载数据加载未完成，继续拖动
                    if(!loadfnish && startPontY>0){
                        var nY2 = e.changedTouches[0].pageY || e.pageY;
                        if(nY2 - startPontY >= -36 ){
                            var movto =nY2> startPontY ? (nY2 - startPontY)*0.3:nY2 - startPontY;
                            element.css({transform:'translateY('+(movto+36)+'px)'});
                        }

                    }
                });

                angular.element(document).on('touchend mouseup',function(e){
                    if(isTopgoonMove || !loadfnish) resetToTargetPonit();
                    isTopgoonMove=false;
                    startPontY=-1;
                });

                angular.element(document).on('touchstart mousedown',function(e){
                    if(!loadfnish){
                        removeTransition(); //去掉动画
                        startPontY = e.pageY || e.changedTouches[0].pageY;
                    }

                });


                //接收加载更多广播
                scope.$on('window.onscroll.bottom.$broadcast',function(evt,data){
                    console.log('加载更多');

                });
                //接收刷新广播
                scope.$on('window.onscroll.top.$broadcast',function(evt,data){
                    console.log('刷新当前');
                    isStartRun = true;
                    isTopgoonMove=true;
                    //todo 加载数据是否完成通知来改变
                    loadfnish=false;
                });

            }
        }

    }]);

});

define(['angularAMD'],function(angularAMD){

    //说明变量
    /*//todo

        1.
    */



    angularAMD.directive('globalScroll',['$document','$window',function($document ,$window){

        return {
            link:function(scope,element,attr){

                var isRefrenDataFnished=true; //刷新载数据完成 (刷新&加载更多不能共存)
                var isCanShowAnimationTOP=true;
                var isCanShowAnimationBottom=true;
                var ActiveCanShowAnimation=1; //1 顶部，2是底部


                var showRefren = (attr['scrollRefren']) ? true : false;
                var showMore = (attr['scrollLoadmore']) ? true : false;



                window.onscroll=_scroll;
                function _scroll(e){
                    scope.$broadcast('window.onscroll.$broadcast',getScrollTop()); //广播滚动事件 传当前滚动Y轴数值
                }

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


                //接收上报加载数据加载进度
                scope.$on('dataLoaded.$emit',function(){
                    //todo 通知动画关闭==================================
                    isCanShowAnimationTOP = false;
                    isCanShowAnimationBottom = false;
                    touchStatue = -1;
                    closeAnimation();
                    isRefrenDataFnished = true;
                });

                //todo 临界点
                //todo 数据加载状态


                var StartPonitY =-1,criticalPoint= -2,ogin= 1,ActiveY= 0,moveY= 0,touchStatue = 0;
                var WindowHeight = getWindowHeight();
                var _gStart=function(e){
                    StartPonitY= e.pageY || e.changedTouches[0].pageY;
                    touchStatue = 1;
                }
                    ,_gMove = function(e){
                    touchStatue = 2;
                    if(!isRefrenDataFnished) e.preventDefault();
                    var nY = e.pageY || e.changedTouches[0].pageY;
                    ogin = (StartPonitY < nY) ? 1 :(-1); //1 向下，-1向上
                    ActiveY = nY;

                    //到顶部后继续下滑
                    //临界点赋值为开始点
                    if (getScrollTop() == 0 && criticalPoint < 0 && ogin>0) {
                        e.preventDefault(); //进入动画，禁止默认事件
                        criticalPoint = ActiveY;
                        ActiveCanShowAnimation = 1;
                    }

                    var onBottom  =getScrollTop() + WindowHeight == getScrollHeight();
                    if (onBottom && ogin<0 && criticalPoint <0) {
                        e.preventDefault(); //进入动画，禁止默认事件
                        criticalPoint = ActiveY;
                        ActiveCanShowAnimation = 2;
                    }
                   // if(criticalPoint < 0 && ogin <0) ActiveCanShowAnimation = 2;

                    if(ActiveCanShowAnimation==1 && showRefren) {
                        if(!isCanShowAnimationTOP) return;

                        //todo 在临界点继续下滑=======================================
                        if (getScrollTop() == 0 && criticalPoint <= ActiveY && ogin > 0) {
                            e.preventDefault();
                            moveY = ActiveY - criticalPoint > 36 ? 36 + (ActiveY - criticalPoint - 36) * 0.3 : ActiveY - criticalPoint;
                            element.css({transform: 'translateY(' + moveY + 'px)'});
                        }
                        //todo 在临界点继续上滑=======================================
                        if (getScrollTop() == 0 && criticalPoint <ActiveY && criticalPoint>0 && ogin < 0 && isRefrenDataFnished) {
                            e.preventDefault();
                            moveY = ActiveY -criticalPoint;
                            element.css({transform: 'translateY(' + moveY + 'px)'});
                        }
                       if(getScrollTop() > 0 && ActiveY<criticalPoint && criticalPoint >0) criticalPoint=-2;
                    }

                    if(ActiveCanShowAnimation==2 && showMore) {
                        if(!isCanShowAnimationBottom) return;
                        //todo 超过临界点继续上滑=============================
                        if(onBottom && criticalPoint >= ActiveY  && ogin < 0){
                            e.preventDefault();
                            moveY = criticalPoint -ActiveY > 36 ? 36 + (criticalPoint - ActiveY - 36) * 0.3 : criticalPoint -ActiveY;
                            element.css({transform: 'translateY(' + (-moveY) + 'px)'});
                        }
                        if(getScrollTop() + WindowHeight < getScrollHeight() && ActiveY>=criticalPoint  && criticalPoint >0) criticalPoint=-2;
                    }


                }
                    ,_gEnd = function(e){
                    //看最后离顶部距离来判断是否触发刷新
                    StartPonitY=-1;
                    criticalPoint=-2;
                    ActiveY=0;

                    //todo 放开是否离顶部》36------------------
                    if(moveY >=36 && isRefrenDataFnished && touchStatue !==-1 && ActiveCanShowAnimation==1 && isCanShowAnimationTOP  && showRefren){
                        isRefrenDataFnished = false;
                        isCanShowAnimationBottom= false;
                        scope.$broadcast('window.onscroll.top.$broadcast',{});
                    }
                    //todo 放开是否离底部》36--------------
                    if(moveY >=36 && isRefrenDataFnished && touchStatue !==-1 &&ActiveCanShowAnimation==2 && isCanShowAnimationBottom  && showMore){
                        isRefrenDataFnished = false;
                        isCanShowAnimationTOP = false;
                        scope.$broadcast('window.onscroll.bottom.$broadcast',{});
                    }

                    if(ActiveCanShowAnimation==1 && isCanShowAnimationTOP && showRefren){
                        if(moveY >=36 || (!isRefrenDataFnished)){
                            if(touchStatue!==-1) resetToTargetPonit();
                        }else{
                            cancelAnimation();
                        }
                    }

                    if(ActiveCanShowAnimation==2 && isCanShowAnimationBottom && showMore){
                        if(moveY >=36 || (!isRefrenDataFnished)){
                            if(touchStatue!==-1) resetToTargetPonit2();
                        }else{
                            cancelAnimation();
                        }
                    }


                };

                //todo 取消动画======================================
                function closeAnimation(){
                    addTransition(function(){
                        isCanShowAnimationTOP = true;
                        isCanShowAnimationBottom = true;
                    });
                    element.css({
                        transform:'translateY(0px)'
                        ,'-webkit-transform':'translateY(0px)'
                    });
                };

                //添加动画过渡
                function addTransition(fnc){
                    element.css({
                            transition:'transform 250ms ease-in-out'
                            ,'-webkit-transition':'-webkit-transform 250ms ease-in-out'
                        })
                        .one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd otransitionend transitionend',function() {
                            //console.log('动画结束');
                            removeTransition();
                            try{fnc()}catch (e){};
                        });
                };
                function removeTransition(){
                    element.css({
                        transition:''
                        ,'-webkit-transition':''
                    })
                };
                function cancelAnimation(){
                    addTransition();
                    element.css({
                        transform:'translateY(0px)'
                        ,'-webkit-transform':'translateY(0px)'
                    });
                };

                //todo  刷新--------------------

                function resetToTargetPonit(){
                    addTransition();
                    element.css({
                        transform:'translateY(36px)'
                        ,'-webkit-transform':'translateY(36px)'
                    });
                };
                //todo  加载更多--------------------
                function resetToTargetPonit2(){
                    addTransition();
                    element.css({
                        transform:'translateY(-36px)'
                        ,'-webkit-transform':'translateY(-36px)'
                    });
                };




                angular.element(document).on('touchstart mousedown',_gStart);
                angular.element(document).on('touchend mouseup',_gEnd);
                angular.element(document).on('touchmove mousemove',_gMove);

            }
        }

    }]);




});

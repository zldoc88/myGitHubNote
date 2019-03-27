!function(angular,window){

    var ngSelect = angular.module('ng-selctor', []);

    ngSelect.directive('selectScroll',['$document','$timeout',function($document , $timeout){
        return {
            link:function(scope,element,attr ){
                scope.settings =[];
                scope.target = 0;
                scope.activeCateIndex = 0;
                //该组分类数据
                attr.$observe('settings', function(data){
                    scope.settings= JSON.parse(data);
                    setTargetPoint();
                });
                //所属分类级别
                attr.$observe('watchcageindex', function(watchcageindex){
                    scope.activeCateIndex= parseInt(watchcageindex);
                });
                //分类中被选序列号
                attr.$observe('watchkey', function(watchkey){
                    scope.target= watchkey;
                    setTargetPoint();
                });

                scope.$on('changeNext.$emit',function(evt,data){
                    if(scope.activeCateIndex == data.p_index+1){
                        scope.target = 0;
                        scope.settings.selectedArray = data.selectedArray;

                        scope.$emit('changeCageKey.$emit',{
                            p_index : scope.activeCateIndex,
                            p_CheckKey : 0,
                            selectedArray : scope.settings.selectedArray[0].children || []
                        }); //上报触发下级改变
                        setTargetPoint();
                    }


                });

                var scroller = angular.element(element[0].querySelector('.tree-scroll'));


                //todo 初始化位置========================
                function setTargetPoint(){
                    scroller[0].style['transform']='translateY('+(defaultTop-scope.target*itemHeight)+'px)';
                    scroller[0].style['-webkit-transform']='translateY('+(defaultTop-scope.target*itemHeight)+'px)';
                   // result = scope.target;
                    marginTo = defaultTop-scope.target*itemHeight;
                };

                var start=function(e){
                        ismove = true;
                        e.preventDefault();
                        Y = e.pageY|| e.changedTouches[0].pageY;
                        //开始位置
                    },
                    move=function(e){
                        if(ismove){
                            e.preventDefault();
                            onStopY = e.pageY|| e.changedTouches[0].pageY;
                            marginTo -=rexY;
                            rexY = onStopY-Y;
                            ofs = rexY>=0? 1:-1;
                            moveAnimation();
                        }

                    },
                    end=function(e){
                        if(ismove){
                            ismove = false;
                            scroller[0].style['transition']='transform 350ms ease-in-out';
                            scroller[0].style['-webkit-transition']='-webkit-transform 350ms ease-in-out';
                            rexY=0;
                            getStopIndex();
                        }

                    },ismove=false,range=1,itemHeight=30,mainHeight=120,Y,onStopY,rexY=0,marginTo=0,MaxMarginBottom=0,defaultTop=(mainHeight-itemHeight)/2,result=0,ofs=-1,// 向上的 负数，向下是正
                    setnier = function(val){
                        val = val - defaultTop;
                        result = (Math.abs(val/itemHeight -parseInt(val/itemHeight)) > 0.5) ?
                        parseInt(val/itemHeight) +(ofs >0 ?0 : -1 ):
                        parseInt(val/itemHeight)-1 +(ofs >0 ? 1 : 0 ) ;
                        return result*itemHeight+ defaultTop ;
                    },
                    getStopIndex=function(){

                        marginTo = ofs >0 ?(
                            marginTo >= defaultTop? defaultTop : setnier(marginTo)
                        ) : (
                            marginTo <= -(scope.settings.length-1)*itemHeight +defaultTop ?  -(scope.settings.length-1)*itemHeight +defaultTop: setnier(marginTo)
                        );
                        scroller[0].style['transform']='translateY('+marginTo+'px)';
                        scroller[0].style['-webkit-transform']='translateY('+marginTo+'px)';


                        //todo-----------计算是第几个---------------------
                        result = (marginTo - defaultTop)/itemHeight;
                       // console.log('选择了：'+Math.abs(result));

                        scope.target = Math.abs(result);
                        var throwArray;
                        try {
                            throwArray = scope.settings.selectedArray[scope.target].children;
                        }catch (e){
                            throwArray = [];
                        }
                        scope.$emit('changeCageKey.$emit',{
                            p_index : scope.activeCateIndex,
                            p_CheckKey : scope.target,
                            touchChane : true,
                            selectedArray : throwArray
                        }); //上报触发下级改变



                        //todo 在有效区域内===============================================================

                        scroller.one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd otransitionend transitionend',function(e){
                            e.preventDefault();
                        });


                    },
                    moveAnimation=function(){
                        marginTo+=rexY; //垂直居中
                        scroller[0].style['transition']='';
                        scroller[0].style['-webkit-transition']='';
                        scroller[0].style['transform']='translateY('+marginTo+'px)';
                        scroller[0].style['-webkit-transform']='translateY('+marginTo+'px)';
                    };

                scroller[0].style['transform']='translateY('+defaultTop+'px)';
                scroller[0].style['-webkit-transform']='translateY('+defaultTop+'px)';
                marginTo = defaultTop;//进来的位置记录
                element.on('touchstart mousedown',start);
                element.on('touchmove mousemove',move);
                $document.on('touchend mouseup',end);


            }
        }
    }]);

    ngSelect.directive('selectorTree',['$timeout',function($timeout){

        return {
            template:'<div class="mo-ui-tablebox select-t-animte">' +
                        '<div class="item"  ng-repeat="catge in MaxReapet track by $index" >' +
                            '<div class="tree-cell green"  select-scroll settings="{{catge}}" watchkey="{{catge.selectedKey}}" watchcageindex="{{$index}}"  >' +
                                '<div class="ads-row tree-scroll" >' +
                                    '<div class="li" ng-repeat="item in catge.selectedArray">{{item.text}}</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>'+
            '<div class="mo-ui-tablebox controll-btn"><a  ng-click="hdienSelctorcacenl()"  href="javascript:;"   class="mo-ui-button mo-ui-default"  >取消</a><a ng-click="checkOK()" href="javascript:;" class="mo-ui-button mo-ui-success" >确定</a></div>',
            require:'?^ioSelect',
            link:function(scope,element,attr ,ioSelectCtr){

                scope.checkOK=function(){
                    var rs = [];
                    for(var c=0;c<scope.MaxReapet.length;c++){
                        rs.push(scope.MaxReapet[c].selectedArray[scope.MaxReapet[c].selectedKey]);
                    }
                    scope.$emit('closeToolSelector.$emit'+scope.dName,rs);
                };

                scope.hdienSelctorcacenl=function(){
                    scope.$emit('hdienSelctorcacenl.$emit',{});
                };

                //todo 接收触发下级改变============================
                scope.$on('changeCageKey.$emit',function(evt,data){

                    scope.$applyAsync(function(){
                        scope.MaxReapet[data.p_index].selectedKey = data.p_CheckKey;
                        scope.MaxReapet[data.p_index].selectedArray=data.p_index==0 || typeof data.touchChane !== 'undefined'?
                            scope.MaxReapet[data.p_index].selectedArray :
                            scope.MaxReapet[data.p_index-1].selectedArray[data.p_CheckKey].children;

                        try{
                            scope.MaxReapet[data.p_index+1].selectedArray = data.selectedArray;
                            scope.MaxReapet[data.p_index+1].selectedKey = 0;
                            scope.MaxReapet[data.p_index+1].length = data.selectedArray.length;
                        }catch (e){}

                        if(scope.MaxReapet.length-1 <= data.p_index) return;
                        scope.$broadcast('changeNext.$emit',{
                            p_index : data.p_index+1,
                            p_selectedKey : 0,
                            selectedArray : data.selectedArray[0].children
                        });
                    });


                });

            }
        }

    }]);

    ngSelect.directive('ioSelect',['$document','$compile','$animate','$rootScope',function($document ,$compile,$animate,$rootScope ){
        return {
            require:'?ngModel',
            link:function(scope,element,attr ,ngModel){
                scope.hasValue =[];
                scope.MaxReapet=[];

                var d=0;
                //todo ==================树定义============================
                function getValueByText(array){
                    scope.hasValue[d] = scope.hasValue[d].replace(/^\s+|\s+$/g, '');
                    var val = 0;
                    for(var t=0;t<array.length;t++){
                        if(array[t].text == scope.hasValue[d]) {
                            val = t;
                            break;
                        }
                    }
                    return val;
                }
                function setSelectItemValue(array){
                    if(array.length>0){
                        scope.MaxReapet.push({
                            index : d,
                            selectedKey:getValueByText(array), //选择了第几个
                            value : '',
                            length : array.length,
                            selectedArray :array
                        });


                    }
                    if(array[0].children){
                        d++;
                        setSelectItemValue(array[scope.MaxReapet[d-1].selectedKey].children);
                    }
                };
                function initailer(){
                    try{
                        scope.trees = JSON.parse(attr['ioSelect']);//
                    }catch (e){
                        scope.trees=[];
                    };


                };
                var showSelectTree={
                    show:function(){
                        //scope.$destroy();
                        $rootScope.stopBack=true;
                        initailer();
                        var arrays = scope.trees,_this=this;
                        scope.dName = attr['ngModel'];

                        scope.hasValue = (ngModel.$modelValue+'').split('-');
                        setSelectItemValue(scope.trees);

                        arrays = JSON.stringify(arrays);
                        _this._SelectUi = angular.element('<div id="_SelectUi" class="ui-select-main"  tabindex="-1" style="display: none;z-index:20000;position: fixed;left: 0;top: 0; width: 100%;;height: 100%; overflow: hidden;"  ></div>');

                        var body = $document.find('body').eq(0);
                        _this._SelectUi.append(angular.element('<div class="_selectbg" style="position: absolute;left:0;top:0;background-color: rgba(0,0,0,0.45); width: 100%;;height: 100%; overflow: hidden;" ></div>')
                            .on('touchstart click',function(e){
                                e.preventDefault();
                                _this.hide();
                            }));
                        _this._SelectUi.append(angular.element('<div  class="selecttor-tree" selector-tree ng-init=\''+arrays+'\' ></div>'));
                        $compile(_this._SelectUi)(scope);
                        body.append(_this._SelectUi);
                        _this._SelectUi.css({display:'table'});
                        // this._SelectUi.addClass('on-showing');

                        $animate.addClass(_this._SelectUi[0],'on-showing');
                        $rootScope.$digest();
                    }
                    ,hide:function(){
                        $rootScope.stopBack=false;
                        d=0;
                        scope.MaxReapet=[];
                        angular.element(document.getElementById('_SelectUi')).detach();
                    }
                };




                scope.$on('closeToolSelector.$emit'+attr['ngModel'],function(evt,data){
                    var re = [];
                    for(var k=0;k<data.length;k++){
                        re.push(data[k].text);
                    }
                    scope[attr['ngModel']]=(re.join('-'));
                    showSelectTree.hide();
                });

                scope.$on('hdienSelctorcacenl.$emit',function(){
                    showSelectTree.hide();
                });

                element.on('click',function(){
                    showSelectTree.show();
                });



            }
        }
    }]);

}(angular,window);
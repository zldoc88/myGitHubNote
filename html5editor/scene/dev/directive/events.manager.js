define(['angularAMD'],function(angularAMD){
    angularAMD.directive('eventsManager', ['$document','$compile',function($document,$compile) {
        return {
            templateUrl:'scene/partials/events.html',
            link:function(scope,element,attr){





            }
        }
    }]);


    angularAMD.directive('eventSet', ['$document','$compile',function($document,$compile) {
        return {
            templateUrl:'scene/partials/events.set.html',
            link:function(scope,element,attr){
                scope.setting = JSON.parse(attr['setting']);
                scope.isKey = attr['eventSet'];
                scope.activeShowElem={};
                scope.activeShowElem[scope.isKey]=false;

                    //监听setting 值变化
                attr.$observe('setting', function(data){
                    scope.setting = JSON.parse(attr['setting']);
                    scope.isKey = attr['eventSet'];
                });
                //接收删除动画通知
                scope.$on('deleAnimationItem.broadcast',function(evt,data){
                    //删除【由组件触发】,用于事件中设置过该动画的触发事件删除
                    if(data.animateStart=="event"){
                        var index = _.findIndex(scope.activePageAnimationList,{
                            id: data.id
                            ,component_id: data.component_id
                            ,component_type: data.component_type
                        });
                        console.log(index);
                        scope.activePageAnimationList.splice(index,1);
                    }
                });
                //接收动画跟随通知 注意，新增动画默认都是普通，只有设置【由组件触发】
                scope.$on('updataItemAnimation.broadcast',function(evt,data){
                    //删除【由组件触发】,用于事件中设置过该动画的触发事件删除
                    if(data.oldData== "event"){
                        //在【由组件触发】数组中删除改动画
                        var index = _.findIndex(scope.activePageAnimationList, {
                            component_type: data.setNew.item.component_type
                            ,component_id: data.setNew.item.component_id
                            ,id: data.setNew.item.id
                        });
                        scope.activePageAnimationList.splice(index,1);
                        //删除存在此动画设置过事件------
                        return;
                    }
                    //新增【由组件触发】
                    if(data.setNew.item.animateStart == 'event'){
                        scope.activePageAnimationList.push(data.setNew.item);
                    };
                });

                var events = {
                    "none" :{
                        "EventName":'无',
                        "list":[
                            {"type":"none",value:'none'}
                        ]}
                    ,"click" :{
                        "EventName":'点击',
                        "list":[
                            {"type":"submit",title:'提交此页面表单',value:''} // {"type":"transform",title:'组件动画',value:''}
                            ,{"type":"href",title:'跳转外部地址',value:''}
                            ,{"type":"changePage",title:'翻页',value:''}
                        ]}
                    ,"animationEnd" :{
                        "EventName":'动画完成',
                        "list":[
                            {"type":"submit",title:'提交此页面表单',value:''}
                            ,{"type":"href",title:'跳转外部地址',value:''}
                            ,{"type":"changePage",title:'翻页',value:''}
                        ]}
                };

                scope.getEventsGroud =function(type){
                    return events[type];
                };

                scope.EventsGrouds=[];
                //事件类型
                scope.$watch('setting.compentEventType',function(newVal,oldVal){
                    scope.EventsGrouds = scope.getEventsGroud(newVal);
                    scope.setting['EventName']=scope.EventsGrouds.EventName;
                    scope.EventsGrouds = scope.EventsGrouds.list;
                });
                scope.$watch('setting.doWhat',function(newVal,oldVal){
                    var ink = _.find(scope.EventsGrouds,function(num){
                        return num.type == newVal;
                    });
                    ink = (typeof ink=="undefined")? {'type':'transform',title:'触发动画'} : ink;
                    scope.setting['doWhatName']=ink.title;
                });


                scope.activeAnimations=[];//当前组件所有非循环动画
                scope.showAnimationList=false;

                scope.activePageAnimationList=[]; //当前页面的所有【由组件触发】动画
                scope.showActivePageAnimationList=false; //是否显示当前页面的所有组件动画

                //当前选择的组件是否存在非循环的动画,有才可以触发[动画完成后事件]
                scope.hasNotLoopAnimations=function(animations){
                    animations = typeof  animations == "undefined" ? [] : animations;
                    if(animations.length==0){
                        scope.showAnimationList=false;
                        if(scope.setting['compentEventType']=='animationEnd'){
                            scope.setting['compentEventType'] ='none';
                            scope.setting['doWhat'] ='none';
                        }
                        return false
                    };
                    scope.activeAnimations = _.filter(animations, function(num){ return num.animationCount < 5; });//取无循环的动画列表
                    if(scope.activeAnimations.length==0){
                        scope.showAnimationList=false;
                        if(scope.setting['compentEventType']=='animationEnd'){
                            scope.setting['compentEventType'] ='none';
                            scope.setting['doWhat'] ='none';
                        }
                        return false;
                    }
                    scope.showAnimationList=true;
                    return true;
                };

                //此页是否存在【由组件触发】动画
                scope.hasEventByOtherForActivePageCompent=function(){
                    scope.activePageAnimationList=[];
                    var animations = _.filter(scope.ActivePageData,function(oName){  return typeof oName=='object' && Object.prototype.toString.call(oName) === '[object Array]'}); //查询是否是数组
                    // 每个组件类型
                    animations=_.flatten(animations,true); //转一维数组
                    animations = _.filter(animations, function(num){return typeof num['animations'] !=="undefined"; });// 查询存在 animations
                    animations =  _.pluck(animations, 'animations');
                    animations= _.flatten(animations);
                    _.each(animations,function(_item,k){
                        if(_item['animateStart']=='event'){
                            scope.activePageAnimationList.push(_item);
                        }
                    });
                    if(scope.activePageAnimationList.length >0){
                        scope.showActivePageAnimationList =true;
                        return true;
                    }
                    scope.showActivePageAnimationList =false;
                    return false;

                };
                //保存或添加事件
                scope.saveEvent=function(key){

                    scope.setting.transformTarget = scope.activePageAnimationList[scope.setting.hasThisAnimateKey];

                    if(key){
                        //编辑
                        //是否重置触发动画
                        if(scope.setting.compentEventType!='click' && scope.setting.doWhat!='transform'){
                            scope.setting.eventParentID='none';
                            scope.setting.transformTarget=null;
                            scope.setting.animateWhatIdOnCompent='none'; //
                            scope.setting.animateWhatTypeOnCompent='none'; //
                            scope.setting.animateWhatcnNameOnCompent='无'; //
                            scope.setting.animateCnName='无'; //
                        }
                        scope.selectedItem.events[key]= scope.setting;
                        scope.ActivePageData[scope.selectedItem.type][scope.chooseIndex].events[key]= scope.selectedItem.events[key];
                        scope.activeShowElem[scope.isKey] = false;
                    }else{
                        //添加

                        //todo 判断该[由组件触发事件]是否已经存在
                        if(scope.setting.compentEventType=='click' && scope.setting.doWhat=='transform'){
                            var isPick = _.filter(scope.ActivePageData[scope.selectedItem.type][scope.chooseIndex].events, function(num){
                                return num.doWhat=="transform" && num.compentEventType=="click" &&
                                    num.transformTarget.component_id ==scope.setting.transformTarget.component_id &&
                                    num.transformTarget.id ==scope.setting.transformTarget.id;
                            });
                            //存在不添加
                            if(isPick.length>0){
                                scope.isshow();
                                return;
                            }
                            //是否是设置触发动画----scope.setting.transformTarget 是key
                            scope.setting.eventParentID = scope.setting.transformTarget.id;
                            scope.setting.animateWhatIdOnCompent = scope.setting.transformTarget.component_id;
                            scope.setting.animateWhatTypeOnCompent = scope.setting.transformTarget.component_type;
                            scope.setting.animateWhatcnNameOnCompent = scope.setting.transformTarget.component_cnName;
                            scope.setting.animateCnName = scope.setting.transformTarget.animateName;
                        };

                        scope.setting.component_type = scope.selectedItem.type;
                        scope.setting.component_id = scope.selectedItem.id;

                        scope.selectedItem.events=scope.selectedItem.events ? scope.selectedItem.events:[];
                        scope.selectedItem.events.push(scope.setting);
                        scope.ActivePageData[scope.selectedItem.type][scope.chooseIndex].events = scope.selectedItem.events;
                        scope.isshow();
                    }

                };

                //删除事件-------------------------------------------------------
                scope.removeItemEvent=function(key){
                    scope.ActivePageData[scope.selectedItem.type][scope.chooseIndex]['events'].splice(key,1);
                };





            }



        }
    }]);
});
define(['angularAMD'],function(angularAMD){
    angularAMD.directive('animationSetting', ['$document','$compile',function($document,$compile) {
        return{
            templateUrl:'scene/partials/animation_setting.html',
            link:function(scope,element,attrs,ngModel){
                //console.log(attrs.setting);
                scope.setting=JSON.parse(attrs.setting);
                //更新模板
                attrs.$observe('setting', function(data){
                    scope.setting=JSON.parse(attrs.setting);
                });

                // 选择动画效果
                var animateOptions={"1":[{"val":"bounceIn","label":"弹入","groupName":"弹入效果："},{"val":"bounceInDown","label":"从上弹入","groupName":"弹入效果："},{"val":"bounceInLeft","label":"从左弹入","groupName":"弹入效果："},{"val":"bounceInRight","label":"从右弹入","groupName":"弹入效果："},{"val":"bounceInUp","label":"从下弹入","groupName":"弹入效果："},{"val":"fadeIn","label":"淡入","groupName":"淡入效果："},{"val":"fadeInDown","label":"向下淡入","groupName":"淡入效果："},{"val":"fadeInDownBig","label":"大幅度向下淡入","groupName":"淡入效果："},{"val":"fadeInLeft","label":"向右淡入","groupName":"淡入效果："},{"val":"fadeInLeftBig","label":"大幅度向右淡入","groupName":"淡入效果："},{"val":"fadeInRight","label":"向左淡入","groupName":"淡入效果："},{"val":"fadeInRightBig","label":"大幅度向左淡入","groupName":"淡入效果："},{"val":"fadeInUp","label":"向上淡入","groupName":"淡入效果："},{"val":"fadeInUpBig","label":"大幅度向上淡入","groupName":"淡入效果："},{"val":"flipInX","label":"沿X轴翻转进来","groupName":"翻转效果："},{"val":"flipInY","label":"沿Y轴翻转进来","groupName":"翻转效果："},{"val":"lightSpeedIn","label":"滑入","groupName":"滑行效果："},{"val":"rotateIn","label":"旋转进入","groupName":"旋转进入："},{"val":"rotateInDownLeft","label":"左上转入","groupName":"旋转进入："},{"val":"rotateInDownRight","label":"右上转入","groupName":"旋转进入："},{"val":"rotateInUpLeft","label":"左下转入","groupName":"旋转进入："},{"val":"rotateInUpRight","label":"右下转入","groupName":"旋转进入："},{"val":"zoomIn","label":"放大进入","groupName":"放大进入："},{"val":"zoomInDown","label":"从上面放大进入","groupName":"放大进入："},{"val":"zoomInLeft","label":"从左面放大进入","groupName":"放大进入："},{"val":"zoomInRight","label":"从右面放大进入","groupName":"放大进入："},{"val":"zoomInUp","label":"从下面放大进入","groupName":"放大进入："},{"val":"slideInUp","label":"往上移入","groupName":"移入效果："},{"val":"slideInDown","label":"往下移入","groupName":"移入效果："},{"val":"slideInLeft","label":"往右移入","groupName":"移入效果："},{"val":"slideInRight","label":"往左移入","groupName":"移入效果："},{"val":"hinge","label":"悬挂掉落","groupName":"高级效果："},{"val":"rollIn","label":"旋转进入","groupName":"高级效果："}],"2":[{"val":"bounce","label":"弹跳","groupName":"特殊效果："},{"val":"flash","label":"闪烁","groupName":"特殊效果："},{"val":"pulse","label":"脉冲","groupName":"特殊效果："},{"val":"rubberBand","label":"橡皮筋","groupName":"特殊效果："},{"val":"shake","label":"摇动","groupName":"特殊效果："},{"val":"swing","label":"摆动","groupName":"特殊效果："},{"val":"tada","label":"大摆动","groupName":"特殊效果："},{"val":"wobble","label":"颤动","groupName":"特殊效果："},{"val":"jello","label":"果冻","groupName":"特殊效果："},{"val":"flip","label":"翻转","groupName":"翻转效果："}],"3":[{"val":"bounceOut","label":"弹出","groupName":"弹出效果："},{"val":"bounceOutDown","label":"向下弹出","groupName":"弹出效果："},{"val":"bounceOutLeft","label":"向左弹出","groupName":"弹出效果："},{"val":"bounceOutRight","label":"向右弹出","groupName":"弹出效果："},{"val":"bounceOutUp","label":"向上弹出","groupName":"弹出效果："},{"val":"fadeOut","label":"淡出","groupName":"淡出效果："},{"val":"fadeOutDown","label":"向下淡出","groupName":"淡出效果："},{"val":"fadeOutDownBig","label":"大幅度向下淡出","groupName":"淡出效果："},{"val":"fadeOutLeft","label":"向右淡出","groupName":"淡出效果："},{"val":"fadeOutLeftBig","label":"大幅度向右淡出","groupName":"淡出效果："},{"val":"fadeOutRight","label":"向左淡出","groupName":"淡出效果："},{"val":"fadeOutRightBig","label":"大幅度向左淡出","groupName":"淡出效果："},{"val":"fadeOutUp","label":"向上淡出","groupName":"淡出效果："},{"val":"fadeOutUpBig","label":"大幅度向上淡出","groupName":"淡出效果："},{"val":"flipOutX","label":"沿X轴翻转出去","groupName":"翻转效果："},{"val":"flipOutY","label":"沿Y轴翻转出去","groupName":"翻转效果："},{"val":"lightSpeedOut","label":"滑出","groupName":"滑行效果："},{"val":"rotateOut","label":"旋转离开","groupName":"旋转离开："},{"val":"rotateOutDownLeft","label":"左下旋离","groupName":"旋转离开："},{"val":"rotateOutDownRight","label":"右下旋离","groupName":"旋转离开："},{"val":"rotateOutUpLeft","label":"左上旋离","groupName":"旋转离开："},{"val":"rotateOutUpRight","label":"右上旋离","groupName":"旋转离开："},{"val":"zoomOut","label":"缩小离开","groupName":"缩小离开："},{"val":"zoomOutDown","label":"往下缩小离开","groupName":"缩小离开："},{"val":"zoomOutLeft","label":"往左缩小离开","groupName":"缩小离开："},{"val":"zoomOutRight","label":"往右缩小离开","groupName":"缩小离开："},{"val":"zoomOutUp","label":"往上缩小离开","groupName":"缩小离开："},{"val":"slideOutUp","label":"往上移出","groupName":"移出效果："},{"val":"slideOutDown","label":"往下移出","groupName":"移出效果："},{"val":"slideOutLeft","label":"往左移出","groupName":"移出效果："},{"val":"slideOutRight","label":"往右移出","groupName":"移出效果："},{"val":"rollOut","label":"旋转离开","groupName":"高级效果："}]}
                // effact array
                scope.effectArr=[{name:'进入效果',val:'1'},{name:'强调效果',val:'2'},{name:'退出效果',val:'3'}];
                // @params name, 进入效果

                var animateSelectGroup=function(name){
                    return animateOptions[name]
                };
                scope.effectGroups=[];
                scope.$watch('setting.animateStyleGroup',function(newVal,oldVal){
                    scope.effectGroups=animateSelectGroup(newVal);
                    switch(newVal){
                        case '1':
                            if(!scope.setting.animateStyle){
                                scope.setting.animateStyle='bounceIn'
                            }
                            break;
                        case '2':
                            if(!scope.setting.animateStyle){
                                scope.setting.animateStyle='bounce'
                            }
                            break;
                        case '3':
                            if(!scope.setting.animateStyle){
                                scope.setting.animateStyle='bounceOut'
                            }
                            break;
                    }
                });



                // 设置重复次数
                scope.countOptions=[{val:1,name:'1'},{val:2,name:'2'},{val:3,name:'3'},{val:2000,name:'循环'}];
                scope.isNewSetting=false;
                if(attrs.newid){
                    scope.isNewSetting=true;
                };
                var setanimationDelay = angular.element(document.querySelector('.setanimationDelay input.form-control'));
                setanimationDelay[0].value = scope.setting.animationDelay;


                // 获取动画中文名字
                var getCName=function(group,name){
                    return _.findWhere(animateOptions[group],{val:name}).label;
                };

                // 保存
                scope.saveSetting=function(){
                    scope.setting.animationDelay=setanimationDelay[0].value;
                    if(attrs.newid){
                        scope.setting.id=parseInt(attrs.newid);
                        scope.setting.animateName=getCName(scope.setting.animateStyleGroup,scope.setting.animateStyle);
                        scope.$emit('newAnimateSetting',scope.setting)
                    }else{
                        scope.setting.animateName=getCName(scope.setting.animateStyleGroup,scope.setting.animateStyle);
                        scope.$emit('updateAnimateSetting',scope.setting)
                    }
                    scope.$emit('changeAnimateSetting.emit',{});
                };

                //取消
                scope.cancelSetting=function(){
                    scope.$emit('cancelSetting',1);
                };
                // 删除
                scope.removeSetting=function(index){
                    scope.$emit('removeSetting',index);
                    scope.$emit('changeAnimateSetting.emit',{});
                };
                // 播放动画
                scope.playAnimate=function(){
                    scope.$emit('playAnimate',{
                        id:scope.selectedItem.id,
                        type:scope.selectedItem.type,
                        animate:scope.setting
                    })
                }

















            }



        }

    }]);
});


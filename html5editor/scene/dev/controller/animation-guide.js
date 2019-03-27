define(['angularAMD'],function(angularAMD){

    angularAMD.controller('animationGuide', ['$scope',function($scope) {

        $scope.initAnimationsArray=function(activePage){
            var animations = _.filter(activePage,function(oName){  return typeof oName=='object' && Object.prototype.toString.call(oName) === '[object Array]'}); //查询是否是数组
            animations=_.flatten(animations,true); //转一维数组
            animations = _.filter(animations, function(num){return typeof num['animations'] !=="undefined"; });// 查询存在 animations
            animations =  _.pluck(animations, 'animations');
            animations= _.flatten(animations);
            animations = _.sortBy(animations,'animationsOrder');
            animations = $scope.setTimer(animations);

            $scope.animations =animations;
            $scope.animationsCache = angular.copy($scope.animations);

        };

        $scope.setTimer = function(animations){
            //时间计算
            for (var i = 0; i < animations.length; i++) {
                var animationDelay=isNaN(parseInt(animations[i].animationDelay))? 0 : parseInt(animations[i].animationDelay);
                var animateTime=isNaN(parseInt(animations[i].animateTime))? 0 : parseInt(animations[i].animateTime);
                var animationCount=isNaN(parseInt(animations[i].animationCount))? 0 : parseInt(animations[i].animationCount);
                var PrevAnimationCount= i>0 ? (isNaN(parseInt(animations[i-1].animationCount))? 0 : parseInt(animations[i-1].animationCount)):0; //上一个是否为循环动画
                animationCount=animationCount > 5 ? 10 : animationCount;
                //循环无结束
                if(PrevAnimationCount>5){
                    animations[i].moment = animationDelay;
                    animations[i].longer = animateTime * animationCount; //动画时长就是上一个创建元件的animateTime*animationCount
                    continue;
                }
                if (i == 0) {
                    //第一项，没有在它之前创建的元件了，所以它的开始时刻一定是它本身的
                    animations[0].moment =animationDelay;
                    animations[0].longer = animateTime * animationCount;
                } else {
                    //非第一项就有点麻烦了
                    if (animations[i].animateStart == 'asSameAs') { //当“与上一动画同时”
                        animations[i].moment = animations[(i - 1)].moment + animationDelay; //开始时刻就是上一个创建元件的moment+自己的animationDelay
                        animations[i].longer = animateTime * animationCount; //动画时长就是上一个创建元件的animateTime*animationCount
                    } else if (animations[i].animateStart == 'after') { //当“上一动画之后”
                        animations[i].moment = animations[(i - 1)].moment + animations[(i - 1)].longer + animationDelay; //开始时刻就是上一个创建元件的moment+longer+自己的animationDelay
                        animations[i].longer = animateTime * animationCount; //动画时长就是上一个创建元件的animateTime*animationCount
                    }
                    else {
                        //当“由组件点击触发”，算法同第一项，没有之前创建元件这一说了
                        animations[i].moment = animationDelay;
                        animations[i].longer = animateTime * animationCount; //动画时长就是上一个创建元件的animateTime*animationCount
                    }
                }
            }
            return animations;
        }
        $scope.initAnimationsArray($scope.ActivePageData);

        $scope.$on('ActivePageDataCast',function(evt,data){
            $scope.initAnimationsArray(data);
        });
        $scope.$on('ChangeSelectedItemDataCast',function(evt,data){
            $scope.initAnimationsArray($scope.ActivePageData);
        });
        $scope.$on('changeAnimateSetting.cast',function(evt,data){
            $scope.initAnimationsArray($scope.ActivePageData);
        });

        //todo 修改跟随==============
        $scope.setAnimateStart=function(items,fllow,itemIndex){
            var itemsEditor ={};
            itemsEditor.oldData = $scope.animations[itemIndex].animateStart;
            $scope.animations[itemIndex].animateStart=fllow;
            items['animateStart']=fllow;
            $scope.itemSetting={
                key:itemIndex
                ,item:items
            };
            itemsEditor.setNew = angular.copy($scope.itemSetting);
            $scope.$emit('updataItemAnimation.emit',itemsEditor);
        };

        // todo 删除==============
        $scope.deleAnimationItem=function(itemdata,itemIndex){
            $scope.animations.splice(itemIndex,1);
            var itemKey = _.findIndex($scope.ActivePageData[itemdata.component_type][$scope.chooseIndex]['animations'],{animationsOrder:itemdata.animationsOrder});
            $scope.ActivePageData[itemdata.component_type][$scope.chooseIndex]['animations'].splice(itemKey,1);
            $scope.$emit('deleAnimationItem.emit',itemdata);
        };

        //todo 排序开始===============
        var gusetIndex = 0,mester= 0;
        $scope.onStarted=function($part, $item, $index){
            gusetIndex = $index;
        };
        //todo 排序结束=====================
        $scope.onSort=function($item, $partFrom , $partTo ,$part ,$indexFrom,$indexTo){
            mester= $indexTo;
            if(mester == gusetIndex) return;

            //todo 复制新order 并赋值
            var newOrder = $scope.animationsCache[mester]['animationsOrder']; // 目标order

            var choolIndexB = _.findIndex($scope.ActivePageData[$scope.animationsCache[gusetIndex].component_type],{id:$scope.animationsCache[gusetIndex].component_id}); //取组件所在当前页面的Index
            var itemKeyB = _.findIndex($scope.ActivePageData[$scope.animationsCache[gusetIndex].component_type][choolIndexB]['animations'],{id:$scope.animationsCache[gusetIndex].id});//取该动画所在当前组件的Index
            $scope.ActivePageData[$scope.animationsCache[gusetIndex].component_type][choolIndexB]['animations'][itemKeyB].animationsOrder = newOrder; //设置新 animationsOrder
            $scope.animationsCache[gusetIndex]['animationsOrder'] = newOrder;

            //todo 剩下不复制的----------------自增或自减
            var minOrderKey = mester > gusetIndex ?  gusetIndex+1 :  mester; // 取最小order的指向

            for(var k=0;k<Math.abs(gusetIndex-mester);k++){
                $scope.animationsCache[k+minOrderKey]['animationsOrder'] +=(mester > gusetIndex? -1 : 1); //从最小的Index 开始向下追加 order++
                // 涉及太多组件动画不宜上报，直接处理看看。
                var choolIndex = _.findIndex($scope.ActivePageData[$scope.animationsCache[k+minOrderKey].component_type],{id:$scope.animationsCache[k+minOrderKey].component_id}); //取组件所在当前页面的Index
                var itemKey = _.findIndex($scope.ActivePageData[$scope.animationsCache[k+minOrderKey].component_type][choolIndex]['animations'],{id:$scope.animationsCache[k+minOrderKey].id});//取该动画所在当前组件的Index
                $scope.ActivePageData[$scope.animationsCache[k+minOrderKey].component_type][choolIndex]['animations'][itemKey].animationsOrder +=(mester > gusetIndex? -1 : 1);; //设置新 animationsOrder
            };


            var animations = _.sortBy($scope.animationsCache,'animationsOrder'); //排序
            $scope.animationsCache = $scope.setTimer(animations); //重新计算动画跟随
            $scope.$applyAsync(function(){
                $scope.animations =angular.copy($scope.animationsCache);;
            });
            gusetIndex = 0;
            mester = 0;

        };




        // 播放动画
        $scope.playAnimate=function(index){

            $scope.$emit('playAnimate',{
                id:$scope.animations[index].component_id,
                type:$scope.animations[index].component_type,
                animate:$scope.animations[index]
            })
        }



    }]);
});
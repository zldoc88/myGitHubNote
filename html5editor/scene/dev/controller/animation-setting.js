define(['angularAMD'],function(angularAMD){

    angularAMD.controller('animationSetting', ['$scope',function($scope) {


        $scope.initAnimations=function(myChoose){
            if(myChoose!=null){
                $scope.isSelectComponent=true;
                $scope.animations=myChoose.animations||[];
            }else{
                $scope.animations=[]
            }
           // $scope.newId=$scope.animations.length+1;
            var ids = _.max($scope.animations, function(stooge){ return stooge.id; });
            $scope.newId=ids==-Infinity? 1:parseInt(ids.id)+1;
        };


        $scope.initAnimations($scope.selectedItem);

        $scope.$on('ChangeSelectedItemDataCast',function(evt,data){
            $scope.initAnimations(data);
        });

        $scope.animationDefault={
            'animateStart': "after",
            'animateStyleGroup': "1",
            'animateTime': 1,
            'animationCount': 1,
            "animationDelay": 0
        };

        $scope.collapseTab={};
        $scope.getAnimationGroupName=function(val){
            switch(val){
                case '1':
                    return '进入效果';
                    break;
                case '2':
                    return '强调效果';
                    break;
                case '3':
                    return '退出效果';
                    break;
            }
        };


        $scope.$on('newAnimateSetting',function(evt,oj){
            // update my choose
            oj['component_id'] = $scope.selectedItem.id;
            oj['component_type'] = $scope.selectedItem.type;
            oj['component_cnName'] = $scope.selectedItem.cnName;
            oj['animationsOrder'] = $scope.getNewAnimationsOrder();
            $scope.animations.push(oj);
            $scope.ActivePageData[$scope.selectedItem.type][$scope.chooseIndex].animations=$scope.animations;
           // $scope.newId=$scope.animations.length+1;
            var ids = _.max($scope.animations, function(stooge){ return stooge.id; });
            $scope.newId=parseInt(ids.id)+1;
            $scope.collapseTab[oj.id]=false;
            $scope.showAddAnimation=false;
        });

        $scope.$on('updateAnimateSetting',function(evt,oj){
           // $scope.animations[oj.id-1]=oj;
            var index = _.indexOf(_.pluck( $scope.animations,'id'),oj.id);
            $scope.animations[index]=oj;
            console.log($scope.animations);

            // update currentPage
            if ($scope.ActivePageData[$scope.selectedItem.type]&&$scope.ActivePageData[$scope.selectedItem.type][$scope.chooseIndex]) {
                $scope.selectedItem.animations = $scope.animations;
                $scope.ActivePageData[$scope.selectedItem.type][$scope.chooseIndex].animations= $scope.animations;
            }
            $scope.collapseTab[oj.id]=false;
        });

        $scope.$on('removeSetting',function(evt,index){
            var itemData = angular.copy($scope.animations[index]);
            $scope.animations.splice(index,1);
            $scope.ActivePageData[$scope.selectedItem.type][$scope.chooseIndex].animations=$scope.animations;
            var ids = _.max($scope.animations, function(stooge){ return stooge.id; });
            $scope.newId=parseInt(ids.id)+1;
            $scope.$emit('deleAnimationItem.emit',itemData);
        });

        $scope.$on('cancelSetting',function(){
            $scope.showAddAnimation=false;
        });

        $scope.showAddAnimation=false; //for debug
        $scope.addAnimation=function(){
            $scope.showAddAnimation=!$scope.showAddAnimation
        }



    }]);
});
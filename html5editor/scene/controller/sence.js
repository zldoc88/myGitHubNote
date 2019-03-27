/*
  @ todo 主控制器
 */
app.controller('sence', ['$scope',function($scope) {

    $scope.startAt = {x:0,y:0};
    $scope.overScene = false;
    $scope.foucePoint = {};
    $scope.PublicToolTMP =
        '<div class="addions-tool tool-dele-btn" ng-click="deleComponent()" uib-tooltip="删除组件" tooltip-placement="right"><i class="ion-close" ></i></div>'+
        '<div class="addions-tool tool-copy-btn" ng-click="copyTool()" uib-tooltip="复制组件" tooltip-placement="right" ><i class="ion-ios-paper-outline" ></i></div>'+
        '<div class="addions-tool tool-changeindex-btn" ng-click="setComponentValue(\'zIndex\',getNewZIndex());" uib-tooltip="设为顶层" tooltip-placement="right"  ><i class="ion-ios-browsers-outline"></i></div>';


    //todo 接收鼠标在舞台点击的坐标
    //设置X坐标
    $scope.getX=function(width,x){
        return x-$scope.startAt.x-width/2 +'px';
    };
    //设置Y坐标
    $scope.getY=function(height,y){
        return y-$scope.startAt.y-height/2 +'px';
    };

    /*$scope.$on('ChangeActivePageDataCast',function(evt,data){
        $scope.ActivePageData=data;
    });*/


    //画线初始化数据
    $scope.getCSS={};
    $scope.getCSS['copyTool'] = function(copyData){

        copyData.left = parseFloat(copyData.left) +10;
        copyData.top = parseFloat(copyData.top) +10;
        return copyData;
    };
    $scope.getCSS['line']=function(foucePoint){
        return {
            type: 'line',
            position: 'absolute',
            left: $scope.getX(200,foucePoint.x),
            top: $scope.getY(2,foucePoint.y),
            width:200,
            height: '4',
            rotate: '0',
            opacity: '1',
            borderColor: 'rgba(0,0,0,0.5)',
            borderStyle: 'solid',
            borderRadius: '0',
            borderWidth: '2',
            animateStyleGroup: '1',
            animateStyle: 'none',
            animateTime: '2',
            animationCount: '1',
            animationDelay: '0',
            soundType: '1',
            volume: 100,
            canSee: 'yes',
            canAnimation:true,
            backgroundColor:'none)'
        };
    };

    $scope.getCSS['square']=function(foucePoint){
        return {
            type: 'square',
            position: 'absolute',
            left: $scope.getX(200,foucePoint.x),
            top: $scope.getY(200,foucePoint.y),
            width:200,
            height: 200,
            rotate: '0',
            opacity: '1',
            borderColor: 'rgba(0,0,0,0.75)',
            borderStyle: 'solid',
            borderRadius: '0',
            borderWidth:'1',
            animateStyleGroup: '1',
            animateStyle: 'none',
            animateTime: '2',
            animationCount: '1',
            animationDelay: '0',
            soundType: '1',
            volume: 100,
            canSee: 'yes',
            canAnimation:true,
            backgroundColor:'rgba(255,255,255,0)'
        };
    };

    $scope.getCSS['txt']=function(foucePoint){
        return {
            type: 'txt',
            position: 'absolute',
            left: $scope.getX(100,foucePoint.x),
            top: $scope.getY(22,foucePoint.y),
            width:100,
            height: 22,
            fontSize: 12,
            fontStyle: 'none',
            fontWeight: 'none',
            textDecoration: 'none',
            textAlign: 'left',
            lineHeight: 22,
            color: 'rgba(0,0,0,1)',
            rotate: '0',
            opacity: '1',
            content: '文本',
            animateStyleGroup: '1',
            animateStyle: 'none',
            animateTime: '2',
            animationCount: '1',
            animationDelay: '0',
            canAnimation:true,
            canSee: 'yes'
        };
    };

    $scope.getCSS['formData["radio"]']=function(foucePoint){
        return {
            type: 'formData',
            tagName: 'input',
            tagType: 'radio',
            inputLable: '名称',
            isShowLabel: true,
            isMust: true,
            display: 'inline-block',
            position: 'absolute',
            left: $scope.getX(100,foucePoint.x),
            top: $scope.getY(22,foucePoint.y),
            width:130,
            height: 26,
            textAlign: 'left',
            color: 'rgba(0,0,0,1)',
            list: [{value:'y',label:'yes'},{value:'n',label:'no'}],
            canAnimation:false,
            canSee: 'yes'
        };
    };

    $scope.getCSS['formData["text"]']=function(foucePoint){
        return {
            type: 'formData',
            tagName: 'input',
            tagType: 'text',
            inputLable: '名称',
            isShowLabel: true,
            isMust: true,
            position: 'absolute',
            left: $scope.getX(100,foucePoint.x),
            top: $scope.getY(22,foucePoint.y),
            width:200,
            height: 32,
            textAlign: 'left',
            color: 'rgba(0,0,0,1)',
            canAnimation:false,
            canSee: 'yes'
        };
    };

    $scope.getCSS['formData["checkbox"]']=function(foucePoint){
        return {
            type: 'formData',
            tagName: 'input',
            tagType: 'checkbox',
            inputLable: '名称',
            isShowLabel: true,
            isMust: true,
            display: 'inline-block',
            position: 'absolute',
            left: $scope.getX(100,foucePoint.x),
            top: $scope.getY(22,foucePoint.y),
            width:220,
            height: 26,
            textAlign: 'left',
            color: 'rgba(0,0,0,1)',
            list: [{value:'*',label:'全部'},{value:'10',label:'10'},{value:'50',label:'50'},{value:'100',label:'100'}],
            canAnimation:false,
            canSee: 'yes'
        };
    };

    $scope.getCSS['formData["select"]']=function(foucePoint){
        return {
            type: 'formData',
            tagName: 'select',
            tagType: 'none',
            inputLable: '名称',
            isShowLabel: true,
            isMust: true,
            position: 'absolute',
            left: $scope.getX(100,foucePoint.x),
            top: $scope.getY(22,foucePoint.y),
            width:200,
            height: 32,
            textAlign: 'left',
            color: 'rgba(0,0,0,1)',
            list: [{value:'*',label:'全部'},{value:'10',label:'10'},{value:'50',label:'50'},{value:'100',label:'100'}],
            canAnimation:false,
            canSee: 'yes'
        };
    };

    $scope.getCSS['formData["textarea"]']=function(foucePoint){
        return {
            type: 'formData',
            tagName: 'textarea',
            tagType: 'none',
            inputLable: '名称',
            isShowLabel: true,
            isMust: true,
            position: 'absolute',
            left: $scope.getX(100,foucePoint.x),
            top: $scope.getY(22,foucePoint.y),
            width:200,
            height: 86,
            textAlign: 'left',
            color: 'rgba(0,0,0,1)',
            canAnimation:false,
            canSee: 'yes'
        };
    };









    //焦点是否在舞台
    $scope.$on('mouseOverScene', function(e, newval) {
        $scope.overScene=newval;
        //向下广播数据
        $scope.$broadcast('overSceneChange',$scope.overScene);
    });

    //窗体resize
    $scope.$on('onWindowResize', function(e, newval) {
        $scope.startAt=newval;
        //向下广播数据
        $scope.$broadcast('onWindowResizeCast',$scope.startAt);
    });
    //窗体滚动触发
    $scope.reGetgetBoundingClientRect=function(){
        $scope.$broadcast('reSetreGetgetBoundingClientRect',true);
    };








}]);
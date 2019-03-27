/*
  @ todo 主控制器
 */
define(['angularAMD'],function(angularAMD){

    angularAMD.controller('sence', ['$scope',function($scope) {

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
                cnName: '线',
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
                canAnimation:false,
                backgroundColor:'none)'
            };
        };

        $scope.getCSS['square']=function(foucePoint){
            return {
                type: 'square',
                cnName: '矩形',
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
                borderRadiusLeftTop: true,
                borderRadiusRightTop: true,
                borderRadiusLeftBottom: true,
                borderRadiusRightBottom: true,
                borderWidth:'1',
                animateStyleGroup: '1',
                animateStyle: 'none',
                animateTime: '2',
                animationCount: '1',
                animationDelay: '0',
                animations:[],
                soundType: '1',
                volume: 100,
                canSee: 'yes',
                canAnimation:true,
                backgroundColor:'rgba(255,255,255,1)',
                backgroundImg:'none',
                backgroundGradient:{
                    rotate :0,
                    color :[{color:'rgba(255,255,255,1)'},{color:'rgba(0,0,0,1)'}]
                },
                backgroundType:'color'
            };
        };

        $scope.getCSS['txt']=function(foucePoint){
            return {
                type: 'txt',
                cnName: '文本',
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
                cnName: '单选框',
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
                cnName: '当行文本输入框',
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
                cnName: '多选框',
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
                cnName: '下拉选择',
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
                cnName: '多行文本输入框',
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

        $scope.getCSS['button']=function(foucePoint){
            return {
                type: 'button',
                cnName: '矩形',
                position: 'absolute',
                left: $scope.getX(68,foucePoint.x),
                top: $scope.getY(32,foucePoint.y),
                width:68,
                height: 32,
                rotate: '0',
                opacity: '1',
                innerText:'button',
                color: 'rgba(255,255,255,1)',
                borderColor: 'rgba(0,0,0,0.75)',
                borderStyle: 'solid',
                borderRadius: '0',
                borderRadiusLeftTop: true,
                borderRadiusRightTop: true,
                borderRadiusLeftBottom: true,
                borderRadiusRightBottom: true,
                borderWidth:'1',
                animateStyleGroup: '1',
                animateStyle: 'none',
                animateTime: '2',
                animationCount: '1',
                animationDelay: '0',
                animations:[],
                soundType: '1',
                volume: 100,
                canSee: 'yes',
                canAnimation:false,
                backgroundColor:'rgba(8,161,239,1)',
                backgroundImg:'none',
                backgroundGradient:{
                    rotate :0,
                    color :[{color:'rgba(255,255,255,1)'},{color:'rgba(0,0,0,1)'}]
                },
                backgroundType:'color'
            };
        };

        $scope.getCSS['circular']=function(foucePoint){
            return {
                type: 'circular',
                cnName: '圆形',
                position: 'absolute',
                left: $scope.getX(150,foucePoint.x),
                top: $scope.getY(150,foucePoint.y),
                width:150,
                height: 150,
                rotate: '0',
                opacity: '1',
                borderColor: 'rgba(0,0,0,0.75)',
                borderStyle: 'solid',
                borderRadius:this.width/2,
                borderRadiusLeftTop: true,
                borderRadiusRightTop: true,
                borderRadiusLeftBottom: true,
                borderRadiusRightBottom: true,
                borderWidth:'1',
                animateStyleGroup: '1',
                animateStyle: 'none',
                animateTime: '2',
                animationCount: '1',
                animationDelay: '0',
                animations:[],
                soundType: '1',
                volume: 100,
                canSee: 'yes',
                canAnimation:true,
                backgroundColor:'rgba(255,255,255,1)',
                backgroundImg:'none',
                backgroundGradient:{
                    rotate :0,
                    color :[{color:'rgba(255,255,255,1)'},{color:'rgba(0,0,0,1)'}]
                },
                backgroundType:'color'
            };
        };

        $scope.getCSS['Images']=function(foucePoint){
            return {
                type: 'Images',
                cnName: '图片',
                position: 'absolute',
                left: $scope.getX(200,foucePoint.x),
                top: $scope.getY(200,foucePoint.y),
                width:200,
                height: 200,
                src: '',
                rotate: '0',
                opacity: '1',
                borderColor: 'rgba(0,0,0,0.75)',
                borderStyle: 'none',
                borderRadius: '0',
                borderRadiusLeftTop: true,
                borderRadiusRightTop: true,
                borderRadiusLeftBottom: true,
                borderRadiusRightBottom: true,
                borderWidth:'1',
                animateStyleGroup: '1',
                animateStyle: 'none',
                animateTime: '2',
                animationCount: '1',
                animationDelay: '0',
                animations:[],
                soundType: '1',
                volume: 100,
                canSee: 'yes',
                canAnimation:true,
                backgroundColor:'rgba(255,255,255,1)',
                backgroundImg:'none',
                backgroundGradient:{
                    rotate :0,
                    color :[{color:'rgba(255,255,255,1)'},{color:'rgba(0,0,0,1)'}]
                },
                backgroundType:'color'
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
});
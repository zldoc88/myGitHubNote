/*
  @ todo 主控制器
 */
define(['angularAMD'],function(angularAMD){
    angularAMD.controller('mainQuick', ['$scope',function($scope) {

        $scope.$on('changeHidenTool.broadcast',function(evt,data){
            $scope.hidenTool=data;
        });

        //todo 图形工具======
        $scope.ToolPick='pick'; //选择
        $scope.ToolEditing='editTexting'; //选择
        $scope.ToolMove='move'; //拖动
        $scope.ToolLine='line'; //绘制图形
        $scope.ToolTxt='txt'; //文本
        $scope.ToolCircular='circular'; //圆形
        $scope.ToolSquare='square'; //正方形
        $scope.ToolButton='button'; //正方形

        $scope.FormDataRadio = 'formData["radio"]';
        $scope.FormDataText = 'formData["text"]';
        $scope.FormDataCheckbox = 'formData["checkbox"]';
        $scope.FormDataTextarea = 'formData["textarea"]';
        $scope.FormDataSelect = 'formData["select"]';


        //todo 媒体===========
        $scope.ToolImg='Images'; //图片
        $scope.ToolAudio='Audio'; //音乐
        $scope.ToolVedio='Video'; //图片


        $scope.$on('changeActiveToolType',function(evt,data){
            $scope.ActiveToolType = data;
        });

        $scope.hidenTool=null;
        $scope.$on('changeHidenTool',function(evt,data){
            $scope.$apply(function(){
                $scope.hidenTool=data;
            });
        });




        //todo =====================添加工具===========================================
        $scope.addOne = function(){
            console.log($scope.ActiveToolType);
            /*var template = angular.element(html);
             angular.element(document.body).append(foubackgroud);
             var $bg=angular.element(document.querySelector('.foubackgroud'));
             $bg.append(template);
             $compile($bg)(scope);*/
        };



    }]);
});
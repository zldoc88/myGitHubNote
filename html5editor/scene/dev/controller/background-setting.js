define(['angularAMD'],function(angularAMD){
// 设置背景属性：纯色，渐变，图片
    angularAMD.controller('backgroundSetting', ['$scope',function($scope) {

        $scope.compentArray = null; //
        $scope.isGobal = undefined; //
        $scope.backgroundOptions =[{"val":"none","name":"无"},{"val":"color","name":"纯色"},{"val":"gradient","name":"渐变"},{"val":"img","name":"图片"}];


        $scope.addVgradientColor=function(key){
            $scope.compentArray.backgroundGradient.color.push({
                "color":'rgba(255,255,255,0.5)'
            });
        };
        $scope.deleVgradientColor=function(key){
            $scope.compentArray.backgroundGradient.color.splice(key,1);
        };


        $scope.$on('updata.backgroundGradient.rotate.emit',function(evt,data){
            $scope.$applyAsync(function(){
                $scope.compentArray.backgroundGradient.rotate = data;
            });
        });







    }]);
});
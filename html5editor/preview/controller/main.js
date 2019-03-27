app.controller('myCtrl', ['$scope', 'dataService', '$http',function($scope, dataService, $http) {

    $scope.MAP=dataService;
    //todo 单位转换
    $scope.maxPX = window.rem;
    $scope.winWidth = window.innerWidth;
    $scope.setPxToRem = function(px){
        return parseFloat(px)/480*$scope.winWidth/$scope.maxPX+'rem';
    };
    //todo  百分比 480
    $scope.setPercent = function(px){
        return parseFloat(px)/480*100+'%';
    };

    console.log($scope.MAP);

    /*$scope.MAP['pageMaps'][0]=$scope.ActivePageData ; //当前页面信息
    $scope.chooseActivePageIndex = 0; //todo 选择页面序列号
    $scope.selectedItem = null; //todo 选择组件 选择就是object
    $scope.chooseIndex=0; // todo 当前选择组件的序列号
    $scope.isSelectedItem = true; //todo 是否选择了某组件 触发快捷键
    $scope.theZIndex = 1; // z-index
    $scope.theId = 1; // tool id*/

}]);
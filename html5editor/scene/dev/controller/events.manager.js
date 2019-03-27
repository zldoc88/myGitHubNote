define(['angularAMD'],function(angularAMD){

    angularAMD.controller('eventsManager', ['$scope',function($scope) {

        $scope.event_id =0;

        $scope.setting = {
            compentEventType: "none"
            ,transformTarget: null
            ,hasThisAnimateKey: 'none'
            ,eventParentID: 'none' //用动画Id
            ,animateWhatTypeOnCompent: 'none' //动画所在的组件的类型
            ,animateWhatIdOnCompent: 'none' //动画所在的组件的ID
            ,animateWhatcnNameOnCompent: '无' //动画所在组件的名称
            ,animateCnName: '无' //动画名称
            ,component_type: '' //组件类型
            ,animationID: "none" // sbumit , changePage / href
            ,doWhat: "none" // sbumit , changePage / href
            ,target: "" //  [id/1,id/2] ; http:///? https://
        };
        $scope.eventsOptions =[
            {"val":"none","name":"无"}
            ,{"val":"click","name":"点击"}
        ];

        $scope.newEventId=function(){return $scope.event_id++};
        $scope.showAdd=false;
        $scope.isshow=function(){$scope.showAdd=!$scope.showAdd};

        $scope.canShow = [];


    }]);

});

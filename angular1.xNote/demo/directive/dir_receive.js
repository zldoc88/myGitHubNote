define(['angularAMD'],function(angularAMD){

    angularAMD.directive('receiveEvent',['$document',function($document){

        return {
            link:function(scope,element,attr){

                scope.buyMubArray = [
                    {
                        text:1
                        ,value:1
                    }
                    ,{
                        text:2
                        ,value:2
                    }
                ];
                scope.selectedMub = 1;


            }
        }

    }]);




});
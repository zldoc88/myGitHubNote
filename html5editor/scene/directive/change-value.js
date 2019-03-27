app.directive('changeValue', ['$document','$compile',function($document,$compile) {
    return{
        link:function(scope,element,attr){

            /*element.on('input',function(){
                scope.setComponentValue(attr['itemtype'],this.value);
            });*/
            element.on('change',function(){
                scope.setComponentValue(attr['itemtype'],this.value);
            });


            scope.$watch('selectedItem.'+attr['itemtype'],function(newval,oldval){
                element[0].value = attr['setting'];
            });
            scope.$on('ChangeSelectedItemDataCast',function(evt,data){
                if(data==null) return;
                element[0].value = parseInt(data[attr['itemtype']]);
            });

        }
    }
}]);

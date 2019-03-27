app.directive('oninputvalue', ['$document','$compile',function($document,$compile) {
    return{
        link:function(scope,element,attr){

            element.on('input',function(){
                scope.setComponentValue(attr['oninputvalue'],this.value);
            });

            scope.$watch('selectedItem.'+attr['oninputvalue'],function(newval,oldval){
                element[0].value = newval;
            });
            scope.$on('ChangeSelectedItemDataCast',function(evt,data){
                if(data==null) return;
                element[0].value = data[attr['oninputvalue']];
            });




        }
    }
}]);

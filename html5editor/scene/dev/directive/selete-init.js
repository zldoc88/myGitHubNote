define(['angularAMD'],function(angularAMD){
        angularAMD.directive('seleteInit', ['$document','$compile',function($document,$compile) {
        return{
            link:function(scope,element,attr){

                var options = eval(attr['defaultoptions']);

                function initSelect(val){
                    element[0].innerHTML='';
                    var optionHTML ='';
                    for(var k=0;k< options.length;k++){
                        optionHTML+= '<option '+(options[k].val==val?"selected=\"selected\"":"")+' value="'+ options[k].val+'">'+ options[k].name+'</option>';
                    }
                    element.append(optionHTML);
                }


                element.on('change',function(){
                    scope.setComponentValue(attr['itemtype'],this.value);
                    initSelect(attr['setting']);
                });


                scope.$watch('selectedItem.'+attr['itemtype'],function(newval,oldval){
                    initSelect(attr['setting']);
                });
                scope.$on('ChangeSelectedItemDataCast',function(evt,data){
                    if(data==null) return;
                    initSelect(attr['setting']);
                });

            }
        }
    }]);
});
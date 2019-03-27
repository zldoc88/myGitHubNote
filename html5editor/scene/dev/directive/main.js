//快捷健设置
define(['angularAMD'],function(angularAMD){
    angularAMD.directive('bodyDirective', ['$document',function($document) {
       return {
           link:function(scope,element,attr){


               var fontSize = angular.element(element).css('fontSize');
               scope.$emit('ChangeMinfontSizeEmit',parseInt(fontSize));

               var timeout=null;
               angular.element(window).on('resize',function(){
                   clearTimeout(timeout);
                   timeout = setTimeout(function(){
                       var fontSize = angular.element(element).css('fontSize');
                       scope.$emit('ChangeMinfontSizeEmit',parseInt(fontSize));
                   },11);

               });



               scope.checkedItemValue=function(e,name,TrueVal,FalseVal){
                   var isChecked  = e.target.checked;
                   scope.setComponentValue(name,isChecked ? TrueVal : FalseVal);
               }



           }
       }

    }]);
});

//快捷健设置
app.directive('bodyDirective', ['$document',function($document) {
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


       }
   }

}]);

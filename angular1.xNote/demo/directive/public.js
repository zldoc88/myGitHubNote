//快捷健设置
define(['angularAMD'],function(angularAMD){
    angularAMD.directive('bodyDirective', ['$document','$animate',function($document , $animate) {
        return {
            link:function(scope,element,attr){



            }
        }

    }]);
        /*.directive('ngScroll', function() {
        return {
            replace: false,
            restrict: 'A',
            link: function(scope, element, attr){
                scope.$watch(attr.ngScroll, function(value){
                    new IScroll(element[0], {
                        snap: true,
                        momentum: true,
                        hScrollbar: true
                    });
                });
            }
        };
    });;*/
});

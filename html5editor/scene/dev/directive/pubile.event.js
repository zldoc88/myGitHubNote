//快捷健设置
define(['angularAMD'],function(angularAMD){
    angularAMD.directive('pubileEvent', ['$document',function($document) {
        return {
            link:function(scope,element,attr){
                //接收主控制器广播选择的组件

                //禁止右击
                element.on('contextmenu',function(e){
                    e.preventDefault();
                });

                var fontSize = angular.element(element).css('fontSize');
                scope.$emit('ChangeMaxfontSizeEmit',parseInt(fontSize));
                var timeout=null;
                angular.element(window).on('resize',function(){
                    clearTimeout(timeout);
                    timeout = setTimeout(function(){
                        var fontSize = angular.element(element).css('fontSize');
                        scope.$emit('ChangeMaxfontSizeEmit',parseInt(fontSize));
                    },11);

                });






            }
        }

    }]);
});
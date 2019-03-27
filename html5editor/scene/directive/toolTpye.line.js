app.directive('drawLine', ['$document','$compile',function($document,$compile) {

        return {
        link : function(scope,element,attr){
            var template = '<div class="fouce-region" move-component setting="{{line}}"  ng-click="chooseComponent(line.type,line.id)" ></div>'+
                        '<div class="reSetSize-R actrl" hr-bresize setting="{{line}}" ></div>'+
                        '<div class="reSetSize-L actrl" hl-bresize setting="{{line}}"></div>'+
                        '<div class="actrl tool-rotate" comp-rotate setting="{{line}}" ></div>';

            //todo 选择工具
            scope.isChooseMe=function(id){
                if(scope.selectedItem==null) return '';
                return id==scope.selectedItem.id ? 'active' : '';
            };

            scope.copyTool=function(){
                if( scope.ActiveToolType!=='pick') return;
                scope.setting =JSON.parse(attr['setting']);
                var newTool = scope.getCSS['copyTool'](scope.setting);
                scope.$emit('addNewOne',newTool);
            };

            var $template = angular.element(scope.PublicToolTMP+template);
            $compile($template)(scope);
            element.append($template);

        }
    }


}]);
app.directive('editerLine', ['$document','$compile',function($document,$compile) {
    return {
        templateUrl:'scene/partials/line.html',
        link:function(scope,element,attr){

        }
    }
}]);

//
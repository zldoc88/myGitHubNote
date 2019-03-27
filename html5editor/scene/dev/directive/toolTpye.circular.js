define(['angularAMD'],function(angularAMD){
    angularAMD.directive('drawCircular', ['$document','$compile',function($document,$compile) {

        return {
            link : function(scope,element,attr){
                var initstyle = "{borderRadius:setPxToRem(circular.width/2)}";
                var template = '<div class="fouce-region"  move-component setting="{{circular}}" set-background-option=""' +
                    'ng-style="'+initstyle+'"'+
                    '  ng-click="chooseComponent(circular.type,circular.id)" ></div>'+
                                '<div class="reSetSize-LT actrl"  se-tresize setting="{{circular}}" ></div>'+
                                '<div class="reSetSize-T actrl"  vt-resize setting="{{circular}}" ></div>'+
                                '<div class="reSetSize-RT actrl"  sw-tresize setting="{{circular}}"  ></div>'+
                                '<div class="reSetSize-R actrl" hr-bresize setting="{{circular}}"  ></div>'+
                                '<div class="reSetSize-RB actrl" se-resize setting="{{circular}}" ></div>'+
                                '<div class="reSetSize-B actrl"  vb-resize setting="{{circular}}" ></div>'+
                                '<div class="reSetSize-LB actrl"  sw-bresize setting="{{circular}}" ></div>'+
                                '<div class="reSetSize-L actrl" hl-bresize setting="{{circular}}" ></div>'+
                                '<div class="actrl tool-rotate" comp-rotate setting="{{circular}}" ></div>';

                scope.setting =JSON.parse(attr['setting']);
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

    angularAMD.directive('editerCircular', ['$document','$compile',function($document,$compile) {
        return {
            templateUrl:'scene/partials/circular.html',
            link:function(scope,element,attr){

            }
        }
    }]);
});